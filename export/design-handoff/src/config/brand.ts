export const brand = {
  name: "Cube Financial Group",
  wordmark: "CUBE FINANCIAL GROUP",
  tagline: "מפצחים את המורכבות",
  insuranceArm: "בר חיים ביטוחים",
  colors: {
    navy: "#0A192F",
    gold: "#D4AF37",
    sapphire: "#1E3A8A",
    neutral: "#F4F6F9",
    body: "#2D3748",
  },
  logos: {
    horizontal: "/brand/logo-horizontal.png",
    icon: "/brand/logo-icon.png",
    icon2x: "/brand/logo-icon@2x.png",
    /** width / height of logo-icon.png (preserve aspect in header) */
    iconAspect: 1,
    full: "/brand/logo-full.png",
  },
} as const;

export type HeaderBrandVariant = "icon-wordmark" | "icon-only" | "stacked";
