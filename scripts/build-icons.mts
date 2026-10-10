/**
 * ============================================================================
 *  scripts/build-icons.mts
 * ----------------------------------------------------------------------------
 *  Turns every SVG in /assets into a typed React component in
 *  /components/icons, with every raw hex swapped for a design token.
 *
 *      node scripts/build-icons.mts
 *
 *  WHY: Figma exports icons as standalone .svg files with hardcoded fills.
 *  Components must never hardcode color, so the generator rewrites them
 *  against the PALETTE table below and inlines them as components, so they
 *  inherit `currentColor` and can be styled with Tailwind.
 *
 *  Every color used by the icon set is listed in docs/STYLEGUIDE.md § Icons.
 * ============================================================================
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const ASSETS = join(process.cwd(), "assets");
const OUT_DIR = join(process.cwd(), "components/icons");

/**
 * Raw Figma hex (lower-case) -> token reference, or `currentColor` so
 * monochrome icons inherit the text color around them.
 * A hex that is NOT listed here is reported as a warning, so an
 * un-tokenized color can never sneak into the icon set silently.
 */
const PALETTE: Record<string, string> = {
  // monochrome UI icons -> inherit surrounding text color
  "#626368": "currentColor", // --color-muted
  "#41444c": "currentColor", // --color-graphite
  "#272b2a": "currentColor", // --color-ink

  // surfaces
  "#fdf9f4": "var(--color-surface)",
  "#fbfaf7": "var(--color-surface-raised)",
  "#fbf7f3": "var(--color-surface)",
  "#f8f6ef": "var(--color-surface-alt)",

  // brand + semantic
  "#fe8242": "var(--color-accent)",
  "#f26e3c": "var(--color-accent-strong)",
  "#fdeede": "var(--color-accent-soft)",
  "#feb65e": "var(--color-amber)",
  "#ffc090": "var(--color-chart-bar)",
  "#479975": "var(--color-success)",
  "#ee5f5f": "var(--color-danger)",
  "#99b16c": "var(--color-leaf)",
  "#5e8554": "var(--color-leaf-dark)",

  // illustration palette (multi-colour artwork: logo, tomato, cup, plant)
  "#fcf7eb": "var(--color-illus-cream)",
  "#fcedda": "var(--color-illus-sand)",
  "#f8e0c2": "var(--color-illus-peach)",
  "#f8b06c": "var(--color-illus-amber)",
  "#fcc17e": "var(--color-illus-gold)",
  "#fed29a": "var(--color-illus-honey)",
  "#70975d": "var(--color-illus-moss)",
  "#898457": "var(--color-illus-olive)",
  "#7ea864": "var(--color-illus-sprout)",
  "#60925a": "var(--color-illus-stem)",
  "#f99840": "var(--color-illus-flame)",
  "#ff624d": "var(--color-illus-tomato)",
  "#eeb6b6": "var(--color-illus-blush)",
};

/** rgba() forms that appear in the artwork -> dedicated tokens. */
const RGBA_PALETTE: Record<string, string> = {
  "rgba(254,130,66,.7)": "var(--color-accent-70)",
  "rgba(254, 130, 66, .7)": "var(--color-accent-70)",
};

/** Explicit component names, so imports read `HomeIcon` not `HomeIconSvg`. */
const NAMES: Record<string, string> = {
  "ambient cloud icon": "AmbientCloudIcon",
  "bell 1": "BellIcon",
  "Calendar": "CalendarIcon",
  "chevron-right vector": "ChevronRightIcon",
  "Colored Sun": "SunIllustration",
  "ellipse": "KebabIcon",
  "FocusFlawLogo": "FocusFlawLogo",
  "Full clock icon": "StatClockIllustration",
  "Full fire icon": "StatFireIllustration",
  "Home icon": "HomeIcon",
  "music icon": "MusicIcon",
  "Note icon": "NoteIcon",
  "note vector": "PencilSquareIcon",
  "Plant": "PlantIllustration",
  "play vector (1)": "PlayGlyphIcon",
  "play vector (2)": "VolumeSliderIcon",
  "play vector (3)": "SeekSliderIcon",
  "play vector (4)": "NextTrackIcon",
  "play vector (5)": "PlayCircleIcon",
  "play vector (6)": "RefreshIcon",
  "play vector (7)": "PrevTrackIcon",
  "play vector (8)": "SlidersIcon",
  "Plus icon": "PlusIcon",
  "red Tomato": "RedTomatoIllustration",
  "search 1": "SearchIcon",
  "Setting fill Icon": "SettingsFilledIcon",
  "Settings outline icon": "SettingsIcon",
  "Statistics icon": "StatisticsIcon",
  "Tea Cup": "TeaCupIllustration",
  "tick box": "CheckboxOutlineSmallIcon",
  "tick box_2": "CheckboxCheckedIcon",
  "timer icon": "TimerIcon",
  "Tomato": "TomatoIllustration",
  "unchecked tick box": "CheckboxEmptyIcon",
};

