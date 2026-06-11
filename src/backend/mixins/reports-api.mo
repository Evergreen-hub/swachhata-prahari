import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import ReportTypes "../types/reports";
import ReportsLib "../lib/reports";

mixin (reports : List.List<ReportTypes.Report>, state : { var nextReportCount : Nat }, vState : { var nextVolunteerCount : Nat }) {
  public func submitReport(req : ReportTypes.SubmitReportRequest) : async ReportTypes.Report {
    let now = Time.now();
    let id = ReportsLib.generateId(now, state.nextReportCount);
    let refNumber = ReportsLib.generateRefNumber(state.nextReportCount);
    state.nextReportCount += 1;
    let report : ReportTypes.Report = {
      id;
      refNumber;
      name = req.name;
      mobile = req.mobile;
      district = req.district;
      location = req.location;
      category = req.category;
      description = req.description;
      imageBlob = req.imageBlob;
      status = #pending;
      createdAt = now;
      updatedAt = now;
    };
    reports.add(report);
    report
  };

  public query func getReports() : async [ReportTypes.Report] {
    let arr = reports.toArray();
    arr.reverse()
  };

  public query func getReport(id : Text) : async ?ReportTypes.Report {
    reports.find(func(r) { r.id == id })
  };

  public func updateReportStatus(id : Text, status : ReportTypes.ReportStatus) : async Bool {
    let now = Time.now();
    var found = false;
    reports.mapInPlace(
      func(r) {
        if (r.id == id) {
          found := true;
          { r with status; updatedAt = now }
        } else { r }
      }
    );
    found
  };

  public func deleteReport(id : Text) : async Bool {
    let before = reports.size();
    reports.retain(func(r) { r.id != id });
    reports.size() < before
  };

  public func editReport(req : ReportTypes.EditReportRequest) : async ?ReportTypes.Report {
    let now = Time.now();
    var result : ?ReportTypes.Report = null;
    reports.mapInPlace(
      func(r) {
        if (r.id == req.id) {
          let updated : ReportTypes.Report = {
            r with
            name        = switch (req.name)        { case (?v) v; case null r.name };
            mobile      = switch (req.mobile)      { case (?v) v; case null r.mobile };
            district    = switch (req.district)    { case (?v) v; case null r.district };
            location    = switch (req.location)    { case (?v) v; case null r.location };
            category    = switch (req.category)    { case (?v) v; case null r.category };
            description = switch (req.description) { case (?v) v; case null r.description };
            imageBlob   = switch (req.imageBlob)   { case (?v) ?v; case null r.imageBlob };
            updatedAt   = now;
          };
          result := ?updated;
          updated
        } else { r }
      }
    );
    result
  };

  public query func getStats() : async ReportTypes.Stats {
    var total = 0;
    var pending = 0;
    var resolved = 0;
    for (r in reports.values()) {
      total += 1;
      switch (r.status) {
        case (#pending)  { pending  += 1 };
        case (#resolved) { resolved += 1 };
      };
    };
    { total; pending; resolved; volunteers = vState.nextVolunteerCount }
  };
};
