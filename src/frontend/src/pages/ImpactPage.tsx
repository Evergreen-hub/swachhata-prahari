import type { ImpactReport } from "@/backend";
import { MediaType } from "@/backend";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useImpactReports } from "@/hooks/useReports";
import { CalendarDays, CheckCircle2, MapPin, Play, Users } from "lucide-react";
import { motion } from "motion/react";

function ImpactCard({
  report,
  index,
}: { report: ImpactReport; index: number }) {
  const date = new Date(
    Number(report.reportDate) / 1_000_000,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const cover = report.media[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <Card
        className="overflow-hidden border border-border shadow-card hover:shadow-elevated transition-shadow duration-300"
        data-ocid={`impact.item.${index + 1}`}
      >
        {cover && (
          <div className="relative aspect-video bg-muted">
            {cover.mediaType === MediaType.video ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Play className="w-12 h-12 text-primary" />
              </div>
            ) : (
              <img
                src={cover.blob?.getDirectURL() ?? cover.url}
                alt={report.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        )}
        <CardContent className="p-5">
          <h2 className="font-display font-bold text-lg text-foreground mb-2 leading-snug">
            {report.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {report.description}
          </p>
          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <CheckCircle2 className="w-4 h-4 text-primary mx-auto mb-1" />
              <div className="font-bold text-foreground text-lg">
                {report.resolvedCases.toString()}
              </div>
              <div className="text-muted-foreground text-xs">Resolved</div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3 text-center">
              <Users className="w-4 h-4 text-secondary mx-auto mb-1" />
              <div className="font-bold text-foreground text-lg">
                {report.volunteerCount.toString()}
              </div>
              <div className="text-muted-foreground text-xs">Volunteers</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-3 text-center">
              <MapPin className="w-4 h-4 text-primary mx-auto mb-1" />
              <div className="font-bold text-foreground text-lg">
                {report.areasCoovered.toString()}
              </div>
              <div className="text-muted-foreground text-xs">Areas</div>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <CalendarDays className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
              <div className="font-bold text-foreground text-sm">{date}</div>
              <div className="text-muted-foreground text-xs">Date</div>
            </div>
          </div>
          {/* Media Strip */}
          {report.media.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {report.media.slice(1, 5).map((m, i) => (
                <div
                  key={`${report.id}-media-${i}`}
                  className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted"
                >
                  {m.mediaType === MediaType.video ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                  ) : (
                    <img
                      src={m.blob?.getDirectURL() ?? m.url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ImpactPage() {
  const { data: reports = [], isLoading } = useImpactReports();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="bg-card border-b border-border py-12 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                🏆 Hamara Prabhav
              </Badge>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                Impact Reports
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Swachhata Prahari team ke safai abhiyan aur volunteer efforts ka
                record — har maheene ke kaam ki report.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reports */}
        <section className="container mx-auto px-4 py-10">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {["a", "b", "c", "d"].map((k) => (
                <div
                  key={k}
                  className="space-y-3 border border-border rounded-xl p-5"
                >
                  <Skeleton className="w-full aspect-video rounded-lg" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : reports.length === 0 ? (
            <div
              className="text-center py-20 bg-card border border-border rounded-xl"
              data-ocid="impact.empty_state"
            >
              <CheckCircle2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                Abhi koi impact report nahi hai
              </p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                Jald hi hamari pehli impact report aayegi.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reports.map((r, i) => (
                <ImpactCard key={r.id} report={r} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
