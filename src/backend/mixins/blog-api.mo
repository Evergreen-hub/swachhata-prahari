import List "mo:core/List";
import Time "mo:core/Time";
import BlogTypes "../types/blog";
import BlogLib "../lib/blog";

mixin (
  blogPosts : List.List<BlogTypes.BlogPost>,
  blogState : { var nextBlogId : Nat }
) {
  public func getBlogPosts() : async [BlogTypes.BlogPost] {
    blogPosts.toArray();
  };

  public query func getBlogPost(id : Text) : async ?BlogTypes.BlogPost {
    blogPosts.find(func(p) { p.id == id });
  };

  public func addBlogPost(req : BlogTypes.AddBlogPostRequest) : async BlogTypes.BlogPost {
    let now = Time.now();
    blogState.nextBlogId += 1;
    let post : BlogTypes.BlogPost = {
      id = BlogLib.generateId(now, blogState.nextBlogId);
      title = req.title;
      content = req.content;
      category = req.category;
      tags = req.tags;
      featuredImageUrl = req.featuredImageUrl;
      isPublished = req.isPublished;
      createdAt = now;
    };
    blogPosts.add(post);
    post;
  };

  public func updateBlogPost(req : BlogTypes.UpdateBlogPostRequest) : async ?BlogTypes.BlogPost {
    var updated : ?BlogTypes.BlogPost = null;
    blogPosts.mapInPlace(
      func(p) {
        if (p.id == req.id) {
          let newP : BlogTypes.BlogPost = {
            p with
            title = switch (req.title) { case (?v) v; case null p.title };
            content = switch (req.content) { case (?v) v; case null p.content };
            category = switch (req.category) { case (?v) v; case null p.category };
            tags = switch (req.tags) { case (?v) v; case null p.tags };
            featuredImageUrl = switch (req.featuredImageUrl) { case (?v) ?v; case null p.featuredImageUrl };
            isPublished = switch (req.isPublished) { case (?v) v; case null p.isPublished };
          };
          updated := ?newP;
          newP;
        } else { p };
      }
    );
    updated;
  };

  public func deleteBlogPost(id : Text) : async Bool {
    let sizeBefore = blogPosts.size();
    blogPosts.retain(func(p) { p.id != id });
    blogPosts.size() < sizeBefore;
  };
};
