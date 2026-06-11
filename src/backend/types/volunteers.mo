module {
  public type VolunteerStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type VolunteerApplication = {
    id : Text;
    name : Text;
    mobile : Text;
    email : Text;
    availability : Text;
    status : VolunteerStatus;
    volunteerHours : Nat;
    rankingBadge : Text;
    createdAt : Int;
  };
};
