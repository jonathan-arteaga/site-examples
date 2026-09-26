import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  Buildings,
  Check,
  ClipboardText,
  FileText,
  GearSix,
  Headset,
  List,
  LockKey,
  MagnifyingGlass,
  MapTrifold,
  RocketLaunch,
  SealCheck,
  ShieldCheck,
  Sparkle,
  UserFocus,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const journeySteps = [
  {
    number: "1",
    title: "Launch Blueprint",
    description:
      "We define your practice model, services, payers, and state requirements so you have a clear plan to build from.",
    Icon: ClipboardText,
    tone: "navy",
  },
  {
    number: "2",
    title: "Digital Foundation",
    description:
      "We secure your domain, build a professional website, and connect the essential technology.",
    Icon: Buildings,
    tone: "clay",
  },
  {
    number: "3",
    title: "Practice Systems",
    description:
      "We design intake, documentation, billing readiness, and clinical workflows that run smoothly together.",
    Icon: GearSix,
    tone: "olive",
  },
  {
    number: "4",
    title: "Go live",
    description:
      "We test, refine, and launch your practice so your first patients experience a seamless start.",
    Icon: RocketLaunch,
    tone: "navy",
  },
  {
    number: "5",
    title: "Ongoing Support",
    description:
      "We stay with you to optimize systems, troubleshoot, and support sustainable growth.",
    Icon: Headset,
    tone: "clay",
  },
];

const trustItems = [
  {
    title: "PMHNP-specific",
    description:
      "We speak your language and understand your scope, services, and daily realities.",
    Icon: UserFocus,
    tone: "navy",
  },
  {
    title: "State-aware research",
    description:
      "We design with your state’s licensing, privacy, and payer landscape in mind.",
    Icon: MapTrifold,
    tone: "clay",
  },
  {
    title: "Specialist review where required",
    description:
      "We engage credentialing, billing, and compliance specialists when your plan calls for it.",
    Icon: SealCheck,
    tone: "olive",
  },
  {
    title: "Privacy-conscious systems",
    description:
      "We implement privacy-forward tools and practices to protect your practice and the people you serve.",
    Icon: LockKey,
    tone: "navy",
  },
  {
    title: "Implementation support",
    description:
      "We don’t just give you a plan—we help you implement, optimize, and keep moving forward.",
    Icon: ClipboardText,
    tone: "clay",
  },
];

const supportItems = [
  {
    title: "Research",
    description: "We research requirements, vendors, and best practices so you don’t have to.",
    Icon: MagnifyingGlass,
  },
  {
    title: "Drafting",
    description: "We draft documents, content, and workflows that fit your practice.",
    Icon: FileText,
  },
  {
    title: "Quality checks",
    description: "We verify accuracy, consistency, and completeness.",
    Icon: ShieldCheck,
  },
  {
    title: "Administrative support",
    description: "We handle repetitive work so you can focus on your patients.",
    Icon: UsersThree,
  },
];

const roadmapOutputs = [
  "60-minute discovery session",
  "Personalized launch roadmap",
  "Technology and vendor recommendations",
  "Timeline, milestones, and next steps",
  "Follow-up Q&A and resource guide",
];

function Brand({ inverse = false }) {
  return (
    <a className={`brand ${inverse ? "brand--inverse" : ""}`} href="#top" aria-label="Practice Studio home">
      <span className="brand__name">Practice Studio</span>
      <span className="brand__descriptor">PMHNP launch &amp; systems</span>
    </a>
  );
}

function Header({ onOpenRoadmap }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Brand inverse />
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
        <nav
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
          id="site-navigation"
          aria-label="Primary navigation"
        >
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#journey" onClick={closeMenu}>How it works</a>
          <a href="#resources" onClick={closeMenu}>Resources</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <button
            className="button button--gold site-nav__cta"
            type="button"
            onClick={() => {
              closeMenu();
              onOpenRoadmap();
            }}
          >
            Get your launch roadmap
          </button>
        </nav>
      </div>
    </header>
  );
}

function HeroRoute() {
  const labels = [
    ["Plan", "Clarify your vision, scope, and state requirements."],
    ["Foundation", "Build the legal, licensing, and core infrastructure."],
    ["Systems", "Set up technology, intake experience, and workflows."],
    ["Go live", "Test, refine, and open your doors with confidence."],
    ["Support", "Optimize systems and grow with ongoing support."],
  ];

  return (
    <div className="hero-route" aria-label="Five stages from practice idea to launch readiness">
      <span className="hero-route__edge hero-route__edge--top">From idea</span>
      <img
        className="hero-route__image"
        src={`${import.meta.env.BASE_URL}assets/hero-launch-path.png`}
        alt=""
        width="863"
        height="1822"
        fetchPriority="high"
      />
      <ol className="hero-route__labels">
        {labels.map(([title, description]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{description}</span>
          </li>
        ))}
      </ol>
      <span className="hero-route__edge hero-route__edge--bottom">To ready</span>
    </div>
  );
}

