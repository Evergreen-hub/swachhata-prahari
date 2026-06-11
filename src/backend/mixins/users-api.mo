import List "mo:core/List";
import Time "mo:core/Time";
import UserTypes "../types/users";

mixin (users : List.List<UserTypes.User>) {

  public func registerOrUpdateUser(user : UserTypes.User) : async UserTypes.User {
    let existing = users.find(func(u : UserTypes.User) : Bool { u.id == user.id });
    switch (existing) {
      case (?_) {
        users.mapInPlace(
          func(u : UserTypes.User) : UserTypes.User {
            if (u.id == user.id) {
              { user with createdAt = u.createdAt }
            } else {
              u
            }
          }
        );
        let updated = users.find(func(u : UserTypes.User) : Bool { u.id == user.id });
        switch (updated) {
          case (?u) u;
          case null user;
        };
      };
      case null {
        let newUser : UserTypes.User = {
          user with createdAt = Time.now()
        };
        users.add(newUser);
        newUser
      };
    };
  };

  public query func getUserById(id : Text) : async ?UserTypes.User {
    users.find(func(u : UserTypes.User) : Bool { u.id == id })
  };

  public query func getAllUsers() : async [UserTypes.User] {
    users.toArray()
  };

  public func deleteUser(id : Text) : async Bool {
    let before = users.size();
    users.retain(func(u : UserTypes.User) : Bool { u.id != id });
    users.size() < before
  };

};
