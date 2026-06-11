module {
  public type ProjectStatus = {
    #active;
    #completed;
    #planning;
  };

  public type Project = {
    id : Text;
    title : Text;
    description : Text;
    category : Text;
    status : ProjectStatus;
    progressPercent : Nat;
    featuredImageUrl : ?Text;
    createdAt : Int;
  };

  public type AddProjectRequest = {
    title : Text;
    description : Text;
    category : Text;
    status : ProjectStatus;
    progressPercent : Nat;
    featuredImageUrl : ?Text;
  };

  public type UpdateProjectRequest = {
    id : Text;
    title : ?Text;
    description : ?Text;
    category : ?Text;
    status : ?ProjectStatus;
    progressPercent : ?Nat;
    featuredImageUrl : ?Text;
  };
};
