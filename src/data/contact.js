// Central inbox that the "Contact Us" form on the site delivers to via a mailto: link.
// Change this single value to redirect all site-wide enquiries to a different address.
export const CONTACT_FORM_RECIPIENT_EMAIL = "info@godsentfoundation.org";

export const contact = {
  sectionTitle: "Get in Touch with Our Teams",
  sectionSubtitle: "Have questions about sponsorships, food donations, or volunteer opportunities? Reach out to us directly.",
  offices: [
    {
      country: "United States (Registered Headquarter)",
      address: "P.O. Box 2361 Pflugerville, Texas, USA",
      phone: "+1 (512) 368-1066",
      email: "usa@godsentfoundation.org"
    },
    {
      country: "Nigeria (Operational Headquarter)",
      address: "24 Ezoti Street, Benin City, Edo State, Nigeria",
      phone: "07051938417, 08054157001",
      email: "nigeria@godsentfoundation.org"
    }
  ],
  generalEmail: "info@godsentfoundation.org",
  formPlaceholder: {
    name: "Your Full Name",
    email: "Your Email Address",
    subject: "Subject (e.g. Sponsoring a Class / Sat Kitchen)",
    message: "Write your message here..."
  }
};