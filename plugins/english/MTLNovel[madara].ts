
import { fetchApi, fetchFile } from "@libs/fetch";
import { Filter } from "@libs/filterInputs";
import { Plugin } from '@typings/plugin'
import { load as parseHTML } from "cheerio";
import { defaultCover } from "@libs/defaultCover";
import { NovelStatus } from "@libs/novelStatus";
import { parseMadaraDate } from "@libs/parseMadaraDate";
import dayjs from "dayjs";

interface MadaraOptionPath{ 
    genres?: string,
    novels?: string,
    novel?: string,
    chapter?: string,
}

const MadaraDefaultPath: MadaraOptionPath = {
    novels: 'novel',
    novel: 'novel',
    chapter: 'novel'
}

interface MadaraOptions {
    useNewChapterEndpoint?: boolean,
    path?: MadaraOptionPath,
    lang?: string,
    orderBy?: string
}

export interface MadaraMetadata {
    id: string,
    sourceSite: string,
    sourceName: string,
    options?: MadaraOptions,
    filters?: Filter[],
}
class MadaraPlugin implements Plugin.PluginBase {
    id: string;
    name: string;
    icon: string;
    site: string;
    version: string;
    userAgent: string;
    cookieString: string;
    options?: MadaraOptions;
    filters?: Filter[] | undefined;
    
