import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import VolunteerTypes "../types/volunteers";

mixin (volunteers : List.List<VolunteerTypes.VolunteerApplication>, vState : { var nextVolunteerCount : Nat }) {
  public func submitVolunteerApplication(name : Text, mobile : Text, email : Text, availability : Text) : async VolunteerTypes.VolunteerApplication {
    let now = Time.now();
    let id = "vol-" # now.toText() # "-" # vState.nextVolunteerCount.toText();
    vState.nextVolunteerCount += 1;
    let app : VolunteerTypes.VolunteerApplication = {
      id;
      name;
      mobile;
      email;
      availability;
      status = #pending;
      createdAt = now;
      volunteerHours = 0;
      rankingBadge = "";
    };
    volunteers.add(app);
    app
  };

  public query func getVolunteerApplications() : async [VolunteerTypes.VolunteerApplication] {
    volunteers.toArray()
  };

  public func updateVolunteerStatus(id : Text, status : VolunteerTypes.VolunteerStatus) : async Bool {
    var found = false;
    volunteers.mapInPlace(
      func(v) {
        if (v.id == id) {
          found := true;
          { v with status }
        } else { v }
      }
    );
    found
  };

  public func deleteVolunteerApplication(id : Text) : async Bool {
    let before = volunteers.size();
    volunteers.retain(func(v) { v.id != id });
    volunteers.size() < before
  };
  public func updateVolunteerHours(id : Text, hours : Nat) : async Bool {
    var found = false;
    volunteers.mapInPlace(
      func(v) {
        if (v.id == id) {
          found := true;
          { v with volunteerHours = hours }
        } else { v }
      }
    );
    found
  };
};
