/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId, useEffect } from 'react';
import {
  Phone,
  CheckCircle2,
  Menu,
  X,
  Clock,
  UserCheck,
  IndianRupee,
  Sparkles,
  ArrowRight,
  Car,
  Star,
  Quote,
  Mail,
  MapPin,
  Compass,
  Heart,
  Mountain,
  Landmark,
  Plane,
  Users,
  ChevronDown,
  ArrowUp
} from 'lucide-react';

/* ==========================================================================
   BUSINESS CONFIGURATION
   Centralized details for easy updating across the website.
   - To change the WhatsApp destination, edit `whatsappNumber`.
   - To connect Formspree backup, paste your Formspree endpoint into `formspreeEndpoint`.
   ========================================================================== */
export const BUSINESS_CONFIG = {
  name: "Sharma Tour And Travels",
  phone: "+919899004713",
  phoneDisplay: "98990 04713",
  email: "contact@sharmatourandtravels.com", // Placeholder
  address: "Delhi NCR, India",               // Placeholder
  tagline: "24/7 Taxi Service",
  whatsappNumber: "919899004713",            // Country code + 10-digit number (no plus or spaces)
  formspreeEndpoint: "",                     // Paste your Formspree URL here, like https://formspree.io/f/xxxxxxx
};

/* ==========================================================================
   FLEET IMAGES
   Vehicle photos are stored in /public/images/ (dzire.jpg, ertiga.jpg,
   urbania.jpg, bus.jpg).
   HOW TO REPLACE AN IMAGE LATER:
   - Option A: Overwrite the matching file in /public/images/ keeping the same
     filename (for example, replace /public/images/dzire.jpg).
   - Option B: Add a new image file into /public/images/ (or use a hosted URL)
     and update the path in the `fleetImages` object below.
   If an image path is empty or fails to load, the card automatically displays
   a clean navy placeholder with the vehicle name and "Photo coming soon".
   ========================================================================== */
export const fleetImages = {
  dzire: "/images/dzire.jpg",
  ertiga: "/images/ertiga.jpg",
  urbania: "/images/urbania.jpg",
  bus: "/images/bus.jpg", // Buses
};

/* ==========================================================================
   FREQUENTLY ASKED QUESTIONS
   ========================================================================== */
export const FAQ_ITEMS = [
  {
    question: "How do I book a cab with Sharma Tour And Travels?",
    answer:
      "You can call us directly at 98990 04713, message us on WhatsApp, or submit the booking form on this page. Our team confirms your ride within minutes.",
  },
  {
    question: "Are there any hidden charges or surprise fees?",
    answer:
      "No hidden charges whatsoever. We provide transparent, upfront quotes. Toll taxes, state permits, and parking charges are communicated clearly before your trip starts.",
  },
  {
    question: "Can I book outstation cabs or one-way drops?",
    answer:
      "Yes, we provide outstation round-trip and one-way drops to destinations all across India, with no return-fare penalty for one-way journeys.",
  },
  {
    question: "What types of vehicles are available in your fleet?",
    answer:
      "We offer well-maintained AC vehicles including Swift Dzire sedans, Maruti Ertiga SUVs, 12-17 seater Tempo Travellers, and 30-50 seater luxury coaches.",
  },
  {
    question: "Are the cabs clean and drivers experienced?",
    answer:
      "Every vehicle is sanitized before each journey. Our drivers are background-verified, courteous professionals with extensive highway and hill-driving experience.",
  },
  {
    question: "Is 24/7 late-night or emergency booking available?",
    answer:
      "Yes, we operate 24 hours a day, 7 days a week, including festival days. Call 98990 04713 anytime for immediate or scheduled pickups.",
  },
];

/* ==========================================================================
   NAVIGATION LINKS
   ========================================================================== */
