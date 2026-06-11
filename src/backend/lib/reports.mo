import ReportTypes "../types/reports";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  public type Report = ReportTypes.Report;
  public type SubmitReportRequest = ReportTypes.SubmitReportRequest;
  public type EditReportRequest = ReportTypes.EditReportRequest;
  public type Stats = ReportTypes.Stats;
  public type ReportStatus = ReportTypes.ReportStatus;

  // Generates a human-readable reference number e.g. "SP-000123"
  public func generateRefNumber(count : Nat) : Text {
    let n = count + 1;
    let s = n.toText();
    let pad = if (s.size() < 6) {
      var p = "";
      var i = s.size();
      while (i < 6) { p #= "0"; i += 1; };
      p
    } else { "" };
    "SP-" # pad # s
  };

  // Generates a unique id from timestamp and count
  public func generateId(ts : Int, count : Nat) : Text {
    ts.toText() # "-" # count.toText()
  };

  // Reports are already shared-type; identity for API boundary
  public func toPublic(report : Report) : Report {
    report
  };
};
