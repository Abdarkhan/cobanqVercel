import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{C as r,H as i,S as a,W as o,_ as s,l as c,s as l,w as u}from"./Box-Bp9JKB46.js";var d=t(e()),f=typeof window<`u`?d.useLayoutEffect:d.useEffect;function p(e){let t=d.useRef(e);return f(()=>{t.current=e}),d.useRef((...e)=>(0,t.current)(...e)).current}var m=p;function h(...e){let t=d.useRef(void 0),n=d.useCallback(t=>{let n=e.map(e=>{if(e==null)return null;if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}});return()=>{n.forEach(e=>e?.())}},e);return d.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}var g=h;function _(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},v(e,t)}function y(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,v(e,t)}var b=d.createContext(null);function x(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function S(e,t){var n=function(e){return t&&(0,d.isValidElement)(e)?t(e):e},r=Object.create(null);return e&&d.Children.map(e,function(e){return e}).forEach(function(e){r[e.key]=n(e)}),r}function C(e,t){e||={},t||={};function n(n){return n in t?t[n]:e[n]}var r=Object.create(null),i=[];for(var a in e)a in t?i.length&&(r[a]=i,i=[]):i.push(a);var o,s={};for(var c in t){if(r[c])for(o=0;o<r[c].length;o++){var l=r[c][o];s[r[c][o]]=n(l)}s[c]=n(c)}for(o=0;o<i.length;o++)s[i[o]]=n(i[o]);return s}function w(e,t,n){return n[t]==null?e.props[t]:n[t]}function T(e,t){return S(e.children,function(n){return(0,d.cloneElement)(n,{onExited:t.bind(null,n),in:!0,appear:w(n,`appear`,e),enter:w(n,`enter`,e),exit:w(n,`exit`,e)})})}function E(e,t,n){var r=S(e.children),i=C(t,r);return Object.keys(i).forEach(function(a){var o=i[a];if((0,d.isValidElement)(o)){var s=a in t,c=a in r,l=t[a],u=(0,d.isValidElement)(l)&&!l.props.in;c&&(!s||u)?i[a]=(0,d.cloneElement)(o,{onExited:n.bind(null,o),in:!0,exit:w(o,`exit`,e),enter:w(o,`enter`,e)}):!c&&s&&!u?i[a]=(0,d.cloneElement)(o,{in:!1}):c&&s&&(0,d.isValidElement)(l)&&(i[a]=(0,d.cloneElement)(o,{onExited:n.bind(null,o),in:l.props.in,exit:w(o,`exit`,e),enter:w(o,`enter`,e)}))}}),i}var D=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},O={component:`div`,childFactory:function(e){return e}},k=function(e){y(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.state={contextValue:{isMounting:!0},handleExited:r.handleExited.bind(x(r)),firstRender:!0},r}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n=t.children,r=t.handleExited;return{children:t.firstRender?T(e,r):E(e,n,r),firstRender:!1}},n.handleExited=function(e,t){var n=S(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=o({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=_(e,[`component`,`childFactory`]),i=this.state.contextValue,a=D(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,t===null?d.createElement(b.Provider,{value:i},a):d.createElement(b.Provider,{value:i},d.createElement(t,r,a))},t}(d.Component);k.propTypes={},k.defaultProps=O;var A={};function j(e,t){let n=d.useRef(A);return n.current===A&&(n.current=e(t)),n}var M=[];function N(e){d.useEffect(e,M)}var ee=class e{static create(){return new e}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function P(){let e=j(ee.create).current;return N(e.disposeEffect),e}function F(e){try{return e.matches(`:focus-visible`)}catch{}return!1}var I=class e{static create(){return new e}static use(){let t=j(e.create).current,[n,r]=d.useState(!1);return t.shouldMount=n,t.setShouldMount=r,d.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=L(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function te(){return I.use()}function L(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var R=n();function z(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:c,timeout:l}=e,[f,p]=d.useState(!1),m=u(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),h={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},g=u(n.child,f&&n.childLeaving,r&&n.childPulsate);return!s&&!f&&p(!0),d.useEffect(()=>{if(!s&&c!=null){let e=setTimeout(c,l);return()=>{clearTimeout(e)}}},[c,s,l]),(0,R.jsx)(`span`,{className:m,style:h,children:(0,R.jsx)(`span`,{className:g})})}var B=a(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),V=550,H=i`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,U=i`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,W=i`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;const G=c(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),K=c(z,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${B.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${H};
    animation-duration: ${V}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${B.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${B.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${B.childLeaving} {
    opacity: 0;
    animation-name: ${U};
    animation-duration: ${V}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${B.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${W};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;var ne=d.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=l({props:e,name:`MuiTouchRipple`}),[o,s]=d.useState([]),c=d.useRef(0),f=d.useRef(null);d.useEffect(()=>{f.current&&=(f.current(),null)},[o]);let p=d.useRef(!1),m=P(),h=d.useRef(null),g=d.useRef(null),_=d.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:o}=e;s(e=>[...e,(0,R.jsx)(K,{classes:{ripple:u(r.ripple,B.ripple),rippleVisible:u(r.rippleVisible,B.rippleVisible),ripplePulsate:u(r.ripplePulsate,B.ripplePulsate),child:u(r.child,B.child),childLeaving:u(r.childLeaving,B.childLeaving),childPulsate:u(r.childPulsate,B.childPulsate)},timeout:V,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},c.current)]),c.current+=1,f.current=o},[r]),v=d.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&p.current){p.current=!1;return}e?.type===`touchstart`&&(p.current=!0);let s=o?null:g.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,d;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)d=Math.sqrt((2*c.width**2+c.height**2)/3),d%2==0&&(d+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;d=Math.sqrt(e**2+t**2)}e?.touches?h.current===null&&(h.current=()=>{_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},m.start(80,()=>{h.current&&=(h.current(),null)})):_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},[n,_,m]),y=d.useCallback(()=>{v({},{pulsate:!0})},[v]),b=d.useCallback((e,t)=>{if(m.clear(),e?.type===`touchend`&&h.current){h.current(),h.current=null,m.start(0,()=>{b(e,t)});return}h.current=null,s(e=>e.length>0?e.slice(1):e),f.current=t},[m]);return d.useImperativeHandle(t,()=>({pulsate:y,start:v,stop:b}),[y,v,b]),(0,R.jsx)(G,{className:u(B.root,r.root,i),ref:g,...a,children:(0,R.jsx)(k,{component:null,exit:!0,children:o})})});function q(e){return r(`MuiButtonBase`,e)}var J=a(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),re=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,a=s({root:[`root`,t&&`disabled`,n&&`focusVisible`]},q,i);return n&&r&&(a.root+=` ${r}`),a};const ie=c(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${J.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}});var Y=d.forwardRef(function(e,t){let n=l({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:s=`button`,disabled:c=!1,disableRipple:f=!1,disableTouchRipple:p=!1,focusRipple:h=!1,focusVisibleClassName:_,LinkComponent:v=`a`,onBlur:y,onClick:b,onContextMenu:x,onDragLeave:S,onFocus:C,onFocusVisible:w,onKeyDown:T,onKeyUp:E,onMouseDown:D,onMouseLeave:O,onMouseUp:k,onTouchEnd:A,onTouchMove:j,onTouchStart:M,tabIndex:N=0,TouchRippleProps:ee,touchRippleRef:P,type:I,...L}=n,z=d.useRef(null),B=te(),V=g(B.ref,P),[H,U]=d.useState(!1);c&&H&&U(!1),d.useImperativeHandle(r,()=>({focusVisible:()=>{U(!0),z.current.focus()}}),[]);let W=B.shouldMount&&!f&&!c;d.useEffect(()=>{H&&h&&!f&&B.pulsate()},[f,h,H,B]);let G=X(B,`start`,D,p),K=X(B,`stop`,x,p),q=X(B,`stop`,S,p),J=X(B,`stop`,k,p),Y=X(B,`stop`,e=>{H&&e.preventDefault(),O&&O(e)},p),ae=X(B,`start`,M,p),oe=X(B,`stop`,A,p),se=X(B,`stop`,j,p),ce=X(B,`stop`,e=>{F(e.target)||U(!1),y&&y(e)},!1),le=m(e=>{z.current||=e.currentTarget,F(e.target)&&(U(!0),w&&w(e)),C&&C(e)}),Z=()=>{let e=z.current;return s&&s!==`button`&&!(e.tagName===`A`&&e.href)},ue=m(e=>{h&&!e.repeat&&H&&e.key===` `&&B.stop(e,()=>{B.start(e)}),e.target===e.currentTarget&&Z()&&e.key===` `&&e.preventDefault(),T&&T(e),e.target===e.currentTarget&&Z()&&e.key===`Enter`&&!c&&(e.preventDefault(),b&&b(e))}),de=m(e=>{h&&e.key===` `&&H&&!e.defaultPrevented&&B.stop(e,()=>{B.pulsate(e)}),E&&E(e),b&&e.target===e.currentTarget&&Z()&&e.key===` `&&!e.defaultPrevented&&b(e)}),Q=s;Q===`button`&&(L.href||L.to)&&(Q=v);let $={};if(Q===`button`){let e=!!L.formAction;$.type=I===void 0&&!e?`button`:I,$.disabled=c}else !L.href&&!L.to&&($.role=`button`),c&&($[`aria-disabled`]=c);let fe=g(t,z),pe={...n,centerRipple:i,component:s,disabled:c,disableRipple:f,disableTouchRipple:p,focusRipple:h,tabIndex:N,focusVisible:H},me=re(pe);return(0,R.jsxs)(ie,{as:Q,className:u(me.root,o),ownerState:pe,onBlur:ce,onClick:b,onContextMenu:K,onFocus:le,onKeyDown:ue,onKeyUp:de,onMouseDown:G,onMouseLeave:Y,onMouseUp:J,onDragLeave:q,onTouchEnd:oe,onTouchMove:se,onTouchStart:ae,ref:fe,tabIndex:c?-1:N,type:I,...$,...L,children:[a,W?(0,R.jsx)(ne,{ref:V,center:i,...ee}):null]})});function X(e,t,n,r=!1){return m(i=>(n&&n(i),r||e[t](i),!0))}export{_ as a,p as c,y as i,f as l,P as n,g as o,b as r,h as s,Y as t};