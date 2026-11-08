// Single content data file. Every fact and label lives here; components
// import from here and never hard-code phone, hours, or addresses.

export const PHONE_DISPLAY = "+91\u00A097316\u00A070742";
export const PHONE_TEL = "tel:+919731670742";
export const PHONE_E164 = "+919731670742";
export const WA_BASE = "https://wa.me/919731670742?text=";

export const HOURS_SHORT = "7 AM–9 PM";
export const HOURS_NOTE = "WhatsApp anytime; replies 7 AM–9 PM";
export const HERO_HOURS = "Open 7 AM–9 PM, every day · WhatsApp anytime";

export const OWNER = "Anthony Jayasheelan";
export const SINCE_YEAR = 1980;
export const ADDRESS =
  "#21, Gauthamapuram, Near Football Ground, R H A Penchine Line, Ulsoor, Bangalore-560008, Karnataka";
export const AREA_SHORT = "Ulsoor, Bangalore 560008";
export const LANDMARK = "Near Football Ground, Ulsoor";
export const LAT = 12.972696;
export const LNG = 77.626606;
export const MAP_URL = "https://www.google.com/maps/dir/?api=1&destination=12.972696,77.626606";
export const JUSTDIAL_URL =
  "https://www.justdial.com/Bangalore/Jay-Painters-Near-Football-Ground-Ulsoor/080PXX80-XX80-261007120204-I2A4_BZDET";
export const LAST_VERIFIED = "2026-11-07";

export const HEAD_TITLE = "House painters in Ulsoor, Bangalore | Jay Painters";
export const SITE_DESCRIPTION =
  "Painting flats, houses and offices in Ulsoor and Bangalore since 1980. Owner Anthony visits, quotes and runs the crew. Call or WhatsApp.";
export const THEME_COLOR = "#fff7ed";

export interface ServiceGroup {
  title: string;
  items: string[];
  typical: string;
  prefill: string;
  cta: string;
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Home interiors",
    items: ["Living rooms", "Bedrooms", "Walls", "Windows", "Putty", "White wash"],
    typical: "A lived-in flat, repainted room by room",
    prefill: "Hi Jay Painters, I need interior painting in ____.",
    cta: "Ask about interiors",
  },
  {
    title: "Outside and waterproof",
    items: ["Exterior walls", "Terrace and leakage painting"],
    typical: "A house exterior plus a terrace touch-up",
    prefill: "Hi Jay Painters, I need exterior or waterproof painting in ____.",
    cta: "Ask about waterproofing",
  },
  {
    title: "Decorative",
    items: ["3D", "Texture", "Deco finishes", "Spray", "Statue and idol repainting"],
    typical: "One feature wall with a new finish",
    prefill: "Hi Jay Painters, I need decorative painting in ____.",
    cta: "Ask about a feature wall",
  },
  {
    title: "Wood and polish",
    items: ["Doors", "Furniture", "PU polish", "Polish"],
    typical: "Doors and frames in PU or classic polish",
    prefill: "Hi Jay Painters, I need wood polish work in ____.",
    cta: "Ask about wood polish",
  },
  {
    title: "Buildings and workplaces",
    items: ["Apartments", "Buildings", "Offices"],
    typical: "A crew assigned to one building or floor",
    prefill: "Hi Jay Painters, I need painting for a building in ____.",
    cta: "Ask about a building",
  },
];

export interface GalleryEntry {
  file: string;
  caption: string;
  width: number;
  height: number;
  hero?: boolean;
  featured?: boolean;
}

export const GALLERY: GalleryEntry[] = [
  {
    file: "hero-finished-exterior.jpg",
    caption: "New exterior paint, Bangalore",
    width: 750,
    height: 1000,
    hero: true,
  },
  {
    file: "local-terrace-painter-01.jpg",
    caption: "Painter on a terrace job",
    width: 864,
    height: 1152,
  },
  {
    file: "local-decorative-finish-01.jpg",
    caption: "Terrace stairs getting a fresh coat",
    width: 864,
    height: 1152,
  },
  {
    file: "local-interior-room-02.jpg",
    caption: "Interior room with decorative ceiling border",
    width: 864,
    height: 1152,
  },
  {
    file: "local-exterior-building-01.jpg",
    caption: "Textured exterior wall and window",
    width: 864,
    height: 1152,
  },
  {
    file: "local-interior-hall-01.jpg",
    caption: "Interior hall repaint in progress",
    width: 864,
    height: 1152,
  },
  {
    file: "local-crew-exterior-01.jpg",
    caption: "Third-floor exterior, painter at work",
    width: 750,
    height: 1000,
    hero: true,
  },
  {
    file: "local-interior-ceiling-01.jpg",
    caption: "Finished living room with cove lighting",
    width: 864,
    height: 1152,
    featured: true,
  },
  {
    file: "local-wall-finish-01.jpg",
    caption: "Living room with feature wall",
    width: 864,
    height: 1152,
  },
  {
    file: "local-interior-prep-01.jpg",
    caption: "Masked frames ready for paint",
    width: 864,
    height: 1152,
  },
  {
    file: "jd-finished-apartments-01.jpg",
    caption: "Apartment block exterior, near completion",
    width: 900,
    height: 1200,
  },
  {
    file: "jd-white-building-01.jpg",
    caption: "Finished white building, exterior",
    width: 900,
    height: 1200,
    featured: true,
  },
  {
    file: "jd-yellow-exterior-01.jpg",
    caption: "Exterior repaint, tan and maroon",
    width: 750,
    height: 1000,
  },
  {
    file: "jd-commercial-scaffold-01.jpg",
    caption: "Apartment block under construction",
    width: 900,
    height: 1200,
    hero: true,
  },
  { file: "jd-materials-01.jpg", caption: "Paints and rollers on site", width: 900, height: 1200 },
];

export interface ClipEntry {
  file: string;
  poster: string;
  caption: string;
}

export const CLIPS: ClipEntry[] = [
  {
    file: "ceiling-painting-clip.mp4",
    poster: "ceiling-painting-poster.jpg",
    caption: "Ceiling repaint, single painter on scaffold",
  },
  {
    file: "wood-polish-clip.mp4",
    poster: "wood-polish-poster.jpg",
    caption: "Masking glass before polish, Anthony",
  },
];

export function waLink(prefill: string): string {
  return WA_BASE + encodeURIComponent(prefill);
}
