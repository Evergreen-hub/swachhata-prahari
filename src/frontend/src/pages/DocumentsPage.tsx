import { DocumentCategory } from "@/backend";
import type { Document } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocuments } from "@/hooks/useReports";
import { format } from "date-fns";
import { Download, FileText, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  [DocumentCategory.annualReport]: "Annual Report",
  [DocumentCategory.auditReport]: "Audit Report",
  [DocumentCategory.policy]: "Policy",
  [DocumentCategory.legal]: "Legal",
  [DocumentCategory.certificate]: "Certificate",
  [DocumentCategory.other]: "Other",
};

const CATEGORY_COLORS: Record<DocumentCategory, string> = {
  [DocumentCategory.annualReport]: "bg-primary/10 text-primary",
  [DocumentCategory.auditReport]: "bg-secondary/10 text-secondary-foreground",
  [DocumentCategory.policy]: "bg-blue-100 text-blue-700",
  [DocumentCategory.legal]: "bg-amber-100 text-amber-700",
  [DocumentCategory.certificate]: "bg-emerald-100 text-emerald-700",
  [DocumentCategory.other]: "bg-muted text-muted-foreground",
};

const FILTER_OPTIONS: { label: string; value: DocumentCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Annual Report", value: DocumentCategory.annualReport },
  { label: "Audit Report", value: DocumentCategory.auditReport },
  { label: "Policy", value: DocumentCategory.policy },
  { label: "Legal", value: DocumentCategory.legal },
  { label: "Certificate", value: DocumentCategory.certificate },
  { label: "Other", value: DocumentCategory.other },
];

function DocumentRow({
  doc,
  index,
}: {
  doc: Document;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="card-hover border-border bg-card">
        <CardContent className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-base truncate">
                {doc.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-0.5 line-clamp-2">
                {doc.description}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  variant="secondary"
                  className={`${CATEGORY_COLORS[doc.category]} border-0 text-xs`}
                >
                  {CATEGORY_LABELS[doc.category]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(Number(doc.createdAt) / 1_000_000, "dd MMM yyyy")}
                </span>
              </div>
            </div>
          </div>
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
            data-ocid={`documents.download_button.${index + 1}`}
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DocumentsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Card
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder
          key={`doc-skeleton-${i}-loading`}
          className="border-border bg-card"
        >
          <CardContent className="p-4 md:p-5 flex gap-4">
            <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function DocumentsPage() {
  const { data: documents, isLoading } = useDocuments();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    DocumentCategory | "All"
  >("All");

  const filtered = useMemo(() => {
    let list = documents ?? [];
    if (activeCategory !== "All") {
      list = list.filter((d) => d.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [documents, activeCategory, search]);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Documents & Reports
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto"
          >
            Swachhata Prahari ke saare dastavej, report aur policies
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Documents search karein..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
              data-ocid="documents.search_input"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActiveCategory(opt.value)}
                data-ocid={`documents.filter.${opt.value}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === opt.value
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <DocumentsSkeleton />
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-16"
              data-ocid="documents.empty_state"
            >
              <div className="text-5xl mb-4">📂</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Koi document nahi mila
              </h3>
              <p className="text-muted-foreground text-sm">
                Is filter ya search ke anusar koi document uplabdh nahi hai.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((doc, idx) => (
                <DocumentRow key={doc.id} doc={doc} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
