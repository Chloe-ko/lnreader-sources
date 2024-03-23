"use strict";var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(r,n){function i(e){try{u(l.next(e))}catch(e){n(e)}}function o(e){try{u(l.throw(e))}catch(e){n(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}u((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,r,n,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return n={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,o[0]&&(i=0)),i;)try{if(a=1,l&&(r=2&o[0]?l.return:o[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,o[1])).done)return r;switch(l=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){i.label=o[1];break}if(6===o[0]&&i.label<r[1]){i.label=r[1],r=o;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(o);break}r[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],l=0}finally{a=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),l=require("@libs/fetch"),r=require("@libs/filterInputs"),n=function(){function n(){this.id="sakura.id",this.name="SakuraNovel",this.icon="src/id/sakuranovel/icon.png",this.site="https://sakuranovel.id/",this.version="1.0.1",this.filters={status:{value:"",label:"Status",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Completed",value:"completed"}],type:r.FilterTypes.Picker},type:{value:"",label:"Type",options:[{label:"All",value:""},{label:"Web Novel",value:"Web+Novel"},{label:"Light Novel",value:"Light+Novel"}],type:r.FilterTypes.Picker},sort:{value:"rating",label:"Order By",options:[{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"},{label:"Rating",value:"rating"}],type:r.FilterTypes.Picker},lang:{value:["china","jepang","korea","unknown"],label:"Country",options:[{label:"China",value:"china"},{label:"Jepang",value:"jepang"},{label:"Korea",value:"korea"},{label:"Unknown",value:"unknown"}],type:r.FilterTypes.CheckboxGroup},genre:{value:[],label:"Genres",options:[{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Horror",value:"horror"},{label:"Josei",value:"josei"},{label:"Josei",value:"josei"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shounen",value:"shounen"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"}],type:r.FilterTypes.CheckboxGroup}}}return n.prototype.parseNovels=function(e){var t=this,a=[];return e(".flexbox2-item").each((function(l,r){var n=e(r).find(".flexbox2-title span").first().text(),i=e(r).find("img").attr("src"),o=e(r).find(".flexbox2-content > a").attr("href");o&&a.push({name:n,cover:i,path:o.replace(t.site,"")})})),a},n.prototype.popularNovels=function(r,n){var i=n.filters;return e(this,void 0,void 0,(function(){var e,n,o;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"advanced-search/page/").concat(r,"/?title&author&yearx"),e+="&status=".concat(i.status.value),e+="&type=".concat(i.type.value),e+="&order=".concat(i.sort.value),i.lang.value.length&&(e+=i.lang.value.map((function(e){return"&country[]=".concat(e)})).join("")),i.genre.value.length&&(e+=i.genre.value.map((function(e){return"&genre[]=".concat(e)})).join("")),[4,(0,l.fetchApi)(e)];case 1:return[4,t.sent().text()];case 2:return n=t.sent(),o=(0,a.load)(n),[2,this.parseNovels(o)]}}))}))},n.prototype.parseNovel=function(r){var n,i;return e(this,void 0,void 0,(function(){var e,o,u,s,c,v,p=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+r)];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),(o=(0,a.load)(e))(".series-synops div").remove(),(u={path:r,name:o(".series-title h2").text().trim()||"Untitled",cover:o(".series-thumb img").attr("src"),author:o(".series-infolist > li b:contains('Author') +").text().trim(),status:o(".status").text().trim(),summary:o(".series-synops").text().trim(),chapters:[]}).genres=o(".series-genres").children("a").map((function(e,t){return o(t).text()})).toArray().join(","),s=null===(i=null===(n=u.cover)||void 0===n?void 0:n.split("/").pop())||void 0===i?void 0:i.split("-").join(" ").split(".")[0],c=u.name.replace(/\(LN\)|\(WN\)/,"").split(",")[0].trim(),v=[],o(".series-flexright li").each((function(e,t){var a=o(t).find("a span").first().text().replace(c,"").replace(s,"").replace(/Bahasa Indonesia/,"").replace(/\s+/g," ").trim(),l=o(t).find(".date").text().trim().split("/").map((function(e){return Number(e)})),r=o(t).find("a").attr("href");r&&v.push({name:a,releaseTime:new Date(l[2],l[1],l[0]).toISOString(),path:r.replace(p.site,"")})})),u.chapters=v.reverse(),[2,u]}}))}))},n.prototype.parseChapter=function(r){return e(this,void 0,void 0,(function(){var e,n,i;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+r)];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),n=(0,a.load)(e),i=n("div:contains('Daftar Isi') +").find("div:first").attr("class"),n(".".concat(i)).remove(),[2,n("div:contains('Daftar Isi') +").html()||""]}}))}))},n.prototype.searchNovels=function(r,n){return e(this,void 0,void 0,(function(){var e,i,o;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"page/").concat(n,"/?s=").concat(r),[4,(0,l.fetchApi)(e)];case 1:return[4,t.sent().text()];case 2:return i=t.sent(),o=(0,a.load)(i),[2,this.parseNovels(o)]}}))}))},n.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return t(this,(function(e){return[2,(0,l.fetchFile)(a)]}))}))},n}();exports.default=new n;