import type { GalleryItem } from "@/backend";
import { GalleryCategory, MediaType } from "@/backend";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDonorGalleryItems,
  usePublicGalleryItems,
} from "@/hooks/useReports";
import { ImageOff, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function GalleryGrid({
  items,
  isLoading,
}: { items: GalleryItem[]; isLoading: boolean }) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
          <Skeleton key={k} className="aspect-square rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="text-center py-20 bg-card border border-border rounded-xl"
        data-ocid="gallery.empty_state"
      >
        <ImageOff className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground font-medium">No items yet</p>
        <p className="text-muted-foreground/60 text-sm mt-1">
          Check back soon for photos and videos.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.button
            type="button"
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 8) * 0.05 }}
            className="relative group rounded-xl overflow-hidden border border-border w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary aspect-square bg-muted"
            onClick={() => setLightbox(item)}
            aria-label={item.title ?? "Gallery item"}
            data-ocid={`gallery.item.${i + 1}`}
          >
            {item.mediaType === MediaType.video ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Play className="w-10 h-10 text-primary" />
                <span className="sr-only">Video: {item.title}</span>
              </div>
            ) : (
              <img
                src={item.blob?.getDirectURL() ?? item.url}
                alt={item.title ?? "Gallery photo"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            )}
            {item.title && (
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-white/70 text-xs mt-1 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <Dialog
        open={!!lightbox}
        onOpenChange={(open) => !open && setLightbox(null)}
      >
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden"
          data-ocid="gallery.lightbox_dialog"
        >
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-sm font-semibold">
              {lightbox?.title ?? "Gallery"}
            </DialogTitle>
          </DialogHeader>
          {lightbox && (
            <div>
              {lightbox.mediaType === MediaType.video ? (
                <video
                  src={lightbox.url}
                  controls
                  className="w-full max-h-[60vh] bg-muted"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <img
                  src={lightbox.blob?.getDirectURL() ?? lightbox.url}
                  alt={lightbox.title ?? "Gallery photo"}
                  className="w-full max-h-[60vh] object-contain bg-muted"
                />
              )}
              {lightbox.description && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {lightbox.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function GalleryPage() {
  const [tab, setTab] = useState<"public" | "donor">("public");
  const { data: publicItems = [], isLoading: loadingPublic } =
    usePublicGalleryItems();
  const { data: donorItems = [], isLoading: loadingDonor } =
    useDonorGalleryItems();

  const items = tab === "public" ? publicItems : donorItems;
  const isLoading = tab === "public" ? loadingPublic : loadingDonor;

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
                📸 Swachhata Prahari Gallery
              </Badge>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
                हमारी तस्वीरें
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Swachhata Prahari ke kaam ki jhalak — safai abhiyaan, volunteer
                efforts, aur donors ka yogdan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="container mx-auto px-4 py-10">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as "public" | "donor")}
            className="mb-6"
          >
            <TabsList data-ocid="gallery.filter.tab">
              <TabsTrigger value="public" data-ocid="gallery.public_tab">
                🌿 Public Gallery
              </TabsTrigger>
              <TabsTrigger value="donor" data-ocid="gallery.donor_tab">
                💛 Donor Gallery
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <GalleryGrid items={items} isLoading={isLoading} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
