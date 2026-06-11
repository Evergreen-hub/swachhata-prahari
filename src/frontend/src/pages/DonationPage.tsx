import type { GalleryItem } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDonorGalleryItems, useSettings } from "@/hooks/useReports";
import { Check, Copy, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const UPI_NAME = "Swachhata%20Prahari";
const FALLBACK_UPI = "rudrapratapsingh789.063@okicici";
const FALLBACK_QR =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3Drudrapratapsingh789.063%40okicici%26pn%3DSwachhata%2520Prahari%26cu%3DINR";

const AMOUNTS = [
  { value: 100, label: "₹100" },
  { value: 500, label: "₹500", popular: true },
  { value: 1000, label: "₹1,000" },
  { value: 2500, label: "₹2,500" },
  { value: 5000, label: "₹5,000" },
  { value: 0, label: "Khud Chunein", custom: true },
];

const ALLOCATION = [
  { label: "Community Awareness", pct: 40, color: "bg-secondary" },
  { label: "Field Operations", pct: 35, color: "bg-primary" },
  { label: "Technology & Tools", pct: 15, color: "bg-blue-500" },
  { label: "Administration", pct: 10, color: "bg-muted-foreground" },
];

const UPI_STEPS = [
  "Apna UPI app kholein (PhonePe, GPay, Paytm)",
  "UPI ID darj karein ya QR scan karein",
  "Amount select ya enter karein",
  "Payment confirm karein",
  "Screenshot lete rahein",
];

const BANK_STEPS = [
  "Apne bank app ya net banking mein jaein",
  "Fund Transfer / NEFT / IMPS select karein",
  "Account details enter karein",
  "Amount enter karein",
  "Transfer confirm karein",
];

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <span className="text-sm text-foreground pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function DonationPage() {
  const [copied, setCopied] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { data: settings } = useSettings();
  const { data: donorItems = [], isLoading: galleryLoading } =
    useDonorGalleryItems();

  const activeUpiId = settings?.upiId ?? FALLBACK_UPI;
  const activeQrUrl = settings?.upiQrImageUrl ?? FALLBACK_QR;
  const activeAccountNumber = settings?.bankAccountNumber;
  const activeIfsc = settings?.bankIfsc;
  const activeAccountHolder =
    settings?.bankAccountHolder ?? "Swachhata Prahari";

  const handleCopyUPI = async () => {
    await navigator.clipboard.writeText(activeUpiId);
    setCopied(true);
    toast.success("UPI ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBank = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedBank(true);
    toast.success("Copied!");
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleAmountClick = (amount: number) => {
    const upiLink = `upi://pay?pa=${activeUpiId}&pn=${UPI_NAME}&am=${amount}&cu=INR`;
    window.open(upiLink, "_blank", "noopener");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background: "linear-gradient(135deg, #008000 0%, #FF9933 100%)",
        }}
        data-ocid="donation.hero_section"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-4 text-sm">
              💚 Donate Now
            </Badge>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
              Hamara Saath Den —
              <br />
              <span className="text-yellow-100">
                Safai Mission Ko Mazboot Karein
              </span>
            </h1>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Aapka chota sa yogdan ek swachh Bihar ka nirmaan kar sakta hai.
              Aaj hi donate karein aur is mission ka hissa banein.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Amount Cards */}
      <section
        className="bg-background py-12 md:py-16"
        data-ocid="donation.amounts_section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2 text-center">
              Donation Amount Chunein
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Apni ichha anusar amount chunein aur seedha UPI se donate karein
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {AMOUNTS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    type="button"
                    data-ocid={`donation.amount_card.${i + 1}`}
                    onClick={() =>
                      item.custom
                        ? toast.info(
                            `UPI ID use karein: ${activeUpiId} — apni ichha anusar koi bhi amount darj karein`,
                            { duration: 5000 },
                          )
                        : handleAmountClick(item.value)
                    }
                    className={`relative w-full rounded-2xl border-2 p-5 text-center transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      item.popular
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : item.custom
                          ? "border-secondary bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
                          : "border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow">
                        ⭐ Popular
                      </span>
                    )}
                    <span className="font-display font-bold text-xl md:text-2xl block">
                      {item.label}
                    </span>
                    {item.custom ? (
                      <span className="text-xs mt-1 block opacity-70">
                        UPI ID se koi bhi amount
                      </span>
                    ) : (
                      <span className="text-xs mt-1 block opacity-70">
                        Tap to Pay via UPI
                      </span>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* UPI Payment Section */}
      <section
        className="bg-muted/30 py-12 md:py-16"
        data-ocid="donation.upi_section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              UPI se Donate Karein
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              {/* QR Code */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="p-3 bg-white rounded-xl border-2 border-primary/20 shadow-sm">
                  <img
                    src={activeQrUrl}
                    alt="UPI QR Code"
                    className="w-44 h-44 md:w-48 md:h-48"
                    data-ocid="donation.qr_code"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Scan with any UPI app
                </p>
              </div>
              {/* UPI ID */}
              <div className="flex-1 w-full">
                <p className="text-sm text-muted-foreground mb-2 font-medium">
                  UPI ID
                </p>
                <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3 mb-4">
                  <span
                    className="font-mono text-base font-semibold text-foreground flex-1 break-all"
                    data-ocid="donation.upi_id"
                  >
                    {activeUpiId}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCopyUPI}
                    className="flex-shrink-0"
                    data-ocid="donation.copy_upi_button"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-green-600">✓</span> PhonePe, GPay,
                    Paytm, BHIM — sabhi UPI apps supported
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-green-600">✓</span> Instant transfer,
                    secure & safe
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-green-600">✓</span> Screenshot save
                    karein record ke liye
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bank Transfer Section */}
      <section
        className="bg-background py-12 md:py-16"
        data-ocid="donation.bank_section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6 text-center">
              Bank Transfer
            </h2>
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Account Holder Name
                    </p>
                    <p className="font-medium text-foreground">
                      {activeAccountHolder}
                    </p>
                  </div>
                  {activeAccountNumber ? (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Account Number
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-semibold text-foreground">
                          {activeAccountNumber}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopyBank(activeAccountNumber)}
                          className="text-primary hover:text-primary/80 transition-colors"
                          aria-label="Copy account number"
                          data-ocid="donation.copy_account_button"
                        >
                          {copiedBank ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Account Number
                      </p>
                      <p className="text-muted-foreground text-sm italic">
                        Admin se prapt karein
                      </p>
                    </div>
                  )}
                  {activeIfsc ? (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        IFSC Code
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-semibold text-foreground">
                          {activeIfsc}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleCopyBank(activeIfsc)}
                          className="text-primary hover:text-primary/80 transition-colors"
                          aria-label="Copy IFSC"
                          data-ocid="donation.copy_ifsc_button"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        IFSC Code
                      </p>
                      <p className="text-muted-foreground text-sm italic">
                        Admin se prapt karein
                      </p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Branch
                    </p>
                    <p className="font-medium text-foreground">
                      Sitamarhi, Bihar
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                  <p className="text-xs text-muted-foreground">
                    💡 Bank details ya assistance ke liye WhatsApp karein:{" "}
                    <a
                      href="https://wa.me/919263989760"
                      className="text-primary underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      9263989760
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Donate Steps */}
      <section
        className="bg-muted/30 py-12 md:py-16"
        data-ocid="donation.steps_section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">
              Kaise Donate Karein
            </h2>
            <Tabs defaultValue="upi" className="w-full">
              <TabsList
                className="grid grid-cols-2 w-full mb-6"
                data-ocid="donation.steps_tabs"
              >
                <TabsTrigger value="upi" data-ocid="donation.upi_tab">
                  📱 UPI se
                </TabsTrigger>
                <TabsTrigger value="bank" data-ocid="donation.bank_tab">
                  🏦 Bank se
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upi">
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <StepList steps={UPI_STEPS} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="bank">
                <Card className="border border-border">
                  <CardContent className="p-6">
                    <StepList steps={BANK_STEPS} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Where Your Money Goes */}
      <section
        className="bg-background py-12 md:py-16"
        data-ocid="donation.allocation_section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2 text-center">
              Aapka Paisa Kahan Jaata Hai
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Aapki har donation transparent tarike se use hoti hai
            </p>
            <div className="space-y-5">
              {ALLOCATION.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`donation.allocation.${i + 1}`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-medium text-sm text-foreground">
                      {item.label}
                    </span>
                    <span className="font-bold text-sm text-foreground">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${item.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donor Gallery */}
      <section
        className="bg-muted/30 py-12 md:py-16"
        data-ocid="donation.gallery_section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
              📸 Donor Gallery
            </Badge>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Hamara Impact Gallery
            </h2>
            <p className="text-muted-foreground mt-2">
              Donors ke saath hamare kaam ki jhalak
            </p>
          </motion.div>
          {galleryLoading ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              data-ocid="donation.gallery_loading_state"
            >
              {["g1", "g2", "g3", "g4"].map((k) => (
                <Skeleton key={k} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : donorItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {donorItems.map((item: GalleryItem, i: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative aspect-square rounded-xl overflow-hidden border border-border shadow-card group"
                  data-ocid={`donation.gallery_item.${i + 1}`}
                >
                  <img
                    src={item.blob ? item.blob.getDirectURL() : item.url}
                    alt={item.title ?? item.description ?? "Gallery"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {item.title && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-xs font-medium line-clamp-1">
                        {item.title}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-12 bg-card border border-border rounded-xl"
              data-ocid="donation.gallery_empty_state"
            >
              <div className="text-4xl mb-3">🖼️</div>
              <p className="text-muted-foreground text-sm">
                Gallery jald hi aayegi. Abhi koi photos nahi hain.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Social Share Section */}
      <section
        className="py-12 md:py-16"
        style={{
          background: "linear-gradient(135deg, #008000 0%, #FF9933 100%)",
        }}
        data-ocid="donation.share_section"
      >
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
              Donation Link Share Karein
            </h2>
            <p className="text-white/80 mb-8">
              Apne dost aur parivaar ko bhi is mission ka hissa banayein
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="button"
                asChild
                className="bg-green-600 hover:bg-green-700 text-white border-0 gap-2 shadow-md"
                data-ocid="donation.whatsapp_share_button"
              >
                <a
                  href="https://wa.me/?text=Swachhata%20Prahari%20ke%20mission%20ko%20support%20karein%3A%20Aaj%20hi%20donate%20karein%20aur%20ek%20swachh%20Bihar%20banane%20mein%20yogdan%20den."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp pe Share Karein
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyLink}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2"
                data-ocid="donation.copy_link_button"
              >
                {linkCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {linkCopied ? "Link Copied!" : "Link Copy Karein"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
