module {
  public type Testimonial = {
    id : Text;
    name : Text;
    quote : Text;
    role : Text;
    photoUrl : ?Text;
    isActive : Bool;
    createdAt : Int;
  };

  public type AddTestimonialRequest = {
    name : Text;
    quote : Text;
    role : Text;
    photoUrl : ?Text;
    isActive : Bool;
  };

  public type UpdateTestimonialRequest = {
    id : Text;
    name : ?Text;
    quote : ?Text;
    role : ?Text;
    photoUrl : ?Text;
    isActive : ?Bool;
  };
};
