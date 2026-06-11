import List "mo:core/List";
import Time "mo:core/Time";
import TestimonialTypes "../types/testimonials";
import TestimonialLib "../lib/testimonials";

mixin (
  testimonials : List.List<TestimonialTypes.Testimonial>,
  testimonialState : { var nextTestimonialId : Nat }
) {
  public func getTestimonials() : async [TestimonialTypes.Testimonial] {
    testimonials.toArray();
  };

  public func addTestimonial(req : TestimonialTypes.AddTestimonialRequest) : async TestimonialTypes.Testimonial {
    let now = Time.now();
    testimonialState.nextTestimonialId += 1;
    let testimonial : TestimonialTypes.Testimonial = {
      id = TestimonialLib.generateId(now, testimonialState.nextTestimonialId);
      name = req.name;
      quote = req.quote;
      role = req.role;
      photoUrl = req.photoUrl;
      isActive = req.isActive;
      createdAt = now;
    };
    testimonials.add(testimonial);
    testimonial;
  };

  public func updateTestimonial(req : TestimonialTypes.UpdateTestimonialRequest) : async ?TestimonialTypes.Testimonial {
    var updated : ?TestimonialTypes.Testimonial = null;
    testimonials.mapInPlace(
      func(t) {
        if (t.id == req.id) {
          let newT : TestimonialTypes.Testimonial = {
            t with
            name = switch (req.name) { case (?v) v; case null t.name };
            quote = switch (req.quote) { case (?v) v; case null t.quote };
            role = switch (req.role) { case (?v) v; case null t.role };
            photoUrl = switch (req.photoUrl) { case (?v) ?v; case null t.photoUrl };
            isActive = switch (req.isActive) { case (?v) v; case null t.isActive };
          };
          updated := ?newT;
          newT;
        } else { t };
      }
    );
    updated;
  };

  public func deleteTestimonial(id : Text) : async Bool {
    let sizeBefore = testimonials.size();
    testimonials.retain(func(t) { t.id != id });
    testimonials.size() < sizeBefore;
  };
};
