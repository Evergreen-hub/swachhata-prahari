import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

export default function TermsPage() {
  return (
    <Layout>
      <section
        className="hero-gradient text-white py-14"
        data-ocid="terms.hero_section"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-secondary/20 text-secondary border border-secondary/30 mb-4">
              📋 Terms
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Swachhata Prahari use karne ke niyam aur shartein.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        className="bg-background py-14"
        data-ocid="terms.content_section"
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
                1. Platform Ka Upyog
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Swachhata Prahari ek naagarik-sanchalit safai reporting platform
                hai. Is platform ka upyog kewal genuinely cleanliness issues
                report karne ke liye kiya jana chahiye. Galat ya jhoothe reports
                dena varjit hai.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                2. Aapki Zimmedari
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Aap jo jaankari dete hain woh sach aur sahi honi chahiye. Aap
                ensure karein ki upload ki gayi photos aur description accurate
                hain. Galat information dene wale users ko platform se ban kiya
                ja sakta hai.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                3. Content Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Koi bhi abusive, offensive, ya irrelevant content upload karna
                mana hai. Hum report content ko review karke inappropriate
                content hatane ka adhikar rakhte hain.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                4. Sewa Ki Seema
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Swachhata Prahari ek voluntary initiative hai. Hum guarantee
                nahi karte ki har report par action hoga, lekin hum poori
                koshish karte hain ki har report sambandhit authorities tak
                pahunche.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl text-foreground mb-3">
                5. Sampark
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Kisi bhi vivad ya prashn ke liye:
                rudrapratapsingh789.063@gmail.com ya +91 9263989760.
              </p>
            </div>

            <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Prabhaavit Taareekh:</strong>{" "}
              Yeh niyam {new Date().getFullYear()} se praabhit hain. In niyamon
              ko bina poorv soochna ke badla ja sakta hai.
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
