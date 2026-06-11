import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));
const DocumentsPage = lazy(() => import("@/pages/DocumentsPage"));

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/HomePage"));
const ReportPage = lazy(() => import("@/pages/ReportPage"));
const JoinPage = lazy(() => import("@/pages/JoinPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminReports = lazy(() => import("@/pages/AdminReports"));
const AdminGallery = lazy(() => import("@/pages/AdminGallery"));
const AdminSettings = lazy(() => import("@/pages/AdminSettings"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));

const DonationPage = lazy(() => import("@/pages/DonationPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const ImpactPage = lazy(() => import("@/pages/ImpactPage"));
const AdminTeam = lazy(() => import("@/pages/AdminTeam"));
const AdminImpact = lazy(() => import("@/pages/AdminImpact"));
const AdminProjects = lazy(() => import("@/pages/AdminProjects"));
const AdminEvents = lazy(() => import("@/pages/AdminEvents"));
const AdminBlog = lazy(() => import("@/pages/AdminBlog"));
const AdminDocuments = lazy(() => import("@/pages/AdminDocuments"));
const AdminTestimonials = lazy(() => import("@/pages/AdminTestimonials"));
const AdminHomeContent = lazy(() => import("@/pages/AdminHomeContent"));
const AdminAboutContent = lazy(() => import("@/pages/AdminAboutContent"));
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <img
        src="/assets/logo-circular.png"
        alt="Swachhata Prahari"
        className="h-32 w-32 animate-pulse"
      />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

// Route definitions
const rootRoute = createRootRoute();
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
const reportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/report",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ReportPage />
    </Suspense>
  ),
});
const joinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/join",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <JoinPage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLoginPage />
    </Suspense>
  ),
});
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboard />
    </Suspense>
  ),
});
const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reports",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminReports />
    </Suspense>
  ),
});
const adminGalleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/gallery",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminGallery />
    </Suspense>
  ),
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminSettings />
    </Suspense>
  ),
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivacyPage />
    </Suspense>
  ),
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsPage />
    </Suspense>
  ),
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DonationPage />
    </Suspense>
  ),
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <GalleryPage />
    </Suspense>
  ),
});
const impactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/impact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ImpactPage />
    </Suspense>
  ),
});
const adminTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/team",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminTeam />
    </Suspense>
  ),
});
const adminProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/projects",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminProjects />
    </Suspense>
  ),
});
const adminEventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/events",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminEvents />
    </Suspense>
  ),
});
const adminBlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBlog />
    </Suspense>
  ),
});
const adminDocumentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/documents",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDocuments />
    </Suspense>
  ),
});
const adminTestimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/testimonials",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminTestimonials />
    </Suspense>
  ),
});
const adminHomeContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/home",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminHomeContent />
    </Suspense>
  ),
});
const adminAboutContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminAboutContent />
    </Suspense>
  ),
});
const adminImpactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/impact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminImpact />
    </Suspense>
  ),
});
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectsPage />
    </Suspense>
  ),
});
const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectDetailPage />
    </Suspense>
  ),
});
const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EventsPage />
    </Suspense>
  ),
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});
const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogDetailPage />
    </Suspense>
  ),
});
const documentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/documents",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DocumentsPage />
    </Suspense>
  ),
});
const routeTree = rootRoute.addChildren([
  homeRoute,
  reportRoute,
  joinRoute,
  aboutRoute,
  contactRoute,
  donateRoute,
  projectsRoute,
  projectDetailRoute,
  eventsRoute,
  blogRoute,
  blogDetailRoute,
  documentsRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminReportsRoute,
  adminGalleryRoute,
  adminSettingsRoute,
  adminTeamRoute,
  adminImpactRoute,
  adminProjectsRoute,
  adminEventsRoute,
  adminBlogRoute,
  adminDocumentsRoute,
  adminTestimonialsRoute,
  adminHomeContentRoute,
  adminAboutContentRoute,
  galleryRoute,
  impactRoute,
  privacyRoute,
  termsRoute,
]);

const router = createRouter({ routeTree });
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
