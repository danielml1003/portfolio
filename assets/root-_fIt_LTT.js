import{w as a,q as i,p as t,M as c,L as l,S as u,t as p,O as h,i as d}from"./chunk-EF7DTUVF-B8hWlioN.js";const f=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function g({children:n}){const e=`(() => {
    try {
      const isGitHubPages = location.hostname.endsWith('.github.io');
      if (!isGitHubPages) return;
      const params = new URLSearchParams(location.search);
      if (!params.has('v')) {
        params.set('v', ${JSON.stringify(String(Date.now()))}.slice(0,0) + ${JSON.stringify(String("8c59784655e95dfc7c4756118fcd39fd34212175"))});
        const url = new URL(location.href);
        url.search = params.toString();
        // Replace so back button doesn't go to the non-versioned URL
        location.replace(url.toString());
      }
    } catch {}
  })();`;return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx("script",{dangerouslySetInnerHTML:{__html:e}}),t.jsx(c,{}),t.jsx(l,{})]}),t.jsxs("body",{children:[n,t.jsx(u,{}),t.jsx(p,{})]})]})}const x=a(function(){return t.jsx(h,{})}),j=i(function({error:s}){let e="Oops!",o="An unexpected error occurred.",r;return d(s)&&(e=s.status===404?"404":"Error",o=s.status===404?"The requested page could not be found.":s.statusText||o),t.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[t.jsx("h1",{children:e}),t.jsx("p",{children:o}),r]})});export{j as ErrorBoundary,g as Layout,x as default,f as links};