export const NAV_LINKS = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Fleet', href: '#fleet', id: 'fleet' },
  { label: 'Destinations', href: '#travel-services', id: 'travel-services' },
  { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function App() {
  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active navigation section state
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll interactive states
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // FAQ accordion state (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Hidden honeypot field to block automated spam bots
  const [errors, setErrors] = useState<{ fullName?: string; phoneNumber?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputId = useId();
  const phoneInputId = useId();

  // Handle scroll detection for dynamic navbar, back-to-top button, and active link highlight
  useEffect(() => {
    const sectionIds = [
      'hero',
      'services',
      'fleet',
      'travel-services',
      'how-it-works',
      'reviews',
      'faq',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);
      setShowBackToTop(scrollPos > 350);

      // Section highlight calculation with offset for sticky navbar
      const scrollPositionWithOffset = scrollPos + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPositionWithOffset) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile navigation on Escape key press or window resize to desktop (xl: 1280px)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1280 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  // Validate form inputs
  const validateForm = () => {
    const newErrors: { fullName?: string; phoneNumber?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    // Phone validation: strip non-digits and ensure exactly 10 digits
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please enter your 10-digit mobile number';
    } else if (cleanedPhone.length !== 10) {
      newErrors.phoneNumber = 'Mobile number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler: WhatsApp (Primary) + Formspree (Optional backup)
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot check: If bot filled the hidden honeypot, simulate success and exit silently
    if (honeypot.trim()) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 2000);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    const trimmedName = fullName.trim();
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    /* ==========================================================================
       1. FORMSPREE BACKUP (Optional)
       If a Formspree endpoint is set in BUSINESS_CONFIG.formspreeEndpoint,
       POST the lead data as JSON. If empty or failed, skip silently.
       ========================================================================== */
    if (BUSINESS_CONFIG.formspreeEndpoint && BUSINESS_CONFIG.formspreeEndpoint.trim()) {
      try {
        await fetch(BUSINESS_CONFIG.formspreeEndpoint.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            phone: cleanPhone,
            timestamp: new Date().toISOString(),
            service: 'Cab Booking',
          }),
        });
      } catch (err) {
        // Silent fallback: Formspree failure never blocks customer booking
        console.warn('Formspree backup submission failed, proceeding with WhatsApp:', err);
      }
    }

    /* ==========================================================================
       2. WHATSAPP (Main Method - No Backend Required)
       Opens WhatsApp with pre-filled message:
       "Hello Sharma Tour And Travels, I want to book a cab. My name is {name} and my phone number is {phone}. Please call me."
       ========================================================================== */
    const prefilledMessage = `Hello Sharma Tour And Travels, I want to book a cab. My name is ${trimmedName} and my phone number is ${cleanPhone}. Please call me.`;
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(prefilledMessage)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Show success feedback and clear input fields
    setIsSubmitted(true);
    setFullName('');
    setPhoneNumber('');
    setErrors({});

    // Re-enable the button/form after 5 seconds
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(false);
    }, 5000);
  };

  // Smooth scroll to lead form and focus input
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const input = document.getElementById(nameInputId);
        if (input) input.focus();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1F2937] antialiased selection:bg-[#C9A24B] selection:text-[#0F1B2D] overflow-x-clip">
      
      {/* ====================================================================
          NAVBAR
          Sticky, refined dark navy background with subtle border and gold accents
          ==================================================================== */}
      {/* ====================================================================
          NAVBAR
          Sticky, dynamic height & shadow on scroll with subtle gold accents
          ==================================================================== */}
      <header
        className={`sticky top-0 z-50 bg-[#0F1B2D]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
          isScrolled ? 'shadow-xl bg-[#0F1B2D]/98' : ''
        }`}
      >
        <nav
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo / Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] rounded-lg p-1 -m-1"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A24B] to-[#9E7A2C] flex items-center justify-center text-[#0F1B2D] font-bold shadow-sm shadow-[#C9A24B]/20">
              <Car className="w-5 h-5 text-[#0F1B2D]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white group-hover:text-[#C9A24B] transition-colors">
                {BUSINESS_CONFIG.name}
              </span>
              <span className="text-[11px] font-sans font-medium tracking-widest uppercase text-[#C9A24B]">
                24/7 Premium Cab Service
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (xl+ screens for comfortable layout with 7 links + CTA) */}
          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative text-sm 2xl:text-base px-2.5 py-1.5 min-h-[44px] flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] rounded-md ${
                    isActive
                      ? 'text-[#C9A24B] font-bold'
                      : 'text-slate-200 font-medium hover:text-[#C9A24B]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-[#C9A24B] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}

            {/* Gold "Call Now" CTA Button */}
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="inline-flex items-center gap-2 ml-2 px-4 2xl:px-5 py-2.5 min-h-[44px] rounded-full bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1B2D] focus-visible:ring-[#C9A24B]"
            >
              <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile & Tablet Navigation Controls (visible below xl breakpoint) */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C9A24B] text-[#0F1B2D] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Call ${BUSINESS_CONFIG.name} at ${BUSINESS_CONFIG.phoneDisplay}`}
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Dropdown Menu with full close handler on all links */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="xl:hidden border-t border-white/10 bg-[#0F1B2D] px-4 pt-3 pb-6 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base min-h-[48px] flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-[#C9A24B] font-bold bg-white/10'
                      : 'text-slate-200 font-medium hover:text-[#C9A24B] hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#C9A24B]" aria-hidden="true" />
                  )}
                </a>
              );
            })}
            <div className="pt-2">
              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-base shadow transition-all duration-200 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Call Now ({BUSINESS_CONFIG.phoneDisplay})</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          MAIN CONTENT AREA
          ==================================================================== */}
      <main className="flex-1">

        {/* ====================================================================
            HERO SECTION
            Full-width dark navy background with subtle gradient & ambient lighting
            ==================================================================== */}
        <section
          id="hero"
          className="relative scroll-mt-24 bg-gradient-to-b from-[#0F1B2D] via-[#132238] to-[#0A1320] text-white overflow-hidden pt-7 pb-9 sm:py-12 md:py-14 lg:py-16 xl:py-20"
          aria-labelledby="hero-heading"
        >
          {/* Subtle ambient lighting accents */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `radial-gradient(ellipse 60% 50% at 75% 30%, rgba(201, 162, 75, 0.12), transparent 70%),
                                radial-gradient(ellipse 50% 60% at 20% 70%, rgba(30, 58, 95, 0.4), transparent 70%)`
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 xl:gap-14 lg:items-center">
              
              {/* Left Column: Hero Text, CTAs, and Trust Points */}
              <div className="lg:col-span-7 flex flex-col text-left space-y-5 sm:space-y-6">
                
                {/* Gold Label */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 self-start">
                  <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#EADCB6] uppercase">
                    24/7 Taxi Service
                  </span>
                </div>

                {/* Primary Heading (Exactly one H1) */}
                <h1
                  id="hero-heading"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
                >
                  Reliable Rides, <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8F7F4] to-[#C9A24B]">
                    Anytime You Need
                  </span>
                </h1>

                {/* Subtext: 16px minimum */}
                <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                  Safe, comfortable and affordable cab service available 24 hours a day.
                  Whether it is daily city commutes, airport transfers, or outstation tours, we are at your service.
                </p>

                {/* Action Buttons: 48px minimum touch height */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-base shadow-lg shadow-[#C9A24B]/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer motion-reduce:transition-none motion-reduce:hover:translate-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
                  >
                    <Phone className="w-4 h-4 text-[#C9A24B] fill-current" aria-hidden="true" />
                    <span>Call: {BUSINESS_CONFIG.phoneDisplay}</span>
                  </a>
                </div>

                {/* Trust Points */}
                <div className="pt-4 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                      <span className="text-sm sm:text-base font-medium text-slate-200">
                        24 Hours Service
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                      <span className="text-sm sm:text-base font-medium text-slate-200">
                        Experienced Drivers
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                      <span className="text-sm sm:text-base font-medium text-slate-200">
                        Neat & Clean Cars
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Lead Form Card */}
              <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
                <div
                  id="booking-form"
                  className="scroll-mt-28 bg-white text-[#1F2937] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#C9A24B]/25 relative overflow-hidden"
                >
                  {/* Decorative gold header line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B]" />

                  <div className="mb-6">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1B2D]">
                        Book Your Ride
                      </h2>
                      <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-[#8F6A1E] bg-[#C9A24B]/15 px-2.5 py-1 rounded-full border border-[#C9A24B]/20">
                        Instant Callback
                      </span>
                    </div>
                    <p className="text-base text-slate-600 mt-1 font-normal">
                      Fill in your details and our team will get in touch with you immediately.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div
                      className="p-6 rounded-xl bg-[#0F1B2D] text-white text-center space-y-4 animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="w-14 h-14 mx-auto rounded-full bg-[#C9A24B]/20 border border-[#C9A24B] flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-[#C9A24B]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                          Thank you! We will call you shortly.
                        </h3>
                        <p className="text-base text-slate-300 mt-2 leading-relaxed">
                          If WhatsApp did not open, please call{' '}
                          <a
                            href={`tel:${BUSINESS_CONFIG.phone}`}
                            className="text-[#C9A24B] hover:underline font-bold inline-flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                          >
                            {BUSINESS_CONFIG.phoneDisplay}
                          </a>.
                        </p>
                      </div>
                      <div className="pt-2 flex flex-col gap-2.5">
                        <a
                          href={`tel:${BUSINESS_CONFIG.phone}`}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl bg-[#C9A24B] text-[#0F1B2D] text-base font-bold hover:bg-[#B79038] transition-colors shadow-md"
                        >
                          <Phone className="w-4 h-4 fill-current" />
                          <span>Call Directly: {BUSINESS_CONFIG.phoneDisplay}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            setIsSubmitting(false);
                          }}
                          className="text-sm text-slate-300 hover:text-white underline cursor-pointer py-2 min-h-[44px]"
                        >
                          Book another ride
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} noValidate className="space-y-5">
                      {/* Hidden Honeypot Field to trap automated spam bots */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="company_lead_verification">Do not fill this field</label>
                        <input
                          type="text"
                          id="company_lead_verification"
                          name="company_lead_verification"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      {/* Full Name Field */}
                      <div>
                        <label
                          htmlFor={nameInputId}
                          className="block text-sm sm:text-base font-semibold text-[#0F1B2D] mb-1.5"
                        >
                          Full Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          type="text"
                          id={nameInputId}
                          name="fullName"
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 min-h-[48px] rounded-xl border text-base text-[#1F2937] placeholder:text-slate-400 bg-slate-50/50 transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                            errors.fullName
                              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                              : 'border-slate-300 focus:border-[#C9A24B] focus:ring-[#C9A24B]/20'
                          }`}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? `${nameInputId}-error` : undefined}
                        />
                        {errors.fullName && (
                          <p
                            id={`${nameInputId}-error`}
                            className="mt-1.5 text-xs sm:text-sm font-medium text-red-600 flex items-center gap-1"
                            role="alert"
                          >
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <label
                          htmlFor={phoneInputId}
                          className="block text-sm sm:text-base font-semibold text-[#0F1B2D] mb-1.5"
                        >
                          Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-base font-medium">
                            +91
                          </div>
                          <input
                            type="tel"
                            id={phoneInputId}
                            name="phoneNumber"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="tel-national"
                            value={phoneNumber}
                            maxLength={10}
                            onChange={(e) => {
                              // Only allow numeric digits
                              const onlyDigits = e.target.value.replace(/\D/g, '');
                              setPhoneNumber(onlyDigits);
                              if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                            }}
                            placeholder="Enter 10-digit mobile number"
                            className={`w-full pl-12 pr-4 py-3 min-h-[48px] rounded-xl border text-base text-[#1F2937] placeholder:text-slate-400 bg-slate-50/50 tracking-wider font-mono sm:font-sans transition-all focus:bg-white focus:outline-none focus:ring-2 ${
                              errors.phoneNumber
                                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                                : 'border-slate-300 focus:border-[#C9A24B] focus:ring-[#C9A24B]/20'
                            }`}
                            aria-invalid={!!errors.phoneNumber}
                            aria-describedby={errors.phoneNumber ? `${phoneInputId}-error` : undefined}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          {errors.phoneNumber ? (
                            <p
                              id={`${phoneInputId}-error`}
                              className="text-xs sm:text-sm font-medium text-red-600 flex items-center gap-1"
                              role="alert"
                            >
                              {errors.phoneNumber}
                            </p>
                          ) : (
                            <p className="text-xs text-slate-500">
                              Enter 10-digit mobile number
                            </p>
                          )}
                          <span className="text-xs text-slate-400 font-mono">
                            {phoneNumber.replace(/\D/g, '').length}/10
                          </span>
                        </div>
                      </div>

                      {/* Submit Button: Disables while processing to prevent double submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-6 min-h-[48px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A24B]"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-[#0F1B2D] border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </span>
                        ) : (
                          'Request a Call Back'
                        )}
                      </button>

                      <p className="text-xs text-center text-slate-500">
                        We respect your privacy. No spam guaranteed.
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================================
            SLOGAN STRIP (MARQUEE)
            Continuous gold banner with brand slogans, pauses on hover,
            and displays as a static wrapped row for reduced motion.
            ==================================================================== */}
        <div
          className="relative bg-[#C9A24B] text-[#0F1B2D] py-3.5 sm:py-4 overflow-hidden border-y border-[#B38E3A] select-none shadow-inner"
          role="region"
          aria-label="Brand Slogans"
        >
          <div className="flex animate-marquee items-center cursor-default">
            {/* First sequence of slogans */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 px-4 font-serif text-sm sm:text-base md:text-lg font-bold tracking-wide">
              <span>Safe Journey, Happy Memories</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Your Journey, Our Responsibility</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Every Mile with a Smile</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Har Safar Ho Suhana</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Comfort on Every Road</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Chalo, Bharat Ghoomein</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
            </div>

            {/* Duplicate sequence for seamless 100% infinite marquee loop (hidden on prefers-reduced-motion) */}
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center gap-6 sm:gap-8 px-4 font-serif text-sm sm:text-base md:text-lg font-bold tracking-wide motion-reduce:hidden"
            >
              <span>Safe Journey, Happy Memories</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Your Journey, Our Responsibility</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Every Mile with a Smile</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Har Safar Ho Suhana</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Comfort on Every Road</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
              <span>Chalo, Bharat Ghoomein</span>
              <span className="text-[#0F1B2D]/40 text-xs sm:text-sm" aria-hidden="true">✦</span>
            </div>
          </div>
        </div>

        {/* ====================================================================
            SERVICES / WHY CHOOSE US SECTION
            Spacious layout, soft off-white background, 4 feature cards & bottom CTA
            ==================================================================== */}
        <section
          id="services"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-[#F8F7F4] text-[#1F2937]"
          aria-labelledby="services-heading"
        >
          {/* Dedicated anchor target for navbar 'Why Us' */}
          <div id="why-us" className="absolute -top-24" aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto">
              {/* Small gold label */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8F6A1E] uppercase">
                  Why Choose Us
                </span>
              </div>

              {/* Heading */}
              <h2
                id="services-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] tracking-tight leading-tight"
              >
                Travel With Comfort and Confidence
              </h2>

              {/* Subtext */}
              <p className="text-slate-600 text-base sm:text-lg max-w-[600px] mx-auto mt-4 leading-relaxed font-normal">
                From early morning airport drops to late-night rides, Sharma Tour And Travels is always ready to serve you.
              </p>

              {/* Classy thin gold divider line */}
              <div className="w-16 h-1 bg-[#C9A24B] mx-auto rounded-full mt-6" aria-hidden="true" />
            </div>

            {/* 4 Service Cards Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-14 sm:mt-16 items-stretch">
              
              {/* Card 1: 24 Hours Service */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Clock className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    24 Hours Service
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    Day or night, rain or shine, our cabs are available round the clock whenever you need a ride.
                  </p>
                </div>
              </div>

              {/* Card 2: Experienced Drivers */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <UserCheck className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Experienced Drivers
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    Professional, polite and well-trained drivers who know the roads and keep you safe.
                  </p>
                </div>
              </div>

              {/* Card 3: Reasonable Price */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <IndianRupee className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Reasonable Price
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    Fair and transparent fares with no hidden charges, so you always know what you pay.
                  </p>
                </div>
              </div>

              {/* Card 4: Neat & Clean Cars */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Sparkles className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Neat & Clean Cars
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    Well-maintained, sanitized and comfortable cars for a fresh and pleasant journey.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Line CTA: Centered gold button */}
            <div className="mt-14 sm:mt-16 text-center">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-base sm:text-lg shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer motion-reduce:transition-none motion-reduce:hover:translate-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A24B]"
              >
                <span>Book Your Ride Now</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

          </div>
        </section>

        {/* ====================================================================
            SECTION: OUR FLEET
            Vehicle cards with photos, features and direct call to book
            ==================================================================== */}
        <section
          id="fleet"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#1F2937]"
          aria-labelledby="fleet-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto">
              {/* Small gold label */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8F6A1E] uppercase">
                  Our Fleet
                </span>
              </div>

              {/* Heading */}
              <h2
                id="fleet-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] tracking-tight leading-tight"
              >
                Choose Your Perfect Ride
              </h2>

              {/* Subtext */}
              <p className="text-slate-600 text-base sm:text-lg max-w-[600px] mx-auto mt-4 leading-relaxed font-normal">
                From city taxis to family cars and group buses, we have the right vehicle for every journey.
              </p>

              {/* Classy thin gold divider line */}
              <div className="w-16 h-1 bg-[#C9A24B] mx-auto rounded-full mt-6" aria-hidden="true" />
            </div>

            {/* 4 Vehicle Cards Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-14 sm:mt-16 items-stretch">
              
              {/* Card 1: Maruti Suzuki Dzire */}
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div>
                  <VehicleCardImage
                    src={fleetImages.dzire}
                    alt="Maruti Suzuki Dzire taxi available at Sharma Tour And Travels"
                    vehicleName="Maruti Suzuki Dzire"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2 group-hover:text-[#8F6A1E] transition-colors">
                      Maruti Suzuki Dzire
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                      Comfortable and fuel-efficient sedan, perfect for airport drops, city rides and small families.
                    </p>
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        4 Seater
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        AC
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A24B]"
                  >
                    <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Call to Book</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Maruti Suzuki Ertiga */}
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div>
                  <VehicleCardImage
                    src={fleetImages.ertiga}
                    alt="Maruti Suzuki Ertiga 7-seater cab available at Sharma Tour And Travels"
                    vehicleName="Maruti Suzuki Ertiga"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2 group-hover:text-[#8F6A1E] transition-colors">
                      Maruti Suzuki Ertiga
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                      Spacious 7-seater for family trips, outstation journeys and pilgrimages.
                    </p>
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        6-7 Seater
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        AC
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A24B]"
                  >
                    <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Call to Book</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Tempo Traveller (Force Urbania) */}
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div>
                  <VehicleCardImage
                    src={fleetImages.urbania}
                    alt="Tempo Traveller Force Urbania group van available at Sharma Tour And Travels"
                    vehicleName="Tempo Traveller (Force Urbania)"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2 group-hover:text-[#8F6A1E] transition-colors">
                      Tempo Traveller (Force Urbania)
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                      Premium group travel van for family tours, weddings and religious yatras with plenty of legroom and comfort.
                    </p>
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        12-17 Seater
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        AC
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        Push-back Seats
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A24B]"
                  >
                    <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Call to Book</span>
                  </a>
                </div>
              </div>

              {/* Card 4: Buses */}
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div>
                  <VehicleCardImage
                    src={fleetImages.bus}
                    alt="Buses available at Sharma Tour And Travels"
                    vehicleName="Buses"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2 group-hover:text-[#8F6A1E] transition-colors">
                      Buses
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                      Large coaches for big groups, baraat, school trips and long-distance tours.
                    </p>
                    {/* Chips */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        30-50 Seater
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80">
                        AC
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C9A24B]"
                  >
                    <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Call to Book</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Note */}
            <div className="mt-14 sm:mt-16 text-center">
              <p className="text-base sm:text-lg text-slate-600 font-normal">
                Not sure which vehicle to choose? Call us and we will suggest the best option for your trip.{' '}
                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="font-bold text-[#8F6A1E] hover:text-[#0F1B2D] underline ml-1 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </p>
            </div>

          </div>
        </section>

        {/* ====================================================================
            ANIMATED COUNTERS STRIP
            Placed between Fleet and Travel Services.
            Navy strip with 4 counters counting up from 0 when scrolled into view.
            Grid: 4 in a row on laptop/desktop, 2x2 grid on mobile/tablet.
            NOTE: The metrics below (10+, 5000+, 100+, 24/7) are sample placeholder
            numbers representing Sharma Tour And Travels' service track record.
            ==================================================================== */}
        <section
          className="relative bg-gradient-to-b from-[#0F1B2D] via-[#122137] to-[#0A1320] border-y border-[#C9A24B]/20 py-12 sm:py-16 text-white overflow-hidden"
          aria-label="Service Statistics"
        >
          {/* Subtle ambient gold accent */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 162, 75, 0.2), transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <CounterItem target={10} suffix="+" label="Years of Experience" />
              <CounterItem target={5000} suffix="+" label="Happy Customers" />
              <CounterItem target={100} suffix="+" label="Cities Covered" />
              <CounterItem isStaticText="24/7" label="Round-the-Clock Service" />
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION: OUR TRAVEL SERVICES
            Comprehensive pan-India travel, yatras, weddings & group trips
            ==================================================================== */}
        <section
          id="travel-services"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-[#F8F7F4] text-[#1F2937]"
          aria-labelledby="travel-services-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto">
              {/* Small gold label */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8F6A1E] uppercase">
                  Cabs Across India
                </span>
              </div>

              {/* Heading */}
              <h2
                id="travel-services-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] tracking-tight leading-tight"
              >
                Taxi Service for Every Occasion, All Over India
              </h2>

              {/* Subtext */}
              <p className="text-slate-600 text-base sm:text-lg max-w-[650px] mx-auto mt-4 leading-relaxed font-normal">
                Whether it is a wedding, a pilgrimage or a long family trip, Sharma Tour And Travels takes you anywhere in India, safely and on time.
              </p>

              {/* Classy thin gold divider line */}
              <div className="w-16 h-1 bg-[#C9A24B] mx-auto rounded-full mt-6" aria-hidden="true" />
            </div>

            {/* Pilgrimage Slogan Banner */}
            <div className="mt-8 sm:mt-10 mb-2 sm:mb-4 text-center">
              <div className="inline-flex items-center gap-2.5 sm:gap-3.5 px-5 sm:px-8 py-3 rounded-full bg-white border border-[#C9A24B]/40 shadow-xs">
                <span className="text-[#C9A24B] text-sm sm:text-base select-none" aria-hidden="true">✦</span>
                <p className="font-serif italic text-base sm:text-lg md:text-xl font-bold text-[#0F1B2D] tracking-wide">
                  &ldquo;Yatra Shubh Ho, Safar Surakshit Ho.&rdquo;
                </p>
                <span className="text-[#C9A24B] text-sm sm:text-base select-none" aria-hidden="true">✦</span>
              </div>
            </div>

            {/* 6 Service Cards Grid: 3 per row on lg+, 2 per row on md, 1 per row on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-14 items-stretch">
              
              {/* Card 1: Outstation Cabs */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Compass className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Outstation Cabs All Over India
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-6">
                    One-way and round-trip cabs to any city or state across India with experienced drivers who know the routes.
                  </p>
                </div>
                <div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#8F6A1E] hover:text-[#0F1B2D] transition-colors min-h-[44px] py-1 self-start group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#C9A24B]" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Card 2: Wedding Cars & Doli */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Heart className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Wedding Cars and Doli Service
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-6">
                    Beautifully decorated cars for the bride and groom, plus comfortable vehicles for baraat and family guests.
                  </p>
                </div>
                <div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#8F6A1E] hover:text-[#0F1B2D] transition-colors min-h-[44px] py-1 self-start group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#C9A24B]" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Card 3: Char Dham Yatra */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Mountain className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Char Dham Yatra
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-6">
                    Complete yatra packages for Yamunotri, Gangotri, Kedarnath and Badrinath with experienced hill drivers.
                  </p>
                </div>
                <div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#8F6A1E] hover:text-[#0F1B2D] transition-colors min-h-[44px] py-1 self-start group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#C9A24B]" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Card 4: Dharmik Sthal Yatra */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Landmark className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Dharmik Sthal Yatra
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-6">
                    Cabs for Haridwar, Rishikesh, Vaishno Devi, Mathura-Vrindavan, Ayodhya, Varanasi, Amritsar and other holy places.
                  </p>
                </div>
                <div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#8F6A1E] hover:text-[#0F1B2D] transition-colors min-h-[44px] py-1 self-start group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#C9A24B]" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Card 5: Airport and Railway Transfers */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Plane className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Airport and Railway Transfers
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-6">
                    Punctual pickup and drop at airports and railway stations, any time of day or night.
                  </p>
                </div>
                <div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#8F6A1E] hover:text-[#0F1B2D] transition-colors min-h-[44px] py-1 self-start group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#C9A24B]" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Card 6: Group Tours & Family Trips */}
              <div className="group relative bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-none border border-slate-100 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A24B] via-[#EADCB6] to-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                  aria-hidden="true"
                />
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/25 flex items-center justify-center text-[#8F6A1E] mb-6 group-hover:scale-105 group-hover:bg-[#C9A24B]/20 transition-all duration-300 motion-reduce:transition-none motion-reduce:group-hover:scale-none">
                    <Users className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3 group-hover:text-[#8F6A1E] transition-colors">
                    Group Tours and Family Trips
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed font-normal mb-6">
                    Tempo Traveller and bus options for family functions, school trips, corporate outings and sightseeing tours.
                  </p>
                </div>
                <div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#8F6A1E] hover:text-[#0F1B2D] transition-colors min-h-[44px] py-1 self-start group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded"
                  >
                    <Phone className="w-4 h-4 fill-current text-[#C9A24B]" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </div>

            </div>

            {/* Popular Destinations Strip */}
            <div className="mt-16 sm:mt-20 text-center">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-6">
                Popular Destinations We Cover
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
                {[
                  "Delhi",
                  "Haridwar",
                  "Rishikesh",
                  "Kedarnath",
                  "Badrinath",
                  "Vaishno Devi",
                  "Amritsar",
                  "Jaipur",
                  "Agra",
                  "Mathura",
                  "Vrindavan",
                  "Shimla",
                  "Manali",
                  "Nainital",
                  "Varanasi",
                  "Ayodhya",
                  "and many more"
                ].map((dest, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-white border border-[#C9A24B]/35 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs hover:bg-[#C9A24B] hover:text-[#0F1B2D] hover:border-[#C9A24B] transition-all duration-200 cursor-default select-none"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Call-To-Action Banner */}
            <div className="mt-12 sm:mt-16 bg-[#0F1B2D] text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#C9A24B]/30 shadow-xl relative overflow-hidden">
              {/* Subtle ambient gold accent */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(ellipse 60% 50% at 85% 50%, rgba(201, 162, 75, 0.22), transparent 70%)'
                }}
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                <div className="max-w-xl">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Planning a Wedding or Yatra?
                  </h3>
                  <p className="text-slate-300 text-base mt-2 font-normal leading-relaxed">
                    Call us for the best package. Customized itineraries with transparent pricing and safe drivers.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto shrink-0">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hello Sharma Tour And Travels, I want to enquire about a trip.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl bg-transparent hover:bg-white/10 text-white border-2 border-white/80 hover:border-white font-semibold text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
                  >
                    <WhatsAppSvgIcon className="w-5 h-5 fill-current text-[#25D366]" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================================
            SECTION 1: HOW IT WORKS
            Clean 3-step process with connected dotted lines
            ==================================================================== */}
        <section
          id="how-it-works"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#1F2937]"
          aria-labelledby="how-it-works-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              {/* Small gold label */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8F6A1E] uppercase">
                  Simple Process
                </span>
              </div>

              {/* Heading */}
              <h2
                id="how-it-works-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] tracking-tight leading-tight"
              >
                Book Your Ride in 3 Easy Steps
              </h2>

              {/* Classy thin gold divider line */}
              <div className="w-16 h-1 bg-[#C9A24B] mx-auto rounded-full mt-6" aria-hidden="true" />
            </div>

            {/* Steps for Desktop (lg+): Horizontal Grid with connecting dotted line */}
            <div className="hidden lg:grid grid-cols-3 gap-8 relative items-start">
              {/* Connecting horizontal dotted gold line */}
              <div
                className="absolute top-8 left-[18%] right-[18%] h-0.5 border-t-2 border-dotted border-[#C9A24B]/70 z-0"
                aria-hidden="true"
              />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#B38E3A] text-[#0F1B2D] font-bold text-2xl font-serif flex items-center justify-center shadow-md shadow-[#C9A24B]/20 ring-8 ring-white mb-6">
                  1
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3">
                  Fill the Form
                </h3>
                <p className="text-slate-600 text-base leading-relaxed max-w-xs font-normal">
                  Enter your name and phone number in the booking form. It takes less than a minute.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#B38E3A] text-[#0F1B2D] font-bold text-2xl font-serif flex items-center justify-center shadow-md shadow-[#C9A24B]/20 ring-8 ring-white mb-6">
                  2
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3">
                  We Call You
                </h3>
                <p className="text-slate-600 text-base leading-relaxed max-w-xs font-normal">
                  Our team calls you quickly to confirm your pickup location, time and fare.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#B38E3A] text-[#0F1B2D] font-bold text-2xl font-serif flex items-center justify-center shadow-md shadow-[#C9A24B]/20 ring-8 ring-white mb-6">
                  3
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-3">
                  Enjoy Your Ride
                </h3>
                <p className="text-slate-600 text-base leading-relaxed max-w-xs font-normal">
                  Your driver arrives on time in a clean, comfortable car and takes you safely to your destination.
                </p>
              </div>
            </div>

            {/* Steps for Mobile & Tablet: Stacked with connecting vertical dotted line */}
            <div className="lg:hidden relative max-w-xl mx-auto space-y-10 sm:space-y-12">
              {/* Connecting vertical dotted gold line */}
              <div
                className="absolute top-8 bottom-8 left-8 w-0.5 border-l-2 border-dotted border-[#C9A24B]/70 -translate-x-1/2 z-0"
                aria-hidden="true"
              />

              {/* Step 1 */}
              <div className="relative z-10 flex items-start gap-5 sm:gap-6">
                <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#B38E3A] text-[#0F1B2D] font-bold text-2xl font-serif flex items-center justify-center shadow-md shadow-[#C9A24B]/20 ring-6 ring-white">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2">
                    Fill the Form
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-normal">
                    Enter your name and phone number in the booking form. It takes less than a minute.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex items-start gap-5 sm:gap-6">
                <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#B38E3A] text-[#0F1B2D] font-bold text-2xl font-serif flex items-center justify-center shadow-md shadow-[#C9A24B]/20 ring-6 ring-white">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2">
                    We Call You
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-normal">
                    Our team calls you quickly to confirm your pickup location, time and fare.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex items-start gap-5 sm:gap-6">
                <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#C9A24B] to-[#B38E3A] text-[#0F1B2D] font-bold text-2xl font-serif flex items-center justify-center shadow-md shadow-[#C9A24B]/20 ring-6 ring-white">
                  3
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1B2D] mb-2">
                    Enjoy Your Ride
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed font-normal">
                    Your driver arrives on time in a clean, comfortable car and takes you safely to your destination.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================================
            SECTION 2: CUSTOMER REVIEWS
            Soft off-white background (#F8F7F4) with 3 testimonial cards
            ==================================================================== */}
        <section
          id="reviews"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-[#F8F7F4] text-[#1F2937]"
          aria-labelledby="reviews-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              {/* Small gold label */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8F6A1E] uppercase">
                  Testimonials
                </span>
              </div>

              {/* Heading */}
              <h2
                id="reviews-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] tracking-tight leading-tight"
              >
                What Our Customers Say
              </h2>

              {/* Classy thin gold divider line */}
              <div className="w-16 h-1 bg-[#C9A24B] mx-auto rounded-full mt-6" aria-hidden="true" />
            </div>

            {/* 3 Review Cards Grid */}
            {/* NOTE: These are placeholder reviews to be replaced with real customer feedback upon live deployment. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              
              {/* Review Card 1 */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                <Quote
                  className="absolute top-6 right-6 w-12 h-12 text-[#C9A24B]/15 stroke-[1.5] rotate-180 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-slate-700 italic text-base leading-relaxed mb-6 font-normal relative z-10">
                    &ldquo;Called at 2 AM for a railway station pickup and the driver arrived within 15 minutes. Very polite and professional.&rdquo;
                  </p>
                </div>

                <div>
                  <div className="border-t border-slate-100 mb-4" />
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F1B2D]">
                      Rahul Verma
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      Airport and Station Transfer
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Card 2 */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                <Quote
                  className="absolute top-6 right-6 w-12 h-12 text-[#C9A24B]/15 stroke-[1.5] rotate-180 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-slate-700 italic text-base leading-relaxed mb-6 font-normal relative z-10">
                    &ldquo;Fair price, no hidden charges and the car was spotless. We have booked with them three times now.&rdquo;
                  </p>
                </div>

                <div>
                  <div className="border-t border-slate-100 mb-4" />
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F1B2D]">
                      Priya Singh
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      Family Trip
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Card 3 */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden md:col-span-2 lg:col-span-1">
                <Quote
                  className="absolute top-6 right-6 w-12 h-12 text-[#C9A24B]/15 stroke-[1.5] rotate-180 pointer-events-none"
                  aria-hidden="true"
                />

                <div>
                  {/* 5 Gold Stars */}
                  <div className="flex items-center gap-1 mb-4" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-slate-700 italic text-base leading-relaxed mb-6 font-normal relative z-10">
                    &ldquo;The driver knew every route and drove very safely. Highly recommended for outstation travel.&rdquo;
                  </p>
                </div>

                <div>
                  <div className="border-t border-slate-100 mb-4" />
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F1B2D]">
                      Amit Kumar
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      Outstation Trip
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ====================================================================
            SECTION: FREQUENTLY ASKED QUESTIONS (FAQ)
            Accordion style on white background, accessible with aria-expanded
            ==================================================================== */}
        <section
          id="faq"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-white text-[#1F2937]"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              {/* Small gold label */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-4">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#8F6A1E] uppercase">
                  Questions
                </span>
              </div>

              {/* Heading */}
              <h2
                id="faq-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1B2D] tracking-tight leading-tight"
              >
                Frequently Asked Questions
              </h2>

              {/* Classy thin gold divider line */}
              <div className="w-16 h-1 bg-[#C9A24B] mx-auto rounded-full mt-6" aria-hidden="true" />
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                const panelId = `faq-answer-${index}`;
                const buttonId = `faq-question-${index}`;

                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-[#C9A24B] bg-[#F8F7F4]/80 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left px-5 sm:px-7 py-4 sm:py-5 min-h-[52px] flex items-center justify-between gap-4 font-serif text-base sm:text-lg lg:text-xl font-bold text-[#0F1B2D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] cursor-pointer"
                      >
                        <span className="leading-snug">{item.question}</span>
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen ? 'bg-[#C9A24B] text-[#0F1B2D] rotate-180' : 'bg-slate-100 text-slate-600'
                          }`}
                          aria-hidden="true"
                        >
                          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="px-5 sm:px-7 pb-5 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200"
                      >
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Still have questions note */}
            <div className="mt-10 sm:mt-12 text-center text-sm sm:text-base text-slate-600">
              Have another question? Call us anytime at{' '}
              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                className="font-bold text-[#8F6A1E] hover:underline inline-flex items-center gap-1"
              >
                {BUSINESS_CONFIG.phoneDisplay}
              </a>
              . We are always ready to help!
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 1: CALL-TO-ACTION BANNER
            Deep navy background with subtle gradient & thin gold top border
            ==================================================================== */}
        <section
          id="contact"
          className="relative scroll-mt-24 py-14 sm:py-16 lg:py-20 bg-gradient-to-b from-[#0F1B2D] via-[#132238] to-[#0A1320] text-white border-t-2 border-[#C9A24B] overflow-hidden"
          aria-labelledby="cta-heading"
        >
          {/* Subtle ambient lighting accent */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201, 162, 75, 0.18), transparent 75%)'
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Small gold label */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#EADCB6] uppercase">
                Available 24/7
              </span>
            </div>

            {/* Heading */}
            <h2
              id="cta-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
            >
              Need a Ride Right Now?
            </h2>

            {/* Subtext */}
            <p className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed font-normal">
              Call us anytime, day or night. We are just a phone call away.
            </p>

            {/* Action Buttons: 48px minimum height */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8 sm:mt-10 max-w-md sm:max-w-none mx-auto">
              {/* Large Gold Call Button */}
              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[48px] rounded-xl bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] font-bold text-base sm:text-lg shadow-lg shadow-[#C9A24B]/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="w-5 h-5 fill-current" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.phoneDisplay}</span>
              </a>

              {/* White Outlined WhatsApp Button */}
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[48px] rounded-xl bg-transparent hover:bg-white/10 text-white border-2 border-white/80 hover:border-white font-semibold text-base sm:text-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
              >
                <WhatsAppSvgIcon className="w-5 h-5 fill-current text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ====================================================================
          SECTION 2: FOOTER
          Darker navy background (#0A1320) with 3 responsive columns
          ==================================================================== */}
      <footer className="bg-[#0A1320] text-slate-300 border-t border-white/5 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 3 Columns: 3 on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 text-center lg:text-left">
            
            {/* Column 1: Brand Info */}
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A24B] to-[#9E7A2C] flex items-center justify-center text-[#0F1B2D]">
                  <Car className="w-4 h-4 text-[#0F1B2D]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {BUSINESS_CONFIG.name}
                </h3>
              </div>
              <p className="text-base text-slate-400 leading-relaxed max-w-sm mx-auto lg:mx-0 font-normal">
                Safe, comfortable and affordable cab service, 24 hours a day.
              </p>
            </div>

            {/* Column 2: Quick Links (Matches all Navbar links in order) */}
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-4 tracking-wide uppercase text-xs text-[#C9A24B]">
                Quick Links
              </h4>
              <ul className="space-y-3 text-base">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-[#C9A24B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded py-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Details (Pulled from BUSINESS_CONFIG) */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-4 tracking-wide uppercase text-xs text-[#C9A24B]">
                Contact
              </h4>
              <ul className="space-y-3.5 text-base flex flex-col items-center lg:items-start">
                {/* Phone */}
                <li>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="inline-flex items-center gap-2.5 text-slate-300 hover:text-[#C9A24B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded py-1 min-h-[44px]"
                  >
                    <Phone className="w-5 h-5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                    <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                  </a>
                </li>

                {/* Email placeholder */}
                <li>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="inline-flex items-center gap-2.5 text-slate-300 hover:text-[#C9A24B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A24B] rounded py-1 min-h-[44px]"
                  >
                    <Mail className="w-5 h-5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                    <span>{BUSINESS_CONFIG.email}</span>
                  </a>
                </li>

                {/* Address placeholder */}
                <li className="inline-flex items-center gap-2.5 text-slate-400 py-1">
                  <MapPin className="w-5 h-5 text-[#C9A24B] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_CONFIG.address}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Thin gold divider line above bottom bar */}
          <div className="border-t border-[#C9A24B]/20 pt-8 mt-12 sm:mt-16 text-center">
            <p className="text-sm text-slate-500 font-normal">
              &copy; 2026 {BUSINESS_CONFIG.name}. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* ====================================================================
          FLOATING BACK TO TOP BUTTON
          Positioned at bottom-left so it never interferes with right-side contact shortcuts.
          Appears when scrolled past 350px.
          ==================================================================== */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 left-4 sm:bottom-7 sm:left-7 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] flex items-center justify-center shadow-xl shadow-[#C9A24B]/30 hover:scale-110 active:scale-95 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:scale-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1B2D] focus-visible:ring-offset-2 cursor-pointer pb-[env(safe-area-inset-bottom,0)]"
          aria-label="Back to top of page"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" aria-hidden="true" />
        </button>
      )}

      {/* ====================================================================
          SECTION 3: FLOATING CONTACT BUTTONS
          Fixed bottom-right round WhatsApp & Phone buttons
          ==================================================================== */}
      <aside
        className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50 flex flex-col gap-3 pb-[env(safe-area-inset-bottom,0)]"
        aria-label="Floating quick contact shortcuts"
      >
        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:scale-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Chat on WhatsApp with Sharma Tour And Travels"
        >
          <WhatsAppSvgIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
        </a>

        {/* Phone Floating Button */}
        <a
          href={`tel:${BUSINESS_CONFIG.phone}`}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C9A24B] hover:bg-[#B79038] text-[#0F1B2D] flex items-center justify-center shadow-xl shadow-[#C9A24B]/30 hover:scale-110 active:scale-95 transition-all duration-200 motion-reduce:transition-none motion-reduce:hover:scale-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={`Call Sharma Tour And Travels at ${BUSINESS_CONFIG.phoneDisplay}`}
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        </a>
      </aside>

    </div>
  );
}

