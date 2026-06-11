import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ReportCategory = {
    #garbage;
    #drainageIssue;
    #waterLogging;
    #publicToiletIssue;
    #roadCleanliness;
    #other;
  };

  public type ReportStatus = {
    #pending;
    #resolved;
  };

  public type Report = {
    id : Text;
    refNumber : Text;
    name : Text;
    mobile : Text;
    district : Text;
    location : Text;
    category : ReportCategory;
    description : Text;
    imageBlob : ?Storage.ExternalBlob;
    status : ReportStatus;
    createdAt : Int;
    updatedAt : Int;
  };

  public type SubmitReportRequest = {
    name : Text;
    mobile : Text;
    district : Text;
    location : Text;
    category : ReportCategory;
    description : Text;
    imageBlob : ?Storage.ExternalBlob;
  };

  public type EditReportRequest = {
    id : Text;
    name : ?Text;
    mobile : ?Text;
    district : ?Text;
    location : ?Text;
    category : ?ReportCategory;
    description : ?Text;
    imageBlob : ?Storage.ExternalBlob;
  };

  public type Stats = {
    total : Nat;
    pending : Nat;
    resolved : Nat;
    volunteers : Nat;
  };
};
