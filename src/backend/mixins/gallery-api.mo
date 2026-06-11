import List "mo:core/List";
import Time "mo:core/Time";
import SettingsTypes "../types/settings";
import GalleryTypes "../types/gallery";
import AdminLib "../lib/admin";

mixin (
  galleryItems : List.List<GalleryTypes.GalleryItem>,
  galleryState : { var nextGalleryId : Nat },
  adminState : { var sessionTokens : [(Text, Int)]; var passwordHash : Text; var settings : SettingsTypes.Settings },
) {
  public func addGalleryItem(token : Text, req : GalleryTypes.AddGalleryItemRequest) : async ?GalleryTypes.GalleryItem {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return null;
    };
    let id = "gal-" # galleryState.nextGalleryId.toText() # "-" # now.toText();
    galleryState.nextGalleryId += 1;
    let item : GalleryTypes.GalleryItem = {
      id;
      url = req.url;
      mediaType = req.mediaType;
      title = req.title;
      description = req.description;
      category = req.category;
      blob = req.blob;
      createdAt = now;
      updatedAt = now;
    };
    galleryItems.add(item);
    ?item
  };

  public query func getGalleryItems() : async [GalleryTypes.GalleryItem] {
    galleryItems.toArray()
  };

  public query func getPublicGalleryItems() : async [GalleryTypes.GalleryItem] {
    galleryItems.filter(func(g) { g.category == #general }).toArray()
  };

  public query func getDonorGalleryItems() : async [GalleryTypes.GalleryItem] {
    galleryItems.filter(func(g) { g.category == #donor }).toArray()
  };

  public func deleteGalleryItem(token : Text, id : Text) : async Bool {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return false;
    };
    let before = galleryItems.size();
    galleryItems.retain(func(g) { g.id != id });
    galleryItems.size() < before
  };

  public func updateGalleryItem(token : Text, req : GalleryTypes.UpdateGalleryItemRequest) : async ?GalleryTypes.GalleryItem {
    let now = Time.now();
    if (not AdminLib.isValidSession(token, adminState.sessionTokens, now)) {
      return null;
    };
    var result : ?GalleryTypes.GalleryItem = null;
    galleryItems.mapInPlace(
      func(g) {
        if (g.id == req.id) {
          let updated : GalleryTypes.GalleryItem = {
            g with
            url = switch (req.url) { case (?v) v; case null g.url };
            title = switch (req.title) { case (?v) ?v; case null g.title };
            description = switch (req.description) { case (?v) ?v; case null g.description };
            category = switch (req.category) { case (?v) v; case null g.category };
            blob = switch (req.blob) { case (?v) ?v; case null g.blob };
            updatedAt = now;
          };
          result := ?updated;
          updated
        } else { g }
      }
    );
    result
  };
};
