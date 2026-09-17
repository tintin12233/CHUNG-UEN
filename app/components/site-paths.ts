const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteBasePath = configuredBasePath.replace(/\/$/, "");

/** Prefix a public asset path for local development or a GitHub Pages project site. */
export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${siteBasePath}${path}`;
}

/** Prefix an internal route and keep static-export pages addressable on GitHub Pages. */
export function withRoutePath(path: string) {
  const normalizedPath = siteBasePath && path !== "/"
    ? `${path.replace(/\/$/, "")}/`
    : path;
  return withBasePath(normalizedPath);
}
