import { ProjectStatus } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/useReports";
import { Link, useParams } from "@tanstack/react-router";
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

export default function ProjectDetailPage() {
  const { id } = useParams({ from: "/projects/$id" });
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 rounded-xl mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Project Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            Yeh project abhi uplabdh nahi hai.
          </p>
          <Link to="/projects" data-ocid="project_detail.back_to_projects">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const status = STATUS_CONFIG[project.status];
  const StatusIcon = status.icon;

  return (
    <Layout>
      <div className="bg-primary py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
            data-ocid="project_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
            {project.title}
          </h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8 md:py-12"
      >
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="h-64 md:h-96 bg-muted rounded-xl overflow-hidden mb-8">
            {project.featuredImageUrl ? (
              <img
                src={project.featuredImageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5">
                <FolderOpen className="w-20 h-20 text-primary/20" />
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}
            >
              <StatusIcon className="w-4 h-4" />
              {status.label}
            </span>
            <Badge variant="outline">{project.category}</Badge>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {new Date(
                Number(project.createdAt) / 1_000_000,
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {project.category}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              About This Project
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Progress */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-4">
              Project Progress
            </h3>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${Math.min(Number(project.progressPercent), 100)}%`,
                  }}
                />
              </div>
              <span className="text-lg font-bold text-foreground">
                {String(project.progressPercent)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {project.status === ProjectStatus.completed
                ? "Yeh project safalta poorvak poora ho chuka hai."
                : project.status === ProjectStatus.active
                  ? "Yeh project abhi chal raha hai aur tezi se aage badh raha hai."
                  : "Yeh project ki yojana banai ja rahi hai."}
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link to="/report" data-ocid="project_detail.report_button">
              <Button className="bg-primary hover:bg-primary/90">
                Report a Problem
              </Button>
            </Link>
            <Link to="/join" data-ocid="project_detail.join_button">
              <Button variant="outline">Join as Volunteer</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
