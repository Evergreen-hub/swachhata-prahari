import CommonTypes "common";

module {
  public type UserId = Text;

  public type User = {
    id : UserId;
    name : Text;
    email : Text;
    photoUrl : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type UserList = [User];
};
