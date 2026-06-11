import List "mo:core/List";
import Time "mo:core/Time";
import DocTypes "../types/documents";
import DocLib "../lib/documents";

mixin (
  documents : List.List<DocTypes.Document>,
  docState : { var nextDocId : Nat }
) {
  public func getDocuments() : async [DocTypes.Document] {
    documents.toArray();
  };

  public func addDocument(req : DocTypes.AddDocumentRequest) : async DocTypes.Document {
    let now = Time.now();
    docState.nextDocId += 1;
    let doc : DocTypes.Document = {
      id = DocLib.generateId(now, docState.nextDocId);
      title = req.title;
      description = req.description;
      fileUrl = req.fileUrl;
      category = req.category;
      createdAt = now;
    };
    documents.add(doc);
    doc;
  };

  public func deleteDocument(id : Text) : async Bool {
    let sizeBefore = documents.size();
    documents.retain(func(d) { d.id != id });
    documents.size() < sizeBefore;
  };
};
