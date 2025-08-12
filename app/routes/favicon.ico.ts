import type { LoaderFunctionArgs } from "react-router";

// Resource route to satisfy browser requests for /favicon.ico
// Returns 204 No Content to prevent route errors in logs
export async function loader(_args: LoaderFunctionArgs) {
  return new Response(null, {
    status: 204,
    headers: {
      // Explicitly set content type (some browsers are picky)
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
