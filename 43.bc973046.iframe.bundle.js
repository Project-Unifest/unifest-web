(self.webpackChunkunifest_web=self.webpackChunkunifest_web||[]).push([[43],{"./node_modules/next/dist/client/components/action-async-storage.external.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"actionAsyncStorage",{enumerable:!0,get:function(){return actionAsyncStorage}});const actionAsyncStorage=(0,__webpack_require__("./node_modules/next/dist/client/components/async-local-storage.js").createAsyncLocalStorage)();("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/async-local-storage.js":(module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"createAsyncLocalStorage",{enumerable:!0,get:function(){return createAsyncLocalStorage}});const sharedAsyncLocalStorageNotAvailableError=new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");class FakeAsyncLocalStorage{disable(){throw sharedAsyncLocalStorageNotAvailableError}getStore(){}run(){throw sharedAsyncLocalStorageNotAvailableError}exit(){throw sharedAsyncLocalStorageNotAvailableError}enterWith(){throw sharedAsyncLocalStorageNotAvailableError}}const maybeGlobalAsyncLocalStorage=globalThis.AsyncLocalStorage;function createAsyncLocalStorage(){return maybeGlobalAsyncLocalStorage?new maybeGlobalAsyncLocalStorage:new FakeAsyncLocalStorage}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/bailout-to-client-rendering.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"bailoutToClientRendering",{enumerable:!0,get:function(){return bailoutToClientRendering}});const _bailouttocsr=__webpack_require__("./node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js"),_staticgenerationasyncstorageexternal=__webpack_require__("./node_modules/next/dist/client/components/static-generation-async-storage.external.js");function bailoutToClientRendering(reason){const staticGenerationStore=_staticgenerationasyncstorageexternal.staticGenerationAsyncStorage.getStore();if(!(null==staticGenerationStore?void 0:staticGenerationStore.forceStatic)&&(null==staticGenerationStore?void 0:staticGenerationStore.isStaticGeneration))throw new _bailouttocsr.BailoutToCSRError(reason)}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/navigation.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{ReadonlyURLSearchParams:function(){return _navigationreactserver.ReadonlyURLSearchParams},RedirectType:function(){return _navigationreactserver.RedirectType},ServerInsertedHTMLContext:function(){return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext},notFound:function(){return _navigationreactserver.notFound},permanentRedirect:function(){return _navigationreactserver.permanentRedirect},redirect:function(){return _navigationreactserver.redirect},useParams:function(){return useParams},usePathname:function(){return usePathname},useRouter:function(){return useRouter},useSearchParams:function(){return useSearchParams},useSelectedLayoutSegment:function(){return useSelectedLayoutSegment},useSelectedLayoutSegments:function(){return useSelectedLayoutSegments},useServerInsertedHTML:function(){return _serverinsertedhtmlsharedruntime.useServerInsertedHTML}});const _react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_approutercontextsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js"),_hooksclientcontextsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js"),_getsegmentvalue=__webpack_require__("./node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js"),_segment=__webpack_require__("./node_modules/next/dist/shared/lib/segment.js"),_navigationreactserver=__webpack_require__("./node_modules/next/dist/client/components/navigation.react-server.js"),_serverinsertedhtmlsharedruntime=__webpack_require__("./node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js");function useSearchParams(){const searchParams=(0,_react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext),readonlySearchParams=(0,_react.useMemo)((()=>searchParams?new _navigationreactserver.ReadonlyURLSearchParams(searchParams):null),[searchParams]);if("undefined"==typeof window){const{bailoutToClientRendering}=__webpack_require__("./node_modules/next/dist/client/components/bailout-to-client-rendering.js");bailoutToClientRendering("useSearchParams()")}return readonlySearchParams}function usePathname(){return(0,_react.useContext)(_hooksclientcontextsharedruntime.PathnameContext)}function useRouter(){const router=(0,_react.useContext)(_approutercontextsharedruntime.AppRouterContext);if(null===router)throw new Error("invariant expected app router to be mounted");return router}function useParams(){return(0,_react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext)}function getSelectedLayoutSegmentPath(tree,parallelRouteKey,first,segmentPath){let node;if(void 0===first&&(first=!0),void 0===segmentPath&&(segmentPath=[]),first)node=tree[1][parallelRouteKey];else{const parallelRoutes=tree[1];var _parallelRoutes_children;node=null!=(_parallelRoutes_children=parallelRoutes.children)?_parallelRoutes_children:Object.values(parallelRoutes)[0]}if(!node)return segmentPath;const segment=node[0],segmentValue=(0,_getsegmentvalue.getSegmentValue)(segment);return!segmentValue||segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)?segmentPath:(segmentPath.push(segmentValue),getSelectedLayoutSegmentPath(node,parallelRouteKey,!1,segmentPath))}function useSelectedLayoutSegments(parallelRouteKey){void 0===parallelRouteKey&&(parallelRouteKey="children");const context=(0,_react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);return context?getSelectedLayoutSegmentPath(context.tree,parallelRouteKey):null}function useSelectedLayoutSegment(parallelRouteKey){void 0===parallelRouteKey&&(parallelRouteKey="children");const selectedLayoutSegments=useSelectedLayoutSegments(parallelRouteKey);if(!selectedLayoutSegments||0===selectedLayoutSegments.length)return null;const selectedLayoutSegment="children"===parallelRouteKey?selectedLayoutSegments[0]:selectedLayoutSegments[selectedLayoutSegments.length-1];return selectedLayoutSegment===_segment.DEFAULT_SEGMENT_KEY?null:selectedLayoutSegment}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/navigation.react-server.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{ReadonlyURLSearchParams:function(){return ReadonlyURLSearchParams},RedirectType:function(){return _redirect.RedirectType},notFound:function(){return _notfound.notFound},permanentRedirect:function(){return _redirect.permanentRedirect},redirect:function(){return _redirect.redirect}});const _redirect=__webpack_require__("./node_modules/next/dist/client/components/redirect.js"),_notfound=__webpack_require__("./node_modules/next/dist/client/components/not-found.js");class ReadonlyURLSearchParamsError extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class ReadonlyURLSearchParams extends URLSearchParams{append(){throw new ReadonlyURLSearchParamsError}delete(){throw new ReadonlyURLSearchParamsError}set(){throw new ReadonlyURLSearchParamsError}sort(){throw new ReadonlyURLSearchParamsError}}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/not-found.js":(module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{isNotFoundError:function(){return isNotFoundError},notFound:function(){return notFound}});const NOT_FOUND_ERROR_CODE="NEXT_NOT_FOUND";function notFound(){const error=new Error(NOT_FOUND_ERROR_CODE);throw error.digest=NOT_FOUND_ERROR_CODE,error}function isNotFoundError(error){return"object"==typeof error&&null!==error&&"digest"in error&&error.digest===NOT_FOUND_ERROR_CODE}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/redirect-status-code.js":(module,exports)=>{"use strict";var RedirectStatusCode;Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"RedirectStatusCode",{enumerable:!0,get:function(){return RedirectStatusCode}}),function(RedirectStatusCode){RedirectStatusCode[RedirectStatusCode.SeeOther=303]="SeeOther",RedirectStatusCode[RedirectStatusCode.TemporaryRedirect=307]="TemporaryRedirect",RedirectStatusCode[RedirectStatusCode.PermanentRedirect=308]="PermanentRedirect"}(RedirectStatusCode||(RedirectStatusCode={})),("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/redirect.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{RedirectType:function(){return RedirectType},getRedirectError:function(){return getRedirectError},getRedirectStatusCodeFromError:function(){return getRedirectStatusCodeFromError},getRedirectTypeFromError:function(){return getRedirectTypeFromError},getURLFromRedirectError:function(){return getURLFromRedirectError},isRedirectError:function(){return isRedirectError},permanentRedirect:function(){return permanentRedirect},redirect:function(){return redirect}});const _requestasyncstorageexternal=__webpack_require__("./node_modules/next/dist/client/components/request-async-storage.external.js"),_actionasyncstorageexternal=__webpack_require__("./node_modules/next/dist/client/components/action-async-storage.external.js"),_redirectstatuscode=__webpack_require__("./node_modules/next/dist/client/components/redirect-status-code.js"),REDIRECT_ERROR_CODE="NEXT_REDIRECT";var RedirectType;function getRedirectError(url,type,statusCode){void 0===statusCode&&(statusCode=_redirectstatuscode.RedirectStatusCode.TemporaryRedirect);const error=new Error(REDIRECT_ERROR_CODE);error.digest=REDIRECT_ERROR_CODE+";"+type+";"+url+";"+statusCode+";";const requestStore=_requestasyncstorageexternal.requestAsyncStorage.getStore();return requestStore&&(error.mutableCookies=requestStore.mutableCookies),error}function redirect(url,type){void 0===type&&(type="replace");const actionStore=_actionasyncstorageexternal.actionAsyncStorage.getStore();throw getRedirectError(url,type,(null==actionStore?void 0:actionStore.isAction)?_redirectstatuscode.RedirectStatusCode.SeeOther:_redirectstatuscode.RedirectStatusCode.TemporaryRedirect)}function permanentRedirect(url,type){void 0===type&&(type="replace");const actionStore=_actionasyncstorageexternal.actionAsyncStorage.getStore();throw getRedirectError(url,type,(null==actionStore?void 0:actionStore.isAction)?_redirectstatuscode.RedirectStatusCode.SeeOther:_redirectstatuscode.RedirectStatusCode.PermanentRedirect)}function isRedirectError(error){if("object"!=typeof error||null===error||!("digest"in error)||"string"!=typeof error.digest)return!1;const[errorCode,type,destination,status]=error.digest.split(";",4),statusCode=Number(status);return errorCode===REDIRECT_ERROR_CODE&&("replace"===type||"push"===type)&&"string"==typeof destination&&!isNaN(statusCode)&&statusCode in _redirectstatuscode.RedirectStatusCode}function getURLFromRedirectError(error){return isRedirectError(error)?error.digest.split(";",3)[2]:null}function getRedirectTypeFromError(error){if(!isRedirectError(error))throw new Error("Not a redirect error");return error.digest.split(";",2)[1]}function getRedirectStatusCodeFromError(error){if(!isRedirectError(error))throw new Error("Not a redirect error");return Number(error.digest.split(";",4)[3])}!function(RedirectType){RedirectType.push="push",RedirectType.replace="replace"}(RedirectType||(RedirectType={})),("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/request-async-storage.external.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{getExpectedRequestStore:function(){return getExpectedRequestStore},requestAsyncStorage:function(){return requestAsyncStorage}});const requestAsyncStorage=(0,__webpack_require__("./node_modules/next/dist/client/components/async-local-storage.js").createAsyncLocalStorage)();function getExpectedRequestStore(callingExpression){const store=requestAsyncStorage.getStore();if(store)return store;throw new Error("`"+callingExpression+"` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context")}("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js":(module,exports)=>{"use strict";function getSegmentValue(segment){return Array.isArray(segment)?segment[1]:segment}Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"getSegmentValue",{enumerable:!0,get:function(){return getSegmentValue}}),("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/client/components/static-generation-async-storage.external.js":(module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"staticGenerationAsyncStorage",{enumerable:!0,get:function(){return staticGenerationAsyncStorage}});const staticGenerationAsyncStorage=(0,__webpack_require__("./node_modules/next/dist/client/components/async-local-storage.js").createAsyncLocalStorage)();("function"==typeof exports.default||"object"==typeof exports.default&&null!==exports.default)&&void 0===exports.default.__esModule&&(Object.defineProperty(exports.default,"__esModule",{value:!0}),Object.assign(exports.default,exports),module.exports=exports.default)},"./node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js":(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{BailoutToCSRError:function(){return BailoutToCSRError},isBailoutToCSRError:function(){return isBailoutToCSRError}});const BAILOUT_TO_CSR="BAILOUT_TO_CLIENT_SIDE_RENDERING";class BailoutToCSRError extends Error{constructor(reason){super("Bail out to client-side rendering: "+reason),this.reason=reason,this.digest=BAILOUT_TO_CSR}}function isBailoutToCSRError(err){return"object"==typeof err&&null!==err&&"digest"in err&&err.digest===BAILOUT_TO_CSR}},"./node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function _export(target,all){for(var name in all)Object.defineProperty(target,name,{enumerable:!0,get:all[name]})}(exports,{ServerInsertedHTMLContext:function(){return ServerInsertedHTMLContext},useServerInsertedHTML:function(){return useServerInsertedHTML}});const _react=__webpack_require__("./node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs")._(__webpack_require__("./node_modules/next/dist/compiled/react/index.js")),ServerInsertedHTMLContext=_react.default.createContext(null);function useServerInsertedHTML(callback){const addInsertedServerHTMLCallback=(0,_react.useContext)(ServerInsertedHTMLContext);addInsertedServerHTMLCallback&&addInsertedServerHTMLCallback(callback)}},"./node_modules/next/navigation.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/client/components/navigation.js")}}]);