import { a as ReportCategory } from "./button-BHNwtKCm.js";
const WHATSAPP_NUMBER = "9263989760";
const CONTACT_PHONE = "9263989760";
const CONTACT_EMAIL = "rudrapratapsingh789.063@gmail.com";
const SITE_LOCATION = "Sitamarhi, Bihar";
const CATEGORY_LABELS = {
  [ReportCategory.garbage]: { en: "Garbage", hi: "कचरा", emoji: "🗑️" },
  [ReportCategory.drainageIssue]: {
    en: "Drainage Issue",
    hi: "नाला जाम",
    emoji: "🚰"
  },
  [ReportCategory.waterLogging]: {
    en: "Water Logging",
    hi: "जलजमाव",
    emoji: "💧"
  },
  [ReportCategory.publicToiletIssue]: {
    en: "Public Toilet Issue",
    hi: "शौचालय समस्या",
    emoji: "🚽"
  },
  [ReportCategory.roadCleanliness]: {
    en: "Road Cleanliness",
    hi: "सड़क सफाई",
    emoji: "🛣️"
  },
  [ReportCategory.other]: { en: "Other", hi: "अन्य", emoji: "📋" }
};
const BIHAR_DISTRICTS = [
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
  "Motihari"
];
const buildWhatsAppMessage = (data) => {
  const lines = [
    "🚨 *New Cleanliness Report*",
    "",
    `📛 Name: ${data.name}`,
    `📱 Mobile: ${data.mobile}`,
    `🏙️ District: ${data.district}`,
    `📍 Location: ${data.location}`,
    `🏷️ Category: ${data.category}`,
    `📝 Description: ${data.description}`
  ];
  if (data.imageUrl) lines.push(`🖼️ Photo: ${data.imageUrl}`);
  return encodeURIComponent(lines.join("\n"));
};
export {
  BIHAR_DISTRICTS as B,
  CATEGORY_LABELS as C,
  SITE_LOCATION as S,
  WHATSAPP_NUMBER as W,
  CONTACT_PHONE as a,
  buildWhatsAppMessage as b,
  CONTACT_EMAIL as c
};
