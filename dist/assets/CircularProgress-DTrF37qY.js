import{n as e,s as t,t as n}from"./jsx-runtime-C7M7YA1l.js";import{C as r,H as i,S as a,V as o,_ as s,a as c,c as l,i as u,l as d,s as f,w as p}from"./Box-Bp9JKB46.js";var m=t(e()),h=0;function g(e){let[t,n]=m.useState(e),r=e||t;return m.useEffect(()=>{t??(h+=1,n(`mui-${h}`))},[t]),r}var _={...m}.useId;function v(e){if(_!==void 0){let t=_();return e??t}return g(e)}function y(e){return r(`MuiCircularProgress`,e)}a(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDeterminate`,`circleIndeterminate`,`circleDisableShrink`]);var b=n(),x=44,S=i`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,C=i`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,w=typeof S==`string`?null:o`
        animation: ${S} 1.4s linear infinite;
      `,T=typeof C==`string`?null:o`
        animation: ${C} 1.4s ease-in-out infinite;
      `,E=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e;return s({root:[`root`,n,`color${l(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,`circle${l(n)}`,i&&`circleDisableShrink`]},y,t)},D=d(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${l(n.color)}`]]}})(c(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:w||{animation:`${S} 1.4s linear infinite`}},...Object.entries(e.palette).filter(u()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),O=d(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),k=d(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,t[`circle${l(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(c(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:T||{animation:`${C} 1.4s ease-in-out infinite`}}]}))),A=d(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(c(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),j=m.forwardRef(function(e,t){let n=f({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,size:s=40,style:c,thickness:l=3.6,value:u=0,variant:d=`indeterminate`,...m}=n,h={...n,color:i,disableShrink:a,size:s,thickness:l,value:u,variant:d,enableTrackSlot:o},g=E(h),_={},v={},y={};if(d===`determinate`){let e=2*Math.PI*((x-l)/2);_.strokeDasharray=e.toFixed(3),y[`aria-valuenow`]=Math.round(u),_.strokeDashoffset=`${((100-u)/100*e).toFixed(3)}px`,v.transform=`rotate(-90deg)`}return(0,b.jsx)(D,{className:p(g.root,r),style:{width:s,height:s,...v,...c},ownerState:h,ref:t,role:`progressbar`,...y,...m,children:(0,b.jsxs)(O,{className:g.svg,ownerState:h,viewBox:`${x/2} ${x/2} ${x} ${x}`,children:[o?(0,b.jsx)(A,{className:g.track,ownerState:h,cx:x,cy:x,r:(x-l)/2,fill:`none`,strokeWidth:l,"aria-hidden":`true`}):null,(0,b.jsx)(k,{className:g.circle,style:_,ownerState:h,cx:x,cy:x,r:(x-l)/2,fill:`none`,strokeWidth:l})]})})});export{v as n,j as t};