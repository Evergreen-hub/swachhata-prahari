import List "mo:core/List";
import Time "mo:core/Time";
import EventTypes "../types/events";
import EventLib "../lib/events";

mixin (
  events : List.List<EventTypes.Event>,
  registrations : List.List<EventTypes.EventRegistration>,
  eventState : { var nextEventId : Nat; var nextRegId : Nat }
) {
  public func getEvents() : async [EventTypes.Event] {
    events.toArray();
  };

  public func addEvent(req : EventTypes.AddEventRequest) : async EventTypes.Event {
    let now = Time.now();
    eventState.nextEventId += 1;
    let event : EventTypes.Event = {
      id = EventLib.generateId(now, eventState.nextEventId);
      title = req.title;
      description = req.description;
      date = req.date;
      location = req.location;
      isRegistrationOpen = req.isRegistrationOpen;
      featuredImageUrl = req.featuredImageUrl;
      isCompleted = req.isCompleted;
      createdAt = now;
    };
    events.add(event);
    event;
  };

  public func updateEvent(req : EventTypes.UpdateEventRequest) : async ?EventTypes.Event {
    var updated : ?EventTypes.Event = null;
    events.mapInPlace(
      func(e) {
        if (e.id == req.id) {
          let newE : EventTypes.Event = {
            e with
            title = switch (req.title) { case (?v) v; case null e.title };
            description = switch (req.description) { case (?v) v; case null e.description };
            date = switch (req.date) { case (?v) v; case null e.date };
            location = switch (req.location) { case (?v) v; case null e.location };
            isRegistrationOpen = switch (req.isRegistrationOpen) { case (?v) v; case null e.isRegistrationOpen };
            featuredImageUrl = switch (req.featuredImageUrl) { case (?v) ?v; case null e.featuredImageUrl };
            isCompleted = switch (req.isCompleted) { case (?v) v; case null e.isCompleted };
          };
          updated := ?newE;
          newE;
        } else { e };
      }
    );
    updated;
  };

  public func deleteEvent(id : Text) : async Bool {
    let sizeBefore = events.size();
    events.retain(func(e) { e.id != id });
    events.size() < sizeBefore;
  };

  public func registerForEvent(req : EventTypes.RegisterForEventRequest) : async EventTypes.EventRegistration {
    let now = Time.now();
    eventState.nextRegId += 1;
    let reg : EventTypes.EventRegistration = {
      id = EventLib.generateId(now, eventState.nextRegId);
      eventId = req.eventId;
      name = req.name;
      phone = req.phone;
      createdAt = now;
    };
    registrations.add(reg);
    reg;
  };

  public func getEventRegistrations(eventId : Text) : async [EventTypes.EventRegistration] {
    registrations.filter(func(r) { r.eventId == eventId }).toArray();
  };
};
