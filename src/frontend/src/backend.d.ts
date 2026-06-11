import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UpdateProjectRequest {
    id: string;
    status?: ProjectStatus;
    title?: string;
    description?: string;
    progressPercent?: bigint;
    featuredImageUrl?: string;
    category?: string;
}
export interface VolunteerApplication {
    id: string;
    status: VolunteerStatus;
    volunteerHours: bigint;
    name: string;
    createdAt: bigint;
    email: string;
    availability: string;
    rankingBadge: string;
    mobile: string;
}
export type Timestamp = bigint;
export interface AddTestimonialRequest {
    name: string;
    role: string;
    quote: string;
    photoUrl?: string;
    isActive: boolean;
}
export interface AddEventRequest {
    title: string;
    isCompleted: boolean;
    date: bigint;
    isRegistrationOpen: boolean;
    description: string;
    featuredImageUrl?: string;
    location: string;
}
export interface AddImpactReportRequest {
    media: Array<ImpactMedia>;
    title: string;
    volunteerCount: bigint;
    description: string;
    reportDate: bigint;
    areasCoovered: bigint;
    resolvedCases: bigint;
}
export interface Stats {
    resolved: bigint;
    total: bigint;
    pending: bigint;
    volunteers: bigint;
}
export interface SocialLinks {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
}
export interface EventRegistration {
    id: string;
    eventId: string;
    name: string;
    createdAt: bigint;
    phone: string;
}
export interface UpdateImpactReportRequest {
    id: string;
    media?: Array<ImpactMedia>;
    title?: string;
    volunteerCount?: bigint;
    description?: string;
    reportDate?: bigint;
    areasCoovered?: bigint;
    resolvedCases?: bigint;
}
export interface Report {
    id: string;
    status: ReportStatus;
    imageBlob?: ExternalBlob;
    name: string;
    createdAt: bigint;
    description: string;
    district: string;
    updatedAt: bigint;
    category: ReportCategory;
    mobile: string;
    location: string;
    refNumber: string;
}
export interface Document {
    id: string;
    title: string;
    createdAt: bigint;
    description: string;
    category: DocumentCategory;
    fileUrl: string;
}
export interface CoreValue {
    title: string;
    description: string;
}
export interface ImpactReport {
    id: string;
    media: Array<ImpactMedia>;
    title: string;
    volunteerCount: bigint;
    createdAt: bigint;
    description: string;
    reportDate: bigint;
    updatedAt: bigint;
    areasCoovered: bigint;
    resolvedCases: bigint;
}
export interface AddTeamMemberRequest {
    bio?: string;
    order: bigint;
    name: string;
    role: string;
    photoUrl?: string;
}
export interface AddProjectRequest {
    status: ProjectStatus;
    title: string;
    description: string;
    progressPercent: bigint;
    featuredImageUrl?: string;
    category: string;
}
export interface EditReportRequest {
    id: string;
    imageBlob?: ExternalBlob;
    name?: string;
    description?: string;
    district?: string;
    category?: ReportCategory;
    mobile?: string;
    location?: string;
}
export interface UpdateBlogPostRequest {
    id: string;
    title?: string;
    content?: string;
    isPublished?: boolean;
    tags?: Array<string>;
    featuredImageUrl?: string;
    category?: string;
}
export interface AboutContent {
    coreValues: Array<CoreValue>;
    organizationStory: string;
}
export interface UpdateGalleryItemRequest {
    id: string;
    url?: string;
    title?: string;
    blob?: ExternalBlob;
    description?: string;
    category?: GalleryCategory;
}
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    createdAt: bigint;
    tags: Array<string>;
    featuredImageUrl?: string;
    category: string;
}
export interface ImpactMedia {
    url: string;
    blob?: ExternalBlob;
    mediaType: MediaType;
}
export interface SubmitReportRequest {
    imageBlob?: ExternalBlob;
    name: string;
    description: string;
    district: string;
    category: ReportCategory;
    mobile: string;
    location: string;
}
export interface HomeContent {
    missionText: string;
    ctaButtonLink: string;
    ctaButtonText: string;
    heroSubtitle: string;
    heroTitle: string;
    visionText: string;
}
export interface User {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    photoUrl: string;
    email: string;
}
export interface Event {
    id: string;
    title: string;
    isCompleted: boolean;
    date: bigint;
    isRegistrationOpen: boolean;
    createdAt: bigint;
    description: string;
    featuredImageUrl?: string;
    location: string;
}
export interface UpdateEventRequest {
    id: string;
    title?: string;
    isCompleted?: boolean;
    date?: bigint;
    isRegistrationOpen?: boolean;
    description?: string;
    featuredImageUrl?: string;
    location?: string;
}
export interface UpdateTestimonialRequest {
    id: string;
    name?: string;
    role?: string;
    quote?: string;
    photoUrl?: string;
    isActive?: boolean;
}
export interface AddBlogPostRequest {
    title: string;
    content: string;
    isPublished: boolean;
    tags: Array<string>;
    featuredImageUrl?: string;
    category: string;
}
export type UserId = string;
export interface Settings {
    bankAccountNumber?: string;
    websiteName: string;
    bankAccountHolder?: string;
    founderName?: string;
    founderPhoto?: string;
    socialLinks: SocialLinks;
    bankIfsc?: string;
    whatsappNumber: string;
    founderBio?: string;
    upiQrImageUrl?: string;
    contactEmail: string;
    upiId?: string;
    location: string;
    contactPhone: string;
}
export interface AddGalleryItemRequest {
    url: string;
    title?: string;
    blob?: ExternalBlob;
    description?: string;
    mediaType: MediaType;
    category: GalleryCategory;
}
export interface AddDocumentRequest {
    title: string;
    description: string;
    category: DocumentCategory;
    fileUrl: string;
}
export interface TeamMember {
    id: string;
    bio?: string;
    order: bigint;
    name: string;
    createdAt: bigint;
    role: string;
    photoUrl?: string;
    updatedAt: bigint;
}
export interface RegisterForEventRequest {
    eventId: string;
    name: string;
    phone: string;
}
export interface Project {
    id: string;
    status: ProjectStatus;
    title: string;
    createdAt: bigint;
    description: string;
    progressPercent: bigint;
    featuredImageUrl?: string;
    category: string;
}
export interface GalleryItem {
    id: string;
    url: string;
    title?: string;
    blob?: ExternalBlob;
    createdAt: bigint;
    description?: string;
    updatedAt: bigint;
    mediaType: MediaType;
    category: GalleryCategory;
}
export interface UpdateTeamMemberRequest {
    id: string;
    bio?: string;
    order?: bigint;
    name?: string;
    role?: string;
    photoUrl?: string;
}
export interface Testimonial {
    id: string;
    name: string;
    createdAt: bigint;
    role: string;
    quote: string;
    photoUrl?: string;
    isActive: boolean;
}
export enum DocumentCategory {
    certificate = "certificate",
    other = "other",
    legal = "legal",
    auditReport = "auditReport",
    annualReport = "annualReport",
    policy = "policy"
}
export enum GalleryCategory {
    general = "general",
    donor = "donor"
}
export enum MediaType {
    video = "video",
    image = "image"
}
export enum ProjectStatus {
    active = "active",
    completed = "completed",
    planning = "planning"
}
export enum ReportCategory {
    other = "other",
    roadCleanliness = "roadCleanliness",
    garbage = "garbage",
    waterLogging = "waterLogging",
    publicToiletIssue = "publicToiletIssue",
    drainageIssue = "drainageIssue"
}
export enum ReportStatus {
    resolved = "resolved",
    pending = "pending"
}
export enum VolunteerStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addBlogPost(req: AddBlogPostRequest): Promise<BlogPost>;
    addDocument(req: AddDocumentRequest): Promise<Document>;
    addEvent(req: AddEventRequest): Promise<Event>;
    addGalleryItem(token: string, req: AddGalleryItemRequest): Promise<GalleryItem | null>;
    addImpactReport(token: string, req: AddImpactReportRequest): Promise<ImpactReport | null>;
    addProject(req: AddProjectRequest): Promise<Project>;
    addTeamMember(token: string, req: AddTeamMemberRequest): Promise<TeamMember | null>;
    addTestimonial(req: AddTestimonialRequest): Promise<Testimonial>;
    adminLogin(username: string, password: string): Promise<string | null>;
    adminLogout(token: string): Promise<boolean>;
    deleteBlogPost(id: string): Promise<boolean>;
    deleteDocument(id: string): Promise<boolean>;
    deleteEvent(id: string): Promise<boolean>;
    deleteGalleryItem(token: string, id: string): Promise<boolean>;
    deleteImpactReport(token: string, id: string): Promise<boolean>;
    deleteProject(id: string): Promise<boolean>;
    deleteReport(id: string): Promise<boolean>;
    deleteTeamMember(token: string, id: string): Promise<boolean>;
    deleteTestimonial(id: string): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
    deleteVolunteerApplication(id: string): Promise<boolean>;
    editReport(req: EditReportRequest): Promise<Report | null>;
    getAboutContent(): Promise<AboutContent>;
    getAllUsers(): Promise<Array<User>>;
    getBlogPost(id: string): Promise<BlogPost | null>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getDocuments(): Promise<Array<Document>>;
    getDonorGalleryItems(): Promise<Array<GalleryItem>>;
    getEventRegistrations(eventId: string): Promise<Array<EventRegistration>>;
    getEvents(): Promise<Array<Event>>;
    getGalleryItems(): Promise<Array<GalleryItem>>;
    getHomeContent(): Promise<HomeContent>;
    getImpactReport(id: string): Promise<ImpactReport | null>;
    getImpactReports(): Promise<Array<ImpactReport>>;
    getProjects(): Promise<Array<Project>>;
    getPublicGalleryItems(): Promise<Array<GalleryItem>>;
    getReport(id: string): Promise<Report | null>;
    getReports(): Promise<Array<Report>>;
    getSettings(): Promise<Settings>;
    getStats(): Promise<Stats>;
    getTeamMembers(): Promise<Array<TeamMember>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserById(id: string): Promise<User | null>;
    getVolunteerApplications(): Promise<Array<VolunteerApplication>>;
    registerForEvent(req: RegisterForEventRequest): Promise<EventRegistration>;
    registerOrUpdateUser(user: User): Promise<User>;
    saveSettings(token: string, settings: Settings): Promise<boolean>;
    submitReport(req: SubmitReportRequest): Promise<Report>;
    submitVolunteerApplication(name: string, mobile: string, email: string, availability: string): Promise<VolunteerApplication>;
    updateAboutContent(content: AboutContent): Promise<boolean>;
    updateBlogPost(req: UpdateBlogPostRequest): Promise<BlogPost | null>;
    updateEvent(req: UpdateEventRequest): Promise<Event | null>;
    updateGalleryItem(token: string, req: UpdateGalleryItemRequest): Promise<GalleryItem | null>;
    updateHomeContent(content: HomeContent): Promise<boolean>;
    updateImpactReport(token: string, req: UpdateImpactReportRequest): Promise<ImpactReport | null>;
    updateProject(req: UpdateProjectRequest): Promise<Project | null>;
    updateReportStatus(id: string, status: ReportStatus): Promise<boolean>;
    updateTeamMember(token: string, req: UpdateTeamMemberRequest): Promise<TeamMember | null>;
    updateTestimonial(req: UpdateTestimonialRequest): Promise<Testimonial | null>;
    updateVolunteerHours(id: string, hours: bigint): Promise<boolean>;
    updateVolunteerStatus(id: string, status: VolunteerStatus): Promise<boolean>;
}
