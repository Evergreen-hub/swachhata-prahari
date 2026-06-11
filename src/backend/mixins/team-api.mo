import List "mo:core/List";
import Time "mo:core/Time";
import SettingsTypes "../types/settings";
import TeamTypes "../types/team";
import AdminLib "../lib/admin";

mixin (
  teamMembers : List.List<TeamTypes.TeamMember>,
  teamState : { var nextTeamId : Nat },
  adminState : { var sessionTokens : [(Text, Int)]; var passwordHash : Text; var settings : SettingsTypes.Settings },
) {
  public func addTeamMember(token : Text, req : TeamTypes.AddTeamMemberRequest) : async ?TeamTypes.TeamMember {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return null;
    };
    let id = "team-" # teamState.nextTeamId.toText() # "-" # now.toText();
    teamState.nextTeamId += 1;
    let member : TeamTypes.TeamMember = {
      id;
      name = req.name;
      role = req.role;
      bio = req.bio;
      photoUrl = req.photoUrl;
      order = req.order;
      createdAt = now;
      updatedAt = now;
    };
    teamMembers.add(member);
    ?member
  };

  public query func getTeamMembers() : async [TeamTypes.TeamMember] {
    let arr = teamMembers.toArray();
    arr.sort(func(a, b) { if (a.order < b.order) #less else if (a.order > b.order) #greater else #equal })
  };

  public func updateTeamMember(token : Text, req : TeamTypes.UpdateTeamMemberRequest) : async ?TeamTypes.TeamMember {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return null;
    };
    var result : ?TeamTypes.TeamMember = null;
    teamMembers.mapInPlace(
      func(m) {
        if (m.id == req.id) {
          let updated : TeamTypes.TeamMember = {
            m with
            name = switch (req.name) { case (?v) v; case null m.name };
            role = switch (req.role) { case (?v) v; case null m.role };
            bio = switch (req.bio) { case (?v) ?v; case null m.bio };
            photoUrl = switch (req.photoUrl) { case (?v) ?v; case null m.photoUrl };
            order = switch (req.order) { case (?v) v; case null m.order };
            updatedAt = now;
          };
          result := ?updated;
          updated
        } else { m }
      }
    );
    result
  };

  public func deleteTeamMember(token : Text, id : Text) : async Bool {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return false;
    };
    let before = teamMembers.size();
    teamMembers.retain(func(m) { m.id != id });
    teamMembers.size() < before
  };
};
