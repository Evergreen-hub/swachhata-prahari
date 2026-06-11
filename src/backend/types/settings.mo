module {
  public type SocialLinks = {
    facebook : ?Text;
    twitter : ?Text;
    instagram : ?Text;
    youtube : ?Text;
  };

  public type Settings = {
    websiteName : Text;
    whatsappNumber : Text;
    contactEmail : Text;
    contactPhone : Text;
    location : Text;
    socialLinks : SocialLinks;
    // Donation fields
    upiId : ?Text;
    upiQrImageUrl : ?Text;
    bankAccountNumber : ?Text;
    bankIfsc : ?Text;
    bankAccountHolder : ?Text;
    // Founder fields
    founderName : ?Text;
    founderPhoto : ?Text;
    founderBio : ?Text;
  };
};
