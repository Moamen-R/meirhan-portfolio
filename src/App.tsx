import {
  type ElementType,
  type FormEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BadgeCheck,
  Bug,
  CheckCircle2,
  CircleDotDashed,
  Code2,
  Gauge,
  Heart,
  LoaderCircle,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Send,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TestTube2,
  TerminalSquare,
  Wand2,
  Workflow,
  X,
  MessageSquare,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

type IconType = ElementType;

const navItems = ["About", "Skills", "Projects", "Process", "Testimonials", "Contact"];

const qualityStats = [
  { value: "98%", label: "Regression confidence" },
  { value: "120+", label: "Critical bugs prevented" },
  { value: "35%", label: "Faster release cycles" },
];

const skillGroups = [
  {
    icon: Bug,
    title: "Bug Advocacy",
    description:
      "Clear, reproducible reports with severity, impact, evidence, and elegant communication.",
    tags: ["Jira", "Linear", "TestRail", "Notion"],
  },
  {
    icon: TerminalSquare,
    title: "Automation",
    description:
      "Stable smoke, regression, and API checks that give teams faster feedback.",
    tags: ["Playwright", "Cypress", "Postman", "CI/CD"],
  },
  {
    icon: ShieldCheck,
    title: "Quality Strategy",
    description:
      "Risk-based test planning across happy paths, edge cases, accessibility, and UX polish.",
    tags: ["Risk Matrix", "UAT", "A11y", "Exploratory"],
  },
  {
    icon: Gauge,
    title: "Performance Eye",
    description:
      "Spotting slow flows, fragile states, and friction before customers ever feel them.",
    tags: ["Lighthouse", "Web Vitals", "Network", "Console"],
  },
];

const projects = [
  {
    title: "Velvet Checkout Audit",
    category: "E-commerce QA",
    description:
      "Mapped payment, coupon, shipping, and mobile checkout risks for a luxury storefront.",
    impact: "Reduced escaped checkout defects by 42%.",
    tags: ["Regression", "Mobile", "Payments"],
  },
  {
    title: "Blush API Reliability Suite",
    category: "API Testing",
    description:
      "Created Postman collections and automated contract checks for account and profile services.",
    impact: "Caught 18 high-impact integration issues pre-release.",
    tags: ["Postman", "Newman", "CI"],
  },
  {
    title: "Sage Design System QA",
    category: "UI Quality",
    description:
      "Validated component states, keyboard behavior, visual consistency, and accessibility coverage.",
    impact: "Improved component readiness across 64 reusable UI patterns.",
    tags: ["A11y", "Storybook", "Visual QA"],
  },
];

const processSteps = [
  {
    icon: CircleDotDashed,
    title: "Discover",
    text: "Read requirements, identify unknowns, and turn ambiguity into testable acceptance criteria.",
  },
  {
    icon: Workflow,
    title: "Design",
    text: "Build lean test plans around user risk, business value, integrations, and release timing.",
  },
  {
    icon: TestTube2,
    title: "Validate",
    text: "Execute exploratory, regression, API, accessibility, and automation checks with care.",
  },
  {
    icon: BadgeCheck,
    title: "Report",
    text: "Share crisp evidence, practical recommendations, and release-ready quality signals.",
  },
];

const testimonials = [
  {
    quote: "Meirhan has an incredible eye for detail. Her bug reports are always clear, actionable, and prioritize the user experience.",
    author: "Sarah Jenkins",
    role: "Product Manager",
    company: "Velvet",
  },
  {
    quote: "Working with Meirhan transformed our release process. The automated API checks she built gave us complete confidence.",
    author: "David Chen",
    role: "Lead Engineer",
    company: "Blush",
  },
  {
    quote: "Quality isn't just an afterthought with Meirhan—she builds it into the culture. Our UI components have never been more reliable.",
    author: "Emily Torres",
    role: "Design Systems Lead",
    company: "Sage",
  }
];

const toolStack = [
  "Playwright",
  "Cypress",
  "Postman",
  "Jira",
  "TestRail",
  "GitHub Actions",
  "Chrome DevTools",
  "Figma",
  "SQL",
  "Lighthouse",
];

const marqueeTools = Array.from({ length: 4 }, () => toolStack).flat();

function FloatingShape({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <div
      className={`floating-shape absolute rounded-full border border-blush-200/20 bg-white/[0.03] backdrop-blur-2xl ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading mx-auto mb-12 max-w-3xl text-center">
      <span className="eyebrow">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance text-palette-porcelain sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-palette-powder/75 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function IconBubble({ icon: Icon }: { icon: IconType }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blush-200/20 bg-blush-200/10 text-blush-200 shadow-soft-pink">
      <Icon className="h-5 w-5" />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message || "Message could not be sent.");
      }

      form.reset();
      setStatus("success");
      setFeedback(result.message || "Thanks! Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  const isSending = status === "sending";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center backdrop-blur-xl sm:p-14">
        <div className="animate-bounce-slow text-7xl sm:text-8xl">😊</div>
        <h3 className="mt-6 font-display text-3xl font-bold text-palette-porcelain sm:text-4xl">
          Thank you for contacting!
        </h3>
        <p className="mt-3 max-w-sm text-base leading-7 text-palette-powder/70">
          Your message has been sent successfully. I'll get back to you soon!
        </p>
        <div className="mt-6 h-1 w-24 rounded-full bg-girly-gradient" />
        <Button
          variant="glass"
          size="lg"
          className="mt-8"
          onClick={() => { setStatus("idle"); setFeedback(""); }}
        >
          <Send className="h-4 w-4" />
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl sm:p-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blush-200/20 bg-blush-200/10 text-blush-200 shadow-soft-pink">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold">Send a message</h3>
          <p className="text-sm text-palette-powder/65">
            Powered securely by Resend.
          </p>
        </div>
      </div>

      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-palette-powder">
            Your name
          </span>
          <input
            required
            name="name"
            type="text"
            placeholder="Your beautiful name"
            className="h-12 w-full rounded-2xl border border-white/10 bg-palette-sage/45 px-4 text-sm text-palette-porcelain outline-none transition placeholder:text-palette-powder/35 focus:border-blush-200/45 focus:ring-2 focus:ring-blush-200/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-palette-powder">
            Email address
          </span>
          <input
            required
            name="email"
            type="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-2xl border border-white/10 bg-palette-sage/45 px-4 text-sm text-palette-porcelain outline-none transition placeholder:text-palette-powder/35 focus:border-blush-200/45 focus:ring-2 focus:ring-blush-200/20"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-palette-powder">
          Subject
        </span>
        <input
          name="subject"
          type="text"
          placeholder="QA audit, automation, release support..."
          className="h-12 w-full rounded-2xl border border-white/10 bg-palette-sage/45 px-4 text-sm text-palette-porcelain outline-none transition placeholder:text-palette-powder/35 focus:border-blush-200/45 focus:ring-2 focus:ring-blush-200/20"
        />
      </label>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-palette-powder">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell Meirhan about your product, release goals, or QA needs..."
          className="w-full resize-none rounded-2xl border border-white/10 bg-palette-sage/45 px-4 py-3 text-sm leading-7 text-palette-porcelain outline-none transition placeholder:text-palette-powder/35 focus:border-blush-200/45 focus:ring-2 focus:ring-blush-200/20"
        />
      </label>

      {feedback ? (
        <p
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status === "error"
              ? "border-red-300/25 bg-red-400/10 text-red-100"
              : ""
          }`}
        >
          {feedback}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="glam"
        size="lg"
        disabled={isSending}
        className="mt-6 w-full"
      >
        {isSending ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isSending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".hero-title span", {
        y: 95,
        opacity: 0,
        rotateX: 18,
        stagger: 0.09,
        duration: 1,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.from(".hero-copy, .hero-actions, .hero-stats", {
        y: 26,
        opacity: 0,
        stagger: 0.14,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.55,
      });

      gsap.from(".hero-panel", {
        x: 42,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.4,
      });

      gsap.to(".floating-shape", {
        y: "random(-26, 26)",
        x: "random(-18, 18)",
        rotate: "random(-10, 10)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".orb-one", {
        x: 70,
        y: 40,
        scale: 1.12,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orb-two", {
        x: -55,
        y: -35,
        scale: 0.92,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 42,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".stagger-item");

        gsap.set(items, { opacity: 1 });

        gsap.from(items, {
          y: 24,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
          },
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={appRef}
      className="min-h-screen overflow-hidden text-palette-porcelain"
    >
      <div className="noise-overlay" />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="orb-one glow-orb left-[-10rem] top-16 h-80 w-80 bg-palette-petal/20" />
        <div className="orb-two glow-orb bottom-10 right-[-9rem] h-96 w-96 bg-palette-lace/14" />
        <div className="glow-orb left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 bg-palette-wine/10" />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-palette-sage/55 backdrop-blur-2xl">
        <nav className="container mx-auto flex h-20 items-center justify-between px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-blush-200/20 blur-md transition-all duration-300 group-hover:bg-blush-200/40 group-hover:blur-lg" />
              <img
                src="/MeirhanLogo.svg"
                alt="Meirhan Logo"
                className="relative z-10 h-10 w-10 transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Meirhan Lotfy
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-palette-powder/75 transition hover:bg-white/[0.07] hover:text-palette-porcelain"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="glass"
              size="sm"
              className="hidden md:inline-flex"
            >
              <a href="#contact">
                <Mail className="h-4 w-4" />
                Hire Me
              </a>
            </Button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-palette-porcelain transition hover:bg-white/[0.08] md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="border-t border-white/10 bg-palette-sage/95 px-5 py-4 backdrop-blur-2xl md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-palette-powder/80 transition hover:bg-white/[0.06] hover:text-palette-porcelain"
                >
                  {item}
                </a>
              ))}
              <Button
                asChild
                variant="glam"
                className="mt-2 w-full justify-center"
              >
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Mail className="h-4 w-4" />
                  Hire Me
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main id="home">
        <section className="relative min-h-screen px-5 pt-32 sm:px-8 lg:pt-36">
          <FloatingShape className="left-[7%] top-32 h-28 w-28" />
          <FloatingShape
            className="right-[10%] top-44 h-16 w-16 rounded-[2rem]"
            delay={1.2}
          />
          <FloatingShape
            className="bottom-28 left-[52%] h-24 w-24 rounded-[2.2rem]"
            delay={2.1}
          />

          <div className="container relative mx-auto grid min-h-[calc(100vh-9rem)] items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="hero-kicker mb-6 inline-flex items-center gap-2 rounded-full border border-blush-200/20 bg-blush-200/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blush-100">
                <Sparkles className="h-3.5 w-3.5" />
                Meirhan Lotfy • QA Tester
              </div>

              <h1 className="hero-title overflow-hidden font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
                <span className="block">Soft visuals.</span>
                <span className="block gradient-text">Sharp testing.</span>
                <span className="block">Zero chaos.</span>
              </h1>

              <p className="hero-copy mt-7 max-w-2xl text-lg leading-8 text-palette-powder/78 sm:text-xl">
                I help teams ship polished digital products through thoughtful
                test strategy, exploratory curiosity, automation confidence, and
                bug reports that developers actually love.
              </p>

              <div className="hero-actions mt-9 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="glam" size="lg">
                  <a href="#projects">
                    View QA Work
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <a href="#process">
                    <PlayCircle className="h-4 w-4" />
                    See Process
                  </a>
                </Button>
              </div>

              <div className="hero-stats mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                {qualityStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                  >
                    <div className="font-display text-3xl font-bold text-blush-200">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm leading-5 text-palette-powder/65">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-panel relative">
              <div className="abstract-ring -right-10 -top-10 h-64 w-64" />
              <Card className="magnetic-border relative z-10 overflow-hidden rounded-[2rem] border-white/10 bg-palette-cocoa/55 shadow-glow">
                <CardHeader className="relative">
                  <div className="absolute right-6 top-6 flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-palette-petal" />
                    <span className="h-3 w-3 rounded-full bg-palette-lace" />
                    <span className="h-3 w-3 rounded-full bg-palette-sage" />
                  </div>
                  <Badge variant="soft" className="w-fit">
                    Live Quality Dashboard
                  </Badge>
                  <CardTitle className="mt-5 max-w-sm text-4xl leading-tight">
                    Release readiness with a little sparkle.
                  </CardTitle>
                  <CardDescription className="text-palette-powder/70">
                    A minimal QA command center for risk, coverage, and product
                    confidence.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  {[
                    ["Smoke Suite", "Passed", "100%"],
                    ["Critical Flows", "Covered", "96%"],
                    ["Accessibility", "Reviewed", "AA"],
                  ].map(([name, state, value]) => (
                    <div
                      key={name}
                      className="rounded-3xl border border-white/10 bg-white/[0.045] p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-medium text-palette-porcelain">
                          {name}
                        </span>
                        <Badge variant="glass">{state}</Badge>
                      </div>
                      <div className="h-2 rounded-full bg-palette-sage/80">
                        <div
                          className="h-full rounded-full bg-girly-gradient"
                          style={{ width: value === "AA" ? "88%" : value }}
                        />
                      </div>
                      <div className="mt-3 text-right font-display text-2xl font-bold text-blush-200">
                        {value}
                      </div>
                    </div>
                  ))}

                  <div className="rounded-3xl border border-blush-200/20 bg-blush-200/10 p-5">
                    <div className="flex items-start gap-4">
                      <Wand2 className="mt-1 h-5 w-5 text-blush-200" />
                      <p className="text-sm leading-7 text-palette-powder/75">
                        “Quality is not a final gate. It is a beautiful rhythm
                        built into every product conversation.”
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell">
          <div className="reveal grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <Heart className="h-3.5 w-3.5" />
                About
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-balance sm:text-5xl">
                A QA tester with a designer’s eye and an engineer’s discipline.
              </h2>
            </div>
            <div className="soft-card p-7 sm:p-9">
              <p className="text-lg leading-9 text-palette-powder/78">
                I specialize in finding the tiny cracks that become big product
                problems: broken states, unclear validation, accessibility gaps,
                flaky releases, inconsistent UI, and journeys that do not feel
                quite right. My work blends structured test planning with
                creative exploration so products feel stable, elegant, and
                ready.
              </p>
              <Separator className="my-7 bg-white/10" />
              <div className="grid gap-4 sm:grid-cols-3">
                {["Detail obsessed", "Release calm", "User focused"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-palette-porcelain"
                    >
                      <CheckCircle2 className="h-4 w-4 text-blush-200" />
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-shell">
          <SectionHeading
            eyebrow="Skills"
            title="Quality skills wrapped in a modern testing workflow."
            description="From manual exploration to automated confidence, every detail is tested with intention."
          />

          <div className="stagger-group grid gap-5 md:grid-cols-2">
            {skillGroups.map((skill) => (
              <Card
                key={skill.title}
                className="stagger-item magnetic-border rounded-[2rem] bg-palette-cocoa/45 transition duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <IconBubble icon={skill.icon} />
                  <CardTitle className="pt-4">{skill.title}</CardTitle>
                  <CardDescription className="text-palette-powder/70">
                    {skill.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <Badge key={tag} variant="glass">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.035] py-8">
          <div className="marquee-track flex w-max">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 items-center gap-3 pr-3"
                aria-hidden={group === 1}
              >
                {marqueeTools.map((tool, index) => (
                  <Badge
                    key={`${tool}-${group}-${index}`}
                    variant="outline"
                    className="mx-1 px-5 py-2 text-sm text-palette-powder"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell">
          <SectionHeading
            eyebrow="Projects"
            title="Selected QA case studies with measurable product impact."
            description="Minimal documentation, clear signals, and practical testing outcomes that support confident launches."
          />

          <div className="stagger-group grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="stagger-item group rounded-[2rem] bg-palette-cocoa/50 transition duration-300 hover:-translate-y-2 hover:shadow-glow"
              >
                <CardHeader>
                  <Badge variant="plum" className="w-fit">
                    {project.category}
                  </Badge>
                  <CardTitle className="mt-5 text-3xl transition group-hover:text-blush-200">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-palette-powder/70">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-3xl border border-blush-200/20 bg-blush-200/10 p-4 text-sm font-medium leading-7 text-palette-porcelain">
                    {project.impact}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="glass">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="process" className="section-shell">
          <SectionHeading
            eyebrow="Process"
            title="A calm testing process for fast-moving teams."
            description="Every release gets a thoughtful blend of strategy, evidence, automation, and communication."
          />

          <div className="stagger-group relative mx-auto max-w-5xl">
            <div className="absolute left-8 top-10 hidden h-[calc(100%-5rem)] w-px bg-gradient-to-b from-transparent via-blush-200/40 to-transparent md:block" />
            <div className="space-y-5">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="stagger-item grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:grid-cols-[4rem_1fr_auto] md:items-center"
                >
                  <IconBubble icon={step.icon} />
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-blush-200">
                      Step 0{index + 1}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-7 text-palette-powder/70">
                      {step.text}
                    </p>
                  </div>
                  <CheckCircle2 className="hidden h-6 w-6 text-blush-200 md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section-shell">
          <SectionHeading
            eyebrow="Testimonials"
            title="What teams say about working together."
            description="Quality is a collaborative effort. Here's how my testing approach has impacted product teams."
          />

          <div className="stagger-group grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="stagger-item flex flex-col rounded-[2rem] bg-palette-cocoa/50 transition duration-300 hover:-translate-y-2 hover:shadow-glow"
              >
                <CardHeader>
                  <div className="mb-4 text-blush-200">
                    <MessageSquare className="h-8 w-8 opacity-50" />
                  </div>
                  <CardDescription className="text-base italic leading-8 text-palette-powder/80">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold uppercase text-blush-200">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-palette-porcelain">
                        {testimonial.author}
                      </div>
                      <div className="text-xs text-palette-powder/60">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell pb-28">
          <div className="reveal relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-palette-cocoa/55 p-8 shadow-glow backdrop-blur-2xl sm:p-12 lg:p-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-palette-petal/20 blur-3xl" />
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-palette-lace/10 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="eyebrow">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </span>
                <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
                  Ready to make your next release feel effortless?
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-palette-powder/75">
                  Let’s collaborate on test plans, automation suites, QA audits,
                  or release support that brings beauty and reliability
                  together.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden border-t border-white/10 bg-[#080a09] text-palette-porcelain">
        <div className="container mx-auto grid gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:py-20">
          <div className="space-y-8">
            <a href="#home" className="group inline-flex items-center gap-3">
              <img
                src="/MeirhanLogo.svg"
                alt="Meirhan Logo"
                className="h-11 w-11 transition-transform duration-300 group-hover:rotate-6"
              />
              <span className="font-display text-2xl font-bold tracking-tight">
                Meirhan Lotfy
              </span>
            </a>

            <p className="max-w-sm text-sm leading-7 text-palette-powder/55">
              QA Tester crafting calm release systems, sharp bug reports, and
              polished product confidence.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@meirhanlotfy.dev"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-palette-powder/70 transition hover:border-blush-200/40 hover:text-blush-200"
                aria-label="Email Meirhan Lotfy"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-palette-powder/70 transition hover:border-blush-200/40 hover:text-blush-200"
                aria-label="GitHub"
              >
                <Code2 className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-palette-powder/70 transition hover:border-blush-200/40 hover:text-blush-200"
                aria-label="LinkedIn"
              >
                <Network className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold text-palette-powder/45">
              Portfolio
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              {["About", "Skills", "Projects", "Process", "Testimonials"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-palette-porcelain transition hover:text-blush-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold text-palette-powder/45">
              QA Focus
            </h3>
            <ul className="space-y-3 text-sm font-semibold text-palette-porcelain">
              <li>Manual Testing</li>
              <li>Automation</li>
              <li>API Testing</li>
              <li>Release Support</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold text-palette-powder/45">
              Connect
            </h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <a
                  href="#contact"
                  className="text-palette-porcelain transition hover:text-blush-200"
                >
                  Contact Form
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@meirhanlotfy.dev"
                  className="text-palette-porcelain transition hover:text-blush-200"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-palette-porcelain transition hover:text-blush-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-palette-porcelain transition hover:text-blush-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto flex flex-col items-center justify-between gap-4 border-t border-white/10 px-5 py-8 text-sm text-palette-powder/50 sm:flex-row sm:px-8">
          <p>© 2025 Meirhan Lotfy • QA Tester Portfolio</p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 font-semibold text-palette-powder/70 transition hover:text-blush-200"
          >
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="group bg-palette-petal px-4 pb-5 pt-6 sm:px-8 lg:pt-8">
          <p className="flex select-none justify-center gap-[0.035em] text-center font-display text-[clamp(5rem,16vw,18rem)] font-bold uppercase leading-none text-[#080a09]">
            {"MEIRHAN".split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="inline-block transition duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-[-2deg] group-hover:scale-105"
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
