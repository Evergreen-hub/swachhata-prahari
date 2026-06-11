import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import List "mo:core/List";
import AdminLib "lib/admin";
import ReportTypes "types/reports";
import VolunteerTypes "types/volunteers";
import SettingsTypes "types/settings";
import GalleryTypes "types/gallery";
import ImpactTypes "types/impact-reports";
import TeamTypes "types/team";
import ProjectTypes "types/projects";
import EventTypes "types/events";
import BlogTypes "types/blog";
import DocTypes "types/documents";
import TestimonialTypes "types/testimonials";
import HomeContentTypes "types/home-content";
import AboutContentTypes "types/about-content";
import ReportsMixin "mixins/reports-api";
import VolunteersMixin "mixins/volunteers-api";
import AdminMixin "mixins/admin-api";
import GalleryMixin "mixins/gallery-api";
import ImpactMixin "mixins/impact-reports-api";
import TeamMixin "mixins/team-api";
import ProjectsMixin "mixins/projects-api";
import EventsMixin "mixins/events-api";
import BlogMixin "mixins/blog-api";
import DocumentsMixin "mixins/documents-api";
import TestimonialsMixin "mixins/testimonials-api";
import ContentMixin "mixins/content-api";
import UserTypes "types/users";
import UsersMixin "mixins/users-api";





actor {
  // --- Shared mutable state ---
  let reports = List.empty<ReportTypes.Report>();
  let volunteers = List.empty<VolunteerTypes.VolunteerApplication>();
  let galleryItems = List.empty<GalleryTypes.GalleryItem>();
  let impactReports = List.empty<ImpactTypes.ImpactReport>();
  let teamMembers = List.empty<TeamTypes.TeamMember>();
  let state = {
    var nextReportCount : Nat = 0;
  };
  let vState = {
    var nextVolunteerCount : Nat = 0;
  };
  let galleryState = {
    var nextGalleryId : Nat = 0;
  };
  let impactState = {
    var nextImpactId : Nat = 0;
  };
  let teamState = {
    var nextTeamId : Nat = 0;
  };
  let projects = List.empty<ProjectTypes.Project>();
  let projectState = {
    var nextProjectId : Nat = 0;
  };
  let events = List.empty<EventTypes.Event>();
  let registrations = List.empty<EventTypes.EventRegistration>();
  let eventState = {
    var nextEventId : Nat = 0;
    var nextRegId : Nat = 0;
  };
  let blogPosts = List.empty<BlogTypes.BlogPost>();
  let blogState = {
    var nextBlogId : Nat = 0;
  };
  let documents = List.empty<DocTypes.Document>();
  let docState = {
    var nextDocId : Nat = 0;
  };
  let testimonials = List.empty<TestimonialTypes.Testimonial>();
  let testimonialState = {
    var nextTestimonialId : Nat = 0;
  };
  let contentState = {
    var homeContent : HomeContentTypes.HomeContent = {
      heroTitle = "Swachhata Prahari";
      heroSubtitle = "Awaaz Safai Ki";
      missionText = "";
      visionText = "";
      ctaButtonText = "Report Problem";
      ctaButtonLink = "/report";
    };
    var aboutContent : AboutContentTypes.AboutContent = {
      organizationStory = "";
      coreValues = [];
    };
  };
  let adminState = {
    var sessionTokens : [(Text, Int)] = [];
    var passwordHash : Text = AdminLib.hashPassword("Swachhata");
    var settings : SettingsTypes.Settings = {
      websiteName = "Swachhata Prahari";
      whatsappNumber = "9263989760";
      contactEmail = "rudrapratapsingh789.063@gmail.com";
      contactPhone = "9263989760";
      location = "Sitamarhi, Bihar";
      socialLinks = {
        facebook = null;
        twitter = null;
        instagram = null;
        youtube = null;
      };
      upiId = null;
      upiQrImageUrl = null;
      bankAccountNumber = null;
      bankIfsc = null;
      bankAccountHolder = null;
      founderName = null;
      founderPhoto = null;
      founderBio = null;
    };
  };

  let users = List.empty<UserTypes.User>();
  // --- Mixins ---
  include UsersMixin(users);
  include MixinObjectStorage();
  include ReportsMixin(reports, state, vState);
  include VolunteersMixin(volunteers, vState);
  include AdminMixin(adminState);
  include GalleryMixin(galleryItems, galleryState, adminState);
  include ImpactMixin(impactReports, impactState, adminState);
  include TeamMixin(teamMembers, teamState, adminState);
  include ProjectsMixin(projects, projectState);
  include EventsMixin(events, registrations, eventState);
  include BlogMixin(blogPosts, blogState);
  include DocumentsMixin(documents, docState);
  include TestimonialsMixin(testimonials, testimonialState);
  include ContentMixin(contentState);
};

