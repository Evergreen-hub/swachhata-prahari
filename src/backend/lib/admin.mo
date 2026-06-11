import Time "mo:core/Time";
import Nat8 "mo:core/Nat8";
import Nat32 "mo:core/Nat32";
import Text "mo:core/Text";
import Blob "mo:core/Blob";
import Int "mo:core/Int";

module {
  public let ADMIN_USERNAME : Text = "Swachhata prahari";

  // Session expiry: 24 hours in nanoseconds
  let SESSION_EXPIRY_NS : Int = 86400000000000;


  // Simple deterministic hash producing a fixed hex string.
  // Uses FNV-1a variant over UTF-8 bytes for consistency.
  public func hashPassword(password : Text) : Text {
    let bytes = password.encodeUtf8().toArray();
    var h0 : Nat32 = 2166136261;
    var h1 : Nat32 = 2166136261;
    var h2 : Nat32 = 2166136261;
    var h3 : Nat32 = 2166136261;
    var i = 0;
    let len = bytes.size();
    while (i < len) {
      let b = Nat32.fromNat(bytes[i].toNat());
      h0 := (h0 ^ b) *% 16777619;
      h1 := (h1 ^ (b +% 7)) *% 16777619;
      h2 := (h2 ^ (b +% 13)) *% 16777619;
      h3 := (h3 ^ (b +% 31)) *% 16777619;
      i += 1;
    };
    toHex8(h0) # toHex8(h1) # toHex8(h2) # toHex8(h3)
  };

  func toHex8(n : Nat32) : Text {
    let c = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    c[((n >> 28) & 0xf).toNat()] # c[((n >> 24) & 0xf).toNat()] #
    c[((n >> 20) & 0xf).toNat()] # c[((n >> 16) & 0xf).toNat()] #
    c[((n >> 12) & 0xf).toNat()] # c[((n >>  8) & 0xf).toNat()] #
    c[((n >>  4) & 0xf).toNat()] # c[(n         & 0xf).toNat()]
  };



  public func generateSessionToken() : Text {
    let now = Time.now();
    let absNow : Nat = if (now >= 0) { Int.abs(now) } else { 0 };
    let loNat = absNow % 4294967296;
    let hiNat = (absNow / 4294967296) % 4294967296;
    "sess-" # toHex8(Nat32.fromNat(hiNat)) # toHex8(Nat32.fromNat(loNat))
  };

  public func isValidSession(token : Text, sessions : [(Text, Int)], now : Int) : Bool {
    var found = false;
    var i = 0;
    let len = sessions.size();
    while (i < len) {
      let (t, createdAt) = sessions[i];
      if (t == token and (now - createdAt) < SESSION_EXPIRY_NS) {
        found := true;
      };
      i += 1;
    };
    found
  };
};
