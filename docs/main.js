(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"1Nvw":function(e,t,o){"use strict";(function(e){o.d(t,"c",function(){return u}),o.d(t,"a",function(){return d}),o.d(t,"d",function(){return f}),o.d(t,"b",function(){return b});var a,r=o("1p3o");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const s=(e,t)=>{return t*(r.b[e.stockCode]?r.b[e.stockCode]:1)},n=e=>[...e].sort((e,t)=>s(e,e.sellingRatio)-s(t,t.sellingRatio))[0],c=e=>[...e].sort((e,t)=>s(t,t.buyingRatio)-s(e,e.buyingRatio))[0],l=(e,t)=>Math.round(100*(e-t))/100,i=(e=0,t=0,o=5)=>{const a=100*Math.floor(t/e/100);return a<=0?0:t<a*e*(1+o/1e4)?a-100:a},u=(e,t)=>{const o=c(e);return{value:l(o.buyingRatio,t.sellingRatio),compareWith:{stockCode:o.stockCode,stockName:o.name,ratio:o.buyingRatio,price:o.buyingAt}}},d=(e=[{code:"",buyingAt:0,buyingRatio:0,sellingAt:0,sellingRatio:0}],t=0)=>{const o=n(e);return{...u(e,o),toBuy:{stockCode:o.stockCode,stockName:o.name,price:o.sellingAt,maxAmount:i(o.sellingAt,t)},timestamp:(new Date).getTime()}},f=(e,t)=>{const o=n(e);return{value:l(t.buyingRatio,o.sellingRatio),compareWith:{stockCode:o.stockCode,stockName:o.name,ratio:o.buyingRatio,price:o.buyingAt}}},b=(e=[{code:"",buyingAt:0,buyingRatio:0,sellingAt:0,sellingRatio:0}],t=[{stockCode:"",sellableAmount:0}])=>{const o=t.filter(e=>e.sellableAmount>0).reduce((e,t)=>(e[t.stockCode]=t.sellableAmount,e),{}),a=e.filter(e=>Object.keys(o).includes(e.stockCode)),r=c(a);return r?{...f(e,r),toSell:{stockCode:r.stockCode,stockName:r.name,price:r.buyingAt,maxAmount:o[r.stockCode]},timestamp:(new Date).getTime()}:null};var p,y;(p=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(p.register(s,"getFixedRatio","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(n,"getStockWithMinSellingRatio","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(c,"getStockWithMaxBuyingRatio","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(l,"getGapBetween","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(i,"cutoffAmount","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(u,"getBuyGap","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(d,"calcBuyingGap","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(f,"getSellGap","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js"),p.register(b,"calcSellingGap","/Users/naijialiu/myProjects/stock-eye/src/website/services/gapService.js")),(y=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&y(e)}).call(this,o("3UD+")(e))},"1p3o":function(e,t,o){"use strict";(function(e){var a;o.d(t,"b",function(){return r}),o.d(t,"a",function(){return s}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const r={sh601328:1.5},s={"深银":{threshold:2,lookBackDays:1,stocks:["sh600036","sz000001","sz002142"]},"沪银":{threshold:2,lookBackDays:2,stocks:["sh601398","sh601988","sh601288","sh601939","sh601328"]}},n=Object.values(s).reduce((e,t)=>e.concat(t.stocks),[]);var c,l;(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(c.register(r,"ZOOM","/Users/naijialiu/myProjects/stock-eye/src/website/settings.js"),c.register(s,"STOCK_GROUPS","/Users/naijialiu/myProjects/stock-eye/src/website/settings.js"),c.register(n,"STOCK_CODES","/Users/naijialiu/myProjects/stock-eye/src/website/settings.js"),c.register("","HOLDING_NEW_STOCK","/Users/naijialiu/myProjects/stock-eye/src/website/settings.js")),(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&l(e)}).call(this,o("3UD+")(e))},"2v45":function(e,t,o){"use strict";(function(e){o.d(t,"b",function(){return d}),o.d(t,"a",function(){return f});var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("FKWp"),l=o("3YF/"),i=o("jjvw");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var u="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const d=s.a.createContext(null),f=({children:e})=>{const t=Object(c.a)(),o=Object(l.a)(t),a=Object(i.a)();return s.a.createElement(d.Provider,{value:{groups:t,quotes:o,alarm:a}},e)};var b,p;u(f,"useSettings{groups}\nuseQuotes{quotes}\nuseAlarm{alarm}",()=>[c.a,l.a,i.a]),f.propTypes={children:n.node},f.defaultProps={children:null},(b=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(b.register(d,"StoreContext","/Users/naijialiu/myProjects/stock-eye/src/website/contexts.jsx"),b.register(f,"ContextProvider","/Users/naijialiu/myProjects/stock-eye/src/website/contexts.jsx")),(p=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&p(e)}).call(this,o("3UD+")(e))},"3SIN":function(module,__webpack_exports__,__webpack_require__){"use strict";(function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("q1tI"),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),prop_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("17x9"),prop_types__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__),enterModule;function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}enterModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("0cfB")).enterModule,enterModule&&enterModule(module);var __signature__="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(...e){super(...e),_defineProperty(this,"state",{error:null,errorInfo:null})}componentDidCatch(e,t){this.setState({error:e,errorInfo:t})}render(){const{children:e}=this.props,{error:t,errorInfo:o}=this.state;return t?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{style:{whiteSpace:"pre-wrap"}},t&&t.toString(),o.componentStack):e}__reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}_defineProperty(ErrorBoundary,"propTypes",{children:Object(prop_types__WEBPACK_IMPORTED_MODULE_1__.oneOfType)([prop_types__WEBPACK_IMPORTED_MODULE_1__.element,prop_types__WEBPACK_IMPORTED_MODULE_1__.array])}),_defineProperty(ErrorBoundary,"defaultProps",{children:null});const _default=ErrorBoundary;var reactHotLoader,leaveModule;__webpack_exports__.a=_default,reactHotLoader=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("0cfB")).default,reactHotLoader&&(reactHotLoader.register(ErrorBoundary,"ErrorBoundary","/Users/naijialiu/myProjects/stock-eye/src/website/components/ErrorBoundary.jsx"),reactHotLoader.register(_default,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/ErrorBoundary.jsx")),leaveModule=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:__webpack_require__("0cfB")).leaveModule,leaveModule&&leaveModule(module)}).call(this,__webpack_require__("3UD+")(module))},"3YF/":function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o("ZRNf"),n=o("xlw7"),c=o("M63F"),l=o("G8Pw"),i=o("1Nvw");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var u="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};function d(e,t){return Math.round(1e4*(e/t-1))/100}function f(e){let t=new Date;return Array.from({length:e}).forEach(()=>{t=Object(c.b)(t)}),t}async function b(e={stocks:["sz000001"],lookBackDays:1,DEFAULT:!0}){if(e.DEFAULT)return;const t=Object(s.b)(await Object(n.a)(e.stocks),"stockCode"),o=f(e.lookBackDays),a=await Promise.all(e.stocks.map(async e=>{const a=await Object(n.b)(e,o),r=t[e],s=d(r.current,r.closeAt),c=a.close,l=d(r.current,c),i=d(r.buyingAt,c),u=d(r.sellingAt,c);return{...r,currentRatio:s,baseAt:c,baseRatio:l,buyingRatio:i,sellingRatio:u}}));return a.forEach(e=>{Object.assign(e,{buyGap:Object(i.c)(a,e),sellGap:Object(i.d)(a,e)})}),a}const p=(e={})=>{const[t,o]=Object(r.useState)();async function a(){const t=await Promise.all(Object.entries(e).map(async([e,t])=>{return{groupName:e,groupQuotes:await b(t)}}));o(t)}return Object(r.useEffect)(()=>Object(l.a)({interval:3,runOnStartUp:!0})(a),[e]),t};var y,m;u(p,"useState{[quotes, setQuotes]}\nuseEffect{}"),t.a=p,(y=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(y.register(d,"calcRatio","/Users/naijialiu/myProjects/stock-eye/src/website/services/useQuotes.js"),y.register(f,"getLastTradeDay","/Users/naijialiu/myProjects/stock-eye/src/website/services/useQuotes.js"),y.register(b,"getQuotesInGroup","/Users/naijialiu/myProjects/stock-eye/src/website/services/useQuotes.js"),y.register(p,"default","/Users/naijialiu/myProjects/stock-eye/src/website/services/useQuotes.js")),(m=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&m(e)}).call(this,o("3UD+")(e))},"3pYM":function(e,t,o){"use strict";(function(e){var a;o.d(t,"a",function(){return n}),o.d(t,"b",function(){return c}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var r,s;"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;async function n(e){return(await fetch(`https://w68lqh1j90.execute-api.ap-southeast-2.amazonaws.com/prod/current_quotes?stockCodes=${e.join(",")}`)).json()}async function c(e,t){const o=`https://w68lqh1j90.execute-api.ap-southeast-2.amazonaws.com/prod/history_quotes?stockCode=${e}&date=${t.toISOString().substring(0,10)}`,a=await caches.open("stock-eye");let r=await a.match(o);return r||(await a.add(o),r=await a.match(o)),r.json()}(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(r.register(n,"fetchCurrentQuotes","/Users/naijialiu/myProjects/stock-eye/src/website/apis/awsApi.ts"),r.register(c,"fetchHistoryQuote","/Users/naijialiu/myProjects/stock-eye/src/website/apis/awsApi.ts")),(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&s(e)}).call(this,o("3UD+")(e))},DGeA:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("vOnD"),l=o("p+jJ"),i=o("kV8f");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const u={className:n.string,quotes:Object(n.arrayOf)(Object(n.shape)({name:n.string,price:n.number,currentRatio:n.number})),onWatch:n.func,stockCodeInWatch:n.string,groupName:n.string},d={className:null,quotes:[],onWatch:void 0,stockCodeInWatch:void 0,groupName:void 0},f=({current:e,previous:t,ratio:o})=>{const a=(1e3*e-1e3*t)/1e3;return s.a.createElement(i.a,{value:a,rate:o})};f.propTypes={current:n.number.isRequired,previous:n.number.isRequired,ratio:n.number.isRequired};const b=({className:e,groupName:t,quotes:o,onWatch:a,stockCodeInWatch:r})=>{return s.a.createElement("table",{className:e},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",null,t),s.a.createElement("th",null,"现价"),s.a.createElement("th",null,"今日涨跌"),s.a.createElement("th",null,"参考价"),s.a.createElement("th",null,"参考涨跌"),s.a.createElement("th",null,"买进GAP"),s.a.createElement("th",null,"卖出GAP"),s.a.createElement("th",null))),s.a.createElement("tbody",null,o.map(e=>s.a.createElement("tr",{key:e.name},s.a.createElement("td",null,e.name),s.a.createElement("td",null,e.current.toFixed(2)),s.a.createElement("td",null,s.a.createElement(f,{current:e.current,previous:e.closeAt,ratio:e.currentRatio})),s.a.createElement("td",null,e.baseAt.toFixed(2)),s.a.createElement("td",null,s.a.createElement(f,{current:e.current,previous:e.baseAt,ratio:e.baseRatio})),s.a.createElement("td",null,e.buyGap.value),s.a.createElement("td",null,e.sellGap.value),s.a.createElement("td",null,(e=>s.a.createElement(l.a,{type:e.stockCode===r?"primary":"default",onClick:()=>a&&a({target:{value:e.stockCode}})},"visibility"))(e))))))};b.propTypes=u,b.defaultProps=d;const p=Object(c.b)(b)`
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: solid 1px var(--border-color);
  }

  th,
  td {
    padding: var(--size-1);

    &:nth-child(1) {
      text-align: center;
    }

    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      text-align: right;
    }
  }
