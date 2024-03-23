import { fetchApi, fetchFile } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { FilterTypes, Filters } from '@libs/filterInputs';
import { load as loadCheerio } from 'cheerio';
import { defaultCover } from '@libs/defaultCover';
import { NovelStatus } from '@libs/novelStatus';
// import { isUrlAbsolute } from "@libs/isAbsoluteUrl";
// import { parseMadaraDate } from "@libs/parseMadaraDate";
import { AsyncLocalStorage } from 'async_hooks';
import { parseHTML } from 'jquery';

const username = 'bW91c2UwOTEwQGdtYWlsLmNvbQoK';
const password = 'Q2xvc2FibGUtR29uZzktRHVsbGVy';

class Komga implements Plugin.PluginBase {
  id = 'komga';
  name = 'Komga';
  icon = 'src/en/komga/icon.png';
  site = 'https://komga.hibana.me/api/v1';
  version = '1.0.0';
  headers = {
    'Authorization': this.getBasicAuthHeader(),
  };
  filters?: Filters | undefined;

  getBasicAuthHeader() {
    const base64Credentials = `${username}:${password}`;
    return `Basic ${base64Credentials}`;
  }

  async popularNovels(
    pageNo: number,
    {
      showLatestNovels,
      filters,
    }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    let link = `${this.site}/books?`;

    const body = await fetch(
      link +
        new URLSearchParams({
          page: (pageNo - 1).toString(),
          library_id: '0EZ7QCKACD2EH', // Novels
          // library_id: "0E99X7XFT6RF1" // Manga
        }),
      { headers: this.headers },
    ).then(r => r.json());

    return body.content.map(
      (book: { name: string; id: string }): Plugin.NovelItem => ({
        name: book.name,
        path: `/books/${book.id}`,
        cover: `${this.site}/books/${book.id}/thumbnail`,
      }),
    );
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: 'Untitled',
    };

    console.log('Parsing novel', novelPath);

    const bookBody = await fetch(this.site + novelPath, {
      headers: this.headers,
    }).then(r => r.json());
    const seriesBody = await fetch(this.site + `/series/${bookBody.seriesId}`, {
      headers: this.headers,
    }).then(r => r.json());

    // TODO: get here data from the site and
    // un-comment and fill-in the relevant fields

    console.log('Fetched data');

    novel.name = bookBody.name;
    // novel.artist = "";
    novel.author = bookBody.metadata.authors
      ? bookBody.metadata.authors
          .map((author: { name: string }) => author.name)
          .join(', ')
      : '';
    console.log('Bruh');
    novel.cover = `${this.site}/books/${bookBody.id}/thumbnail`;
    novel.genres = seriesBody.metadata.genres.join(', ');
    novel.status = NovelStatus.Completed;
    novel.summary = seriesBody.metadata.summary;

    console.log('Fetching epub');

    const chaptersBody = await fetch(
      this.site + `/books/${bookBody.id}/manifest/epub`,
      { headers: this.headers },
    ).then(r => r.json());

    console.log(chaptersBody);

    let chapters = chaptersBody.readingOrder.map(
      (chapter: { href: string }, index: number): Plugin.ChapterItem => {
        const matchingTocEntry = chaptersBody.toc.find(
          (tocEntry: { href: string; title: string }) =>
            tocEntry.href === chapter.href,
        );
        return {
          name: matchingTocEntry ? matchingTocEntry.title : `Chapter ${index}`,
          path: chapter.href,
          chapterNumber: index,
        };
      },
    );

    novel.chapters = chapters;
    console.log(novel);
    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const body = await fetchApi(chapterPath, { headers: this.headers }).then(
      r => r.text(),
    );

    console.log('Parsing chapter', chapterPath);

    const $ = loadCheerio(body);

    const baseUrl = chapterPath.substring(
      0,
      chapterPath.indexOf('/OEBPS/') + '/OEBPS/'.length,
    );

    $('img').each(function () {
      const img = $(this);
      let src = img.attr('src');

      if (src && src.startsWith('../')) {
        src = src.replace('../', baseUrl);
        img.attr('src', src);
      }
    });

    // parse chapter text here
    const chapterText = $.html();
    return chapterText;
  }

  async searchNovels(
    searchTerm: string,
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
    let link = `${this.site}/books?`;

    const body = await fetch(
      link +
        new URLSearchParams({
          page: (pageNo - 1).toString(),
          library_id: '0EZ7QCKACD2EH',
          search: searchTerm,
        }),
      { headers: this.headers },
    ).then(r => r.json());

    return body.content.map(
      (book: { name: string; id: string }): Plugin.NovelItem => ({
        name: book.name,
        path: `/books/${book.id}`,
        cover: `${this.site}/books/${book.id}/thumbnail`,
      }),
    );
  }

  async fetchImage(url: string): Promise<string | undefined> {
    // if your plugin has images and they won't load
    // this is the function to fiddle with

    return await fetchFile(url, { headers: this.headers });
  }
}

export default new Komga();
