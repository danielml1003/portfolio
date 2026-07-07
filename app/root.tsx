import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import faviconSvg from "./favicon.svg";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: faviconSvg, type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Space+Grotesk:wght@300..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Cache-busting version from build (set in CI as VITE_BUILD_VERSION)
  const buildVersion = (import.meta as any).env?.VITE_BUILD_VERSION ?? "1";
  const cacheBusterScript = `(() => {
    try {
      const isGitHubPages = location.hostname.endsWith('.github.io');
      if (!isGitHubPages) return;
      const params = new URLSearchParams(location.search);
      if (!params.has('v')) {
        params.set('v', ${JSON.stringify(String(Date.now()))}.slice(0,0) + ${JSON.stringify(String(buildVersion))});
        const url = new URL(location.href);
        url.search = params.toString();
        // Replace so back button doesn't go to the non-versioned URL
        location.replace(url.toString());
      }
    } catch {}
  })();`;
  // Re-apply a persisted accent theme before first paint (no lime flash)
  const accentScript = `(() => {
    try {
      var a = localStorage.getItem('ws-accent');
      var m = { lime:['#c8ff3d','#9fd417'], cyan:['#6be4ff','#3fc4e8'], amber:['#ffb454','#e89a33'], violet:['#b689ff','#9a66f0'], rose:['#ff6b81','#e84f66'] }[a];
      if (m) {
        document.documentElement.style.setProperty('--color-acc', m[0]);
        document.documentElement.style.setProperty('--color-acc-dim', m[1]);
      }
    } catch (e) {}
  })();`;
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0e11" />
        <script dangerouslySetInnerHTML={{ __html: cacheBusterScript }} />
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
        <Meta />
        <Links />
      </head>
      <body className="grain">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-bg font-mono text-ink flex items-center justify-center p-8">
      <div className="max-w-xl w-full border border-line bg-panel p-8">
        <p className="text-rose mb-2">✗ process exited</p>
        <h1 className="text-4xl font-bold mb-4">{message}</h1>
        <p className="text-dim mb-6">{details}</p>
        <a href="/" className="text-acc link-sweep">
          $ cd ~ — back to home
        </a>
        {stack && (
          <pre className="w-full p-4 mt-6 overflow-x-auto text-xs text-faint border border-line">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
