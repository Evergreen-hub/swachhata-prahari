import { e as useActor, i as useQuery, f as createActor } from "./button-BHNwtKCm.js";
import { c as useQueryClient } from "./index-6efX3_t7.js";
import { a as useMutation } from "./index-g2n4Sv33.js";
function useReports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReports();
    },
    enabled: !!actor && !isFetching
  });
}
function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useSubmitReport() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitReport(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useUpdateReportStatus(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateReportStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useDeleteReport(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteReport(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useVolunteerApplications(token) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getVolunteerApplications();
    },
    enabled: !!actor && !isFetching && !!token
  });
}
function useSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSettings();
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveSettings(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.saveSettings(token, settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    }
  });
}
function usePublicGalleryItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["gallery", "public"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicGalleryItems();
    },
    enabled: !!actor && !isFetching
  });
}
function useDonorGalleryItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["gallery", "donor"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDonorGalleryItems();
    },
    enabled: !!actor && !isFetching
  });
}
function useGalleryItems(token) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["gallery", "all"],
    queryFn: async () => {
      if (!actor || !token) return [];
      return actor.getGalleryItems();
    },
    enabled: !!actor && !isFetching && !!token
  });
}
function useAddGalleryItem(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.addGalleryItem(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });
}
function useDeleteGalleryItem(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteGalleryItem(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });
}
function useImpactReports() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["impactReports"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getImpactReports();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddImpactReport(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.addImpactReport(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactReports"] });
    }
  });
}
function useUpdateImpactReport(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateImpactReport(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactReports"] });
    }
  });
}
function useDeleteImpactReport(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteImpactReport(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactReports"] });
    }
  });
}
function useTeamMembers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddTeamMember(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.addTeamMember(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
  });
}
function useUpdateTeamMember(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.updateTeamMember(token, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
  });
}
function useDeleteTeamMember(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !token) throw new Error("Not authorized");
      return actor.deleteTeamMember(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    }
  });
}
function useProject(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      const list = await actor.getProjects();
      return list.find((p) => p.id === id) ?? null;
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProject(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
function useUpdateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProject(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}
function useEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEvents();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.addEvent(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}
function useUpdateEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateEvent(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}
function useDeleteEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    }
  });
}
function useRegisterForEvent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerForEvent(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventRegistrations"] });
    }
  });
}
function useEventRegistrations(eventId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["eventRegistrations", eventId],
    queryFn: async () => {
      if (!actor || !eventId) return [];
      return actor.getEventRegistrations(eventId);
    },
    enabled: !!actor && !isFetching && !!eventId
  });
}
function useBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts();
    },
    enabled: !!actor && !isFetching
  });
}
function useBlogPost(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["blogPost", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useAddBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBlogPost(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    }
  });
}
function useUpdateBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBlogPost(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    }
  });
}
function useDeleteBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
    }
  });
}
function useDocuments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDocuments();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddDocument() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.addDocument(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    }
  });
}
function useDeleteDocument() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteDocument(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    }
  });
}
function useTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddTestimonial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTestimonial(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    }
  });
}
function useUpdateTestimonial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTestimonial(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    }
  });
}
function useDeleteTestimonial() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    }
  });
}
function useHomeContent() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["homeContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHomeContent();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateHomeContent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateHomeContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeContent"] });
    }
  });
}
function useAboutContent() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["aboutContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAboutContent();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateAboutContent() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAboutContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutContent"] });
    }
  });
}
export {
  useUpdateTeamMember as A,
  useDeleteTeamMember as B,
  useAddImpactReport as C,
  useUpdateImpactReport as D,
  useDeleteImpactReport as E,
  useAddProject as F,
  useUpdateProject as G,
  useDeleteProject as H,
  useAddEvent as I,
  useUpdateEvent as J,
  useDeleteEvent as K,
  useEventRegistrations as L,
  useAddBlogPost as M,
  useUpdateBlogPost as N,
  useDeleteBlogPost as O,
  useAddDocument as P,
  useDeleteDocument as Q,
  useAddTestimonial as R,
  useUpdateTestimonial as S,
  useDeleteTestimonial as T,
  useUpdateHomeContent as U,
  useUpdateAboutContent as V,
  useProject as a,
  useEvents as b,
  useRegisterForEvent as c,
  useBlogPosts as d,
  useBlogPost as e,
  useDocuments as f,
  useStats as g,
  useReports as h,
  useSettings as i,
  useTeamMembers as j,
  useHomeContent as k,
  useTestimonials as l,
  useSubmitReport as m,
  useAboutContent as n,
  useVolunteerApplications as o,
  useGalleryItems as p,
  useImpactReports as q,
  useUpdateReportStatus as r,
  useDeleteReport as s,
  useAddGalleryItem as t,
  useProjects as u,
  useDeleteGalleryItem as v,
  useSaveSettings as w,
  useDonorGalleryItems as x,
  usePublicGalleryItems as y,
  useAddTeamMember as z
};