/**
 * Clean SVG WhatsApp logo icon for CTA and floating action button.
 */
function WhatsAppSvgIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.36 7.03 9.09 7.09 8.85 7.35C8.62 7.6 7.96 8.22 7.96 9.49C7.96 10.75 8.88 11.97 9.01 12.14C9.14 12.31 10.82 14.9 13.41 16C15.57 16.92 16.01 16.74 16.47 16.7C16.94 16.65 17.98 16.08 18.2 15.45C18.42 14.83 18.42 14.3 18.35 14.18C18.29 14.07 18.12 14 17.86 13.88C17.6 13.75 16.33 13.12 16.1 13.03C15.86 12.94 15.69 12.9 15.52 13.15C15.35 13.41 14.86 14 14.71 14.17C14.56 14.34 14.41 14.36 14.15 14.24C13.89 14.11 12.78 13.75 11.47 12.58C10.45 11.67 9.76 10.55 9.56 10.21C9.36 9.87 9.54 9.69 9.67 9.56C9.79 9.44 9.93 9.25 10.07 9.09C10.21 8.93 10.25 8.81 10.34 8.63C10.43 8.46 10.38 8.31 10.32 8.19C10.25 8.06 9.76 6.85 9.53 7.03Z" />
    </svg>
  );
}

/**
 * Vehicle image with lazy loading, fixed 16:10 aspect ratio, and fallback navy card
 * showing a gold car icon, vehicle name, and "Photo coming soon" when missing or failed.
 */
