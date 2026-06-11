import Time "mo:core/Time";
import Array "mo:core/Array";
import AdminLib "../lib/admin";
import SettingsTypes "../types/settings";

mixin (adminState : { var sessionTokens : [(Text, Int)]; var passwordHash : Text; var settings : SettingsTypes.Settings }) {
  public func adminLogin(username : Text, password : Text) : async ?Text {
    if (username != AdminLib.ADMIN_USERNAME or AdminLib.hashPassword(password) != adminState.passwordHash) {
      return null;
    };
    let token = AdminLib.generateSessionToken();
    let now = Time.now();
    let existing = adminState.sessionTokens.filter(
      func((_, createdAt)) { (now - createdAt) < 86400000000000 }
    );
    adminState.sessionTokens := existing.concat([(token, now)]);
    ?token
  };

  public func adminLogout(token : Text) : async Bool {
    let before = adminState.sessionTokens.size();
    adminState.sessionTokens := adminState.sessionTokens.filter<(Text, Int)>(
      func((t, _)) { t != token }
    );
    adminState.sessionTokens.size() < before
  };

  public func saveSettings(token : Text, settings : SettingsTypes.Settings) : async Bool {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return false;
    };
    adminState.settings := settings;
    true
  };

  public query func getSettings() : async SettingsTypes.Settings {
    adminState.settings
  };
};
