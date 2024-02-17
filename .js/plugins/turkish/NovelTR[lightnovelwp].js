"use strict";var __awaiter=(this&&this.__awaiter)||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});};var __generator=(this&&this.__generator)||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),"throw":verb(1),"return":verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||(op[1]>t[0]&&op[1]<t[3]))){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}};Object.defineProperty(exports,"__esModule",{value:true});var cheerio_1=require("cheerio");var fetch_1=require("@libs/fetch");var novelStatus_1=require("@libs/novelStatus");var defaultCover_1=require("@libs/defaultCover");var LightNovelWPPlugin=(function(){function LightNovelWPPlugin(metadata){this.fetchImage=fetch_1.fetchFile;this.id=metadata.id;this.name=metadata.sourceName;this.icon="multisrc/lightnovelwp/".concat(metadata.id,".png");this.site=metadata.sourceSite;this.version="1.0.2";this.options=metadata.options;this.filters=metadata.filters;}LightNovelWPPlugin.prototype.getHostname=function(url){return url.split("/")[2];};LightNovelWPPlugin.prototype.getCheerio=function(url,search){return __awaiter(this,void 0,void 0,function(){var r,body,$,title;return __generator(this,function(_a){switch(_a.label){case 0:return[4,(0,fetch_1.fetchApi)(url)];case 1:r=_a.sent();if(!r.ok&&search!=true)throw new Error("You got banned ? (check in webview)");return[4,r.text()];case 2:body=_a.sent();$=(0,cheerio_1.load)(body);title=$("title").text().trim();if(this.getHostname(url)!=this.getHostname(r.url)||title=="Bot Verification"||title=="You are being redirected...")throw new Error("Captcha error, please open in webview");return[2,($)];}});});};LightNovelWPPlugin.prototype.parseNovels=function($){var _this=this;var novels=[];$("div.listupd > article").each(function(i,elem){var novelName=$(elem).find("h2").text();var image=$(elem).find("img");var novelUrl=$(elem).find("a").attr("href");if(novelUrl){novels.push({name:novelName,cover:image.attr("data-src")||image.attr("src")||defaultCover_1.defaultCover,path:novelUrl.replace(_this.site,""),});}});return novels;};LightNovelWPPlugin.prototype.popularNovels=function(pageNo,_a){var filters=_a.filters,showLatestNovels=_a.showLatestNovels;return __awaiter(this,void 0,void 0,function(){var url,key,_i,_b,value,$;return __generator(this,function(_c){switch(_c.label){case 0:url=this.site+"/series/?page="+pageNo;if(!filters)filters={};if(showLatestNovels)url+="&order=latest";for(key in filters){if(typeof filters[key].value==="object")for(_i=0,_b=filters[key].value;_i<_b.length;_i++){value=_b[_i];url+="&".concat(key,"=").concat(value);}else if(filters[key].value)url+="&".concat(key,"=").concat(filters[key].value);}return[4,this.getCheerio(url,false)];case 1:$=_c.sent();return[2,this.parseNovels($)];}});});};LightNovelWPPlugin.prototype.parseNovel=function(novelPath){var _a,_b;return __awaiter(this,void 0,void 0,function(){var $,novel,image,details,genres,summary,chapters;var _this=this;return __generator(this,function(_c){switch(_c.label){case 0:return[4,this.getCheerio(this.site+novelPath,false)];case 1:$=_c.sent();novel={path:novelPath.replace(this.site,""),name:"Untitled"};novel.name=$("h1.entry-title").text().trim();image=$("img.wp-post-image");novel.cover=image.attr("data-src")||image.attr("src")||defaultCover_1.defaultCover;switch(((_a=$("div.sertostat > span").attr("class"))===null||_a===void 0?void 0:_a.toLowerCase())||""){case"completed":novel.status=novelStatus_1.NovelStatus.Completed;break;case"ongoing":novel.status=novelStatus_1.NovelStatus.Ongoing;break;case"hiatus":novel.status=novelStatus_1.NovelStatus.OnHiatus;break;default:novel.status=novelStatus_1.NovelStatus.Unknown;break;}details=$("div.serl > span");if(!details.length)details=$("div.spe > span");details.each(function(){var detailName=$(this).contents().first().text().replace(":","").trim().toLowerCase();var detail=$(this).contents().last().text().trim().toLowerCase();switch(detailName){case"الكاتب":case"author":case"auteur":novel.author=detail;break;case"الحالة":case"status":switch(detail){case"مكتملة":case"completed":novel.status=novelStatus_1.NovelStatus.Completed;break;case"مستمرة":case"ongoing":novel.status=novelStatus_1.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":novel.status=novelStatus_1.NovelStatus.OnHiatus;break;default:novel.status=novelStatus_1.NovelStatus.Unknown;break;}break;case"الفنان":case"artist":case"artiste":novel.artist=detail;break;}});genres=$(".sertogenre");if(!genres.length)genres=$(".genxed");novel.genres=genres.children("a").map(function(i,el){return $(el).text();}).toArray().join(",");summary=$(".sersys > p").map(function(i,el){return $(el).text().trim();}).toArray();if(!summary.length)summary=$(".entry-content > p").map(function(i,el){return $(el).text().trim();}).toArray();novel.summary=summary.join("\n");chapters=[];$(".eplister li").each(function(i,elem){var chapterName=$(elem).find(".epl-num").text()+" "+$(elem).find(".epl-title").text();var chapterUrl=$(elem).find("a").attr("href")||"";var releaseTime=$(elem).find(".epl-date").text().trim();var isFreeChapter;switch($(elem).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"":isFreeChapter=true;break;default:isFreeChapter=false;break;}if(isFreeChapter)chapters.push({name:chapterName,path:chapterUrl.replace(_this.site,""),releaseTime:releaseTime,});});if(((_b=this.options)===null||_b===void 0?void 0:_b.reverseChapters)&&chapters.length)chapters.reverse();novel.chapters=chapters;return[2,novel];}});});};LightNovelWPPlugin.prototype.parseChapter=function(chapterPath){var _a;return __awaiter(this,void 0,void 0,function(){var $,ignore;return __generator(this,function(_b){switch(_b.label){case 0:return[4,this.getCheerio(this.site+chapterPath,false)];case 1:$=_b.sent();if(this.id=="kolnovel"){ignore=$("article > style").text().trim().split(",");ignore.push.apply(ignore,(((_a=ignore.pop())===null||_a===void 0?void 0:_a.match(/^\.\w+/))||[]));ignore.map(function(tag){return $("p".concat(tag)).remove();});}return[2,$(".epcontent p").map(function(i,el){return $(el);}).toArray().join("\n")||""];}});});};LightNovelWPPlugin.prototype.searchNovels=function(searchTerm,page){return __awaiter(this,void 0,void 0,function(){var url,$;return __generator(this,function(_a){switch(_a.label){case 0:url=this.site+"page/"+page+"/?s="+searchTerm;return[4,this.getCheerio(url,true)];case 1:$=_a.sent();return[2,this.parseNovels($)];}});});};return LightNovelWPPlugin;}());var plugin=new LightNovelWPPlugin({"id":"noveltr","sourceSite":"https://noveltr.com/","sourceName":"NovelTR","options":{"lang":"Turkish","reverseChapters":true},"filters":{"genre[]":{"type":"Checkbox","label":"Genre","value":[],"options":[{"label":"Aksiyon","value":"aksiyon"},{"label":"Bilim Kurgu","value":"bilim-kurgu"},{"label":"Büyü","value":"buyu"},{"label":"Comedy","value":"comedy"},{"label":"Doğaüstü","value":"dogaustu"},{"label":"dövüş sanatları","value":"dovus-sanatlari"},{"label":"Dram","value":"dram"},{"label":"Drama","value":"drama"},{"label":"ecchi","value":"ecchi"},{"label":"fantastik","value":"fantastik"},{"label":"Fantasy","value":"fantasy"},{"label":"gizem","value":"gizem"},{"label":"Harem","value":"harem"},{"label":"isekai","value":"isekai"},{"label":"Josei","value":"josei"},{"label":"Komedi","value":"komedi"},{"label":"korku","value":"korku"},{"label":"macera","value":"macera"},{"label":"Mecha","value":"mecha"},{"label":"okul","value":"okul"},{"label":"oyun","value":"oyun"},{"label":"psikoloji","value":"psikoloji"},{"label":"Psychological","value":"psychological"},{"label":"reenkarnasyon","value":"reenkarnasyon"},{"label":"Romance","value":"romance"},{"label":"Romantik","value":"romantik"},{"label":"School Life","value":"school-life"},{"label":"Sci-fi","value":"sci-fi"},{"label":"seinen","value":"seinen"},{"label":"Shoujo","value":"shoujo"},{"label":"Shounen","value":"shounen"},{"label":"Shounen Ai","value":"shounen-ai"},{"label":"Slice of Life","value":"slice-of-life"},{"label":"Smut","value":"smut"},{"label":"süper kahraman","value":"super-kahraman"},{"label":"Supernatural","value":"supernatural"},{"label":"tarih","value":"tarih"},{"label":"trajedi","value":"trajedi"},{"label":"Wuxia","value":"wuxia"},{"label":"Xianxia","value":"xianxia"},{"label":"Xuanhuan","value":"xuanhuan"},{"label":"Yaoi","value":"yaoi"},{"label":"yetişkin","value":"yetiskin"},{"label":"Yuri","value":"yuri"}]},"type[]":{"type":"Checkbox","label":"Tür","value":[],"options":[{"label":"Web Novel","value":"web-novel"}]},"status":{"type":"Picker","label":"Durum","value":"","options":[{"label":"Hepsi","value":""},{"label":"Devam Ediyor","value":"ongoing"},{"label":"Askıda","value":"hiatus"},{"label":"Tamamlanmış","value":"completed"}]},"order":{"type":"Picker","label":"Sıralama","value":"","options":[{"label":"Varsayılan","value":""},{"label":"A-Z","value":"title"},{"label":"Z-A","value":"titlereverse"},{"label":"Latest Update","value":"update"},{"label":"Latest Added","value":"latest"},{"label":"Popular","value":"popular"}]}}});exports.default=plugin;