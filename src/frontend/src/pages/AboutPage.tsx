import type { TeamMember } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAboutContent,
  useHomeContent,
  useSettings,
  useTeamMembers,
} from "@/hooks/useReports";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Flame,
  Leaf,
  MapPin,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const PILLARS = [
  {
    icon: Users,
    title: "Community / Samudaay",
    titleHi: "सामुदायिक भागीदारी",
    desc: "We believe change happens from the ground up. Every citizen of Sitamarhi, Muzaffarpur, and nearby Bihar regions has the power to make their neighbourhood cleaner.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Leaf,
    title: "Environment / Paryavaran",
    titleHi: "पर्यावरण सुरक्षा",
    desc: "Uncollected garbage, blocked drains and water-logging harm public health and our environment. Swachhata Prahari works to make reporting fast so authorities act faster.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Scale,
    title: "Accountability / Javabdehee",
    titleHi: "प्रशासनिक जवाबदेही",
    desc: "Every report creates a record. Citizens should be able to hold local authorities accountable for cleanliness standards — Swachhata Prahari makes that possible.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const REGIONS = [
  { name: "Sitamarhi", icon: "🏙️", desc: "Mukhyalay" },
  { name: "Muzaffarpur", icon: "🏙️", desc: "Vibhagiya Kendra" },
  { name: "Sheohar", icon: "🏘️", desc: "Nikalwartee Zila" },
  { name: "East Champaran", icon: "🏘️", desc: "Nikalwartee Zila" },
  { name: "West Champaran", icon: "🏘️", desc: "Nikalwartee Zila" },
  { name: "Darbhanga", icon: "🏘️", desc: "Nikalwartee Zila" },
];

export default function AboutPage() {
  const { data: settings } = useSettings();
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: aboutContent } = useAboutContent();
  const { data: homeContent } = useHomeContent();
  const sortedTeam = [...teamMembers].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  return (
    <Layout>
      {/* Hero */}
      <section
        className="hero-gradient text-white py-16 md:py-20 relative overflow-hidden"
        data-ocid="about.hero_section"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 bg-primary rounded-full blur-3xl" />
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
                alt="Swachhata Prahari"
                className="h-24 w-24 md:h-32 md:w-32"
              />
            </div>
            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 mb-4">
              🌿 Hamara Parichay
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
              Swachhata Prahari ke Baare Mein
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-lg">
              Ek nagarik-chaleet safai abhiyan jo Bihar ke logon ko apne shehar
              ko saaf aur sundar banane ke liye sashakt karta hai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="bg-background py-14"
        data-ocid="about.mission_section"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                Hamara Mission
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground mb-4">
                Our Mission / Hamaara Lakshya
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {aboutContent?.organizationStory ??
                  "Swachhata Prahari is a citizen-driven cleanliness initiative dedicated to helping improve sanitation and public cleanliness in Sitamarhi, Muzaffarpur and nearby regions of Bihar."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hamara uddeshya hai ki har nagrik apni aas-paas ki gandagi,
                kachra, blocked naale ya safai se judi koi bhi samasya asaani se
                report kar sake — taaki sambandhit authorities tak turant
                pahunche aur samadhan ho sake.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Shield, label: "Citizen-Led", color: "text-primary" },
                { icon: Flame, label: "Proactive", color: "text-secondary" },
                { icon: BookOpen, label: "Transparent", color: "text-primary" },
                { icon: MapPin, label: "Local Focus", color: "text-secondary" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center gap-2 card-hover"
                  data-ocid={`about.value_card.${i + 1}`}
                >
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section
        className="section-alt py-14"
        data-ocid="about.mission_vision_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              Mission &amp; Vision
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Hamara Lakshya aur Drishti
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: "🎯",
                title: "Mission",
                titleHi: "हमारा मिशन",
                desc: aboutContent?.organizationStory
                  ? `${aboutContent.organizationStory.slice(0, 120)}...`
                  : "Bharat ke logon ko ek saaf aur swasthya vatavaran mein rehne ka adhikar dilana — ek report, ek badlav.",
                color: "border-primary/40 bg-primary/5",
              },
              {
                icon: "👁️",
                title: "Vision",
                titleHi: "हमारी दृष्टि",
                desc:
                  homeContent?.visionText ??
                  "Ek aisa Bihar jahan har nagrik apne parivesh ki zimmedari le aur safai ko apni sanskriti ka hissa mane.",
                color: "border-secondary/40 bg-secondary/5",
              },
              {
                icon: "📜",
                title: "Values",
                titleHi: "हमारे मूल्य",
                desc: "Transparency (Paardarshhita) · Community (Samudaay) · Action (Kriya) · Impact (Prabhav)",
                color: "border-primary/40 bg-primary/5",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`rounded-xl border-2 p-6 ${item.color}`}
                data-ocid={`about.mvv_card.${i + 1}`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-primary mb-2">
                  {item.titleHi}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      {aboutContent && aboutContent.coreValues.length > 0 && (
        <section
          className="bg-background py-14"
          data-ocid="about.core_values_section"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
                Core Values
              </Badge>
              <h2 className="font-display font-bold text-3xl text-foreground">
                Hamare Moolya
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {aboutContent.coreValues.map((cv, i) => (
                <motion.div
                  key={cv.title || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-card card-hover"
                  data-ocid={`about.core_value.item.${i + 1}`}
                >
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {cv.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cv.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Metrics */}
      <section className="bg-background py-14" data-ocid="about.impact_section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
              Hamara Prabhav
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Impact in Numbers
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              {
                value: "247+",
                label: "Reports Filed",
                labelHi: "रिपोर्ट दर्ज",
                icon: "📄",
              },
              {
                value: "189+",
                label: "Resolved",
                labelHi: "समाधान हुए",
                icon: "✅",
              },
              {
                value: "34+",
                label: "Volunteers Joined",
                labelHi: "स्वयंसेवक",
                icon: "🤝",
              },
              {
                value: "6+",
                label: "Communities Served",
                labelHi: "समुदाय",
                icon: "🏘️",
              },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 text-center shadow-card"
                data-ocid={`about.impact_card.${i + 1}`}
              >
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="font-display font-bold text-3xl text-primary mb-1">
                  {metric.value}
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {metric.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.labelHi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-alt py-14" data-ocid="about.pillars_section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">
              Hamare Teeno Stambh
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Teen Mukhya Siddhant
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                data-ocid={`about.pillar_card.${i + 1}`}
              >
                <Card className="h-full border-border shadow-card card-hover">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 ${p.bg} rounded-full flex items-center justify-center mb-4`}
                    >
                      <p.icon className={`w-6 h-6 ${p.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-0.5">
                      {p.title}
                    </h3>
                    <p className={`text-xs font-medium mb-3 ${p.color}`}>
                      {p.titleHi}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Story */}
      <section className="bg-background py-14" data-ocid="about.story_section">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Hamari Kahaani
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground mb-6">
              Founding Story
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-base">
              Swachhata Prahari ki shuruat ek chhoti si soch se hui — jab kuch
              concerned nagrikon ne dekha ki Sitamarhi aur Muzaffarpur ke
              mohallon mein kachra badhta ja raha hai, drains jam rahe hain, aur
              koi sunne wala nahi hai. Tab unhone decide kiya ki technology ka
              use karke ek aise platform banaenge jahan har nagrik apni problem
              report kar sake.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Today, Swachhata Prahari is a growing movement with volunteers
              across Sitamarhi, Muzaffarpur, Sheohar, and surrounding districts
              — all united by one goal:{" "}
              <span className="text-foreground font-semibold">
                Awaaz Safai Ki.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Geographic Focus */}
      <section className="section-alt py-14" data-ocid="about.regions_section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Coverage Area
            </Badge>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Hamara Kshetra
            </h2>
            <p className="text-muted-foreground mt-2">
              Sitamarhi, Muzaffarpur aur irdgird ke jile
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {REGIONS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-4 text-center card-hover"
                data-ocid={`about.region_card.${i + 1}`}
              >
                <div className="text-2xl mb-2">{r.icon}</div>
                <p className="text-sm font-semibold text-foreground">
                  {r.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Founder */}
      {settings?.founderName && (
        <section
          className="bg-background py-14"
          data-ocid="about.founder_section"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                🌟 Sansthapak
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
              data-ocid="about.founder_card"
            >
              <div className="flex-shrink-0">
                {settings.founderPhoto ? (
                  <img
                    src={settings.founderPhoto}
                    alt={settings.founderName}
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary/30 shadow-md"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center text-7xl">
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
        <section className="section-alt py-14" data-ocid="about.team_section">
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
                  data-ocid={`about.team_member.${i + 1}`}
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
      <section className="bg-background py-14" data-ocid="about.cta_section">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              Is Mission Ka Hissa Banein
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-smooth"
                data-ocid="about.cta_join_button"
              >
                🤝 Join as Volunteer
              </Link>
              <Link
                to="/report"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-smooth"
                data-ocid="about.cta_report_button"
              >
                🚨 Report Problem
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
