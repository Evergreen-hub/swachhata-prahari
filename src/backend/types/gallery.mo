import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type MediaType = {
    #image;
    #video;
  };

  public type GalleryCategory = {
    #general;
    #donor;
  };

  public type GalleryItem = {
    id : Text;
    url : Text;
    mediaType : MediaType;
    title : ?Text;
    description : ?Text;
    category : GalleryCategory;
    blob : ?Storage.ExternalBlob;
    createdAt : Int;
    updatedAt : Int;
  };

  public type AddGalleryItemRequest = {
    url : Text;
    mediaType : MediaType;
    title : ?Text;
    description : ?Text;
    category : GalleryCategory;
    blob : ?Storage.ExternalBlob;
  };

  public type UpdateGalleryItemRequest = {
    id : Text;
    url : ?Text;
    title : ?Text;
    description : ?Text;
    category : ?GalleryCategory;
    blob : ?Storage.ExternalBlob;
  };
};
