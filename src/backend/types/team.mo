module {
  public type TeamMember = {
    id : Text;
    name : Text;
    role : Text;
    bio : ?Text;
    photoUrl : ?Text;
    order : Nat;
    createdAt : Int;
    updatedAt : Int;
  };

  public type AddTeamMemberRequest = {
    name : Text;
    role : Text;
    bio : ?Text;
    photoUrl : ?Text;
    order : Nat;
  };

  public type UpdateTeamMemberRequest = {
    id : Text;
    name : ?Text;
    role : ?Text;
    bio : ?Text;
    photoUrl : ?Text;
    order : ?Nat;
  };
};
