import type { Event } from "@/backend";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents, useRegisterForEvent } from "@/hooks/useReports";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  PartyPopper,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function EventsPage() {
  const { data: events, isLoading } = useEvents();
  const registerMutation = useRegisterForEvent();

  const [registeringEventId, setRegisteringEventId] = useState<string | null>(
    null,
  );
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const upcomingEvents = (events ?? []).filter((e) => !e.isCompleted);
  const completedEvents = (events ?? []).filter((e) => e.isCompleted);

  const handleRegister = async (eventId: string) => {
    if (!regName.trim() || !regPhone.trim()) {
      toast.error("Kripya apna naam aur phone number darj karein.");
      return;
    }
    try {
      await registerMutation.mutateAsync({
        eventId,
        name: regName,
        phone: regPhone,
      });
      toast.success("Aapka registration safal raha!");
      setRegisteringEventId(null);
      setRegName("");
      setRegPhone("");
    } catch {
      toast.error(
        "Registration mein koi samasya aayi. Kripya dobara koshish karein.",
      );
    }
  };

  const EventCard = ({ event, index }: { event: Event; index: number }) => {
    const isUpcoming = !event.isCompleted;
    const eventDate = new Date(Number(event.date) / 1_000_000);
    const isPast = eventDate < new Date();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
        data-ocid={`events.item.${index + 1}`}
      >
        <div className="h-48 bg-muted relative overflow-hidden">
          {event.featuredImageUrl ? (
            <img
              src={event.featuredImageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/5">
              <PartyPopper className="w-12 h-12 text-primary/30" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                isUpcoming
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isUpcoming ? (
                <>
                  <Clock className="w-3 h-3" /> Upcoming
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </>
              )}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-foreground text-lg mb-2">
            {event.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {event.description}
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                {eventDate.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {isUpcoming &&
            event.isRegistrationOpen &&
            !isPast &&
            (registeringEventId === event.id ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div>
                    <Label className="text-xs">Name / नाम</Label>
                    <Input
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Apna naam likhein"
                      className="mt-1"
                      data-ocid={`events.reg_name_input.${index + 1}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Phone / फोन</Label>
                    <Input
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="Mobile number"
                      className="mt-1"
                      data-ocid={`events.reg_phone_input.${index + 1}`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => handleRegister(event.id)}
                      disabled={registerMutation.isPending}
                      data-ocid={`events.reg_submit_button.${index + 1}`}
                    >
                      {registerMutation.isPending
                        ? "Submitting..."
                        : "Register"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setRegisteringEventId(null);
                        setRegName("");
                        setRegPhone("");
                      }}
                      data-ocid={`events.reg_cancel_button.${index + 1}`}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setRegisteringEventId(event.id)}
                data-ocid={`events.register_button.${index + 1}`}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Register Now
              </Button>
            ))}

          {isUpcoming && !event.isRegistrationOpen && (
            <Badge variant="secondary" className="w-full justify-center py-1.5">
              Registration Closed
            </Badge>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors"
              data-ocid="events.back_link"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              Events
            </h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            Swachhata Prahari ke events aur safai abhiyan mein hissa lein.
            Aaiye, mil kar apne shehar ko saaf aur sundar banayein.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholder
                key={`event-skeleton-${i}`}
                className="h-96 rounded-xl"
              />
            ))}
          </div>
        ) : (events ?? []).length === 0 ? (
          <div className="text-center py-16" data-ocid="events.empty_state">
            <PartyPopper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No events yet
            </h3>
            <p className="text-muted-foreground">
              Abhi koi event schedule nahi hai. Jald hi naye events aane wale
              hain.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Completed Events */}
            {completedEvents.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  Past Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedEvents.map((event, i) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={upcomingEvents.length + i}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
