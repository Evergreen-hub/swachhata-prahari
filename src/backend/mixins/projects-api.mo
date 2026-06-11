import List "mo:core/List";
import Time "mo:core/Time";
import ProjectTypes "../types/projects";
import ProjectLib "../lib/projects";

mixin (
  projects : List.List<ProjectTypes.Project>,
  projectState : { var nextProjectId : Nat }
) {
  public func getProjects() : async [ProjectTypes.Project] {
    projects.toArray();
  };

  public func addProject(req : ProjectTypes.AddProjectRequest) : async ProjectTypes.Project {
    let now = Time.now();
    projectState.nextProjectId += 1;
    let project : ProjectTypes.Project = {
      id = ProjectLib.generateId(now, projectState.nextProjectId);
      title = req.title;
      description = req.description;
      category = req.category;
      status = req.status;
      progressPercent = req.progressPercent;
      featuredImageUrl = req.featuredImageUrl;
      createdAt = now;
    };
    projects.add(project);
    project;
  };

  public func updateProject(req : ProjectTypes.UpdateProjectRequest) : async ?ProjectTypes.Project {
    var updated : ?ProjectTypes.Project = null;
    projects.mapInPlace(
      func(p) {
        if (p.id == req.id) {
          let newP : ProjectTypes.Project = {
            p with
            title = switch (req.title) { case (?v) v; case null p.title };
            description = switch (req.description) { case (?v) v; case null p.description };
            category = switch (req.category) { case (?v) v; case null p.category };
            status = switch (req.status) { case (?v) v; case null p.status };
            progressPercent = switch (req.progressPercent) { case (?v) v; case null p.progressPercent };
            featuredImageUrl = switch (req.featuredImageUrl) { case (?v) ?v; case null p.featuredImageUrl };
          };
          updated := ?newP;
          newP;
        } else { p };
      }
    );
    updated;
  };

  public func deleteProject(id : Text) : async Bool {
    let sizeBefore = projects.size();
    projects.retain(func(p) { p.id != id });
    projects.size() < sizeBefore;
  };
};
