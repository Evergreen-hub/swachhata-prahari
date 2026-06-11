import HomeContentTypes "../types/home-content";
import AboutContentTypes "../types/about-content";

mixin (
  contentState : {
    var homeContent : HomeContentTypes.HomeContent;
    var aboutContent : AboutContentTypes.AboutContent;
  }
) {
  public query func getHomeContent() : async HomeContentTypes.HomeContent {
    contentState.homeContent;
  };

  public func updateHomeContent(content : HomeContentTypes.HomeContent) : async Bool {
    contentState.homeContent := content;
    true;
  };

  public query func getAboutContent() : async AboutContentTypes.AboutContent {
    contentState.aboutContent;
  };

  public func updateAboutContent(content : AboutContentTypes.AboutContent) : async Bool {
    contentState.aboutContent := content;
    true;
  };
};