`;var y,m;t.a=p,(y=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(y.register(u,"propTypes","/Users/naijialiu/myProjects/stock-eye/src/website/components/Quotes.jsx"),y.register(d,"defaultProps","/Users/naijialiu/myProjects/stock-eye/src/website/components/Quotes.jsx"),y.register(f,"StockChange","/Users/naijialiu/myProjects/stock-eye/src/website/components/Quotes.jsx"),y.register(b,"Quotes","/Users/naijialiu/myProjects/stock-eye/src/website/components/Quotes.jsx"),y.register(p,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/Quotes.jsx")),(m=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&m(e)}).call(this,o("3UD+")(e))},"Ej+v":function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("0cfB"),l=o("vOnD"),i=o("YWC6"),u=o("uIXj"),d=o("2v45");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const f=({className:e})=>s.a.createElement(i.b,null,s.a.createElement(d.a,null,s.a.createElement(u.a,null),s.a.createElement("main",{className:e},s.a.createElement("article",null,s.a.createElement(i.a,null),s.a.createElement(i.c,null)),s.a.createElement("aside",null,s.a.createElement(i.d,null)),s.a.createElement(i.e,null))));f.propTypes={className:n.string},f.defaultProps={className:null};const b=Object(c.hot)(e)(Object(l.b)(f)`
  display: flex;
  min-height: 100vh;

  article {
    flex: 1;
  }

  aside {
    width: auto;
    background: #1e1e1d;
  }
