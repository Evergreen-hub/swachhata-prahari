import { ProjectStatus } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useReports";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FolderOpen,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  [ProjectStatus.active]: {
    label: "Active",
    color: "bg-emerald-100 text-emerald-700",
    icon: TrendingUp,
  },
  [ProjectStatus.completed]: {
    label: "Completed",
    color: "bg-primary/10 text-primary",
    icon: CheckCircle2,
  },
  [ProjectStatus.planning]: {
    label: "Planning",
    color: "bg-amber-100 text-amber-700",
    icon: Clock,
  },
};

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(projects?.map((p) => p.category) ?? []);
    return ["all", ...Array.from(cats)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "all") return projects ?? [];
    return (projects ?? []).filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <Layout>
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors"
              data-ocid="projects.back_link"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              Our Projects
            </h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Swachhata Prahari ke safai abhiyan aur projects ki jankari. Har ek
            project hamare swachh Bihar ke sapne ko sakar kar raha hai.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Category Filter */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          data-ocid="projects.filter_list"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              data-ocid={`projects.filter_${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder
                key={`project-skeleton-${i}`}
                className="h-80 rounded-xl"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16" data-ocid="projects.empty_state">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground">
              Is category mein abhi koi project nahi hai.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const status = STATUS_CONFIG[project.status];
              const StatusIcon = status.icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-shadow"
                  data-ocid={`projects.item.${i + 1}`}
                >
                  <div className="h-48 bg-muted relative overflow-hidden">
                    {project.featuredImageUrl ? (
                      <img
                        src={project.featuredImageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <FolderOpen className="w-12 h-12 text-primary/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {project.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{project.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(
                            Number(project.createdAt) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">
                          {String(project.progressPercent)}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${Math.min(Number(project.progressPercent), 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <Link
                      to="/projects/$id"
                      params={{ id: project.id }}
                      data-ocid={`projects.view_button.${i + 1}`}
                    >
                      <Button variant="outline" className="w-full" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
