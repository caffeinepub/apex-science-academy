import {
  Box,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiInstagram, SiPinterest } from "react-icons/si";

// ---------- Types ----------
type PortfolioCategory =
  | "All"
  | "Residential"
  | "Commercial"
  | "Modular Kitchens";

interface PortfolioItem {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  image: string;
  description: string;
}

// ---------- Data ----------
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Serene Living Room",
    category: "Residential",
    image: "/assets/generated/portfolio-residential-1.dim_800x600.jpg",
    description:
      "A cozy retreat with beige linen, terracotta accents and natural textures.",
  },
  {
    id: 2,
    title: "Nature's Bedroom",
    category: "Residential",
    image: "/assets/generated/portfolio-residential-2.dim_800x600.jpg",
    description:
      "Organic cotton, wood, and soft ambient light for peaceful sleep.",
  },
  {
    id: 3,
    title: "Woodland Office",
    category: "Commercial",
    image: "/assets/generated/portfolio-commercial-1.dim_800x600.jpg",
    description: "Warm wood desks and nature views for a productive workspace.",
  },
  {
    id: 4,
    title: "The Artisan Boutique",
    category: "Commercial",
    image: "/assets/generated/portfolio-commercial-2.dim_800x600.jpg",
    description:
      "Exposed brick and pendant lights for a curated shopping experience.",
  },
  {
    id: 5,
    title: "Terracotta Kitchen",
    category: "Modular Kitchens",
    image: "/assets/generated/portfolio-kitchen-1.dim_800x600.jpg",
    description: "Wooden cabinets, terracotta backsplash and a farmhouse sink.",
  },
  {
    id: 6,
    title: "Sage & Brass Kitchen",
    category: "Modular Kitchens",
    image: "/assets/generated/portfolio-kitchen-2.dim_800x600.jpg",
    description:
      "Matte sage green, brass handles and open shelving for modern cooking.",
  },
];

const testimonials = [
  {
    quote:
      "Aura Interiors transformed our home into a peaceful sanctuary. Their use of natural materials is incredible.",
    author: "Mr. & Mrs. Sharma",
  },
  {
    quote:
      "Their commercial design created a warm, productive atmosphere for our team. Every detail was thoughtful.",
    author: "TechStartup Inc.",
  },
  {
    quote:
      "The modular kitchen is both beautiful and functional \u2013 a joy to cook in every single day!",
    author: "Priya Mehta",
  },
];

const categories: PortfolioCategory[] = [
  "All",
  "Residential",
  "Commercial",
  "Modular Kitchens",
];

const servicesList = [
  {
    key: "residential",
    icon: Home,
    title: "RESIDENTIAL DESIGN",
    desc: "Personalized homes that reflect your taste and personality.",
  },
  {
    key: "commercial",
    icon: Building2,
    title: "COMMERCIAL DESIGN",
    desc: "Inspiring workspaces and retail environments for your brand.",
  },
  {
    key: "kitchens",
    icon: LayoutGrid,
    title: "MODULAR KITCHENS",
    desc: "Stylish, functional, and durable kitchen solutions tailored to you.",
  },
  {
    key: "visualization",
    icon: Box,
    title: "3D VISUALIZATION",
    desc: "Photorealistic renderings to bring your vision to life before execution.",
  },
];

const statsList = [
  { key: "years", suffix: "+", label: "Years Experience" },
  { key: "projects", suffix: "+", label: "Projects Completed" },
  { key: "satisfaction", suffix: "%", label: "Client Satisfaction" },
];

// ---------- Hooks ----------
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    for (const el of els) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = Math.ceil(target / (1800 / 16));
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

// ---------- Leaf Particle ----------
function LeafParticle({
  style,
  className,
}: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 60"
      aria-hidden="true"
      className={`absolute opacity-40 pointer-events-none ${className ?? ""}`}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 58C20 58 2 44 2 22C2 11 10 2 20 2C30 2 38 11 38 22C38 44 20 58 20 58Z"
        fill="#E07A5F"
      />
      <line x1="20" y1="58" x2="20" y2="8" stroke="#A78A6F" strokeWidth="1.5" />
      <line x1="20" y1="30" x2="10" y2="20" stroke="#A78A6F" strokeWidth="1" />
      <line x1="20" y1="38" x2="32" y2="26" stroke="#A78A6F" strokeWidth="1" />
    </svg>
  );
}