`);var p,y;t.a=b,(p=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(p.register(f,"App","/Users/naijialiu/myProjects/stock-eye/src/website/App.jsx"),p.register(b,"default","/Users/naijialiu/myProjects/stock-eye/src/website/App.jsx")),(y=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&y(e)}).call(this,o("3UD+")(e))},FKWp:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o("1p3o");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const c=()=>{const[e,t]=Object(r.useState)();return Object(r.useEffect)(()=>{t(s.a)},[]),e};var l,i;n(c,"useState{[stockGroups, setStockGroups]}\nuseEffect{}"),t.a=c,(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&l.register(c,"default","/Users/naijialiu/myProjects/stock-eye/src/website/services/useSettings.js"),(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&i(e)}).call(this,o("3UD+")(e))},G8Pw:function(e,t,o){"use strict";(function(e){o.d(t,"a",function(){return n});var a,r=o("M63F"),s=o("gwhG");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const n=({interval:e=1,runOnStartUp:t=!0})=>{let o=!1,a=!1;return function n(c){if(a)return null;(async()=>{try{(t&&!o||Object(r.a)())&&(o=!0,await c())}catch(e){console.error(e),Object(s.a)({title:e.message})}finally{await Object(r.c)(e),n(c)}})();return()=>{a=!0}}};var c,l;(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&c.register(n,"runDuringTradeTime","/Users/naijialiu/myProjects/stock-eye/src/website/services/schedule.js"),(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&l(e)}).call(this,o("3UD+")(e))},IqKw:function(e,t,o){"use strict";o.r(t);var a=o("q1tI"),r=o.n(a),s=o("i8i4"),n=o("Ej+v");"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;document.addEventListener("DOMContentLoaded",()=>{Object(s.render)(r.a.createElement(n.a,null),document.getElementById("root"))})},M63F:function(e,t,o){"use strict";(function(e){var a;o.d(t,"a",function(){return l}),o.d(t,"c",function(){return i}),o.d(t,"b",function(){return u}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const r=(e,t)=>60*parseInt(e,10)+parseInt(t,10),s=(e,...t)=>t.some(t=>{const[,...o]=t.match(/(\d+):(\d+)-(\d+):(\d+)/)||[];return e>=r(o[0],o[1])&&e<=r(o[2],o[3])}),n=["2017-10-2","2017-10-3","2017-10-4","2017-10-5","2017-10-6","2019-2-4","2019-2-5","2019-2-6","2019-2-7","2019-2-8","2019-4-5","2019-5-1","2019-5-2","2019-5-3"].map(e=>new Date(e)),c=e=>{const t=e.getDay();if(0===t||6===t)return!1;return!n.some(t=>((e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate())(t,e))},l=(e=new Date)=>{if(!c(e))return!1;const t=r(e.getHours(),e.getMinutes());return s(t,"11:15-13:30","15:00-17:00")},i=async e=>new Promise(t=>setTimeout(t,1e3*e)),u=(e=new Date)=>{const t=e;do{t.setDate(t.getDate()-1)}while(!c(t));return t};var d,f;(d=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(d.register(r,"totalMinutes","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js"),d.register(s,"isTimeInAnyTimeSlots","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js"),d.register(n,"publicHolidays","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js"),d.register(c,"isTradeDay","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js"),d.register(l,"isTradeTime","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js"),d.register(i,"sleep","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js"),d.register(u,"lastTradeDay","/Users/naijialiu/myProjects/stock-eye/src/website/services/time.js")),(f=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&f(e)}).call(this,o("3UD+")(e))},O0a5:function(e,t,o){"use strict";(function(e){var a,r=o("vOnD");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const s=r.b.span`
  color: var(${e=>/^\s*-/.test(e.children)?"--green":"--red"});