    constructor(metadata: MadaraMetadata){
        this.id = metadata.id;
        this.name = metadata.sourceName + "[madara]";
        const iconFileName = metadata.sourceName.replace(/\s+/g, "").toLowerCase();
        this.icon = `multisrc/madara/icons/${iconFileName}.png`;
        this.site = metadata.sourceSite;
        this.version = "1.0.0";
        this.userAgent = "";
        this.cookieString = "";
        this.options = metadata.options;
        this.filters = metadata.filters;
    }
    async popularNovels(pageNo: number, {filters, showLatestNovels}: Plugin.PopularNovelsOptions): Promise<Plugin.NovelItem[]> {
        const novels: Plugin.NovelItem[] = [];

        let url = this.site;
        if (filters?.genres &&  this.options?.path?.genres) {
            url += this.options?.path?.genres + filters.genres;
        } else {
            url += this.options?.path?.novels ? this.options.path.novels : MadaraDefaultPath.novels;
        }
    
        url += '/page/' + pageNo + '/' + 
            '?m_orderby=' + (showLatestNovels ? 'latest' : (filters?.sort || 'rating'));
    
        const body = await fetchApi(url).then(res => res.text());
    
        const loadedCheerio = parseHTML(body);
    
        loadedCheerio('.manga-title-badges').remove();
    
        loadedCheerio('.page-item-detail').each(function () {
            const novelName = loadedCheerio(this).find('.post-title').text().trim();
            let image = loadedCheerio(this).find('img');
            const novelCover = image.attr('data-src') || image.attr('src');
        
            let novelUrl = loadedCheerio(this).find('.post-title')
                .find('a')
                .attr('href') || '';
            const novel: Plugin.NovelItem = {
                name: novelName,
                cover: novelCover,
                url: novelUrl,
            };
        
            novels.push(novel);
        });
    
        return novels;
    }
    async parseNovelAndChapters(novelUrl: string): Promise<Plugin.SourceNovel> {
        const novel: Plugin.SourceNovel = {
            url: novelUrl,
        };
    
        const body = await fetchApi(novelUrl).then(res => res.text());
    
        let loadedCheerio = parseHTML(body);
    
        loadedCheerio('.manga-title-badges, #manga-title span').remove();
        novel.name = 
            loadedCheerio('.post-title h1').text().trim() || 
            loadedCheerio('#manga-title h1').text();
    
        novel.cover =
            loadedCheerio('.summary_image > a > img').attr('data-lazy-src') ||
            loadedCheerio('.summary_image > a > img').attr('data-src') ||
            loadedCheerio('.summary_image > a > img').attr('src') ||
            defaultCover;
    
        loadedCheerio('.post-content_item, .post-content').each(function () {
            const detailName = loadedCheerio(this).find('h5').text().trim();
            const detail = loadedCheerio(this).find('.summary-content').text().trim();
        
            switch (detailName) {
                case 'Genre(s)':
                case 'التصنيفات':
                    novel.genres = detail.replace(/[\\t\\n]/g, ',');
                    break;
                case 'Author(s)':
                case 'المؤلف':
                case 'المؤلف (ين)':
                    novel.author = detail;
                    break;
                case 'Status':
                case 'الحالة':
                    novel.status =
                        detail.includes('OnGoing') || detail.includes('مستمرة')
                        ? NovelStatus.Ongoing
                        : NovelStatus.Completed;
                    break;
            }
        });
    
        loadedCheerio('div.summary__content .code-block,script').remove();
        novel.summary = 
            loadedCheerio('div.summary__content').text().trim() ||
            loadedCheerio('#tab-manga-about').text().trim() ||
            loadedCheerio('.post-content_item h5:contains("Summary")').next().text().trim();
    
        let html;
    
        if (this.options?.useNewChapterEndpoint !== true) {
            const novelId =
                loadedCheerio('.rating-post-id').attr('value') ||
                loadedCheerio('#manga-chapters-holder').attr('data-id') || '';
    
            const formData = new FormData()
            formData.append("action", "manga_get_chapters");
            formData.append("manga", novelId);

            html = await fetchApi(
                this.site + 'wp-admin/admin-ajax.php',
                {
                method: 'POST',
                body: formData,
                })
                .then(res => res.text());
        } else {
            html = await fetchApi(
            novelUrl + 'ajax/chapters/',
            { method: 'POST' })
            .then(res => res.text());
        }
    
        if (html !== '0') {
            loadedCheerio = parseHTML(html);
        }
    
        const chapters: Plugin.ChapterItem[] = [];
        loadedCheerio('.wp-manga-chapter').each(function () {
            const chapterName = loadedCheerio(this).find('a').text().trim();
    
            let releaseDate = null;
            releaseDate = loadedCheerio(this)
                .find('span.chapter-release-date')
                .text()
                .trim();
    
            if (releaseDate) {
                releaseDate = parseMadaraDate(releaseDate);
            } else {
                /**
                 * Insert current date
                 */
    
                releaseDate = dayjs().format('LL');
            }
    
            let chapterUrl = loadedCheerio(this).find('a').attr('href') || '';
    
            chapters.push({ name: chapterName, releaseTime: releaseDate, url: chapterUrl });
        });
    
        novel.chapters = chapters.reverse();
        return novel;
    }
    async parseChapter(chapterUrl: string): Promise<string> {
        const body = await fetchApi(chapterUrl).then(res => res.text());

        const loadedCheerio = parseHTML(body);
        const chapterText =
        loadedCheerio('.text-left').html() ||
        loadedCheerio('.text-right').html() ||
        loadedCheerio('.entry-content').html() || "";

        return chapterText;
    }
    async searchNovels(searchTerm: string, pageNo?: number | undefined): Promise<Plugin.NovelItem[]> {
        const novels: Plugin.NovelItem[] = [];
        const url = this.site + "?s=" + searchTerm + "&post_type=wp-manga";
    
        const body = await fetchApi(url).then(res => res.text());
    
        const loadedCheerio = parseHTML(body);
    
    
        loadedCheerio('.c-tabs-item__content').each(function () {
        const novelName = loadedCheerio(this).find('.post-title').text().trim();
    
        let image = loadedCheerio(this).find('img');
        const novelCover = image.attr('data-src') || image.attr('src');
    
        let novelUrl = loadedCheerio(this)
            .find('.post-title')
            .find('a')
            .attr('href') || '';
        const novel = {
            name: novelName,
            cover: novelCover,
            url: novelUrl,
        };
    
        novels.push(novel);
        });
        return novels;
    }
    async fetchImage(url: string): Promise<string | undefined> {
        return await fetchFile(url, {});
    }
}
const plugin = new MadaraPlugin({"id":"mtl-novel","sourceSite":"https://mtl-novel.com/","sourceName":"MTL-Novel","filters":[{"key":"sort","label":"Order by","values":[{"label":"Rating","value":"rating"},{"label":"A-Z","value":"alphabet"},{"label":"Latest","value":"latest"},{"label":"Most Views","value":"views"},{"label":"New","value":"new-manga"},{"label":"Trending","value":"trending"}],"inputType":1},{"key":"genres","label":"GENRES","values":[{"label":"Action","value":"action"},{"label":"Adult","value":"adult"},{"label":"Adventure","value":"adventure"},{"label":"Chinese","value":"chinese"},{"label":"Comedy","value":"comedy"},{"label":"Conan","value":"conan"},{"label":"Drama","value":"drama"},{"label":"Erciyuan","value":"erciyuan"},{"label":"Fairy Tail","value":"fairy-tail"},{"label":"Faloo","value":"faloo"},{"label":"Fan-Fiction","value":"fan-fiction"},{"label":"Fantasy","value":"fantasy"},{"label":"FoodWars!","value":"foodwars"},{"label":"Game","value":"game"},{"label":"Gender Bender","value":"gender-bender"},{"label":"Harem","value":"harem"},{"label":"Historical","value":"historical"},{"label":"Horror","value":"horror"},{"label":"Hunter x Hunter","value":"hunter-x-hunter"},{"label":"Japanese","value":"japanese"},{"label":"Jojo","value":"jojo"},{"label":"Josei","value":"josei"},{"label":"Korean","value":"korean"},{"label":"Martial Arts","value":"martial-arts"},{"label":"Marvel","value":"marvel"},{"label":"Mature","value":"mature"},{"label":"Mecha","value":"mecha"},{"label":"Military","value":"military"},{"label":"Mystery","value":"mystery"},{"label":"Naruto","value":"naruto"},{"label":"One piece","value":"one-piece"},{"label":"Pokemon","value":"pokemon"},{"label":"Psychological","value":"psychological"},{"label":"Romance","value":"romance"},{"label":"School Life","value":"school-life"},{"label":"Sci-fi","value":"sci-fi"},{"label":"Seinen","value":"seinen"},{"label":"Shoujo","value":"shoujo"},{"label":"Shoujo Ai","value":"shoujo-ai"},{"label":"Shounen Ai","value":"shounen-ai"},{"label":"Slice of Life","value":"slice-of-life"},{"label":"Smut","value":"smut"},{"label":"Sport","value":"sport"},{"label":"Sports","value":"sports"},{"label":"Supernatural","value":"supernatural"},{"label":"System","value":"system"},{"label":"Tragedy","value":"tragedy"},{"label":"Urban","value":"urban"},{"label":"Urban Life","value":"urban-life"},{"label":"Wuxia","value":"wuxia"},{"label":"Xianxia","value":"xianxia"},{"label":"Xuanhuan","value":"xuanhuan"},{"label":"Yaoi","value":"yaoi"},{"label":"Yuri","value":"yuri"}],"inputType":1}],"options":{"path":{"genres":"manga-genre"},"useNewChapterEndpoint":true,"lang":"English"}});
export default plugin;
    