function VehicleCardImage({
  src,
  alt,
  vehicleName,
}: {
  src: string;
  alt: string;
  vehicleName: string;
}) {
  const [hasError, setHasError] = useState(false);
  const showFallback = !src || !src.trim() || hasError;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 flex items-center justify-center">
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-none"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0F1B2D] to-[#15243B] text-white p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center mb-2.5">
            <Car className="w-6 h-6 stroke-[1.8] text-[#C9A24B]" aria-hidden="true" />
          </div>
          <span className="font-serif text-base font-bold text-white leading-snug">
            {vehicleName}
          </span>
          <span className="text-xs font-medium text-[#EADCB6] mt-1 tracking-wide uppercase">
            Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Animated counter item that counts up from 0 to target when scrolled into view.
 * NOTE: The metrics displayed are sample indicators of Sharma Tour And Travels'
 * extensive operational footprint and trust.
 */
function CounterItem({
  target,
  suffix = '',
  label,
  isStaticText,
}: {
  target?: number;
  suffix?: string;
  label: string;
  isStaticText?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStaticText) return;

    // Fallback if IntersectionObserver is not available or reduced-motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target || 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800; // ms
          const startTime = performance.now();
          const targetNum = target || 0;

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * targetNum);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(targetNum);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.25 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, target, isStaticText]);

  return (
    <div ref={itemRef} className="text-center p-4 sm:p-6">
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C9A24B] tracking-tight">
        {isStaticText ? isStaticText : `${count.toLocaleString('en-IN')}${suffix}`}
      </div>
      <p className="mt-2 text-sm sm:text-base font-medium text-slate-300">
        {label}
      </p>
    </div>
  );
}