`,n=s;var c,l;t.a=n,(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(c.register(s,"Number","/Users/naijialiu/myProjects/stock-eye/src/website/components/Number.jsx"),c.register(n,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/Number.jsx")),(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&l(e)}).call(this,o("3UD+")(e))},S1q7:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("vOnD"),l=o("O0a5");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const i=({className:e,quotes:t})=>s.a.createElement("ul",{className:e},t.map(e=>s.a.createElement("li",{key:e.name},s.a.createElement("span",{className:"title"},e.name.match(/[^A-Z]/)[0]),s.a.createElement(l.a,null,`${e.currentRatio.toFixed(2)}%`))));i.propTypes={className:n.string,quotes:Object(n.arrayOf)(Object(n.shape)({name:n.string,price:n.number,currentRatio:n.number}))},i.defaultProps={className:null,quotes:[]};const u=Object(c.b)(i)`
  opacity: 0.8;
  list-style: none;
  padding: 0;

  li {
    padding: var(--size-1);
    border-bottom: solid 1px var(--border-color);

    .title {
      color: #808080;
      margin-right: var(--size-half);
    }
  }
`;var d,f;t.a=u,(d=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(d.register(i,"Quotes","/Users/naijialiu/myProjects/stock-eye/src/website/components/LiteQuotes.jsx"),d.register(u,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/LiteQuotes.jsx")),(f=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&f(e)}).call(this,o("3UD+")(e))},SyQv:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("iUQo"),c=o("2v45"),l=o("gwhG");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const u=({groupName:e="",gap:t=0,trade:o="",stock:a="",price:r=0,additional:s=""})=>{const n=`${e}组合价差${t}%`,c=`${o} ${a} ${r} ${s}`;Object(l.a)({title:n,body:c})},d=()=>{const e=Object(r.useContext)(c.b);return Object(n.b)(e).filter(({groupName:e})=>"深银"===e).forEach(({groupName:e,buyingGap:t,sellingGap:o,threshold:a})=>{t&&t.value>=a&&u({groupName:e,gap:t.value,trade:"买",stock:t.toBuy.stockName,price:t.toBuy.price,additional:`相比${t.compareWith.stockName} ${t.compareWith.price}`}),o&&o.value>=a&&u({groupName:e,gap:o.value,trade:"卖",stock:o.toSell.stockName,price:o.toSell.price,additional:`相比${o.compareWith.stockName} ${o.compareWith.price}`})}),null};i(d,"useContext{store}");const f=()=>{const{alarm:e}=Object(r.useContext)(c.b);return"on"===e.status?s.a.createElement(d,null):null};i(f,"useContext{{ alarm }}");const b=f;var p,y;t.a=b,(p=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(p.register(u,"sendTradeSignal","/Users/naijialiu/myProjects/stock-eye/src/website/components/TradeSuggestion.jsx"),p.register(d,"TradeSuggestion","/Users/naijialiu/myProjects/stock-eye/src/website/components/TradeSuggestion.jsx"),p.register(f,"WithContext","/Users/naijialiu/myProjects/stock-eye/src/website/components/TradeSuggestion.jsx"),p.register(b,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/TradeSuggestion.jsx")),(y=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&y(e)}).call(this,o("3UD+")(e))},YWC6:function(e,t,o){"use strict";var a=o("oqBo");o.d(t,"c",function(){return a.a});var r=o("paYp");o.d(t,"d",function(){return r.a});var s=o("SyQv");o.d(t,"e",function(){return s.a});var n=o("3SIN");o.d(t,"b",function(){return n.a});o("p+jJ");var c=o("fGR6");o.d(t,"a",function(){return c.a});"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature},ZRNf:function(e,t,o){"use strict";(function(e){var a;o.d(t,"a",function(){return n}),o.d(t,"b",function(){return c}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const r=e=>e.filter(e=>e&&""!==e.trim()),s=e=>e.join(" "),n=(...e)=>s(r(e)),c=(e,t)=>e.reduce((e,o)=>Object.assign(e,{[o[t]]:o}),{});var l,i;(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(l.register(r,"filterNames","/Users/naijialiu/myProjects/stock-eye/src/website/services/util.js"),l.register(s,"joinNames","/Users/naijialiu/myProjects/stock-eye/src/website/services/util.js"),l.register(n,"classNames","/Users/naijialiu/myProjects/stock-eye/src/website/services/util.js"),l.register(c,"keyBy","/Users/naijialiu/myProjects/stock-eye/src/website/services/util.js")),(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&i(e)}).call(this,o("3UD+")(e))},fGR6:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("p+jJ"),l=o("2v45");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const u=({status:e,onChange:t})=>{return s.a.createElement(c.a,{type:"on"===e?"primary":"default",onClick:()=>{t&&t({target:{value:"on"===e?"off":"on"}})}},`alarm_${e}`)};u.propTypes={onChange:n.func,status:n.string},u.defaultProps={onChange:void 0,status:"on"};const d=()=>{const{alarm:e}=Object(r.useContext)(l.b);return s.a.createElement(u,{status:e.status,onChange:t=>e.setStatus(t.target.value)})};i(d,"useContext{{ alarm }}");const f=d;var b,p;t.a=f,(b=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(b.register(u,"AlarmControl","/Users/naijialiu/myProjects/stock-eye/src/website/components/AlarmControl.jsx"),b.register(d,"WithContext","/Users/naijialiu/myProjects/stock-eye/src/website/components/AlarmControl.jsx"),b.register(f,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/AlarmControl.jsx")),(p=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&p(e)}).call(this,o("3UD+")(e))},gwhG:function(e,t,o){"use strict";(function(e){var a;o.d(t,"a",function(){return n}),(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var r,s;"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;async function n(e){"Notification"in window&&("default"===Notification.permission&&await Notification.requestPermission(),"granted"===Notification.permission&&new Notification(e.title,e))}(r=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&r.register(n,"sendNotification","/Users/naijialiu/myProjects/stock-eye/src/website/notification.ts"),(s=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&s(e)}).call(this,o("3UD+")(e))},iUQo:function(e,t,o){"use strict";(function(e){o.d(t,"a",function(){return n}),o.d(t,"b",function(){return c});var a,r=o("G4qV"),s=o("1Nvw");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const n=Object(r.a)(e=>e.quotes,(e=[])=>e.reduce((e,t)=>e.concat(t.groupQuotes),[])),c=Object(r.a)(e=>e.groups,e=>e.quotes,(e,t=[])=>t.map(t=>({groupName:t.groupName,buyingGap:Object(s.a)(t.groupQuotes),sellingGap:Object(s.b)(t.groupQuotes),threshold:e[t.groupName].threshold})));var l,i;(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(l.register(n,"allQuotesSelector","/Users/naijialiu/myProjects/stock-eye/src/website/services/selectors.js"),l.register(c,"suggestionsSelector","/Users/naijialiu/myProjects/stock-eye/src/website/services/selectors.js")),(i=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&i(e)}).call(this,o("3UD+")(e))},jjvw:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var s="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const n=()=>{const[e,t]=Object(r.useState)("on");return{status:e,setStatus:t}};var c,l;s(n,"useState{[status, setStatus]('on')}"),t.a=n,(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&c.register(n,"default","/Users/naijialiu/myProjects/stock-eye/src/website/services/useAlarm.js"),(l=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&l(e)}).call(this,o("3UD+")(e))},kV8f:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("vOnD");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const l=e=>Math.sign(e),i=({className:e,value:t,rate:o})=>{if(null===t)return null;const a=l(t)>=0?"+":"",r="string"==typeof o?o:`${o.toFixed(2)}%`;return s.a.createElement("span",{className:e},`${t.toFixed(2)} (${a}${r})`)};i.propTypes={className:n.string,value:n.number,rate:Object(n.oneOfType)([n.string,n.number])},i.defaultProps={className:null,value:null,rate:null};const u=Object(c.b)(i)`
  color: var(${e=>l(e.value)>=0?"--red":"--green"});