function Journey() {
  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <p className="eyebrow" id="journey-title">Your guided journey</p>
      <div className="journey__grid">
        {journeySteps.map(({ number, title, description, Icon, tone }) => (
          <article className="journey-step" key={title}>
            <div className={`journey-step__number tone--${tone}`} aria-hidden="true">{number}</div>
            <Icon className="journey-step__icon" size={38} weight="regular" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoadmapDialog({ open, onClose }) {
  const titleId = useId();
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    openerRef.current = document.activeElement;
    const dialog = dialogRef.current;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;
      const focusableElements = Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => dialog?.querySelector("input")?.focus());
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  useEffect(() => {
    if (open && submitted) dialogRef.current?.focus();
  }, [open, submitted]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="roadmap-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex="-1"
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close roadmap request">
          <X aria-hidden="true" />
        </button>
        {submitted ? (
          <div className="dialog-success" aria-live="polite">
            <SealCheck size={52} weight="duotone" aria-hidden="true" />
            <p className="eyebrow">Request received</p>
            <h2 id={titleId}>Your starting point is clear.</h2>
            <p>This prototype keeps your information in this browser only. In the production site, this step will connect to the approved client-intake system.</p>
            <button className="button button--navy" type="button" onClick={onClose}>Return to the site</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Start with clarity</p>
            <h2 id={titleId}>Get your launch roadmap</h2>
            <p className="dialog-intro">Tell us where your practice stands. We’ll use this business-level information to prepare a focused first conversation.</p>
            <form className="roadmap-form" onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}>
              <label>
                Name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Primary state
                <input name="state" autoComplete="address-level1" required />
              </label>
              <label>
                Planned launch timing
                <select name="timing" defaultValue="" required>
                  <option value="" disabled>Select one</option>
                  <option>Within 3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>Still exploring</option>
                </select>
              </label>
              <p className="form-note"><LockKey size={17} aria-hidden="true" /> Please do not include patient or medical information.</p>
              <button className="button button--gold button--full" type="submit">
                Request your roadmap call <ArrowRight aria-hidden="true" />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openRoadmap = () => setDialogOpen(true);
  const closeRoadmap = () => setDialogOpen(false);

  return (
    <>
      <a className="portfolio-back" href="/">← Back to examples</a>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top" />
      <section className="hero" aria-labelledby="hero-title">
        <Header onOpenRoadmap={openRoadmap} />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light"><Sparkle size={16} weight="fill" aria-hidden="true" /> Private-practice launch and systems studio</p>
            <h1 id="hero-title">Launch a psychiatric private practice that feels ready from day one.</h1>
            <p className="hero__lede">We help PMHNP founders design the roadmap, website, technology, intake experience, and operating systems behind a modern private practice.</p>
            <div className="hero__actions">
              <button className="button button--gold" type="button" onClick={openRoadmap}>Get your launch roadmap</button>
              <a className="button button--outline-light" href="#journey">Explore how it works</a>
            </div>
          </div>
          <HeroRoute />
        </div>
      </section>

      <main id="main-content">
        <section className="empathy section" id="about" aria-labelledby="empathy-title">
          <div className="container empathy__grid">
            <h2 id="empathy-title">You know how to care for patients. We help build the practice around that work.</h2>
            <div className="empathy__copy">
              <p>Going from employed clinician to practice owner means juggling strategy, systems, vendors, and compliance—often all at once.</p>
              <p>We bring the structure, sequence, and implementation experience to make the transition clear and manageable.</p>
            </div>
          </div>
          <div className="container"><Journey /></div>
        </section>

        <section className="blueprint section" id="services" aria-labelledby="blueprint-title">
          <div className="container blueprint__grid">
            <div className="blueprint__copy">
              <p className="eyebrow">Featured entry offer</p>
              <h2 id="blueprint-title">Practice Launch Blueprint</h2>
              <p>A personalized roadmap and action plan for your PMHNP private practice. We clarify your priorities, map dependencies, and outline the exact steps to reach patient-ready operations.</p>
              <p className="eyebrow eyebrow--list">You’ll receive</p>
              <ul className="check-list">
                {roadmapOutputs.map((output) => (
                  <li key={output}><Check weight="bold" aria-hidden="true" /> {output}</li>
                ))}
              </ul>
              <button className="text-link" type="button" onClick={openRoadmap}>See what your roadmap could cover <ArrowRight aria-hidden="true" /></button>
            </div>
            <figure className="blueprint__visual">
              <img
                src={`${import.meta.env.BASE_URL}assets/launch-roadmap-notebook.png`}
                alt="A spiral-bound launch roadmap with sections for planning, foundations, systems, launch, and support"
                width="1536"
                height="1024"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section className="trust section" aria-labelledby="trust-title">
          <div className="container">
            <p className="eyebrow eyebrow--center" id="trust-title">Built on trust and practical expertise</p>
            <div className="trust__grid">
              {trustItems.map(({ title, description, Icon, tone }) => (
                <article className="trust-item" key={title}>
                  <div className={`icon-medallion tone--${tone}`}><Icon size={34} weight="regular" aria-hidden="true" /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="support-strip section" id="resources" aria-labelledby="support-title">
          <div className="container">
            <p className="eyebrow eyebrow--center" id="support-title">Useful behind the scenes</p>
            <div className="support-strip__grid">
              {supportItems.map(({ title, description, Icon }) => (
                <article className="support-item" key={title}>
                  <Icon size={38} weight="regular" aria-hidden="true" />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta section" aria-labelledby="closing-title">
          <div className="container closing-cta__inner">
            <h2 id="closing-title">Your vision. Our systems. A practice you’re proud to run.</h2>
            <p>Take the first step with a personalized roadmap built for your goals and your state.</p>
            <button className="button button--gold" type="button" onClick={openRoadmap}>Get your launch roadmap</button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__grid">
          <Brand />
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#journey">How it works</a>
            <a href="#resources">Resources</a>
            <a href="#about">About</a>
          </nav>
          <div className="footer-meta">
            <p>Helping PMHNP founders build private practices that run smoothly from day one—and grow with you.</p>
            <p className="footer-note">Business and systems consulting. No legal, tax, billing, or clinical advice.</p>
          </div>
        </div>
      </footer>

      <RoadmapDialog open={dialogOpen} onClose={closeRoadmap} />
    </>
  );
}
