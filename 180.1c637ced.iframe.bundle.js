"use strict";(self.webpackChunkunifest_web=self.webpackChunkunifest_web||[]).push([[180],{"./node_modules/@formkit/auto-animate/react/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>useAutoAnimate});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const parents=new Set,coords=new WeakMap,siblings=new WeakMap,animations=new WeakMap,intersections=new WeakMap,intervals=new WeakMap,options=new WeakMap,debounces=new WeakMap,enabled=new WeakSet;let root,scrollX=0,scrollY=0;const TGT="__aa_tgt",DEL="__aa_del",NEW="__aa_new",handleMutations=mutations=>{const elements=function getElements(mutations){const observedNodes=mutations.reduce(((nodes,mutation)=>[...nodes,...Array.from(mutation.addedNodes),...Array.from(mutation.removedNodes)]),[]);return!observedNodes.every((node=>"#comment"===node.nodeName))&&mutations.reduce(((elements,mutation)=>{if(!1===elements)return!1;if(mutation.target instanceof Element){if(target(mutation.target),!elements.has(mutation.target)){elements.add(mutation.target);for(let i=0;i<mutation.target.children.length;i++){const child=mutation.target.children.item(i);if(child){if(DEL in child)return!1;target(mutation.target,child),elements.add(child)}}}if(mutation.removedNodes.length)for(let i=0;i<mutation.removedNodes.length;i++){const child=mutation.removedNodes[i];if(DEL in child)return!1;child instanceof Element&&(elements.add(child),target(mutation.target,child),siblings.set(child,[mutation.previousSibling,mutation.nextSibling]))}}return elements}),new Set)}(mutations);elements&&elements.forEach((el=>function animate(el){var _a;const isMounted=el.isConnected,preExisting=coords.has(el);isMounted&&siblings.has(el)&&siblings.delete(el);animations.has(el)&&(null===(_a=animations.get(el))||void 0===_a||_a.cancel());NEW in el?add(el):preExisting&&isMounted?function remain(el){const oldCoords=coords.get(el),newCoords=getCoords(el);if(!isEnabled(el))return coords.set(el,newCoords);let animation;if(!oldCoords)return;const pluginOrOptions=getOptions(el);if("function"!=typeof pluginOrOptions){const deltaX=oldCoords.left-newCoords.left,deltaY=oldCoords.top-newCoords.top,[widthFrom,widthTo,heightFrom,heightTo]=getTransitionSizes(el,oldCoords,newCoords),start={transform:`translate(${deltaX}px, ${deltaY}px)`},end={transform:"translate(0, 0)"};widthFrom!==widthTo&&(start.width=`${widthFrom}px`,end.width=`${widthTo}px`),heightFrom!==heightTo&&(start.height=`${heightFrom}px`,end.height=`${heightTo}px`),animation=el.animate([start,end],{duration:pluginOrOptions.duration,easing:pluginOrOptions.easing})}else{const[keyframes]=getPluginTuple(pluginOrOptions(el,"remain",oldCoords,newCoords));animation=new Animation(keyframes),animation.play()}animations.set(el,animation),coords.set(el,newCoords),animation.addEventListener("finish",updatePos.bind(null,el))}(el):preExisting&&!isMounted?function remove(el){var _a;if(!siblings.has(el)||!coords.has(el))return;const[prev,next]=siblings.get(el);Object.defineProperty(el,DEL,{value:!0,configurable:!0});const finalX=window.scrollX,finalY=window.scrollY;next&&next.parentNode&&next.parentNode instanceof Element?next.parentNode.insertBefore(el,next):prev&&prev.parentNode?prev.parentNode.appendChild(el):null===(_a=getTarget(el))||void 0===_a||_a.appendChild(el);if(!isEnabled(el))return cleanUp(el);const[top,left,width,height]=function deletePosition(el){const oldCoords=coords.get(el),[width,,height]=getTransitionSizes(el,oldCoords,getCoords(el));let offsetParent=el.parentElement;for(;offsetParent&&("static"===getComputedStyle(offsetParent).position||offsetParent instanceof HTMLBodyElement);)offsetParent=offsetParent.parentElement;offsetParent||(offsetParent=document.body);const parentStyles=getComputedStyle(offsetParent),parentCoords=coords.get(offsetParent)||getCoords(offsetParent),top=Math.round(oldCoords.top-parentCoords.top)-raw(parentStyles.borderTopWidth),left=Math.round(oldCoords.left-parentCoords.left)-raw(parentStyles.borderLeftWidth);return[top,left,width,height]}(el),optionsOrPlugin=getOptions(el),oldCoords=coords.get(el);finalX===scrollX&&finalY===scrollY||function adjustScroll(el,finalX,finalY,optionsOrPlugin){const scrollDeltaX=scrollX-finalX,scrollDeltaY=scrollY-finalY,scrollBefore=document.documentElement.style.scrollBehavior;"smooth"===getComputedStyle(root).scrollBehavior&&(document.documentElement.style.scrollBehavior="auto");if(window.scrollTo(window.scrollX+scrollDeltaX,window.scrollY+scrollDeltaY),!el.parentElement)return;const parent=el.parentElement;let lastHeight=parent.clientHeight,lastWidth=parent.clientWidth;const startScroll=performance.now();function smoothScroll(){requestAnimationFrame((()=>{if(!isPlugin(optionsOrPlugin)){const deltaY=lastHeight-parent.clientHeight,deltaX=lastWidth-parent.clientWidth;startScroll+optionsOrPlugin.duration>performance.now()?(window.scrollTo({left:window.scrollX-deltaX,top:window.scrollY-deltaY}),lastHeight=parent.clientHeight,lastWidth=parent.clientWidth,smoothScroll()):document.documentElement.style.scrollBehavior=scrollBefore}}))}smoothScroll()}(el,finalX,finalY,optionsOrPlugin);let animation,styleReset={position:"absolute",top:`${top}px`,left:`${left}px`,width:`${width}px`,height:`${height}px`,margin:"0",pointerEvents:"none",transformOrigin:"center",zIndex:"100"};if(isPlugin(optionsOrPlugin)){const[keyframes,options]=getPluginTuple(optionsOrPlugin(el,"remove",oldCoords));!1!==(null==options?void 0:options.styleReset)&&(styleReset=(null==options?void 0:options.styleReset)||styleReset,Object.assign(el.style,styleReset)),animation=new Animation(keyframes),animation.play()}else Object.assign(el.style,styleReset),animation=el.animate([{transform:"scale(1)",opacity:1},{transform:"scale(.98)",opacity:0}],{duration:optionsOrPlugin.duration,easing:"ease-out"});animations.set(el,animation),animation.addEventListener("finish",cleanUp.bind(null,el,styleReset))}(el):add(el)}(el)))},handleResizes=entries=>{entries.forEach((entry=>{entry.target===root&&function updateAllPos(){clearTimeout(debounces.get(root)),debounces.set(root,setTimeout((()=>{parents.forEach((parent=>forEach(parent,(el=>lowPriority((()=>updatePos(el)))))))}),100))}(),coords.has(entry.target)&&updatePos(entry.target)}))};function updatePos(el){clearTimeout(debounces.get(el));const optionsOrPlugin=getOptions(el),delay=isPlugin(optionsOrPlugin)?500:optionsOrPlugin.duration;debounces.set(el,setTimeout((async()=>{const currentAnimation=animations.get(el);try{await(null==currentAnimation?void 0:currentAnimation.finished),coords.set(el,getCoords(el)),function observePosition(el){const oldObserver=intersections.get(el);null==oldObserver||oldObserver.disconnect();let rect=coords.get(el),invocations=0;rect||(rect=getCoords(el),coords.set(el,rect));const{offsetWidth,offsetHeight}=root,rootMargin=[rect.top-5,offsetWidth-(rect.left+5+rect.width),offsetHeight-(rect.top+5+rect.height),rect.left-5].map((px=>-1*Math.floor(px)+"px")).join(" "),observer=new IntersectionObserver((()=>{++invocations>1&&updatePos(el)}),{root,threshold:1,rootMargin});observer.observe(el),intersections.set(el,observer)}(el)}catch{}}),delay))}function poll(el){setTimeout((()=>{intervals.set(el,setInterval((()=>lowPriority(updatePos.bind(null,el))),2e3))}),Math.round(2e3*Math.random()))}function lowPriority(callback){"function"==typeof requestIdleCallback?requestIdleCallback((()=>callback())):requestAnimationFrame((()=>callback()))}let mutations,resize;function target(el,child){child||TGT in el?child&&!(TGT in child)&&Object.defineProperty(child,TGT,{value:el}):Object.defineProperty(el,TGT,{value:el})}function raw(str){return Number(str.replace(/[^0-9.\-]/g,""))}function getCoords(el){const rect=el.getBoundingClientRect(),{x,y}=function getScrollOffset(el){let p=el.parentElement;for(;p;){if(p.scrollLeft||p.scrollTop)return{x:p.scrollLeft,y:p.scrollTop};p=p.parentElement}return{x:0,y:0}}(el);return{top:rect.top+y,left:rect.left+x,width:rect.width,height:rect.height}}function getTransitionSizes(el,oldCoords,newCoords){let widthFrom=oldCoords.width,heightFrom=oldCoords.height,widthTo=newCoords.width,heightTo=newCoords.height;const styles=getComputedStyle(el);if("content-box"===styles.getPropertyValue("box-sizing")){const paddingY=raw(styles.paddingTop)+raw(styles.paddingBottom)+raw(styles.borderTopWidth)+raw(styles.borderBottomWidth),paddingX=raw(styles.paddingLeft)+raw(styles.paddingRight)+raw(styles.borderRightWidth)+raw(styles.borderLeftWidth);widthFrom-=paddingX,widthTo-=paddingX,heightFrom-=paddingY,heightTo-=paddingY}return[widthFrom,widthTo,heightFrom,heightTo].map(Math.round)}function getOptions(el){return TGT in el&&options.has(el[TGT])?options.get(el[TGT]):{duration:250,easing:"ease-in-out"}}function getTarget(el){if(TGT in el)return el[TGT]}function isEnabled(el){const target=getTarget(el);return!!target&&enabled.has(target)}function forEach(parent,...callbacks){callbacks.forEach((callback=>callback(parent,options.has(parent))));for(let i=0;i<parent.children.length;i++){const child=parent.children.item(i);child&&callbacks.forEach((callback=>callback(child,options.has(child))))}}function getPluginTuple(pluginReturn){return Array.isArray(pluginReturn)?pluginReturn:[pluginReturn]}function isPlugin(config){return"function"==typeof config}function add(el){NEW in el&&delete el[NEW];const newCoords=getCoords(el);coords.set(el,newCoords);const pluginOrOptions=getOptions(el);if(!isEnabled(el))return;let animation;if("function"!=typeof pluginOrOptions)animation=el.animate([{transform:"scale(.98)",opacity:0},{transform:"scale(0.98)",opacity:0,offset:.5},{transform:"scale(1)",opacity:1}],{duration:1.5*pluginOrOptions.duration,easing:"ease-in"});else{const[keyframes]=getPluginTuple(pluginOrOptions(el,"add",newCoords));animation=new Animation(keyframes),animation.play()}animations.set(el,animation),animation.addEventListener("finish",updatePos.bind(null,el))}function cleanUp(el,styles){var _a;el.remove(),coords.delete(el),siblings.delete(el),animations.delete(el),null===(_a=intersections.get(el))||void 0===_a||_a.disconnect(),setTimeout((()=>{if(DEL in el&&delete el[DEL],Object.defineProperty(el,NEW,{value:!0,configurable:!0}),styles&&el instanceof HTMLElement)for(const style in styles)el.style[style]=""}),0)}function autoAnimate(el,config={}){if(mutations&&resize){window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!isPlugin(config)&&!config.disrespectUserMotionPreference||(enabled.add(el),"static"===getComputedStyle(el).position&&Object.assign(el.style,{position:"relative"}),forEach(el,updatePos,poll,(element=>null==resize?void 0:resize.observe(element))),isPlugin(config)?options.set(el,config):options.set(el,{duration:250,easing:"ease-in-out",...config}),mutations.observe(el,{childList:!0}),parents.add(el))}return Object.freeze({parent:el,enable:()=>{enabled.add(el)},disable:()=>{enabled.delete(el)},isEnabled:()=>enabled.has(el)})}"undefined"!=typeof window&&"ResizeObserver"in window&&(root=document.documentElement,mutations=new MutationObserver(handleMutations),resize=new ResizeObserver(handleResizes),window.addEventListener("scroll",(()=>{scrollY=window.scrollY,scrollX=window.scrollX})),resize.observe(root));function useAutoAnimate(options){const[controller,setController]=(0,react.useState)(),memoizedOptions=(0,react.useMemo)((()=>options),[]),element=(0,react.useCallback)((node=>{node instanceof HTMLElement?setController(autoAnimate(node,memoizedOptions)):setController(void 0)}),[memoizedOptions]),setEnabled=(0,react.useCallback)((enabled=>{controller&&(enabled?controller.enable():controller.disable())}),[controller]);return[element,setEnabled]}}}]);