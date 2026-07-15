import { BookOpen, HeartPulse, Soup, Milestone, Sparkles, Trophy, Home } from "lucide-react";

export const programs = {
  sectionTitle: "Our Core Initiatives",
  sectionSubtitle: "We run fully operational, community-driven programs focused on real human development and grassroots impact.",
  list: [
    {
      id: "education",
      title: "Education Support Initiative",
      iconName: "BookOpen",
      description: "Providing high-quality free education for less-privileged kids. We supply books, desks, uniform sets, and have created the 'Teachers' Support Fund' to ensure educators are well-compensated and motivated.",
      highlight: "Over 4 primary schools renovated & 100% free tuition sponsored.",
      image: "/internet/schoolkids.jpeg"
    },
    {
      id: "health",
      title: "Free Clinic & Children Centre",
      iconName: "HeartPulse",
      description: "Our dedicated Clinic in Egor Local Government area offers 100% free primary healthcare, laboratory diagnostics, medical consultations, and essential medication to the underserved population.",
      highlight: "Combined with a safe children's playground to promote mental wellness.",
      image: "/internet/clinic.jpeg"
    },
    {
      id: "kitchen",
      title: "Saturday Free Kitchen",
      iconName: "Soup",
      description: "Providing nutritious hot meals every single Saturday since July 1st, 2017. Guided by the philosophy: 'once the problem of food is addressed in the life of a poor fellow, the poverty level has been substantially solved.'",
      highlight: "Over 120,000+ meals served continuously for 9+ years.",
      image: "/internet/freekitchen.jpg"
    },
    {
      id: "renovation",
      title: "Adunhanhan School Renovation & Development",
      iconName: "Milestone",
      description: "Renovating and upgrading school infrastructure to create safe, conducive learning environments. This includes building classrooms, labs, playgrounds, and hygienic facilities to foster academic excellence.",
      highlight: "",
      image: "/internet/renovate.jpeg"
    },
    {
      id: "empowerment",
      title: "Women & Youth Empowerment",
      iconName: "Sparkles",
      description: "Distributing agricultural milling, grinding, and sewing machines to widows and single mothers. Sponsoring startup micro-grants to empower families towards sustainable self-reliance.",
      highlight: "850+ women equipped with machines & capital to run independent trades.",
      image: "/internet/women-empowerment.jpeg"
    },
    {
      id: "capital",
      title: "Cash Empowerment for Businesses",
      subtitle: "Providing vital seed funding and grants to help local entrepreneurs scale.",
      iconName: "Briefcase", // Changed from "Home" to match business/capital theme
      description: "Providing micro-grants and direct cash assistance to local small business owners and struggling entrepreneurs. This funding helps them purchase raw materials, secure inventory, and navigate economic challenges, fostering self-reliance and community wealth.",
      highlight: "Direct cash grants distributed. Helping local shops and trades scale up.",
      image: "/internet/cash-empowerment.jpeg"
    },
   
  ]
};
