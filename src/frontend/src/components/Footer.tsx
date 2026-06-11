import { CONTACT_EMAIL, CONTACT_PHONE, SITE_LOCATION } from "@/constants";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const FOOTER_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/report", label: "Report Problem" },
  { to: "/join", label: "Join Team" },
  { to: "/donate", label: "Donate" },
];

const POLICY_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="inline-block mb-4"
              data-ocid="footer.logo_link"
            >
              <img
                src="/assets/logo-uploaded.png"
                alt="Swachhata Prahari"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Awaaz Safai Ki — Citizens reporting cleanliness issues in Bihar
              for a cleaner tomorrow.
            </p>
            <div className="text-xs text-muted-foreground">
              <span>🌿 Swachh Bharat Mission</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                    data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{SITE_LOCATION}</span>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com/swachtaprahari"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/swachtaprahari"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@swachtaprahari"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/swachtaprahari"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {year} Swachhata Prahari. All rights reserved.</span>
          <span>
            Built by{" "}
            <a
              href="https://www.evergreenhub.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008000] font-semibold hover:underline"
            >
              TEAM RUDRA
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
