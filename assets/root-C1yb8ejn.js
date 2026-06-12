import{w as a,q as i,p as e,M as c,L as l,S as h,t as d,O as m,i as p}from"./chunk-EF7DTUVF-B8hWlioN.js";const x="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3crect%20width='64'%20height='64'%20rx='12'%20fill='%230b0e11'/%3e%3crect%20width='64'%20height='64'%20rx='12'%20fill='none'%20stroke='%231f2730'%20stroke-width='2'/%3e%3cpath%20d='M14%2022%20L26%2032%20L14%2042'%20fill='none'%20stroke='%23c8ff3d'%20stroke-width='6'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3crect%20x='32'%20y='38'%20width='18'%20height='6'%20rx='2'%20fill='%23c8ff3d'/%3e%3c/svg%3e",f=()=>[{rel:"icon",href:x,type:"image/svg+xml"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Space+Grotesk:wght@300..700&display=swap"}];function g({children:r}){const s=`(() => {
    try {
      const isGitHubPages = location.hostname.endsWith('.github.io');
      if (!isGitHubPages) return;
      const params = new URLSearchParams(location.search);
      if (!params.has('v')) {
        params.set('v', ${JSON.stringify(String(Date.now()))}.slice(0,0) + ${JSON.stringify(String("2bdda5a396c9ab3a36e293077329ebf5bcc585e0"))});
        const url = new URL(location.href);
        url.search = params.toString();
        // Replace so back button doesn't go to the non-versioned URL
        location.replace(url.toString());
      }
    } catch {}
  })();`;return e.jsxs("html",{lang:"en",className:"dark",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("meta",{name:"theme-color",content:"#0b0e11"}),e.jsx("script",{dangerouslySetInnerHTML:{__html:s}}),e.jsx(c,{}),e.jsx(l,{})]}),e.jsxs("body",{className:"grain",children:[r,e.jsx(h,{}),e.jsx(d,{})]})]})}const b=a(function(){return e.jsx(m,{})}),w=i(function({error:t}){let s="Oops!",n="An unexpected error occurred.",o;return p(t)&&(s=t.status===404?"404":"Error",n=t.status===404?"The requested page could not be found.":t.statusText||n),e.jsx("main",{className:"min-h-screen bg-bg font-mono text-ink flex items-center justify-center p-8",children:e.jsxs("div",{className:"max-w-xl w-full border border-line bg-panel p-8",children:[e.jsx("p",{className:"text-rose mb-2",children:"✗ process exited"}),e.jsx("h1",{className:"text-4xl font-bold mb-4",children:s}),e.jsx("p",{className:"text-dim mb-6",children:n}),e.jsx("a",{href:"/",className:"text-acc link-sweep",children:"$ cd ~ — back to home"}),o]})})});export{w as ErrorBoundary,g as Layout,b as default,f as links};