`;var d,f;t.a=u,(d=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(d.register(l,"sign","/Users/naijialiu/myProjects/stock-eye/src/website/components/NumberRate.jsx"),d.register(i,"NumberRate","/Users/naijialiu/myProjects/stock-eye/src/website/components/NumberRate.jsx"),d.register(u,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/NumberRate.jsx")),(f=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&f(e)}).call(this,o("3UD+")(e))},oqBo:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("DGeA"),c=o("2v45"),l=o("iUQo");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const u=()=>{const[e,t]=Object(r.useState)(),o=Object(r.useContext)(c.b);Object(r.useEffect)(()=>{if(e){const t=Object(l.a)(o).find(({stockCode:t})=>t===e);t&&(document.title=`${t.name.substr(0,1)} ${t.current} (${t.currentRatio.toFixed(2)}%)`)}});const a=e=>{t(e.target.value)};return o.quotes?o.quotes.map(({groupName:t,groupQuotes:o})=>s.a.createElement(n.a,{key:t,groupName:t,quotes:o,onWatch:a,stockCodeInWatch:e})):null};i(u,"useState{[stockCodeInWatch, setStockCodeInWatch]}\nuseContext{store}\nuseEffect{}");const d=u;var f,b;t.a=d,(f=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(f.register(u,"Hq","/Users/naijialiu/myProjects/stock-eye/src/website/components/Hq.jsx"),f.register(d,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/Hq.jsx")),(b=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&b(e)}).call(this,o("3UD+")(e))},"p+jJ":function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("17x9"),c=o("vOnD"),l=o("ZRNf");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e}).apply(this,arguments)}(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const u=({className:e,children:t,type:o,...a})=>s.a.createElement("button",i({type:"button",className:Object(l.a)("material-icons",e)},a),t);u.propTypes={className:n.string,children:n.node,type:Object(n.oneOf)(["primary","default"])},u.defaultProps={className:void 0,children:void 0,type:"default"};const d=Object(c.b)(u)`
  border: 1px solid transparent;
  border-color: var(--border-color);
  outline: none;
  padding: 0;
  border-radius: 50%;
  font-size: var(--size-2);
  height: var(--size-3);
  width: var(--size-3);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${({type:e})=>"primary"===e&&"\n    color: var(--primary-color);\n    background: var(--primary-bg-color);\n    border-color: var(--primary-bg-color);\n  "}

  &:hover {
    color: var(--hover-color);
    background: transparent;
    border-color: var(--hover-color);
  }
