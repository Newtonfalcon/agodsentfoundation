import React, { useState } from "react";
import { footer } from "../data/footer";
import { site } from "../data/site";
import { socials } from "../data/socials";
import { contact } from "../data/contact";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

// Inline SVG icons (avoids lucide-react social icon issues)
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.27 3.6Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1ESxTsHU6x/",
    Icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://youtu.be/DkPumKKXeR0?si=gOBm29cee8qCSW6A",
    Icon: YoutubeIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/godsentfoundation1?igsh=MWVxOWxzaXRucXI5aA==",
    Icon: InstagramIcon,
  },
];

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (href) => {
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      onNavigate(sectionId);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission column */}
          <div className="space-y-4">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 cursor-pointer group text-left focus:outline-none"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0B5ED7] text-white font-bold text-base">
                <span className="text-white font-black">GS</span>
              </div>
              <div>
                <span className="block font-extrabold text-base text-white tracking-tight">GOD SENT</span>
                <span className="block text-[9px] uppercase tracking-widest font-bold text-[#F4C542] -mt-1">FOUNDATION</span>
              </div>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed mt-4">
              {footer.missionText}
            </p>
            <div className="pt-2">
              <span className="inline-block bg-gray-800 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-700">
                501(c)(3) Registered Public Charity
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a

                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 border border-gray-700 text-gray-300 hover:bg-[#0B5ED7] hover:text-white hover:border-[#0B5ED7] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-[#F4C542] transition-colors text-sm text-gray-400 text-left focus:outline-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-5">Our Programs</h3>
            <ul className="space-y-3">
              {footer.programsLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="hover:text-[#F4C542] transition-colors text-sm text-gray-400 text-left focus:outline-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup Column */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-5">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Stay updated with direct reports, stories of hope, and progress of our children shelter.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-2.5 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-[#0B5ED7] transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#0B5ED7] hover:bg-[#094cb0] text-white px-3.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <div className="flex items-center gap-2 text-green-400 text-xs mt-3 bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are now subscribed.</span>
              </div>
            )}
          </div>

        </div>

        {/* Contact Info Middle Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-t border-b border-gray-800 my-8">
          {contact.offices.map((office, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="p-2.5 bg-gray-800 rounded-xl h-fit text-[#F4C542]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">{office.country}</h4>
                <p className="text-xs text-gray-400">{office.address}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    {office.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    {office.email}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>© {new Date().getFullYear()} God Sent Foundation. All rights reserved.</p>
            <p className="mt-1">Godsent Foundation is a registered 501(c)(3) charity in the USA.</p>
          </div>
          <div className="flex items-center gap-6">
            {footer.legalLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}