const ATTR_RENAME: Record<string, string> = {
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
  "clip-path": "clipPath",
  "xmlns:xlink": "xmlnsXlink",
};

/** SVG lengths that carry a spurious Figma "px" suffix. */
const LENGTH_ATTRS = new Set([
  "strokeWidth",
  "stroke-width",
  "fillOpacity",
  "stroke-opacity",
  "opacity",
]);

const COLOR_RE = /(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\))/;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

/**
 * Paths to drop entirely, per source file.
 *
 * `unchecked tick box.svg` ships an invisible tick: its stroke is the raised
 * surface colour (#fbfaf7) sitting on an empty box, so it renders as nothing.
 * That is a Figma authoring bug — an unchecked box must show no tick. The
 * design's empty checkboxes are plain outlines, so the path is removed here
 * (see docs/STYLEGUIDE.md § Bugs fixed).
 */
const DROP_PATHS: Record<string, RegExp> = {
  "unchecked tick box": /M16\.61,7\.67l-7\.03,7\.03-3\.19-3\.19/,
};

/** `.cls-1 { ... }` rules from the Figma <defs><style> block. */
function parseClassRules(svg: string): Record<string, Record<string, string>> {
  const rules: Record<string, Record<string, string>> = {};
  for (const m of svg.matchAll(/\.([A-Za-z][\w-]*)\s*\{([^}]*)\}/g)) {
    const props: Record<string, string> = {};
    for (const decl of m[2].split(";")) {
      const idx = decl.indexOf(":");
      if (idx === -1) continue;
      const k = decl.slice(0, idx).trim();
      const v = decl.slice(idx + 1).trim();
      if (k && v) props[k] = v;
    }
    rules[m[1]] = props;
  }
  return rules;
}

/** Replace every color literal in an attribute value with its token. */
function tokenizeValue(value: string, file: string, missing: Set<string>): string {
  let out = value;

  for (const [raw, token] of Object.entries(RGBA_PALETTE)) {
    if (out.toLowerCase().replace(/\s+/g, "") === raw.replace(/\s+/g, "")) return token;
  }
  // tolerate whitespace variants of the rgba form
  const rgbaMatch = out.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/i);
  if (rgbaMatch) {
    const key = `rgba(${rgbaMatch[1]},${rgbaMatch[2]},${rgbaMatch[3]},${rgbaMatch[4]})`
      .replace(/\s+/g, "")
      .toLowerCase();
    if (RGBA_PALETTE[key] ?? RGBA_PALETTE[`rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${rgbaMatch[4]})`]) {
      return out.replace(
        rgbaMatch[0],
        RGBA_PALETTE[key] ??
          RGBA_PALETTE[`rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${rgbaMatch[4]})`],
      );
    }
  }

  out = out.replace(HEX_RE, (hex) => {
    const token = PALETTE[hex.toLowerCase()];
    if (token) return token;
    missing.add(`${hex} in ${file}`);
    return hex;
  });

  return out;
}

