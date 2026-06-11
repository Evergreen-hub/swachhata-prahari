import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ImpactMedia = {
    url : Text;
    mediaType : { #image; #video };
    blob : ?Storage.ExternalBlob;
  };

  public type ImpactReport = {
    id : Text;
    title : Text;
    description : Text;
    resolvedCases : Nat;
    volunteerCount : Nat;
    areasCoovered : Nat;
    media : [ImpactMedia];
    reportDate : Int;
    createdAt : Int;
    updatedAt : Int;
  };

  public type AddImpactReportRequest = {
    title : Text;
    description : Text;
    resolvedCases : Nat;
    volunteerCount : Nat;
    areasCoovered : Nat;
    media : [ImpactMedia];
    reportDate : Int;
  };

  public type UpdateImpactReportRequest = {
    id : Text;
    title : ?Text;
    description : ?Text;
    resolvedCases : ?Nat;
    volunteerCount : ?Nat;
    areasCoovered : ?Nat;
    media : ?[ImpactMedia];
    reportDate : ?Int;
  };
};
