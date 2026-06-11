module {
  public type Event = {
    id : Text;
    title : Text;
    description : Text;
    date : Int;
    location : Text;
    isRegistrationOpen : Bool;
    featuredImageUrl : ?Text;
    isCompleted : Bool;
    createdAt : Int;
  };

  public type AddEventRequest = {
    title : Text;
    description : Text;
    date : Int;
    location : Text;
    isRegistrationOpen : Bool;
    featuredImageUrl : ?Text;
    isCompleted : Bool;
  };

  public type UpdateEventRequest = {
    id : Text;
    title : ?Text;
    description : ?Text;
    date : ?Int;
    location : ?Text;
    isRegistrationOpen : ?Bool;
    featuredImageUrl : ?Text;
    isCompleted : ?Bool;
  };

  public type EventRegistration = {
    id : Text;
    eventId : Text;
    name : Text;
    phone : Text;
    createdAt : Int;
  };

  public type RegisterForEventRequest = {
    eventId : Text;
    name : Text;
    phone : Text;
  };
};
