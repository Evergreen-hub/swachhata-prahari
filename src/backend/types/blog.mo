module {
  public type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    category : Text;
    tags : [Text];
    featuredImageUrl : ?Text;
    isPublished : Bool;
    createdAt : Int;
  };

  public type AddBlogPostRequest = {
    title : Text;
    content : Text;
    category : Text;
    tags : [Text];
    featuredImageUrl : ?Text;
    isPublished : Bool;
  };

  public type UpdateBlogPostRequest = {
    id : Text;
    title : ?Text;
    content : ?Text;
    category : ?Text;
    tags : ?[Text];
    featuredImageUrl : ?Text;
    isPublished : ?Bool;
  };
};
