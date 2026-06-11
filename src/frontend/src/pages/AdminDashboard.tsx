import { ReportStatus } from "@/backend";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LABELS } from "@/constants";
import { useAdmin } from "@/hooks/useAdmin";
import {
  useBlogPosts,
  useEvents,
  useGalleryItems,
  useImpactReports,
  useProjects,
  useReports,
  useStats,
  useTeamMembers,
  useVolunteerApplications,
} from "@/hooks/useReports";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Clock,
  FolderKanban,
  Image,
  Newspaper,
  TrendingUp,
  UserSquare,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export default function AdminDashboard() {
  const { token } = useAdmin();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: reports, isLoading: reportsLoading } = useReports();
  const { data: volunteers } = useVolunteerApplications(token);
  const { data: galleryItems } = useGalleryItems(token);
  const { data: impactReports } = useImpactReports();
  const { data: teamMembers } = useTeamMembers();
  const { data: projects } = useProjects();
  const { data: events } = useEvents();
  const { data: blogPosts } = useBlogPosts();

  const recentReports = reports?.slice(0, 5) ?? [];

  const statCards = [
    {
      icon: ClipboardList,
      label: "Total Reports",
      value: stats ? String(stats.total) : "—",
      color: "text-primary",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats ? String(stats.pending) : "—",
      color: "text-amber-500",
    },
    {
      icon: CheckCircle,
      label: "Resolved",
      value: stats ? String(stats.resolved) : "—",
      color: "text-primary",
    },
    {
      icon: Users,
      label: "Volunteers",
      value: volunteers ? String(volunteers.length) : "—",
      color: "text-secondary",
    },
    {
      icon: Image,
      label: "Gallery Items",
      value: galleryItems ? String(galleryItems.length) : "—",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Impact Reports",
      value: impactReports ? String(impactReports.length) : "—",
      color: "text-secondary",
    },
    {
      icon: UserSquare,
      label: "Team Members",
      value: teamMembers ? String(teamMembers.length) : "—",
      color: "text-primary",
    },
    {
      icon: FolderKanban,
      label: "Total Projects",
      value: projects ? String(projects.length) : "—",
      color: "text-secondary",
    },
    {
      icon: CalendarDays,
      label: "Total Events",
      value: events ? String(events.length) : "—",
      color: "text-primary",
    },
    {
      icon: Newspaper,
      label: "Blog Posts",
      value: blogPosts ? String(blogPosts.length) : "—",
      color: "text-secondary",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6" data-ocid="dashboard.page">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Swachhata Prahari overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
              data-ocid={`dashboard.stat_card.${i + 1}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {s.label}
                </span>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className={`text-3xl font-display font-bold ${s.color}`}>
                  {s.value}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground">Recent Reports</h2>
            </div>
            <Link to="/admin/reports">
              <Button
                variant="outline"
                size="sm"
                data-ocid="dashboard.view_all_reports_button"
              >
                View All
              </Button>
            </Link>
          </div>
          {reportsLoading ? (
            <div className="p-4 space-y-3">
              {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => (
                <Skeleton key={id} className="h-14" />
              ))}
            </div>
          ) : recentReports.length > 0 ? (
            <div className="divide-y divide-border">
              {recentReports.map((r, i) => (
                <div
                  key={r.id}
                  className="p-4 flex items-center gap-4"
                  data-ocid={`dashboard.report_row.${i + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground truncate">
                        {r.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • {r.district}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {CATEGORY_LABELS[r.category].hi} •{" "}
                      {format(Number(r.createdAt) / 1_000_000, "dd MMM yyyy")}
                    </div>
                  </div>
                  <Badge
                    variant={
                      r.status === ReportStatus.resolved
                        ? "default"
                        : "secondary"
                    }
                    className="text-xs flex-shrink-0"
                  >
                    {r.status === ReportStatus.resolved
                      ? "Resolved"
                      : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="p-8 text-center text-muted-foreground text-sm"
              data-ocid="dashboard.reports_empty_state"
            >
              No reports yet
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