// ---------- Navbar ----------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#hero" },
    { label: "PORTFOLIO", href: "#portfolio" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream shadow-warm" : "bg-cream/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a
          href="#hero"
          className="font-heading text-2xl md:text-3xl text-brown font-bold tracking-wide"
        >
          Aura Interiors
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-ocid="nav.link"
              className="text-xs font-sans tracking-widest text-brown/70 hover:text-terracotta transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-ocid="nav.primary_button"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl bg-taupe text-cream text-sm font-sans tracking-wide hover:bg-brown transition-colors duration-200"
        >
          BOOK A CONSULTATION
        </a>

        <button
          type="button"
          className="md:hidden text-brown"
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream border-t border-border-warm overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-widest text-brown font-sans hover:text-terracotta transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-taupe text-cream text-sm font-sans text-center"
              >
                BOOK A CONSULTATION
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- Hero Section ----------
const leafPositions = [
  {
    top: "12%",
    left: "5%",
    width: 28,
    anim: "float 7s ease-in-out infinite",
    delay: "0s",
  },
  {
    top: "20%",
    left: "auto",
    right: "8%",
    width: 22,
    anim: "floatB 5s ease-in-out infinite",
    delay: "1.5s",
  },
  {
    top: "55%",
    left: "3%",
    width: 18,
    anim: "float 9s ease-in-out infinite",
    delay: "2.5s",
  },
  {
    top: "70%",
    left: "auto",
    right: "12%",
    width: 32,
    anim: "floatB 6s ease-in-out infinite",
    delay: "0.8s",
  },
  {
    top: "35%",
    left: "88%",
    width: 24,
    anim: "float 8s ease-in-out infinite",
    delay: "3.2s",
  },
  {
    top: "80%",
    left: "20%",
    width: 16,
    anim: "floatB 7s ease-in-out infinite",
    delay: "1.1s",
  },
  {
    top: "45%",
    left: "92%",
    width: 20,
    anim: "float 6s ease-in-out infinite",
    delay: "2s",
  },
  {
    top: "10%",
    left: "75%",
    width: 26,
    anim: "floatB 10s ease-in-out infinite",
    delay: "0.4s",
  },
] as const;

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-living-room.dim_1920x1080.jpg')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(167,138,111,0.42)" }}
      />

      {leafPositions.map((l, i) => (
        <LeafParticle
          key={l.delay + String(i)}
          style={{
            top: l.top,
            left: l.left,
            right: (l as any).right,
            width: l.width,
            animation: l.anim,
            animationDelay: l.delay,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="hero-title font-sans text-sm tracking-[0.3em] uppercase text-cream/80 mb-4">
          Welcome to Aura Interiors
        </p>
        <h1 className="hero-title font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream uppercase leading-tight mb-6">
          Where Vision
          <br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>
            Meets Design
          </span>
        </h1>
        <p className="hero-sub font-sans text-lg md:text-xl text-cream/90 mb-10 max-w-xl mx-auto">
          Luxury residential &amp; commercial interiors inspired by nature
        </p>
        <div className="hero-btns flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#portfolio"
            data-ocid="hero.primary_button"
            className="px-8 py-4 rounded-xl bg-terracotta text-cream font-sans tracking-wide text-sm hover:scale-105 hover:bg-brown transition-all duration-200 shadow-warm-lg"
          >
            VIEW PORTFOLIO
          </a>
          <a
            href="#contact"
            data-ocid="hero.secondary_button"
            className="px-8 py-4 rounded-xl border-2 border-cream text-cream font-sans tracking-wide text-sm hover:bg-cream hover:text-brown transition-all duration-200"
          >
            REQUEST A CONSULTATION
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10 bg-cream/60" />
        <span className="text-cream/60 text-xs tracking-widest font-sans">
          SCROLL
        </span>
      </div>
    </section>
  );
}

// ---------- Portfolio Section ----------
function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("All");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filtered = portfolioItems.filter(
    (item) => activeFilter === "All" || item.category === activeFilter,
  );

  return (
    <section id="portfolio" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta mb-3">
            PORTFOLIO
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-brown font-bold">
            Our Crafted Spaces
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid="portfolio.tab"
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-sans tracking-wide border transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-terracotta text-cream border-terracotta"
                  : "bg-transparent text-brown border-border-warm hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              data-ocid={`portfolio.item.${idx + 1}`}
              className="group relative overflow-hidden rounded-2xl shadow-warm cursor-pointer bg-beige"
              onClick={() => setLightboxItem(item)}
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(224,122,95,0.75)" }}
              >
                <span className="font-sans text-cream text-sm tracking-widest uppercase">
                  View Project
                </span>
              </div>
              <div className="p-4">
                <span className="text-xs text-terracotta font-sans tracking-wide uppercase">
                  {item.category}
                </span>
                <h3 className="font-heading text-brown text-lg font-bold mt-0.5">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(62,44,31,0.85)" }}
            onClick={() => setLightboxItem(null)}
            data-ocid="portfolio.modal"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-cream rounded-2xl overflow-hidden max-w-2xl w-full shadow-warm-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-3 right-3 z-10 bg-terracotta text-cream rounded-full p-1.5 hover:bg-brown transition-colors"
                onClick={() => setLightboxItem(null)}
                data-ocid="portfolio.close_button"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <span className="text-xs text-terracotta font-sans tracking-widest uppercase">
                  {lightboxItem.category}
                </span>
                <h3 className="font-heading text-brown text-2xl font-bold mt-1 mb-2">
                  {lightboxItem.title}
                </h3>
                <p className="text-brown/70 font-sans">
                  {lightboxItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------- Services Section ----------
function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{ background: "#F3E8CF" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta mb-3">
            SERVICES
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-brown font-bold">
            Crafting Spaces You Love
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((s, i) => (
            <div
              key={s.key}
              data-ocid={`services.item.${i + 1}`}
              className="reveal group bg-cream rounded-2xl p-8 text-center shadow-warm border border-transparent hover:border-terracotta hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-beige group-hover:bg-terracotta/10 transition-colors duration-300">
                <s.icon size={28} className="text-terracotta" />
              </div>
              <h3 className="font-heading text-brown font-bold text-base mb-3 tracking-wide">
                {s.title}
              </h3>
              <p className="font-sans text-brown/65 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- About Section ----------
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const years = useCounter(8, active);
  const projects = useCounter(120, active);
  const satisfaction = useCounter(100, active);

  const statValues = { years, projects, satisfaction };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta mb-4">
              ABOUT US
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-brown font-bold leading-tight mb-6">
              Design That Speaks
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                to the Soul
              </span>
            </h2>
            <p className="font-sans text-brown/70 text-lg leading-relaxed mb-10">
              At Aura Interiors, we believe that great design transforms the way
              you live and work. With over 8 years of experience and 120+
              completed projects, we bring your vision to life with attention to
              detail and a passion for natural beauty.
            </p>

            <div ref={sectionRef} className="grid grid-cols-3 gap-4">
              {statsList.map((stat) => (
                <div
                  key={stat.key}
                  className="text-center p-4 rounded-xl bg-beige shadow-warm"
                >
                  <div className="font-heading text-3xl md:text-4xl font-bold text-terracotta">
                    {statValues[stat.key as keyof typeof statValues]}
                    {stat.suffix}
                  </div>
                  <div className="font-sans text-xs text-brown/60 mt-1 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal flex justify-center lg:justify-end">
            <img
              src="/assets/generated/about-designer.dim_600x700.jpg"
              alt="Aura Interiors interior designer in sunlit studio"
              className="rounded-3xl shadow-warm-xl w-full max-w-sm lg:max-w-md object-cover"
              style={{ aspectRatio: "6/7" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonials Section ----------
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () =>
      setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length),
    [],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % testimonials.length),
    [],
  );

  return (
    <section
      id="testimonials"
      className="py-24 px-6"
      style={{ background: "#F3E8CF" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta mb-3">
            TESTIMONIALS
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-brown font-bold">
            Kind Words From Our Clients
          </h2>
        </div>

        <div className="reveal relative">
          <svg
            aria-hidden="true"
            className="absolute -top-4 left-6 w-16 h-16 opacity-20"
            viewBox="0 0 64 48"
            fill="#E07A5F"
          >
            <path d="M0 48V28C0 14.745 8.51 5.915 25.53 1.53L28 8C20.67 10.17 16.33 14.17 16 20H28V48H0ZM36 48V28C36 14.745 44.51 5.915 61.53 1.53L64 8C56.67 10.17 52.33 14.17 52 20H64V48H36Z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-cream rounded-3xl p-10 md:p-14 shadow-warm-lg text-center"
              data-ocid="testimonials.card"
            >
              <p className="font-heading text-xl md:text-2xl text-brown/80 italic leading-relaxed mb-8">
                “{testimonials[current].quote}”
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-px bg-terracotta" />
                <p className="font-sans text-sm text-terracotta tracking-widest uppercase">
                  {testimonials[current].author}
                </p>
                <div className="w-10 h-px bg-terracotta" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={prev}
              data-ocid="testimonials.pagination_prev"
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-taupe text-taupe flex items-center justify-center hover:bg-taupe hover:text-cream transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.author}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === current ? "bg-terracotta w-5" : "bg-taupe/40"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              data-ocid="testimonials.pagination_next"
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-taupe text-taupe flex items-center justify-center hover:bg-taupe hover:text-cream transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Contact Section ----------
function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta mb-3">
            CONTACT
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-brown font-bold">
            Let's Create Something Beautiful
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-beige rounded-2xl p-10 text-center shadow-warm"
                data-ocid="contact.success_state"
              >
                <div className="w-16 h-16 rounded-full bg-terracotta/15 flex items-center justify-center mx-auto mb-4">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-terracotta"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl text-brown font-bold mb-2">
                  Thank You!
                </h3>
                <p className="font-sans text-brown/65">
                  We'll be in touch soon to discuss your project.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-terracotta text-cream font-sans text-sm hover:bg-brown transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-ocid="contact.modal"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-sans text-xs tracking-wide text-brown/60 uppercase mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      data-ocid="contact.input"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-beige border border-border-warm text-brown font-sans text-sm focus:outline-none focus:border-terracotta transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-sans text-xs tracking-wide text-brown/60 uppercase mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-beige border border-border-warm text-brown font-sans text-sm focus:outline-none focus:border-terracotta transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block font-sans text-xs tracking-wide text-brown/60 uppercase mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-beige border border-border-warm text-brown font-sans text-sm focus:outline-none focus:border-terracotta transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block font-sans text-xs tracking-wide text-brown/60 uppercase mb-1.5"
                    >
                      Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      data-ocid="contact.select"
                      value={formState.projectType}
                      onChange={(e) =>
                        setFormState((p) => ({
                          ...p,
                          projectType: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl bg-beige border border-border-warm text-brown font-sans text-sm focus:outline-none focus:border-terracotta transition-colors"
                    >
                      <option value="">Select type...</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Modular Kitchen</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-sans text-xs tracking-wide text-brown/60 uppercase mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    data-ocid="contact.textarea"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, message: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-beige border border-border-warm text-brown font-sans text-sm focus:outline-none focus:border-terracotta transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="w-full py-4 rounded-xl bg-terracotta text-cream font-sans tracking-widest text-sm uppercase hover:bg-brown transition-colors duration-200 hover:scale-[1.01] active:scale-100"
                >
                  Send Message
                </button>
              </form>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-brown/70 font-sans text-sm">
                <Phone size={16} className="text-terracotta shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-brown/70 font-sans text-sm">
                <Mail size={16} className="text-terracotta shrink-0" />
                <span>hello@aurainteriors.com</span>
              </div>
              <div className="flex items-center gap-3 text-brown/70 font-sans text-sm">
                <MapPin size={16} className="text-terracotta shrink-0" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com/aurainteriors"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-brown/60 hover:text-terracotta transition-colors font-sans text-sm"
              >
                <SiInstagram size={18} /> @aurainteriors
              </a>
              <a
                href="https://pinterest.com/aurainteriors"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-brown/60 hover:text-terracotta transition-colors font-sans text-sm"
              >
                <SiPinterest size={18} /> @aurainteriors
              </a>
            </div>
          </div>

          <div className="reveal rounded-2xl overflow-hidden shadow-warm-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.1249246305!2d73.72264844365124!3d18.524500651440484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1701000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aura Interiors Location - Pune, Maharashtra"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer style={{ background: "#A78A6F" }} className="text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          <div>
            <h3 className="font-heading text-3xl font-bold text-cream mb-2">
              Aura Interiors
            </h3>
            <p className="font-sans text-cream/70 text-sm mb-6">
              Transforming Spaces into Masterpieces
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/aurainteriors"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-cream/15 flex items-center justify-center hover:bg-cream/30 transition-colors"
              >
                <SiInstagram size={16} className="text-cream" />
              </a>
              <a
                href="https://pinterest.com/aurainteriors"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Pinterest"
                className="w-9 h-9 rounded-full bg-cream/15 flex items-center justify-center hover:bg-cream/30 transition-colors"
              >
                <SiPinterest size={16} className="text-cream" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.25em] uppercase text-cream/60 mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {["Home", "Portfolio", "Services", "About", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="font-sans text-sm text-cream/75 hover:text-cream transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs tracking-[0.25em] uppercase text-cream/60 mb-5">
              Newsletter
            </h4>
            <p className="font-sans text-sm text-cream/70 mb-4">
              Stay inspired with our latest projects and design tips.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-cream/15 border border-cream/25 text-cream placeholder:text-cream/50 font-sans text-sm focus:outline-none focus:border-cream/60 transition-colors"
              />
              <button
                type="submit"
                data-ocid="footer.submit_button"
                className="px-4 py-2.5 rounded-lg bg-cream text-taupe font-sans text-sm hover:bg-beige transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream/55">
            &copy; {year} Aura Interiors. All rights reserved.
          </p>
          <p className="font-sans text-xs text-cream/55">
            Built with \u2764 using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-cream/80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------- App ----------
export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
