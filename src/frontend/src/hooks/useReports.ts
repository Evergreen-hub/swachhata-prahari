import {
  type AboutContent,
  type AddBlogPostRequest,
  type AddDocumentRequest,
  type AddEventRequest,
  type AddProjectRequest,
  type AddTestimonialRequest,
  type BlogPost,
  type Document,
  type Event,
  type EventRegistration,
  type HomeContent,
  type Project,
  type RegisterForEventRequest,
  type Testimonial,
  type UpdateBlogPostRequest,
  type UpdateEventRequest,
  type UpdateProjectRequest,
  type UpdateTestimonialRequest,
  createActor,
} from "@/backend";
import type {
  AddGalleryItemRequest,
  AddImpactReportRequest,
  AddTeamMemberRequest,
  GalleryItem,
  ImpactReport,
  ReportStatus,
  TeamMember,
  UpdateGalleryItemRequest,
  UpdateImpactReportRequest,
  UpdateTeamMemberRequest,
} from "@/backend";
import type { EditReportRequest, Report, SubmitReportRequest } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useReports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Report[]>({
    queryKey: ["reports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReport(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Report | null>({
    queryKey: ["report", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getReport(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: SubmitReportRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitReport(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateReportStatus(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: string; status: ReportStatus }) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateReportStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useDeleteReport(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteReport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useEditReport(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: EditReportRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.editReport(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

export function useVolunteerApplications(token: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getVolunteerApplications();
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveSettings(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: import("@/types").Settings) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.saveSettings(token, settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

// ── Gallery Hooks ────────────────────────────────────────────────────────────

export function usePublicGalleryItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery", "public"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDonorGalleryItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery", "donor"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDonorGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGalleryItems(token: string | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery", "all"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getGalleryItems();
    },
    enabled: !!actor && !isFetching && !!token,
  });
}

export function useAddGalleryItem(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddGalleryItemRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.addGalleryItem(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useUpdateGalleryItem(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateGalleryItemRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateGalleryItem(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteGalleryItem(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteGalleryItem(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

// ── Impact Report Hooks ──────────────────────────────────────────────────────

export function useImpactReports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ImpactReport[]>({
    queryKey: ["impactReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getImpactReports();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useImpactReport(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ImpactReport | null>({
    queryKey: ["impactReport", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getImpactReport(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddImpactReport(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddImpactReportRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.addImpactReport(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactReports"] });
    },
  });
}

export function useUpdateImpactReport(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateImpactReportRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateImpactReport(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactReports"] });
    },
  });
}

export function useDeleteImpactReport(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteImpactReport(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactReports"] });
    },
  });
}

// ── Team Member Hooks ────────────────────────────────────────────────────────

export function useTeamMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TeamMember[]>({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTeamMember(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddTeamMemberRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.addTeamMember(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}

export function useUpdateTeamMember(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateTeamMemberRequest) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateTeamMember(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}

export function useDeleteTeamMember(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteTeamMember(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}

export function useProject(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project | null>({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const list = await actor.getProjects();
      return list.find((p) => p.id === id) ?? null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

// ── Project Hooks ───────────────────────────────────────────────────────────

export function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddProjectRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProject(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateProjectRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProject(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

// ── Event Hooks ──────────────────────────────────────────────────────────────

export function useEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddEventRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addEvent(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateEventRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEvent(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useDeleteEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useRegisterForEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: RegisterForEventRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerForEvent(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventRegistrations"] });
    },
  });
}

export function useEventRegistrations(eventId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<EventRegistration[]>({
    queryKey: ["eventRegistrations", eventId],
    queryFn: async () => {
      if (!actor || !eventId) return [];
      return actor.getEventRegistrations(eventId);
    },
    enabled: !!actor && !isFetching && !!eventId,
  });
}

// ── Blog Post Hooks ────────────────────────────────────────────────────────

export function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useAddBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddBlogPostRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBlogPost(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateBlogPostRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBlogPost(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    },
  });
}

// ── Document Hooks ───────────────────────────────────────────────────────────

export function useDocuments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Document[]>({
    queryKey: ["documents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDocuments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDocument() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddDocumentRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addDocument(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDeleteDocument() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteDocument(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

// ── Testimonial Hooks ──────────────────────────────────────────────────────

export function useTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTestimonial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: AddTestimonialRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTestimonial(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateTestimonialRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTestimonial(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

// ── Home Content Hooks ───────────────────────────────────────────────────────

export function useHomeContent() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<HomeContent | null>({
    queryKey: ["homeContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHomeContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHomeContent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: HomeContent) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateHomeContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeContent"] });
    },
  });
}

// ── About Content Hooks ──────────────────────────────────────────────────────

export function useAboutContent() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AboutContent | null>({
    queryKey: ["aboutContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAboutContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAboutContent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: AboutContent) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAboutContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutContent"] });
    },
  });
}

// ── Volunteer Hours Hook ───────────────────────────────────────────────────

export function useUpdateVolunteerHours(token: string | null) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, hours }: { id: string; hours: bigint }) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateVolunteerHours(id, hours);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}
