module {
  public type DocumentCategory = {
    #annualReport;
    #auditReport;
    #policy;
    #legal;
    #certificate;
    #other;
  };

  public type Document = {
    id : Text;
    title : Text;
    description : Text;
    fileUrl : Text;
    category : DocumentCategory;
    createdAt : Int;
  };

  public type AddDocumentRequest = {
    title : Text;
    description : Text;
    fileUrl : Text;
    category : DocumentCategory;
  };
};
