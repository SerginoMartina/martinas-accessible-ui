import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{f as t}from"./iframe-DFr8B_N_.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./Button-jAWRMLDw.js";import{n as a,t as o}from"./ProgressBar-IiBNZFle.js";function s(){let[e,t]=(0,c.useState)(15);return(0,l.jsxs)(`div`,{className:`w-96 space-y-4`,children:[(0,l.jsx)(o,{progress:e,label:`Upload progress`,valueText:`${e}% complete`}),(0,l.jsxs)(`div`,{className:`flex gap-2`,children:[(0,l.jsx)(i,{variant:`outline`,onClick:()=>t(e=>Math.max(0,e-10)),children:`Decrease progress`}),(0,l.jsx)(i,{onClick:()=>t(e=>Math.min(100,e+10)),children:`Advance progress`})]}),(0,l.jsx)(`p`,{role:`status`,"aria-live":`polite`,children:e===100?`Upload complete.`:`Upload ${e}% complete.`})]})}var c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{c=t(),a(),r(),l=n(),u={title:`Atoms/ProgressBar`,component:o,parameters:{layout:`centered`},tags:[`autodocs`]},d={args:{progress:65,label:`Loading Progress`}},f={args:{progress:100,color:`success`,label:`Complete`}},p={render:()=>(0,l.jsx)(s,{})},m={args:{label:`Preparing upload`}},h=[`Default`,`Success`,`Interactive`,`Indeterminate`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    progress: 65,
    label: 'Loading Progress'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    progress: 100,
    color: 'success',
    label: 'Complete'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <InteractiveProgress />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Preparing upload'
  }
}`,...m.parameters?.docs?.source}}}})))()}g();export{d as Default,m as Indeterminate,p as Interactive,f as Success,h as __namedExportsOrder,u as default};