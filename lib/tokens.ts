import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * ============================================================================
 *  lib/tokens — reads the design tokens straight out of app/globals.css.
 * ----------------------------------------------------------------------------
 *  The /styleguide route renders from this, so the documentation can never
 *  drift from the stylesheet: if a color changes in `@theme`, it changes on
 *  the styleguide page in the same build.
 *
 *  It runs at build time (the route is statically generated), so `node:fs`
 *  is only ever touched on the server.
 * ========================================================================== */

export interface Token {
  /** Section heading from the dashed block comment above the declaration. */
  section: string;
  /** Variable name without the leading dashes, e.g. "color-accent". */
  name: string;
  /** Raw declaration value, e.g. "#fe8242". */
  value: string;
  /** Trailing comment describing the token's role. */
  comment: string;
}

/** One font role: CSS variable name + the `--font-*` stack it maps to. */
export interface FontToken {
  name: string;
  value: string;
  comment: string;
}

/** One step of the type scale. */
export interface TypeToken {
  name: string;
  size: string;
  comment: string;
}

const SECTION_RE = /\/\*\s*---\s*(.+?)\s*---/;
const DECL_RE = /^\s*(--[a-z0-9][\w-]*)\s*:\s*([^;]+);/;
const COMMENT_RE = /\/\*(.*?)\*\//;

/** Extract the body of the top-level `@theme { ... }` block. */
function themeBody(css: string): string {
  const start = css.indexOf("@theme");
  if (start === -1) return "";
  const open = css.indexOf("{", start);
  if (open === -1) return "";
  // Walk to the matching brace so nested blocks (there are none today, but
  // `@theme inline` variants exist) cannot truncate the parse.
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  return css.slice(open + 1);
}

/**
 * Parse every `--token: value;` declaration in `@theme`, grouped by the
 * section comment that precedes it.
 */
export function readThemeTokens(): Token[] {
  const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");
  const body = themeBody(css);

  const tokens: Token[] = [];
  let section = "Tokens";
  let pendingSection = false;
  let inComment = false;

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    // Multi-line block comments (section headers wrap onto the next line).
    if (inComment) {
      if (line.includes("*/")) inComment = false;
      continue;
    }

    if (line.startsWith("/*")) {
      const sectionMatch = line.match(SECTION_RE);
      if (sectionMatch) section = sectionMatch[1];
      if (!line.includes("*/")) inComment = true;
      pendingSection = true;
      continue;
    }

    const decl = line.match(DECL_RE);
    if (decl) {
      const comment = line.match(COMMENT_RE);
      tokens.push({
        section,
        name: decl[1].replace(/^--/, ""),
        value: decl[2].trim(),
        comment: comment ? comment[1].trim() : "",
      });
      pendingSection = false;
      continue;
    }

    void pendingSection;
  }

  return tokens;
}

/** Tokens grouped by section, in declaration order. */
export function tokensBySection(tokens: Token[]): Array<{ section: string; tokens: Token[] }> {
  const groups = new Map<string, Token[]>();
  for (const t of tokens) {
    const list = groups.get(t.section);
    if (list) list.push(t);
    else groups.set(t.section, [t]);
  }
  return [...groups].map(([section, group]) => ({ section, tokens: group }));
}

/** Font role tokens (`--font-*`), i.e. the families loaded by next/font. */
export function readFontTokens(): FontToken[] {
  return readThemeTokens()
    .filter((t) => t.name.startsWith("font-"))
    .map(({ name, value, comment }) => ({ name, value, comment }));
}

/** Type scale (`--text-*`), sorted smallest first. */
export function readTypeTokens(): TypeToken[] {
  return readThemeTokens()
    .filter((t) => t.name.startsWith("text-"))
    .map(({ name, value, comment }) => ({
      name,
      size: value,
      comment,
    }))
    .sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
}
