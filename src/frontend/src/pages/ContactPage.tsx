import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";

const WHATSAPP = "919263989760";

const CONTACT_ITEMS = [
  {
    icon: MessageSquare,
    label: "WhatsApp",
    labelHi: "व्हाट्सएप",
    value: "+91 9263989760",
    href: `https://wa.me/${WHATSAPP}?text=Hello%20Swachhata%20Prahari`,
    color: "text-primary",
    bg: "bg-primary/10",
    isExternal: true,
  },
  {
    icon: Phone,
    label: "Phone",
    labelHi: "फोन",
    value: "+91 9263989760",
    href: "tel:+919263989760",
    color: "text-secondary",
    bg: "bg-secondary/10",
    isExternal: false,
  },
  {
    icon: Mail,
    label: "Email",
    labelHi: "ईमेल",
    value: "rudrapratapsingh789.063@gmail.com",
    href: "mailto:rudrapratapsingh789.063@gmail.com",
    color: "text-primary",
    bg: "bg-primary/10",
    isExternal: false,
  },
  {
    icon: MapPin,
    label: "Location",
    labelHi: "पता",
    value: "Sitamarhi, Bihar, India",
    href: "https://maps.google.com/?q=Sitamarhi,Bihar",
    color: "text-secondary",
    bg: "bg-secondary/10",
    isExternal: true,
  },
];

const SOCIAL_LINKS = [
  {
    icon: SiFacebook,
    label: "Facebook",
    href: "https://facebook.com/swachtaprahari",
    color: "text-primary",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
    href: "https://instagram.com/swachtaprahari",
    color: "text-secondary",
  },
  {
    icon: SiX,
    label: "X",
    href: "https://x.com/swachtaprahari",
    color: "text-foreground",
  },
  {
    icon: SiYoutube,
    label: "YouTube",
    href: "https://youtube.com/@swachtaprahari",
    color: "text-foreground/60",
  },
];

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Kripya saari fields bharein.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success(
      "Aapka message mil gaya! Hum 24 ghante mein aapse sampark karenge.",
    );
  };

  const handleChange =
    (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Layout>
      {/* Hero */}
      <section
        className="hero-gradient text-white py-16 md:py-20 relative overflow-hidden"
        data-ocid="contact.hero_section"
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
                src="/assets/logo-uploaded.png"
                alt="Swachhata Prahari"
                className="h-14 w-auto object-contain"
              />
            </div>
            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 mb-4">
              📬 Sampark Karein
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">
              Hamse Sampark Karein
            </h1>
            <p className="text-white/80 max-w-xl mx-auto leading-relaxed text-lg">
              Koi bhi sawal, sujhaav ya madad ke liye hum 24×7 uplabdh hain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-background py-12" data-ocid="contact.info_section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {CONTACT_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`contact.info_card.${i + 1}`}
              >
                <a
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="block h-full"
                  aria-label={`Contact via ${item.label}`}
                >
                  <Card className="h-full border-border shadow-card hover:shadow-elevated transition-shadow duration-300 card-hover">
                    <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                      <div
                        className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`}
                      >
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-medium mb-0.5 ${item.color}`}
                        >
                          {item.labelHi}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 break-all">
                          {item.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Social */}
      <section className="section-alt py-14" data-ocid="contact.form_section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                Message Bhejein
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Send us a message — we reply within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/10 border border-primary/30 rounded-xl p-8 text-center"
                  data-ocid="contact.success_state"
                >
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    Shukriya!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Aapka message hamare paas pahunch gaya. Hum jald hi aapse
                    sampark karenge.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 text-primary text-sm underline"
                    data-ocid="contact.send_another_button"
                  >
                    Ek aur message bhejein
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4 bg-card border border-border rounded-2xl p-6 shadow-card"
                  data-ocid="contact.message_form"
                >
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-medium"
                    >
                      Aapka Naam *
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Naam darj karein"
                      value={form.name}
                      onChange={handleChange("name")}
                      required
                      className="mt-1"
                      data-ocid="contact.name_input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-medium"
                    >
                      Email *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                      className="mt-1"
                      data-ocid="contact.email_input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="text-sm font-medium"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Aapka sawal ya sujhav yahan likhein..."
                      value={form.message}
                      onChange={handleChange("message")}
                      rows={5}
                      required
                      className="mt-1 resize-none"
                      data-ocid="contact.message_textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-semibold"
                    data-ocid="contact.submit_button"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Bhej rahe hain...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Message Bhejein
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Social + Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-1">
                Social Media
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Humse jude rahein aur latest updates paaein.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${s.label} page`}
                    data-ocid={`contact.social_${s.label.toLowerCase()}_button`}
                    className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <s.icon className={`w-5 h-5 ${s.color} flex-shrink-0`} />
                    <span className="text-sm font-medium text-foreground">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Seedha WhatsApp Karein
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Kisi bhi samasya ke liye seedha WhatsApp par sampark karein —
                  fastest response guaranteed.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=Hello%20Swachhata%20Prahari%2C%20main%20sampark%20karna%20chahta%20hun.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_cta_button"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-smooth text-sm"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Karein
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
