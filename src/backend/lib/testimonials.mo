import Int "mo:core/Int";
import Nat "mo:core/Nat";

module {
  public func generateId(now : Int, count : Nat) : Text {
    now.toText() # "-" # count.toText();
  };
};
