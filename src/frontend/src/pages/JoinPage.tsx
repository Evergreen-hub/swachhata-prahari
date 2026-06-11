import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Globe, HeartHandshake, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const BENEFITS = [
  {
    icon: HeartHandshake,
    title: "Community Impact",
    titleHi: "Samudaay Mein Badlav",
    desc: "Apne shehar aur gaon mein safai ki disha mein seedha yogdan dein. Har ek volunteer ki bhoomika mahatvapurn hai.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Star,
    title: "Recognition",
    titleHi: "Samman aur Pahchaan",
    desc: "Active volunteers ko certificate aur special recognition milti hai. Apni mehnat aur seva ko samman dilwayein.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Globe,
    title: "Network",
    titleHi: "Vistrit Network",
    desc: "Hazaron samaan vichar wale nagrikon se milein, local leaders se judein aur ek majboot community ka hissa banein.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export default function JoinPage() {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="hero-gradient text-white py-16 md:py-20 relative overflow-hidden"
        data-ocid="join.hero_section"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-5">
              <img
                src="/assets/logo-circular.png"
                alt="Join Swachhata Prahari Team"
                className="h-24 w-24 drop-shadow-lg"
              />
            </div>
            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 mb-4">
              🤝 Volunteer Programme
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
              Join Swachhata Prahari Team
            </h1>
            <p className="text-white/80 max-w-xl mx-auto leading-relaxed text-lg">
              Apne shehar ko saaf aur sundar banane ke mission me volunteer ke
              roop me judein.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-white/60 text-sm">
              <Users className="w-4 h-4" />
              <span>1,200+ volunteers already joined across Bihar</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="bg-background py-14"
        data-ocid="join.benefits_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              Kyun Judein?
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Volunteer Ke Fayde
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Hamari team ka hissa banen aur apne shehar ko swachh banane mein
              sarthak bhumika adaa karein.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                data-ocid={`join.benefit_card.${i + 1}`}
              >
                <Card className="h-full border-border shadow-card card-hover text-center">
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 ${b.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <b.icon className={`w-7 h-7 ${b.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">
                      {b.title}
                    </h3>
                    <p className={`text-xs font-medium mb-3 ${b.color}`}>
                      {b.titleHi}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SurveyHeart Form */}
      <section className="section-alt py-14" data-ocid="join.form_section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
              Registration
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Abhi Register Karein
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Neeche form bharein aur Swachhata Prahari volunteer team ka hissa
              banein.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-card"
            data-ocid="join.iframe_container"
          >
            <iframe
              src="https://form.svhrt.com/6a1aa26c160ebc719d34a124"
              width="100%"
              height={600}
              scrolling="yes"
              title="Join Swachhata Prahari Volunteer Form"
              className="block border-0"
              aria-label="Volunteer registration form"
              data-ocid="join.survey_embed"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-12" data-ocid="join.cta_section">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Volunteer nahi banana? Seedhe report karein.
          </p>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-smooth"
            data-ocid="join.report_link_button"
          >
            🚨 Report Problem
          </Link>
        </div>
      </section>
    </Layout>
  );
}
