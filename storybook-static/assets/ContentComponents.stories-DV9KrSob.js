import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{f as t}from"./iframe-DFr8B_N_.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";function r({title:e,description:t,eyebrow:n,actions:r=[],image:i,headingLevel:a=`h1`,className:o=``}){let s=(0,l.useId)();return(0,u.jsxs)(`section`,{"aria-labelledby":s,className:`grid gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 md:items-center md:p-12 ${o}`,children:[(0,u.jsxs)(`div`,{children:[n&&(0,u.jsx)(`p`,{className:`mb-3 text-sm font-semibold uppercase tracking-wide text-blue-800`,children:n}),(0,u.jsx)(a,{id:s,className:`text-3xl font-bold tracking-tight text-slate-950 md:text-4xl`,children:e}),t&&(0,u.jsx)(`div`,{className:`mt-4 max-w-prose text-base leading-7 text-slate-700`,children:t}),r.length>0&&(0,u.jsx)(`ul`,{className:`mt-6 flex flex-wrap gap-3`,children:r.map((e,t)=>(0,u.jsx)(`li`,{children:(0,u.jsx)(`a`,{href:e.href,className:`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${t===0?`bg-blue-700 text-white hover:bg-blue-800`:`border border-slate-400 bg-white text-slate-900 hover:bg-slate-50`}`,children:e.label})},`${e.href}-${e.label}`))})]}),i&&(0,u.jsx)(`img`,{src:i.src,alt:i.alt,className:`max-h-80 w-full rounded-xl object-cover`})]})}function i({items:e,ordered:t=!1,label:n,className:r=``}){return(0,u.jsx)(t?`ol`:`ul`,{"aria-label":n,className:`${t?`list-decimal`:`list-disc`} space-y-2 pl-6 text-slate-800 marker:text-blue-700 ${r}`,children:e.map(e=>(0,u.jsx)(`li`,{children:e.content},e.id))})}function a({title:e,children:t,eyebrow:n,author:r,published:i,image:a,headingLevel:o=`h2`,className:s=``}){let c=(0,l.useId)();return(0,u.jsxs)(`article`,{"aria-labelledby":c,className:`max-w-prose rounded-xl border border-slate-200 bg-white p-6 ${s}`,children:[a&&(0,u.jsxs)(`figure`,{className:`mb-6`,children:[(0,u.jsx)(`img`,{src:a.src,alt:a.alt,loading:`lazy`,className:`max-h-96 w-full rounded-lg object-cover`}),a.caption&&(0,u.jsx)(`figcaption`,{className:`mt-2 text-sm leading-6 text-slate-600`,children:a.caption})]}),(0,u.jsxs)(`header`,{children:[n&&(0,u.jsx)(`p`,{className:`text-sm font-semibold uppercase tracking-wide text-blue-800`,children:n}),(0,u.jsx)(o,{id:c,className:`mt-2 text-2xl font-semibold text-slate-950`,children:e}),(r||i)&&(0,u.jsxs)(`p`,{className:`mt-2 text-sm text-slate-600`,children:[r&&(0,u.jsxs)(`span`,{children:[`By `,r]}),r&&i&&(0,u.jsx)(`span`,{"aria-hidden":`true`,children:` · `}),i&&(0,u.jsx)(`time`,{dateTime:i.dateTime,children:i.label})]})]}),(0,u.jsx)(`div`,{className:`mt-5 space-y-4 leading-7 text-slate-700`,children:t})]})}function o({label:e,links:t,className:n=``}){let r=(0,l.useId)();return(0,u.jsx)(`nav`,{"aria-label":e,className:n,children:(0,u.jsx)(`ul`,{className:`divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white`,children:t.map((e,t)=>(0,u.jsx)(`li`,{children:(0,u.jsxs)(`a`,{href:e.href,"aria-labelledby":`${r}-label-${t}`,"aria-describedby":e.description?`${r}-description-${t}`:void 0,className:`block rounded-md px-4 py-3 text-blue-800 underline decoration-blue-300 underline-offset-4 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-700`,children:[(0,u.jsx)(`span`,{id:`${r}-label-${t}`,className:`font-medium`,children:e.label}),e.description&&(0,u.jsx)(`span`,{id:`${r}-description-${t}`,className:`mt-1 block text-sm leading-5 text-slate-600`,children:e.description})]})},`${e.href}-${e.label}`))})})}function s({items:e,headingLevel:t=`h3`,className:n=``}){return(0,u.jsx)(`ul`,{className:`grid gap-4 sm:grid-cols-2 ${n}`,children:e.map(e=>(0,u.jsxs)(`li`,{className:`flex gap-3 rounded-lg border border-slate-200 bg-white p-4`,children:[(0,u.jsx)(`span`,{"aria-hidden":`true`,className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-800`,children:e.icon}),(0,u.jsxs)(`div`,{children:[(0,u.jsx)(t,{className:`font-semibold text-slate-950`,children:e.title}),e.description&&(0,u.jsx)(`div`,{className:`mt-1 text-sm leading-6 text-slate-700`,children:e.description})]})]},e.id))})}function c({title:e,description:t,action:n,secondaryAction:r,headingLevel:i=`h2`,className:a=``}){let o=(0,l.useId)();return(0,u.jsxs)(`section`,{"aria-labelledby":o,className:`flex flex-col gap-5 rounded-xl bg-slate-900 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8 ${a}`,children:[(0,u.jsxs)(`div`,{className:`max-w-2xl`,children:[(0,u.jsx)(i,{id:o,className:`text-2xl font-semibold`,children:e}),t&&(0,u.jsx)(`div`,{className:`mt-2 leading-6 text-slate-200`,children:t})]}),(0,u.jsx)(`ul`,{className:`flex shrink-0 flex-wrap gap-3`,children:[n,...r?[r]:[]].map((e,t)=>(0,u.jsx)(`li`,{children:(0,u.jsx)(`a`,{href:e.href,className:`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${t===0?`bg-white text-slate-950 hover:bg-slate-100`:`border border-slate-300 text-white hover:bg-slate-800`}`,children:e.label})},`${e.href}-${e.label}`))})]})}var l,u;function d(){return(d=e((()=>{l=t(),u=n(),r.__docgenInfo={description:``,methods:[],displayName:`Hero`,props:{title:{required:!0,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`ReactNode`},description:``},eyebrow:{required:!1,tsType:{name:`string`},description:``},actions:{required:!1,tsType:{name:`Array`,elements:[{name:`ContentAction`}],raw:`ContentAction[]`},description:``,defaultValue:{value:`[]`,computed:!1}},image:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ src: string; alt: string }`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}}]}},description:``},headingLevel:{required:!1,tsType:{name:`union`,raw:`'h1' | 'h2' | 'h3'`,elements:[{name:`literal`,value:`'h1'`},{name:`literal`,value:`'h2'`},{name:`literal`,value:`'h3'`}]},description:``,defaultValue:{value:`'h1'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`''`,computed:!1}}}},i.__docgenInfo={description:``,methods:[],displayName:`ContentList`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`ContentListItem`}],raw:`ContentListItem[]`},description:``},ordered:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`''`,computed:!1}}}},a.__docgenInfo={description:``,methods:[],displayName:`Article`,props:{title:{required:!0,tsType:{name:`string`},description:``},children:{required:!0,tsType:{name:`ReactNode`},description:``},eyebrow:{required:!1,tsType:{name:`string`},description:``},author:{required:!1,tsType:{name:`string`},description:``},published:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ dateTime: string; label: string }`,signature:{properties:[{key:`dateTime`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}}]}},description:``},image:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{ src: string; alt: string; caption?: ReactNode }`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!0}},{key:`caption`,value:{name:`ReactNode`,required:!1}}]}},description:``},headingLevel:{required:!1,tsType:{name:`union`,raw:`'h2' | 'h3' | 'h4'`,elements:[{name:`literal`,value:`'h2'`},{name:`literal`,value:`'h3'`},{name:`literal`,value:`'h4'`}]},description:``,defaultValue:{value:`'h2'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`''`,computed:!1}}}},o.__docgenInfo={description:``,methods:[],displayName:`LinkList`,props:{label:{required:!0,tsType:{name:`string`},description:``},links:{required:!0,tsType:{name:`Array`,elements:[{name:`LinkListItem`}],raw:`LinkListItem[]`},description:``},className:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`''`,computed:!1}}}},s.__docgenInfo={description:``,methods:[],displayName:`IconList`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`IconListItem`}],raw:`IconListItem[]`},description:``},headingLevel:{required:!1,tsType:{name:`union`,raw:`'h2' | 'h3' | 'h4'`,elements:[{name:`literal`,value:`'h2'`},{name:`literal`,value:`'h3'`},{name:`literal`,value:`'h4'`}]},description:``,defaultValue:{value:`'h3'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`''`,computed:!1}}}},c.__docgenInfo={description:``,methods:[],displayName:`CTABanner`,props:{title:{required:!0,tsType:{name:`string`},description:``},description:{required:!1,tsType:{name:`ReactNode`},description:``},action:{required:!0,tsType:{name:`ContentAction`},description:``},secondaryAction:{required:!1,tsType:{name:`ContentAction`},description:``},headingLevel:{required:!1,tsType:{name:`union`,raw:`'h2' | 'h3' | 'h4'`,elements:[{name:`literal`,value:`'h2'`},{name:`literal`,value:`'h3'`},{name:`literal`,value:`'h4'`}]},description:``,defaultValue:{value:`'h2'`,computed:!1}},className:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`''`,computed:!1}}}}})))()}var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{d(),f=n(),p={title:`Content patterns`,tags:[`autodocs`]},m={render:()=>(0,f.jsx)(r,{eyebrow:`Accessible by design`,title:`Build experiences everyone can use`,description:`A concise introduction helps visitors understand the purpose of the page and choose a useful next step.`,actions:[{label:`Explore the library`,href:`#library`},{label:`Read the guide`,href:`#guide`}],image:{src:`data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 400%22%3E%3Crect width=%22640%22 height=%22400%22 fill=%22%23e0f2fe%22/%3E%3Cpath d=%22M0 310h640v90H0z%22 fill=%22%23bfdbfe%22/%3E%3Crect x=%22100%22 y=%22105%22 width=%22440%22 height=%22200%22 rx=%2218%22 fill=%22%23fff%22/%3E%3Crect x=%22135%22 y=%22140%22 width=%22180%22 height=%2218%22 rx=%229%22 fill=%22%232563eb%22/%3E%3Crect x=%22135%22 y=%22178%22 width=%22370%22 height=%2210%22 rx=%225%22 fill=%22%2394a3b8%22/%3E%3Crect x=%22135%22 y=%22204%22 width=%22300%22 height=%2210%22 rx=%225%22 fill=%22%23cbd5e1%22/%3E%3Ccircle cx=%22155%22 cy=%22260%22 r=%2220%22 fill=%22%2322c55e%22/%3E%3Cpath d=%22m146 260 7 7 13-15%22 fill=%22none%22 stroke=%22white%22 stroke-width=%224%22/%3E%3C/svg%3E`,alt:`Illustration of an accessible content card with a completed status`}})},h={render:()=>(0,f.jsxs)(`div`,{className:`grid gap-6 sm:grid-cols-2`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`h2`,{className:`mb-3 font-semibold`,children:`Related principles`}),(0,f.jsx)(i,{items:[{id:`semantic`,content:`Use semantic HTML`},{id:`keyboard`,content:`Support keyboard interaction`},{id:`feedback`,content:`Provide clear feedback`}]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`h2`,{className:`mb-3 font-semibold`,children:`Getting started`}),(0,f.jsx)(i,{ordered:!0,items:[{id:`install`,content:`Install the package`},{id:`import`,content:`Import a component`},{id:`test`,content:`Test it with a keyboard`}]})]})]})},g={render:()=>(0,f.jsxs)(a,{eyebrow:`Accessibility`,title:`Designing useful status messages`,author:`Martina`,published:{dateTime:`2026-10-09`,label:`October 9, 2026`},image:{src:`data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23dbeafe%22/%3E%3Crect x=%2270%22 y=%2255%22 width=%22500%22 height=%22250%22 rx=%2218%22 fill=%22white%22/%3E%3Crect x=%22105%22 y=%2290%22 width=%22220%22 height=%2222%22 rx=%2211%22 fill=%22%231e3a8a%22/%3E%3Crect x=%22105%22 y=%22135%22 width=%22425%22 height=%2212%22 rx=%226%22 fill=%22%2394a3b8%22/%3E%3C/svg%3E`,alt:`Illustration of a status message in a user interface`,caption:`Status messages should be clear without relying on color.`},children:[(0,f.jsx)(`p`,{children:`Explain what happened and what the user can do next. Use text in addition to color.`}),(0,f.jsx)(`p`,{children:`Choose announcement urgency based on how important the update is to the current task.`})]})},_={render:()=>(0,f.jsx)(o,{label:`Accessibility resources`,links:[{href:`#keyboard`,label:`Keyboard testing guide`,description:`Review focus order and interaction without a pointer.`},{href:`#screen-reader`,label:`Screen reader testing`,description:`Check names, roles, states, and announcements.`},{href:`#contrast`,label:`Color contrast guidance`,description:`Make text and controls perceivable.`}]})},v={render:()=>(0,f.jsx)(s,{items:[{id:`keyboard`,icon:`⌨`,title:`Keyboard ready`,description:`Reach interactive controls without a mouse.`},{id:`contrast`,icon:`◐`,title:`Clear contrast`,description:`Read labels and status in varied lighting.`},{id:`feedback`,icon:`✓`,title:`Helpful feedback`,description:`Understand errors and how to resolve them.`},{id:`responsive`,icon:`↔`,title:`Responsive layouts`,description:`Use the interface at different screen sizes.`}]})},y={render:()=>(0,f.jsx)(c,{title:`Ready to improve your interface?`,description:`Explore accessible patterns and use them in your next project.`,action:{label:`Browse components`,href:`#components`},secondaryAction:{label:`Read the guide`,href:`#guide`}})},b=[`PageHero`,`OrderedAndUnorderedLists`,`ArticleCard`,`ResourceLinkList`,`FeatureIconList`,`CallToActionBanner`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Hero eyebrow="Accessible by design" title="Build experiences everyone can use" description="A concise introduction helps visitors understand the purpose of the page and choose a useful next step." actions={[{
    label: 'Explore the library',
    href: '#library'
  }, {
    label: 'Read the guide',
    href: '#guide'
  }]} image={{
    src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 400%22%3E%3Crect width=%22640%22 height=%22400%22 fill=%22%23e0f2fe%22/%3E%3Cpath d=%22M0 310h640v90H0z%22 fill=%22%23bfdbfe%22/%3E%3Crect x=%22100%22 y=%22105%22 width=%22440%22 height=%22200%22 rx=%2218%22 fill=%22%23fff%22/%3E%3Crect x=%22135%22 y=%22140%22 width=%22180%22 height=%2218%22 rx=%229%22 fill=%22%232563eb%22/%3E%3Crect x=%22135%22 y=%22178%22 width=%22370%22 height=%2210%22 rx=%225%22 fill=%22%2394a3b8%22/%3E%3Crect x=%22135%22 y=%22204%22 width=%22300%22 height=%2210%22 rx=%225%22 fill=%22%23cbd5e1%22/%3E%3Ccircle cx=%22155%22 cy=%22260%22 r=%2220%22 fill=%22%2322c55e%22/%3E%3Cpath d=%22m146 260 7 7 13-15%22 fill=%22none%22 stroke=%22white%22 stroke-width=%224%22/%3E%3C/svg%3E',
    alt: 'Illustration of an accessible content card with a completed status'
  }} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h2 className="mb-3 font-semibold">Related principles</h2>
        <ContentList items={[{
        id: 'semantic',
        content: 'Use semantic HTML'
      }, {
        id: 'keyboard',
        content: 'Support keyboard interaction'
      }, {
        id: 'feedback',
        content: 'Provide clear feedback'
      }]} />
      </div>
      <div>
        <h2 className="mb-3 font-semibold">Getting started</h2>
        <ContentList ordered items={[{
        id: 'install',
        content: 'Install the package'
      }, {
        id: 'import',
        content: 'Import a component'
      }, {
        id: 'test',
        content: 'Test it with a keyboard'
      }]} />
      </div>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Article eyebrow="Accessibility" title="Designing useful status messages" author="Martina" published={{
    dateTime: '2026-10-09',
    label: 'October 9, 2026'
  }} image={{
    src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 360%22%3E%3Crect width=%22640%22 height=%22360%22 fill=%22%23dbeafe%22/%3E%3Crect x=%2270%22 y=%2255%22 width=%22500%22 height=%22250%22 rx=%2218%22 fill=%22white%22/%3E%3Crect x=%22105%22 y=%2290%22 width=%22220%22 height=%2222%22 rx=%2211%22 fill=%22%231e3a8a%22/%3E%3Crect x=%22105%22 y=%22135%22 width=%22425%22 height=%2212%22 rx=%226%22 fill=%22%2394a3b8%22/%3E%3C/svg%3E',
    alt: 'Illustration of a status message in a user interface',
    caption: 'Status messages should be clear without relying on color.'
  }}>
      <p>Explain what happened and what the user can do next. Use text in addition to color.</p>
      <p>Choose announcement urgency based on how important the update is to the current task.</p>
    </Article>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <LinkList label="Accessibility resources" links={[{
    href: '#keyboard',
    label: 'Keyboard testing guide',
    description: 'Review focus order and interaction without a pointer.'
  }, {
    href: '#screen-reader',
    label: 'Screen reader testing',
    description: 'Check names, roles, states, and announcements.'
  }, {
    href: '#contrast',
    label: 'Color contrast guidance',
    description: 'Make text and controls perceivable.'
  }]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <IconList items={[{
    id: 'keyboard',
    icon: '⌨',
    title: 'Keyboard ready',
    description: 'Reach interactive controls without a mouse.'
  }, {
    id: 'contrast',
    icon: '◐',
    title: 'Clear contrast',
    description: 'Read labels and status in varied lighting.'
  }, {
    id: 'feedback',
    icon: '✓',
    title: 'Helpful feedback',
    description: 'Understand errors and how to resolve them.'
  }, {
    id: 'responsive',
    icon: '↔',
    title: 'Responsive layouts',
    description: 'Use the interface at different screen sizes.'
  }]} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <CTABanner title="Ready to improve your interface?" description="Explore accessible patterns and use them in your next project." action={{
    label: 'Browse components',
    href: '#components'
  }} secondaryAction={{
    label: 'Read the guide',
    href: '#guide'
  }} />
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as ArticleCard,y as CallToActionBanner,v as FeatureIconList,h as OrderedAndUnorderedLists,m as PageHero,_ as ResourceLinkList,b as __namedExportsOrder,p as default};