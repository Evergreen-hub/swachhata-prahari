import { ProjectStatus, ReportCategory, ReportStatus } from "@/backend";
import type { TeamMember } from "@/backend";
import Layout from "@/components/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LABELS, SITE_TAGLINE } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import {
  useBlogPosts,
  useHomeContent,
  useProjects,
  useReports,
  useSettings,
  useStats,
  useTeamMembers,
  useTestimonials,
} from "@/hooks/useReports";
import type { Report } from "@/types";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  ClipboardList,
  Construction,
  Droplets,
  Loader2,
  LogIn,
  MapPin,
  Quote,
  Send,
  ShieldCheck,
  Toilet,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const STEPS = [
  {
    icon: Camera,
    step: "01",
    title: "Photo Upload Karein",
    desc: "Samasya ki photo kheench kar upload karein",
    color: "text-primary",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Location Batayein",
    desc: "Apna district aur exact location darj karein",
    color: "text-secondary",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Report Verify Hogi",
    desc: "Hamari team aapki report verify karegi",
    color: "text-primary",
  },
  {
    icon: Send,
    step: "04",
    title: "Authority Tak Pahunchayi Jayegi",
    desc: "Sambandhit adhikari tak report bheji jayegi",
    color: "text-secondary",
  },
];

const CATEGORY_ICONS: Record<ReportCategory, React.ElementType> = {
  [ReportCategory.garbage]: Trash2,
  [ReportCategory.drainageIssue]: Droplets,
  [ReportCategory.waterLogging]: AlertTriangle,
  [ReportCategory.publicToiletIssue]: Toilet,
  [ReportCategory.roadCleanliness]: Construction,
  [ReportCategory.other]: ClipboardList,
};

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${color} bg-current/10`}
      >
        <Icon className="w-6 h-6 text-current" style={{ color: "inherit" }} />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-foreground">
          {value}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function ReportCard({ report, index }: { report: Report; index: number }) {
  const CategoryIcon = CATEGORY_ICONS[report.category] ?? ClipboardList;
  const cat = CATEGORY_LABELS[report.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
      data-ocid={`reports.item.${index + 1}`}
    >
      {report.imageBlob ? (
        <img
          src={report.imageBlob.getDirectURL()}
          alt={`Report: ${cat.en}`}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-36 bg-muted flex items-center justify-center">
          <CategoryIcon className="w-10 h-10 text-muted-foreground/40" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant={
              report.status === ReportStatus.resolved ? "default" : "secondary"
            }
            className="text-xs"
          >
            {report.status === ReportStatus.resolved
              ? "✓ Resolved"
              : "⏳ Pending"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {report.district}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mb-1">
          <CategoryIcon className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs font-medium text-secondary">
            {cat.hi} / {cat.en}
          </span>
        </div>
        <p className="text-sm text-foreground font-medium line-clamp-2 mb-1">
          {report.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(Number(report.createdAt) / 1_000_000, "dd MMM yyyy")}
        </p>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: reports, isLoading: reportsLoading } = useReports();
  const { data: settings } = useSettings();
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: homeContent } = useHomeContent();
  const { data: projects = [] } = useProjects();
  const { data: blogPosts = [] } = useBlogPosts();
  const { data: testimonials = [] } = useTestimonials();
  const { user, isAuthenticated, signIn, isLoading: authLoading } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (err: unknown) {
      const e = err as { message?: string };
      if (e?.message && e.message !== "REDIRECT_INITIATED") {
        toast.error(e.message || "Sign-in failed. Please try again.");
      }
    }
  }

  const latestReports = reports?.slice(0, 6) ?? [];
  const sortedTeam = [...teamMembers].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );
  const featuredProjects = projects.slice(0, 3);
  const latestNews = blogPosts.filter((b) => b.isPublished).slice(0, 3);
  const activeTestimonials = testimonials.filter((t) => t.isActive);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="hero-gradient text-white relative overflow-hidden"
        data-ocid="home.hero_section"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-secondary/20 text-secondary border border-secondary/30 mb-4 text-xs">
                🌿 Swachh Bharat Mission
              </Badge>
              <div className="flex justify-center mb-5">
                <img
                  src="/assets/logo-circular.png"
                  alt="Swachhata Prahari Logo"
                  className="h-32 w-32 md:h-40 md:w-40 drop-shadow-lg"
                />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-3">
                Swachhata Prahari
              </h1>
              <p className="text-lg text-white/80 font-medium mb-2 italic">
                “Awaaz Safai Ki”
              </p>
              <p className="text-white/75 mb-8 leading-relaxed">
                {homeContent?.heroSubtitle ??
                  "Apne shehar ko saaf aur sundar banane mein yogdan dein. Gandagi, kachra, naala jam ya safai se judi samasya turant report karein."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/report">
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white border-0 font-semibold shadow-elevated inline-flex items-center gap-2"
                    style={{ color: "#ffffff" }}
                    data-ocid="home.hero_report_button"
                  >
                    <img
                      src="/assets/icon-report.png"
                      alt=""
                      className="h-5 w-5"
                    />
                    Report Problem
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button
                    size="lg"
                    className="bg-[#FF9933] hover:bg-[#FF9933]/90 border-0 font-semibold shadow-elevated"
                    style={{ color: "#1a1a1a" }}
                    data-ocid="home.hero_donate_button"
                  >
                    💛 Donate Now
                  </Button>
                </Link>
                <Link to="/join">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-semibold"
                    data-ocid="home.hero_join_button"
                  >
                    🤝 Join Team
                  </Button>
                </Link>
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                    <Avatar className="h-8 w-8 border border-white/30">
                      <AvatarImage src={user.photoUrl} alt={user.name} />
                      <AvatarFallback className="bg-secondary text-white text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white font-medium text-sm">
                      Welcome, {user.name.split(" ")[0]}!
                    </span>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-semibold inline-flex items-center gap-2 disabled:opacity-60"
                    onClick={handleSignIn}
                    disabled={authLoading}
                    data-ocid="home.hero_google_signin_button"
                  >
                    {authLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <LogIn className="w-5 h-5" />
                    )}
                    {authLoading ? "Signing In..." : "Sign In with Google"}
                  </Button>
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex items-center justify-center"
            >
              <img
                src="/assets/icon-report.png"
                alt="Swachhata Prahari - Safai Warrior"
                className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Appeal */}
      <section
        className="bg-[#FF9933]/8 border-y border-[#FF9933]/20 py-10"
        data-ocid="home.donation_appeal_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center md:text-left">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                💛 Aapka Yogdan Mahatvpurna Hai
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Har rupaiye ki madad se hum zyada se zyada logon tak pahunch
                sakte hain aur Bihar ko saaf banane ke mission ko aage badha
                sakte hain. Zero admin fee — 100% fund mission par lagta hai.
              </p>
            </div>
            <Link to="/donate" className="flex-shrink-0">
              <Button
                size="lg"
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-bold px-8 shadow-elevated"
                data-ocid="home.appeal_donate_button"
              >
                Abhi Donate Karein →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-12" data-ocid="home.stats_section">
        <div className="container mx-auto px-4">
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["stat-sk-1", "stat-sk-2", "stat-sk-3", "stat-sk-4"].map(
                (id) => (
                  <Skeleton key={id} className="h-24 rounded-xl" />
                ),
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
              >
                <StatCard
                  label="Total Reports"
                  value={stats ? String(stats.total) : "0"}
                  icon={ClipboardList}
                  color="text-primary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <StatCard
                  label="Resolved Cases"
                  value={stats ? String(stats.resolved) : "0"}
                  icon={CheckCircle}
                  color="text-secondary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <StatCard
                  label="Pending"
                  value={stats ? String(stats.pending) : "0"}
                  icon={TrendingUp}
                  color="text-secondary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <StatCard
                  label="Volunteers"
                  value={stats ? String(stats.volunteers) : "0"}
                  icon={Users}
                  color="text-primary"
                />
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="section-alt py-14"
        data-ocid="home.how_it_works_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              Process
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Kaise Kaam Karta Hai?
            </h2>
            <p className="text-muted-foreground mt-2">
              Report karna bahut aasan hai — sirf 4 aasaan steps
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 shadow-card card-hover text-center"
                data-ocid={`home.step_card.${i + 1}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div className="text-3xl font-display font-bold text-muted-foreground/30 mb-1">
                  {s.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges - Hamari Visvasniyata */}
      <section className="bg-background py-14" data-ocid="home.trust_section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              Visvasniyata
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Hamari Visvasniyata
            </h2>
            <p className="text-muted-foreground mt-2">
              Our Credibility — Aap par hamara bharosa
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              {
                icon: "✅",
                label: "Registered Initiative",
                labelHi: "पंजीकृत पहल",
              },
              { icon: "🤝", label: "Community Driven", labelHi: "समुदाय मैत्री" },
              {
                icon: "🔍",
                label: "Transparent Operations",
                labelHi: "पारदर्शी कार्य",
              },
              {
                icon: "💰",
                label: "Zero Admin Fee",
                labelHi: "शून्य प्रशासन शुल्क",
              },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border-2 border-primary/30 rounded-xl p-4 text-center card-hover"
                data-ocid={`home.trust_badge.${i + 1}`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-sm font-semibold text-foreground">
                  {badge.label}
                </p>
                <p className="text-xs text-primary mt-0.5">{badge.labelHi}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section
          className="bg-background py-14"
          data-ocid="home.featured_projects_section"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                  Projects
                </Badge>
                <h2 className="font-display font-bold text-3xl text-foreground">
                  Featured Projects
                </h2>
              </div>
              <Link to="/projects">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="home.view_all_projects_button"
                >
                  View All
                </Button>
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
                  data-ocid={`home.project.item.${i + 1}`}
                >
                  {project.featuredImageUrl ? (
                    <img
                      src={project.featuredImageUrl}
                      alt={project.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center">
                      <ClipboardList className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <Badge
                        variant={
                          project.status === ProjectStatus.completed
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {project.status === ProjectStatus.completed
                          ? "Completed"
                          : project.status === ProjectStatus.active
                            ? "Active"
                            : "Planning"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mb-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${Number(project.progressPercent)}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Number(project.progressPercent)}% complete
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
      {latestNews.length > 0 && (
        <section
          className="section-alt py-14"
          data-ocid="home.latest_news_section"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-2">
                  News
                </Badge>
                <h2 className="font-display font-bold text-3xl text-foreground">
                  Latest News
                </h2>
              </div>
              <Link to="/blog">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="home.view_all_news_button"
                >
                  View All
                </Button>
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestNews.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
                  data-ocid={`home.news.item.${i + 1}`}
                >
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt={post.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center">
                      <ClipboardList className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {post.content.replace(/<[^>]*>/g, "").slice(0, 120)}...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(
                        Number(post.createdAt) / 1_000_000,
                        "dd MMM yyyy",
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {activeTestimonials.length > 0 && (
        <section
          className="bg-background py-14"
          data-ocid="home.testimonials_section"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                Testimonials
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground">
                What People Say
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {activeTestimonials.slice(0, 6).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-card card-hover"
                  data-ocid={`home.testimonial.item.${i + 1}`}
                >
                  <Quote className="w-6 h-6 text-primary/40 mb-3" />
                  <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {t.photoUrl ? (
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-primary/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                        👤
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-primary">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Reports */}
      <section
        className="bg-background py-14"
        data-ocid="home.latest_reports_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-2">
                Latest
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground">
                Recent Reports
              </h2>
            </div>
            <Link to="/report">
              <Button
                variant="outline"
                size="sm"
                data-ocid="home.view_all_reports_button"
              >
                View All
              </Button>
            </Link>
          </motion.div>

          {reportsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "rep-sk-1",
                "rep-sk-2",
                "rep-sk-3",
                "rep-sk-4",
                "rep-sk-5",
                "rep-sk-6",
              ].map((id) => (
                <Skeleton key={id} className="h-60 rounded-xl" />
              ))}
            </div>
          ) : latestReports.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestReports.map((r, i) => (
                <ReportCard key={r.id} report={r} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 bg-card border border-border rounded-xl"
              data-ocid="home.reports_empty_state"
            >
              <ShieldCheck className="w-12 h-12 text-primary/40 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Abhi Koi Report Nahi
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Pehle report karne wale banein!
              </p>
              <Link to="/report">
                <Button data-ocid="home.first_report_button">
                  Report Karein
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Our Founder */}
      {settings?.founderName && (
        <section className="section-alt py-14" data-ocid="home.founder_section">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                🌟 Hamara Sansthapak
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground">
                Our Founder
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col md:flex-row items-center gap-8 bg-card border border-border rounded-2xl p-8 shadow-card"
              data-ocid="home.founder_card"
            >
              <div className="flex-shrink-0">
                {settings.founderPhoto ? (
                  <img
                    src={settings.founderPhoto}
                    alt={settings.founderName}
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-primary/30 shadow-md"
                  />
                ) : (
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center text-6xl">
                    👤
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
                  Founder & Director
                </Badge>
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  {settings.founderName}
                </h3>
                {settings.founderBio && (
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {settings.founderBio}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Our Team */}
      {sortedTeam.length > 0 && (
        <section className="bg-background py-14" data-ocid="home.team_section">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
                🤝 Hamari Toli
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground">
                Our Team
              </h2>
              <p className="text-muted-foreground mt-2">
                Swachhata Prahari ke dedicated team sadsya
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {sortedTeam.map((member: TeamMember, i: number) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-xl p-5 text-center shadow-card card-hover"
                  data-ocid={`home.team_member.${i + 1}`}
                >
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 mx-auto mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-3xl mx-auto mb-3">
                      👤
                    </div>
                  )}
                  <h4 className="font-semibold text-foreground text-sm mb-1 leading-snug">
                    {member.name}
                  </h4>
                  <p className="text-xs text-primary font-medium mb-2">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-16 bg-gradient-to-r from-primary to-secondary"
        data-ocid="home.cta_section"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Bihar Ko Saaf Banayein
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Aapki ek report ek badlav la sakti hai. Aaj hi Swachhata Prahari
                se judein aur apne shehar ko saaf sundar banane mein madad
                karein.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/report">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold shadow-elevated"
                    data-ocid="home.cta_report_button"
                  >
                    🚨 Abhi Report Karein
                  </Button>
                </Link>
                <Link to="/join">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-semibold"
                    data-ocid="home.cta_join_button"
                  >
                    🤝 Volunteer Banein
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
