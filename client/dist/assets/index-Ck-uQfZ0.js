(function(){const w=document.createElement("link").relList;if(w&&w.supports&&w.supports("modulepreload"))return;for(const k of document.querySelectorAll('link[rel="modulepreload"]'))P(k);new MutationObserver(k=>{for(const x of k)if(x.type==="childList")for(const g of x.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&P(g)}).observe(document,{childList:!0,subtree:!0});function d(k){const x={};return k.integrity&&(x.integrity=k.integrity),k.referrerPolicy&&(x.referrerPolicy=k.referrerPolicy),k.crossOrigin==="use-credentials"?x.credentials="include":k.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function P(k){if(k.ep)return;k.ep=!0;const x=d(k);fetch(k.href,x)}})();function dc(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var qi={exports:{}},Mr={},Hi={exports:{}},re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qu;function vp(){if(Qu)return re;Qu=1;var o=Symbol.for("react.element"),w=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),P=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),x=Symbol.for("react.provider"),g=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),$=Symbol.for("react.suspense"),R=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),N=Symbol.iterator;function I(f){return f===null||typeof f!="object"?null:(f=N&&f[N]||f["@@iterator"],typeof f=="function"?f:null)}var F={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},J=Object.assign,v={};function D(f,S,ne){this.props=f,this.context=S,this.refs=v,this.updater=ne||F}D.prototype.isReactComponent={},D.prototype.setState=function(f,S){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,S,"setState")},D.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function j(){}j.prototype=D.prototype;function z(f,S,ne){this.props=f,this.context=S,this.refs=v,this.updater=ne||F}var A=z.prototype=new j;A.constructor=z,J(A,D.prototype),A.isPureReactComponent=!0;var T=Array.isArray,oe=Object.prototype.hasOwnProperty,he={current:null},Ee={key:!0,ref:!0,__self:!0,__source:!0};function ge(f,S,ne){var Z,ae={},ie=null,le=null;if(S!=null)for(Z in S.ref!==void 0&&(le=S.ref),S.key!==void 0&&(ie=""+S.key),S)oe.call(S,Z)&&!Ee.hasOwnProperty(Z)&&(ae[Z]=S[Z]);var pe=arguments.length-2;if(pe===1)ae.children=ne;else if(1<pe){for(var xe=Array(pe),Ge=0;Ge<pe;Ge++)xe[Ge]=arguments[Ge+2];ae.children=xe}if(f&&f.defaultProps)for(Z in pe=f.defaultProps,pe)ae[Z]===void 0&&(ae[Z]=pe[Z]);return{$$typeof:o,type:f,key:ie,ref:le,props:ae,_owner:he.current}}function Ve(f,S){return{$$typeof:o,type:f.type,key:S,ref:f.ref,props:f.props,_owner:f._owner}}function Be(f){return typeof f=="object"&&f!==null&&f.$$typeof===o}function it(f){var S={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(ne){return S[ne]})}var Ye=/\/+/g;function Pe(f,S){return typeof f=="object"&&f!==null&&f.key!=null?it(""+f.key):S.toString(36)}function qe(f,S,ne,Z,ae){var ie=typeof f;(ie==="undefined"||ie==="boolean")&&(f=null);var le=!1;if(f===null)le=!0;else switch(ie){case"string":case"number":le=!0;break;case"object":switch(f.$$typeof){case o:case w:le=!0}}if(le)return le=f,ae=ae(le),f=Z===""?"."+Pe(le,0):Z,T(ae)?(ne="",f!=null&&(ne=f.replace(Ye,"$&/")+"/"),qe(ae,S,ne,"",function(Ge){return Ge})):ae!=null&&(Be(ae)&&(ae=Ve(ae,ne+(!ae.key||le&&le.key===ae.key?"":(""+ae.key).replace(Ye,"$&/")+"/")+f)),S.push(ae)),1;if(le=0,Z=Z===""?".":Z+":",T(f))for(var pe=0;pe<f.length;pe++){ie=f[pe];var xe=Z+Pe(ie,pe);le+=qe(ie,S,ne,xe,ae)}else if(xe=I(f),typeof xe=="function")for(f=xe.call(f),pe=0;!(ie=f.next()).done;)ie=ie.value,xe=Z+Pe(ie,pe++),le+=qe(ie,S,ne,xe,ae);else if(ie==="object")throw S=String(f),Error("Objects are not valid as a React child (found: "+(S==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":S)+"). If you meant to render a collection of children, use an array instead.");return le}function te(f,S,ne){if(f==null)return f;var Z=[],ae=0;return qe(f,Z,"","",function(ie){return S.call(ne,ie,ae++)}),Z}function ke(f){if(f._status===-1){var S=f._result;S=S(),S.then(function(ne){(f._status===0||f._status===-1)&&(f._status=1,f._result=ne)},function(ne){(f._status===0||f._status===-1)&&(f._status=2,f._result=ne)}),f._status===-1&&(f._status=0,f._result=S)}if(f._status===1)return f._result.default;throw f._result}var ye={current:null},U={transition:null},K={ReactCurrentDispatcher:ye,ReactCurrentBatchConfig:U,ReactCurrentOwner:he};function V(){throw Error("act(...) is not supported in production builds of React.")}return re.Children={map:te,forEach:function(f,S,ne){te(f,function(){S.apply(this,arguments)},ne)},count:function(f){var S=0;return te(f,function(){S++}),S},toArray:function(f){return te(f,function(S){return S})||[]},only:function(f){if(!Be(f))throw Error("React.Children.only expected to receive a single React element child.");return f}},re.Component=D,re.Fragment=d,re.Profiler=k,re.PureComponent=z,re.StrictMode=P,re.Suspense=$,re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K,re.act=V,re.cloneElement=function(f,S,ne){if(f==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+f+".");var Z=J({},f.props),ae=f.key,ie=f.ref,le=f._owner;if(S!=null){if(S.ref!==void 0&&(ie=S.ref,le=he.current),S.key!==void 0&&(ae=""+S.key),f.type&&f.type.defaultProps)var pe=f.type.defaultProps;for(xe in S)oe.call(S,xe)&&!Ee.hasOwnProperty(xe)&&(Z[xe]=S[xe]===void 0&&pe!==void 0?pe[xe]:S[xe])}var xe=arguments.length-2;if(xe===1)Z.children=ne;else if(1<xe){pe=Array(xe);for(var Ge=0;Ge<xe;Ge++)pe[Ge]=arguments[Ge+2];Z.children=pe}return{$$typeof:o,type:f.type,key:ae,ref:ie,props:Z,_owner:le}},re.createContext=function(f){return f={$$typeof:g,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},f.Provider={$$typeof:x,_context:f},f.Consumer=f},re.createElement=ge,re.createFactory=function(f){var S=ge.bind(null,f);return S.type=f,S},re.createRef=function(){return{current:null}},re.forwardRef=function(f){return{$$typeof:L,render:f}},re.isValidElement=Be,re.lazy=function(f){return{$$typeof:M,_payload:{_status:-1,_result:f},_init:ke}},re.memo=function(f,S){return{$$typeof:R,type:f,compare:S===void 0?null:S}},re.startTransition=function(f){var S=U.transition;U.transition={};try{f()}finally{U.transition=S}},re.unstable_act=V,re.useCallback=function(f,S){return ye.current.useCallback(f,S)},re.useContext=function(f){return ye.current.useContext(f)},re.useDebugValue=function(){},re.useDeferredValue=function(f){return ye.current.useDeferredValue(f)},re.useEffect=function(f,S){return ye.current.useEffect(f,S)},re.useId=function(){return ye.current.useId()},re.useImperativeHandle=function(f,S,ne){return ye.current.useImperativeHandle(f,S,ne)},re.useInsertionEffect=function(f,S){return ye.current.useInsertionEffect(f,S)},re.useLayoutEffect=function(f,S){return ye.current.useLayoutEffect(f,S)},re.useMemo=function(f,S){return ye.current.useMemo(f,S)},re.useReducer=function(f,S,ne){return ye.current.useReducer(f,S,ne)},re.useRef=function(f){return ye.current.useRef(f)},re.useState=function(f){return ye.current.useState(f)},re.useSyncExternalStore=function(f,S,ne){return ye.current.useSyncExternalStore(f,S,ne)},re.useTransition=function(){return ye.current.useTransition()},re.version="18.3.1",re}var Ku;function ta(){return Ku||(Ku=1,Hi.exports=vp()),Hi.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yu;function yp(){if(Yu)return Mr;Yu=1;var o=ta(),w=Symbol.for("react.element"),d=Symbol.for("react.fragment"),P=Object.prototype.hasOwnProperty,k=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function g(L,$,R){var M,N={},I=null,F=null;R!==void 0&&(I=""+R),$.key!==void 0&&(I=""+$.key),$.ref!==void 0&&(F=$.ref);for(M in $)P.call($,M)&&!x.hasOwnProperty(M)&&(N[M]=$[M]);if(L&&L.defaultProps)for(M in $=L.defaultProps,$)N[M]===void 0&&(N[M]=$[M]);return{$$typeof:w,type:L,key:I,ref:F,props:N,_owner:k.current}}return Mr.Fragment=d,Mr.jsx=g,Mr.jsxs=g,Mr}var Gu;function wp(){return Gu||(Gu=1,qi.exports=yp()),qi.exports}var l=wp(),O=ta();const jp=dc(O);var Wl={},Wi={exports:{}},st={},Qi={exports:{}},Ki={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xu;function kp(){return Xu||(Xu=1,(function(o){function w(U,K){var V=U.length;U.push(K);e:for(;0<V;){var f=V-1>>>1,S=U[f];if(0<k(S,K))U[f]=K,U[V]=S,V=f;else break e}}function d(U){return U.length===0?null:U[0]}function P(U){if(U.length===0)return null;var K=U[0],V=U.pop();if(V!==K){U[0]=V;e:for(var f=0,S=U.length,ne=S>>>1;f<ne;){var Z=2*(f+1)-1,ae=U[Z],ie=Z+1,le=U[ie];if(0>k(ae,V))ie<S&&0>k(le,ae)?(U[f]=le,U[ie]=V,f=ie):(U[f]=ae,U[Z]=V,f=Z);else if(ie<S&&0>k(le,V))U[f]=le,U[ie]=V,f=ie;else break e}}return K}function k(U,K){var V=U.sortIndex-K.sortIndex;return V!==0?V:U.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var x=performance;o.unstable_now=function(){return x.now()}}else{var g=Date,L=g.now();o.unstable_now=function(){return g.now()-L}}var $=[],R=[],M=1,N=null,I=3,F=!1,J=!1,v=!1,D=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,z=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(U){for(var K=d(R);K!==null;){if(K.callback===null)P(R);else if(K.startTime<=U)P(R),K.sortIndex=K.expirationTime,w($,K);else break;K=d(R)}}function T(U){if(v=!1,A(U),!J)if(d($)!==null)J=!0,ke(oe);else{var K=d(R);K!==null&&ye(T,K.startTime-U)}}function oe(U,K){J=!1,v&&(v=!1,j(ge),ge=-1),F=!0;var V=I;try{for(A(K),N=d($);N!==null&&(!(N.expirationTime>K)||U&&!it());){var f=N.callback;if(typeof f=="function"){N.callback=null,I=N.priorityLevel;var S=f(N.expirationTime<=K);K=o.unstable_now(),typeof S=="function"?N.callback=S:N===d($)&&P($),A(K)}else P($);N=d($)}if(N!==null)var ne=!0;else{var Z=d(R);Z!==null&&ye(T,Z.startTime-K),ne=!1}return ne}finally{N=null,I=V,F=!1}}var he=!1,Ee=null,ge=-1,Ve=5,Be=-1;function it(){return!(o.unstable_now()-Be<Ve)}function Ye(){if(Ee!==null){var U=o.unstable_now();Be=U;var K=!0;try{K=Ee(!0,U)}finally{K?Pe():(he=!1,Ee=null)}}else he=!1}var Pe;if(typeof z=="function")Pe=function(){z(Ye)};else if(typeof MessageChannel<"u"){var qe=new MessageChannel,te=qe.port2;qe.port1.onmessage=Ye,Pe=function(){te.postMessage(null)}}else Pe=function(){D(Ye,0)};function ke(U){Ee=U,he||(he=!0,Pe())}function ye(U,K){ge=D(function(){U(o.unstable_now())},K)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(U){U.callback=null},o.unstable_continueExecution=function(){J||F||(J=!0,ke(oe))},o.unstable_forceFrameRate=function(U){0>U||125<U?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ve=0<U?Math.floor(1e3/U):5},o.unstable_getCurrentPriorityLevel=function(){return I},o.unstable_getFirstCallbackNode=function(){return d($)},o.unstable_next=function(U){switch(I){case 1:case 2:case 3:var K=3;break;default:K=I}var V=I;I=K;try{return U()}finally{I=V}},o.unstable_pauseExecution=function(){},o.unstable_requestPaint=function(){},o.unstable_runWithPriority=function(U,K){switch(U){case 1:case 2:case 3:case 4:case 5:break;default:U=3}var V=I;I=U;try{return K()}finally{I=V}},o.unstable_scheduleCallback=function(U,K,V){var f=o.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?f+V:f):V=f,U){case 1:var S=-1;break;case 2:S=250;break;case 5:S=1073741823;break;case 4:S=1e4;break;default:S=5e3}return S=V+S,U={id:M++,callback:K,priorityLevel:U,startTime:V,expirationTime:S,sortIndex:-1},V>f?(U.sortIndex=V,w(R,U),d($)===null&&U===d(R)&&(v?(j(ge),ge=-1):v=!0,ye(T,V-f))):(U.sortIndex=S,w($,U),J||F||(J=!0,ke(oe))),U},o.unstable_shouldYield=it,o.unstable_wrapCallback=function(U){var K=I;return function(){var V=I;I=K;try{return U.apply(this,arguments)}finally{I=V}}}})(Ki)),Ki}var Zu;function Np(){return Zu||(Zu=1,Qi.exports=kp()),Qi.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ju;function Sp(){if(Ju)return st;Ju=1;var o=ta(),w=Np();function d(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var P=new Set,k={};function x(e,t){g(e,t),g(e+"Capture",t)}function g(e,t){for(k[e]=t,e=0;e<t.length;e++)P.add(t[e])}var L=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$=Object.prototype.hasOwnProperty,R=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,M={},N={};function I(e){return $.call(N,e)?!0:$.call(M,e)?!1:R.test(e)?N[e]=!0:(M[e]=!0,!1)}function F(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function J(e,t,n,r){if(t===null||typeof t>"u"||F(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function v(e,t,n,r,s,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var D={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){D[e]=new v(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];D[t]=new v(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){D[e]=new v(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){D[e]=new v(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){D[e]=new v(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){D[e]=new v(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){D[e]=new v(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){D[e]=new v(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){D[e]=new v(e,5,!1,e.toLowerCase(),null,!1,!1)});var j=/[\-:]([a-z])/g;function z(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(j,z);D[t]=new v(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(j,z);D[t]=new v(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(j,z);D[t]=new v(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){D[e]=new v(e,1,!1,e.toLowerCase(),null,!1,!1)}),D.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){D[e]=new v(e,1,!1,e.toLowerCase(),null,!0,!0)});function A(e,t,n,r){var s=D.hasOwnProperty(t)?D[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(J(t,n,s,r)&&(n=null),r||s===null?I(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var T=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,oe=Symbol.for("react.element"),he=Symbol.for("react.portal"),Ee=Symbol.for("react.fragment"),ge=Symbol.for("react.strict_mode"),Ve=Symbol.for("react.profiler"),Be=Symbol.for("react.provider"),it=Symbol.for("react.context"),Ye=Symbol.for("react.forward_ref"),Pe=Symbol.for("react.suspense"),qe=Symbol.for("react.suspense_list"),te=Symbol.for("react.memo"),ke=Symbol.for("react.lazy"),ye=Symbol.for("react.offscreen"),U=Symbol.iterator;function K(e){return e===null||typeof e!="object"?null:(e=U&&e[U]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,f;function S(e){if(f===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);f=t&&t[1]||""}return`
`+f+e}var ne=!1;function Z(e,t){if(!e||ne)return"";ne=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(y){var r=y}Reflect.construct(e,[],t)}else{try{t.call()}catch(y){r=y}e.call(t.prototype)}else{try{throw Error()}catch(y){r=y}e()}}catch(y){if(y&&r&&typeof y.stack=="string"){for(var s=y.stack.split(`
`),i=r.stack.split(`
`),a=s.length-1,u=i.length-1;1<=a&&0<=u&&s[a]!==i[u];)u--;for(;1<=a&&0<=u;a--,u--)if(s[a]!==i[u]){if(a!==1||u!==1)do if(a--,u--,0>u||s[a]!==i[u]){var c=`
`+s[a].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=a&&0<=u);break}}}finally{ne=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?S(e):""}function ae(e){switch(e.tag){case 5:return S(e.type);case 16:return S("Lazy");case 13:return S("Suspense");case 19:return S("SuspenseList");case 0:case 2:case 15:return e=Z(e.type,!1),e;case 11:return e=Z(e.type.render,!1),e;case 1:return e=Z(e.type,!0),e;default:return""}}function ie(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ee:return"Fragment";case he:return"Portal";case Ve:return"Profiler";case ge:return"StrictMode";case Pe:return"Suspense";case qe:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case it:return(e.displayName||"Context")+".Consumer";case Be:return(e._context.displayName||"Context")+".Provider";case Ye:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case te:return t=e.displayName||null,t!==null?t:ie(e.type)||"Memo";case ke:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}function le(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ie(t);case 8:return t===ge?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function pe(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function xe(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ge(e){var t=xe(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function St(e){e._valueTracker||(e._valueTracker=Ge(e))}function X(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=xe(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Se(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Je(e,t){var n=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Fe(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=pe(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function bt(e,t){t=t.checked,t!=null&&A(e,"checked",t,!1)}function Pt(e,t){bt(e,t);var n=pe(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Lt(e,t.type,n):t.hasOwnProperty("defaultValue")&&Lt(e,t.type,pe(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Vt(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Lt(e,t,n){(t!=="number"||Se(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Bt=Array.isArray;function Mt(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+pe(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Nn(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(d(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Sn(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(d(92));if(Bt(n)){if(1<n.length)throw Error(d(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:pe(n)}}function ra(e,t){var n=pe(t.value),r=pe(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function la(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function sa(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ts(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?sa(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var $r,ia=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for($r=$r||document.createElement("div"),$r.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=$r.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Yn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Gn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},kc=["Webkit","ms","Moz","O"];Object.keys(Gn).forEach(function(e){kc.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Gn[t]=Gn[e]})});function aa(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Gn.hasOwnProperty(e)&&Gn[e]?(""+t).trim():t+"px"}function oa(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=aa(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var Nc=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ns(e,t){if(t){if(Nc[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(d(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(d(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(d(61))}if(t.style!=null&&typeof t.style!="object")throw Error(d(62))}}function rs(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ls=null;function ss(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var is=null,bn=null,Cn=null;function ua(e){if(e=vr(e)){if(typeof is!="function")throw Error(d(280));var t=e.stateNode;t&&(t=al(t),is(e.stateNode,e.type,t))}}function ca(e){bn?Cn?Cn.push(e):Cn=[e]:bn=e}function da(){if(bn){var e=bn,t=Cn;if(Cn=bn=null,ua(e),t)for(e=0;e<t.length;e++)ua(t[e])}}function pa(e,t){return e(t)}function fa(){}var as=!1;function ma(e,t,n){if(as)return e(t,n);as=!0;try{return pa(e,t,n)}finally{as=!1,(bn!==null||Cn!==null)&&(fa(),da())}}function Xn(e,t){var n=e.stateNode;if(n===null)return null;var r=al(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(d(231,t,typeof n));return n}var os=!1;if(L)try{var Zn={};Object.defineProperty(Zn,"passive",{get:function(){os=!0}}),window.addEventListener("test",Zn,Zn),window.removeEventListener("test",Zn,Zn)}catch{os=!1}function Sc(e,t,n,r,s,i,a,u,c){var y=Array.prototype.slice.call(arguments,3);try{t.apply(n,y)}catch(C){this.onError(C)}}var Jn=!1,Fr=null,Ir=!1,us=null,bc={onError:function(e){Jn=!0,Fr=e}};function Cc(e,t,n,r,s,i,a,u,c){Jn=!1,Fr=null,Sc.apply(bc,arguments)}function Ec(e,t,n,r,s,i,a,u,c){if(Cc.apply(this,arguments),Jn){if(Jn){var y=Fr;Jn=!1,Fr=null}else throw Error(d(198));Ir||(Ir=!0,us=y)}}function cn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ha(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ga(e){if(cn(e)!==e)throw Error(d(188))}function zc(e){var t=e.alternate;if(!t){if(t=cn(e),t===null)throw Error(d(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return ga(s),e;if(i===r)return ga(s),t;i=i.sibling}throw Error(d(188))}if(n.return!==r.return)n=s,r=i;else{for(var a=!1,u=s.child;u;){if(u===n){a=!0,n=s,r=i;break}if(u===r){a=!0,r=s,n=i;break}u=u.sibling}if(!a){for(u=i.child;u;){if(u===n){a=!0,n=i,r=s;break}if(u===r){a=!0,r=i,n=s;break}u=u.sibling}if(!a)throw Error(d(189))}}if(n.alternate!==r)throw Error(d(190))}if(n.tag!==3)throw Error(d(188));return n.stateNode.current===n?e:t}function xa(e){return e=zc(e),e!==null?va(e):null}function va(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=va(e);if(t!==null)return t;e=e.sibling}return null}var ya=w.unstable_scheduleCallback,wa=w.unstable_cancelCallback,_c=w.unstable_shouldYield,Tc=w.unstable_requestPaint,_e=w.unstable_now,Pc=w.unstable_getCurrentPriorityLevel,cs=w.unstable_ImmediatePriority,ja=w.unstable_UserBlockingPriority,Ur=w.unstable_NormalPriority,Lc=w.unstable_LowPriority,ka=w.unstable_IdlePriority,Vr=null,Ct=null;function Mc(e){if(Ct&&typeof Ct.onCommitFiberRoot=="function")try{Ct.onCommitFiberRoot(Vr,e,void 0,(e.current.flags&128)===128)}catch{}}var xt=Math.clz32?Math.clz32:Dc,Ac=Math.log,Rc=Math.LN2;function Dc(e){return e>>>=0,e===0?32:31-(Ac(e)/Rc|0)|0}var Br=64,qr=4194304;function er(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var u=a&~s;u!==0?r=er(u):(i&=a,i!==0&&(r=er(i)))}else a=n&~s,a!==0?r=er(a):i!==0&&(r=er(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&s)===0&&(s=r&-r,i=t&-t,s>=i||s===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-xt(t),s=1<<n,r|=e[n],t&=~s;return r}function Oc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $c(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-xt(i),u=1<<a,c=s[a];c===-1?((u&n)===0||(u&r)!==0)&&(s[a]=Oc(u,t)):c<=t&&(e.expiredLanes|=u),i&=~u}}function ds(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Na(){var e=Br;return Br<<=1,(Br&4194240)===0&&(Br=64),e}function ps(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-xt(t),e[t]=n}function Fc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-xt(n),i=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~i}}function fs(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-xt(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var fe=0;function Sa(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ba,ms,Ca,Ea,za,hs=!1,Wr=[],qt=null,Ht=null,Wt=null,nr=new Map,rr=new Map,Qt=[],Ic="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _a(e,t){switch(e){case"focusin":case"focusout":qt=null;break;case"dragenter":case"dragleave":Ht=null;break;case"mouseover":case"mouseout":Wt=null;break;case"pointerover":case"pointerout":nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":rr.delete(t.pointerId)}}function lr(e,t,n,r,s,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},t!==null&&(t=vr(t),t!==null&&ms(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Uc(e,t,n,r,s){switch(t){case"focusin":return qt=lr(qt,e,t,n,r,s),!0;case"dragenter":return Ht=lr(Ht,e,t,n,r,s),!0;case"mouseover":return Wt=lr(Wt,e,t,n,r,s),!0;case"pointerover":var i=s.pointerId;return nr.set(i,lr(nr.get(i)||null,e,t,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,rr.set(i,lr(rr.get(i)||null,e,t,n,r,s)),!0}return!1}function Ta(e){var t=dn(e.target);if(t!==null){var n=cn(t);if(n!==null){if(t=n.tag,t===13){if(t=ha(n),t!==null){e.blockedOn=t,za(e.priority,function(){Ca(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Qr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=xs(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ls=r,n.target.dispatchEvent(r),ls=null}else return t=vr(n),t!==null&&ms(t),e.blockedOn=n,!1;t.shift()}return!0}function Pa(e,t,n){Qr(e)&&n.delete(t)}function Vc(){hs=!1,qt!==null&&Qr(qt)&&(qt=null),Ht!==null&&Qr(Ht)&&(Ht=null),Wt!==null&&Qr(Wt)&&(Wt=null),nr.forEach(Pa),rr.forEach(Pa)}function sr(e,t){e.blockedOn===t&&(e.blockedOn=null,hs||(hs=!0,w.unstable_scheduleCallback(w.unstable_NormalPriority,Vc)))}function ir(e){function t(s){return sr(s,e)}if(0<Wr.length){sr(Wr[0],e);for(var n=1;n<Wr.length;n++){var r=Wr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(qt!==null&&sr(qt,e),Ht!==null&&sr(Ht,e),Wt!==null&&sr(Wt,e),nr.forEach(t),rr.forEach(t),n=0;n<Qt.length;n++)r=Qt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Qt.length&&(n=Qt[0],n.blockedOn===null);)Ta(n),n.blockedOn===null&&Qt.shift()}var En=T.ReactCurrentBatchConfig,Kr=!0;function Bc(e,t,n,r){var s=fe,i=En.transition;En.transition=null;try{fe=1,gs(e,t,n,r)}finally{fe=s,En.transition=i}}function qc(e,t,n,r){var s=fe,i=En.transition;En.transition=null;try{fe=4,gs(e,t,n,r)}finally{fe=s,En.transition=i}}function gs(e,t,n,r){if(Kr){var s=xs(e,t,n,r);if(s===null)As(e,t,r,Yr,n),_a(e,r);else if(Uc(s,e,t,n,r))r.stopPropagation();else if(_a(e,r),t&4&&-1<Ic.indexOf(e)){for(;s!==null;){var i=vr(s);if(i!==null&&ba(i),i=xs(e,t,n,r),i===null&&As(e,t,r,Yr,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else As(e,t,r,null,n)}}var Yr=null;function xs(e,t,n,r){if(Yr=null,e=ss(r),e=dn(e),e!==null)if(t=cn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ha(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Yr=e,null}function La(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Pc()){case cs:return 1;case ja:return 4;case Ur:case Lc:return 16;case ka:return 536870912;default:return 16}default:return 16}}var Kt=null,vs=null,Gr=null;function Ma(){if(Gr)return Gr;var e,t=vs,n=t.length,r,s="value"in Kt?Kt.value:Kt.textContent,i=s.length;for(e=0;e<n&&t[e]===s[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===s[i-r];r++);return Gr=s.slice(e,1<r?1-r:void 0)}function Xr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Zr(){return!0}function Aa(){return!1}function at(e){function t(n,r,s,i,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Zr:Aa,this.isPropagationStopped=Aa,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Zr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Zr)},persist:function(){},isPersistent:Zr}),t}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ys=at(zn),ar=V({},zn,{view:0,detail:0}),Hc=at(ar),ws,js,or,Jr=V({},ar,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ns,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==or&&(or&&e.type==="mousemove"?(ws=e.screenX-or.screenX,js=e.screenY-or.screenY):js=ws=0,or=e),ws)},movementY:function(e){return"movementY"in e?e.movementY:js}}),Ra=at(Jr),Wc=V({},Jr,{dataTransfer:0}),Qc=at(Wc),Kc=V({},ar,{relatedTarget:0}),ks=at(Kc),Yc=V({},zn,{animationName:0,elapsedTime:0,pseudoElement:0}),Gc=at(Yc),Xc=V({},zn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Zc=at(Xc),Jc=V({},zn,{data:0}),Da=at(Jc),ed={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=nd[e])?!!t[e]:!1}function Ns(){return rd}var ld=V({},ar,{key:function(e){if(e.key){var t=ed[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Xr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?td[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ns,charCode:function(e){return e.type==="keypress"?Xr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),sd=at(ld),id=V({},Jr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Oa=at(id),ad=V({},ar,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ns}),od=at(ad),ud=V({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),cd=at(ud),dd=V({},Jr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pd=at(dd),fd=[9,13,27,32],Ss=L&&"CompositionEvent"in window,ur=null;L&&"documentMode"in document&&(ur=document.documentMode);var md=L&&"TextEvent"in window&&!ur,$a=L&&(!Ss||ur&&8<ur&&11>=ur),Fa=" ",Ia=!1;function Ua(e,t){switch(e){case"keyup":return fd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Va(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var _n=!1;function hd(e,t){switch(e){case"compositionend":return Va(t);case"keypress":return t.which!==32?null:(Ia=!0,Fa);case"textInput":return e=t.data,e===Fa&&Ia?null:e;default:return null}}function gd(e,t){if(_n)return e==="compositionend"||!Ss&&Ua(e,t)?(e=Ma(),Gr=vs=Kt=null,_n=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $a&&t.locale!=="ko"?null:t.data;default:return null}}var xd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ba(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!xd[e.type]:t==="textarea"}function qa(e,t,n,r){ca(r),t=ll(t,"onChange"),0<t.length&&(n=new ys("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var cr=null,dr=null;function vd(e){oo(e,0)}function el(e){var t=An(e);if(X(t))return e}function yd(e,t){if(e==="change")return t}var Ha=!1;if(L){var bs;if(L){var Cs="oninput"in document;if(!Cs){var Wa=document.createElement("div");Wa.setAttribute("oninput","return;"),Cs=typeof Wa.oninput=="function"}bs=Cs}else bs=!1;Ha=bs&&(!document.documentMode||9<document.documentMode)}function Qa(){cr&&(cr.detachEvent("onpropertychange",Ka),dr=cr=null)}function Ka(e){if(e.propertyName==="value"&&el(dr)){var t=[];qa(t,dr,e,ss(e)),ma(vd,t)}}function wd(e,t,n){e==="focusin"?(Qa(),cr=t,dr=n,cr.attachEvent("onpropertychange",Ka)):e==="focusout"&&Qa()}function jd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return el(dr)}function kd(e,t){if(e==="click")return el(t)}function Nd(e,t){if(e==="input"||e==="change")return el(t)}function Sd(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var vt=typeof Object.is=="function"?Object.is:Sd;function pr(e,t){if(vt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!$.call(t,s)||!vt(e[s],t[s]))return!1}return!0}function Ya(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ga(e,t){var n=Ya(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ya(n)}}function Xa(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Xa(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Za(){for(var e=window,t=Se();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Se(e.document)}return t}function Es(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function bd(e){var t=Za(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Xa(n.ownerDocument.documentElement,n)){if(r!==null&&Es(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!e.extend&&i>r&&(s=r,r=i,i=s),s=Ga(n,i);var a=Ga(n,r);s&&a&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Cd=L&&"documentMode"in document&&11>=document.documentMode,Tn=null,zs=null,fr=null,_s=!1;function Ja(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;_s||Tn==null||Tn!==Se(r)||(r=Tn,"selectionStart"in r&&Es(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),fr&&pr(fr,r)||(fr=r,r=ll(zs,"onSelect"),0<r.length&&(t=new ys("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Tn)))}function tl(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Pn={animationend:tl("Animation","AnimationEnd"),animationiteration:tl("Animation","AnimationIteration"),animationstart:tl("Animation","AnimationStart"),transitionend:tl("Transition","TransitionEnd")},Ts={},eo={};L&&(eo=document.createElement("div").style,"AnimationEvent"in window||(delete Pn.animationend.animation,delete Pn.animationiteration.animation,delete Pn.animationstart.animation),"TransitionEvent"in window||delete Pn.transitionend.transition);function nl(e){if(Ts[e])return Ts[e];if(!Pn[e])return e;var t=Pn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in eo)return Ts[e]=t[n];return e}var to=nl("animationend"),no=nl("animationiteration"),ro=nl("animationstart"),lo=nl("transitionend"),so=new Map,io="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yt(e,t){so.set(e,t),x(t,[e])}for(var Ps=0;Ps<io.length;Ps++){var Ls=io[Ps],Ed=Ls.toLowerCase(),zd=Ls[0].toUpperCase()+Ls.slice(1);Yt(Ed,"on"+zd)}Yt(to,"onAnimationEnd"),Yt(no,"onAnimationIteration"),Yt(ro,"onAnimationStart"),Yt("dblclick","onDoubleClick"),Yt("focusin","onFocus"),Yt("focusout","onBlur"),Yt(lo,"onTransitionEnd"),g("onMouseEnter",["mouseout","mouseover"]),g("onMouseLeave",["mouseout","mouseover"]),g("onPointerEnter",["pointerout","pointerover"]),g("onPointerLeave",["pointerout","pointerover"]),x("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),x("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),x("onBeforeInput",["compositionend","keypress","textInput","paste"]),x("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),x("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),x("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_d=new Set("cancel close invalid load scroll toggle".split(" ").concat(mr));function ao(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ec(r,t,void 0,e),e.currentTarget=null}function oo(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var u=r[a],c=u.instance,y=u.currentTarget;if(u=u.listener,c!==i&&s.isPropagationStopped())break e;ao(s,u,y),i=c}else for(a=0;a<r.length;a++){if(u=r[a],c=u.instance,y=u.currentTarget,u=u.listener,c!==i&&s.isPropagationStopped())break e;ao(s,u,y),i=c}}}if(Ir)throw e=us,Ir=!1,us=null,e}function we(e,t){var n=t[Is];n===void 0&&(n=t[Is]=new Set);var r=e+"__bubble";n.has(r)||(uo(t,e,2,!1),n.add(r))}function Ms(e,t,n){var r=0;t&&(r|=4),uo(n,e,r,t)}var rl="_reactListening"+Math.random().toString(36).slice(2);function hr(e){if(!e[rl]){e[rl]=!0,P.forEach(function(n){n!=="selectionchange"&&(_d.has(n)||Ms(n,!1,e),Ms(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[rl]||(t[rl]=!0,Ms("selectionchange",!1,t))}}function uo(e,t,n,r){switch(La(t)){case 1:var s=Bc;break;case 4:s=qc;break;default:s=gs}n=s.bind(null,t,n,e),s=void 0,!os||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function As(e,t,n,r,s){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var u=r.stateNode.containerInfo;if(u===s||u.nodeType===8&&u.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;a=a.return}for(;u!==null;){if(a=dn(u),a===null)return;if(c=a.tag,c===5||c===6){r=i=a;continue e}u=u.parentNode}}r=r.return}ma(function(){var y=i,C=ss(n),E=[];e:{var b=so.get(e);if(b!==void 0){var B=ys,H=e;switch(e){case"keypress":if(Xr(n)===0)break e;case"keydown":case"keyup":B=sd;break;case"focusin":H="focus",B=ks;break;case"focusout":H="blur",B=ks;break;case"beforeblur":case"afterblur":B=ks;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":B=Ra;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":B=Qc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":B=od;break;case to:case no:case ro:B=Gc;break;case lo:B=cd;break;case"scroll":B=Hc;break;case"wheel":B=pd;break;case"copy":case"cut":case"paste":B=Zc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":B=Oa}var W=(t&4)!==0,Te=!W&&e==="scroll",m=W?b!==null?b+"Capture":null:b;W=[];for(var p=y,h;p!==null;){h=p;var _=h.stateNode;if(h.tag===5&&_!==null&&(h=_,m!==null&&(_=Xn(p,m),_!=null&&W.push(gr(p,_,h)))),Te)break;p=p.return}0<W.length&&(b=new B(b,H,null,n,C),E.push({event:b,listeners:W}))}}if((t&7)===0){e:{if(b=e==="mouseover"||e==="pointerover",B=e==="mouseout"||e==="pointerout",b&&n!==ls&&(H=n.relatedTarget||n.fromElement)&&(dn(H)||H[At]))break e;if((B||b)&&(b=C.window===C?C:(b=C.ownerDocument)?b.defaultView||b.parentWindow:window,B?(H=n.relatedTarget||n.toElement,B=y,H=H?dn(H):null,H!==null&&(Te=cn(H),H!==Te||H.tag!==5&&H.tag!==6)&&(H=null)):(B=null,H=y),B!==H)){if(W=Ra,_="onMouseLeave",m="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(W=Oa,_="onPointerLeave",m="onPointerEnter",p="pointer"),Te=B==null?b:An(B),h=H==null?b:An(H),b=new W(_,p+"leave",B,n,C),b.target=Te,b.relatedTarget=h,_=null,dn(C)===y&&(W=new W(m,p+"enter",H,n,C),W.target=h,W.relatedTarget=Te,_=W),Te=_,B&&H)t:{for(W=B,m=H,p=0,h=W;h;h=Ln(h))p++;for(h=0,_=m;_;_=Ln(_))h++;for(;0<p-h;)W=Ln(W),p--;for(;0<h-p;)m=Ln(m),h--;for(;p--;){if(W===m||m!==null&&W===m.alternate)break t;W=Ln(W),m=Ln(m)}W=null}else W=null;B!==null&&co(E,b,B,W,!1),H!==null&&Te!==null&&co(E,Te,H,W,!0)}}e:{if(b=y?An(y):window,B=b.nodeName&&b.nodeName.toLowerCase(),B==="select"||B==="input"&&b.type==="file")var Q=yd;else if(Ba(b))if(Ha)Q=Nd;else{Q=jd;var Y=wd}else(B=b.nodeName)&&B.toLowerCase()==="input"&&(b.type==="checkbox"||b.type==="radio")&&(Q=kd);if(Q&&(Q=Q(e,y))){qa(E,Q,n,C);break e}Y&&Y(e,b,y),e==="focusout"&&(Y=b._wrapperState)&&Y.controlled&&b.type==="number"&&Lt(b,"number",b.value)}switch(Y=y?An(y):window,e){case"focusin":(Ba(Y)||Y.contentEditable==="true")&&(Tn=Y,zs=y,fr=null);break;case"focusout":fr=zs=Tn=null;break;case"mousedown":_s=!0;break;case"contextmenu":case"mouseup":case"dragend":_s=!1,Ja(E,n,C);break;case"selectionchange":if(Cd)break;case"keydown":case"keyup":Ja(E,n,C)}var G;if(Ss)e:{switch(e){case"compositionstart":var ee="onCompositionStart";break e;case"compositionend":ee="onCompositionEnd";break e;case"compositionupdate":ee="onCompositionUpdate";break e}ee=void 0}else _n?Ua(e,n)&&(ee="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ee="onCompositionStart");ee&&($a&&n.locale!=="ko"&&(_n||ee!=="onCompositionStart"?ee==="onCompositionEnd"&&_n&&(G=Ma()):(Kt=C,vs="value"in Kt?Kt.value:Kt.textContent,_n=!0)),Y=ll(y,ee),0<Y.length&&(ee=new Da(ee,e,null,n,C),E.push({event:ee,listeners:Y}),G?ee.data=G:(G=Va(n),G!==null&&(ee.data=G)))),(G=md?hd(e,n):gd(e,n))&&(y=ll(y,"onBeforeInput"),0<y.length&&(C=new Da("onBeforeInput","beforeinput",null,n,C),E.push({event:C,listeners:y}),C.data=G))}oo(E,t)})}function gr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ll(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Xn(e,n),i!=null&&r.unshift(gr(e,i,s)),i=Xn(e,t),i!=null&&r.push(gr(e,i,s))),e=e.return}return r}function Ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function co(e,t,n,r,s){for(var i=t._reactName,a=[];n!==null&&n!==r;){var u=n,c=u.alternate,y=u.stateNode;if(c!==null&&c===r)break;u.tag===5&&y!==null&&(u=y,s?(c=Xn(n,i),c!=null&&a.unshift(gr(n,c,u))):s||(c=Xn(n,i),c!=null&&a.push(gr(n,c,u)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Td=/\r\n?/g,Pd=/\u0000|\uFFFD/g;function po(e){return(typeof e=="string"?e:""+e).replace(Td,`
`).replace(Pd,"")}function sl(e,t,n){if(t=po(t),po(e)!==t&&n)throw Error(d(425))}function il(){}var Rs=null,Ds=null;function Os(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $s=typeof setTimeout=="function"?setTimeout:void 0,Ld=typeof clearTimeout=="function"?clearTimeout:void 0,fo=typeof Promise=="function"?Promise:void 0,Md=typeof queueMicrotask=="function"?queueMicrotask:typeof fo<"u"?function(e){return fo.resolve(null).then(e).catch(Ad)}:$s;function Ad(e){setTimeout(function(){throw e})}function Fs(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),ir(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ir(t)}function Gt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function mo(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Mn=Math.random().toString(36).slice(2),Et="__reactFiber$"+Mn,xr="__reactProps$"+Mn,At="__reactContainer$"+Mn,Is="__reactEvents$"+Mn,Rd="__reactListeners$"+Mn,Dd="__reactHandles$"+Mn;function dn(e){var t=e[Et];if(t)return t;for(var n=e.parentNode;n;){if(t=n[At]||n[Et]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=mo(e);e!==null;){if(n=e[Et])return n;e=mo(e)}return t}e=n,n=e.parentNode}return null}function vr(e){return e=e[Et]||e[At],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function An(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(d(33))}function al(e){return e[xr]||null}var Us=[],Rn=-1;function Xt(e){return{current:e}}function je(e){0>Rn||(e.current=Us[Rn],Us[Rn]=null,Rn--)}function ve(e,t){Rn++,Us[Rn]=e.current,e.current=t}var Zt={},He=Xt(Zt),et=Xt(!1),pn=Zt;function Dn(e,t){var n=e.type.contextTypes;if(!n)return Zt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function tt(e){return e=e.childContextTypes,e!=null}function ol(){je(et),je(He)}function ho(e,t,n){if(He.current!==Zt)throw Error(d(168));ve(He,t),ve(et,n)}function go(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(d(108,le(e)||"Unknown",s));return V({},n,r)}function ul(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Zt,pn=He.current,ve(He,e),ve(et,et.current),!0}function xo(e,t,n){var r=e.stateNode;if(!r)throw Error(d(169));n?(e=go(e,t,pn),r.__reactInternalMemoizedMergedChildContext=e,je(et),je(He),ve(He,e)):je(et),ve(et,n)}var Rt=null,cl=!1,Vs=!1;function vo(e){Rt===null?Rt=[e]:Rt.push(e)}function Od(e){cl=!0,vo(e)}function Jt(){if(!Vs&&Rt!==null){Vs=!0;var e=0,t=fe;try{var n=Rt;for(fe=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Rt=null,cl=!1}catch(s){throw Rt!==null&&(Rt=Rt.slice(e+1)),ya(cs,Jt),s}finally{fe=t,Vs=!1}}return null}var On=[],$n=0,dl=null,pl=0,dt=[],pt=0,fn=null,Dt=1,Ot="";function mn(e,t){On[$n++]=pl,On[$n++]=dl,dl=e,pl=t}function yo(e,t,n){dt[pt++]=Dt,dt[pt++]=Ot,dt[pt++]=fn,fn=e;var r=Dt;e=Ot;var s=32-xt(r)-1;r&=~(1<<s),n+=1;var i=32-xt(t)+s;if(30<i){var a=s-s%5;i=(r&(1<<a)-1).toString(32),r>>=a,s-=a,Dt=1<<32-xt(t)+s|n<<s|r,Ot=i+e}else Dt=1<<i|n<<s|r,Ot=e}function Bs(e){e.return!==null&&(mn(e,1),yo(e,1,0))}function qs(e){for(;e===dl;)dl=On[--$n],On[$n]=null,pl=On[--$n],On[$n]=null;for(;e===fn;)fn=dt[--pt],dt[pt]=null,Ot=dt[--pt],dt[pt]=null,Dt=dt[--pt],dt[pt]=null}var ot=null,ut=null,Ne=!1,yt=null;function wo(e,t){var n=gt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function jo(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,ot=e,ut=Gt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,ot=e,ut=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=fn!==null?{id:Dt,overflow:Ot}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=gt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,ot=e,ut=null,!0):!1;default:return!1}}function Hs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ws(e){if(Ne){var t=ut;if(t){var n=t;if(!jo(e,t)){if(Hs(e))throw Error(d(418));t=Gt(n.nextSibling);var r=ot;t&&jo(e,t)?wo(r,n):(e.flags=e.flags&-4097|2,Ne=!1,ot=e)}}else{if(Hs(e))throw Error(d(418));e.flags=e.flags&-4097|2,Ne=!1,ot=e}}}function ko(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;ot=e}function fl(e){if(e!==ot)return!1;if(!Ne)return ko(e),Ne=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Os(e.type,e.memoizedProps)),t&&(t=ut)){if(Hs(e))throw No(),Error(d(418));for(;t;)wo(e,t),t=Gt(t.nextSibling)}if(ko(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(d(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ut=Gt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ut=null}}else ut=ot?Gt(e.stateNode.nextSibling):null;return!0}function No(){for(var e=ut;e;)e=Gt(e.nextSibling)}function Fn(){ut=ot=null,Ne=!1}function Qs(e){yt===null?yt=[e]:yt.push(e)}var $d=T.ReactCurrentBatchConfig;function yr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(d(309));var r=n.stateNode}if(!r)throw Error(d(147,e));var s=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var u=s.refs;a===null?delete u[i]:u[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(d(284));if(!n._owner)throw Error(d(290,e))}return e}function ml(e,t){throw e=Object.prototype.toString.call(t),Error(d(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function So(e){var t=e._init;return t(e._payload)}function bo(e){function t(m,p){if(e){var h=m.deletions;h===null?(m.deletions=[p],m.flags|=16):h.push(p)}}function n(m,p){if(!e)return null;for(;p!==null;)t(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function s(m,p){return m=on(m,p),m.index=0,m.sibling=null,m}function i(m,p,h){return m.index=h,e?(h=m.alternate,h!==null?(h=h.index,h<p?(m.flags|=2,p):h):(m.flags|=2,p)):(m.flags|=1048576,p)}function a(m){return e&&m.alternate===null&&(m.flags|=2),m}function u(m,p,h,_){return p===null||p.tag!==6?(p=$i(h,m.mode,_),p.return=m,p):(p=s(p,h),p.return=m,p)}function c(m,p,h,_){var Q=h.type;return Q===Ee?C(m,p,h.props.children,_,h.key):p!==null&&(p.elementType===Q||typeof Q=="object"&&Q!==null&&Q.$$typeof===ke&&So(Q)===p.type)?(_=s(p,h.props),_.ref=yr(m,p,h),_.return=m,_):(_=$l(h.type,h.key,h.props,null,m.mode,_),_.ref=yr(m,p,h),_.return=m,_)}function y(m,p,h,_){return p===null||p.tag!==4||p.stateNode.containerInfo!==h.containerInfo||p.stateNode.implementation!==h.implementation?(p=Fi(h,m.mode,_),p.return=m,p):(p=s(p,h.children||[]),p.return=m,p)}function C(m,p,h,_,Q){return p===null||p.tag!==7?(p=kn(h,m.mode,_,Q),p.return=m,p):(p=s(p,h),p.return=m,p)}function E(m,p,h){if(typeof p=="string"&&p!==""||typeof p=="number")return p=$i(""+p,m.mode,h),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case oe:return h=$l(p.type,p.key,p.props,null,m.mode,h),h.ref=yr(m,null,p),h.return=m,h;case he:return p=Fi(p,m.mode,h),p.return=m,p;case ke:var _=p._init;return E(m,_(p._payload),h)}if(Bt(p)||K(p))return p=kn(p,m.mode,h,null),p.return=m,p;ml(m,p)}return null}function b(m,p,h,_){var Q=p!==null?p.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return Q!==null?null:u(m,p,""+h,_);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case oe:return h.key===Q?c(m,p,h,_):null;case he:return h.key===Q?y(m,p,h,_):null;case ke:return Q=h._init,b(m,p,Q(h._payload),_)}if(Bt(h)||K(h))return Q!==null?null:C(m,p,h,_,null);ml(m,h)}return null}function B(m,p,h,_,Q){if(typeof _=="string"&&_!==""||typeof _=="number")return m=m.get(h)||null,u(p,m,""+_,Q);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case oe:return m=m.get(_.key===null?h:_.key)||null,c(p,m,_,Q);case he:return m=m.get(_.key===null?h:_.key)||null,y(p,m,_,Q);case ke:var Y=_._init;return B(m,p,h,Y(_._payload),Q)}if(Bt(_)||K(_))return m=m.get(h)||null,C(p,m,_,Q,null);ml(p,_)}return null}function H(m,p,h,_){for(var Q=null,Y=null,G=p,ee=p=0,$e=null;G!==null&&ee<h.length;ee++){G.index>ee?($e=G,G=null):$e=G.sibling;var de=b(m,G,h[ee],_);if(de===null){G===null&&(G=$e);break}e&&G&&de.alternate===null&&t(m,G),p=i(de,p,ee),Y===null?Q=de:Y.sibling=de,Y=de,G=$e}if(ee===h.length)return n(m,G),Ne&&mn(m,ee),Q;if(G===null){for(;ee<h.length;ee++)G=E(m,h[ee],_),G!==null&&(p=i(G,p,ee),Y===null?Q=G:Y.sibling=G,Y=G);return Ne&&mn(m,ee),Q}for(G=r(m,G);ee<h.length;ee++)$e=B(G,m,ee,h[ee],_),$e!==null&&(e&&$e.alternate!==null&&G.delete($e.key===null?ee:$e.key),p=i($e,p,ee),Y===null?Q=$e:Y.sibling=$e,Y=$e);return e&&G.forEach(function(un){return t(m,un)}),Ne&&mn(m,ee),Q}function W(m,p,h,_){var Q=K(h);if(typeof Q!="function")throw Error(d(150));if(h=Q.call(h),h==null)throw Error(d(151));for(var Y=Q=null,G=p,ee=p=0,$e=null,de=h.next();G!==null&&!de.done;ee++,de=h.next()){G.index>ee?($e=G,G=null):$e=G.sibling;var un=b(m,G,de.value,_);if(un===null){G===null&&(G=$e);break}e&&G&&un.alternate===null&&t(m,G),p=i(un,p,ee),Y===null?Q=un:Y.sibling=un,Y=un,G=$e}if(de.done)return n(m,G),Ne&&mn(m,ee),Q;if(G===null){for(;!de.done;ee++,de=h.next())de=E(m,de.value,_),de!==null&&(p=i(de,p,ee),Y===null?Q=de:Y.sibling=de,Y=de);return Ne&&mn(m,ee),Q}for(G=r(m,G);!de.done;ee++,de=h.next())de=B(G,m,ee,de.value,_),de!==null&&(e&&de.alternate!==null&&G.delete(de.key===null?ee:de.key),p=i(de,p,ee),Y===null?Q=de:Y.sibling=de,Y=de);return e&&G.forEach(function(xp){return t(m,xp)}),Ne&&mn(m,ee),Q}function Te(m,p,h,_){if(typeof h=="object"&&h!==null&&h.type===Ee&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case oe:e:{for(var Q=h.key,Y=p;Y!==null;){if(Y.key===Q){if(Q=h.type,Q===Ee){if(Y.tag===7){n(m,Y.sibling),p=s(Y,h.props.children),p.return=m,m=p;break e}}else if(Y.elementType===Q||typeof Q=="object"&&Q!==null&&Q.$$typeof===ke&&So(Q)===Y.type){n(m,Y.sibling),p=s(Y,h.props),p.ref=yr(m,Y,h),p.return=m,m=p;break e}n(m,Y);break}else t(m,Y);Y=Y.sibling}h.type===Ee?(p=kn(h.props.children,m.mode,_,h.key),p.return=m,m=p):(_=$l(h.type,h.key,h.props,null,m.mode,_),_.ref=yr(m,p,h),_.return=m,m=_)}return a(m);case he:e:{for(Y=h.key;p!==null;){if(p.key===Y)if(p.tag===4&&p.stateNode.containerInfo===h.containerInfo&&p.stateNode.implementation===h.implementation){n(m,p.sibling),p=s(p,h.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else t(m,p);p=p.sibling}p=Fi(h,m.mode,_),p.return=m,m=p}return a(m);case ke:return Y=h._init,Te(m,p,Y(h._payload),_)}if(Bt(h))return H(m,p,h,_);if(K(h))return W(m,p,h,_);ml(m,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,p!==null&&p.tag===6?(n(m,p.sibling),p=s(p,h),p.return=m,m=p):(n(m,p),p=$i(h,m.mode,_),p.return=m,m=p),a(m)):n(m,p)}return Te}var In=bo(!0),Co=bo(!1),hl=Xt(null),gl=null,Un=null,Ks=null;function Ys(){Ks=Un=gl=null}function Gs(e){var t=hl.current;je(hl),e._currentValue=t}function Xs(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Vn(e,t){gl=e,Ks=Un=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(nt=!0),e.firstContext=null)}function ft(e){var t=e._currentValue;if(Ks!==e)if(e={context:e,memoizedValue:t,next:null},Un===null){if(gl===null)throw Error(d(308));Un=e,gl.dependencies={lanes:0,firstContext:e}}else Un=Un.next=e;return t}var hn=null;function Zs(e){hn===null?hn=[e]:hn.push(e)}function Eo(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,Zs(t)):(n.next=s.next,s.next=n),t.interleaved=n,$t(e,r)}function $t(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var en=!1;function Js(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function zo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ft(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function tn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(ue&2)!==0){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,$t(e,n)}return s=r.interleaved,s===null?(t.next=t,Zs(r)):(t.next=s.next,s.next=t),r.interleaved=t,$t(e,n)}function xl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,fs(e,n)}}function _o(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?s=i=t:i=i.next=t}else s=i=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function vl(e,t,n,r){var s=e.updateQueue;en=!1;var i=s.firstBaseUpdate,a=s.lastBaseUpdate,u=s.shared.pending;if(u!==null){s.shared.pending=null;var c=u,y=c.next;c.next=null,a===null?i=y:a.next=y,a=c;var C=e.alternate;C!==null&&(C=C.updateQueue,u=C.lastBaseUpdate,u!==a&&(u===null?C.firstBaseUpdate=y:u.next=y,C.lastBaseUpdate=c))}if(i!==null){var E=s.baseState;a=0,C=y=c=null,u=i;do{var b=u.lane,B=u.eventTime;if((r&b)===b){C!==null&&(C=C.next={eventTime:B,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var H=e,W=u;switch(b=t,B=n,W.tag){case 1:if(H=W.payload,typeof H=="function"){E=H.call(B,E,b);break e}E=H;break e;case 3:H.flags=H.flags&-65537|128;case 0:if(H=W.payload,b=typeof H=="function"?H.call(B,E,b):H,b==null)break e;E=V({},E,b);break e;case 2:en=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,b=s.effects,b===null?s.effects=[u]:b.push(u))}else B={eventTime:B,lane:b,tag:u.tag,payload:u.payload,callback:u.callback,next:null},C===null?(y=C=B,c=E):C=C.next=B,a|=b;if(u=u.next,u===null){if(u=s.shared.pending,u===null)break;b=u,u=b.next,b.next=null,s.lastBaseUpdate=b,s.shared.pending=null}}while(!0);if(C===null&&(c=E),s.baseState=c,s.firstBaseUpdate=y,s.lastBaseUpdate=C,t=s.shared.interleaved,t!==null){s=t;do a|=s.lane,s=s.next;while(s!==t)}else i===null&&(s.shared.lanes=0);vn|=a,e.lanes=a,e.memoizedState=E}}function To(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(d(191,s));s.call(r)}}}var wr={},zt=Xt(wr),jr=Xt(wr),kr=Xt(wr);function gn(e){if(e===wr)throw Error(d(174));return e}function ei(e,t){switch(ve(kr,t),ve(jr,e),ve(zt,wr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ts(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ts(t,e)}je(zt),ve(zt,t)}function Bn(){je(zt),je(jr),je(kr)}function Po(e){gn(kr.current);var t=gn(zt.current),n=ts(t,e.type);t!==n&&(ve(jr,e),ve(zt,n))}function ti(e){jr.current===e&&(je(zt),je(jr))}var be=Xt(0);function yl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ni=[];function ri(){for(var e=0;e<ni.length;e++)ni[e]._workInProgressVersionPrimary=null;ni.length=0}var wl=T.ReactCurrentDispatcher,li=T.ReactCurrentBatchConfig,xn=0,Ce=null,Me=null,De=null,jl=!1,Nr=!1,Sr=0,Fd=0;function We(){throw Error(d(321))}function si(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!vt(e[n],t[n]))return!1;return!0}function ii(e,t,n,r,s,i){if(xn=i,Ce=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,wl.current=e===null||e.memoizedState===null?Bd:qd,e=n(r,s),Nr){i=0;do{if(Nr=!1,Sr=0,25<=i)throw Error(d(301));i+=1,De=Me=null,t.updateQueue=null,wl.current=Hd,e=n(r,s)}while(Nr)}if(wl.current=Sl,t=Me!==null&&Me.next!==null,xn=0,De=Me=Ce=null,jl=!1,t)throw Error(d(300));return e}function ai(){var e=Sr!==0;return Sr=0,e}function _t(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return De===null?Ce.memoizedState=De=e:De=De.next=e,De}function mt(){if(Me===null){var e=Ce.alternate;e=e!==null?e.memoizedState:null}else e=Me.next;var t=De===null?Ce.memoizedState:De.next;if(t!==null)De=t,Me=e;else{if(e===null)throw Error(d(310));Me=e,e={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},De===null?Ce.memoizedState=De=e:De=De.next=e}return De}function br(e,t){return typeof t=="function"?t(e):t}function oi(e){var t=mt(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var r=Me,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var a=s.next;s.next=i.next,i.next=a}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var u=a=null,c=null,y=i;do{var C=y.lane;if((xn&C)===C)c!==null&&(c=c.next={lane:0,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null}),r=y.hasEagerState?y.eagerState:e(r,y.action);else{var E={lane:C,action:y.action,hasEagerState:y.hasEagerState,eagerState:y.eagerState,next:null};c===null?(u=c=E,a=r):c=c.next=E,Ce.lanes|=C,vn|=C}y=y.next}while(y!==null&&y!==i);c===null?a=r:c.next=u,vt(r,t.memoizedState)||(nt=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do i=s.lane,Ce.lanes|=i,vn|=i,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ui(e){var t=mt(),n=t.queue;if(n===null)throw Error(d(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,i=t.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do i=e(i,a.action),a=a.next;while(a!==s);vt(i,t.memoizedState)||(nt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Lo(){}function Mo(e,t){var n=Ce,r=mt(),s=t(),i=!vt(r.memoizedState,s);if(i&&(r.memoizedState=s,nt=!0),r=r.queue,ci(Do.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||De!==null&&De.memoizedState.tag&1){if(n.flags|=2048,Cr(9,Ro.bind(null,n,r,s,t),void 0,null),Oe===null)throw Error(d(349));(xn&30)!==0||Ao(n,t,s)}return s}function Ao(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ce.updateQueue,t===null?(t={lastEffect:null,stores:null},Ce.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ro(e,t,n,r){t.value=n,t.getSnapshot=r,Oo(t)&&$o(e)}function Do(e,t,n){return n(function(){Oo(t)&&$o(e)})}function Oo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!vt(e,n)}catch{return!0}}function $o(e){var t=$t(e,1);t!==null&&Nt(t,e,1,-1)}function Fo(e){var t=_t();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:br,lastRenderedState:e},t.queue=e,e=e.dispatch=Vd.bind(null,Ce,e),[t.memoizedState,e]}function Cr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ce.updateQueue,t===null?(t={lastEffect:null,stores:null},Ce.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Io(){return mt().memoizedState}function kl(e,t,n,r){var s=_t();Ce.flags|=e,s.memoizedState=Cr(1|t,n,void 0,r===void 0?null:r)}function Nl(e,t,n,r){var s=mt();r=r===void 0?null:r;var i=void 0;if(Me!==null){var a=Me.memoizedState;if(i=a.destroy,r!==null&&si(r,a.deps)){s.memoizedState=Cr(t,n,i,r);return}}Ce.flags|=e,s.memoizedState=Cr(1|t,n,i,r)}function Uo(e,t){return kl(8390656,8,e,t)}function ci(e,t){return Nl(2048,8,e,t)}function Vo(e,t){return Nl(4,2,e,t)}function Bo(e,t){return Nl(4,4,e,t)}function qo(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ho(e,t,n){return n=n!=null?n.concat([e]):null,Nl(4,4,qo.bind(null,t,e),n)}function di(){}function Wo(e,t){var n=mt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&si(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Qo(e,t){var n=mt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&si(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ko(e,t,n){return(xn&21)===0?(e.baseState&&(e.baseState=!1,nt=!0),e.memoizedState=n):(vt(n,t)||(n=Na(),Ce.lanes|=n,vn|=n,e.baseState=!0),t)}function Id(e,t){var n=fe;fe=n!==0&&4>n?n:4,e(!0);var r=li.transition;li.transition={};try{e(!1),t()}finally{fe=n,li.transition=r}}function Yo(){return mt().memoizedState}function Ud(e,t,n){var r=sn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Go(e))Xo(t,n);else if(n=Eo(e,t,n,r),n!==null){var s=Ze();Nt(n,e,r,s),Zo(n,t,r)}}function Vd(e,t,n){var r=sn(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Go(e))Xo(t,s);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,u=i(a,n);if(s.hasEagerState=!0,s.eagerState=u,vt(u,a)){var c=t.interleaved;c===null?(s.next=s,Zs(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=Eo(e,t,s,r),n!==null&&(s=Ze(),Nt(n,e,r,s),Zo(n,t,r))}}function Go(e){var t=e.alternate;return e===Ce||t!==null&&t===Ce}function Xo(e,t){Nr=jl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Zo(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,fs(e,n)}}var Sl={readContext:ft,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useInsertionEffect:We,useLayoutEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useMutableSource:We,useSyncExternalStore:We,useId:We,unstable_isNewReconciler:!1},Bd={readContext:ft,useCallback:function(e,t){return _t().memoizedState=[e,t===void 0?null:t],e},useContext:ft,useEffect:Uo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,kl(4194308,4,qo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return kl(4194308,4,e,t)},useInsertionEffect:function(e,t){return kl(4,2,e,t)},useMemo:function(e,t){var n=_t();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=_t();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ud.bind(null,Ce,e),[r.memoizedState,e]},useRef:function(e){var t=_t();return e={current:e},t.memoizedState=e},useState:Fo,useDebugValue:di,useDeferredValue:function(e){return _t().memoizedState=e},useTransition:function(){var e=Fo(!1),t=e[0];return e=Id.bind(null,e[1]),_t().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Ce,s=_t();if(Ne){if(n===void 0)throw Error(d(407));n=n()}else{if(n=t(),Oe===null)throw Error(d(349));(xn&30)!==0||Ao(r,t,n)}s.memoizedState=n;var i={value:n,getSnapshot:t};return s.queue=i,Uo(Do.bind(null,r,i,e),[e]),r.flags|=2048,Cr(9,Ro.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=_t(),t=Oe.identifierPrefix;if(Ne){var n=Ot,r=Dt;n=(r&~(1<<32-xt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Sr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Fd++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},qd={readContext:ft,useCallback:Wo,useContext:ft,useEffect:ci,useImperativeHandle:Ho,useInsertionEffect:Vo,useLayoutEffect:Bo,useMemo:Qo,useReducer:oi,useRef:Io,useState:function(){return oi(br)},useDebugValue:di,useDeferredValue:function(e){var t=mt();return Ko(t,Me.memoizedState,e)},useTransition:function(){var e=oi(br)[0],t=mt().memoizedState;return[e,t]},useMutableSource:Lo,useSyncExternalStore:Mo,useId:Yo,unstable_isNewReconciler:!1},Hd={readContext:ft,useCallback:Wo,useContext:ft,useEffect:ci,useImperativeHandle:Ho,useInsertionEffect:Vo,useLayoutEffect:Bo,useMemo:Qo,useReducer:ui,useRef:Io,useState:function(){return ui(br)},useDebugValue:di,useDeferredValue:function(e){var t=mt();return Me===null?t.memoizedState=e:Ko(t,Me.memoizedState,e)},useTransition:function(){var e=ui(br)[0],t=mt().memoizedState;return[e,t]},useMutableSource:Lo,useSyncExternalStore:Mo,useId:Yo,unstable_isNewReconciler:!1};function wt(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function pi(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:V({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var bl={isMounted:function(e){return(e=e._reactInternals)?cn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ze(),s=sn(e),i=Ft(r,s);i.payload=t,n!=null&&(i.callback=n),t=tn(e,i,s),t!==null&&(Nt(t,e,s,r),xl(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ze(),s=sn(e),i=Ft(r,s);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=tn(e,i,s),t!==null&&(Nt(t,e,s,r),xl(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ze(),r=sn(e),s=Ft(n,r);s.tag=2,t!=null&&(s.callback=t),t=tn(e,s,r),t!==null&&(Nt(t,e,r,n),xl(t,e,r))}};function Jo(e,t,n,r,s,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!pr(n,r)||!pr(s,i):!0}function eu(e,t,n){var r=!1,s=Zt,i=t.contextType;return typeof i=="object"&&i!==null?i=ft(i):(s=tt(t)?pn:He.current,r=t.contextTypes,i=(r=r!=null)?Dn(e,s):Zt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=bl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=i),t}function tu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&bl.enqueueReplaceState(t,t.state,null)}function fi(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Js(e);var i=t.contextType;typeof i=="object"&&i!==null?s.context=ft(i):(i=tt(t)?pn:He.current,s.context=Dn(e,i)),s.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(pi(e,t,i,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&bl.enqueueReplaceState(s,s.state,null),vl(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function qn(e,t){try{var n="",r=t;do n+=ae(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:s,digest:null}}function mi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function hi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Wd=typeof WeakMap=="function"?WeakMap:Map;function nu(e,t,n){n=Ft(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ll||(Ll=!0,Ti=r),hi(e,t)},n}function ru(e,t,n){n=Ft(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){hi(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){hi(e,t),typeof r!="function"&&(rn===null?rn=new Set([this]):rn.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function lu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Wd;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=ip.bind(null,e,t,n),t.then(e,e))}function su(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function iu(e,t,n,r,s){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ft(-1,1),t.tag=2,tn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=s,e)}var Qd=T.ReactCurrentOwner,nt=!1;function Xe(e,t,n,r){t.child=e===null?Co(t,null,n,r):In(t,e.child,n,r)}function au(e,t,n,r,s){n=n.render;var i=t.ref;return Vn(t,s),r=ii(e,t,n,r,i,s),n=ai(),e!==null&&!nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,It(e,t,s)):(Ne&&n&&Bs(t),t.flags|=1,Xe(e,t,r,s),t.child)}function ou(e,t,n,r,s){if(e===null){var i=n.type;return typeof i=="function"&&!Oi(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,uu(e,t,i,r,s)):(e=$l(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&s)===0){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:pr,n(a,r)&&e.ref===t.ref)return It(e,t,s)}return t.flags|=1,e=on(i,r),e.ref=t.ref,e.return=t,t.child=e}function uu(e,t,n,r,s){if(e!==null){var i=e.memoizedProps;if(pr(i,r)&&e.ref===t.ref)if(nt=!1,t.pendingProps=r=i,(e.lanes&s)!==0)(e.flags&131072)!==0&&(nt=!0);else return t.lanes=e.lanes,It(e,t,s)}return gi(e,t,n,r,s)}function cu(e,t,n){var r=t.pendingProps,s=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ve(Wn,ct),ct|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ve(Wn,ct),ct|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ve(Wn,ct),ct|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,ve(Wn,ct),ct|=r;return Xe(e,t,s,n),t.child}function du(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function gi(e,t,n,r,s){var i=tt(n)?pn:He.current;return i=Dn(t,i),Vn(t,s),n=ii(e,t,n,r,i,s),r=ai(),e!==null&&!nt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,It(e,t,s)):(Ne&&r&&Bs(t),t.flags|=1,Xe(e,t,n,s),t.child)}function pu(e,t,n,r,s){if(tt(n)){var i=!0;ul(t)}else i=!1;if(Vn(t,s),t.stateNode===null)El(e,t),eu(t,n,r),fi(t,n,r,s),r=!0;else if(e===null){var a=t.stateNode,u=t.memoizedProps;a.props=u;var c=a.context,y=n.contextType;typeof y=="object"&&y!==null?y=ft(y):(y=tt(n)?pn:He.current,y=Dn(t,y));var C=n.getDerivedStateFromProps,E=typeof C=="function"||typeof a.getSnapshotBeforeUpdate=="function";E||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(u!==r||c!==y)&&tu(t,a,r,y),en=!1;var b=t.memoizedState;a.state=b,vl(t,r,a,s),c=t.memoizedState,u!==r||b!==c||et.current||en?(typeof C=="function"&&(pi(t,n,C,r),c=t.memoizedState),(u=en||Jo(t,n,u,r,b,c,y))?(E||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),a.props=r,a.state=c,a.context=y,r=u):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,zo(e,t),u=t.memoizedProps,y=t.type===t.elementType?u:wt(t.type,u),a.props=y,E=t.pendingProps,b=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=ft(c):(c=tt(n)?pn:He.current,c=Dn(t,c));var B=n.getDerivedStateFromProps;(C=typeof B=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(u!==E||b!==c)&&tu(t,a,r,c),en=!1,b=t.memoizedState,a.state=b,vl(t,r,a,s);var H=t.memoizedState;u!==E||b!==H||et.current||en?(typeof B=="function"&&(pi(t,n,B,r),H=t.memoizedState),(y=en||Jo(t,n,y,r,b,H,c)||!1)?(C||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,H,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,H,c)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||u===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=H),a.props=r,a.state=H,a.context=c,r=y):(typeof a.componentDidUpdate!="function"||u===e.memoizedProps&&b===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&b===e.memoizedState||(t.flags|=1024),r=!1)}return xi(e,t,n,r,i,s)}function xi(e,t,n,r,s,i){du(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return s&&xo(t,n,!1),It(e,t,i);r=t.stateNode,Qd.current=t;var u=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=In(t,e.child,null,i),t.child=In(t,null,u,i)):Xe(e,t,u,i),t.memoizedState=r.state,s&&xo(t,n,!0),t.child}function fu(e){var t=e.stateNode;t.pendingContext?ho(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ho(e,t.context,!1),ei(e,t.containerInfo)}function mu(e,t,n,r,s){return Fn(),Qs(s),t.flags|=256,Xe(e,t,n,r),t.child}var vi={dehydrated:null,treeContext:null,retryLane:0};function yi(e){return{baseLanes:e,cachePool:null,transitions:null}}function hu(e,t,n){var r=t.pendingProps,s=be.current,i=!1,a=(t.flags&128)!==0,u;if((u=a)||(u=e!==null&&e.memoizedState===null?!1:(s&2)!==0),u?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),ve(be,s&1),e===null)return Ws(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Fl(a,r,0,null),e=kn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=yi(n),t.memoizedState=vi,e):wi(t,a));if(s=e.memoizedState,s!==null&&(u=s.dehydrated,u!==null))return Kd(e,t,a,r,u,s,n);if(i){i=r.fallback,a=t.mode,s=e.child,u=s.sibling;var c={mode:"hidden",children:r.children};return(a&1)===0&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=on(s,c),r.subtreeFlags=s.subtreeFlags&14680064),u!==null?i=on(u,i):(i=kn(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?yi(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=vi,r}return i=e.child,e=i.sibling,r=on(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function wi(e,t){return t=Fl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Cl(e,t,n,r){return r!==null&&Qs(r),In(t,e.child,null,n),e=wi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Kd(e,t,n,r,s,i,a){if(n)return t.flags&256?(t.flags&=-257,r=mi(Error(d(422))),Cl(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,s=t.mode,r=Fl({mode:"visible",children:r.children},s,0,null),i=kn(i,s,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&In(t,e.child,null,a),t.child.memoizedState=yi(a),t.memoizedState=vi,i);if((t.mode&1)===0)return Cl(e,t,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var u=r.dgst;return r=u,i=Error(d(419)),r=mi(i,r,void 0),Cl(e,t,a,r)}if(u=(a&e.childLanes)!==0,nt||u){if(r=Oe,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=(s&(r.suspendedLanes|a))!==0?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,$t(e,s),Nt(r,e,s,-1))}return Di(),r=mi(Error(d(421))),Cl(e,t,a,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=ap.bind(null,e),s._reactRetry=t,null):(e=i.treeContext,ut=Gt(s.nextSibling),ot=t,Ne=!0,yt=null,e!==null&&(dt[pt++]=Dt,dt[pt++]=Ot,dt[pt++]=fn,Dt=e.id,Ot=e.overflow,fn=t),t=wi(t,r.children),t.flags|=4096,t)}function gu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Xs(e.return,t,n)}function ji(e,t,n,r,s){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function xu(e,t,n){var r=t.pendingProps,s=r.revealOrder,i=r.tail;if(Xe(e,t,r.children,n),r=be.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&gu(e,n,t);else if(e.tag===19)gu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ve(be,r),(t.mode&1)===0)t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&yl(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),ji(t,!1,s,n,i);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&yl(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}ji(t,!0,n,null,i);break;case"together":ji(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function El(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function It(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),vn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(d(153));if(t.child!==null){for(e=t.child,n=on(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=on(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Yd(e,t,n){switch(t.tag){case 3:fu(t),Fn();break;case 5:Po(t);break;case 1:tt(t.type)&&ul(t);break;case 4:ei(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;ve(hl,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ve(be,be.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?hu(e,t,n):(ve(be,be.current&1),e=It(e,t,n),e!==null?e.sibling:null);ve(be,be.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return xu(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ve(be,be.current),r)break;return null;case 22:case 23:return t.lanes=0,cu(e,t,n)}return It(e,t,n)}var vu,ki,yu,wu;vu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ki=function(){},yu=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,gn(zt.current);var i=null;switch(n){case"input":s=Je(e,s),r=Je(e,r),i=[];break;case"select":s=V({},s,{value:void 0}),r=V({},r,{value:void 0}),i=[];break;case"textarea":s=Nn(e,s),r=Nn(e,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=il)}ns(n,r);var a;n=null;for(y in s)if(!r.hasOwnProperty(y)&&s.hasOwnProperty(y)&&s[y]!=null)if(y==="style"){var u=s[y];for(a in u)u.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else y!=="dangerouslySetInnerHTML"&&y!=="children"&&y!=="suppressContentEditableWarning"&&y!=="suppressHydrationWarning"&&y!=="autoFocus"&&(k.hasOwnProperty(y)?i||(i=[]):(i=i||[]).push(y,null));for(y in r){var c=r[y];if(u=s!=null?s[y]:void 0,r.hasOwnProperty(y)&&c!==u&&(c!=null||u!=null))if(y==="style")if(u){for(a in u)!u.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&u[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(i||(i=[]),i.push(y,n)),n=c;else y==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,u=u?u.__html:void 0,c!=null&&u!==c&&(i=i||[]).push(y,c)):y==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(y,""+c):y!=="suppressContentEditableWarning"&&y!=="suppressHydrationWarning"&&(k.hasOwnProperty(y)?(c!=null&&y==="onScroll"&&we("scroll",e),i||u===c||(i=[])):(i=i||[]).push(y,c))}n&&(i=i||[]).push("style",n);var y=i;(t.updateQueue=y)&&(t.flags|=4)}},wu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Er(e,t){if(!Ne)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Qe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Gd(e,t,n){var r=t.pendingProps;switch(qs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(t),null;case 1:return tt(t.type)&&ol(),Qe(t),null;case 3:return r=t.stateNode,Bn(),je(et),je(He),ri(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(fl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,yt!==null&&(Mi(yt),yt=null))),ki(e,t),Qe(t),null;case 5:ti(t);var s=gn(kr.current);if(n=t.type,e!==null&&t.stateNode!=null)yu(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(d(166));return Qe(t),null}if(e=gn(zt.current),fl(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Et]=t,r[xr]=i,e=(t.mode&1)!==0,n){case"dialog":we("cancel",r),we("close",r);break;case"iframe":case"object":case"embed":we("load",r);break;case"video":case"audio":for(s=0;s<mr.length;s++)we(mr[s],r);break;case"source":we("error",r);break;case"img":case"image":case"link":we("error",r),we("load",r);break;case"details":we("toggle",r);break;case"input":Fe(r,i),we("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},we("invalid",r);break;case"textarea":Sn(r,i),we("invalid",r)}ns(n,i),s=null;for(var a in i)if(i.hasOwnProperty(a)){var u=i[a];a==="children"?typeof u=="string"?r.textContent!==u&&(i.suppressHydrationWarning!==!0&&sl(r.textContent,u,e),s=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(i.suppressHydrationWarning!==!0&&sl(r.textContent,u,e),s=["children",""+u]):k.hasOwnProperty(a)&&u!=null&&a==="onScroll"&&we("scroll",r)}switch(n){case"input":St(r),Vt(r,i,!0);break;case"textarea":St(r),la(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=il)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=sa(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Et]=t,e[xr]=r,vu(e,t,!1,!1),t.stateNode=e;e:{switch(a=rs(n,r),n){case"dialog":we("cancel",e),we("close",e),s=r;break;case"iframe":case"object":case"embed":we("load",e),s=r;break;case"video":case"audio":for(s=0;s<mr.length;s++)we(mr[s],e);s=r;break;case"source":we("error",e),s=r;break;case"img":case"image":case"link":we("error",e),we("load",e),s=r;break;case"details":we("toggle",e),s=r;break;case"input":Fe(e,r),s=Je(e,r),we("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=V({},r,{value:void 0}),we("invalid",e);break;case"textarea":Sn(e,r),s=Nn(e,r),we("invalid",e);break;default:s=r}ns(n,s),u=s;for(i in u)if(u.hasOwnProperty(i)){var c=u[i];i==="style"?oa(e,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&ia(e,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Yn(e,c):typeof c=="number"&&Yn(e,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(k.hasOwnProperty(i)?c!=null&&i==="onScroll"&&we("scroll",e):c!=null&&A(e,i,c,a))}switch(n){case"input":St(e),Vt(e,r,!1);break;case"textarea":St(e),la(e);break;case"option":r.value!=null&&e.setAttribute("value",""+pe(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Mt(e,!!r.multiple,i,!1):r.defaultValue!=null&&Mt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=il)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Qe(t),null;case 6:if(e&&t.stateNode!=null)wu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(d(166));if(n=gn(kr.current),gn(zt.current),fl(t)){if(r=t.stateNode,n=t.memoizedProps,r[Et]=t,(i=r.nodeValue!==n)&&(e=ot,e!==null))switch(e.tag){case 3:sl(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&sl(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Et]=t,t.stateNode=r}return Qe(t),null;case 13:if(je(be),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ne&&ut!==null&&(t.mode&1)!==0&&(t.flags&128)===0)No(),Fn(),t.flags|=98560,i=!1;else if(i=fl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(d(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(d(317));i[Et]=t}else Fn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Qe(t),i=!1}else yt!==null&&(Mi(yt),yt=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(be.current&1)!==0?Ae===0&&(Ae=3):Di())),t.updateQueue!==null&&(t.flags|=4),Qe(t),null);case 4:return Bn(),ki(e,t),e===null&&hr(t.stateNode.containerInfo),Qe(t),null;case 10:return Gs(t.type._context),Qe(t),null;case 17:return tt(t.type)&&ol(),Qe(t),null;case 19:if(je(be),i=t.memoizedState,i===null)return Qe(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)Er(i,!1);else{if(Ae!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=yl(e),a!==null){for(t.flags|=128,Er(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ve(be,be.current&1|2),t.child}e=e.sibling}i.tail!==null&&_e()>Qn&&(t.flags|=128,r=!0,Er(i,!1),t.lanes=4194304)}else{if(!r)if(e=yl(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Er(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!Ne)return Qe(t),null}else 2*_e()-i.renderingStartTime>Qn&&n!==1073741824&&(t.flags|=128,r=!0,Er(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=_e(),t.sibling=null,n=be.current,ve(be,r?n&1|2:n&1),t):(Qe(t),null);case 22:case 23:return Ri(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(ct&1073741824)!==0&&(Qe(t),t.subtreeFlags&6&&(t.flags|=8192)):Qe(t),null;case 24:return null;case 25:return null}throw Error(d(156,t.tag))}function Xd(e,t){switch(qs(t),t.tag){case 1:return tt(t.type)&&ol(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bn(),je(et),je(He),ri(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return ti(t),null;case 13:if(je(be),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(d(340));Fn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return je(be),null;case 4:return Bn(),null;case 10:return Gs(t.type._context),null;case 22:case 23:return Ri(),null;case 24:return null;default:return null}}var zl=!1,Ke=!1,Zd=typeof WeakSet=="function"?WeakSet:Set,q=null;function Hn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ze(e,t,r)}else n.current=null}function Ni(e,t,n){try{n()}catch(r){ze(e,t,r)}}var ju=!1;function Jd(e,t){if(Rs=Kr,e=Za(),Es(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,u=-1,c=-1,y=0,C=0,E=e,b=null;t:for(;;){for(var B;E!==n||s!==0&&E.nodeType!==3||(u=a+s),E!==i||r!==0&&E.nodeType!==3||(c=a+r),E.nodeType===3&&(a+=E.nodeValue.length),(B=E.firstChild)!==null;)b=E,E=B;for(;;){if(E===e)break t;if(b===n&&++y===s&&(u=a),b===i&&++C===r&&(c=a),(B=E.nextSibling)!==null)break;E=b,b=E.parentNode}E=B}n=u===-1||c===-1?null:{start:u,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ds={focusedElem:e,selectionRange:n},Kr=!1,q=t;q!==null;)if(t=q,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,q=e;else for(;q!==null;){t=q;try{var H=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(H!==null){var W=H.memoizedProps,Te=H.memoizedState,m=t.stateNode,p=m.getSnapshotBeforeUpdate(t.elementType===t.type?W:wt(t.type,W),Te);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(d(163))}}catch(_){ze(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,q=e;break}q=t.return}return H=ju,ju=!1,H}function zr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var i=s.destroy;s.destroy=void 0,i!==void 0&&Ni(t,n,i)}s=s.next}while(s!==r)}}function _l(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Si(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ku(e){var t=e.alternate;t!==null&&(e.alternate=null,ku(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Et],delete t[xr],delete t[Is],delete t[Rd],delete t[Dd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Nu(e){return e.tag===5||e.tag===3||e.tag===4}function Su(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Nu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function bi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=il));else if(r!==4&&(e=e.child,e!==null))for(bi(e,t,n),e=e.sibling;e!==null;)bi(e,t,n),e=e.sibling}function Ci(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ci(e,t,n),e=e.sibling;e!==null;)Ci(e,t,n),e=e.sibling}var Ie=null,jt=!1;function nn(e,t,n){for(n=n.child;n!==null;)bu(e,t,n),n=n.sibling}function bu(e,t,n){if(Ct&&typeof Ct.onCommitFiberUnmount=="function")try{Ct.onCommitFiberUnmount(Vr,n)}catch{}switch(n.tag){case 5:Ke||Hn(n,t);case 6:var r=Ie,s=jt;Ie=null,nn(e,t,n),Ie=r,jt=s,Ie!==null&&(jt?(e=Ie,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ie.removeChild(n.stateNode));break;case 18:Ie!==null&&(jt?(e=Ie,n=n.stateNode,e.nodeType===8?Fs(e.parentNode,n):e.nodeType===1&&Fs(e,n),ir(e)):Fs(Ie,n.stateNode));break;case 4:r=Ie,s=jt,Ie=n.stateNode.containerInfo,jt=!0,nn(e,t,n),Ie=r,jt=s;break;case 0:case 11:case 14:case 15:if(!Ke&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,a=i.destroy;i=i.tag,a!==void 0&&((i&2)!==0||(i&4)!==0)&&Ni(n,t,a),s=s.next}while(s!==r)}nn(e,t,n);break;case 1:if(!Ke&&(Hn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){ze(n,t,u)}nn(e,t,n);break;case 21:nn(e,t,n);break;case 22:n.mode&1?(Ke=(r=Ke)||n.memoizedState!==null,nn(e,t,n),Ke=r):nn(e,t,n);break;default:nn(e,t,n)}}function Cu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Zd),t.forEach(function(r){var s=op.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function kt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=e,a=t,u=a;e:for(;u!==null;){switch(u.tag){case 5:Ie=u.stateNode,jt=!1;break e;case 3:Ie=u.stateNode.containerInfo,jt=!0;break e;case 4:Ie=u.stateNode.containerInfo,jt=!0;break e}u=u.return}if(Ie===null)throw Error(d(160));bu(i,a,s),Ie=null,jt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(y){ze(s,t,y)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Eu(t,e),t=t.sibling}function Eu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(kt(t,e),Tt(e),r&4){try{zr(3,e,e.return),_l(3,e)}catch(W){ze(e,e.return,W)}try{zr(5,e,e.return)}catch(W){ze(e,e.return,W)}}break;case 1:kt(t,e),Tt(e),r&512&&n!==null&&Hn(n,n.return);break;case 5:if(kt(t,e),Tt(e),r&512&&n!==null&&Hn(n,n.return),e.flags&32){var s=e.stateNode;try{Yn(s,"")}catch(W){ze(e,e.return,W)}}if(r&4&&(s=e.stateNode,s!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,u=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{u==="input"&&i.type==="radio"&&i.name!=null&&bt(s,i),rs(u,a);var y=rs(u,i);for(a=0;a<c.length;a+=2){var C=c[a],E=c[a+1];C==="style"?oa(s,E):C==="dangerouslySetInnerHTML"?ia(s,E):C==="children"?Yn(s,E):A(s,C,E,y)}switch(u){case"input":Pt(s,i);break;case"textarea":ra(s,i);break;case"select":var b=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var B=i.value;B!=null?Mt(s,!!i.multiple,B,!1):b!==!!i.multiple&&(i.defaultValue!=null?Mt(s,!!i.multiple,i.defaultValue,!0):Mt(s,!!i.multiple,i.multiple?[]:"",!1))}s[xr]=i}catch(W){ze(e,e.return,W)}}break;case 6:if(kt(t,e),Tt(e),r&4){if(e.stateNode===null)throw Error(d(162));s=e.stateNode,i=e.memoizedProps;try{s.nodeValue=i}catch(W){ze(e,e.return,W)}}break;case 3:if(kt(t,e),Tt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ir(t.containerInfo)}catch(W){ze(e,e.return,W)}break;case 4:kt(t,e),Tt(e);break;case 13:kt(t,e),Tt(e),s=e.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(_i=_e())),r&4&&Cu(e);break;case 22:if(C=n!==null&&n.memoizedState!==null,e.mode&1?(Ke=(y=Ke)||C,kt(t,e),Ke=y):kt(t,e),Tt(e),r&8192){if(y=e.memoizedState!==null,(e.stateNode.isHidden=y)&&!C&&(e.mode&1)!==0)for(q=e,C=e.child;C!==null;){for(E=q=C;q!==null;){switch(b=q,B=b.child,b.tag){case 0:case 11:case 14:case 15:zr(4,b,b.return);break;case 1:Hn(b,b.return);var H=b.stateNode;if(typeof H.componentWillUnmount=="function"){r=b,n=b.return;try{t=r,H.props=t.memoizedProps,H.state=t.memoizedState,H.componentWillUnmount()}catch(W){ze(r,n,W)}}break;case 5:Hn(b,b.return);break;case 22:if(b.memoizedState!==null){Tu(E);continue}}B!==null?(B.return=b,q=B):Tu(E)}C=C.sibling}e:for(C=null,E=e;;){if(E.tag===5){if(C===null){C=E;try{s=E.stateNode,y?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(u=E.stateNode,c=E.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,u.style.display=aa("display",a))}catch(W){ze(e,e.return,W)}}}else if(E.tag===6){if(C===null)try{E.stateNode.nodeValue=y?"":E.memoizedProps}catch(W){ze(e,e.return,W)}}else if((E.tag!==22&&E.tag!==23||E.memoizedState===null||E===e)&&E.child!==null){E.child.return=E,E=E.child;continue}if(E===e)break e;for(;E.sibling===null;){if(E.return===null||E.return===e)break e;C===E&&(C=null),E=E.return}C===E&&(C=null),E.sibling.return=E.return,E=E.sibling}}break;case 19:kt(t,e),Tt(e),r&4&&Cu(e);break;case 21:break;default:kt(t,e),Tt(e)}}function Tt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Nu(n)){var r=n;break e}n=n.return}throw Error(d(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Yn(s,""),r.flags&=-33);var i=Su(e);Ci(e,i,s);break;case 3:case 4:var a=r.stateNode.containerInfo,u=Su(e);bi(e,u,a);break;default:throw Error(d(161))}}catch(c){ze(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ep(e,t,n){q=e,zu(e)}function zu(e,t,n){for(var r=(e.mode&1)!==0;q!==null;){var s=q,i=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||zl;if(!a){var u=s.alternate,c=u!==null&&u.memoizedState!==null||Ke;u=zl;var y=Ke;if(zl=a,(Ke=c)&&!y)for(q=s;q!==null;)a=q,c=a.child,a.tag===22&&a.memoizedState!==null?Pu(s):c!==null?(c.return=a,q=c):Pu(s);for(;i!==null;)q=i,zu(i),i=i.sibling;q=s,zl=u,Ke=y}_u(e)}else(s.subtreeFlags&8772)!==0&&i!==null?(i.return=s,q=i):_u(e)}}function _u(e){for(;q!==null;){var t=q;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ke||_l(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ke)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:wt(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&To(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}To(t,a,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var y=t.alternate;if(y!==null){var C=y.memoizedState;if(C!==null){var E=C.dehydrated;E!==null&&ir(E)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(d(163))}Ke||t.flags&512&&Si(t)}catch(b){ze(t,t.return,b)}}if(t===e){q=null;break}if(n=t.sibling,n!==null){n.return=t.return,q=n;break}q=t.return}}function Tu(e){for(;q!==null;){var t=q;if(t===e){q=null;break}var n=t.sibling;if(n!==null){n.return=t.return,q=n;break}q=t.return}}function Pu(e){for(;q!==null;){var t=q;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{_l(4,t)}catch(c){ze(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){ze(t,s,c)}}var i=t.return;try{Si(t)}catch(c){ze(t,i,c)}break;case 5:var a=t.return;try{Si(t)}catch(c){ze(t,a,c)}}}catch(c){ze(t,t.return,c)}if(t===e){q=null;break}var u=t.sibling;if(u!==null){u.return=t.return,q=u;break}q=t.return}}var tp=Math.ceil,Tl=T.ReactCurrentDispatcher,Ei=T.ReactCurrentOwner,ht=T.ReactCurrentBatchConfig,ue=0,Oe=null,Le=null,Ue=0,ct=0,Wn=Xt(0),Ae=0,_r=null,vn=0,Pl=0,zi=0,Tr=null,rt=null,_i=0,Qn=1/0,Ut=null,Ll=!1,Ti=null,rn=null,Ml=!1,ln=null,Al=0,Pr=0,Pi=null,Rl=-1,Dl=0;function Ze(){return(ue&6)!==0?_e():Rl!==-1?Rl:Rl=_e()}function sn(e){return(e.mode&1)===0?1:(ue&2)!==0&&Ue!==0?Ue&-Ue:$d.transition!==null?(Dl===0&&(Dl=Na()),Dl):(e=fe,e!==0||(e=window.event,e=e===void 0?16:La(e.type)),e)}function Nt(e,t,n,r){if(50<Pr)throw Pr=0,Pi=null,Error(d(185));tr(e,n,r),((ue&2)===0||e!==Oe)&&(e===Oe&&((ue&2)===0&&(Pl|=n),Ae===4&&an(e,Ue)),lt(e,r),n===1&&ue===0&&(t.mode&1)===0&&(Qn=_e()+500,cl&&Jt()))}function lt(e,t){var n=e.callbackNode;$c(e,t);var r=Hr(e,e===Oe?Ue:0);if(r===0)n!==null&&wa(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&wa(n),t===1)e.tag===0?Od(Mu.bind(null,e)):vo(Mu.bind(null,e)),Md(function(){(ue&6)===0&&Jt()}),n=null;else{switch(Sa(r)){case 1:n=cs;break;case 4:n=ja;break;case 16:n=Ur;break;case 536870912:n=ka;break;default:n=Ur}n=Uu(n,Lu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Lu(e,t){if(Rl=-1,Dl=0,(ue&6)!==0)throw Error(d(327));var n=e.callbackNode;if(Kn()&&e.callbackNode!==n)return null;var r=Hr(e,e===Oe?Ue:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Ol(e,r);else{t=r;var s=ue;ue|=2;var i=Ru();(Oe!==e||Ue!==t)&&(Ut=null,Qn=_e()+500,wn(e,t));do try{lp();break}catch(u){Au(e,u)}while(!0);Ys(),Tl.current=i,ue=s,Le!==null?t=0:(Oe=null,Ue=0,t=Ae)}if(t!==0){if(t===2&&(s=ds(e),s!==0&&(r=s,t=Li(e,s))),t===1)throw n=_r,wn(e,0),an(e,r),lt(e,_e()),n;if(t===6)an(e,r);else{if(s=e.current.alternate,(r&30)===0&&!np(s)&&(t=Ol(e,r),t===2&&(i=ds(e),i!==0&&(r=i,t=Li(e,i))),t===1))throw n=_r,wn(e,0),an(e,r),lt(e,_e()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(d(345));case 2:jn(e,rt,Ut);break;case 3:if(an(e,r),(r&130023424)===r&&(t=_i+500-_e(),10<t)){if(Hr(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Ze(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=$s(jn.bind(null,e,rt,Ut),t);break}jn(e,rt,Ut);break;case 4:if(an(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var a=31-xt(r);i=1<<a,a=t[a],a>s&&(s=a),r&=~i}if(r=s,r=_e()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*tp(r/1960))-r,10<r){e.timeoutHandle=$s(jn.bind(null,e,rt,Ut),r);break}jn(e,rt,Ut);break;case 5:jn(e,rt,Ut);break;default:throw Error(d(329))}}}return lt(e,_e()),e.callbackNode===n?Lu.bind(null,e):null}function Li(e,t){var n=Tr;return e.current.memoizedState.isDehydrated&&(wn(e,t).flags|=256),e=Ol(e,t),e!==2&&(t=rt,rt=n,t!==null&&Mi(t)),e}function Mi(e){rt===null?rt=e:rt.push.apply(rt,e)}function np(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!vt(i(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function an(e,t){for(t&=~zi,t&=~Pl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-xt(t),r=1<<n;e[n]=-1,t&=~r}}function Mu(e){if((ue&6)!==0)throw Error(d(327));Kn();var t=Hr(e,0);if((t&1)===0)return lt(e,_e()),null;var n=Ol(e,t);if(e.tag!==0&&n===2){var r=ds(e);r!==0&&(t=r,n=Li(e,r))}if(n===1)throw n=_r,wn(e,0),an(e,t),lt(e,_e()),n;if(n===6)throw Error(d(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,jn(e,rt,Ut),lt(e,_e()),null}function Ai(e,t){var n=ue;ue|=1;try{return e(t)}finally{ue=n,ue===0&&(Qn=_e()+500,cl&&Jt())}}function yn(e){ln!==null&&ln.tag===0&&(ue&6)===0&&Kn();var t=ue;ue|=1;var n=ht.transition,r=fe;try{if(ht.transition=null,fe=1,e)return e()}finally{fe=r,ht.transition=n,ue=t,(ue&6)===0&&Jt()}}function Ri(){ct=Wn.current,je(Wn)}function wn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Ld(n)),Le!==null)for(n=Le.return;n!==null;){var r=n;switch(qs(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ol();break;case 3:Bn(),je(et),je(He),ri();break;case 5:ti(r);break;case 4:Bn();break;case 13:je(be);break;case 19:je(be);break;case 10:Gs(r.type._context);break;case 22:case 23:Ri()}n=n.return}if(Oe=e,Le=e=on(e.current,null),Ue=ct=t,Ae=0,_r=null,zi=Pl=vn=0,rt=Tr=null,hn!==null){for(t=0;t<hn.length;t++)if(n=hn[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=s,r.next=a}n.pending=r}hn=null}return e}function Au(e,t){do{var n=Le;try{if(Ys(),wl.current=Sl,jl){for(var r=Ce.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}jl=!1}if(xn=0,De=Me=Ce=null,Nr=!1,Sr=0,Ei.current=null,n===null||n.return===null){Ae=1,_r=t,Le=null;break}e:{var i=e,a=n.return,u=n,c=t;if(t=Ue,u.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var y=c,C=u,E=C.tag;if((C.mode&1)===0&&(E===0||E===11||E===15)){var b=C.alternate;b?(C.updateQueue=b.updateQueue,C.memoizedState=b.memoizedState,C.lanes=b.lanes):(C.updateQueue=null,C.memoizedState=null)}var B=su(a);if(B!==null){B.flags&=-257,iu(B,a,u,i,t),B.mode&1&&lu(i,y,t),t=B,c=y;var H=t.updateQueue;if(H===null){var W=new Set;W.add(c),t.updateQueue=W}else H.add(c);break e}else{if((t&1)===0){lu(i,y,t),Di();break e}c=Error(d(426))}}else if(Ne&&u.mode&1){var Te=su(a);if(Te!==null){(Te.flags&65536)===0&&(Te.flags|=256),iu(Te,a,u,i,t),Qs(qn(c,u));break e}}i=c=qn(c,u),Ae!==4&&(Ae=2),Tr===null?Tr=[i]:Tr.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var m=nu(i,c,t);_o(i,m);break e;case 1:u=c;var p=i.type,h=i.stateNode;if((i.flags&128)===0&&(typeof p.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(rn===null||!rn.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var _=ru(i,u,t);_o(i,_);break e}}i=i.return}while(i!==null)}Ou(n)}catch(Q){t=Q,Le===n&&n!==null&&(Le=n=n.return);continue}break}while(!0)}function Ru(){var e=Tl.current;return Tl.current=Sl,e===null?Sl:e}function Di(){(Ae===0||Ae===3||Ae===2)&&(Ae=4),Oe===null||(vn&268435455)===0&&(Pl&268435455)===0||an(Oe,Ue)}function Ol(e,t){var n=ue;ue|=2;var r=Ru();(Oe!==e||Ue!==t)&&(Ut=null,wn(e,t));do try{rp();break}catch(s){Au(e,s)}while(!0);if(Ys(),ue=n,Tl.current=r,Le!==null)throw Error(d(261));return Oe=null,Ue=0,Ae}function rp(){for(;Le!==null;)Du(Le)}function lp(){for(;Le!==null&&!_c();)Du(Le)}function Du(e){var t=Iu(e.alternate,e,ct);e.memoizedProps=e.pendingProps,t===null?Ou(e):Le=t,Ei.current=null}function Ou(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Gd(n,t,ct),n!==null){Le=n;return}}else{if(n=Xd(n,t),n!==null){n.flags&=32767,Le=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Ae=6,Le=null;return}}if(t=t.sibling,t!==null){Le=t;return}Le=t=e}while(t!==null);Ae===0&&(Ae=5)}function jn(e,t,n){var r=fe,s=ht.transition;try{ht.transition=null,fe=1,sp(e,t,n,r)}finally{ht.transition=s,fe=r}return null}function sp(e,t,n,r){do Kn();while(ln!==null);if((ue&6)!==0)throw Error(d(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(d(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Fc(e,i),e===Oe&&(Le=Oe=null,Ue=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ml||(Ml=!0,Uu(Ur,function(){return Kn(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=ht.transition,ht.transition=null;var a=fe;fe=1;var u=ue;ue|=4,Ei.current=null,Jd(e,n),Eu(n,e),bd(Ds),Kr=!!Rs,Ds=Rs=null,e.current=n,ep(n),Tc(),ue=u,fe=a,ht.transition=i}else e.current=n;if(Ml&&(Ml=!1,ln=e,Al=s),i=e.pendingLanes,i===0&&(rn=null),Mc(n.stateNode),lt(e,_e()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ll)throw Ll=!1,e=Ti,Ti=null,e;return(Al&1)!==0&&e.tag!==0&&Kn(),i=e.pendingLanes,(i&1)!==0?e===Pi?Pr++:(Pr=0,Pi=e):Pr=0,Jt(),null}function Kn(){if(ln!==null){var e=Sa(Al),t=ht.transition,n=fe;try{if(ht.transition=null,fe=16>e?16:e,ln===null)var r=!1;else{if(e=ln,ln=null,Al=0,(ue&6)!==0)throw Error(d(331));var s=ue;for(ue|=4,q=e.current;q!==null;){var i=q,a=i.child;if((q.flags&16)!==0){var u=i.deletions;if(u!==null){for(var c=0;c<u.length;c++){var y=u[c];for(q=y;q!==null;){var C=q;switch(C.tag){case 0:case 11:case 15:zr(8,C,i)}var E=C.child;if(E!==null)E.return=C,q=E;else for(;q!==null;){C=q;var b=C.sibling,B=C.return;if(ku(C),C===y){q=null;break}if(b!==null){b.return=B,q=b;break}q=B}}}var H=i.alternate;if(H!==null){var W=H.child;if(W!==null){H.child=null;do{var Te=W.sibling;W.sibling=null,W=Te}while(W!==null)}}q=i}}if((i.subtreeFlags&2064)!==0&&a!==null)a.return=i,q=a;else e:for(;q!==null;){if(i=q,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:zr(9,i,i.return)}var m=i.sibling;if(m!==null){m.return=i.return,q=m;break e}q=i.return}}var p=e.current;for(q=p;q!==null;){a=q;var h=a.child;if((a.subtreeFlags&2064)!==0&&h!==null)h.return=a,q=h;else e:for(a=p;q!==null;){if(u=q,(u.flags&2048)!==0)try{switch(u.tag){case 0:case 11:case 15:_l(9,u)}}catch(Q){ze(u,u.return,Q)}if(u===a){q=null;break e}var _=u.sibling;if(_!==null){_.return=u.return,q=_;break e}q=u.return}}if(ue=s,Jt(),Ct&&typeof Ct.onPostCommitFiberRoot=="function")try{Ct.onPostCommitFiberRoot(Vr,e)}catch{}r=!0}return r}finally{fe=n,ht.transition=t}}return!1}function $u(e,t,n){t=qn(n,t),t=nu(e,t,1),e=tn(e,t,1),t=Ze(),e!==null&&(tr(e,1,t),lt(e,t))}function ze(e,t,n){if(e.tag===3)$u(e,e,n);else for(;t!==null;){if(t.tag===3){$u(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(rn===null||!rn.has(r))){e=qn(n,e),e=ru(t,e,1),t=tn(t,e,1),e=Ze(),t!==null&&(tr(t,1,e),lt(t,e));break}}t=t.return}}function ip(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ze(),e.pingedLanes|=e.suspendedLanes&n,Oe===e&&(Ue&n)===n&&(Ae===4||Ae===3&&(Ue&130023424)===Ue&&500>_e()-_i?wn(e,0):zi|=n),lt(e,t)}function Fu(e,t){t===0&&((e.mode&1)===0?t=1:(t=qr,qr<<=1,(qr&130023424)===0&&(qr=4194304)));var n=Ze();e=$t(e,t),e!==null&&(tr(e,t,n),lt(e,n))}function ap(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Fu(e,n)}function op(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(d(314))}r!==null&&r.delete(t),Fu(e,n)}var Iu;Iu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||et.current)nt=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return nt=!1,Yd(e,t,n);nt=(e.flags&131072)!==0}else nt=!1,Ne&&(t.flags&1048576)!==0&&yo(t,pl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;El(e,t),e=t.pendingProps;var s=Dn(t,He.current);Vn(t,n),s=ii(null,t,r,e,s,n);var i=ai();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,tt(r)?(i=!0,ul(t)):i=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Js(t),s.updater=bl,t.stateNode=s,s._reactInternals=t,fi(t,r,e,n),t=xi(null,t,r,!0,i,n)):(t.tag=0,Ne&&i&&Bs(t),Xe(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(El(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=cp(r),e=wt(r,e),s){case 0:t=gi(null,t,r,e,n);break e;case 1:t=pu(null,t,r,e,n);break e;case 11:t=au(null,t,r,e,n);break e;case 14:t=ou(null,t,r,wt(r.type,e),n);break e}throw Error(d(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:wt(r,s),gi(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:wt(r,s),pu(e,t,r,s,n);case 3:e:{if(fu(t),e===null)throw Error(d(387));r=t.pendingProps,i=t.memoizedState,s=i.element,zo(e,t),vl(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){s=qn(Error(d(423)),t),t=mu(e,t,r,n,s);break e}else if(r!==s){s=qn(Error(d(424)),t),t=mu(e,t,r,n,s);break e}else for(ut=Gt(t.stateNode.containerInfo.firstChild),ot=t,Ne=!0,yt=null,n=Co(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Fn(),r===s){t=It(e,t,n);break e}Xe(e,t,r,n)}t=t.child}return t;case 5:return Po(t),e===null&&Ws(t),r=t.type,s=t.pendingProps,i=e!==null?e.memoizedProps:null,a=s.children,Os(r,s)?a=null:i!==null&&Os(r,i)&&(t.flags|=32),du(e,t),Xe(e,t,a,n),t.child;case 6:return e===null&&Ws(t),null;case 13:return hu(e,t,n);case 4:return ei(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=In(t,null,r,n):Xe(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:wt(r,s),au(e,t,r,s,n);case 7:return Xe(e,t,t.pendingProps,n),t.child;case 8:return Xe(e,t,t.pendingProps.children,n),t.child;case 12:return Xe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,i=t.memoizedProps,a=s.value,ve(hl,r._currentValue),r._currentValue=a,i!==null)if(vt(i.value,a)){if(i.children===s.children&&!et.current){t=It(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var u=i.dependencies;if(u!==null){a=i.child;for(var c=u.firstContext;c!==null;){if(c.context===r){if(i.tag===1){c=Ft(-1,n&-n),c.tag=2;var y=i.updateQueue;if(y!==null){y=y.shared;var C=y.pending;C===null?c.next=c:(c.next=C.next,C.next=c),y.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Xs(i.return,n,t),u.lanes|=n;break}c=c.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(d(341));a.lanes|=n,u=a.alternate,u!==null&&(u.lanes|=n),Xs(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}Xe(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,Vn(t,n),s=ft(s),r=r(s),t.flags|=1,Xe(e,t,r,n),t.child;case 14:return r=t.type,s=wt(r,t.pendingProps),s=wt(r.type,s),ou(e,t,r,s,n);case 15:return uu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:wt(r,s),El(e,t),t.tag=1,tt(r)?(e=!0,ul(t)):e=!1,Vn(t,n),eu(t,r,s),fi(t,r,s,n),xi(null,t,r,!0,e,n);case 19:return xu(e,t,n);case 22:return cu(e,t,n)}throw Error(d(156,t.tag))};function Uu(e,t){return ya(e,t)}function up(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function gt(e,t,n,r){return new up(e,t,n,r)}function Oi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function cp(e){if(typeof e=="function")return Oi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ye)return 11;if(e===te)return 14}return 2}function on(e,t){var n=e.alternate;return n===null?(n=gt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function $l(e,t,n,r,s,i){var a=2;if(r=e,typeof e=="function")Oi(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Ee:return kn(n.children,s,i,t);case ge:a=8,s|=8;break;case Ve:return e=gt(12,n,t,s|2),e.elementType=Ve,e.lanes=i,e;case Pe:return e=gt(13,n,t,s),e.elementType=Pe,e.lanes=i,e;case qe:return e=gt(19,n,t,s),e.elementType=qe,e.lanes=i,e;case ye:return Fl(n,s,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Be:a=10;break e;case it:a=9;break e;case Ye:a=11;break e;case te:a=14;break e;case ke:a=16,r=null;break e}throw Error(d(130,e==null?e:typeof e,""))}return t=gt(a,n,t,s),t.elementType=e,t.type=r,t.lanes=i,t}function kn(e,t,n,r){return e=gt(7,e,r,t),e.lanes=n,e}function Fl(e,t,n,r){return e=gt(22,e,r,t),e.elementType=ye,e.lanes=n,e.stateNode={isHidden:!1},e}function $i(e,t,n){return e=gt(6,e,null,t),e.lanes=n,e}function Fi(e,t,n){return t=gt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function dp(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ps(0),this.expirationTimes=ps(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ps(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Ii(e,t,n,r,s,i,a,u,c){return e=new dp(e,t,n,u,c),t===1?(t=1,i===!0&&(t|=8)):t=0,i=gt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Js(i),e}function pp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:he,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Vu(e){if(!e)return Zt;e=e._reactInternals;e:{if(cn(e)!==e||e.tag!==1)throw Error(d(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(tt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(d(171))}if(e.tag===1){var n=e.type;if(tt(n))return go(e,n,t)}return t}function Bu(e,t,n,r,s,i,a,u,c){return e=Ii(n,r,!0,e,s,i,a,u,c),e.context=Vu(null),n=e.current,r=Ze(),s=sn(n),i=Ft(r,s),i.callback=t??null,tn(n,i,s),e.current.lanes=s,tr(e,s,r),lt(e,r),e}function Il(e,t,n,r){var s=t.current,i=Ze(),a=sn(s);return n=Vu(n),t.context===null?t.context=n:t.pendingContext=n,t=Ft(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=tn(s,t,a),e!==null&&(Nt(e,s,a,i),xl(e,s,a)),a}function Ul(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function qu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ui(e,t){qu(e,t),(e=e.alternate)&&qu(e,t)}function fp(){return null}var Hu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Vi(e){this._internalRoot=e}Vl.prototype.render=Vi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(d(409));Il(e,t,null,null)},Vl.prototype.unmount=Vi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;yn(function(){Il(null,e,null,null)}),t[At]=null}};function Vl(e){this._internalRoot=e}Vl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ea();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Qt.length&&t!==0&&t<Qt[n].priority;n++);Qt.splice(n,0,e),n===0&&Ta(e)}};function Bi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Bl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Wu(){}function mp(e,t,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var y=Ul(a);i.call(y)}}var a=Bu(t,r,e,0,null,!1,!1,"",Wu);return e._reactRootContainer=a,e[At]=a.current,hr(e.nodeType===8?e.parentNode:e),yn(),a}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var u=r;r=function(){var y=Ul(c);u.call(y)}}var c=Ii(e,0,!1,null,null,!1,!1,"",Wu);return e._reactRootContainer=c,e[At]=c.current,hr(e.nodeType===8?e.parentNode:e),yn(function(){Il(t,c,n,r)}),c}function ql(e,t,n,r,s){var i=n._reactRootContainer;if(i){var a=i;if(typeof s=="function"){var u=s;s=function(){var c=Ul(a);u.call(c)}}Il(t,a,e,s)}else a=mp(n,t,e,s,r);return Ul(a)}ba=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=er(t.pendingLanes);n!==0&&(fs(t,n|1),lt(t,_e()),(ue&6)===0&&(Qn=_e()+500,Jt()))}break;case 13:yn(function(){var r=$t(e,1);if(r!==null){var s=Ze();Nt(r,e,1,s)}}),Ui(e,1)}},ms=function(e){if(e.tag===13){var t=$t(e,134217728);if(t!==null){var n=Ze();Nt(t,e,134217728,n)}Ui(e,134217728)}},Ca=function(e){if(e.tag===13){var t=sn(e),n=$t(e,t);if(n!==null){var r=Ze();Nt(n,e,t,r)}Ui(e,t)}},Ea=function(){return fe},za=function(e,t){var n=fe;try{return fe=e,t()}finally{fe=n}},is=function(e,t,n){switch(t){case"input":if(Pt(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=al(r);if(!s)throw Error(d(90));X(r),Pt(r,s)}}}break;case"textarea":ra(e,n);break;case"select":t=n.value,t!=null&&Mt(e,!!n.multiple,t,!1)}},pa=Ai,fa=yn;var hp={usingClientEntryPoint:!1,Events:[vr,An,al,ca,da,Ai]},Lr={findFiberByHostInstance:dn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},gp={bundleType:Lr.bundleType,version:Lr.version,rendererPackageName:Lr.rendererPackageName,rendererConfig:Lr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:T.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xa(e),e===null?null:e.stateNode},findFiberByHostInstance:Lr.findFiberByHostInstance||fp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Hl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hl.isDisabled&&Hl.supportsFiber)try{Vr=Hl.inject(gp),Ct=Hl}catch{}}return st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hp,st.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Bi(t))throw Error(d(200));return pp(e,t,null,n)},st.createRoot=function(e,t){if(!Bi(e))throw Error(d(299));var n=!1,r="",s=Hu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Ii(e,1,!1,null,null,n,!1,r,s),e[At]=t.current,hr(e.nodeType===8?e.parentNode:e),new Vi(t)},st.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(d(188)):(e=Object.keys(e).join(","),Error(d(268,e)));return e=xa(t),e=e===null?null:e.stateNode,e},st.flushSync=function(e){return yn(e)},st.hydrate=function(e,t,n){if(!Bl(t))throw Error(d(200));return ql(null,e,t,!0,n)},st.hydrateRoot=function(e,t,n){if(!Bi(e))throw Error(d(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",a=Hu;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Bu(t,null,e,1,n??null,s,!1,i,a),e[At]=t.current,hr(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Vl(t)},st.render=function(e,t,n){if(!Bl(t))throw Error(d(200));return ql(null,e,t,!1,n)},st.unmountComponentAtNode=function(e){if(!Bl(e))throw Error(d(40));return e._reactRootContainer?(yn(function(){ql(null,null,e,!1,function(){e._reactRootContainer=null,e[At]=null})}),!0):!1},st.unstable_batchedUpdates=Ai,st.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Bl(n))throw Error(d(200));if(e==null||e._reactInternals===void 0)throw Error(d(38));return ql(e,t,n,!1,r)},st.version="18.3.1-next-f1338f8080-20240426",st}var ec;function bp(){if(ec)return Wi.exports;ec=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(w){console.error(w)}}return o(),Wi.exports=Sp(),Wi.exports}var tc;function Cp(){if(tc)return Wl;tc=1;var o=bp();return Wl.createRoot=o.createRoot,Wl.hydrateRoot=o.hydrateRoot,Wl}var Ep=Cp();const zp=dc(Ep);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _p=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),pc=(...o)=>o.filter((w,d,P)=>!!w&&w.trim()!==""&&P.indexOf(w)===d).join(" ").trim();/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Tp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pp=O.forwardRef(({color:o="currentColor",size:w=24,strokeWidth:d=2,absoluteStrokeWidth:P,className:k="",children:x,iconNode:g,...L},$)=>O.createElement("svg",{ref:$,...Tp,width:w,height:w,stroke:o,strokeWidth:P?Number(d)*24/Number(w):d,className:pc("lucide",k),...L},[...g.map(([R,M])=>O.createElement(R,M)),...Array.isArray(x)?x:[x]]));/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=(o,w)=>{const d=O.forwardRef(({className:P,...k},x)=>O.createElement(Pp,{ref:x,iconNode:w,className:pc(`lucide-${_p(o)}`,P),...k}));return d.displayName=`${o}`,d};/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lp=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ar=me("ArrowRight",Lp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mp=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],nc=me("ArrowUpRight",Mp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ap=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]],na=me("CalendarCheck",Ap);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rp=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],rc=me("Calendar",Rp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Rr=me("Check",Dp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Op=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],$p=me("ChevronDown",Op);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Ip=me("ChevronRight",Fp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Vp=me("CircleCheckBig",Up);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Yl=me("CircleCheck",Bp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qp=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],fc=me("Clock",qp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Xi=me("Database",Hp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],Qp=me("ExternalLink",Wp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],Yp=me("KeyRound",Kp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Gl=me("Layers",Gp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Zp=me("LayoutDashboard",Xp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],mc=me("LogOut",Jp);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ef=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],tf=me("MapPin",ef);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nf=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Dr=me("Plus",nf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rf=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],hc=me("RefreshCw",rf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lf=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],sf=me("Save",lf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const af=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],of=me("Search",af);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uf=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],cf=me("Settings",uf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],Jl=me("Sparkles",df);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],lc=me("Star",pf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],gc=me("Trash2",ff);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],hf=me("TriangleAlert",mf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],xc=me("UserPlus",gf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],es=me("Users",xf);/**
 * @license lucide-react v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Or=me("X",vf),yf="/api",Zi="etb_token",Ji="etb_event";function vc(){try{return localStorage.getItem(Zi)}catch{return null}}function yc(o){try{o?localStorage.setItem(Zi,o):localStorage.removeItem(Zi)}catch{}}function Xl(){yc(null)}let Zl=(()=>{try{return localStorage.getItem(Ji)}catch{return null}})();function Yi(o){Zl=o||null;try{o?localStorage.setItem(Ji,o):localStorage.removeItem(Ji)}catch{}}function Gi(){return Zl}function Re(o={}){const w={...o};Zl&&w.eventId===void 0&&(w.eventId=Zl);const d=new URLSearchParams;for(const[k,x]of Object.entries(w))x==null||x===""||d.set(k,x);const P=d.toString();return P?`?${P}`:""}function wc(){try{window.dispatchEvent(new CustomEvent("etb:unauthorized"))}catch{}}function jc(){Xl(),wc()}async function ce(o,w={}){const d=`${yf}${o}`,P=vc(),k={...w,headers:{"Content-Type":"application/json",...P?{Authorization:`Bearer ${P}`}:{},...w.headers}};k.body&&typeof k.body!="string"&&(k.body=JSON.stringify(k.body));try{const x=await fetch(d,k),g=await x.text(),L=g?JSON.parse(g):{};if(x.status===401&&(Xl(),wc()),!x.ok)throw new Error(L.error||L.message||`Request failed with status ${x.status}`);return L}catch(x){throw x instanceof SyntaxError?new Error("Server returned an unexpected response"):(console.error(`API Error on ${o}:`,x),x)}}const se={login:o=>ce("/auth/login",{method:"POST",body:o}),register:o=>ce("/auth/register",{method:"POST",body:o}),getProfile:()=>ce("/auth/me"),getHealth:()=>ce("/health"),getEvents:()=>ce("/events"),getEvent:o=>ce(`/events/${o}`),getActiveEvent:()=>ce(`/events/active${Re()}`),createEvent:o=>ce("/events",{method:"POST",body:o}),updateEvent:(o,w)=>ce(`/events/${o}`,{method:"PUT",body:w}),deleteEvent:o=>ce(`/events/${o}`,{method:"DELETE"}),activateEvent:o=>ce(`/events/${o}/activate`,{method:"POST"}),getSkills:()=>ce("/skills"),createSkill:o=>ce("/skills",{method:"POST",body:o}),getTeams:()=>ce(`/teams${Re()}`),getTeam:o=>ce(`/teams/${o}${Re()}`),createTeam:o=>ce(`/teams${Re()}`,{method:"POST",body:o}),updateTeam:(o,w)=>ce(`/teams/${o}${Re()}`,{method:"PUT",body:w}),deleteTeam:o=>ce(`/teams/${o}${Re()}`,{method:"DELETE"}),getVolunteers:(o={})=>ce(`/volunteers${Re(o)}`),getVolunteer:o=>ce(`/volunteers/${o}${Re()}`),createVolunteer:o=>ce(`/volunteers${Re()}`,{method:"POST",body:o}),updateVolunteer:(o,w)=>ce(`/volunteers/${o}${Re()}`,{method:"PUT",body:w}),deleteVolunteer:o=>ce(`/volunteers/${o}${Re()}`,{method:"DELETE"}),getMatches:()=>ce(`/volunteers/matches${Re()}`),getTasks:()=>ce(`/tasks${Re()}`),getTaskMetrics:()=>ce(`/tasks/metrics${Re()}`),getTask:o=>ce(`/tasks/${o}${Re()}`),createTask:o=>ce(`/tasks${Re()}`,{method:"POST",body:o}),updateTask:(o,w)=>ce(`/tasks/${o}${Re()}`,{method:"PUT",body:w}),deleteTask:o=>ce(`/tasks/${o}${Re()}`,{method:"DELETE"}),getSystemStatus:()=>ce(`/system/status${Re()}`),connectMongoDB:o=>ce("/system/connect-mongodb",{method:"POST",body:{uri:o}}),seedDatabase:()=>ce("/system/seed",{method:"POST"})};function ea({status:o,onRefresh:w,canManage:d=!1}){const[P,k]=O.useState(!1),[x,g]=O.useState(""),[L,$]=O.useState(!1),[R,M]=O.useState(null),[N,I]=O.useState(null),F=o==null?void 0:o.connected,J=()=>{d&&(I(null),M(null),k(!0))},v=async D=>{if(D.preventDefault(),!!x){$(!0),M(null),I(null);try{const j=await se.connectMongoDB(x);if(j.sessionInvalidated){I(j.sessionMessage||"Connected, but you must sign in again."),jc();return}M(j.message),w&&w(),setTimeout(()=>{k(!1)},1500)}catch(j){I(j.message||"Failed to connect to MongoDB")}finally{$(!1)}}};return l.jsxs(l.Fragment,{children:[l.jsx("div",{onClick:J,className:"mongo-status-pill",style:d?void 0:{cursor:"default"},title:d?"Click to manage MongoDB connection":"Sign in as a Coordinator to change the database connection",children:l.jsxs("span",{className:`status-indicator ${F?"status-connected":"status-fallback"}`,children:[l.jsx(Xi,{size:13}),l.jsx("span",{children:F?"MongoDB Connected":d?"Local Fallback (Click to connect DB)":"Local Fallback (Sign in as Coordinator to connect)"}),l.jsx("span",{className:"dot"})]})}),P&&l.jsx("div",{className:"modal-backdrop",onClick:()=>k(!1),children:l.jsxs("div",{className:"modal-content",onClick:D=>D.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("div",{className:`icon-circle ${F?"icon-success":"icon-warning"}`,children:l.jsx(Xi,{size:20})}),l.jsxs("div",{children:[l.jsx("h3",{style:{fontSize:18,color:"#f3f4f6"},children:"MongoDB Connection"}),l.jsx("p",{style:{fontSize:13,color:"#9ca3af"},children:F?"Active database connection verified":"Running in resilient local storage"})]})]}),l.jsx("button",{onClick:()=>k(!1),className:"close-btn",children:l.jsx(Or,{size:18})})]}),l.jsxs("div",{className:"modal-body",style:{padding:"20px 24px"},children:[l.jsxs("div",{className:"status-banner",style:{background:F?"rgba(34, 197, 94, 0.1)":"rgba(245, 158, 11, 0.1)",border:`1px solid ${F?"rgba(34, 197, 94, 0.3)":"rgba(245, 158, 11, 0.3)"}`,borderRadius:12,padding:"14px 16px",marginBottom:20},children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:4},children:[F?l.jsx(Vp,{size:16,color:"#4ade80"}):l.jsx(hf,{size:16,color:"#fbbf24"}),l.jsx("strong",{style:{fontSize:14,color:F?"#4ade80":"#fbbf24"},children:F?"Connected to MongoDB":"No MongoDB connection active"})]}),l.jsx("p",{style:{fontSize:12,color:"#9ca3af",lineHeight:1.4},children:F?o!=null&&o.counts?`Live collections: ${o.counts.volunteers||0} volunteers, ${o.counts.teams||0} teams, ${o.counts.tasks||0} tasks.`:"Active database connection verified. Sign in to view collection totals.":"The app is fully functioning with local seed storage. To persist in your own MongoDB Atlas cluster or local database, provide the connection URI below."}),(o==null?void 0:o.uri)&&l.jsxs("div",{style:{fontSize:11,fontFamily:"monospace",color:"#6b7280",marginTop:6,wordBreak:"break-all"},children:["URI: ",o.uri]})]}),l.jsxs("form",{onSubmit:v,children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"MongoDB Connection String"}),l.jsx("input",{type:"text",value:x,onChange:D=>g(D.target.value),placeholder:"mongodb+srv://user:password@cluster.mongodb.net/event-team-builder",className:"form-input",style:{fontSize:13,fontFamily:"monospace"}}),l.jsx("span",{style:{fontSize:11,color:"#6b7280"},children:"Supports MongoDB Atlas Cloud (`mongodb+srv://...`) or Local (`mongodb://localhost:27017/...`)"})]}),R&&l.jsxs("div",{style:{padding:"10px 14px",background:"rgba(34, 197, 94, 0.15)",color:"#4ade80",borderRadius:8,fontSize:13,marginBottom:16},children:["✓ ",R]}),N&&l.jsxs("div",{style:{padding:"10px 14px",background:"rgba(239, 68, 68, 0.15)",color:"#f87171",borderRadius:8,fontSize:13,marginBottom:16},children:["✕ ",N]}),l.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end",marginTop:16},children:[l.jsx("button",{type:"button",onClick:()=>{g("mongodb://localhost:27017/event-team-builder")},className:"btn btn-outline btn-sm",children:"Use Localhost"}),l.jsx("button",{type:"submit",disabled:L||!x,className:"btn btn-primary",style:{minWidth:140},children:L?l.jsxs(l.Fragment,{children:[l.jsx(hc,{size:14,className:"spin"}),"Connecting..."]}):"Connect & Sync"})]})]})]})]})}),l.jsx("style",{children:`
        .mongo-status-pill {
          cursor: pointer;
          user-select: none;
          display: inline-flex;
        }
        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
        }
        .status-connected {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.35);
          color: #4ade80;
        }
        .status-connected:hover {
          background: rgba(34, 197, 94, 0.22);
          border-color: #4ade80;
        }
        .status-fallback {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fbbf24;
        }
        .status-fallback:hover {
          background: rgba(245, 158, 11, 0.22);
          border-color: #fbbf24;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 6px currentColor;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-success {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .icon-warning {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .close-btn {
          color: #9ca3af;
          padding: 6px;
          border-radius: 6px;
          transition: color 0.15s;
        }
        .close-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `})]})}function wf({onNavigate:o,currentPath:w,dbStatus:d,onRefreshDb:P,canManageDb:k}){return l.jsxs("header",{className:"home-nav",children:[l.jsxs("div",{className:"nav-container",children:[l.jsxs("div",{className:"brand",onClick:()=>o("/"),style:{cursor:"pointer"},children:[l.jsx("div",{className:"brand-mark",children:l.jsx("span",{children:"E"})}),l.jsx("span",{className:"brand-name",children:"EVENT TEAM BUILDER"})]}),l.jsxs("div",{className:"nav-actions",children:[l.jsx(ea,{status:d,onRefresh:P,canManage:k}),l.jsx("button",{onClick:()=>o("/account"),className:"nav-link",children:"Coordinator Log In"}),l.jsxs("button",{onClick:()=>o("/dashboard"),className:"btn btn-primary btn-sm",children:[l.jsx("span",{children:"Launch workspace"}),l.jsx(Ar,{size:14})]})]})]}),l.jsx("style",{children:`
        .home-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(18, 20, 18, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 68px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-mark {
          width: 32px;
          height: 32px;
          background: #1a1e1a;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.15);
        }
        .brand-mark span {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 16px;
          color: var(--accent-primary);
        }
        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--text-main);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color 0.15s ease;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
      `})]})}function sc({onNavigate:o,dbStatus:w,onRefreshDb:d,eventInfo:P,canManageDb:k}){return l.jsxs("div",{className:"home-page",children:[l.jsx(wf,{onNavigate:o,currentPath:"/",dbStatus:w,onRefreshDb:d,canManageDb:k}),l.jsx("div",{className:"hero-glow"}),l.jsx("section",{className:"hero-section",children:l.jsxs("div",{className:"hero-container",children:[l.jsxs("div",{className:"hero-copy",children:[l.jsxs("div",{className:"eyebrow-badge",children:[l.jsx(Jl,{size:12,color:"#4ade80"}),l.jsx("span",{children:(P==null?void 0:P.kicker)||"BUILT FOR CAMPUS CREWS"})]}),l.jsx("h1",{className:"hero-headline",children:"Make every campus event run like a great team."}),l.jsx("p",{className:"hero-description",children:"Bring volunteers, roles, tasks, and progress into one shared workspace — so every student knows where to show up and how to contribute."}),l.jsxs("div",{className:"hero-actions",children:[l.jsxs("button",{onClick:()=>o("/dashboard"),className:"btn btn-primary btn-lg",children:[l.jsx("span",{children:"Start organizing"}),l.jsx(Ar,{size:16})]}),l.jsx("button",{onClick:()=>{const x=document.getElementById("coordination-flow");x==null||x.scrollIntoView({behavior:"smooth"})},className:"btn btn-secondary btn-lg",children:"Explore the flow"})]}),l.jsx("p",{className:"hero-note",children:"From first sign-up to final check-out, stay aligned without the spreadsheet scramble."})]}),l.jsx("div",{className:"hero-preview",children:l.jsxs("div",{className:"preview-card",children:[l.jsxs("div",{className:"preview-topbar",children:[l.jsxs("div",{className:"preview-title-box",children:[l.jsx("span",{className:"preview-kicker",children:"SAMPLE PREVIEW"}),l.jsx("span",{className:"preview-event-name",children:(P==null?void 0:P.name)||"Aurelia Cultural Fest ’26"})]}),l.jsxs("div",{className:"badge badge-neutral",children:[l.jsx("span",{className:"status-dot"}),l.jsx("span",{children:"DEMO"})]})]}),l.jsxs("div",{className:"preview-metrics",children:[l.jsxs("div",{className:"preview-metric",children:[l.jsx("span",{className:"metric-number",children:"45"}),l.jsx("span",{className:"metric-label",children:"volunteer target"})]}),l.jsxs("div",{className:"preview-metric",children:[l.jsx("span",{className:"metric-number",children:"6"}),l.jsx("span",{className:"metric-label",children:"crew squads"})]})]}),l.jsxs("div",{className:"preview-roster",children:[l.jsxs("div",{className:"roster-header",children:[l.jsx("span",{className:"roster-title",children:"Today’s crew"}),l.jsx("span",{className:"roster-time",children:"09:30 briefing"})]}),l.jsxs("div",{className:"roster-volunteer",children:[l.jsxs("div",{className:"volunteer-profile",children:[l.jsx("div",{className:"volunteer-avatar",style:{background:"rgba(34, 197, 94, 0.2)",color:"#4ade80"},children:"A"}),l.jsxs("div",{className:"volunteer-details",children:[l.jsx("span",{className:"volunteer-name",children:"Aarav Menon"}),l.jsx("span",{className:"volunteer-role",children:"Stage operations"})]})]}),l.jsx("span",{className:"badge badge-live",style:{fontSize:10},children:"Assigned"})]}),l.jsxs("div",{className:"roster-volunteer",children:[l.jsxs("div",{className:"volunteer-profile",children:[l.jsx("div",{className:"volunteer-avatar",style:{background:"rgba(168, 85, 247, 0.2)",color:"#c084fc"},children:"A"}),l.jsxs("div",{className:"volunteer-details",children:[l.jsx("span",{className:"volunteer-name",children:"Ananya Shah"}),l.jsx("span",{className:"volunteer-role",children:"Media team (Recommended)"})]})]}),l.jsx("span",{className:"badge badge-warning",style:{fontSize:10},children:"Ready"})]})]}),l.jsxs("button",{onClick:()=>o("/dashboard"),className:"preview-cta",children:[l.jsx("span",{children:"Open Live Workspace"}),l.jsx(Ar,{size:14})]})]})})]})}),l.jsx("section",{className:"integrations-section",children:l.jsxs("div",{className:"integrations-container",children:[l.jsx("span",{className:"integrations-label",children:"WORKS ALONGSIDE"}),l.jsxs("div",{className:"integrations-list",children:[l.jsx("span",{className:"integration-item",children:"Campus Discord"}),l.jsx("span",{className:"dot-sep",children:"•"}),l.jsx("span",{className:"integration-item",children:"Google Sheets"}),l.jsx("span",{className:"dot-sep",children:"•"}),l.jsx("span",{className:"integration-item",children:"WhatsApp Broadcast"}),l.jsx("span",{className:"dot-sep",children:"•"}),l.jsx("span",{className:"integration-item",children:"Student Portal SSO"})]})]})}),l.jsx("section",{id:"coordination-flow",className:"flow-section",children:l.jsxs("div",{className:"flow-container",children:[l.jsxs("div",{className:"flow-header",children:[l.jsx("h2",{className:"flow-title",children:"Less chasing. More showing up."}),l.jsx("p",{className:"flow-subtitle",children:"One clear rhythm for every role."})]}),l.jsxs("div",{className:"flow-grid",children:[l.jsxs("div",{className:"flow-step-card",children:[l.jsx("div",{className:"step-badge",children:l.jsx("span",{className:"step-num",children:"01"})}),l.jsx("h3",{className:"step-title",children:"Recruit by fit"}),l.jsx("p",{className:"step-desc",children:"Let students surface their skills and interests before they join the team."}),l.jsx("div",{className:"step-indicator-bar"})]}),l.jsxs("div",{className:"flow-step-card",children:[l.jsxs("div",{className:"step-badge",children:[l.jsx("span",{className:"step-num",children:"02"}),l.jsx("span",{className:"step-sym",children:"↳"})]}),l.jsx("h3",{className:"step-title",children:"Assign with clarity"}),l.jsx("p",{className:"step-desc",children:"Give every volunteer a role, task, and moment to be exactly where they’re needed."}),l.jsx("div",{className:"step-indicator-bar",style:{background:"var(--color-guest)"}})]}),l.jsxs("div",{className:"flow-step-card",children:[l.jsxs("div",{className:"step-badge",children:[l.jsx("span",{className:"step-num",children:"03"}),l.jsx("span",{className:"step-sym",children:"+"})]}),l.jsx("h3",{className:"step-title",children:"Keep the record"}),l.jsx("p",{className:"step-desc",children:"Capture participation history so reliable volunteers get the recognition they earn."}),l.jsx("div",{className:"step-indicator-bar",style:{background:"var(--color-media)"}})]})]})]})}),l.jsx("section",{className:"invitation-section",children:l.jsx("div",{className:"invitation-container",children:l.jsxs("div",{className:"invitation-box",children:[l.jsx("span",{className:"invitation-kicker",children:"FOR STUDENT LEADERS WHO MOVE CULTURE"}),l.jsx("h2",{className:"invitation-title",children:"Your next great event starts with a better crew."}),l.jsx("button",{onClick:()=>o("/dashboard"),className:"btn btn-primary btn-lg",children:"Create your first event"})]})})}),l.jsx("footer",{className:"home-footer",children:l.jsxs("div",{className:"footer-container",children:[l.jsxs("div",{className:"footer-left",children:[l.jsx("span",{className:"brand-name",children:"EVENT TEAM BUILDER"}),l.jsx("span",{className:"footer-desc",children:"Full-stack campus event operations with Node.js, React, Express & MongoDB"})]}),l.jsx("div",{className:"footer-right",children:l.jsx("span",{children:"© 2026 Event Team Builder. All rights reserved."})})]})}),l.jsx("style",{children:`
        .home-page {
          min-height: 100vh;
          position: relative;
          background: #121412;
        }
        .hero-section {
          padding: 80px 24px 60px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: var(--radius-pill);
          margin-bottom: 20px;
        }
        .hero-headline {
          font-size: 48px;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }
        @media (max-width: 600px) {
          .hero-headline {
            font-size: 34px;
          }
        }
        .hero-description {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 520px;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .hero-note {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .preview-card {
          background: #161a16;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
        }
        .preview-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 20px;
        }
        .preview-title-box {
          display: flex;
          flex-direction: column;
        }
        .preview-kicker {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .preview-event-name {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-main);
        }
        .preview-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .preview-metric {
          background: #1a1f1a;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
        }
        .metric-number {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 800;
          color: var(--text-main);
        }
        .metric-label {
          font-size: 12px;
          color: var(--text-muted);
        }
        .preview-roster {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .roster-header {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .roster-volunteer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #1c211c;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .volunteer-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .volunteer-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .volunteer-details {
          display: flex;
          flex-direction: column;
        }
        .volunteer-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }
        .volunteer-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .preview-cta {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-md);
          color: #4ade80;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .preview-cta:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: #4ade80;
        }
        .integrations-section {
          padding: 30px 24px;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(22, 26, 22, 0.5);
        }
        .integrations-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .integrations-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        .integrations-list {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          color: var(--text-secondary);
        }
        .dot-sep {
          color: #3b443b;
        }
        .flow-section {
          padding: 90px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .flow-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .flow-title {
          font-size: 38px;
          margin-bottom: 8px;
        }
        .flow-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
        }
        .flow-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 800px) {
          .flow-grid {
            grid-template-columns: 1fr;
          }
        }
        .flow-step-card {
          background: #161a16;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .step-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .step-num {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 800;
          color: var(--accent-primary);
        }
        .step-sym {
          font-size: 18px;
          color: var(--text-muted);
        }
        .step-title {
          font-size: 20px;
          margin-bottom: 12px;
        }
        .step-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
          flex: 1;
        }
        .step-indicator-bar {
          height: 3px;
          width: 40px;
          background: var(--accent-primary);
          border-radius: 2px;
        }
        .invitation-section {
          padding: 40px 24px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .invitation-box {
          background: linear-gradient(135deg, #182018 0%, #151a15 100%);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-xl);
          padding: 56px 40px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }
        .invitation-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-primary);
          margin-bottom: 12px;
          display: block;
        }
        .invitation-title {
          font-size: 36px;
          margin-bottom: 28px;
        }
        .home-footer {
          border-top: 1px solid var(--border-subtle);
          padding: 40px 24px;
          background: #101210;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .footer-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .footer-right {
          font-size: 12px;
          color: var(--text-muted);
        }
      `})]})}const Ql="coordinator@campus.edu",Kl="password123";function jf({onNavigate:o,onLoginSuccess:w,onLogout:d,isAuthenticated:P,checkingSession:k}){const[x,g]=O.useState(!1),[L,$]=O.useState(Ql),[R,M]=O.useState(Kl),[N,I]=O.useState("Campus Coordinator"),[F,J]=O.useState(!1),[v,D]=O.useState(null),j=async A=>{A.preventDefault(),J(!0),D(null);try{let T;x?T=await se.register({name:N,email:L,password:R}):T=await se.login({email:L,password:R}),w(T.user,T.token),o("/dashboard")}catch(T){D(T.message||"Authentication failed")}finally{J(!1)}},z=async()=>{$(Ql),M(Kl),J(!0),D(null);try{const A=await se.login({email:Ql,password:Kl});w(A.user,A.token),o("/dashboard")}catch(A){D(A.message||'Demo account unavailable. Run "npm run seed" on the server to recreate it.')}finally{J(!1)}};return k?l.jsx("div",{className:"account-page",children:l.jsx("div",{className:"account-container",children:l.jsx("div",{className:"account-form-wrapper",style:{gridColumn:"1 / -1"},children:l.jsx("div",{className:"account-form-card",style:{textAlign:"center"},children:l.jsx("p",{className:"form-subtitle",children:"Restoring your session..."})})})})}):P?l.jsx("div",{className:"account-page",children:l.jsx("div",{className:"account-container",children:l.jsx("div",{className:"account-form-wrapper",style:{gridColumn:"1 / -1"},children:l.jsxs("div",{className:"account-form-card",children:[l.jsxs("div",{className:"form-heading",children:[l.jsx("h2",{className:"form-title",children:"You are signed in"}),l.jsx("p",{className:"form-subtitle",children:"Choose where you want to go, or sign out on this device."})]}),l.jsxs("button",{type:"button",onClick:()=>o("/dashboard"),className:"btn btn-primary submit-btn",children:[l.jsx("span",{children:"Go to Dashboard"}),l.jsx(Ar,{size:16})]}),l.jsx("div",{className:"quick-demo-box",children:l.jsxs("button",{type:"button",onClick:d,className:"btn btn-secondary quick-demo-btn",children:[l.jsx(mc,{size:15,color:"#f87171"}),l.jsx("span",{children:"Sign Out"})]})})]})})})}):l.jsxs("div",{className:"account-page",children:[l.jsxs("div",{className:"account-container",children:[l.jsxs("div",{className:"account-context",children:[l.jsxs("div",{className:"brand",onClick:()=>o("/"),style:{cursor:"pointer"},children:[l.jsx("div",{className:"brand-mark",children:l.jsx("span",{children:"E"})}),l.jsx("span",{className:"brand-name",children:"EVENT TEAM BUILDER"})]}),l.jsxs("div",{className:"context-copy",children:[l.jsxs("div",{className:"context-badge",children:[l.jsx(Jl,{size:12,color:"#4ade80"}),l.jsx("span",{children:"YOUR CAMPUS CREW, CONNECTED"})]}),l.jsx("h1",{className:"context-title",children:"Bring the whole event team back into sync."}),l.jsx("p",{className:"context-desc",children:"Sign in to pick up assignments, recruit your next crew, and keep every event moving in one shared place."}),l.jsxs("div",{className:"context-highlights",children:[l.jsxs("div",{className:"highlight-item",children:[l.jsx(Yl,{size:16,color:"#4ade80"}),l.jsx("span",{children:"Synchronized role assignment & shift scheduling"})]}),l.jsxs("div",{className:"highlight-item",children:[l.jsx(Yl,{size:16,color:"#4ade80"}),l.jsx("span",{children:"Automated skill-to-team matching engine"})]}),l.jsxs("div",{className:"highlight-item",children:[l.jsx(Yl,{size:16,color:"#4ade80"}),l.jsx("span",{children:"Live MongoDB cloud & local database sync"})]})]})]}),l.jsx("div",{className:"context-footer",children:l.jsx("span",{className:"footer-note",children:"Volunteer records and activity stay organized."})})]}),l.jsx("div",{className:"account-form-wrapper",children:l.jsxs("div",{className:"account-form-card",children:[l.jsxs("div",{className:"form-heading",children:[l.jsx("h2",{className:"form-title",children:x?"Create an account":"Welcome back"}),l.jsx("p",{className:"form-subtitle",children:x?"Join your campus event leadership team.":"Sign in to continue to your event workspace."})]}),l.jsxs("form",{onSubmit:j,className:"sign-in-form",children:[x&&l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Full Name"}),l.jsx("input",{type:"text",required:!0,value:N,onChange:A=>I(A.target.value),placeholder:"Alex Morgan",className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Campus email"}),l.jsx("input",{type:"email",required:!0,value:L,onChange:A=>$(A.target.value),placeholder:"coordinator@campus.edu",className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("div",{className:"password-row",children:[l.jsx("label",{className:"form-label",children:"Password"}),!x&&l.jsx("span",{className:"forgot-link",onClick:()=>alert(`No password reset flow is wired up yet.

