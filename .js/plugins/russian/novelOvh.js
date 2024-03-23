"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{l(r.next(e))}catch(e){a(e)}}function s(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}l((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:0};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:1}}([s,l])}}},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/filterInputs"),o=require("@libs/fetch"),a=require("@libs/novelStatus"),i=n(require("dayjs")),s=function(){function n(){var e=this;this.id="novelovh",this.name="НовелОВХ",this.site="https://novel.ovh",this.version="1.0.0",this.icon="src/ru/novelovh/icon.png",this.jsonToHtml=function(t,n,r){return void 0===r&&(r=""),t.forEach((function(t){var o,a,i;switch(t.type){case"image":(null===(a=null===(o=t.attrs)||void 0===o?void 0:o.pages)||void 0===a?void 0:a[0])&&(r+='<img src="'.concat(n[t.attrs.pages[0]],'"/>'));break;case"hardBreak":r+="<br>";break;case"horizontalRule":case"delimiter":r+='<h2 style="text-align: center">***</h2>';break;case"paragraph":r+="<p"+((null===(i=null==t?void 0:t.attrs)||void 0===i?void 0:i.textAlign)?' style="text-align: '.concat(t.attrs.textAlign,'"'):"")+">"+(t.content?e.jsonToHtml(t.content,n):"<br>")+"</p>";break;case"text":r+=t.text;break;default:r+=JSON.stringify(t,null,"\t")}})),r},this.fetchImage=o.fetchFile,this.resolveUrl=function(t,n){return e.site+"/novel/"+t},this.filters={sort:{label:"Сортировка",value:"averageRating",options:[{label:"Кол-во просмотров",value:"viewsCount"},{label:"Кол-во лайков",value:"likesCount"},{label:"Кол-во глав",value:"chaptersCount"},{label:"Кол-во закладок",value:"bookmarksCount"},{label:"Рейтингу",value:"averageRating"},{label:"Дате создания",value:"createdAt"},{label:"Дате обновления",value:"updatedAt"}],type:r.FilterTypes.Picker}}}return n.prototype.popularNovels=function(n,r){var a,i=r.showLatestNovels,s=r.filters;return e(this,void 0,void 0,(function(){var e,r,l;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"/novel?page="+(n-1),e+="&sort="+(i?"updatedAt":(null===(a=null==s?void 0:s.sort)||void 0===a?void 0:a.value)||"averageRating")+",desc",[4,(0,o.fetchApi)(e+"&_data=routes/reader/book/index")];case 1:return[4,t.sent().json()];case 2:return r=t.sent(),l=[],r.books.forEach((function(e){return l.push({name:e.name.ru,cover:e.poster,path:e.slug})})),[2,l]}}))}))},n.prototype.parseNovel=function(n){var r,s,l;return e(this,void 0,void 0,(function(){var e,u,c;return t(this,(function(t){switch(t.label){case 0:return[4,(0,o.fetchApi)(this.resolveUrl(n,1)+"?_data=routes/reader/book/$slug/index")];case 1:return[4,t.sent().json()];case 2:return e=t.sent(),u={path:n,name:e.book.name.ru,cover:e.book.poster,genres:null===(s=null===(r=e.book.labels)||void 0===r?void 0:r.map)||void 0===s?void 0:s.call(r,(function(e){return e.name})).join(","),summary:e.book.description,status:"ONGOING"==e.book.status?a.NovelStatus.Ongoing:a.NovelStatus.Completed},null===(l=e.book.relations)||void 0===l||l.forEach((function(e){switch(e.type){case"AUTHOR":u.author=e.publisher.name;case"ARTIST":u.artist=e.publisher.name}})),c=[],e.chapters.forEach((function(t,r){return c.push({name:t.title||"Том "+(t.volume||0)+" "+(t.name||"Глава "+(t.number||e.chapters.length-r)),path:n+"/"+t.id+"/0",releaseTime:(0,i.default)(t.createdAt).format("LLL"),chapterNumber:e.chapters.length-r})})),u.chapters=c.reverse(),[2,u]}}))}))},n.prototype.parseChapter=function(n){var r;return e(this,void 0,void 0,(function(){var e,a;return t(this,(function(t){switch(t.label){case 0:return[4,(0,o.fetchApi)("https://api.novel.ovh/v2/chapters/"+n.split("/")[1])];case 1:return[4,t.sent().json()];case 2:return e=t.sent(),a=Object.fromEntries((null===(r=null==e?void 0:e.pages)||void 0===r?void 0:r.map((function(e){return[e.id,e.image]})))||[]),[2,this.jsonToHtml(e.content.content||[],a)]}}))}))},n.prototype.searchNovels=function(n,r){return void 0===r&&(r=1),e(this,void 0,void 0,(function(){var e,a,i;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"/novel?search=").concat(n,"&page=").concat(r-1),[4,(0,o.fetchApi)(e+"&_data=routes/reader/book/index")];case 1:return[4,t.sent().json()];case 2:return a=t.sent(),i=[],a.books.forEach((function(e){return i.push({name:e.name.ru,cover:e.poster,path:e.slug})})),[2,i]}}))}))},n}();exports.default=new s;