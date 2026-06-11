import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

export default function PrivacyPage() {
  return (
    <Layout>
      <section
        className="hero-gradient text-white py-14"
        data-ocid="privacy.hero_section"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 mb-4">
              🔒 Privacy
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Aapki privacy hamari zimmedari hai.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        className="bg-background py-14"
        data-ocid="privacy.content_section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-card space-y-8"
          >
            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                1. Sammaan Ki Jaankari
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Swachhata Prahari aapki vyaktigat jaankari ko surekhsit rakhta
                hai. Hum sirf wahi data collect karte hain jo cleanliness
                reports ke liye zaruri hai — jaise naam, mobile number, location
                aur photos.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                2. Data Ka Upyog
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Aapka data kewal sambandhit authorities tak report pahunchane ke
                liye use kiya jata hai. Hum aapka data kisi third party ke saath
                share nahi karte, siw unke jo sarakari safai karyakram mein
                sahyog dete hain.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                3. Photos aur Media
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Upload ki gayi photos platform par store hoti hain aur report ke
                saath authorities ko bheji jati hain. Aap apni photos hatane ke
                liye hamse sampark kar sakte hain.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                4. Sampark
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Privacy se judi kisi bhi samasya ke liye hume likhein:
                rudrapratapsingh789.063@gmail.com ya WhatsApp karein: +91
                9263989760.
              </p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Prabhaavit Taareekh:</strong>{" "}
              Yeh policy {new Date().getFullYear()} se praabhit hai. Hum samay
              samay par ise update kar sakte hain.
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
