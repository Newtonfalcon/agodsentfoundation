import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Data Imports
import { site } from "./data/site";
import { hero } from "./data/hero";
import { programs } from "./data/programs";
import { campaigns } from "./data/campaigns";
import { impact } from "./data/impact";
import { founder } from "./data/founder";
import { testimonials } from "./data/testimonials";
import { stories } from "./data/stories";
import { news } from "./data/news";
import { contact } from "./data/contact";

// Icons
import {
  BookOpen,
  HeartPulse,
  Soup,
  Milestone,
  Sparkles,
  Trophy,
  Home,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Heart,
  ChevronRight,
  ChevronLeft,
  X,
  Lock,
  Check,
  Send,
  Sparkle
} from "lucide-react";

// Icon Mapper helper for programs
const iconMap = {
  BookOpen,
  HeartPulse,
  Soup,
  Milestone,
  Sparkles,
  Trophy,
  Home
};

export default function App() {
  // Navigation active section tracker
  const [activeSection, setActiveSection] = useState("home");

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Quick Donation Selection state in Hero / Widget
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");

  // Donation Modal state
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [donateDesignation, setDonateDesignation] = useState("General Fund");
  const [donateStep, setDonateStep] = useState("form");

  // Live Donor Wall simulation state
  const [donors, setDonors] = useState([
    { name: "Amelia R.", location: "Texas, USA", amount: 100, project: "Safe Haven Shelter", date: "Just now" },
    { name: "Eseosa O.", location: "London, UK", amount: 250, project: "Saturday Kitchen", date: "3 mins ago" },
    { name: "Dr. David S.", location: "Berlin, Germany", amount: 50, project: "Free Clinic", date: "15 mins ago" },
    { name: "Joy N.", location: "Lagos, Nigeria", amount: 500, project: "School uniforms & books", date: "1 hour ago" },
    { name: "Kenneth W.", location: "California, USA", amount: 100, project: "Teachers Support Fund", date: "2 hours ago" }
  ]);

  // Donation Checkout Form inputs
  const [donorFirstName, setDonorFirstName] = useState("");
  const [donorLastName, setDonorLastName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [coverFees, setCoverFees] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Story selector state (Before/After showcases)
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [storyBeforeAfter, setStoryBeforeAfter] = useState("after");

  // Transparency Segment selection state
  const [selectedPieSegment, setSelectedPieSegment] = useState(0);

  // News reader modal
  const [activeNewsId, setActiveNewsId] = useState(null);

  // Message Form state in Contact
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Auto-play Hero slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hero.slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll position to update Active Nav Indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "programs", "campaigns", "stories", "news", "contact"];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smooth anchor navigation
  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  // Trigger Donate with specific parameters
  const handleOpenDonate = (amount = 100, designation = "General Purpose Fund") => {
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
    setDonateDesignation(designation);
    setDonateStep("form");
    setIsDonateModalOpen(true);
  };

  // Submit simulated donation
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!donorFirstName || !donorEmail) return;

    setDonateStep("submitting");

    // Simulate safe API callback
    setTimeout(() => {
      const finalAmount = selectedAmount === "custom" ? parseFloat(customAmount) || 50 : selectedAmount;

      // Append new donor to Wall of Love simulation
      const newDonor = {
        name: isAnonymous ? "Anonymous Benefactor" : `${donorFirstName} ${donorLastName.charAt(0)}.`,
        location: isAnonymous ? "Global Citizen" : "Donor Simulation",
        amount: finalAmount,
        project: donateDesignation,
        date: "Just now"
      };

      setDonors((prev) => [newDonor, ...prev]);
      setDonateStep("success");
    }, 1800);
  };

  // Reset checkout form and close modal
  const handleCloseDonateModal = () => {
    setIsDonateModalOpen(false);
    setDonateStep("form");
    setDonorFirstName("");
    setDonorLastName("");
    setDonorEmail("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
  };

  // Send simulated contact email
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
      setTimeout(() => setContactSuccess(false), 5000);
    }, 1200);
  };

  // Computations for active quick donation preset info
  const activePresetDesc = useMemo(() => {
    if (selectedAmount === "custom") {
      return "Every single dollar supports school repairs, Saturday hot meals, or clinical medications.";
    }
    const preset = hero.donationPanel.presets.find((p) => p.amount === selectedAmount);
    return preset ? preset.description : "";
  }, [selectedAmount]);

  // Format and adapt raw stories list for rendering
  const formattedStories = useMemo(() => {
    return (stories.list || []).map((story) => {
      let name = "";
      let location = "";
      let metric = "";
      if (story.id === "joy_chinidu") {
        name = "Joy Chinidu";
        location = "Spain & Benin City, Nigeria";
        metric = "Reunited after 13 years of painful separation";
      } else if (story.id === "mr_edegbe") {
        name = "Mr. Edegbe";
        location = "Egor LGA, Edo State";
        metric = "Granddaughter sponsored on 100% full scholarship";
      } else {
        name = "Adunhanhan Primary School";
        location = "Uhunmwonde LGA, Edo State";
        metric = "100% overhaul of classrooms, roofing & desks";
      }
      return {
        ...story,
        name,
        location,
        storyText: story.fullStory,
        beforeImage: story.imageBefore,
        afterImage: story.imageAfter,
        metric
      };
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC] text-gray-800 antialiased font-sans selection:bg-[#0B5ED7]/15 selection:text-[#0B5ED7]">
      
      {/* Dynamic Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate(100, "General Purpose Fund")}
      />

      {/* Main Body Layout */}
      <main className="flex-grow pt-0">

        {/* 1. HERO SLIDER SECTION with Inset High-Conversion Action Panel */}
        <section id="home" className="relative min-h-[95vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
          
          {/* Background Slider */}
          <div className="absolute inset-0 z-0 bg-gray-950">
            {hero.slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? "opacity-40 scale-100" : "opacity-0 scale-105"
                } transform transition-transform duration-[7000ms]`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-8 left-8 z-20 hidden sm:flex items-center gap-3">
            {hero.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "bg-[#F4C542] w-12" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          {/* Core Grid Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-28 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Mission Statement (7 Columns) */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase">
                  <Sparkle className="w-3 h-3 text-[#F4C542] fill-[#F4C542]" />
                  <span>Empowering Children & Youth</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                  {hero.slides[currentSlide].title}
                </h1>
                
                <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed max-w-2xl">
                  {hero.slides[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => handleNavigate("about")}
                    className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-7 py-3 rounded-full text-xs tracking-wider uppercase transition-all shadow-md focus:outline-none"
                  >
                    Our Mission
                  </button>
                  <button
                    onClick={() => handleNavigate("programs")}
                    className="bg-transparent hover:bg-white/10 text-white font-bold px-7 py-3 rounded-full text-xs tracking-wider uppercase transition-all border border-white/30 focus:outline-none"
                  >
                    Explore Programs
                  </button>
                </div>
              </div>

              {/* Right World-Vision-Inspired High Conversion Quick Donation Panel */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-gray-100/80 relative overflow-hidden text-gray-900">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0B5ED7]"></div>
                  
                  <h2 className="text-xl font-extrabold tracking-tight mb-1 text-gray-900">
                    {hero.donationPanel.title}
                  </h2>
                  <p className="text-xs text-gray-500 mb-6 font-medium">
                    {hero.donationPanel.subtitle}
                  </p>

                  <div className="space-y-4">
                    {/* Amount Preset Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {hero.donationPanel.presets.map((preset) => (
                        <button
                          key={preset.amount}
                          onClick={() => {
                            setSelectedAmount(preset.amount);
                            setCustomAmount("");
                          }}
                          className={`py-3.5 px-1 rounded-2xl text-sm font-black border tracking-tight transition-all focus:outline-none ${
                            selectedAmount === preset.amount
                              ? "bg-[#0B5ED7] border-[#0B5ED7] text-white shadow-md shadow-[#0B5ED7]/15"
                              : "bg-[#F8F9FA] border-gray-200/70 text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          ${preset.amount}
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedAmount("custom")}
                        className={`py-3.5 px-1 rounded-2xl text-xs font-black border tracking-tight transition-all focus:outline-none ${
                          selectedAmount === "custom"
                            ? "bg-[#0B5ED7] border-[#0B5ED7] text-white shadow-md shadow-[#0B5ED7]/15"
                            : "bg-[#F8F9FA] border-gray-200/70 text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {/* Custom input or Preset impact description */}
                    {selectedAmount === "custom" ? (
                      <div className="relative animate-in fade-in slide-in-from-top-2 duration-200">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          placeholder="Enter customized donation amount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full bg-[#F8F9FA] border border-gray-200 rounded-2xl py-3 pl-8 pr-4 text-xs font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0B5ED7] focus:bg-white transition-all"
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 font-medium leading-relaxed bg-[#F8F9FA] p-3.5 rounded-2xl border border-gray-100 min-h-[52px]">
                        {activePresetDesc}
                      </p>
                    )}

                    {/* Quick Button Submission */}
                    <button
                      onClick={() => handleOpenDonate(selectedAmount, "General Purpose Fund")}
                      className="w-full bg-[#0B5ED7] hover:bg-[#094cb0] text-white font-bold py-4 px-6 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md focus:outline-none active:scale-[0.98]"
                    >
                      {hero.donationPanel.ctaButton}
                    </button>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold pt-1">
                      <span className="flex items-center gap-1">🔒 Tax Deductible 501(c)(3)</span>
                      <span>Verified secure sandbox</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. STATS & KEY IMPACTS BAR */}
        <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-premium border border-gray-100/60 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {impact.metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block text-3xl font-black text-[#0B5ED7] tracking-tight">
                  {m.number}
                </span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. ABOUT & INTEGRITY BENTO GRID */}
        <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative Block (7 Columns) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase">
                  WHO WE ARE & WHAT WE STRIVE FOR
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {site.tagline}
                </h2>
              </div>

              <div className="text-gray-600 space-y-4 text-sm leading-relaxed font-medium">
                <p>{site.longHistory}</p>
                <p>
                  As an accredited public benefit initiative, we implement a highly structured
                  auditing regime where every administrative dollar is subsidized by separate institutional sponsors,
                  ensuring your direct gift funds 100% grassroots implementation.
                </p>
              </div>

              {/* Core Values Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                {site.values.map((v) => (
                  <div key={v.title} className="bg-white p-5 rounded-2xl shadow-soft border border-gray-100 hover:border-[#F4C542]/40 hover:shadow-md transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-[#F4C542]/10 text-[#F4C542] flex items-center justify-center font-bold text-xs mb-3.5">
                      ★
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight mb-1">{v.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Founder Profile Bento */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-premium border border-gray-100/80 space-y-6">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-xs text-[#F4C542] font-extrabold tracking-wider block">FOUNDER & CEO</span>
                  <span className="text-lg font-extrabold text-white">{founder.name}</span>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <span className="text-[11px] font-bold text-[#0B5ED7] tracking-widest uppercase block">Founder's Mandate</span>
                <blockquote className="text-xs text-gray-600 font-medium leading-relaxed italic border-l-2 border-[#F4C542] pl-3.5">
                  "{founder.message}"
                </blockquote>
                
                <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
                  <span>Served since 2011</span>
                  <span className="text-[#0B5ED7] font-bold">{founder.nationality}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. CORE PROGRAMS (CARDS WITH DIRECT INTERACTIVE ACTION) */}
        <section id="programs" className="py-20 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-2">
              <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase block">
                Grassroots Direct Programs
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Empowering Communities from within
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                By maintaining lean local operational branches, we deploy your resources directly into 
                monitored programs that promote nourishment, protection, and education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.list.map((prog) => {
                const DynamicIcon = iconMap[prog.iconName] || BookOpen;
                return (
                  <div
                    key={prog.id}
                    className="bg-white rounded-3xl border border-gray-100/60 overflow-hidden shadow-soft hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur p-2.5 rounded-xl shadow-sm text-[#0B5ED7] border border-gray-100">
                        <DynamicIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-lg text-gray-900 tracking-tight">{prog.title}</h3>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{prog.description}</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-50">
                        <div className="bg-[#F8F9FA] rounded-xl p-3 text-[11px] font-medium text-gray-700 leading-snug border border-gray-100">
                          <span className="font-bold text-[#0B5ED7] block mb-0.5">Direct Impact Point:</span>
                          {prog.highlight}
                        </div>

                        <button
                          onClick={() => handleOpenDonate(50, prog.title)}
                          className="w-full bg-[#F8F9FA] hover:bg-[#0B5ED7] text-gray-800 hover:text-white font-bold py-2.5 px-4 rounded-xl border border-gray-200 hover:border-transparent text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Heart className="w-3.5 h-3.5 text-[#F4C542] fill-transparent group-hover:fill-[#F4C542]" />
                          <span>Sponsor {prog.title.split(" ")[0]}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. URGENT CAMPAIGNS & LIVE DONOR FEED */}
        <section id="campaigns" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Campaigns & Progress (7 Columns) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-2">
                <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase">
                  Active Emergency Appeals
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Help us cross the finish line
                </h2>
              </div>

              {campaigns.list.map((camp) => {
                const percent = Math.min(100, Math.round((camp.raised / camp.target) * 100));
                return (
                  <div key={camp.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={camp.image}
                          alt={camp.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] bg-red-500/10 text-red-600 font-extrabold px-2.5 py-1 rounded-full border border-red-500/15 uppercase tracking-wider">
                          Urgent Appeal
                        </span>
                        <h3 className="font-extrabold text-base text-gray-900 tracking-tight pt-1">{camp.title}</h3>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{camp.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-50">
                      <div className="flex justify-between text-xs font-bold text-gray-700">
                        <span>Raised: <strong className="text-[#0B5ED7]">${camp.raised.toLocaleString()}</strong></span>
                        <span>Goal: <strong className="text-gray-500">${camp.target.toLocaleString()}</strong></span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 bottom-0 bg-[#0B5ED7] rounded-full transition-all duration-1000"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold pt-1">
                        <span>{percent}% Completed</span>
                        <button
                          onClick={() => handleOpenDonate(100, camp.title)}
                          className="text-[#0B5ED7] hover:text-[#094cb0] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Sponsor this appeal</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Simulated Live Donor Wall (5 Columns) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-premium space-y-6 text-left">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[#0B5ED7] font-black text-xs tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>Live Wall of Love</span>
                </div>
                <h3 className="font-extrabold text-lg text-gray-900">Recent Humanitarian Gifts</h3>
                <p className="text-[11px] text-gray-400 font-medium">Simulating live direct transactions worldwide</p>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                {donors.map((donor, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F8F9FA] rounded-2xl border border-gray-100/80 flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="space-y-0.5 text-left">
                      <span className="font-extrabold text-gray-900 block">{donor.name}</span>
                      <span className="text-[10px] text-gray-400 font-medium block">
                        {donor.location} • to <strong className="text-gray-500">{donor.project.split(" ")[0]}</strong>
                      </span>
                    </div>
                    <div className="text-right space-y-0.5">
                      <span className="font-black text-[#0B5ED7] block">+${donor.amount}</span>
                      <span className="text-[9px] text-gray-400 block font-medium">{donor.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-400 font-bold">
                <span>Total Simulated Donors: {donors.length + 142}</span>
                <span className="text-[#0B5ED7]">Active sandbox</span>
              </div>
            </div>

          </div>
        </section>

        {/* 6. BENEFICIARY STORIES (BEFORE/AFTER TABBED CONTAINER) */}
        <section id="stories" className="py-20 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-2">
              <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase block">
                Evidence of Transformation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Stories of Hope made Real
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                We believe in structural transparency. Review the direct conditions of families 
                before our interventions and their status today.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Vertical Menu selector (Left 4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-start gap-2 text-left">
                {formattedStories.map((story, idx) => (
                  <button
                    key={story.id}
                    onClick={() => {
                      setActiveStoryIdx(idx);
                      setStoryBeforeAfter("after");
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer block focus:outline-none ${
                      activeStoryIdx === idx
                        ? "bg-white border-[#0B5ED7] border-l-4 shadow-soft"
                        : "bg-transparent border-transparent hover:bg-white/50"
                    }`}
                  >
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-0.5">
                      Case #{story.id}
                    </span>
                    <span className="font-extrabold text-gray-900 text-sm block">{story.name}</span>
                    <span className="text-xs text-gray-500 font-medium line-clamp-1 block">{story.location}</span>
                  </button>
                ))}
              </div>

              {/* Expanded Active Story panel (Right 8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-gray-100/60 grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Media showcase (5 columns) */}
                <div className="md:col-span-5 flex flex-col items-center">
                   <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                    <img
                      src={storyBeforeAfter === "after" ? formattedStories[activeStoryIdx].afterImage : formattedStories[activeStoryIdx].beforeImage}
                      alt={formattedStories[activeStoryIdx].name}
                      className="w-full h-full object-cover transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-full shadow-sm border ${
                        storyBeforeAfter === "after"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}>
                        {storyBeforeAfter === "after" ? "STATUS: TODAY" : "STATUS: BEFORE"}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Selector */}
                  <div className="grid grid-cols-2 bg-[#F8F9FA] rounded-xl p-1 w-full mt-4 border border-gray-100">
                    <button
                      onClick={() => setStoryBeforeAfter("before")}
                      className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        storyBeforeAfter === "before"
                          ? "bg-white text-red-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Prior State
                    </button>
                    <button
                      onClick={() => setStoryBeforeAfter("after")}
                      className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        storyBeforeAfter === "after"
                          ? "bg-white text-green-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      Active Today
                    </button>
                  </div>
                </div>

                {/* Narrative block (7 columns) */}
                <div className="md:col-span-7 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[#0B5ED7] text-xs font-bold tracking-wider">
                        Transformation Profile
                      </span>
                      <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">
                        {formattedStories[activeStoryIdx].name}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold">{formattedStories[activeStoryIdx].location}</p>
                    </div>

                    <div className="text-xs text-gray-600 font-medium leading-relaxed space-y-3">
                      <div>
                        <strong className="text-gray-900 block mb-0.5">Direct Intervention Impact:</strong>
                        <p>{formattedStories[activeStoryIdx].storyText}</p>
                      </div>
                      <div className="p-3 bg-green-500/5 rounded-xl border border-green-500/10 text-green-700 text-[11px] leading-relaxed">
                        <strong>Simulated Progress Metric:</strong> {formattedStories[activeStoryIdx].metric}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-semibold">Case ID #{formattedStories[activeStoryIdx].id}</span>
                    <button
                      onClick={() => handleOpenDonate(100, formattedStories[activeStoryIdx].name)}
                      className="text-[#0B5ED7] hover:text-[#094cb0] font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Empower similar lives</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 7. TRANSPARENCY SECTION WITH INTERACTIVE BUDGET SEGMENTS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-premium grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Pie Chart Representation (5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Simulated CSS Pie representation */}
              <div className="relative w-60 h-60 rounded-full bg-gray-100 shadow-inner flex items-center justify-center border border-gray-100">
                
                {/* Simulated segments layers based on selection state */}
                <div
                  className={`absolute inset-0 rounded-full transition-transform duration-500 ${
                    selectedPieSegment === 0 ? "scale-105 rotate-12" : "scale-100"
                  }`}
                  style={{
                    background: "conic-gradient(#0B5ED7 0% 75%, #F4C542 75% 90%, #9CA3AF 90% 100%)"
                  }}
                ></div>
                
                {/* Donut hole overlay */}
                <div className="absolute w-44 h-44 rounded-full bg-white flex flex-col items-center justify-center shadow-md">
                  <span className="text-3xl font-black text-gray-900">
                    {selectedPieSegment === 0 ? "75%" : selectedPieSegment === 1 ? "15%" : "10%"}
                  </span>
                  <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest text-center">
                    {selectedPieSegment === 0 ? "DIRECT PROGRAMS" : selectedPieSegment === 1 ? "LOCAL SUPPORT" : "ADMINISTRATION"}
                  </span>
                </div>
              </div>

              {/* Segment selection buttons */}
              <div className="grid grid-cols-3 bg-[#F8F9FA] rounded-xl p-1 w-full mt-8 border border-gray-100">
                <button
                  onClick={() => setSelectedPieSegment(0)}
                  className={`py-2 px-1 text-[10px] font-extrabold rounded-lg cursor-pointer transition-all ${
                    selectedPieSegment === 0 ? "bg-[#0B5ED7] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Programs (75%)
                </button>
                <button
                  onClick={() => setSelectedPieSegment(1)}
                  className={`py-2 px-1 text-[10px] font-extrabold rounded-lg cursor-pointer transition-all ${
                    selectedPieSegment === 1 ? "bg-[#F4C542] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Support (15%)
                </button>
                <button
                  onClick={() => setSelectedPieSegment(2)}
                  className={`py-2 px-1 text-[10px] font-extrabold rounded-lg cursor-pointer transition-all ${
                    selectedPieSegment === 2 ? "bg-gray-400 text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Admin (10%)
                </button>
              </div>
            </div>

            {/* Explanatory text (7 columns) */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-2">
                <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase">
                  Audited Integrity & Transparency
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Where does my donation go?
                </h2>
              </div>

              <div className="space-y-4 text-xs text-gray-600 font-medium leading-relaxed">
                {selectedPieSegment === 0 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <p className="text-sm text-gray-900 font-extrabold">Direct Programmatic Services (75% of funds):</p>
                    <p>
                      This portion goes entirely to physical purchases and grass-root services, including shelter building materials, textbooks, primary schools, medical clinic items, vaccine kits, support stipends for volunteer teachers, and purchase of dry commodities for the soup kitchen.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>Purchasing foods and nutritional products locally</li>
                      <li>Clinical medication distribution and pediatric vaccines</li>
                      <li>Classrooms upgrades and learning materials</li>
                    </ul>
                  </div>
                )}
                {selectedPieSegment === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <p className="text-sm text-gray-900 font-extrabold">Local Support & Training (15% of funds):</p>
                    <p>
                      Covers the physical infrastructure, training sessions, safety security assessments, and micro-loan grants to widows and mothers to start secondary cottage industries to sustain their children.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>Vocational training equipment and machine tools</li>
                      <li>Emergency response staff training</li>
                      <li>Safe shelter secure perimeter guard staffing</li>
                    </ul>
                  </div>
                )}
                {selectedPieSegment === 2 && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <p className="text-sm text-gray-900 font-extrabold font-sans">Administration & Fundraising (10% of funds):</p>
                    <p>
                      We keep our operational cost at the absolute minimum (10%). This covers essential bookkeeping, legal compliance, and web processing. Importantly, corporate matching donors subsidize this portion first, rendering standard grassroots donations completely administration-free.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>Global 501(c)(3) regulatory filings</li>
                      <li>Audit tracking & transparent impact reporting</li>
                      <li>Website support & checkout security layers</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                <span className="text-[11px] text-gray-400 font-semibold">Latest IRS 990 documentation is publicly filed.</span>
                <button
                  onClick={() => handleOpenDonate(100, "General Fund")}
                  className="bg-[#0B5ED7] hover:bg-[#094cb0] text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md focus:outline-none"
                >
                  Give with Confidence
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 8. STORIES OF HUMANITARIAN NEWS & REPORTS */}
        <section id="news" className="py-20 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            
            <div className="max-w-3xl mx-auto space-y-2">
              <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase block">
                Direct Field Updates
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Reports of Change from West Africa
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Get raw updates from the field detailing our completed projects, active schools, 
                and nutritional supply arrivals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-3xl border border-gray-100/60 overflow-hidden shadow-soft hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0B5ED7] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] text-gray-400 font-bold">{art.date}</span>
                      <h3 className="font-extrabold text-base text-gray-900 tracking-tight line-clamp-2 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveNewsId(art.id)}
                      className="w-full bg-[#F8F9FA] hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wide transition-all text-center cursor-pointer"
                    >
                      Read Full Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 9. CONTACT & INQUIRY FORM */}
        <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-[#0B5ED7] font-black text-xs tracking-widest uppercase block">
                Connect with our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Have questions or want to volunteer?
              </h2>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Whether you seek sponsorship reports, custom 501(c)(3) tax receipt copies, 
                or volunteer paths, our teams are ready to correspond.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Offices lists (5 Columns) */}
              <div className="lg:col-span-5 space-y-6">
                {contact.offices.map((office, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft text-left space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#F4C542]/10 text-[#F4C542] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-[#F4C542]/20">
                        {office.country}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-gray-900 tracking-tight">
                      {office.title}
                    </h3>
                    
                    <div className="space-y-2.5 text-xs text-gray-600 font-medium">
                      <div className="flex gap-2.5 items-start">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex gap-2.5 items-center">
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex gap-2.5 items-center">
                        <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-[#0B5ED7] hover:underline">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Simulator Form (7 Columns) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-soft text-left">
                <h3 className="font-extrabold text-lg text-gray-900 mb-6">Send an Active Message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">My Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={contact.formPlaceholder.name}
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7] placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">My Email</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder={contact.formPlaceholder.email}
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7] placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Subject</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder={contact.formPlaceholder.subject}
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7] placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Message Description</label>
                    <textarea
                      required
                      rows={5}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={contact.formPlaceholder.message}
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-900 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7] placeholder-gray-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full bg-[#0B5ED7] hover:bg-[#094cb0] disabled:bg-gray-400 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isSubmittingContact ? "Sending..." : "Deliver Simulated Inquiry"}</span>
                    <Send className="w-4 h-4" />
                  </button>

                  {contactSuccess && (
                    <div className="flex items-center gap-3 text-green-700 text-xs bg-green-500/10 p-3.5 rounded-xl border border-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span>Thank you! Your simulated message has been processed successfully. We will reach back to you.</span>
                    </div>
                  )}

                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Reusable Large Footer Component */}
      <Footer onNavigate={handleNavigate} />

      {/* ==================== INTERACTIVE DONATION checkout OVERLAY MODAL ==================== */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Blue header bar */}
            <div className="bg-[#0B5ED7] text-white p-6 relative">
              <button
                onClick={handleCloseDonateModal}
                className="absolute right-4 top-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-extrabold tracking-tight">Support Our Direct Grassroots Missions</h3>
              <p className="text-xs text-white/80 mt-1">Designated Project: {donateDesignation}</p>
            </div>

            {/* Step 1: Form Fill Stage */}
            {donateStep === "form" && (
              <form onSubmit={handleDonationSubmit} className="p-6 space-y-5 text-left text-gray-900">
                
                {/* Simulated Checkout info strip */}
                <div className="bg-[#F8F9FA] border border-gray-200 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total Gift Amount</span>
                    <span className="text-2xl font-black text-[#0B5ED7]">
                      ${selectedAmount === "custom" ? customAmount || "50" : selectedAmount}
                    </span>
                  </div>
                  <span className="bg-[#F4C542]/10 text-[#F4C542] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase border border-[#F4C542]/20">
                    Tax-Deductible
                  </span>
                </div>

                {/* Donor Names */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      value={donorFirstName}
                      onChange={(e) => setDonorFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-2 px-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0B5ED7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                    <input
                      type="text"
                      required
                      value={donorLastName}
                      onChange={(e) => setDonorLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-2 px-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0B5ED7]"
                    />
                  </div>
                </div>

                {/* Donor Email */}
                <div>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">Email (For Mock Receipt)</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="jane.doe@example.com"
                    className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-2 px-3 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0B5ED7]"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-black text-gray-500 uppercase tracking-wider">Simulated Payment Method</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2 px-3 rounded-xl font-bold border text-xs text-center cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-[#0B5ED7] bg-[#0B5ED7]/5 text-[#0B5ED7]"
                          : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      Credit/Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`py-2 px-3 rounded-xl font-bold border text-xs text-center cursor-pointer transition-all ${
                        paymentMethod === "paypal"
                          ? "border-[#0B5ED7] bg-[#0B5ED7]/5 text-[#0B5ED7]"
                          : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      PayPal Express
                    </button>
                  </div>
                </div>

                {/* Simulated Card details if chosen */}
                {paymentMethod === "card" && (
                  <div className="space-y-3 p-3.5 bg-[#F8F9FA] rounded-2xl border border-gray-200">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Card Number (Mock Sandbox)</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 •••• •••• ••••"
                        className="w-full bg-white border border-gray-300 rounded-lg py-1.5 px-3 text-xs text-gray-900 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-white border border-gray-300 rounded-lg py-1.5 px-3 text-xs text-gray-900 focus:outline-none text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">Security Code (CVC)</label>
                        <input
                          type="text"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-white border border-gray-300 rounded-lg py-1.5 px-3 text-xs text-gray-900 focus:outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Fee coverage Checkbox */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="flex items-start gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={coverFees}
                      onChange={(e) => setCoverFees(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>
                      Add 4% (<strong>${((selectedAmount === "custom" ? parseFloat(customAmount) || 50 : selectedAmount) * 0.04).toFixed(2)}</strong>) to cover simulated processing fees so 100% of my gift directly feeds, educates, and houses children.
                    </span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>Make my contribution anonymous on the Wall of Love.</span>
                  </label>
                </div>

                {/* Final checkout button */}
                <button
                  type="submit"
                  className="w-full bg-[#0B5ED7] hover:bg-[#094cb0] text-white py-3 px-6 rounded-2xl font-bold text-sm tracking-wider uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    Simulate Gift of ${((selectedAmount === "custom" ? parseFloat(customAmount) || 50 : selectedAmount) * (coverFees ? 1.04 : 1.0)).toFixed(2)}
                  </span>
                </button>

                <p className="text-[10px] text-gray-400 text-center italic">
                  This is a secure UI/UX donor checkout simulation. No real money will be charged.
                </p>

              </form>
            )}

            {/* Step 2: Submitting Screen */}
            {donateStep === "submitting" && (
              <div className="p-12 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#0B5ED7] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h4 className="font-extrabold text-lg text-gray-900">Processing Simulated Transaction...</h4>
                <p className="text-xs text-gray-500">Contacting secure sandbox gateway. Please do not close this window.</p>
              </div>
            )}

            {/* Step 3: Success Thank You Card Screen */}
            {donateStep === "success" && (
              <div className="p-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl font-extrabold text-gray-900 tracking-tight">Simulated Donation Received!</h4>
                  <p className="text-sm text-gray-600 px-4">
                    Thank you, <strong>{donorFirstName || "Compassionate Friend"}</strong>! Your generous mock support will be recorded on our simulated Wall of Love.
                  </p>
                </div>

                {/* Receipt Card Visualizer */}
                <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200 text-left space-y-3 relative overflow-hidden font-mono text-[11px] text-gray-700">
                  <div className="absolute top-0 right-0 bg-[#F4C542]/25 text-[#dca71b] text-[8px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl border-l border-b border-[#F4C542]/20">
                    GS-MOCK-RECEIPT
                  </div>
                  <h5 className="font-bold text-gray-900 border-b border-gray-200 pb-2 text-xs uppercase tracking-wider">
                    Godsent Foundation Inc.
                  </h5>
                  <div className="space-y-1">
                    <p><strong>Donor Name:</strong> {isAnonymous ? "Anonymous" : `${donorFirstName} ${donorLastName}`}</p>
                    <p><strong>Donor Email:</strong> {donorEmail}</p>
                    <p><strong>Designation:</strong> {donateDesignation}</p>
                    <p><strong>Gift Principal:</strong> ${selectedAmount === "custom" ? customAmount : selectedAmount}</p>
                    <p><strong>Admin Fees Cover:</strong> {coverFees ? "Yes" : "No"}</p>
                    <p className="text-gray-900 font-bold border-t border-gray-200 pt-2 text-sm flex justify-between">
                      <span>Total Registered:</span>
                      <span>${((selectedAmount === "custom" ? parseFloat(customAmount) || 50 : selectedAmount) * (coverFees ? 1.04 : 1.0)).toFixed(2)}</span>
                    </p>
                  </div>
                </div>

                {/* Closing button */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={handleCloseDonateModal}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-2xl text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== INTERACTIVE ARTICLE READER MODAL ==================== */}
      {activeNewsId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            {(() => {
              const article = news.articles.find((a) => a.id === activeNewsId);
              if (!article) return null;
              return (
                <div>
                  {/* Photo cover */}
                  <div className="relative h-64 bg-gray-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => setActiveNewsId(null)}
                      className="absolute right-4 top-4 text-white bg-black/40 hover:bg-black/60 p-1.5 rounded-full transition-colors cursor-pointer focus:outline-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-6 text-white text-left">
                      <span className="bg-[#0B5ED7] text-white text-[9px] uppercase font-black px-2.5 py-0.5 rounded mr-2">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-gray-300 font-medium">{article.date}</span>
                    </div>
                  </div>

                  {/* Body text */}
                  <div className="p-8 text-left space-y-4">
                    <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 italic font-medium leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="text-sm text-gray-700 leading-relaxed space-y-3 pt-2 border-t border-gray-100">
                      <p>{article.content}</p>
                      <p>
                        Through these community development and advocacy initiatives, God Sent Foundation continues to provide pathways of survival for vulnerable youths and children, rebuilding local infrastructure, and keeping the spirit of West African talent and art alive.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveNewsId(null);
                          handleOpenDonate(50, article.category);
                        }}
                        className="bg-[#0B5ED7] hover:bg-[#094cb0] text-white font-bold py-2 px-5 rounded-xl text-xs uppercase tracking-wide cursor-pointer"
                      >
                        Sponsor This Initiative
                      </button>
                      <button
                        onClick={() => setActiveNewsId(null)}
                        className="text-xs font-bold text-gray-500 hover:text-gray-800 focus:outline-none"
                      >
                        Close Article
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}
