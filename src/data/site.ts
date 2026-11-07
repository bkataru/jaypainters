// Single content data file. Every fact and label lives here; components
// import from here and never hard-code phone, hours, or addresses.

export const PHONE_DISPLAY = "+91 97316 70742";
export const PHONE_TEL = "tel:+919731670742";
export const WA_BASE = "https://wa.me/919731670742?text=";

export const HOURS_SHORT = "7 AM–9 PM";
export const HOURS_LONG = "07:00–21:00";
export const HOURS_NOTE = "Replies 7 AM–9 PM, WhatsApp anytime";
export const HOURS_LABEL = "7 AM–9 PM · Replies 7 AM–9 PM, WhatsApp anytime";

export const OWNER = "Anthony Jayasheelan";
export const SINCE_YEAR = 1980;
export const ADDRESS =
  "#21, Gauthamapuram, Near Football Ground, R H A Penchine Line, Ulsoor, Bangalore-560008, Karnataka";
export const LANDMARK = "Near Football Ground, Ulsoor — ask for Jay Painters";
export const LAT = 12.972696;
export const LNG = 77.626606;
export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=%2321%20Gauthamapuram%20Near%20Football%20Ground%20Ulsoor%20Bangalore-560008";

export const BRAND_FALLBACK = "Handles Asian Paints and Deco paints";
export const LAST_VERIFIED = "2026-11-07";

export const HEAD_TITLE = "Jay Painters — Ulsoor, Bangalore";
export const THEME_COLOR = "#1a1a1a";

export interface ServiceGroup {
  title: string;
  items: string[];
  prefill: string;
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Home interiors",
    items: ["Living room", "Bedroom", "Putty", "Wall", "Window", "White wash"],
    prefill: "Hi Jay Painters, I need interior painting.",
  },
  {
    title: "Outside and waterproof",
    items: ["Exterior walls", "Terrace and leakage painting"],
    prefill: "Hi Jay Painters, I need exterior or waterproof painting.",
  },
  {
    title: "Decorative",
    items: ["3D", "Texture", "Deco finishes", "Spray", "Statue"],
    prefill: "Hi Jay Painters, I need decorative painting.",
  },
  {
    title: "Wood and polish",
    items: ["Doors", "Furniture", "Polish"],
    prefill: "Hi Jay Painters, I need wood polish work.",
  },
  {
    title: "Buildings and workplaces",
    items: ["Apartments", "Buildings", "Malls", "Offices"],
    prefill: "Hi Jay Painters, I need painting for a building.",
  },
];

export interface GalleryEntry {
  file: string;
  caption: string;
  width: number;
  height: number;
}

export const GALLERY: GalleryEntry[] = [
  { file: "hero-finished-exterior.jpg", caption: "Finished exterior, Bangalore", width: 750, height: 1000 },
  { file: "local-interior-texture-01.jpg", caption: "Painter on site, terrace", width: 864, height: 1152 },
  { file: "local-interior-room-01.jpg", caption: "Painter on site, terrace", width: 864, height: 1152 },
  { file: "local-decorative-finish-01.jpg", caption: "Decorative wall finish", width: 864, height: 1152 },
  { file: "local-interior-room-02.jpg", caption: "Interior room painting", width: 864, height: 1152 },
  { file: "local-exterior-building-01.jpg", caption: "Exterior building painting", width: 864, height: 1152 },
  { file: "local-exterior-detail-01.jpg", caption: "Exterior detail work", width: 864, height: 1152 },
  { file: "local-crew-exterior-01.jpg", caption: "Crew painting exterior", width: 750, height: 1000 },
  { file: "local-wood-polish-01.jpg", caption: "Wood polish work", width: 864, height: 1152 },
  { file: "local-interior-ceiling-01.jpg", caption: "Interior ceiling painting", width: 864, height: 1152 },
  { file: "local-wall-finish-01.jpg", caption: "Wall finish work", width: 864, height: 1152 },
  { file: "local-exterior-house-01.jpg", caption: "House exterior painting", width: 864, height: 1152 },
  { file: "jd-finished-apartments-01.jpg", caption: "Finished apartments, exterior", width: 900, height: 1200 },
  { file: "jd-white-building-01.jpg", caption: "White building exterior", width: 900, height: 1200 },
  { file: "jd-yellow-exterior-01.jpg", caption: "Yellow exterior finish", width: 750, height: 1000 },
  { file: "jd-commercial-scaffold-01.jpg", caption: "Commercial block, scaffold work", width: 900, height: 1200 },
  { file: "jd-materials-01.jpg", caption: "Paints and tools on site", width: 900, height: 1200 },
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
    caption: "Ceiling painting, crew at work",
  },
  {
    file: "wood-polish-clip.mp4",
    poster: "wood-polish-poster.jpg",
    caption: "Wood masking and polish, Anthony at work",
  },
];

export function waLink(prefill: string): string {
  return WA_BASE + encodeURIComponent(prefill);
}

export function yearsSince1980(now: Date = new Date()): number {
  return now.getFullYear() - SINCE_YEAR;
}
