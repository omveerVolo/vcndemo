import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Shared context: true when the parent Section is in view
const SectionCtx = createContext(false);

// Each item owns its intersection observer (amount:0 = first pixel, once:true).
// 350ms with strong deceleration ease — clear settle + follow-through stagger.
const EASE = [0.22, 1, 0.36, 1] as const;

function InViewItem({
  children,
  delay = 0,
  from: _from = 'left',
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import product5 from "@/assets/product-5.png";
import product6 from "@/assets/product-6.png";
import {
  Clock,
  FileWarning,
  Wallet,
  Zap,
  TrendingUp,
  LayoutGrid,
  Building2,
  CreditCard,
  ShieldCheck,
  Globe,
  Hospital,
  Network,
  Layers,
  Play,
  Quote,
  Sparkles,
  Stethoscope,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className="absolute top-6 left-6 md:top-8 md:left-10 z-20 select-none">
      <img
        src="/Final-logo.png"
        alt="Payvider"
        className={`h-9 w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
      />
    </div>
  );
}

function Section({
  children,
  className = "",
  style,
  brandLight = false,
  showBrand = false,
  background,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  brandLight?: boolean;
  showBrand?: boolean;
  background?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  return (
    <SectionCtx.Provider value={inView}>
      <section ref={ref} className={`snap-section ${className}`} style={style}>
        {background}
        {showBrand && <Brand light={brandLight} />}
        <div className="w-full max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </section>
    </SectionCtx.Provider>
  );
}

const softBg: React.CSSProperties = { background: "var(--gradient-soft)" };

function Hero() {
  return (
    <Section
      className="bg-hero"
      brandLight
      showBrand
      background={
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero-bg.png"
            alt=""
            className="w-full h-full object-cover object-bottom scale-105 grayscale translate-y-[90px]"
          />
          <div className="absolute inset-0 bg-black/68" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-primary/25 blur-3xl" />
        </div>
      }
    >
      <div className="text-white w-full max-w-4xl mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[0.65rem] uppercase tracking-[0.28em] text-white/85"
        >
          <Layers className="h-3.5 w-3.5" />
          Payvider · Virtual Card Network
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 text-center font-display font-semibold leading-[1.12] tracking-[-0.03em] text-[clamp(2rem,4vw,3.8rem)]"
        >
          <span className="text-white">Simplifying healthcare settlements </span>
          <span className="text-gradient">under one platform.</span>
        </motion.h1>
        {/* <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-8 text-center max-w-2xl text-base md:text-lg text-white/65 leading-relaxed"
        >
          A Virtual Card is issued the moment a claim clears — collapsing 30–90 day settlement cycles into seconds. One rail. Every insurer. Every healthcare provider.
        </motion.p> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10"
          style={{ filter: "drop-shadow(0 0 20px rgb(180 195 210 / 0.55)) drop-shadow(0 0 8px rgb(210 220 230 / 0.4))" }}
        >
          <img
            src="/ipad.png"
            alt="Payvider platform on iPad"
            className="w-full max-w-lg mx-auto scale-[0.68] -translate-y-[60px]"
          />
        </motion.div>
      </div>
    </Section>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5">
      {icon}
      {label}
    </span>
  );
}

// Cards: instant reveal, decelerates to rest. No snap, no acceleration phase.
function useCardAnim(i: number) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { delay: i * 0.09, duration: 0.6, ease: "easeOut" },
  };
}

function FeatureCard({
  icon,
  title,
  body,
  value,
  unit,
  index,
  compact = false,
  xDir,
}: {
  icon: React.ReactNode;
  title?: string;
  body: string;
  value?: string;
  unit?: string;
  index: number;
  compact?: boolean;
  xDir?: -1 | 1;
}) {
  const anim = useCardAnim(index);
  return (
    <motion.div
      {...anim}
      className={`group rounded-2xl border bg-card shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]  duration-700 ${
        compact ? "p-4" : "p-6"
      }`}
    >
      <div className={`rounded-xl grid place-items-center bg-primary/10 text-primary ${
        compact ? "h-8 w-8" : "h-11 w-11"
      }`}>
        {icon}
      </div>
      {value && (
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-display font-semibold text-primary">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      )}
      {title && <h3 className={`font-display font-semibold ${
        compact ? "mt-2 text-sm" : "mt-3 text-base"
      }`}>{title}</h3>}
      <p className={`text-muted-foreground leading-relaxed ${
        compact
          ? `${title || value ? "mt-1" : "mt-2"} text-xs`
          : `${title || value ? "mt-1.5" : "mt-4"} text-sm`
      }`}>
        {body}
      </p>
    </motion.div>
  );
}

function ProblemCard({
  icon,
  value,
  unit,
  body,
  image,
  index,
}: {
  icon: React.ReactNode;
  value: string;
  unit: string;
  body: string;
  index: number;
  image: string;
  xDir?: -1 | 1;
}) {
  const anim = useCardAnim(index);
  return (
    <motion.div
      {...anim}
      className="group relative overflow-hidden rounded-3xl hover:-translate-y-0.5 duration-700  "
      style={{ minHeight: '260px' }}
    >
      {/* Full-card image background */}
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-110  duration-700"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/85" />
      {/* Glass content */}
      <div className="relative h-full p-7 flex flex-col justify-between">
        <div className="h-11 w-11 rounded-xl bg-white/15 backdrop-blur-sm grid place-items-center text-white border border-white/20">
          {icon}
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-display font-bold text-white leading-none">{value}</span>
            <span className="text-base text-white/55 font-medium">{unit}</span>
          </div>
          <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Problem() {
  const items = [
    {
      icon: <Clock className="h-5 w-5" />,
      value: "30–90",
      unit: "days",
      body: "Average claim settlement window",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80&auto=format&fit=crop",
    },
    {
      icon: <FileWarning className="h-5 w-5" />,
      value: "12+",
      unit: "formats",
      body: "Reconciliation files per insurer",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop",
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      value: "3,500+",
      unit: "Cr in transit",
      body: "Crores of working capital locked across India's health insurance claims pipeline at any given time",
      image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=600&q=80&auto=format&fit=crop",
    },
  ];
  return (
    <Section style={{ background: "linear-gradient(180deg, oklch(0.07 0.02 55) 0%, oklch(0.10 0.025 50) 100%)" }}>
      <div className="flex flex-col gap-16">
        {/* Header */}
        <div className="max-w-2xl space-y-6">
          <p className="uppercase tracking-[0.3em] text-xs text-primary font-medium">The Problem</p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1] text-white">
            Healthcare providers wait.<br />
            <span className="text-gradient">Working capital bleeds in between.</span>
          </h2>
          <p className="text-base text-white/55 leading-relaxed">
            Settlement cycles drag on for weeks. Each insurer brings its own format, its own delay, its own dispute window — and providers absorb the cost.
          </p>
        </div>

        {/* Stat cards — horizontal, compact */}
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <ProblemCard key={i} index={i} xDir={i === 2 ? 1 : -1} {...it} />
          ))}
        </div>
      </div>
    </Section>
  );
}


function FlowCircle() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "58/38" }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 580 380" fill="none">
        <defs>
          <marker id="fa" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="oklch(0.74 0.18 55 / 0.55)" />
          </marker>
          <marker id="fab" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="oklch(0.74 0.18 55)" />
          </marker>
        </defs>
        <path id="p1" d="M 128 105 C 200 105 235 158 258 168" stroke="oklch(0.74 0.18 55/0.4)" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#fa)" fill="none"/>
        <path id="p2" d="M 128 240 C 200 240 235 188 258 182" stroke="oklch(0.74 0.18 55/0.4)" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#fa)" fill="none"/>
        <path id="i1" d="M 452 105 C 380 105 345 158 322 168" stroke="oklch(0.74 0.18 55/0.55)" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#fa)" fill="none"/>
        <path id="i2" d="M 452 240 C 380 240 345 188 322 182" stroke="oklch(0.74 0.18 55/0.55)" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#fa)" fill="none"/>
        <path id="vc" d="M 290 218 L 290 310" stroke="oklch(0.74 0.18 55)" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#fab)" fill="none"/>
        <path id="pg" d="M 240 334 C 80 345 66 285 66 248" stroke="oklch(0.74 0.18 55/0.45)" strokeWidth="1.5" strokeDasharray="5 6" markerEnd="url(#fa)" fill="none"/>
        <path id="rc" d="M 340 334 C 500 345 514 285 514 248" stroke="oklch(0.74 0.18 55/0.45)" strokeWidth="1.5" strokeDasharray="5 6" markerEnd="url(#fa)" fill="none"/>
        <circle r="3.5" fill="oklch(0.74 0.18 55/0.9)"><animateMotion dur="2s" repeatCount="indefinite"><mpath xlinkHref="#p1"/></animateMotion></circle>
        <circle r="3.5" fill="oklch(0.74 0.18 55/0.9)"><animateMotion dur="2.4s" repeatCount="indefinite" begin="0.8s"><mpath xlinkHref="#p2"/></animateMotion></circle>
        <circle r="3.5" fill="oklch(0.74 0.18 55/0.9)"><animateMotion dur="2.2s" repeatCount="indefinite" begin="0.4s"><mpath xlinkHref="#i1"/></animateMotion></circle>
        <circle r="3.5" fill="oklch(0.74 0.18 55/0.9)"><animateMotion dur="2.6s" repeatCount="indefinite" begin="1.1s"><mpath xlinkHref="#i2"/></animateMotion></circle>
        <circle r="5" fill="oklch(0.74 0.18 55)"><animateMotion dur="1.4s" repeatCount="indefinite"><mpath xlinkHref="#vc"/></animateMotion></circle>
        <circle r="3" fill="oklch(0.74 0.18 55/0.7)"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0.6s"><mpath xlinkHref="#pg"/></animateMotion></circle>
        <circle r="3" fill="oklch(0.74 0.18 55/0.7)"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s"><mpath xlinkHref="#rc"/></animateMotion></circle>
      </svg>

      {/* Payvider center */}
      <div className="absolute z-10 flex flex-col items-center gap-1.5" style={{ top: "46%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <div className="h-16 w-16 rounded-2xl grid place-items-center shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-brand)" }}>
          <CreditCard className="h-7 w-7 text-white" />
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.15em] text-primary font-bold text-center leading-tight">Payvider</span>
      </div>

      <FlowNode icon={<Building2 className="h-5 w-5" />} label="Provider A" sub="Healthcare provider"
        style={{ top: "27%", left: "3%", transform: "translateY(-50%)" }} />
      <FlowNode icon={<Building2 className="h-5 w-5" />} label="Provider B" sub="Healthcare provider"
        style={{ top: "63%", left: "3%", transform: "translateY(-50%)" }} />
      <FlowNode icon={<ShieldCheck className="h-5 w-5" />} label="Insurer A" sub="Insurance company"
        style={{ top: "27%", right: "3%", transform: "translateY(-50%)" }} />
      <FlowNode icon={<ShieldCheck className="h-5 w-5" />} label="Insurer B" sub="Insurance company"
        style={{ top: "63%", right: "3%", transform: "translateY(-50%)" }} />
      <FlowNode icon={<CreditCard className="h-5 w-5" />} label="Virtual Card" sub="Issued claim-wise"
        style={{ bottom: "2%", left: "50%", transform: "translateX(-50%)" }} primary />
    </div>
  );
}

function FlowNode({ icon, label, sub, style, primary = false }: {
  icon: React.ReactNode; label: string; sub: string;
  style?: React.CSSProperties; primary?: boolean;
}) {
  return (
    <div className="absolute z-10 flex flex-col items-center gap-1" style={style}>
      <div
        className={`h-12 w-12 rounded-2xl grid place-items-center ${primary ? "" : "border-2 border-border bg-card"}`}
        style={primary ? { background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" } : {}}
      >
        <span className={primary ? "text-white" : "text-primary"}>{icon}</span>
      </div>
      <span className="text-[0.65rem] font-semibold text-foreground leading-none whitespace-nowrap mt-0.5">{label}</span>
      <span className="text-[0.55rem] text-muted-foreground leading-none whitespace-nowrap">{sub}</span>
    </div>
  );
}

function SolutionCards() {
  const cards = [
    { icon: <Zap className="h-5 w-5" />, title: "Instant card on claim clearance", body: "The moment a claim is approved, Payvider issues a Virtual Card — payment committed in seconds, not weeks." },
    { icon: <LayoutGrid className="h-5 w-5" />, title: "Generate · Redeem · Issue to services", body: "One portal to generate cards, redeem against approved claims, and issue to specific medical services or departments." },
    { icon: <TrendingUp className="h-5 w-5" />, title: "Multi-insurer, one rail", body: "Payments from multiple insurers — or multiple payments from a single insurer — converge into one predictable settlement cycle." },
  ];
  return (
    <Section>
      <div className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <InViewItem delay={0}><p className="uppercase tracking-[0.3em] text-xs text-primary font-medium">The Solution</p></InViewItem>
          <InViewItem delay={0.05}>
            <h2 className="text-3xl md:text-5xl font-semibold leading-[1.05]">
              Multiple insurers. One bank. <br />
              <span className="text-gradient">one claim one virutal card — every time.</span>
            </h2>
          </InViewItem>
        </div>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
          {/* Circular flow diagram */}
          <InViewItem delay={0.1}>
            <div className="rounded-3xl border bg-card/60 p-4 md:p-6 shadow-[var(--shadow-card)] flex flex-col items-center">
              <FlowCircle />
            </div>
          </InViewItem>

          {/* Solution cards on the right — compact so they fit alongside the flow */}
          <div className="grid grid-cols-1 gap-3">
            {cards.map((c, i) => (
              <FeatureCard key={i} index={i + 2} compact xDir={1} {...c} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// Counts from 0 → target with easeOutCubic when it enters the viewport.
function CountUp({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function parseStatValue(value: string): { num: number | null; suffix: string } {
  const m = value.match(/^(\d[\d,]*)(.*)$/);
  if (m) return { num: parseInt(m[1].replace(/,/g, "")), suffix: m[2] };
  return { num: null, suffix: value };
}

function ReachCard({
  icon,
  iconColor,
  label,
  value,
  body,
  index,
  gradient,
  xDir,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  value: string;
  body: string;
  index: number;
  gradient: string;
  xDir?: -1 | 1;
}) {
  const anim = useCardAnim(index);
  const parsed = parseStatValue(value);
  return (
    <motion.div
      {...anim}
      className="rounded-2xl border border-border/60 p-8 shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]  min-h-[280px] flex flex-col"
      style={{ background: gradient }}
    >
      <div className="flex items-center gap-2.5">
        <span className={iconColor}>{icon}</span>
        <span className={`text-[0.7rem] uppercase tracking-[0.2em] font-semibold ${iconColor}`}>
          {label}
        </span>
      </div>
      <div className="mt-8 text-6xl font-display font-bold text-foreground leading-none">
        {parsed.num !== null
          ? <CountUp to={parsed.num} suffix={parsed.suffix} />
          : value}
      </div>
      <p className="mt-auto pt-8 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </motion.div>
  );
}

function Reach() {
  const stats = [
    {
      icon: <Hospital className="h-5 w-5" />,
      iconColor: "text-primary",
      label: "Healthcare providers onboarded",
      value: "800+",
      body: "From multi-specialty chains to standalone clinics — all on one settlement layer.",
      gradient: "linear-gradient(135deg, oklch(0.12 0.03 55), oklch(0.08 0.02 55))",
    },
    {
      icon: <Network className="h-5 w-5" />,
      iconColor: "text-primary",
      label: "Major insurers connected",
      value: "12",
      body: "Live integrations with structured payouts. More joining every quarter.",
      gradient: "linear-gradient(135deg, oklch(0.14 0.04 50), oklch(0.08 0.02 50))",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      iconColor: "text-primary",
      label: "International presence",
      value: "Global",
      body: "Cross-border settlement rails ready.",
      gradient: "linear-gradient(135deg, oklch(0.16 0.06 55), oklch(0.09 0.03 55))",
    },
  ];
  return (
    <Section>
      <div className="space-y-12">
        <div className="max-w-3xl space-y-4">
          <InViewItem delay={0}><p className="uppercase tracking-[0.3em] text-xs text-primary font-medium">Reach</p></InViewItem>
          <InViewItem delay={0.05}>
            <h2 className="text-4xl md:text-6xl font-semibold leading-[1.05]">
              A network that already <span className="text-gradient">moves money.</span>
            </h2>
          </InViewItem>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <ReachCard key={i} index={i} xDir={i === 2 ? 1 : -1} {...s} />
          ))}
        </div>
      </div>
    </Section>
  );
}

const productImages = [
  { src: product1, label: "Dashboard · Track payouts at a glance" },
  { src: product2, label: "Choose payout · Single or bulk" },
  { src: product3, label: "Reports · One umbrella across programs" },
  { src: product4, label: "Programs · Manage payouts end-to-end" },
  { src: product5, label: "Workflow rules · Approval logic" },
  { src: product6, label: "Bulk upload · CSV to instant payouts" },
];

function ProductCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % productImages.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="relative rounded-2xl border bg-card shadow-[var(--shadow-glow)] overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-muted/40">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-background text-xs text-muted-foreground font-mono">
          app.payvider.health
        </div>
      </div>
      <div className="relative aspect-[16/9] bg-black overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={i}
            src={productImages[i].src}
            alt={productImages[i].label}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.2em] glass text-white px-3 py-1.5 rounded-full">
            {productImages[i].label}
          </span>
          <div className="flex gap-1.5">
            {productImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full  ${
                  idx === i ? "w-6 bg-primary" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductShot() {
  const steps = [
    {
      n: "01",
      title: "Settled the moment a claim clears",
      body: "A Virtual Card is issued instantly when a claim is approved — payment committed to the healthcare provider, not just promised.",
    },
    {
      n: "02",
      title: "Every insurer, one settlement rail",
      body: "Whether a claim comes from one insurer or ten, it lands on a single predictable cycle — no chasing, no format mismatches.",
    },
    {
      n: "03",
      title: "Reconciled before you close the day",
      body: "Funds received, records updated in our console, and reconciliation pushed back to the insurer — all in one loop.",
    },
  ];
  return (
    <Section style={softBg}>
      <div className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <InViewItem delay={0}><p className="uppercase tracking-[0.3em] text-xs text-primary font-medium">The Product</p></InViewItem>
          <InViewItem delay={0.05}>
            <h2 className="text-4xl md:text-5xl font-semibold leading-[1.05]">
              One console for every
               <span className="text-gradient">{" "}claim,</span>
              <span className="text-gradient">{" "}insurer, and healthcare provider.</span>
            </h2>
          </InViewItem>
        </div>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <ProductCarousel />
          <div className="space-y-4">
            {steps.map((s, i) => (
              <InViewItem
                key={s.n}
                delay={0.1 + i * 0.11}
                from="right"
                className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] "
              >
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 grid place-items-center text-primary text-sm font-mono font-semibold shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </InViewItem>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Closing() {
  const solved = [
    {
      icon: <Clock className="h-5 w-5" />,
      before: "30–90 day settlement window",
      after: "Cleared the moment a claim is approved",
    },
    {
      icon: <FileWarning className="h-5 w-5" />,
      before: "12+ reconciliation formats per insurer",
      after: "One umbrella reconciliation across all payers",
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      before: "Crores of working capital locked in transit",
      after: "Predictable cash flow, committed not promised",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      before: "Manual disputes, scattered audit trails",
      after: "ISO-grade, fully traceable Payvider-backed payouts",
    },
  ];
  return (
    <Section style={softBg}>
      <div className="space-y-12 max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <InViewItem delay={0}><p className="uppercase tracking-[0.3em] text-xs text-primary font-medium">Problems Solved</p></InViewItem>
          <InViewItem delay={0.05}>
            <h2 className="text-4xl md:text-6xl font-semibold leading-[1.05]">
              What Payvider <span className="text-gradient">unlocks.</span>
            </h2>
          </InViewItem>
          <InViewItem delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              The same workflow — without the wait, the formats, or the locked capital.
            </p>
          </InViewItem>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {solved.map((s, i) => (
            <InViewItem
              key={i}
              delay={0.1 + i * 0.1}
              from={i % 2 === 0 ? 'left' : 'right'}
              className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] flex gap-4 items-start"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                {s.icon}
              </div>
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground line-through">
                  {s.before}
                </p>
                <p className="font-display text-base md:text-lg font-semibold text-foreground">
                  {s.after}
                </p>
              </div>
            </InViewItem>
          ))}
        </div>
        <div className="text-center pt-4">
          <p className="font-mono text-sm text-foreground/70">hello@payvider.health</p>
          <div className="pt-8 text-xs text-muted-foreground">
            © 2026 Payvider — The settlement layer for healthcare.
          </div>
        </div>
      </div>
    </Section>
  );
}


function Index() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;
    let targetIndex = 0;
    let rafId = 0;

    const getSections = () =>
      Array.from(container.querySelectorAll<HTMLElement>(".snap-section"));

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateTo = (top: number) => {
      if (isAnimating) return;
      isAnimating = true;
      const start = container.scrollTop;
      const distance = top - start;
      const duration = 900; // smooth & ~5% slower than default snap feel
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        container.scrollTop = start + distance * easeInOutCubic(t);
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          isAnimating = false;
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const snapToIndex = (i: number) => {
      const sections = getSections();
      targetIndex = Math.max(0, Math.min(sections.length - 1, i));
      const target = sections[targetIndex];
      if (target) animateTo(target.offsetTop);
    };

    const currentIndex = () => {
      const sections = getSections();
      const y = container.scrollTop + container.clientHeight / 2;
      let idx = 0;
      sections.forEach((s, i) => {
        if (s.offsetTop <= y) idx = i;
      });
      return idx;
    };

    let lockUntil = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (isAnimating || now < lockUntil) return;
      if (Math.abs(e.deltaY) < 4) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      // lock for animation duration + cooldown to absorb trackpad inertia
      lockUntil = now + 900 + 350;
      snapToIndex(currentIndex() + dir);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        if (!isAnimating) snapToIndex(currentIndex() + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        if (!isAnimating) snapToIndex(currentIndex() - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        snapToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        snapToIndex(getSections().length - 1);
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30 || isAnimating) return;
      snapToIndex(currentIndex() + (dy > 0 ? 1 : -1));
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <main ref={containerRef} className="snap-container">
      <Hero />
      <Problem />
      <SolutionCards />
      <ProductShot />
      
      <Reach />
      <Closing />
    </main>
  );
}