/** Process one complete `<tag ...>` string (opening or self-closing). */
function processTag(tag: string, rules: Record<string, Record<string, string>>, file: string, missing: Set<string>): string {
  // 0. drop known-buggy paths (see DROP_PATHS)
  const drop = DROP_PATHS[basename(file, ".svg")];
  if (drop && drop.test(tag)) return "";

  // 1. expand class="cls-N" into real presentation attributes (all occurrences)
  tag = tag.replace(/(\s)class(?:Name)?="([^"]*)"/, (_m, ws: string, clsList: string) => {
    const injected: string[] = [];
    for (const cls of clsList.split(/\s+/)) {
      const props = rules[cls];
      if (!props) continue;
      for (const [k, v] of Object.entries(props)) {
        // never clobber an explicit attribute already on the element
        if (new RegExp(`\\s${k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}="`).test(tag)) continue;
        injected.push(` ${k}="${v}"`);
      }
    }
    return ws + injected.join("");
  });

  // 2. strip Figma noise
  tag = tag.replace(/\sid="[^"]*"/g, "");
  tag = tag.replace(/\sdata-name="[^"]*"/g, "");

  // 3. tokenize colors + normalize numeric lengths, attribute by attribute
  tag = tag.replace(/([A-Za-z_:][\w:.-]*)="([^"]*)"/g, (_m, name: string, value: string) => {
    let v = value;
    if (COLOR_RE.test(v)) v = tokenizeValue(v, file, missing);
    if (LENGTH_ATTRS.has(name)) v = v.replace(/px/g, "").trim();
    return `${name}="${v}"`;
  });

  // 4. kebab-case -> camelCase for JSX
  tag = tag.replace(/(\s)([a-z][a-z0-9]*(?:-[a-z0-9]+)+)=/g, (_m, ws: string, name: string) => {
    const camel = ATTR_RENAME[name] ?? name.replace(/-([a-z])/g, (_x, c: string) => c.toUpperCase());
    return `${ws}${camel}=`;
  });

  return tag;
}

function build() {
  mkdirSync(OUT_DIR, { recursive: true });
  const files = readdirSync(ASSETS).filter((f) => f.toLowerCase().endsWith(".svg"));
  const missing = new Set<string>();
  const exports: string[] = [];

  for (const file of files.sort((a, b) => a.localeCompare(b))) {
    const key = basename(file, ".svg");
    const componentName = NAMES[key];
    if (!componentName) {
      console.warn(`  ! no component name for "${file}" - skipped`);
      continue;
    }

    let svg = readFileSync(join(ASSETS, file), "utf8");
    const rules = parseClassRules(svg);

    const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";

    // drop the Figma <defs><style> block (rules are inlined per element) and XML prolog
    svg = svg.replace(/<defs>[\s\S]*?<\/defs>/g, "");
    svg = svg.replace(/<\?xml[^>]*\?>/g, "");

    const openEnd = svg.indexOf(">");
    let inner = svg.slice(openEnd + 1, svg.lastIndexOf("</svg>"));

    // split on tags so nested <g> groups cannot swallow their children
    inner = inner
      .split(/(<[^>]*>)/g)
      .map((tok) => (tok.startsWith("<") ? processTag(tok, rules, file, missing) : tok))
      .join("");

    const body = inner
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `      ${l}`)
      .join("\n");

    exports.push(`/**
 * ${componentName}
 * Generated from \`assets/${file}\` by scripts/build-icons.mts - do not edit
 * by hand. Raw Figma colors are mapped to design tokens; monochrome icons
 * use \`currentColor\` so they inherit the surrounding text color.
 */
export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="${viewBox}" fill="none" aria-hidden="true" focusable="false" {...props}>
${body}
    </svg>
  );
}
`);
  }

  const header = `/**
 * ============================================================================
 *  components/icons - GENERATED FILE, DO NOT EDIT BY HAND
 * ----------------------------------------------------------------------------
 *  Every icon in the design system, produced from \`/assets/*.svg\` by
 *  \`scripts/build-icons.mts\`. Colors are mapped to design tokens; monochrome
 *  icons take \`currentColor\` so they inherit the surrounding text color.
 *
 *  Regenerate after adding an asset:
 *      node scripts/build-icons.mts
 * ============================================================================
 */
import type { SVGProps } from "react";
`;

  writeFileSync(join(OUT_DIR, "index.tsx"), header + "\n" + exports.join("\n"), "utf8");
  console.log(`  wrote ${exports.length} icons -> components/icons/index.tsx`);
  if (missing.size) {
    console.log("  UNMAPPED COLORS (add to PALETTE):");
    for (const m of [...missing].sort()) console.log(`      ${m}`);
    process.exitCode = 1;
  }
}

build();
