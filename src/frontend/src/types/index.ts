import {
  AboutContent,
  BlogPost,
  CoreValue,
  Document,
  DocumentCategory,
  Event,
  EventRegistration,
  HomeContent,
  Project,
  ProjectStatus,
  Testimonial,
} from "@/backend";
export { ReportCategory, ReportStatus, VolunteerStatus } from "@/backend";
export type {
  Report,
  VolunteerApplication,
  Stats,
  Settings,
  SocialLinks,
  SubmitReportRequest,
  EditReportRequest,
  User,
} from "@/backend";

export interface AdminSession {
  token: string;
  loggedInAt: number;
}

export interface ReportFormData {
  name: string;
  mobile: string;
  district: string;
  location: string;
  category: string;
  description: string;
  imageFile: File | null;
  gpsLocation?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}
