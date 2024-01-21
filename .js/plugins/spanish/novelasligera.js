"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var Ligera = /** @class */ (function () {
    function Ligera() {
        this.id = "ligera.com";
        this.name = "Novelas Ligera";
        this.icon = "src/es/novelasligera/icon.png";
        this.site = "https://novelasligera.com/";
        this.version = "1.0.0";
        this.baseUrl = this.site;
    }
    Ligera.prototype.popularNovels = function (pageNo, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio, novels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio(".elementor-column").each(function () {
                            var novelName = loadedCheerio(this)
                                .find(".widget-image-caption.wp-caption-text")
                                .text();
                            if (novelName) {
                                var novelCover = loadedCheerio(this)
                                    .find("a > img")
                                    .attr("data-lazy-src");
                                var novelUrl = loadedCheerio(this).find("a").attr("href");
                                if (!novelUrl)
                                    return;
                                var novel = {
                                    name: novelName,
                                    cover: novelCover,
                                    url: novelUrl,
                                };
                                novels.push(novel);
                            }
                        });
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    Ligera.prototype.parseNovelAndChapters = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio, novel, novelChapters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl + "novela/" + novelUrl;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = { url: url };
                        novel.name = loadedCheerio("h1").text();
                        novel.cover = loadedCheerio(".elementor-widget-container")
                            .find("img")
                            .attr("src");
                        loadedCheerio(".elementor-row")
                            .find("p")
                            .each(function () {
                            if (loadedCheerio(this).text().includes("Autor:")) {
                                novel.author = loadedCheerio(this)
                                    .text()
                                    .replace("Autor:", "")
                                    .trim();
                            }
                            if (loadedCheerio(this).text().includes("Estado:")) {
                                novel.status = loadedCheerio(this)
                                    .text()
                                    .replace("Estado: ", "")
                                    .trim();
                            }
                            if (loadedCheerio(this).text().includes("Género:")) {
                                loadedCheerio(this).find("span").remove();
                                novel.genres = loadedCheerio(this)
                                    .text()
                                    .replace(/,\s/g, ",");
                            }
                        });
                        novel.summary = loadedCheerio(".elementor-text-editor.elementor-clearfix").text();
                        novelChapters = [];
                        loadedCheerio(".elementor-accordion-item").remove();
                        loadedCheerio(".elementor-tab-content")
                            .find("li")
                            .each(function () {
                            var chapterName = loadedCheerio(this).text();
                            var releaseDate = null;
                            var chapterUrl = loadedCheerio(this).find("a").attr("href");
                            if (!chapterUrl)
                                return;
                            var chapter = {
                                name: chapterName,
                                releaseTime: releaseDate,
                                url: chapterUrl,
                            };
                            novelChapters.push(chapter);
                        });
                        novel.chapters = novelChapters;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    Ligera.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = chapterUrl;
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        loadedCheerio(".osny-nightmode.osny-nightmode--left").remove();
                        loadedCheerio(".code-block.code-block-1").remove();
                        loadedCheerio(".adsb30").remove();
                        loadedCheerio(".saboxplugin-wrap").remove();
                        loadedCheerio(".wp-post-navigation").remove();
                        chapterText = loadedCheerio(".entry-content").html() || '';
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    Ligera.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, loadedCheerio, novels;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl + "?s=" + searchTerm + "&post_type=wp-manga";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novels = [];
                        loadedCheerio(".inside-article").each(function () {
                            var novelCover = loadedCheerio(this).find("img").attr("src");
                            var novelUrl = loadedCheerio(this).find("a").attr("href");
                            var novelName;
                            if (novelUrl) {
                                novelName = novelUrl.replace(/-/g, " ").replace(/^./, function (x) {
                                    return x.toUpperCase();
                                });
                            }
                            novelUrl += "/";
                            if (!novelName || !novelUrl)
                                return;
                            var novel = {
                                name: novelName,
                                cover: novelCover,
                                url: novelUrl,
                            };
                            novels.push(novel);
                        });
                        novels = [__assign({}, novels[1])];
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    Ligera.prototype.fetchImage = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, fetch_1.fetchFile)(url)];
            });
        });
    };
    return Ligera;
}());
exports.default = new Ligera();