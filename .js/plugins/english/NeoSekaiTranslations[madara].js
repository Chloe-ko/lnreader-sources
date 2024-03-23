"use strict";var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,i){function o(e){try{s(r.next(e))}catch(e){i(e)}}function l(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(o,l)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,i,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(s){return function(l){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(o=0)),o;)try{if(a=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return o.label++,{value:l[1],done:0};case 5:o.label++,r=l[1],l=[0];continue;case 7:l=o.ops.pop(),o.trys.pop();continue;default:if(!(n=o.trys,(n=n.length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){o=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){o.label=l[1];break}if(6===l[0]&&o.label<n[1]){o.label=n[1],n=l;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(l);break}n[2]&&o.ops.pop(),o.trys.pop();continue}l=t.call(e,o)}catch(e){l=[6,e],r=0}finally{a=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:1}}([l,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),n=require("cheerio"),i=require("@libs/defaultCover"),o=require("@libs/novelStatus"),l=a(require("dayjs")),s=function(e,t){return new RegExp(t.join("|")).test(e)},u=new(function(){function a(e){var t;this.fetchImage=r.fetchFile,this.parseData=function(e){var t,a=(0,l.default)(),r=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(r,10);if(!r)return e;if(s(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(s(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(s(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(s(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(s(e,["week","semana"]))a.subtract(n,"week");else if(s(e,["month","mes"]))a.subtract(n,"month");else{if(!s(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),".png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return a.prototype.getHostname=function(e){return e.split("/")[2]},a.prototype.getCheerio=function(a){return e(this,void 0,void 0,(function(){var e,i,o,l;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(a)];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return o=n.load,[4,e.text()];case 2:if(i=o.apply(void 0,[t.sent()]),l=i("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==l||"You are being redirected..."==l||"Un instant..."==l||"Just a moment..."==l||"Redirecting..."==l)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},a.prototype.parseNovels=function(e){var t=this,a=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(r,n){var i=e(n).find(".post-title").text().trim(),o=e(n).find(".post-title").find("a").attr("href")||"";if(i&&o){var l=e(n).find("img"),s={name:i,cover:l.attr("data-src")||l.attr("src"),path:o.replace(t.site,"")};a.push(s)}})),a},a.prototype.popularNovels=function(a,r){var n=r.filters,i=r.showLatestNovels;return e(this,void 0,void 0,(function(){var e,r,o,l,s,u;return t(this,(function(t){switch(t.label){case 0:for(r in e=this.site+"/page/"+a+"/?s=&post_type=wp-manga",n||(n={}),i&&(e+="&m_orderby=latest"),n)if("object"==typeof n[r].value)for(o=0,l=n[r].value;o<l.length;o++)s=l[o],e+="&".concat(r,"=").concat(s);else n[r].value&&(e+="&".concat(r,"=").concat(n[r].value));return[4,this.getCheerio(e)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},a.prototype.parseNovel=function(a){var s;return e(this,void 0,void 0,(function(){var e,u,c,h,p,m,v,d,f=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(u=(0,n.load)(e))(".manga-title-badges, #manga-title span").remove(),(c={path:a,name:u(".post-title h1").text().trim()||u("#manga-title h1").text()}).cover=u(".summary_image > a > img").attr("data-lazy-src")||u(".summary_image > a > img").attr("data-src")||u(".summary_image > a > img").attr("src")||u(".summary_image > a > img").attr("src")||i.defaultCover,u(".post-content_item, .post-content").each((function(){var e=u(this).find("h5").text().trim(),t=u(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":c.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":c.author=t;break;case"Status":case"Estado":c.status=t.includes("OnGoing")||t.includes("مستمرة")?o.NovelStatus.Ongoing:o.NovelStatus.Completed}})),u("div.summary__content .code-block,script").remove(),c.summary=u("div.summary__content").text().trim()||u("#tab-manga-about").text().trim()||u('.post-content_item h5:contains("Summary")').next().text().trim(),h=[],p="",(null===(s=this.options)||void 0===s?void 0:s.useNewChapterEndpoint)?[4,(0,r.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return p=t.sent(),[3,5];case 3:return m=u(".rating-post-id").attr("value")||u("#manga-chapters-holder").attr("data-id")||"",(v=new FormData).append("action","manga_get_chapters"),v.append("manga",m),[4,(0,r.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:v}).then((function(e){return e.text()}))];case 4:p=t.sent(),t.label=5;case 5:return"0"!==p&&(u=(0,n.load)(p)),d=u(".wp-manga-chapter").length,u(".wp-manga-chapter").each((function(e,t){var a=u(t).find("a").text().trim(),r=u(t).find("span.chapter-release-date").text().trim();r=r?f.parseData(r):(0,l.default)().format("LL");var n=u(t).find("a").attr("href")||"";h.push({name:a,path:n.replace(f.site,""),releaseTime:r||null,chapterNumber:d-e})})),c.chapters=h.reverse(),[2,c]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,i;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),i=(0,n.load)(e),[2,i(".text-left").html()||i(".text-right").html()||i(".entry-content").html()||i(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+r+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},a}())({id:"neosekaiTLS",sourceSite:"https://www.neosekaitranslations.com/",sourceName:"NeoSekai Translations",filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Harem",value:"harem"},{label:"Horror",value:"horror"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-Fi",value:"sci-fi"},{label:"Slice of Life",value:"slice-of-life"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"Completed",value:"complete"},{label:"Ongoing",value:"on-going"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=u;