Demo credentials: ${Ql} / ${Kl}`),children:"Forgot password?"})]}),l.jsx("input",{type:"password",required:!0,value:R,onChange:A=>M(A.target.value),placeholder:"••••••••",className:"form-input"})]}),v&&l.jsx("div",{className:"error-alert",children:l.jsx("span",{children:v})}),l.jsxs("button",{type:"submit",disabled:F,className:"btn btn-primary submit-btn",children:[l.jsx("span",{children:F?"Authenticating...":x?"Create Account":"Sign In"}),l.jsx(Ar,{size:16})]}),l.jsx("div",{className:"quick-demo-box",children:l.jsxs("button",{type:"button",onClick:z,disabled:F,className:"btn btn-secondary quick-demo-btn",children:[l.jsx(Yp,{size:15,color:"#4ade80"}),l.jsx("span",{children:F?"Signing in...":"1-Click Coordinator Demo"})]})}),l.jsxs("div",{className:"toggle-auth",children:[l.jsx("span",{className:"toggle-question",children:x?"Already have an account?":"New to Event Team Builder?"}),l.jsx("button",{type:"button",onClick:()=>g(!x),className:"toggle-link",children:x?"Sign in":"Create an account"})]})]})]})})]}),l.jsx("style",{children:`
        .account-page {
          min-height: 100vh;
          background: #121412;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .account-container {
          max-width: 1080px;
          width: 100%;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 850px) {
          .account-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .account-context {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-mark {
          width: 34px;
          height: 34px;
          background: #1a1e1a;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-mark span {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 17px;
          color: var(--accent-primary);
        }
        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--text-main);
        }
        .context-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: var(--radius-pill);
          margin-bottom: 16px;
        }
        .context-title {
          font-size: 40px;
          line-height: 1.18;
          margin-bottom: 16px;
        }
        .context-desc {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .context-highlights {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .context-footer {
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .footer-note {
          font-size: 13px;
          color: var(--text-muted);
        }
        .account-form-wrapper {
          display: flex;
          justify-content: center;
        }
        .account-form-card {
          background: #171b17;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 36px 32px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
        }
        .form-heading {
          margin-bottom: 24px;
        }
        .form-title {
          font-size: 24px;
          margin-bottom: 6px;
        }
        .form-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .password-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .forgot-link {
          font-size: 12px;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.15s;
        }
        .forgot-link:hover {
          color: var(--accent-primary);
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 8px;
        }
        .quick-demo-box {
          margin-top: 14px;
        }
        .quick-demo-btn {
          width: 100%;
          font-size: 13px;
          padding: 10px;
        }
        .error-alert {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          margin-bottom: 14px;
        }
        .toggle-auth {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 13px;
        }
        .toggle-question {
          color: var(--text-muted);
        }
        .toggle-link {
          color: var(--accent-primary);
          font-weight: 600;
          transition: color 0.15s;
        }
        .toggle-link:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }
      `})]})}function kf({eventInfo:o,volunteers:w=[],teams:d=[],tasks:P=[],metrics:k,onNavigate:x,onOpenAddVolunteer:g}){const L=w.filter(R=>R.status==="Ready"),$=w.filter(R=>R.status==="Assigned");return l.jsxs("div",{className:"dashboard-overview",children:[l.jsxs("div",{className:"overview-header",children:[l.jsxs("div",{children:[l.jsx("span",{className:"overview-kicker",children:(o==null?void 0:o.kicker)||"BUILT FOR CAMPUS CREWS"}),l.jsx("h1",{className:"overview-title",children:"Operations Dashboard"}),l.jsxs("p",{className:"overview-subtitle",children:["Live volunteer deployment, shift progression, and squad coverage for ",(o==null?void 0:o.name)||"Aurelia Cultural Fest ’26","."]})]}),l.jsxs("div",{className:"overview-header-actions",children:[l.jsxs("button",{onClick:g,className:"btn btn-primary",children:[l.jsx(Dr,{size:16}),l.jsx("span",{children:"Add Volunteer"})]}),l.jsxs("button",{onClick:()=>x("/dashboard/teams"),className:"btn btn-secondary",children:[l.jsx(Gl,{size:16}),l.jsx("span",{children:"Team Builder"})]})]})]}),l.jsxs("div",{className:"metrics-grid",children:[l.jsxs("div",{className:"card metric-card",onClick:()=>x("/dashboard/volunteers"),children:[l.jsxs("div",{className:"metric-header",children:[l.jsx("span",{className:"metric-label",children:"VOLUNTEER ROSTER"}),l.jsx(es,{size:18,color:"#4ade80"})]}),l.jsxs("div",{className:"metric-value",children:[w.length," Active"]}),l.jsxs("div",{className:"metric-subtext",children:[l.jsxs("span",{className:"subtext-pill subtext-success",children:[$.length," Assigned"]}),l.jsxs("span",{style:{color:"#9ca3af"},children:[L.length," Ready to match"]})]})]}),l.jsxs("div",{className:"card metric-card",onClick:()=>x("/dashboard/tasks"),children:[l.jsxs("div",{className:"metric-header",children:[l.jsx("span",{className:"metric-label",children:"TASKS & SHIFTS"}),l.jsx(na,{size:18,color:"#38bdf8"})]}),l.jsx("div",{className:"metric-value",children:(k==null?void 0:k.totalTasks)??P.length}),l.jsxs("div",{className:"metric-subtext",children:[l.jsx("span",{className:"subtext-pill subtext-warning",children:(k==null?void 0:k.highPrioritySubtext)||`${(k==null?void 0:k.highPriority)??0} High Priority`}),l.jsx("span",{children:"Active today"})]})]}),l.jsxs("div",{className:"card metric-card",onClick:()=>x("/dashboard/teams"),children:[l.jsxs("div",{className:"metric-header",children:[l.jsx("span",{className:"metric-label",children:"TEAM CAPACITY"}),l.jsx(Gl,{size:18,color:"#a855f7"})]}),l.jsx("div",{className:"metric-value",children:(k==null?void 0:k.staffCoverage)||"—"}),l.jsxs("div",{className:"metric-subtext",children:[l.jsx("span",{className:"subtext-pill subtext-info",children:(k==null?void 0:k.staffCoveragePercent)||"—"}),l.jsxs("span",{children:["Across ",d.length," teams"]})]})]}),l.jsxs("div",{className:"card metric-card",onClick:()=>x("/dashboard/settings"),children:[l.jsxs("div",{className:"metric-header",children:[l.jsx("span",{className:"metric-label",children:"COMPLETION RATE"}),l.jsx(Jl,{size:18,color:"#f59e0b"})]}),l.jsx("div",{className:"metric-value",children:k?`${k.completionRate}%`:"—"}),l.jsxs("div",{className:"metric-subtext",children:[l.jsx("span",{className:"subtext-pill subtext-success",children:(k==null?void 0:k.completionRateSubtext)||"Across all tasks"}),l.jsx("span",{children:"Target on schedule"})]})]})]}),l.jsxs("div",{className:"overview-split",children:[l.jsxs("div",{className:"card section-card",children:[l.jsxs("div",{className:"section-header",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"section-title",children:"Today’s Shifts & Schedule"}),l.jsx("p",{className:"section-desc",children:"Active morning, afternoon, and evening crew rotations."})]}),l.jsxs("button",{onClick:()=>x("/dashboard/tasks"),className:"btn btn-outline btn-sm",children:[l.jsx("span",{children:"View All"}),l.jsx(nc,{size:13})]})]}),l.jsx("div",{className:"shifts-list",children:P.slice(0,4).map(R=>l.jsxs("div",{className:"shift-row",children:[l.jsxs("div",{className:"shift-left",children:[l.jsx("div",{className:`priority-indicator priority-${(R.priority||"medium").toLowerCase()}`}),l.jsxs("div",{children:[l.jsx("span",{className:"shift-name",children:R.title}),l.jsxs("span",{className:"shift-time",children:[R.shiftTime," • ",R.location||"Main Amphitheater"]})]})]}),l.jsxs("div",{className:"shift-right",children:[l.jsxs("span",{className:"badge badge-neutral",children:[R.assignedCrewCount||0," / ",R.requiredCrew||4," crew"]}),l.jsx("span",{className:`badge ${R.status==="Completed"?"badge-live":R.status==="In Progress"?"badge-warning":"badge-neutral"}`,children:R.status})]})]},R._id))})]}),l.jsxs("div",{className:"card section-card",children:[l.jsxs("div",{className:"section-header",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"section-title",children:"Team Coverage"}),l.jsx("p",{className:"section-desc",children:"Squad staffing status across event functional zones."})]}),l.jsxs("button",{onClick:()=>x("/dashboard/teams"),className:"btn btn-outline btn-sm",children:[l.jsx("span",{children:"Manage Teams"}),l.jsx(nc,{size:13})]})]}),l.jsx("div",{className:"team-bars-list",children:d.map(R=>{const M=Math.min(100,Math.round((R.assignedCount||0)/(R.targetCapacity||8)*100));return l.jsxs("div",{className:"team-progress-card",children:[l.jsxs("div",{className:"team-progress-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[l.jsx("span",{className:"team-dot",style:{background:R.color||"#22c55e"}}),l.jsx("span",{className:"team-title",children:R.name})]}),l.jsxs("span",{className:"team-status-text",children:[R.assignedCount||0," / ",R.targetCapacity||8," assigned"]})]}),l.jsx("div",{className:"progress-bar-bg",children:l.jsx("div",{className:"progress-bar-fill",style:{width:`${M}%`,backgroundColor:R.color||"#22c55e"}})}),l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:11,color:"#6b7280",marginTop:4},children:[l.jsxs("span",{children:["Lead: ",R.leadName||"Unassigned"]}),l.jsxs("span",{children:[M,"% Filled"]})]})]},R._id)})})]})]}),l.jsx("style",{children:`
        .dashboard-overview {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .overview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .overview-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .overview-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .overview-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .overview-header-actions {
          display: flex;
          gap: 10px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        @media (max-width: 1024px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        .metric-card {
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 20px;
        }
        .metric-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }
        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .metric-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .metric-value {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .metric-subtext {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          flex-wrap: wrap;
        }
        .subtext-pill {
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 11px;
        }
        .subtext-success {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .subtext-warning {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .subtext-info {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }
        .overview-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .overview-split {
            grid-template-columns: 1fr;
          }
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: 17px;
          margin-bottom: 4px;
        }
        .section-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .shifts-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .shift-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .shift-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .priority-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .priority-high {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
        }
        .priority-medium {
          background: #f59e0b;
        }
        .priority-low {
          background: #3b82f6;
        }
        .shift-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
          display: block;
        }
        .shift-time {
          font-size: 11px;
          color: var(--text-muted);
        }
        .shift-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .team-bars-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .team-progress-card {
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .team-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .team-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .team-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .team-status-text {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: #272e27;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.4s ease;
        }
      `})]})}function Nf({volunteers:o=[],teams:w=[],onRefresh:d,onOpenAddVolunteer:P,onShowToast:k}){const[x,g]=O.useState("All"),[L,$]=O.useState(""),[R,M]=O.useState(null),N=o.filter(v=>{var A,T;const D=x==="All"||v.status.toLowerCase()===x.toLowerCase(),j=L.toLowerCase(),z=!L||v.name.toLowerCase().includes(j)||v.email.toLowerCase().includes(j)||((A=v.role)==null?void 0:A.toLowerCase().includes(j))||((T=v.skills)==null?void 0:T.some(oe=>oe.toLowerCase().includes(j)));return D&&z}),I=async(v,D)=>{try{await se.updateVolunteer(v,{teamId:D||null}),k&&k(D?"Assigned to team!":"Moved to unassigned"),d()}catch(j){alert(j.message)}},F=async v=>{try{await se.updateVolunteer(v._id,{checkInStatus:!v.checkInStatus}),k&&k(v.checkInStatus?"Check-in cancelled":`${v.name} checked in!`),d()}catch(D){alert(D.message)}},J=async(v,D)=>{if(window.confirm(`Are you sure you want to remove ${D}?`))try{await se.deleteVolunteer(v),k&&k("Volunteer removed"),d()}catch(j){alert(j.message)}};return l.jsxs("div",{className:"volunteers-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsxs("div",{children:[l.jsx("span",{className:"page-kicker",children:"AURELIA CULTURAL FEST ’26"}),l.jsx("h1",{className:"page-title",children:"Volunteer Roster"}),l.jsx("p",{className:"page-subtitle",children:"Search, filter, check-in, and deploy volunteers across stage, media, and guest operations."})]}),l.jsxs("button",{onClick:P,className:"btn btn-primary",children:[l.jsx(Dr,{size:16}),l.jsx("span",{children:"Add Volunteer"})]})]}),l.jsxs("div",{className:"controls-card card",children:[l.jsx("div",{className:"filter-pills",children:["All","Ready","Assigned"].map(v=>{const D=v==="All"?o.length:o.filter(z=>z.status.toLowerCase()===v.toLowerCase()).length,j=x===v;return l.jsxs("button",{onClick:()=>g(v),className:`filter-pill ${j?"filter-pill-active":""}`,children:[l.jsx("span",{children:v==="All"?"All Volunteers":v}),l.jsx("span",{className:"pill-count",children:D})]},v)})}),l.jsxs("div",{className:"search-box",children:[l.jsx(of,{size:15,color:"#9ca3af"}),l.jsx("input",{type:"text",value:L,onChange:v=>$(v.target.value),placeholder:"Search by name, email, skill, or role...",className:"search-input"})]})]}),l.jsxs("div",{className:"roster-wrapper card",children:[l.jsxs("div",{className:"roster-table-header",children:[l.jsx("span",{className:"col-name",children:"VOLUNTEER & ROLE"}),l.jsx("span",{className:"col-skills",children:"SKILLS"}),l.jsx("span",{className:"col-avail",children:"AVAILABILITY"}),l.jsx("span",{className:"col-team",children:"ASSIGNED TEAM"}),l.jsx("span",{className:"col-status",children:"CHECK-IN"}),l.jsx("span",{className:"col-actions",children:"ACTION"})]}),l.jsx("div",{className:"roster-table-body",children:N.length===0?l.jsxs("div",{className:"empty-state",children:[l.jsx(es,{size:32,color:"#6b7280"}),l.jsx("p",{children:"No volunteers found matching your query."}),l.jsx("button",{onClick:()=>{g("All"),$("")},className:"btn btn-outline btn-sm",children:"Reset Filters"})]}):N.map(v=>{var D,j,z;return l.jsxs("div",{className:"roster-row",children:[l.jsxs("div",{className:"col-name vol-profile-col",children:[l.jsx("div",{className:"vol-avatar",style:{background:`${v.avatarColor||"#22c55e"}22`,color:v.avatarColor||"#22c55e"},children:v.name.charAt(0)}),l.jsxs("div",{className:"vol-info",children:[l.jsx("span",{className:"vol-name",children:v.name}),l.jsx("span",{className:"vol-email",children:v.email}),l.jsx("span",{className:"vol-role",children:v.role||"Crew"})]})]}),l.jsxs("div",{className:"col-skills vol-skills-col",children:[(D=v.skills)==null?void 0:D.slice(0,3).map((A,T)=>l.jsx("span",{className:"skill-tag",children:A},T)),((j=v.skills)==null?void 0:j.length)>3&&l.jsxs("span",{className:"skill-tag",style:{background:"none",color:"#6b7280"},children:["+",v.skills.length-3]})]}),l.jsx("div",{className:"col-avail vol-avail-col",children:(z=v.availability)==null?void 0:z.map((A,T)=>l.jsxs("span",{className:"avail-badge",children:[l.jsx(fc,{size:11}),A]},T))}),l.jsx("div",{className:"col-team vol-team-col",children:l.jsxs("select",{value:v.teamId||"",onChange:A=>I(v._id,A.target.value),className:"team-select",children:[l.jsx("option",{value:"",children:"Unassigned (Ready)"}),w.map(A=>l.jsx("option",{value:A._id,children:A.name},A._id))]})}),l.jsx("div",{className:"col-status vol-status-col",children:l.jsx("button",{onClick:()=>F(v),className:`checkin-btn ${v.checkInStatus?"checkin-active":""}`,title:v.checkInStatus?"Click to undo check-in":"Click to check in",children:v.checkInStatus?l.jsxs(l.Fragment,{children:[l.jsx(Rr,{size:13}),l.jsx("span",{children:"Checked In"})]}):l.jsx("span",{children:"Pending"})})}),l.jsx("div",{className:"col-actions vol-actions-col",children:l.jsx("button",{onClick:()=>J(v._id,v.name),className:"action-icon-btn action-delete",title:"Remove Volunteer",children:l.jsx(gc,{size:15})})})]},v._id)})})]}),l.jsx("style",{children:`
        .volunteers-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .page-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .controls-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .filter-pills {
          display: flex;
          gap: 8px;
        }
        .filter-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: var(--radius-pill);
          font-size: 13px;
          font-weight: 600;
          background: #191e19;
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s;
        }
        .filter-pill:hover {
          color: var(--text-main);
          border-color: var(--border-medium);
        }
        .filter-pill-active {
          background: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.4);
          color: #4ade80;
        }
        .pill-count {
          font-size: 11px;
          opacity: 0.8;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          width: 320px;
        }
        .search-input {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 13px;
          width: 100%;
        }
        .search-input::placeholder {
          color: #6b7280;
        }
        .roster-wrapper {
          padding: 0;
          overflow: hidden;
        }
        .roster-table-header {
          display: grid;
          grid-template-columns: 2.2fr 2fr 1.6fr 1.8fr 1.2fr 0.6fr;
          padding: 14px 20px;
          background: #151915;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        @media (max-width: 900px) {
          .roster-table-header {
            display: none;
          }
        }
        .roster-table-body {
          display: flex;
          flex-direction: column;
        }
        .roster-row {
          display: grid;
          grid-template-columns: 2.2fr 2fr 1.6fr 1.8fr 1.2fr 0.6fr;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.15s;
        }
        @media (max-width: 900px) {
          .roster-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
        .roster-row:hover {
          background: #191e19;
        }
        .vol-profile-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .vol-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }
        .vol-info {
          display: flex;
          flex-direction: column;
        }
        .vol-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .vol-email {
          font-size: 11px;
          color: var(--text-muted);
        }
        .vol-role {
          font-size: 11px;
          color: var(--accent-primary);
        }
        .vol-skills-col {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-tag {
          font-size: 11px;
          padding: 3px 8px;
          background: #202720;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .vol-avail-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-secondary);
        }
        .team-select {
          background: #181d18;
          border: 1px solid var(--border-subtle);
          color: var(--text-main);
          font-size: 12px;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          width: 100%;
          cursor: pointer;
        }
        .team-select:focus {
          border-color: var(--accent-primary);
        }
        .checkin-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s;
        }
        .checkin-active {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.35);
        }
        .action-icon-btn {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: all 0.15s;
        }
        .action-delete:hover {
          color: #f87171;
          background: rgba(239, 68, 68, 0.15);
        }
        .empty-state {
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          color: var(--text-muted);
          font-size: 14px;
        }
      `})]})}function Sf({teams:o=[],volunteers:w=[],matches:d=[],onRefresh:P,onShowToast:k,onOpenCreateTeam:x}){var F,J;const[g,L]=O.useState(((F=o[0])==null?void 0:F._id)||null),[$,R]=O.useState(null),M=o.find(v=>v._id===g)||o[0],N=w.filter(v=>v.teamId===(M==null?void 0:M._id)||v.teamId===(M==null?void 0:M.code)),I=async v=>{R(v.volunteerId);try{await se.updateVolunteer(v.volunteerId,{teamId:v.targetTeamId}),k&&k(`${v.volunteerName} matched to ${v.targetTeamName}!`),P()}catch(D){alert(D.message)}finally{R(null)}};return l.jsxs("div",{className:"team-builder-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsxs("div",{children:[l.jsx("span",{className:"page-kicker",children:"AURELIA CULTURAL FEST ’26"}),l.jsx("h1",{className:"page-title",children:"Team Builder"}),l.jsx("p",{className:"page-subtitle",children:"Balance staff capacity, assign squad leads, and auto-match volunteers by skills and shift availability."})]}),l.jsxs("button",{onClick:x,className:"btn btn-primary",children:[l.jsx(Dr,{size:16}),l.jsx("span",{children:"New Team Squad"})]})]}),l.jsxs("div",{className:"builder-layout",children:[l.jsxs("div",{className:"squads-column",children:[l.jsx("h3",{className:"column-title",children:"Team Coverage"}),l.jsx("div",{className:"teams-grid",children:o.map(v=>{const D=w.filter(T=>T.teamId===v._id||T.teamId===v.code).length,j=v.targetCapacity||8,z=(M==null?void 0:M._id)===v._id,A=Math.min(100,Math.round(D/j*100));return l.jsxs("div",{onClick:()=>L(v._id),className:`card squad-card ${z?"squad-card-selected":""}`,children:[l.jsxs("div",{className:"squad-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("div",{className:"squad-indicator-dot",style:{background:v.color||"#22c55e"}}),l.jsx("span",{className:"squad-name",children:v.name})]}),l.jsxs("span",{className:"squad-status-pill",children:[D," / ",j," assigned"]})]}),l.jsx("p",{className:"squad-desc",children:v.description}),l.jsx("div",{className:"progress-bar-bg",style:{margin:"14px 0 10px"},children:l.jsx("div",{className:"progress-bar-fill",style:{width:`${A}%`,backgroundColor:v.color||"#22c55e"}})}),l.jsxs("div",{className:"squad-footer",children:[l.jsxs("span",{className:"squad-lead",children:["Lead: ",v.leadName||"Unassigned"]}),l.jsxs("span",{className:"squad-percent",children:[A,"% capacity"]})]})]},v._id)})}),M&&l.jsxs("div",{className:"card roster-detail-card",children:[l.jsxs("div",{className:"detail-header",children:[l.jsxs("div",{children:[l.jsxs("h4",{style:{fontSize:16,display:"flex",alignItems:"center",gap:8},children:[l.jsx("span",{style:{width:8,height:8,borderRadius:"50%",background:M.color}}),l.jsxs("span",{children:[M.name," Roster"]})]}),l.jsxs("p",{style:{fontSize:12,color:"#9ca3af",marginTop:2},children:[N.length," members currently deployed in this squad"]})]}),l.jsx("div",{className:"skill-tags-row",children:(J=M.requiredSkills)==null?void 0:J.map((v,D)=>l.jsx("span",{className:"skill-chip",children:v},D))})]}),l.jsx("div",{className:"detail-volunteers-list",children:N.length===0?l.jsx("div",{style:{padding:24,textAlign:"center",color:"#6b7280",fontSize:13},children:"No volunteers assigned yet. Choose candidates from the recommended matches column to staff this squad!"}):N.map(v=>{var D;return l.jsxs("div",{className:"team-member-row",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("div",{className:"member-avatar",style:{background:`${v.avatarColor||"#22c55e"}22`,color:v.avatarColor||"#22c55e"},children:v.name.charAt(0)}),l.jsxs("div",{children:[l.jsx("span",{className:"member-name",children:v.name}),l.jsxs("span",{className:"member-role",children:[v.role||"Crew"," • ",(D=v.availability)==null?void 0:D.join(", ")]})]})]}),l.jsx("button",{onClick:async()=>{await se.updateVolunteer(v._id,{teamId:null}),k&&k(`${v.name} unassigned`),P()},className:"btn btn-outline btn-sm",style:{fontSize:11,padding:"3px 8px"},children:"Remove"})]},v._id)})})]})]}),l.jsxs("div",{className:"matches-column",children:[l.jsxs("div",{className:"matches-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[l.jsx(Jl,{size:16,color:"#4ade80"}),l.jsx("h3",{className:"column-title",style:{margin:0},children:"Recommended matches"})]}),l.jsx("span",{className:"badge badge-live",style:{fontSize:10},children:"AI Fit Engine"})]}),l.jsx("p",{className:"matches-intro",children:"Candidates mapped from the volunteer intake pool matching squad skills and scheduling windows:"}),l.jsx("div",{className:"matches-list",children:d.length===0?l.jsxs("div",{className:"card",style:{padding:28,textAlign:"center",color:"#9ca3af"},children:[l.jsx(Rr,{size:28,color:"#4ade80",style:{margin:"0 auto 10px"}}),l.jsx("p",{style:{fontSize:14,color:"#f3f4f6"},children:"All intake volunteers assigned!"}),l.jsx("p",{style:{fontSize:12,color:"#6b7280",marginTop:4},children:"Add more volunteers in the Roster tab to trigger new matching proposals."})]}):d.map(v=>l.jsxs("div",{className:"card match-card",children:[l.jsxs("div",{className:"match-top",children:[l.jsxs("div",{className:"match-title-row",children:[l.jsx("span",{className:"match-name",children:v.volunteerName}),l.jsx("span",{className:"match-arrow",children:"→"}),l.jsx("span",{className:"match-team",style:{color:v.targetTeamColor||"#4ade80"},children:v.targetTeamName})]}),l.jsxs("span",{className:"match-score",children:[v.fitScore,"% Fit"]})]}),l.jsx("p",{className:"match-reason",children:v.reason}),l.jsx("div",{className:"match-actions",children:l.jsxs("button",{onClick:()=>I(v),disabled:$===v.volunteerId,className:"btn btn-primary btn-sm",style:{width:"100%"},children:[l.jsx(xc,{size:14}),l.jsx("span",{children:$===v.volunteerId?"Assigning...":"Approve Match & Deploy"})]})})]},v.volunteerId))})]})]}),l.jsx("style",{children:`
        .team-builder-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .page-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .builder-layout {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .builder-layout {
            grid-template-columns: 1fr;
          }
        }
        .column-title {
          font-size: 17px;
          margin-bottom: 14px;
        }
        .teams-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .teams-grid {
            grid-template-columns: 1fr;
          }
        }
        .squad-card {
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 18px;
        }
        .squad-card:hover {
          border-color: var(--border-medium);
          transform: translateY(-2px);
        }
        .squad-card-selected {
          border-color: var(--accent-primary);
          background: #171d17;
          box-shadow: 0 0 16px rgba(34, 197, 94, 0.15);
        }
        .squad-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .squad-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .squad-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-main);
        }
        .squad-status-pill {
          font-size: 11px;
          color: var(--text-secondary);
        }
        .squad-desc {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          min-height: 34px;
        }
        .squad-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--text-muted);
        }
        .roster-detail-card {
          padding: 20px;
        }
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .skill-tags-row {
          display: flex;
          gap: 6px;
        }
        .skill-chip {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          background: #1f251f;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }
        .detail-volunteers-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .team-member-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #191e19;
          border-radius: var(--radius-sm);
        }
        .member-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .member-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
          display: block;
        }
        .member-role {
          font-size: 11px;
          color: var(--text-muted);
        }
        .matches-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .matches-intro {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .matches-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .match-card {
          padding: 16px;
          background: #181d18;
          border: 1px solid var(--border-subtle);
        }
        .match-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .match-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
        }
        .match-name {
          color: #fff;
        }
        .match-arrow {
          color: var(--text-muted);
        }
        .match-team {
          font-weight: 700;
        }
        .match-score {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(34, 197, 94, 0.12);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .match-reason {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 14px;
          line-height: 1.4;
        }
      `})]})}function bf({tasks:o=[],teams:w=[],metrics:d,onRefresh:P,onShowToast:k,onOpenCreateTask:x}){const[g,L]=O.useState("All"),$=o.filter(N=>g==="All"?!0:N.priority===g),R=async N=>{const I=N.status==="Completed"?"Pending":N.status==="Pending"?"In Progress":"Completed";try{await se.updateTask(N._id,{status:I}),k&&k(`Task status: ${I}`),P()}catch(F){alert(F.message)}},M=async(N,I)=>{if(window.confirm(`Delete "${I}"?`))try{await se.deleteTask(N),k&&k("Task deleted"),P()}catch(F){alert(F.message)}};return l.jsxs("div",{className:"tasks-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsxs("div",{children:[l.jsx("span",{className:"page-kicker",children:"AURELIA CULTURAL FEST ’26"}),l.jsx("h1",{className:"page-title",children:"Tasks & Shifts"}),l.jsx("p",{className:"page-subtitle",children:"Coordinate day-of-event shifts, critical production runs, and crew rosters in real-time."})]}),l.jsxs("button",{onClick:x,className:"btn btn-primary",children:[l.jsx(Dr,{size:16}),l.jsx("span",{children:"New Shift / Task"})]})]}),l.jsxs("div",{className:"tasks-metrics-grid",children:[l.jsxs("div",{className:"card metric-box",children:[l.jsx("span",{className:"metric-tag",children:"TOTAL TASKS"}),l.jsx("span",{className:"metric-num",children:(d==null?void 0:d.totalTasks)??o.length}),l.jsx("span",{className:"metric-sub sub-warning",children:(d==null?void 0:d.highPrioritySubtext)||`${(d==null?void 0:d.highPriority)??0} High Priority`})]}),l.jsxs("div",{className:"card metric-box",children:[l.jsx("span",{className:"metric-tag",children:"ACTIVE SHIFTS"}),l.jsx("span",{className:"metric-num",children:(d==null?void 0:d.activeShifts)??0}),l.jsx("span",{className:"metric-sub",children:(d==null?void 0:d.activeShiftsSubtext)||"No active shifts"})]}),l.jsxs("div",{className:"card metric-box",children:[l.jsx("span",{className:"metric-tag",children:"STAFF COVERAGE"}),l.jsx("span",{className:"metric-num",children:d?d.staffCoverage:`${o.reduce((N,I)=>N+(I.assignedCrewCount||0),0)} / ${o.reduce((N,I)=>N+(I.requiredCrew||0),0)}`}),l.jsx("span",{className:"metric-sub sub-success",children:(d==null?void 0:d.staffCoveragePercent)||"0% Capacity Assigned"})]}),l.jsxs("div",{className:"card metric-box",children:[l.jsx("span",{className:"metric-tag",children:"COMPLETION RATE"}),l.jsx("span",{className:"metric-num",children:d?`${d.completionRate}%`:"—"}),l.jsx("span",{className:"metric-sub sub-success",children:(d==null?void 0:d.completionRateSubtext)||"Across all tasks"})]})]}),l.jsxs("div",{className:"tasks-board",children:[l.jsxs("div",{className:"card shifts-column",children:[l.jsxs("div",{className:"column-header",children:[l.jsx("h3",{className:"column-heading",children:"Today’s shifts"}),l.jsx("span",{className:"column-note",children:"19 September 2026"})]}),l.jsx("div",{className:"shifts-stack",children:o.map(N=>l.jsxs("div",{className:"shift-card",children:[l.jsxs("div",{className:"shift-top",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[l.jsx(fc,{size:14,color:"#4ade80"}),l.jsx("span",{className:"shift-label",children:N.shiftTime||N.title})]}),l.jsxs("span",{className:"badge badge-neutral",children:[N.assignedCrewCount||0," / ",N.requiredCrew||4," crew"]})]}),l.jsxs("div",{className:"shift-meta",children:[l.jsx("span",{className:"shift-team-tag",children:N.teamName||"General Crew"}),l.jsxs("span",{className:"shift-loc",children:[l.jsx(tf,{size:11}),N.location||"Mainstage"]})]}),l.jsx("div",{className:"progress-bar-bg",style:{height:4,marginTop:8},children:l.jsx("div",{className:"progress-bar-fill",style:{width:`${Math.min(100,Math.round((N.assignedCrewCount||0)/(N.requiredCrew||4)*100))}%`,backgroundColor:"#22c55e"}})})]},N._id))})]}),l.jsxs("div",{className:"card queue-column",children:[l.jsxs("div",{className:"column-header",children:[l.jsxs("div",{children:[l.jsx("h3",{className:"column-heading",children:"Priority Task Queue"}),l.jsx("p",{className:"column-note",children:"Click checkbox to transition: Pending → In Progress → Completed"})]}),l.jsx("div",{className:"priority-filters",children:["All","High","Medium","Low"].map(N=>l.jsx("button",{onClick:()=>L(N),className:`p-filter-btn ${g===N?"p-filter-active":""}`,children:N},N))})]}),l.jsx("div",{className:"queue-list",children:$.length===0?l.jsx("div",{style:{padding:32,textAlign:"center",color:"#6b7280"},children:"No tasks match the selected priority filter."}):$.map(N=>{var J;const I=N.status==="Completed",F=N.status==="In Progress";return l.jsxs("div",{className:`queue-item ${I?"queue-item-complete":""}`,children:[l.jsxs("button",{onClick:()=>R(N),className:`task-check-circle ${I?"check-done":F?"check-progress":""}`,title:"Click to toggle status",children:[I&&l.jsx(Rr,{size:12,color:"#0c140c"}),F&&l.jsx("div",{className:"progress-dot"})]}),l.jsxs("div",{className:"queue-item-content",children:[l.jsxs("div",{className:"task-title-line",children:[l.jsx("span",{className:`task-title ${I?"task-title-strike":""}`,children:N.title}),l.jsx("span",{className:`priority-badge priority-badge-${N.priority.toLowerCase()}`,children:N.priority})]}),l.jsx("p",{className:"task-description",children:N.description}),l.jsxs("div",{className:"task-bottom-meta",children:[l.jsxs("span",{className:"task-assignees",children:[l.jsx(es,{size:12}),((J=N.assigneeNames)==null?void 0:J.length)>0?N.assigneeNames.join(", "):`${N.assignedCrewCount||0} crew assigned`]}),l.jsx("span",{className:"task-status-pill",children:N.status})]})]}),l.jsx("button",{onClick:()=>M(N._id,N.title),className:"task-delete-btn",title:"Delete task",children:l.jsx(gc,{size:14})})]},N._id)})})]})]}),l.jsx("style",{children:`
        .tasks-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }
        .page-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .page-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .tasks-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .tasks-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .tasks-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        .metric-box {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
        }
        .metric-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .metric-num {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .metric-sub {
          font-size: 11px;
          color: var(--text-muted);
        }
        .sub-warning {
          color: #fbbf24;
          font-weight: 600;
        }
        .sub-success {
          color: #4ade80;
          font-weight: 600;
        }
        .tasks-board {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .tasks-board {
            grid-template-columns: 1fr;
          }
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .column-heading {
          font-size: 17px;
          margin-bottom: 2px;
        }
        .column-note {
          font-size: 12px;
          color: var(--text-muted);
        }
        .priority-filters {
          display: flex;
          gap: 4px;
        }
        .p-filter-btn {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: #191e19;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s;
        }
        .p-filter-active {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.4);
        }
        .shifts-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .shift-card {
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .shift-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .shift-label {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
        }
        .shift-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .shift-loc {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .queue-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .queue-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: background 0.15s;
        }
        .queue-item:hover {
          background: #1d231d;
        }
        .queue-item-complete {
          opacity: 0.65;
        }
        .task-check-circle {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid var(--border-medium);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .task-check-circle:hover {
          border-color: var(--accent-primary);
        }
        .check-done {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }
        .check-progress {
          border-color: #fbbf24;
        }
        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fbbf24;
        }
        .queue-item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .task-title-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .task-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .task-title-strike {
          text-decoration: line-through;
          color: var(--text-muted);
        }
        .priority-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .priority-badge-high {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }
        .priority-badge-medium {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .priority-badge-low {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }
        .task-description {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .task-bottom-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .task-assignees {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .task-status-pill {
          background: #141714;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .task-delete-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .task-delete-btn:hover {
          color: #f87171;
        }
      `})]})}function ic(o){if(!o)return"";const w=new Date(o);if(Number.isNaN(w.getTime()))return"";const d=P=>String(P).padStart(2,"0");return`${w.getFullYear()}-${d(w.getMonth()+1)}-${d(w.getDate())}T${d(w.getHours())}:${d(w.getMinutes())}`}function ac(o){var w,d,P;return{name:(o==null?void 0:o.name)??"",startsAt:ic(o==null?void 0:o.startsAt),endsAt:ic(o==null?void 0:o.endsAt),status:(o==null?void 0:o.status)??"Planning",venueName:((w=o==null?void 0:o.venue)==null?void 0:w.name)??"",venueAddress:((d=o==null?void 0:o.venue)==null?void 0:d.address)??"",venueCity:((P=o==null?void 0:o.venue)==null?void 0:P.city)??"",description:(o==null?void 0:o.description)??"",activeVolunteersTarget:(o==null?void 0:o.activeVolunteersTarget)??45,coordinatorEditing:(o==null?void 0:o.coordinatorEditing)??!0,shiftAlerts:(o==null?void 0:o.shiftAlerts)||"Sent 2h before",autoMatching:(o==null?void 0:o.autoMatching)??!0}}function Cf({eventInfo:o,dbStatus:w,onRefreshDb:d,onRefreshEvent:P,onShowToast:k}){var Ve,Be,it,Ye,Pe,qe;const[x,g]=O.useState(()=>ac(null)),[L,$]=O.useState(null),[R,M]=O.useState(!1),[N,I]=O.useState(""),[F,J]=O.useState(!1),[v,D]=O.useState(null),[j,z]=O.useState(null),[A,T]=O.useState(!1);O.useEffect(()=>{g(ac(o)),$(null)},[o==null?void 0:o._id]);const oe=async te=>{if(te.preventDefault(),!(o!=null&&o._id)){$("No event is loaded yet.");return}if(!x.name.trim()){$("Event name is required");return}if(!x.startsAt||!x.endsAt){$("Start and end dates are required");return}if(new Date(x.endsAt)<new Date(x.startsAt)){$("The end date cannot be before the start date");return}M(!0),$(null);try{await se.updateEvent(o._id,{name:x.name.trim(),startsAt:new Date(x.startsAt).toISOString(),endsAt:new Date(x.endsAt).toISOString(),status:x.status,venue:{name:x.venueName.trim(),address:x.venueAddress.trim(),city:x.venueCity.trim()},description:x.description.trim(),targets:{...o.targets||{},activeVolunteers:Number(x.activeVolunteersTarget)||45},coordinatorEditing:x.coordinatorEditing,shiftAlerts:x.shiftAlerts,autoMatching:x.autoMatching}),k&&k("Workspace settings saved!"),P&&P()}catch(ke){$(ke.message||"Could not save the event")}finally{M(!1)}},he=async te=>{if(te.preventDefault(),!!N){J(!0),D(null),z(null);try{const ke=await se.connectMongoDB(N);D(ke.message),ke.sessionInvalidated?(z(ke.sessionMessage||"Connected, but you must sign in again."),jc()):k&&k("Connected to MongoDB!"),d&&d()}catch(ke){z(ke.message||"Failed to connect to MongoDB")}finally{J(!1)}}},Ee=async()=>{if(window.confirm(`Reseed the database with the demo events?

This deletes every existing team, volunteer, task and event (sign-in accounts are kept).`)){T(!0);try{const te=await se.seedDatabase();k&&k(te.message||"Database seeded!"),d&&d(),P&&P()}catch(te){alert(te.message)}finally{T(!1)}}},ge=w==null?void 0:w.connected;return l.jsxs("div",{className:"settings-page",children:[l.jsx("div",{className:"page-header",children:l.jsxs("div",{children:[l.jsx("span",{className:"page-kicker",children:((o==null?void 0:o.name)||"EVENT").toUpperCase()}),l.jsx("h1",{className:"page-title",children:"Workspace Settings"}),l.jsx("p",{className:"page-subtitle",children:"Configure campus event metadata, coordinator permissions, shift alerts, and MongoDB connections."})]})}),l.jsxs("div",{className:"settings-grid",children:[l.jsxs("div",{className:"settings-main-col",children:[l.jsxs("form",{onSubmit:oe,className:"card settings-card",children:[l.jsx("h3",{className:"section-title",children:"Event configuration"}),l.jsxs("p",{className:"section-desc",children:["Manage primary title, event window dates, and campus venue grounds.",l.jsx("br",{}),l.jsx("span",{style:{color:"var(--accent-primary)"},children:(o==null?void 0:o.name)||"No event selected"})]}),l.jsxs("div",{className:"form-group",style:{marginTop:20},children:[l.jsx("label",{className:"form-label",children:"Event Name"}),l.jsx("input",{type:"text",value:x.name,onChange:te=>g({...x,name:te.target.value}),className:"form-input"})]}),l.jsxs("div",{className:"form-row-2",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Event starts"}),l.jsx("input",{type:"datetime-local",value:x.startsAt,onChange:te=>g({...x,startsAt:te.target.value}),className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Event ends"}),l.jsx("input",{type:"datetime-local",min:x.startsAt||void 0,value:x.endsAt,onChange:te=>g({...x,endsAt:te.target.value}),className:"form-input"})]})]}),l.jsxs("div",{className:"form-row-2",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Status"}),l.jsxs("select",{value:x.status,onChange:te=>g({...x,status:te.target.value}),className:"form-input team-select",children:[l.jsx("option",{value:"Planning",children:"Planning"}),l.jsx("option",{value:"Live",children:"Live"}),l.jsx("option",{value:"Completed",children:"Completed"}),l.jsx("option",{value:"Cancelled",children:"Cancelled"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Volunteer target"}),l.jsx("input",{type:"number",min:"1",max:"500",value:x.activeVolunteersTarget,onChange:te=>g({...x,activeVolunteersTarget:te.target.value}),className:"form-input"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Campus Location"}),l.jsxs("div",{className:"form-row-3",children:[l.jsx("input",{type:"text",placeholder:"Venue",value:x.venueName,onChange:te=>g({...x,venueName:te.target.value}),className:"form-input"}),l.jsx("input",{type:"text",placeholder:"Address",value:x.venueAddress,onChange:te=>g({...x,venueAddress:te.target.value}),className:"form-input"}),l.jsx("input",{type:"text",placeholder:"City",value:x.venueCity,onChange:te=>g({...x,venueCity:te.target.value}),className:"form-input"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Brief Description"}),l.jsx("textarea",{rows:3,value:x.description,onChange:te=>g({...x,description:te.target.value}),className:"form-input",style:{resize:"vertical"}})]}),L&&l.jsx("div",{className:"form-error",children:L}),l.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:10},children:l.jsxs("button",{type:"submit",disabled:R||!(o!=null&&o._id),className:"btn btn-primary",children:[l.jsx(sf,{size:15}),l.jsx("span",{children:R?"Saving...":"Save Configuration"})]})})]}),l.jsxs("div",{className:"card settings-card",children:[l.jsx("h3",{className:"section-title",children:"Team access & notifications"}),l.jsx("p",{className:"section-desc",children:"Volunteer lead privileges and real-time shift alert dispatching."}),l.jsxs("div",{className:"settings-toggle-list",style:{marginTop:20},children:[l.jsxs("div",{className:"toggle-item",children:[l.jsxs("div",{className:"toggle-info",children:[l.jsx("span",{className:"toggle-title",children:"Coordinator editing"}),l.jsx("span",{className:"toggle-desc",children:"Allow team leads to modify roster capacity and add tasks"})]}),l.jsx("button",{type:"button",onClick:()=>g({...x,coordinatorEditing:!x.coordinatorEditing}),className:`toggle-switch ${x.coordinatorEditing?"switch-on":""}`,children:l.jsx("div",{className:"switch-thumb"})})]}),l.jsxs("div",{className:"toggle-item",children:[l.jsxs("div",{className:"toggle-info",children:[l.jsx("span",{className:"toggle-title",children:"Shift alerts"}),l.jsx("span",{className:"toggle-desc",children:"Dispatch automated shift preparation alerts to volunteers"})]}),l.jsxs("select",{value:x.shiftAlerts,onChange:te=>g({...x,shiftAlerts:te.target.value}),className:"team-select",style:{width:160},children:[l.jsx("option",{value:"Sent 1h before",children:"Sent 1h before"}),l.jsx("option",{value:"Sent 2h before",children:"Sent 2h before"}),l.jsx("option",{value:"Sent 4h before",children:"Sent 4h before"}),l.jsx("option",{value:"Sent 24h before",children:"Sent 24h before"})]})]}),l.jsxs("div",{className:"toggle-item",children:[l.jsxs("div",{className:"toggle-info",children:[l.jsx("span",{className:"toggle-title",children:"AI Candidate Auto-matching"}),l.jsx("span",{className:"toggle-desc",children:"Suggest optimal squad fit based on skills & shift availability"})]}),l.jsx("button",{type:"button",onClick:()=>g({...x,autoMatching:!x.autoMatching}),className:`toggle-switch ${x.autoMatching?"switch-on":""}`,children:l.jsx("div",{className:"switch-thumb"})})]})]})]})]}),l.jsx("div",{className:"settings-side-col",children:l.jsxs("div",{className:"card settings-card db-card",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:14},children:[l.jsx("div",{className:`db-icon-box ${ge?"db-icon-online":"db-icon-offline"}`,children:l.jsx(Xi,{size:20})}),l.jsxs("div",{children:[l.jsx("h3",{className:"section-title",children:"MongoDB Connection"}),l.jsx("span",{className:`badge ${ge?"badge-live":"badge-warning"}`,children:ge?"LIVE CLUSTER":"LOCAL FALLBACK"})]})]}),l.jsx("p",{style:{fontSize:13,color:"#9ca3af",lineHeight:1.5,marginBottom:16},children:ge?"Your Express backend is actively connected to MongoDB. Data modifications persist directly to your collections.":"Currently running on resilient local storage. Connect a MongoDB Atlas cloud cluster or local mongod service below."}),l.jsxs("div",{className:"db-stats-box",children:[l.jsxs("div",{className:"db-stat-item",children:[l.jsx("span",{className:"db-stat-num",children:((Ve=w==null?void 0:w.counts)==null?void 0:Ve.volunteers)??0}),l.jsx("span",{className:"db-stat-label",children:"Volunteers"})]}),l.jsxs("div",{className:"db-stat-item",children:[l.jsx("span",{className:"db-stat-num",children:((Be=w==null?void 0:w.counts)==null?void 0:Be.teams)??0}),l.jsx("span",{className:"db-stat-label",children:"Teams"})]}),l.jsxs("div",{className:"db-stat-item",children:[l.jsx("span",{className:"db-stat-num",children:((it=w==null?void 0:w.counts)==null?void 0:it.tasks)??0}),l.jsx("span",{className:"db-stat-label",children:"Tasks"})]})]}),l.jsxs("p",{style:{fontSize:11,color:"var(--text-muted)",marginTop:6},children:["Counts for the active event · ",((Ye=w==null?void 0:w.counts)==null?void 0:Ye.events)??0," event",((Pe=w==null?void 0:w.counts)==null?void 0:Pe.events)===1?"":"s"," in total · ",((qe=w==null?void 0:w.counts)==null?void 0:qe.skills)??0," skills"]}),l.jsxs("form",{onSubmit:he,style:{marginTop:20},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Connect MongoDB Atlas / Local URI"}),l.jsx("input",{type:"text",value:N,onChange:te=>I(te.target.value),placeholder:"mongodb+srv://user:pass@cluster.mongodb.net/event-team-builder",className:"form-input",style:{fontSize:12,fontFamily:"monospace"}})]}),v&&l.jsxs("div",{style:{padding:"8px 12px",background:"rgba(34, 197, 94, 0.15)",color:"#4ade80",borderRadius:6,fontSize:12,marginBottom:12},children:["✓ ",v]}),j&&l.jsxs("div",{style:{padding:"8px 12px",background:"rgba(239, 68, 68, 0.15)",color:"#f87171",borderRadius:6,fontSize:12,marginBottom:12},children:["✕ ",j]}),l.jsxs("div",{style:{display:"flex",gap:8,marginTop:8},children:[l.jsx("button",{type:"button",onClick:()=>I("mongodb://localhost:27017/event-team-builder"),className:"btn btn-outline btn-sm",style:{flex:1},children:"Localhost URI"}),l.jsx("button",{type:"submit",disabled:F||!N,className:"btn btn-primary btn-sm",style:{flex:1},children:F?"Testing...":"Test & Connect"})]})]}),l.jsxs("div",{style:{marginTop:24,paddingTop:18,borderTop:"1px solid var(--border-subtle)"},children:[l.jsx("label",{className:"form-label",style:{display:"block",marginBottom:6},children:"Database Seed & Reset"}),l.jsxs("button",{type:"button",onClick:Ee,disabled:A,className:"btn btn-secondary btn-sm",style:{width:"100%"},children:[l.jsx(hc,{size:14,className:A?"spin":""}),l.jsx("span",{children:A?"Seeding...":"Reseed Demo Data"})]})]})]})})]}),l.jsx("style",{children:`
        .settings-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .page-header {
          margin-bottom: 4px;
        }
        .page-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-primary);
          display: block;
          margin-bottom: 4px;
        }
        .page-title {
          font-size: 30px;
          margin-bottom: 6px;
        }
        .page-subtitle {
          font-size: 14px;
          color: var(--text-secondary);
        }
        .settings-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
        }
        @media (max-width: 960px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
        .settings-main-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .settings-card {
          padding: 24px;
        }
        .section-title {
          font-size: 17px;
          margin-bottom: 4px;
        }
        .section-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr;
          gap: 10px;
        }
        @media (max-width: 600px) {
          .form-row-2,
          .form-row-3 {
            grid-template-columns: 1fr;
          }
        }
        .settings-toggle-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: #191e19;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .toggle-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toggle-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-main);
        }
        .toggle-desc {
          font-size: 11px;
          color: var(--text-muted);
        }
        .toggle-switch {
          width: 44px;
          height: 24px;
          background: #272e27;
          border-radius: 12px;
          padding: 2px;
          transition: background 0.2s;
          display: flex;
          align-items: center;
        }
        .switch-on {
          background: var(--accent-primary);
        }
        .switch-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s;
        }
        .switch-on .switch-thumb {
          transform: translateX(20px);
        }
        .db-card {
          background: #171b17;
          border: 1px solid var(--border-subtle);
        }
        .db-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .db-icon-online {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
        }
        .db-icon-offline {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .db-stats-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          background: #141714;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 12px;
          text-align: center;
        }
        .db-stat-num {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 800;
          color: var(--text-main);
          display: block;
        }
        .db-stat-label {
          font-size: 11px;
          color: var(--text-muted);
        }
      `})]})}function Ef({events:o=[],activeEventId:w,onSwitch:d,onCreate:P,onRefresh:k}){const[x,g]=O.useState(!1),[L,$]=O.useState(!1),[R,M]=O.useState(!1),[N,I]=O.useState(""),[F,J]=O.useState({name:"",startsAt:"",endsAt:""}),v=O.useRef(null),D=o.find(T=>T._id===w)||null;O.useEffect(()=>{if(!x)return;const T=he=>{v.current&&!v.current.contains(he.target)&&g(!1)},oe=he=>{he.key==="Escape"&&(g(!1),$(!1),I(""))};return document.addEventListener("mousedown",T),document.addEventListener("keydown",oe),()=>{document.removeEventListener("mousedown",T),document.removeEventListener("keydown",oe)}},[x]);const j=async T=>{if(T.preventDefault(),!F.name.trim())return I("Event name is required");if(!F.startsAt||!F.endsAt)return I("Start and end dates are required");M(!0),I("");try{const oe=await se.createEvent({name:F.name.trim(),startsAt:new Date(F.startsAt).toISOString(),endsAt:new Date(F.endsAt).toISOString()});J({name:"",startsAt:"",endsAt:""}),$(!1),g(!1),await(k==null?void 0:k()),await(d==null?void 0:d(oe._id))}catch(oe){I(oe.message||"Could not create the event")}finally{M(!1)}},z=async T=>{M(!0);try{await se.activateEvent(T),await(k==null?void 0:k())}catch(oe){I(oe.message||"Could not change the default event")}finally{M(!1)}},A=T=>T?new Date(T).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}):"—";return l.jsxs("div",{className:"event-switcher",ref:v,children:[l.jsxs("button",{type:"button",className:"event-switcher-trigger",onClick:()=>g(T=>!T),"aria-expanded":x,"aria-haspopup":"listbox",title:"Switch event",children:[l.jsx("span",{className:"event-switcher-dot"}),l.jsx("span",{className:"event-switcher-current",children:(D==null?void 0:D.name)||"Select event"}),l.jsx($p,{size:14,className:x?"event-switcher-chevron event-switcher-chevron-open":"event-switcher-chevron"})]}),x&&l.jsxs("div",{className:"event-switcher-panel",role:"listbox",children:[l.jsxs("div",{className:"event-switcher-panel-head",children:[l.jsx("span",{children:"Events"}),l.jsx("span",{className:"event-switcher-count",children:o.length})]}),o.length===0&&l.jsx("p",{className:"event-switcher-empty",children:"No events yet. Create one to get started."}),l.jsx("div",{className:"event-switcher-list",children:o.map(T=>{var he,Ee,ge;const oe=T._id===w;return l.jsxs("div",{className:`event-switcher-row ${oe?"event-switcher-row-active":""}`,children:[l.jsxs("button",{type:"button",className:"event-switcher-row-main",onClick:()=>{g(!1),d==null||d(T._id)},role:"option","aria-selected":oe,children:[l.jsxs("span",{className:"event-switcher-row-top",children:[l.jsx("span",{className:"event-switcher-row-name",children:T.name}),oe&&l.jsx(Rr,{size:14,className:"event-switcher-check"})]}),l.jsxs("span",{className:"event-switcher-row-meta",children:[l.jsx("span",{className:`event-status event-status-${(T.status||"planning").toLowerCase()}`,children:T.status||"Planning"}),l.jsxs("span",{className:"event-switcher-row-dates",children:[A(T.startsAt)," – ",A(T.endsAt)]})]}),l.jsxs("span",{className:"event-switcher-row-counts",children:[((he=T.counts)==null?void 0:he.teams)??0," teams · ",((Ee=T.counts)==null?void 0:Ee.volunteers)??0," volunteers ·"," ",((ge=T.counts)==null?void 0:ge.tasks)??0," tasks"]})]}),T.isActive?l.jsxs("span",{className:"event-switcher-default-tag",title:"Default event for new sessions",children:[l.jsx(lc,{size:11})," Default"]}):l.jsx("button",{type:"button",className:"event-switcher-default-btn",onClick:()=>z(T._id),disabled:R,title:"Make this the default event",children:l.jsx(lc,{size:11})})]},T._id)})}),L?l.jsxs("form",{className:"event-switcher-form",onSubmit:j,children:[l.jsxs("div",{className:"event-switcher-form-head",children:[l.jsx("span",{children:"New event"}),l.jsx("button",{type:"button",className:"event-switcher-close",onClick:()=>{$(!1),I("")},"aria-label":"Cancel",children:l.jsx(Or,{size:13})})]}),l.jsx("input",{className:"event-switcher-input",placeholder:"Event name",value:F.name,onChange:T=>J({...F,name:T.target.value}),autoFocus:!0}),l.jsxs("label",{className:"event-switcher-label",children:[l.jsx(rc,{size:12})," Starts",l.jsx("input",{type:"datetime-local",className:"event-switcher-input",value:F.startsAt,onChange:T=>J({...F,startsAt:T.target.value})})]}),l.jsxs("label",{className:"event-switcher-label",children:[l.jsx(rc,{size:12})," Ends",l.jsx("input",{type:"datetime-local",className:"event-switcher-input",value:F.endsAt,onChange:T=>J({...F,endsAt:T.target.value})})]}),N&&l.jsx("p",{className:"event-switcher-error",children:N}),l.jsx("button",{type:"submit",className:"event-switcher-submit",disabled:R,children:R?"Creating…":"Create event"})]}):l.jsxs("button",{type:"button",className:"event-switcher-add",onClick:()=>$(!0),children:[l.jsx(Dr,{size:14})," New event"]}),N&&!L&&l.jsx("p",{className:"event-switcher-error",children:N})]})]})}function zf({currentPath:o,onNavigate:w,children:d,eventInfo:P,events:k,activeEventId:x,onSwitchEvent:g,onEventsChanged:L,dbStatus:$,onRefreshDb:R,user:M,onLogout:N}){var J;const I=[{label:"Overview",path:"/dashboard",icon:Zp},{label:"Volunteers",path:"/dashboard/volunteers",icon:es},{label:"Team builder",path:"/dashboard/teams",icon:Gl},{label:"Tasks & shifts",path:"/dashboard/tasks",icon:na},{label:"Settings",path:"/dashboard/settings",icon:cf}],F=(M==null?void 0:M.role)==="Coordinator";return l.jsxs("div",{className:"dashboard-shell",children:[l.jsxs("aside",{className:"sidebar",children:[l.jsxs("div",{className:"sidebar-top",children:[l.jsxs("div",{className:"sidebar-brand",onClick:()=>w("/"),style:{cursor:"pointer"},children:[l.jsx("div",{className:"sidebar-brand-mark",children:l.jsx("span",{children:"E"})}),l.jsxs("div",{className:"sidebar-brand-text",children:[l.jsx("span",{className:"sidebar-brand-name",children:"EVENT TEAM BUILDER"}),l.jsx("span",{className:"sidebar-brand-kicker",children:"CAMPUS OPERATIONS"})]})]}),l.jsxs("div",{className:"event-kicker-badge",children:[l.jsx("span",{className:"event-kicker-dot"}),l.jsx(Ef,{events:k,activeEventId:x,onSwitch:g,onRefresh:L})]}),l.jsx("nav",{className:"sidebar-nav",children:I.map(v=>{const D=v.icon,j=o===v.path;return l.jsxs("button",{onClick:()=>w(v.path),className:`nav-item ${j?"nav-item-active":""}`,children:[l.jsxs("div",{className:"nav-item-content",children:[l.jsx(D,{size:18,className:"nav-icon"}),l.jsx("span",{className:"nav-label",children:v.label})]}),j&&l.jsx("div",{className:"nav-active-indicator"})]},v.path)})})]}),l.jsxs("div",{className:"sidebar-bottom",children:[l.jsx("div",{className:"sidebar-status-box",children:l.jsx(ea,{status:$,onRefresh:R,canManage:F})}),l.jsxs("button",{onClick:()=>w("/"),className:"external-link-btn",children:[l.jsx("span",{children:"Preview Landing Page"}),l.jsx(Qp,{size:13})]}),l.jsxs("div",{className:"user-profile-card",children:[l.jsx("div",{className:"user-avatar",children:l.jsx("span",{children:((M==null?void 0:M.name)||"Campus Coordinator").charAt(0)})}),l.jsxs("div",{className:"user-info",children:[l.jsx("span",{className:"user-name",children:(M==null?void 0:M.name)||"Coordinator"}),l.jsx("span",{className:"user-role",children:(M==null?void 0:M.role)||"Coordinator"})]}),l.jsx("button",{onClick:N,className:"logout-mini-btn",title:"Sign out","aria-label":"Sign out",children:l.jsx(mc,{size:14})})]})]})]}),l.jsxs("main",{className:"main-content",children:[l.jsxs("header",{className:"topbar",children:[l.jsxs("div",{className:"topbar-left",children:[l.jsx("span",{className:"breadcrumb-event",children:(P==null?void 0:P.kicker)||(P==null?void 0:P.name)||"EVENT"}),l.jsx(Ip,{size:14,color:"#6b7280"}),l.jsx("span",{className:"breadcrumb-current",children:((J=I.find(v=>v.path===o))==null?void 0:J.label)||"Dashboard"})]}),l.jsxs("div",{className:"topbar-right",children:[l.jsxs("div",{className:"badge badge-live",children:[l.jsx("span",{className:"status-dot"}),l.jsx("span",{children:(P==null?void 0:P.status)||"LIVE"})]}),l.jsx(ea,{status:$,onRefresh:R,canManage:F})]})]}),l.jsx("div",{className:"content-container",children:d})]}),l.jsx("style",{children:`
        .dashboard-shell {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-main);
        }
        .sidebar {
          width: 260px;
          background-color: #141714;
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 24px 16px;
          z-index: 50;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px 20px 8px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .sidebar-brand-mark {
          width: 32px;
          height: 32px;
          background: #1a1e1a;
          border: 1px solid rgba(34, 197, 94, 0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sidebar-brand-mark span {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 16px;
          color: var(--accent-primary);
        }
        .sidebar-brand-text {
          display: flex;
          flex-direction: column;
        }
        .sidebar-brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: var(--text-main);
        }
        .sidebar-brand-kicker {
          font-size: 10px;
          letter-spacing: 0.05em;
          color: var(--accent-primary);
          font-weight: 600;
        }
        .event-kicker-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1a1f1a;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          margin: 16px 0;
        }
        .event-kicker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 6px var(--accent-primary);
        }
        .event-kicker-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          transition: all var(--transition-fast);
          position: relative;
        }
        .nav-item:hover {
          color: var(--text-main);
          background-color: var(--bg-surface-elevated);
        }
        .nav-item-active {
          color: #fff;
          background-color: rgba(34, 197, 94, 0.12);
          font-weight: 600;
        }
        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-icon {
          color: inherit;
        }
        .nav-active-indicator {
          width: 4px;
          height: 18px;
          background: var(--accent-primary);
          border-radius: 2px;
        }
        .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .sidebar-status-box {
          display: flex;
          justify-content: center;
        }
        .external-link-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: #171b17;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--text-secondary);
          transition: all 0.15s;
        }
        .external-link-btn:hover {
          color: var(--text-main);
          border-color: var(--border-medium);
        }
        .user-profile-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: #181d18;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #272e27;
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .user-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-role {
          font-size: 10px;
          color: var(--text-muted);
        }
        .logout-mini-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .logout-mini-btn:hover {
          color: #f87171;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .topbar {
          height: 68px;
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          background: rgba(18, 20, 18, 0.7);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 40;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumb-event {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .breadcrumb-current {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-main);
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .content-container {
          padding: 32px;
          max-width: 1300px;
          width: 100%;
          margin: 0 auto;
        }
      `})]})}const oc={name:"",email:"",phone:"",role:"General Crew",skillIds:[],availability:["Morning"],teamId:"",notes:""};function _f({isOpen:o,onClose:w,teams:d=[],skills:P=[],onVolunteerAdded:k,onShowToast:x}){const[g,L]=O.useState(oc),[$,R]=O.useState(!1),[M,N]=O.useState(""),I=()=>{L(oc),N("")},F=()=>{I(),w()},J=z=>{L(A=>({...A,availability:A.availability.includes(z)?A.availability.filter(T=>T!==z):[...A.availability,z]}))},v=z=>{L(A=>({...A,skillIds:A.skillIds.includes(z)?A.skillIds.filter(T=>T!==z):[...A.skillIds,z]}))},D=async z=>{if(z.preventDefault(),!g.name.trim())return N("Name is required");if(!g.email.trim())return N("Email is required");R(!0),N("");try{await se.createVolunteer({...g,name:g.name.trim(),email:g.email.trim(),phone:g.phone.trim(),role:g.role.trim()||"General Crew",notes:g.notes.trim(),skillIds:g.skillIds,teamId:g.teamId||null}),x&&x(`${g.name} added to roster!`),I(),k&&k(),w()}catch(A){N(A.message||"Could not add the volunteer")}finally{R(!1)}},j=P.reduce((z,A)=>{var T;return(z[T=A.category||"General"]||(z[T]=[])).push(A),z},{});return o?l.jsx("div",{className:"modal-backdrop",onClick:F,children:l.jsxs("div",{className:"modal-content",onClick:z=>z.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("div",{style:{width:34,height:34,borderRadius:8,background:"rgba(34, 197, 94, 0.15)",color:"#4ade80",display:"flex",alignItems:"center",justifyContent:"center"},children:l.jsx(xc,{size:18})}),l.jsx("h3",{style:{fontSize:17,color:"#f3f4f6"},children:"Add New Volunteer"})]}),l.jsx("button",{onClick:F,className:"close-btn","aria-label":"Close",children:l.jsx(Or,{size:18})})]}),l.jsxs("form",{onSubmit:D,style:{padding:"20px 24px"},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Full Name *"}),l.jsx("input",{type:"text",required:!0,value:g.name,onChange:z=>L({...g,name:z.target.value}),placeholder:"e.g. Ananya Shah",className:"form-input"})]}),l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Campus Email *"}),l.jsx("input",{type:"email",required:!0,value:g.email,onChange:z=>L({...g,email:z.target.value}),placeholder:"name@campus.edu",className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Phone"}),l.jsx("input",{type:"text",value:g.phone,onChange:z=>L({...g,phone:z.target.value}),placeholder:"+1 (555) 000-0000",className:"form-input"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{className:"form-label",children:["Skills ",l.jsx("span",{className:"form-hint",children:"(drives squad auto-matching)"})]}),P.length===0?l.jsx("span",{className:"form-hint",children:"No skills defined yet."}):Object.entries(j).map(([z,A])=>l.jsxs("div",{style:{marginBottom:8},children:[l.jsx("div",{className:"form-hint",style:{marginBottom:4},children:z}),l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:A.map(T=>{const oe=g.skillIds.includes(T._id);return l.jsx("button",{type:"button",onClick:()=>v(T._id),className:`skill-chip ${oe?"skill-chip-selected":""}`,children:T.name},T._id)})})]},z))]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Availability Windows"}),l.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap",marginTop:4},children:["Morning","Evening","Weekend","Full Event"].map(z=>l.jsxs("label",{style:{display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#d1d5db",cursor:"pointer"},children:[l.jsx("input",{type:"checkbox",checked:g.availability.includes(z),onChange:()=>J(z),style:{accentColor:"#22c55e"}}),l.jsx("span",{children:z})]},z))})]}),l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Assign to Squad"}),l.jsxs("select",{value:g.teamId,onChange:z=>L({...g,teamId:z.target.value}),className:"form-input",children:[l.jsx("option",{value:"",children:"Leave Unassigned (Ready)"}),d.map(z=>l.jsx("option",{value:z._id,children:z.name},z._id))]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Designated Role"}),l.jsx("input",{type:"text",value:g.role,onChange:z=>L({...g,role:z.target.value}),placeholder:"Stage Crew, Greeter, etc.",className:"form-input"})]})]}),M&&l.jsx("div",{className:"form-error",children:M}),l.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:14},children:[l.jsx("button",{type:"button",onClick:F,className:"btn btn-outline btn-sm",children:"Cancel"}),l.jsx("button",{type:"submit",disabled:$,className:"btn btn-primary btn-sm",children:$?"Adding...":"Save Volunteer"})]})]})]})}):null}const Tf=["#22c55e","#38bdf8","#a855f7","#f59e0b","#ec4899","#14b8a6","#6366f1"],uc={name:"",description:"",color:"#22c55e",targetCapacity:8,leadVolunteerId:"",requiredSkillIds:[]};function Pf({isOpen:o,onClose:w,onTeamCreated:d,onShowToast:P,volunteers:k=[],skills:x=[]}){const[g,L]=O.useState(uc),[$,R]=O.useState(!1),[M,N]=O.useState(""),I=()=>{L(uc),N("")},F=()=>{I(),w()},J=j=>{L(z=>({...z,requiredSkillIds:z.requiredSkillIds.includes(j)?z.requiredSkillIds.filter(A=>A!==j):[...z.requiredSkillIds,j]}))},v=async j=>{if(j.preventDefault(),!g.name.trim()){N("Team name is required");return}R(!0),N("");try{await se.createTeam({name:g.name.trim(),description:g.description.trim(),color:g.color,targetCapacity:Number(g.targetCapacity)||8,leadVolunteerId:g.leadVolunteerId||null,requiredSkillIds:g.requiredSkillIds}),P&&P(`Squad "${g.name}" created!`),I(),d&&d(),w()}catch(z){N(z.message||"Could not create the team")}finally{R(!1)}};if(!o)return null;const D=x.reduce((j,z)=>{var A;return(j[A=z.category||"General"]||(j[A]=[])).push(z),j},{});return l.jsx("div",{className:"modal-backdrop",onClick:F,children:l.jsxs("div",{className:"modal-content",onClick:j=>j.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("div",{style:{width:34,height:34,borderRadius:8,background:"rgba(56, 189, 248, 0.15)",color:"#38bdf8",display:"flex",alignItems:"center",justifyContent:"center"},children:l.jsx(Gl,{size:18})}),l.jsx("h3",{style:{fontSize:17,color:"#f3f4f6"},children:"Create Functional Squad"})]}),l.jsx("button",{onClick:F,className:"close-btn","aria-label":"Close",children:l.jsx(Or,{size:18})})]}),l.jsxs("form",{onSubmit:v,style:{padding:"20px 24px"},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Squad / Team Name *"}),l.jsx("input",{type:"text",required:!0,value:g.name,onChange:j=>L({...g,name:j.target.value}),placeholder:"e.g. Stage operations, Hospitality Crew",className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Description"}),l.jsx("textarea",{rows:2,value:g.description,onChange:j=>L({...g,description:j.target.value}),placeholder:"Primary responsibilities and zone jurisdiction...",className:"form-input"})]}),l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Target Capacity (Volunteers)"}),l.jsx("input",{type:"number",min:"1",max:"50",value:g.targetCapacity,onChange:j=>L({...g,targetCapacity:j.target.value}),className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Squad Lead"}),l.jsxs("select",{value:g.leadVolunteerId,onChange:j=>L({...g,leadVolunteerId:j.target.value}),className:"form-input team-select",children:[l.jsx("option",{value:"",children:"Unassigned"}),k.map(j=>l.jsx("option",{value:j._id,children:j.name},j._id))]}),k.length===0&&l.jsx("span",{className:"form-hint",children:"No volunteers in this event yet."})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{className:"form-label",children:["Required Skills ",l.jsx("span",{className:"form-hint",children:"(drives candidate auto-matching)"})]}),x.length===0?l.jsx("span",{className:"form-hint",children:"No skills defined yet."}):Object.entries(D).map(([j,z])=>l.jsxs("div",{style:{marginBottom:8},children:[l.jsx("div",{className:"form-hint",style:{marginBottom:4},children:j}),l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6},children:z.map(A=>{const T=g.requiredSkillIds.includes(A._id);return l.jsxs("button",{type:"button",onClick:()=>J(A._id),className:`skill-chip ${T?"skill-chip-selected":""}`,children:[T&&l.jsx(Rr,{size:11}),A.name]},A._id)})})]},j)),g.requiredSkillIds.length>0&&l.jsxs("span",{className:"form-hint",children:[g.requiredSkillIds.length," selected"]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Badge Color Accent"}),l.jsx("div",{style:{display:"flex",gap:10,marginTop:4},children:Tf.map(j=>l.jsx("button",{type:"button",onClick:()=>L({...g,color:j}),"aria-label":`Colour ${j}`,style:{width:28,height:28,borderRadius:"50%",background:j,border:g.color===j?"3px solid #ffffff":"2px solid transparent",cursor:"pointer",boxShadow:g.color===j?`0 0 10px ${j}`:"none"}},j))})]}),M&&l.jsx("div",{className:"form-error",children:M}),l.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16},children:[l.jsx("button",{type:"button",onClick:F,className:"btn btn-outline btn-sm",children:"Cancel"}),l.jsx("button",{type:"submit",disabled:$,className:"btn btn-primary btn-sm",children:$?"Creating...":"Create Team"})]})]})]})})}function Lf(o){const w=d=>String(d).padStart(2,"0");return`${o.getFullYear()}-${w(o.getMonth()+1)}-${w(o.getDate())}T${w(o.getHours())}:${w(o.getMinutes())}`}const cc=o=>{var w;return{title:"",description:"",shiftStart:Lf(new Date),shiftEnd:"",priority:"Medium",status:"Pending",teamId:((w=o[0])==null?void 0:w._id)||"",requiredCrew:4,location:"Main Stage",assignees:[]}};function Mf({isOpen:o,onClose:w,teams:d=[],volunteers:P=[],onTaskCreated:k,onShowToast:x}){const[g,L]=O.useState(()=>cc(d)),[$,R]=O.useState(!1),[M,N]=O.useState(""),I=()=>{L(cc(d)),N("")},F=()=>{I(),w()},J=j=>{L(z=>({...z,assignees:z.assignees.includes(j)?z.assignees.filter(A=>A!==j):[...z.assignees,j]}))},v=j=>{L(z=>{const A={...z,shiftStart:j};return z.shiftEnd&&z.shiftEnd<=j&&(A.shiftEnd=""),A})},D=async j=>{if(j.preventDefault(),!g.title.trim()){N("Task title is required");return}if(!g.shiftStart){N("A shift start time is required");return}R(!0),N("");try{await se.createTask({title:g.title.trim(),description:g.description.trim(),shiftStart:new Date(g.shiftStart).toISOString(),shiftEnd:g.shiftEnd?new Date(g.shiftEnd).toISOString():null,priority:g.priority,status:g.status,teamId:g.teamId||null,requiredCrew:Number(g.requiredCrew)||0,location:g.location.trim(),assignees:g.assignees}),x&&x(`Shift/Task "${g.title}" scheduled!`),I(),k&&k(),w()}catch(z){N(z.message||"Could not schedule the task")}finally{R(!1)}};return o?l.jsx("div",{className:"modal-backdrop",onClick:F,children:l.jsxs("div",{className:"modal-content",onClick:j=>j.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[l.jsx("div",{style:{width:34,height:34,borderRadius:8,background:"rgba(245, 158, 11, 0.15)",color:"#fbbf24",display:"flex",alignItems:"center",justifyContent:"center"},children:l.jsx(na,{size:18})}),l.jsx("h3",{style:{fontSize:17,color:"#f3f4f6"},children:"Schedule Shift or Task"})]}),l.jsx("button",{onClick:F,className:"close-btn","aria-label":"Close",children:l.jsx(Or,{size:18})})]}),l.jsxs("form",{onSubmit:D,style:{padding:"20px 24px"},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Task / Shift Title *"}),l.jsx("input",{type:"text",required:!0,value:g.title,onChange:j=>L({...g,title:j.target.value}),placeholder:"e.g. VIP check-in, Soundcheck",className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Description / Instructions"}),l.jsx("textarea",{rows:2,value:g.description,onChange:j=>L({...g,description:j.target.value}),placeholder:"Key responsibilities and step-by-step cue details...",className:"form-input"})]}),l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Shift starts"}),l.jsx("input",{type:"datetime-local",required:!0,value:g.shiftStart,onChange:j=>v(j.target.value),className:"form-input"})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{className:"form-label",children:["Shift ends ",l.jsx("span",{className:"form-hint",children:"(optional)"})]}),l.jsx("input",{type:"datetime-local",min:g.shiftStart||void 0,value:g.shiftEnd,onChange:j=>L({...g,shiftEnd:j.target.value}),className:"form-input"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Location / Zone"}),l.jsx("input",{type:"text",value:g.location,onChange:j=>L({...g,location:j.target.value}),placeholder:"Amphitheater, North Quad Gate B",className:"form-input"})]}),l.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12},children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Priority"}),l.jsxs("select",{value:g.priority,onChange:j=>L({...g,priority:j.target.value}),className:"form-input",children:[l.jsx("option",{value:"High",children:"High (Urgent)"}),l.jsx("option",{value:"Medium",children:"Medium"}),l.jsx("option",{value:"Low",children:"Low"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Assigned Squad"}),l.jsxs("select",{value:g.teamId,onChange:j=>L({...g,teamId:j.target.value}),className:"form-input",children:[l.jsx("option",{value:"",children:"General Crew"}),d.map(j=>l.jsx("option",{value:j._id,children:j.name},j._id))]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{className:"form-label",children:"Crew Needed"}),l.jsx("input",{type:"number",min:"0",max:"50",value:g.requiredCrew,onChange:j=>L({...g,requiredCrew:j.target.value}),className:"form-input"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsxs("label",{className:"form-label",children:["Crew assigned ",l.jsx("span",{className:"form-hint",children:"(this event only)"})]}),P.length===0?l.jsx("span",{className:"form-hint",children:"No volunteers in this event yet."}):l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:6,maxHeight:130,overflowY:"auto"},children:P.map(j=>{const z=g.assignees.includes(j._id);return l.jsx("button",{type:"button",onClick:()=>J(j._id),className:`skill-chip ${z?"skill-chip-selected":""}`,children:j.name},j._id)})}),l.jsxs("span",{className:"form-hint",children:[g.assignees.length," assigned of ",g.requiredCrew||0," needed"]})]}),M&&l.jsx("div",{className:"form-error",children:M}),l.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:16},children:[l.jsx("button",{type:"button",onClick:F,className:"btn btn-outline btn-sm",children:"Cancel"}),l.jsx("button",{type:"submit",disabled:$,className:"btn btn-primary btn-sm",children:$?"Scheduling...":"Save Task"})]})]})]})}):null}function Af({message:o,onClose:w}){return o?l.jsxs("div",{className:"toast-notification",children:[l.jsx(Yl,{size:16,color:"#4ade80"}),l.jsx("span",{children:o}),l.jsx("style",{children:`
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #192019;
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #f3f4f6;
          padding: 12px 18px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
          z-index: 9999;
          animation: toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]}):null}function Rf(){const[o,w]=O.useState(window.location.pathname||"/"),[d,P]=O.useState([]),[k,x]=O.useState(Gi()),[g,L]=O.useState(null),[$,R]=O.useState([]),[M,N]=O.useState([]),[I,F]=O.useState([]),[J,v]=O.useState(null),[D,j]=O.useState([]),[z,A]=O.useState([]),[T,oe]=O.useState(null),[he,Ee]=O.useState(null),[ge,Ve]=O.useState(null),[Be,it]=O.useState(!0),[Ye,Pe]=O.useState(null),[qe,te]=O.useState(!1),[ke,ye]=O.useState(!1),[U,K]=O.useState(!1),V=!!ge,f=(ge==null?void 0:ge.role)==="Coordinator",S=X=>{w(X),window.history.pushState({},"",X),window.scrollTo({top:0,behavior:"smooth"})},ne=O.useCallback(async()=>{try{const X=await se.getHealth();Ee(X.db??null)}catch{Ee(null)}},[]);O.useEffect(()=>{const X=()=>{w(window.location.pathname||"/")};return window.addEventListener("popstate",X),()=>window.removeEventListener("popstate",X)},[]);const Z=O.useCallback(X=>{Pe(X),setTimeout(()=>Pe(null),3200)},[]),ae=O.useCallback(()=>{Xl(),Ve(null),P([]),L(null),R([]),N([]),F([]),v(null),j([]),oe(null),window.history.pushState({},"","/account"),w("/account"),Z("Signed out successfully")},[Z]),ie=O.useCallback(async()=>{try{const X=await se.getEvents();P(X);const Se=Gi();if(!(Se&&X.some(Fe=>Fe._id===Se))){const Fe=X.find(bt=>bt.isActive)||X[0]||null;Yi((Fe==null?void 0:Fe._id)??null),x((Fe==null?void 0:Fe._id)??null)}return X}catch(X){return console.error("Failed to load events:",X),[]}},[]),le=O.useCallback(async()=>{try{const X=await ie(),Se=Gi(),Je=Se&&X.find(Sn=>Sn._id===Se)||X.find(Sn=>Sn.isActive)||X[0]||null;if(Je&&Je._id!==Se&&(Yi(Je._id),x(Je._id)),!Je){L(null),R([]),N([]),F([]),v(null),j([]);return}const[Fe,bt,Pt,Vt,Lt,Bt,Mt,Nn]=await Promise.allSettled([se.getEvent(Je._id),se.getVolunteers(),se.getTeams(),se.getTasks(),se.getTaskMetrics(),se.getMatches(),se.getSystemStatus(),se.getSkills()]);Fe.status==="fulfilled"&&L(Fe.value),bt.status==="fulfilled"&&R(bt.value),Pt.status==="fulfilled"&&N(Pt.value),Vt.status==="fulfilled"&&F(Vt.value),Lt.status==="fulfilled"&&v(Lt.value),Bt.status==="fulfilled"&&j(Bt.value),Mt.status==="fulfilled"&&oe(Mt.value),Nn.status==="fulfilled"&&A(Nn.value)}catch(X){console.error("Failed to load initial data:",X)}},[ie]),pe=O.useCallback(async X=>{Yi(X),x(X),L(null),R([]),N([]),F([]),v(null),j([]);try{const Se=await se.getEvent(X);L(Se);const[Je,Fe,bt,Pt,Vt,Lt]=await Promise.allSettled([se.getVolunteers(),se.getTeams(),se.getTasks(),se.getTaskMetrics(),se.getMatches(),se.getSystemStatus()]);Je.status==="fulfilled"&&R(Je.value),Fe.status==="fulfilled"&&N(Fe.value),bt.status==="fulfilled"&&F(bt.value),Pt.status==="fulfilled"&&v(Pt.value),Vt.status==="fulfilled"&&j(Vt.value),Lt.status==="fulfilled"&&oe(Lt.value)}catch(Se){console.error("Failed to switch event:",Se),Z("Could not load that event")}},[Z]);O.useEffect(()=>{let X=!1;return(async()=>{if(!vc()){it(!1);return}try{const Se=await se.getProfile();!X&&(Se!=null&&Se.user)&&Ve(Se.user)}catch{X||Xl()}finally{X||it(!1)}})(),()=>{X=!0}},[]),O.useEffect(()=>{const X=()=>{Ve(null),window.location.pathname.startsWith("/dashboard")&&(window.history.pushState({},"","/account"),w("/account"))};return window.addEventListener("etb:unauthorized",X),()=>window.removeEventListener("etb:unauthorized",X)},[]),O.useEffect(()=>{ne()},[ne,V]),O.useEffect(()=>{V&&le()},[V]),O.useEffect(()=>{if(Be)return;o.startsWith("/dashboard")&&!V&&(window.history.pushState({},"","/account"),w("/account"))},[Be,V,o]);const xe=(X,Se)=>{Se&&yc(Se),Ve(X),Z(`Welcome back, ${(X==null?void 0:X.name)||"Coordinator"}!`)},Ge=o.startsWith("/dashboard");let St=null;if(o==="/")St=l.jsx(sc,{onNavigate:S,dbStatus:he,onRefreshDb:ne,eventInfo:g,canManageDb:f});else if(o==="/account")St=l.jsx(jf,{onNavigate:S,checkingSession:Be,isAuthenticated:V,onLogout:ae,onLoginSuccess:xe});else if(Ge){let X=null;o==="/dashboard"?X=l.jsx(kf,{eventInfo:g,volunteers:$,teams:M,tasks:I,metrics:J,onNavigate:S,onOpenAddVolunteer:()=>te(!0)}):o==="/dashboard/volunteers"?X=l.jsx(Nf,{volunteers:$,teams:M,onRefresh:le,onOpenAddVolunteer:()=>te(!0),onShowToast:Z}):o==="/dashboard/teams"?X=l.jsx(Sf,{teams:M,volunteers:$,matches:D,onRefresh:le,onShowToast:Z,onOpenCreateTeam:()=>ye(!0)}):o==="/dashboard/tasks"?X=l.jsx(bf,{tasks:I,teams:M,metrics:J,onRefresh:le,onShowToast:Z,onOpenCreateTask:()=>K(!0)}):o==="/dashboard/settings"&&(X=l.jsx(Cf,{eventInfo:g,dbStatus:T,onRefreshDb:le,onRefreshEvent:le,onShowToast:Z})),St=l.jsx(zf,{currentPath:o,onNavigate:S,eventInfo:g,events:d,activeEventId:k,onSwitchEvent:pe,onEventsChanged:ie,dbStatus:T,onRefreshDb:le,user:ge,onLogout:ae,children:X})}else St=l.jsx(sc,{onNavigate:S,dbStatus:he,onRefreshDb:ne,eventInfo:g,canManageDb:f});return l.jsxs("div",{className:"app-root",children:[St,l.jsx(_f,{isOpen:qe,onClose:()=>te(!1),teams:M,skills:z,onVolunteerAdded:le,onShowToast:Z}),l.jsx(Pf,{isOpen:ke,onClose:()=>ye(!1),onTeamCreated:le,onShowToast:Z,volunteers:$,skills:z}),l.jsx(Mf,{isOpen:U,onClose:()=>K(!1),teams:M,volunteers:$,onTaskCreated:le,onShowToast:Z}),l.jsx(Af,{message:Ye,onClose:()=>Pe(null)})]})}zp.createRoot(document.getElementById("root")).render(l.jsx(jp.StrictMode,{children:l.jsx(Rf,{})}));
