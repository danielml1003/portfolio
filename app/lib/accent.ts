/**
 * Accent theme engine — swaps the site's signature color at runtime.
 * The CSS utilities all reference var(--color-acc), so changing the
 * custom property recolors everything: text, borders, selection, canvas.
 */

export const ACCENTS: Record<string, { acc: string; dim: string }> = {
  lime: { acc: "#c8ff3d", dim: "#9fd417" },
  cyan: { acc: "#6be4ff", dim: "#3fc4e8" },
  amber: { acc: "#ffb454", dim: "#e89a33" },
  violet: { acc: "#b689ff", dim: "#9a66f0" },
  rose: { acc: "#ff6b81", dim: "#e84f66" },
};

export const ACCENT_EVENT = "ws-accent-change";

export function applyAccent(name: string): boolean {
  const theme = ACCENTS[name];
  if (!theme) return false;
  const root = document.documentElement;
  root.style.setProperty("--color-acc", theme.acc);
  root.style.setProperty("--color-acc-dim", theme.dim);
  try {
    localStorage.setItem("ws-accent", name);
  } catch {}
  window.dispatchEvent(
    new CustomEvent(ACCENT_EVENT, { detail: { name, ...theme } })
  );
  return true;
}

export function currentAccent(): string {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-acc")
      .trim() || "#c8ff3d"
  );
}
