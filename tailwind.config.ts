import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--c-ink)",
        "ink-soft": "var(--c-ink-soft)",
        bone: "var(--c-bone)",
        "bone-dim": "var(--c-bone-dim)",
        terra: "var(--c-terra)",
        "terra-deep": "var(--c-terra-deep)",
        accent: "var(--c-accent)",
        "accent-deep": "var(--c-accent-deep)",
        "accent-glow": "var(--c-accent-glow)",
        sky: "var(--c-sky)",
        "sky-soft": "var(--c-sky-soft)",
        clay: "var(--c-clay)",
        fog: "var(--c-fog)",
        "on-light-muted": "var(--c-on-light-muted)",
        "on-light-subtle": "var(--c-on-light-subtle)",
        "on-ink-muted": "var(--c-on-ink-muted)",
        "on-ink-subtle": "var(--c-on-ink-subtle)",
        line: "var(--c-line)",
        "line-dark": "var(--c-line-dark)",
        glass: "var(--c-glass)",
      },
      fontFamily: {
        heading: ["var(--f-sans)", "system-ui", "sans-serif"],
        body: ["var(--f-sans)", "system-ui", "sans-serif"],
        sans: ["var(--f-sans)", "system-ui", "sans-serif"],
        mono: ["var(--f-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: "var(--t-hero)",
        h1: "var(--t-h1)",
        h2: "var(--t-h2)",
        h3: "var(--t-h3)",
        lead: "var(--t-lead)",
        body: "var(--t-body)",
        small: "var(--t-small)",
        kicker: "var(--t-kicker)",
      },
      letterSpacing: {
        tight: "var(--ls-tight)",
        tighter: "var(--ls-tighter)",
        wide: "var(--ls-wide)",
        wider: "var(--ls-wider)",
      },
      spacing: {
        section: "var(--s-section)",
        gutter: "var(--s-gutter)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        io: "var(--ease-io)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      maxWidth: {
        content: "1600px",
      },
      borderRadius: {
        box: "var(--r-box)",
        "box-lg": "var(--r-box-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
