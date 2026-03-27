import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Course {
  id: string;
  name: string;
  icon: string;
  desc: string;
  topics: string[];
  image: string;
}

interface Branch {
  name: string;
  city: string;
  phone: string;
  image: string;
}

interface Faculty {
  name: string;
  subject: string;
  image: string;
  bio: string;
}

interface Testimonial {
  quote: string;
  student: string;
  achievement: string;
}

interface GalleryItem {
  label: string;
  image: string;
}

interface Stat {
  label: string;
  target: number;
  suffix: string;
  prefix: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const courses: Course[] = [
  {
    id: "jee",
    name: "JEE (IIT-JEE)",
    icon: "🚀",
    desc: "IIT-JEE Main & Advanced with intensive problem-solving focus",
    image: "/assets/generated/course-jee.dim_800x500.jpg",
    topics: [
      "Physics Mechanics",
      "Waves & Optics",
      "Organic Chemistry",
      "Calculus",
      "Algebra & Coordinate Geometry",
    ],
  },
  {
    id: "cet",
    name: "MHT-CET",
    icon: "⚗️",
    desc: "Maharashtra state entrance exam prep with targeted strategy",
    image: "/assets/generated/course-mhtcet.dim_800x500.jpg",
    topics: [
      "Physics Fundamentals",
      "Chemistry Reactions",
      "Biology / Math",
      "Mock Tests",
      "Previous Year Papers",
    ],
  },
  {
    id: "fyjc",
    name: "FYJC Science",
    icon: "📚",
    desc: "Strong foundation program for 11th standard students",
    image: "/assets/generated/course-fyjc.dim_800x500.jpg",
    topics: [
      "Algebra",
      "Trigonometry",
      "Basic Physics",
      "Inorganic Chemistry",
      "Biology Introduction",
    ],
  },
  {
    id: "syjc",
    name: "SYJC Science",
    icon: "⭐",
    desc: "Advanced 12th standard preparation + board exam mastery",
    image: "/assets/generated/course-syjc.dim_800x500.jpg",
    topics: [
      "Modern Physics",
      "Organic Chemistry",
      "Differential Calculus",
      "Statistics",
      "Board Exam Strategy",
    ],
  },
];

const branches: Branch[] = [
  {
    name: "Andheri West",
    city: "Mumbai",
    phone: "+91 98765 43210",
    image: "/assets/generated/branch-andheri.dim_600x400.jpg",
  },
  {
    name: "Dadar West",
    city: "Mumbai",
    phone: "+91 87654 32109",
    image: "/assets/generated/branch-dadar.dim_600x400.jpg",
  },
  {
    name: "Thane West",
    city: "Mumbai",
    phone: "+91 98765 43210",
    image: "/assets/generated/branch-thane.dim_600x400.jpg",
  },
  {
    name: "FC Road",
    city: "Pune",
    phone: "+91 87654 32109",
    image: "/assets/generated/branch-pune.dim_600x400.jpg",
  },
  {
    name: "CBD Belapur",
    city: "Navi Mumbai",
    phone: "+91 98765 43210",
    image: "/assets/generated/branch-navimumbai.dim_600x400.jpg",
  },
  {
    name: "Dharampeth",
    city: "Nagpur",
    phone: "+91 87654 32109",
    image: "/assets/generated/branch-nagpur.dim_600x400.jpg",
  },
];

const faculty: Faculty[] = [
  {
    name: "Dr. Rajesh Sharma",
    subject: "Physics",
    image: "/assets/generated/faculty-rajesh.dim_400x400.jpg",
    bio: "IIT Bombay alumnus, 15+ years teaching experience",
  },
  {
    name: "Prof. Meera Iyer",
    subject: "Chemistry",
    image: "/assets/generated/faculty-meera.dim_400x400.jpg",
    bio: "PhD in Organic Chemistry, NIT Trichy",
  },
  {
    name: "Prof. Ankit Deshmukh",
    subject: "Mathematics",
    image: "/assets/generated/faculty-ankit.dim_400x400.jpg",
    bio: "M.Sc Mathematics, 12+ years JEE coaching",
  },
  {
    name: "Dr. Priya Patil",
    subject: "Biology",
    image: "/assets/generated/faculty-priya.dim_400x400.jpg",
    bio: "PhD Life Sciences, NEET & board specialist",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "This academy completely transformed my JEE preparation. The faculty's approach to problem-solving is exceptional. I scored 98 percentile!",
    student: "Rahul M.",
    achievement: "JEE 2024 – AIR 342",
  },
  {
    quote:
      "Best MHT-CET coaching in Mumbai, hands down. Cleared with 99.5 percentile! The study material and mock tests are top-notch.",
    student: "Priya S.",
    achievement: "MHT-CET 2024 – 99.5 Percentile",
  },
  {
    quote:
      "Faculty support is truly exceptional here. They go above and beyond. Got into my dream college for engineering!",
    student: "Amit K.",
    achievement: "FYJC Topper 2024",
  },
  {
    quote:
      "The small batch sizes made all the difference. Personal attention from teachers helped me crack IIT-JEE on my first attempt.",
    student: "Sneha R.",
    achievement: "JEE Advanced 2024 – Qualified",
  },
  {
    quote:
      "Apex Science Academy's SYJC program is incredibly well-structured. Board results and CET prep together — perfectly balanced.",
    student: "Karan T.",
    achievement: "SYJC – 95% HSC + 98 CET Percentile",
  },
];

const galleryItems: GalleryItem[] = [
  {
    label: "Modern Classroom",
    image: "/assets/generated/gallery-classroom.dim_800x600.jpg",
  },
  {
    label: "Science Lab",
    image: "/assets/generated/gallery-sciencelab.dim_800x600.jpg",
  },
  {
    label: "Teacher Teaching",
    image: "/assets/generated/gallery-teaching.dim_800x600.jpg",
  },
  {
    label: "Students Celebrating",
    image: "/assets/generated/gallery-celebrating.dim_800x600.jpg",
  },
  {
    label: "Study Materials",
    image: "/assets/generated/gallery-studymaterials.dim_800x600.jpg",
  },
  {
    label: "Annual Event",
    image: "/assets/generated/gallery-annualevent.dim_800x600.jpg",
  },
];

const stats: Stat[] = [
  { label: "Years Experience", target: 15, suffix: "+", prefix: "" },
  { label: "Students Trained", target: 10000, suffix: "+", prefix: "" },
  { label: "Success Rate", target: 95, suffix: "%", prefix: "" },
  { label: "Branches", target: 6, suffix: "", prefix: "" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useStatCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  return count;
}

// Global scroll reveal for elements with class scroll-reveal
function useGlobalScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    const els = document.querySelectorAll(".scroll-reveal");
    for (const el of Array.from(els)) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

// ─── Atom SVG ─────────────────────────────────────────────────────────────────
function AtomSVG({
  size = 80,
  opacity = 0.15,
}: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="8" fill="#FF6B35" />
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="18"
        stroke="#FF6B35"
        strokeWidth="2"
        fill="none"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="18"
        stroke="#EC489A"
        strokeWidth="2"
        fill="none"
        transform="rotate(60 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="18"
        stroke="#06B6D4"
        strokeWidth="2"
        fill="none"
        transform="rotate(120 50 50)"
      />
    </svg>
  );
}

function MapPinSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF6B35"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Courses", href: "#courses" },
    { label: "Branches", href: "#branches" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,25,47,0.97)" : "rgba(10,25,47,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,107,53,0.2)"
          : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            className="flex items-center gap-2"
            data-ocid="nav.home.link"
          >
            <AtomSVG size={36} opacity={1} />
            <span className="font-bold text-white text-lg">Apex Academy</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-[#FF6B35] transition-colors duration-200 text-sm font-medium"
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="enquiry-pulse gradient-btn px-5 py-2 rounded-full text-sm font-semibold"
              data-ocid="nav.enquiry.button"
            >
              Enquiry
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            data-ocid="nav.hamburger.toggle"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-3 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-[#FF6B35] transition-colors py-2 px-2 rounded-lg hover:bg-white/10 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-2 gradient-btn px-5 py-2 rounded-full text-sm font-semibold text-center"
              onClick={() => {
                setMenuOpen(false);
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enquiry
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useStatCounter(stat.target, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayCount =
    stat.target >= 1000 ? `${Math.round(count / 1000)}K` : count.toString();

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-5 text-center flex-1 min-w-[130px]"
    >
      <div className="text-3xl md:text-4xl font-extrabold gradient-text">
        {stat.prefix}
        {displayCount}
        {stat.suffix}
      </div>
      <div className="text-white/70 text-sm mt-1 font-medium">{stat.label}</div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{
        background:
          "linear-gradient(135deg, #0A192F 0%, #1E1A3A 60%, #0A192F 100%)",
      }}
    >
      <div className="absolute top-16 left-8 animate-float-1 pointer-events-none">
        <AtomSVG size={120} opacity={0.12} />
      </div>
      <div className="absolute top-32 right-16 animate-float-2 pointer-events-none">
        <AtomSVG size={90} opacity={0.1} />
      </div>
      <div className="absolute bottom-32 left-24 animate-float-3 pointer-events-none">
        <AtomSVG size={70} opacity={0.08} />
      </div>
      <div className="absolute bottom-16 right-8 animate-float-4 pointer-events-none">
        <AtomSVG size={100} opacity={0.12} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,107,53,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24 w-full relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fadeUp">
            <span className="inline-block bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Premier Science Coaching Since 2009
            </span>
          </div>

          <h1 className="animate-fadeUp-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Apex Science Academy
            <br />
            <span className="gradient-text">Master Your Future</span>
          </h1>

          <p className="animate-fadeUp-delay-2 text-lg md:text-xl text-[#06B6D4] font-semibold mb-8 tracking-wide">
            JEE &bull; MHT-CET &bull; FYJC &bull; SYJC &nbsp;|&nbsp; Science
            Excellence
          </p>

          <div className="animate-fadeUp-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#courses"
              className="gradient-btn px-8 py-3.5 rounded-full font-semibold text-base shadow-lg inline-block text-center"
              data-ocid="hero.explore_courses.button"
            >
              Explore Courses
            </a>
            <a
              href="#contact"
              className="border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:border-[#FF6B35] hover:text-[#FF6B35] hover:scale-105 transition-all duration-300 inline-block text-center"
              data-ocid="hero.book_demo.button"
            >
              Book Free Demo
            </a>
          </div>

          <div className="animate-fadeUp-delay-4 flex flex-wrap gap-4 justify-center">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z"
            fill="#0A192F"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── Course Modal ─────────────────────────────────────────────────────────────
function CourseModal({
  course,
  onClose,
}: { course: Course; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      data-ocid="courses.modal"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close dialog"
        tabIndex={-1}
      />
      <div
        className="rounded-3xl max-w-md w-full shadow-2xl relative z-10 overflow-hidden"
        style={{
          background: "rgba(14,25,50,0.97)",
          border: "1px solid rgba(255,107,53,0.3)",
        }}
      >
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl" aria-hidden="true">
              {course.icon}
            </span>
            <h3 className="text-2xl font-bold text-white">{course.name}</h3>
          </div>
          <p className="text-white/70 mb-6 leading-relaxed">{course.desc}</p>
          <h4 className="font-semibold text-white mb-3">Key Topics Covered:</h4>
          <ul className="space-y-2 mb-8">
            {course.topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2 text-white/80">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#FF6B35" }}
                  aria-hidden="true"
                />
                {topic}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 gradient-btn px-6 py-3 rounded-full font-semibold"
              onClick={() => {
                onClose();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enroll Now
            </button>
            <button
              type="button"
              className="flex-1 border border-white/20 text-white/70 px-6 py-3 rounded-full font-semibold hover:border-white/40 transition-colors"
              onClick={onClose}
              data-ocid="courses.modal.close_button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Courses ──────────────────────────────────────────────────────────────────
function Courses() {
  const ref = useScrollReveal();
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  return (
    <section
      id="courses"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal-section py-20"
      style={{ background: "rgba(10,25,47,0.5)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 scroll-reveal">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-2">
            Our Courses
          </h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Comprehensive programs designed to maximise your entrance exam
            performance
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-ocid="courses.list"
        >
          {courses.map((course, i) => (
            <div
              key={course.id}
              className="glass-card rounded-2xl flex flex-col overflow-hidden scroll-reveal"
              data-ocid={`courses.item.${i + 1}`}
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full object-cover"
                style={{ height: "200px" }}
              />
              <div className="p-7 flex flex-col flex-1">
                <div className="text-4xl mb-3" aria-hidden="true">
                  {course.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {course.name}
                </h3>
                <p className="text-white/60 text-sm flex-1 mb-5">
                  {course.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {course.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(255,107,53,0.15)",
                        color: "#FF6B35",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="self-start border border-[#FF6B35] text-[#FF6B35] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-200"
                  onClick={() => setActiveCourse(course)}
                  data-ocid={`courses.item.${i + 1}.button`}
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCourse && (
        <CourseModal
          course={activeCourse}
          onClose={() => setActiveCourse(null)}
        />
      )}
    </section>
  );
}

// ─── Branches ─────────────────────────────────────────────────────────────────
function Branches() {
  const ref = useScrollReveal();

  return (
    <section
      id="branches"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal-section py-20"
      style={{ background: "rgba(30,26,58,0.6)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 scroll-reveal">
          <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-widest">
            Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-2">
            Our Branches
          </h2>
          <p className="text-white/60 mt-3">
            6 conveniently located centres across Maharashtra
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="branches.list"
        >
          {branches.map((branch, i) => (
            <div
              key={branch.name}
              className="glass-card rounded-2xl overflow-hidden"
              data-ocid={`branches.item.${i + 1}`}
            >
              <img
                src={branch.image}
                alt={branch.name}
                className="w-full object-cover"
                style={{ height: "160px" }}
              />
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <MapPinSVG />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {branch.name}
                    </h3>
                    <p className="text-white/50 text-sm">{branch.city}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm font-medium mb-5 pl-9">
                  {branch.phone}
                </p>
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${branch.name} ${branch.city}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center border border-[#FF6B35] text-[#FF6B35] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-200"
                  data-ocid={`branches.item.${i + 1}.button`}
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About & Faculty ──────────────────────────────────────────────────────────
const features = [
  {
    icon: "👨‍🏫",
    label: "Expert Faculty",
    desc: "IIT/NIT alumni with 10+ years teaching experience",
  },
  {
    icon: "👥",
    label: "Small Batch Sizes",
    desc: "Maximum 25 students per batch for personal attention",
  },
  {
    icon: "🏆",
    label: "Proven Results",
    desc: "95% of students clear their target entrance exams",
  },
  {
    icon: "📖",
    label: "Comprehensive Study Material",
    desc: "Curated notes, question banks, and mock tests",
  },
];

function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal-section py-20"
      style={{ background: "rgba(10,25,47,0.5)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-2 mb-5">
              About Us
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Founded in 2009, Apex Science Academy has been Maharashtra's
              trusted name in science stream coaching. Our mission is to empower
              every student with the knowledge, confidence, and strategy needed
              to crack India's toughest entrance exams. With a track record
              spanning 15+ years and 10,000+ successful alumni, we combine
              expert faculty, proven methodologies, and personalised attention
              to deliver exceptional results.
            </p>
            <div className="space-y-4">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="glass-card flex items-start gap-4 p-4 rounded-xl"
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{f.label}</h4>
                    <p className="text-white/60 text-sm mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Faculty */}
          <div>
            <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-widest">
              Meet The Team
            </span>
            <h3 className="text-3xl font-bold gradient-text mt-2 mb-6">
              Our Faculty
            </h3>
            <div className="space-y-4">
              {faculty.map((f) => (
                <div
                  key={f.name}
                  className="glass-card rounded-2xl p-5 flex items-center gap-5"
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2"
                    style={{ borderColor: "rgba(255,107,53,0.4)" }}
                  />
                  <div>
                    <h4 className="font-bold text-white">{f.name}</h4>
                    <p className="text-[#FF6B35] text-sm font-medium">
                      {f.subject}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">{f.bio}</p>
                    <div className="flex gap-1 mt-1" aria-label="5 star rating">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className="text-[#FF6B35] text-xs"
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const ref = useScrollReveal();
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal-section py-20 overflow-hidden"
      style={{ background: "rgba(30,26,58,0.8)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">
            Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-2">
            What Students Say
          </h2>
        </div>
      </div>

      <div className="relative">
        <div
          className="flex gap-6 carousel-track"
          style={{ width: "max-content" }}
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.student}-${i}`}
              className="glass-card rounded-2xl p-7 w-80 flex-shrink-0"
            >
              <div className="flex gap-1 mb-4" aria-label="5 star rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className="text-[#FF6B35] text-lg"
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-white/70 italic text-sm leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-white">{t.student}</p>
                <p className="text-white/40 text-xs font-medium">
                  {t.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute inset-y-0 left-0 w-16 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #1E1A3A, transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #1E1A3A, transparent)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const ref = useScrollReveal();
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  return (
    <section
      id="gallery"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal-section py-20"
      style={{ background: "rgba(10,25,47,0.6)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 scroll-reveal">
          <span className="text-[#06B6D4] font-semibold text-sm uppercase tracking-widest">
            Campus Life
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-2">
            Life at Apex
          </h2>
          <p className="text-white/60 mt-3">
            A glimpse into our vibrant learning environment
          </p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          data-ocid="gallery.list"
        >
          {galleryItems.map((item, i) => (
            <button
              type="button"
              key={item.label}
              className="rounded-2xl relative overflow-hidden w-full group cursor-pointer"
              style={{ aspectRatio: "4/3" }}
              onClick={() => setLightbox(item)}
              aria-label={`View ${item.label}`}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >
                <span className="text-white font-bold text-sm drop-shadow-lg">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
          data-ocid="gallery.modal"
        >
          <button
            type="button"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={closeLightbox}
            aria-label="Close lightbox"
            tabIndex={-1}
          />
          <div className="relative max-w-3xl w-full z-10">
            <img
              src={lightbox.image}
              alt={lightbox.label}
              className="w-full rounded-3xl shadow-2xl object-cover max-h-[80vh]"
            />
            <p className="text-center text-white font-bold mt-4 text-lg">
              {lightbox.label}
            </p>
            <button
              type="button"
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center shadow-lg transition-colors"
              style={{ background: "#FF6B35", color: "white" }}
              onClick={closeLightbox}
              aria-label="Close"
              data-ocid="gallery.modal.close_button"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    branch: "",
    course: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF6B35]/50 transition-all" +
    " text-white placeholder-white/30" +
    " border border-white/10 focus:border-[#FF6B35]/50";
  const inputStyle = { background: "rgba(255,255,255,0.08)" };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal-section py-20"
      style={{ background: "rgba(30,26,58,0.6)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 scroll-reveal">
          <span className="text-[#FF6B35] font-semibold text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold gradient-text mt-2">
            Contact Us
          </h2>
          <p className="text-white/60 mt-3">
            Book a free demo class or enquire about any course
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="contact.panel"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-semibold text-white/80 mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClass}
                  style={inputStyle}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="contact.name.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-mobile"
                  className="block text-sm font-semibold text-white/80 mb-1.5"
                >
                  Mobile Number
                </label>
                <input
                  id="contact-mobile"
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className={inputClass}
                  style={inputStyle}
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, mobile: e.target.value }))
                  }
                  data-ocid="contact.mobile.input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-branch"
                  className="block text-sm font-semibold text-white/80 mb-1.5"
                >
                  Preferred Branch
                </label>
                <select
                  id="contact-branch"
                  required
                  className={inputClass}
                  style={inputStyle}
                  value={formData.branch}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, branch: e.target.value }))
                  }
                  data-ocid="contact.branch.select"
                >
                  <option value="" style={{ background: "#0d1b38" }}>
                    Select branch
                  </option>
                  {branches.map((b) => (
                    <option
                      key={b.name}
                      value={b.name}
                      style={{ background: "#0d1b38" }}
                    >
                      {b.name}, {b.city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="contact-course"
                  className="block text-sm font-semibold text-white/80 mb-1.5"
                >
                  Course
                </label>
                <select
                  id="contact-course"
                  required
                  className={inputClass}
                  style={inputStyle}
                  value={formData.course}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, course: e.target.value }))
                  }
                  data-ocid="contact.course.select"
                >
                  <option value="" style={{ background: "#0d1b38" }}>
                    Select course
                  </option>
                  {courses.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      style={{ background: "#0d1b38" }}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-semibold text-white/80 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Tell us about your goals or any questions..."
                className={inputClass}
                style={inputStyle}
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                data-ocid="contact.message.textarea"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-3.5 rounded-xl font-semibold text-base"
              data-ocid="contact.submit.button"
            >
              Send Message
            </button>

            {submitted && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-center font-medium"
                style={{
                  background: "rgba(6,182,212,0.15)",
                  border: "1px solid rgba(6,182,212,0.4)",
                  color: "#06B6D4",
                }}
                role="alert"
                data-ocid="contact.success_state"
              >
                ✓ Thank you! We&apos;ll contact you within 24 hours.
              </div>
            )}
          </form>

          {/* Details */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-white text-lg mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    📞
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Phone</p>
                    <p className="text-white/60 text-sm">
                      +91 98765 43210 &nbsp;|&nbsp; +91 87654 32109
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    ✉️
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Email</p>
                    <p className="text-white/60 text-sm">
                      info@apexscienceacademy.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    🕐
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Hours</p>
                    <p className="text-white/60 text-sm">
                      Mon–Sat, 8:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <iframe
                src="https://maps.google.com/maps?q=Mumbai,India&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mumbai Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer style={{ background: "#050d1a" }} className="text-white py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AtomSVG size={36} opacity={1} />
              <span className="font-bold text-lg">Apex Science Academy</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Empowering science students since 2009.
              <br />
              Your success is our mission.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Courses", "Branches", "About", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/50 hover:text-[#FF6B35] transition-colors text-sm"
                      data-ocid={`footer.${link.toLowerCase()}.link`}
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://instagram.com/apexscienceacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/apexscienceacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link social-icon-wa w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} Apex Science Academy. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B35] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Float ───────────────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-transform hover:scale-110"
      style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
      aria-label="Chat on WhatsApp"
      data-ocid="whatsapp.button"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useGlobalScrollReveal();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0A192F 0%, #1E1A3A 100%)",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <Branches />
        <About />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
