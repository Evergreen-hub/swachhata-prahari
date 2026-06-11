module {
  public type CoreValue = {
    title : Text;
    description : Text;
  };

  public type AboutContent = {
    organizationStory : Text;
    coreValues : [CoreValue];
  };
};
