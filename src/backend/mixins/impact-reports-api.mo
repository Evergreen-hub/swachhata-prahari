import List "mo:core/List";
import Time "mo:core/Time";
import SettingsTypes "../types/settings";
import ImpactTypes "../types/impact-reports";
import AdminLib "../lib/admin";

mixin (
  impactReports : List.List<ImpactTypes.ImpactReport>,
  impactState : { var nextImpactId : Nat },
  adminState : { var sessionTokens : [(Text, Int)]; var passwordHash : Text; var settings : SettingsTypes.Settings },
) {
  public func addImpactReport(token : Text, req : ImpactTypes.AddImpactReportRequest) : async ?ImpactTypes.ImpactReport {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return null;
    };
    let id = "imp-" # impactState.nextImpactId.toText() # "-" # now.toText();
    impactState.nextImpactId += 1;
    let report : ImpactTypes.ImpactReport = {
      id;
      title = req.title;
      description = req.description;
      resolvedCases = req.resolvedCases;
      volunteerCount = req.volunteerCount;
      areasCoovered = req.areasCoovered;
      media = req.media;
      reportDate = req.reportDate;
      createdAt = now;
      updatedAt = now;
    };
    impactReports.add(report);
    ?report
  };

  public query func getImpactReports() : async [ImpactTypes.ImpactReport] {
    let arr = impactReports.toArray();
    arr.reverse()
  };

  public query func getImpactReport(id : Text) : async ?ImpactTypes.ImpactReport {
    impactReports.find(func(r) { r.id == id })
  };

  public func updateImpactReport(token : Text, req : ImpactTypes.UpdateImpactReportRequest) : async ?ImpactTypes.ImpactReport {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return null;
    };
    var result : ?ImpactTypes.ImpactReport = null;
    impactReports.mapInPlace(
      func(r) {
        if (r.id == req.id) {
          let updated : ImpactTypes.ImpactReport = {
            r with
            title = switch (req.title) { case (?v) v; case null r.title };
            description = switch (req.description) { case (?v) v; case null r.description };
            resolvedCases = switch (req.resolvedCases) { case (?v) v; case null r.resolvedCases };
            volunteerCount = switch (req.volunteerCount) { case (?v) v; case null r.volunteerCount };
            areasCoovered = switch (req.areasCoovered) { case (?v) v; case null r.areasCoovered };
            media = switch (req.media) { case (?v) v; case null r.media };
            reportDate = switch (req.reportDate) { case (?v) v; case null r.reportDate };
            updatedAt = now;
          };
          result := ?updated;
          updated
        } else { r }
      }
    );
    result
  };

  public func deleteImpactReport(token : Text, id : Text) : async Bool {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return false;
    };
    let before = impactReports.size();
    impactReports.retain(func(r) { r.id != id });
    impactReports.size() < before
  };
};