`;var f,b;t.a=d,(f=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(f.register(u,"IconButton","/Users/naijialiu/myProjects/stock-eye/src/website/components/IconButton.jsx"),f.register(d,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/IconButton.jsx")),(b=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&b(e)}).call(this,o("3UD+")(e))},paYp:function(e,t,o){"use strict";(function(e){var a,r=o("q1tI"),s=o.n(r),n=o("S1q7"),c=o("2v45"),l=o("iUQo");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);var i="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e};const u=()=>{const e=Object(r.useContext)(c.b),t=Object(l.a)(e);return s.a.createElement(n.a,{quotes:t})};i(u,"useContext{store}");const d=u;var f,b;t.a=d,(f=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&(f.register(u,"LiteHq","/Users/naijialiu/myProjects/stock-eye/src/website/components/LiteHq.jsx"),f.register(d,"default","/Users/naijialiu/myProjects/stock-eye/src/website/components/LiteHq.jsx")),(b=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&b(e)}).call(this,o("3UD+")(e))},uIXj:function(e,t,o){"use strict";(function(e){var a,r=o("vOnD");(a=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).enterModule)&&a(e);"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature;const s=r.a`
  :root {
    --red: #c10;
    --green: #383;
    --primary-color: #fff;
    --primary-bg-color: #1890ff;
    --border-color: #d9d9d9;
    --hover-color: #40a9ff;

    --size-1: 8px;
    --size-half: calc(var(--size-1) * 0.5);
    --size-2: calc(var(--size-1) * 2);
    --size-3: calc(var(--size-1) * 3);
  }

  * {
    font-size: 14px;
    font-family: "Helvetica Neue";
    color: rgba(0,0,0,0.65);
    margin: 0;
  }

  // * {
  //   color: #fff !important;
  //   background: #fff !important;
  // }
`;var n,c;t.a=s,(n=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).default)&&n.register(s,"default","/Users/naijialiu/myProjects/stock-eye/src/website/App.css.jsx"),(c=("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal:o("0cfB")).leaveModule)&&c(e)}).call(this,o("3UD+")(e))},xlw7:function(e,t,o){"use strict";var a=o("3pYM");o.d(t,"a",function(){return a.a}),o.d(t,"b",function(){return a.b});"undefined"!=typeof reactHotLoaderGlobal&&reactHotLoaderGlobal.default.signature}},[["IqKw",1,2]]]);