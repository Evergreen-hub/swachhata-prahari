import type { Event, EventRegistration } from "@/backend";
import AdminLayout from "@/components/AdminLayout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddEvent,
  useDeleteEvent,
  useEventRegistrations,
  useEvents,
  useUpdateEvent,
} from "@/hooks/useReports";
import { format } from "date-fns";
import { Edit2, Eye, Loader2, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  title: string;
  description: string;
  date: string;
  location: string;
  isRegistrationOpen: boolean;
  featuredImageUrl: string;
  isCompleted: boolean;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  date: "",
  location: "",
  isRegistrationOpen: true,
  featuredImageUrl: "",
  isCompleted: false,
};

function toLocalDateTimeInput(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalDateTimeInput(v: string): bigint {
  return BigInt(new Date(v).getTime()) * 1_000_000n;
}

export default function AdminEvents() {
  const { data: events, isLoading } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const [regDialogOpen, setRegDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const { data: registrations, isLoading: regLoading } = useEventRegistrations(
    selectedEventId ?? "",
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (event: Event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      date: toLocalDateTimeInput(event.date),
      location: event.location,
      isRegistrationOpen: event.isRegistrationOpen,
      featuredImageUrl: event.featuredImageUrl ?? "",
      isCompleted: event.isCompleted,
    });
    setDialogOpen(true);
  };

  const openRegistrations = (eventId: string) => {
    setSelectedEventId(eventId);
    setRegDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date) {
      toast.error("Please select a date");
      return;
    }
    try {
      if (editing) {
        await updateEvent.mutateAsync({
          id: editing.id,
          title: form.title,
          description: form.description,
          date: fromLocalDateTimeInput(form.date),
          location: form.location,
          isRegistrationOpen: form.isRegistrationOpen,
          featuredImageUrl: form.featuredImageUrl || undefined,
          isCompleted: form.isCompleted,
        });
        toast.success("Event updated");
      } else {
        await addEvent.mutateAsync({
          title: form.title,
          description: form.description,
          date: fromLocalDateTimeInput(form.date),
          location: form.location,
          isRegistrationOpen: form.isRegistrationOpen,
          featuredImageUrl: form.featuredImageUrl || undefined,
          isCompleted: form.isCompleted,
        });
        toast.success("Event added");
      }
      setDialogOpen(false);
      setForm(EMPTY_FORM);
      setEditing(null);
    } catch {
      toast.error(editing ? "Failed to update event" : "Failed to add event");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-5" data-ocid="admin_events.page">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Events
            </h1>
            <p className="text-sm text-muted-foreground">
              {events?.length ?? 0} event(s)
            </p>
          </div>
          <Button
            type="button"
            onClick={openAdd}
            className="bg-primary hover:bg-primary/90"
            data-ocid="admin_events.add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Event
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {["sk-1", "sk-2", "sk-3", "sk-4"].map((id) => (
              <Skeleton key={id} className="h-24" />
            ))}
          </div>
        ) : !events || events.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="admin_events.empty_state"
          >
            <p className="text-muted-foreground">No events yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((ev, i) => (
              <div
                key={ev.id}
                className="bg-card border border-border rounded-xl p-4 shadow-card"
                data-ocid={`admin_events.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {ev.title}
                      </span>
                      {ev.isCompleted ? (
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="text-xs bg-primary text-primary-foreground">
                          Upcoming
                        </Badge>
                      )}
                      {ev.isRegistrationOpen && !ev.isCompleted && (
                        <Badge className="text-xs bg-secondary text-secondary-foreground">
                          Registration Open
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      📍 {ev.location} &nbsp;|&nbsp; 📅{" "}
                      {format(
                        Number(ev.date) / 1_000_000,
                        "dd MMM yyyy, HH:mm",
                      )}
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {ev.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => openRegistrations(ev.id)}
                      data-ocid={`admin_events.view_registrations_button.${i + 1}`}
                    >
                      <Users className="w-3.5 h-3.5 mr-1" />
                      Registrations
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(ev)}
                      data-ocid={`admin_events.edit_button.${i + 1}`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 hover:bg-destructive/5"
                          data-ocid={`admin_events.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        data-ocid={`admin_events.delete_dialog.${i + 1}`}
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Event "{ev.title}"
                            will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            data-ocid={`admin_events.delete_cancel_button.${i + 1}`}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(ev.id)}
                            className="bg-destructive text-destructive-foreground"
                            data-ocid={`admin_events.delete_confirm_button.${i + 1}`}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg" data-ocid="admin_events.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="ev-title">Title</Label>
              <Input
                id="ev-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Event title"
                className="mt-1"
                required
                data-ocid="admin_events.title_input"
              />
            </div>
            <div>
              <Label htmlFor="ev-desc">Description</Label>
              <Textarea
                id="ev-desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Event description..."
                rows={3}
                className="mt-1"
                required
                data-ocid="admin_events.description_textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ev-date">Date & Time</Label>
                <Input
                  id="ev-date"
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  className="mt-1"
                  required
                  data-ocid="admin_events.date_input"
                />
              </div>
              <div>
                <Label htmlFor="ev-location">Location</Label>
                <Input
                  id="ev-location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  placeholder="Event location"
                  className="mt-1"
                  required
                  data-ocid="admin_events.location_input"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ev-image">Featured Image URL</Label>
              <Input
                id="ev-image"
                value={form.featuredImageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, featuredImageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="admin_events.image_url_input"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="ev-reg-open"
                  checked={form.isRegistrationOpen}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isRegistrationOpen: v }))
                  }
                  data-ocid="admin_events.registration_open_switch"
                />
                <Label htmlFor="ev-reg-open" className="cursor-pointer">
                  Registration Open
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="ev-completed"
                  checked={form.isCompleted}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isCompleted: v }))
                  }
                  data-ocid="admin_events.completed_switch"
                />
                <Label htmlFor="ev-completed" className="cursor-pointer">
                  Completed
                </Label>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin_events.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={addEvent.isPending || updateEvent.isPending}
                data-ocid="admin_events.submit_button"
              >
                {(addEvent.isPending || updateEvent.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editing ? "Update" : "Add"} Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Registrations Dialog */}
      <Dialog open={regDialogOpen} onOpenChange={setRegDialogOpen}>
        <DialogContent
          className="max-w-lg"
          data-ocid="admin_events.registrations_dialog"
        >
          <DialogHeader>
            <DialogTitle>Event Registrations</DialogTitle>
          </DialogHeader>
          {regLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          ) : !registrations || registrations.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground text-sm"
              data-ocid="admin_events.registrations_empty_state"
            >
              No registrations yet
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-auto">
              {registrations.map((reg: EventRegistration, idx: number) => (
                <div
                  key={reg.id}
                  className="flex items-center justify-between p-3 bg-muted/40 rounded-lg"
                  data-ocid={`admin_events.registration_row.${idx + 1}`}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {reg.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{reg.phone}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(Number(reg.createdAt) / 1_000_000, "dd MMM yyyy")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
