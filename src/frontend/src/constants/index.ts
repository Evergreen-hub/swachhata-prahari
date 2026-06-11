import { ReportCategory } from "@/backend";

export const WHATSAPP_NUMBER = "9263989760";
export const CONTACT_PHONE = "9263989760";
export const CONTACT_EMAIL = "rudrapratapsingh789.063@gmail.com";
export const SITE_LOCATION = "Sitamarhi, Bihar";
export const SITE_NAME = "Swachhata Prahari";
export const SITE_TAGLINE = "Awaaz Safai Ki";

export const CATEGORY_LABELS: Record<
  ReportCategory,
  { en: string; hi: string; emoji: string }
> = {
  [ReportCategory.garbage]: { en: "Garbage", hi: "कचरा", emoji: "🗑️" },
  [ReportCategory.drainageIssue]: {
    en: "Drainage Issue",
    hi: "नाला जाम",
    emoji: "🚰",
  },
  [ReportCategory.waterLogging]: {
    en: "Water Logging",
    hi: "जलजमाव",
    emoji: "💧",
  },
  [ReportCategory.publicToiletIssue]: {
    en: "Public Toilet Issue",
    hi: "शौचालय समस्या",
    emoji: "🚽",
  },
  [ReportCategory.roadCleanliness]: {
    en: "Road Cleanliness",
    hi: "सड़क सफाई",
    emoji: "🛣️",
  },
  [ReportCategory.other]: { en: "Other", hi: "अन्य", emoji: "📋" },
};

export const BIHAR_DISTRICTS = [
  "Sitamarhi",
  "Muzaffarpur",
  "Patna",
  "Vaishali",
  "Sheohar",
  "Darbhanga",
  "Madhubani",
  "Supaul",
  "Samastipur",
  "Begusarai",
  "Gopalganj",
  "Siwan",
  "Saran",
  "Champaran (East)",
  "Champaran (West)",
  "Motihari",
];

export const STATUS_LABELS = {
  pending: { en: "Pending", hi: "लंबित", color: "text-amber-600" },
  resolved: { en: "Resolved", hi: "हल हो गया", color: "text-primary" },
} as const;

export const buildWhatsAppMessage = (data: {
  name: string;
  mobile: string;
  district: string;
  location: string;
  category: string;
  description: string;
  imageUrl?: string;
}) => {
  const lines = [
    "🚨 *New Cleanliness Report*",
    "",
    `📛 Name: ${data.name}`,
    `📱 Mobile: ${data.mobile}`,
    `🏙️ District: ${data.district}`,
    `📍 Location: ${data.location}`,
    `🏷️ Category: ${data.category}`,
    `📝 Description: ${data.description}`,
  ];
  if (data.imageUrl) lines.push(`🖼️ Photo: ${data.imageUrl}`);
  return encodeURIComponent(lines.join("\n"));
};

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
