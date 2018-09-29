!function(){"use strict";var e="undefined"==typeof global?self:global;if("function"!=typeof e.require){var t={},n={},r={},a={}.hasOwnProperty,u=/^\.\.?(\/|$)/,o=function(e,t){for(var n,r=[],a=(u.test(t)?e+"/"+t:t).split("/"),o=0,l=a.length;o<l;o++)n=a[o],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},l=function(e){return e.split("/").slice(0,-1).join("/")},i=function(t){return function(n){var r=o(l(t),n);return e.require(r,t)}},s=function(e,t){var r=v&&v.createHot(e),a={id:e,exports:{},hot:r};return n[e]=a,t(a.exports,i(e),a),a.exports},c=function(e){return r[e]?c(r[e]):e},f=function(e,t){return c(o(l(e),t))},d=function(e,r){null==r&&(r="/");var u=c(e);if(a.call(n,u))return n[u].exports;if(a.call(t,u))return s(u,t[u]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e};var p=/\.[^.\/]+$/,m=/\/index(\.[^\/]+)?$/,h=function(e){if(p.test(e)){var t=e.replace(p,"");a.call(r,t)&&r[t].replace(p,"")!==t+"/index"||(r[t]=e)}if(m.test(e)){var n=e.replace(m,"");a.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if(e&&"object"==typeof e)for(var u in e)a.call(e,u)&&d.register(u,e[u]);else t[e]=r,delete n[e],h(e)},d.list=function(){var e=[];for(var n in t)a.call(t,n)&&e.push(n);return e};var v=e._hmr&&new e._hmr(f,d,t,n);d._cache=n,d.hmr=v&&v.wrap,d.brunch=!0,e.require=d}}(),function(){var e;"undefined"==typeof window?this:window;require.register("components/apps_view.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=t("react"),c=r(s),f=t("lodash/bindAll"),d=r(f),p=t("lodash/clone"),m=(r(p),t("classnames")),h=r(m),v=t("../util.js"),y=t("react-toggle"),g=r(y),b=t("models/app.js"),_=r(b),k=t("./subscription_modal.jsx"),S=r(k),w=t("reactstrap"),E=function(e){function t(e){u(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return(0,d["default"])(n,["renderItem","renderSelected","clickCheck","render","handleAmountModeChange","clickEdit","clickAddSubscription","onSubmitModal"]),n.modalRef=c["default"].createRef(),n.state={apps:_["default"].allToJSON(),amountMode:"starting"},n}return l(t,e),i(t,[{key:"save",value:function(){localStorage.setItem("addresses",JSON.stringify(json||this.getAll()))}},{key:"clickAddSubscription",value:function(e){e.preventDefault(),this.modalRef.current.openWith(_["default"].blankApp())}},{key:"clickApp",value:function(e){e.selected||(e.selected=!0,_["default"].saveToLocalStorage(),this.resetAppsState())}},{key:"resetAppsState",value:function(){this.setState({apps:_["default"].allToJSON()})}},{key:"clickCheck",value:function(e,t){e.stopPropagation(),e.preventDefault(),t.selected=!1,this.resetAppsState()}},{key:"amountInputted",value:function(e,t){var n=this.state.amountMode+"_amount_cents",r=e.currentTarget.value,a=(0,v.dollarStringToCents)(r);a<0&&(a=0),t[this.state.amountMode+"_amount_cents_value"]=r,t[n]=a,this.resetAppsState()}},{key:"amountBlurred",value:function(e,t){var n=e.currentTarget.value;n&&(n=(0,v.centsToDollaString)((0,v.dollarStringToCents)(n)).replace("$","")),t[this.state.amountMode+"_amount_cents_value"]=n,this.resetAppsState()}},{key:"renderSelected",value:function(e){var t=this,n=e[this.state.amountMode+"_amount_cents_value"]||"";return c["default"].createElement("div",{className:"center-between",key:e.uuid},c["default"].createElement("div",{className:"center money-div mr-2"},c["default"].createElement("div",null,"$"),c["default"].createElement("input",{value:n,type:"number",className:"money-box",placeholder:"0.00",onChange:function(n){return t.amountInputted(n,e)},onBlur:function(n){return t.amountBlurred(n,e)}}),c["default"].createElement("div",{className:"per-what"},"/","monthly"==e.frequency?"mo":"yr")),c["default"].createElement("img",{onClick:function(n){return t.clickCheck(n,e)},className:"check mx-2",style:{width:20},src:"/check.svg"}))}},{key:"handleAmountModeChange",value:function(e){this.setState({amountMode:"starting"===this.state.amountMode?"current":"starting"})}},{key:"clickTrash",value:function(e,t){e.stopPropagation(),(!t.current_amount_cents&&!t.starting_amount_cents||confirm("Are you sure?"))&&(_["default"].remove(t),this.resetAppsState())}},{key:"clickEdit",value:function(e,t){e.stopPropagation(),this.modalRef.current.openWith(t.clone(),t.uuid)}},{key:"renderItem",value:function(e){var t=this,n=(0,h["default"])({selected:e.selected});return c["default"].createElement("div",{className:"center-between app-item "+n,onClick:function(){return t.clickApp(e)},key:e.uuid},c["default"].createElement("div",null,c["default"].createElement("div",null,e.name),e.selected&&c["default"].createElement("div",null,c["default"].createElement("a",{tabIndex:"-1",className:"site",href:e.site,target:"_blank"},e.site))),e.selected?this.renderSelected(e):c["default"].createElement("div",{className:"center-center"},c["default"].createElement("img",{onClick:function(n){return t.clickEdit(n,e)},className:"check mx-2",style:{width:20},src:"/pencil.svg"}),c["default"].createElement("img",{onClick:function(n){return t.clickTrash(n,e)},className:"check mx-2",style:{width:20},src:"/trash-empty.svg"})))}},{key:"renderContent",value:function(){var e,t=this.state.amountMode,n="starting"===t?"Starting amounts":"Current amounts",r=_["default"].getAll();return c["default"].createElement("div",null,c["default"].createElement("div",{className:"center-between mt-1"},c["default"].createElement(w.Button,{className:"ml-3",size:"sm",onClick:this.clickAddSubscription,outline:!0,color:"primary"},"Add Subscription")," ",c["default"].createElement("div",{className:"center"},c["default"].createElement(g["default"],{id:"amount-mode",defaultChecked:"starting"==this.state.amountMode,icons:!1,onChange:this.handleAmountModeChange}),c["default"].createElement("span",{className:"ml-1",id:"amount-mode"},n))),c["default"].createElement("div",{className:"center mt-1"},c["default"].createElement("div",(e={className:"list-group"},a(e,"className","mt-1"),a(e,"style",{width:400}),e),r.map(this.renderItem))))}},{key:"onSubmitModal",value:function(e,t){if(t){var n=_["default"].find(t);Object.assign(n,e)}else _["default"].addApp(e);this.modalRef.current.toggle(),this.resetAppsState()}},{key:"render",value:function(){return c["default"].createElement("div",{className:"container",id:"content"},c["default"].createElement(S["default"],{ref:this.modalRef,onSubmitModal:this.onSubmitModal}),c["default"].createElement("h5",{className:"lets-kill"},"Let's kill your subscriptions."),c["default"].createElement("div",{className:"starting-amount my-2"},"Starting amount: ",(0,v.centsToDollaString)(_["default"].sumStartingAmountsCents())," / mo"),c["default"].createElement("div",{className:"current-amount my-2"},"Current amount: ",(0,v.centsToDollaString)(_["default"].sumCurrentAmountsCents())," / mo"),this.renderContent())}}]),t}(c["default"].Component);e["default"]=E}),require.register("components/cancel_button.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=t("react"),s=r(i),c=(t("reactstrap"),function(e){function t(e){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.toggle=n.toggle.bind(n),n.state={tooltipOpen:!1},n}return o(t,e),l(t,[{key:"toggle",value:function(){this.setState({tooltipOpen:!this.state.tooltipOpen})}},{key:"render",value:function(){return s["default"].createElement("div",null)}}]),t}(s["default"].Component));e["default"]=c}),require.register("components/subscription_modal.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=t("react"),s=r(i),c=t("lodash/bindAll"),f=r(c),d=t("../models/app"),p=r(d),m=t("reactstrap"),h=function(e){function t(e){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={modal:!1,app:p["default"].blankApp()},(0,f["default"])(n,["onSubmit","toggle","openWith","onInput"]),n}return o(t,e),l(t,[{key:"onSubmit",value:function(e){e.preventDefault(),this.props.onSubmitModal(this.state.app,this.state.uuid)}},{key:"toggle",value:function(){this.setState({modal:!this.state.modal})}},{key:"openWith",value:function(e,t){this.setState({modal:!0,uuid:t,app:e}),this.toggle()}},{key:"onInput",value:function(e){var t=e.currentTarget.value,n=e.currentTarget.getAttribute("name");this.state.app[n]=t,this.setState(this.state)}},{key:"render",value:function(){return s["default"].createElement(m.Modal,{toggle:this.toggle,isOpen:this.state.modal,className:this.props.className},s["default"].createElement(m.ModalHeader,null,"Add a subscription"),s["default"].createElement(m.ModalBody,null,s["default"].createElement(m.Form,{onSubmit:this.onSubmit},s["default"].createElement(m.FormGroup,{className:"d-flex"},s["default"].createElement(m.Input,{name:"name",placeholder:"subscription name",value:this.state.app.name,onChange:this.onInput}),s["default"].createElement(m.Input,{type:"select",name:"frequency",className:"ml-2",value:this.state.app.frequency,onChange:this.onInput,style:{width:100}},s["default"].createElement("option",null,"monthly"),s["default"].createElement("option",null,"yearly"))),s["default"].createElement(m.FormGroup,null,s["default"].createElement(m.Label,null,"Website"),s["default"].createElement(m.Input,{placeholder:"https://blah.com",name:"website",value:this.state.app.website,onChange:this.onInput})),s["default"].createElement("div",{className:"center-between mt-3"},s["default"].createElement(m.Button,{color:"secondary",onClick:this.toggle},"Cancel"),s["default"].createElement(m.Button,{color:"primary"},this.state.uuid?"Update":"Add")," "))))}}]),t}(s["default"].Component);e["default"]=h}),require.register("initialize.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var a=t("react-dom"),u=r(a),o=t("react"),l=r(o),i=t("models/app.js"),s=(r(i),t("components/apps_view.jsx")),c=r(s);Date.now();document.addEventListener("DOMContentLoaded",function(){fetch("/subscription_apps.json").then(function(e){return e.json()}).then(function(e){window.apps=e.apps,u["default"].render(l["default"].createElement(c["default"],null),document.querySelector("#app"))})})}),require.register("models/app.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=t("../util.js"),l=t("lodash/sumBy"),i=r(l),s=t("lodash/map"),c=r(s),f=["uuid","name","selected","starting_amount_cents","current_amount_cents","frequency","site"],d=function(){function e(t){a(this,e);for(var n in t)this[n]=t[n];this.starting_amount_cents_value=t.starting_amount_cents?(0,o.centsToDollaString)(t.starting_amount_cents).replace("$",""):"",this.current_amount_cents_value=t.current_amount_cents?(0,o.centsToDollaString)(t.current_amount_cents).replace("$",""):"",this.uuid||(this.uuid=(0,o.genUUID)(t.name))}return u(e,[{key:"tersify",value:function(e){return e.toLowerCase().replace(/\s/,"")}},{key:"setName",value:function(t){this.name=t,this.terse=this.tersify(t),e.saveToLocalStorage()}},{key:"monthlyCurrentAmount",value:function(){return"monthly"===this.frequency?this.current_amount_cents:Math.round(this.current_amount_cents/12)}},{key:"monthlyStartingAmount",value:function(){return"monthly"===this.frequency?this.starting_amount_cents:Math.round(this.starting_amount_cents/12)}},{key:"setSelected",value:function(t){this.selected=t,e.saveToLocalStorage()}},{key:"clone",value:function(){var t=Object.assign(e.blankApp(),this.toJSON());return delete t.uuid,t}},{key:"toJSON",value:function(){var e={},t=!0,n=!1,r=void 0;try{for(var a,u=f[Symbol.iterator]();!(t=(a=u.next()).done);t=!0){var o=a.value;e[o]=this[o]}}catch(l){n=!0,r=l}finally{try{!t&&u["return"]&&u["return"]()}finally{if(n)throw r}}return e}}],[{key:"getAll",value:function(){if(this.apps)return this.apps;var t=JSON.parse(localStorage.getItem("apps"))||window.apps;return this.apps=t.map(function(t){return new e(t)}),this.apps}},{key:"getSelected",value:function(){return e.getAll().filter(function(e){return e.selected})}},{key:"blankApp",value:function(){return{name:"",amount:"",website:"",frequency:"monthly"}}},{key:"find",value:function(t){return e.getAll().find(function(e){return e.uuid===t})}},{key:"remove",value:function(t){this.apps=this.getAll().filter(function(e){return e.uuid!=t.uuid}),e.saveToLocalStorage()}},{key:"addApp",value:function(t){var n=new e(t);e.getAll().push(n),e.saveToLocalStorage()}},{key:"allToJSON",value:function(){return(0,c["default"])(this.getAll(),function(e){return e.toJSON()})}},{key:"sumStartingAmountsCents",value:function(){return(0,i["default"])(this.getSelected(),function(e){return e.monthlyStartingAmount()||0})}},{key:"sumCurrentAmountsCents",value:function(){return(0,i["default"])(this.getSelected(),function(e){return e.monthlyCurrentAmount()||0})}},{key:"saveToLocalStorage",value:function(e){localStorage.setItem("apps",JSON.stringify(this.getAll()))}}]),e}();e["default"]=d}),require.register("util.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0}),e.centsToDollaString=e.dollarStringToCents=e.genUUID=void 0;var a=t("uuid/v5"),u=r(a);e.genUUID=function(e){return(0,u["default"])(e,u["default"].URL)},e.dollarStringToCents=function(e){return Math.round(100*parseFloat(e.replace(/[$,]/g,"")))},e.centsToDollaString=function(e,t){null==t&&(t=!0);for(var n=e+"";n.length<4;)n="0"+n;for(var r=n.substr(0,n.length-2),a=n.substr(n.length-2,2);r.length%3!==0;)r="0"+r;var u=r.replace(/(\d{3})(?=\d)/g,"$1,").replace(/^0*(?=.)/,"");return(t?"$":"")+u+"."+a}}),require.alias("buffer/index.js","buffer"),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,n){})}(),require("___globals___");