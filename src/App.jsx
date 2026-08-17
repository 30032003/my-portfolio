import { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";

/* ══════════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════════ */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (!deleting && charIdx < word.length)
      t = setTimeout(() => setCharIdx((c) => c + 1), speed);
    else if (!deleting && charIdx === word.length)
      t = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0)
      t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplayed(word.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
const SKILLS = [
  { name: "Linux", icon: "🐧", color: "#facc15" },
  { name: "Networking", icon: "🌐", color: "#22d3ee" },
  { name: "AWS", icon: "☁️", color: "#f97316" },
  { name: "Docker", icon: "🐳", color: "#38bdf8" },
  { name: "Kubernetes", icon: "⎈", color: "#6366f1" },
  { name: "Git / GitHub", icon: "⌥", color: "#fb923c", mono: true },
  { name: "Python", icon: "🐍", color: "#4ade80" },
  { name: "Bash", icon: "$", color: "#4ade80", mono: true },
  { name: "Jenkins", icon: "⚙️", color: "#e11d48" },
  { name: "Terraform", icon: "🏗️", color: "#a78bfa" },
  { name: "Nginx", icon: "⚡", color: "#34d399" },
  { name: "Prometheus", icon: "🔥", color: "#f59e0b" },
  { name: "Grafana", icon: "📊", color: "#fb923c" },
  { name: "DevSecOps", icon: "🛡️", color: "#22d3ee" },
];

const PROJECTS = [
  {
    title: "SecureApp Pipeline",
    desc: "End-to-end DevSecOps pipeline for a vulnerable Flask application, integrating security testing into CI/CD with SAST, secret scanning, dependency auditing, container scanning, and monitoring.",
    tags: [
      "Python Flask",
      "Docker",
      "GitHub Actions",
      "OWASP ZAP",
      "Trivy",
      "Prometheus",
      "Grafana",
      "Terraform",
    ],
    accent: "#22d3ee",
    icon: "🛡️",
    status: "Completed",
    hasDiagram: false,
    github: "https://github.com/30032003/SecureApp-Pipeline",
  },
  {
    title: "TrustVote — Online Voting System",
    desc: "Blockchain-based online voting system designed to provide transparent and tamper-resistant voting using smart contracts and decentralized verification.",
    tags: ["Blockchain", "Smart Contracts", "Web3", "React.js"],
    accent: "#a78bfa",
    icon: "🗳️",
    status: "Completed",
    hasDiagram: false,
    github: "https://github.com/30032003/TrustVote-Online-Voting-Blockchain",
  },
];

const EDUCATION = [
  {
    degree: "Post-Graduate Diploma — IT Infrastructure, Systems & Security",
    inst: "CDAC ACTS, Pune",
    year: "Mar 2026 – Jul 2026",
    note: "Intensive IT infrastructure and security training covering Linux, networking, cloud computing, DevOps, and cybersecurity.",
    accent: "#22d3ee",
    icon: "🏛️",
  },
  {
    degree: "B.Tech. Information Technology",
    inst: "VIIT Pune (Vishwakarma Institute of Information Technology)",
    year: "Batch of 2025",
    note: "Strong foundation in programming, data structures, operating systems, DBMS, networking, and software development.",
    accent: "#4ade80",
    icon: "🎓",
  },
];

const CERTS = [
  {
    name: "AWS Academy Graduate — AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2024",
    status: "Earned",
    // AWS
    verifyUrl:
      "https://www.credly.com/badges/38925afe-4391-4c90-a5a7-10be54541cff/public_url",
    accent: "#f97316",
    bg: "from-orange-950/60 to-[#0d1526]",
    abbr: "AWS ACADEMY",
    logo: (
      <div className="w-16 h-10 rounded-md bg-[#232F3E] flex items-center justify-center">
        <span className="text-[#FF9900] font-bold text-xs mono">AWS</span>
      </div>
    ),
  },
  {
    name: "Generative AI for Everyone",
    issuer: "DeepLearning.AI",
    year: "2025",
    status: "Earned",
    verifyUrl: "https://simpli-web.app.link/e/3O1sxI1gG5b",
    accent: "#a78bfa",
    bg: "from-purple-950/50 to-[#0d1526]",
    abbr: "GEN AI",
    logo: (
      <div className="w-16 h-10 rounded-md bg-[#18122b] flex items-center justify-center">
        <span className="text-purple-300 font-bold text-xs mono">GenAI</span>
      </div>
    ),
  },
  {
    name: "Foundations of Software Testing and Validation",
    issuer: "Coursera",
    year: "2025",
    status: "Earned",
    // Coursera
    verifyUrl: "https://coursera.org/share/37c6b091d8c57a40ad3a111a8e14a1a9",
    accent: "#38bdf8",
    bg: "from-sky-950/50 to-[#0d1526]",
    abbr: "SOFTWARE TESTING",
    logo: (
      <div className="w-16 h-10 rounded-md bg-[#0c2535] flex items-center justify-center">
        <span className="text-sky-300 font-bold text-xs mono">TEST</span>
      </div>
    ),
  },
];

// TIL entries
const TIL_ENTRIES = [
  {
    id: 1,
    date: "2026-07-10",
    tag: "Linux",
    title: "Linux permissions control access to files and directories",
    body: "Learned how read, write, and execute permissions work for users, groups, and others, along with chmod, chown, and ownership management.",
    accent: "#facc15",
  },
  {
    id: 2,
    date: "2026-07-08",
    tag: "Networking",
    title: "TCP establishes a reliable connection using a three-way handshake",
    body: "Reviewed SYN, SYN-ACK, and ACK during TCP connection establishment and how TCP provides reliable and ordered communication.",
    accent: "#22d3ee",
  },
  {
    id: 3,
    date: "2026-07-06",
    tag: "Docker",
    title: "Docker containers share the host kernel",
    body: "Learned the difference between containers and virtual machines, and how Docker uses images, containers, volumes, and networks.",
    accent: "#38bdf8",
  },
  {
    id: 4,
    date: "2026-07-04",
    tag: "Git",
    title: "Git add and Git commit serve different purposes",
    body: "git add stages changes for the next commit, while git commit records the staged changes in the repository history.",
    accent: "#fb923c",
  },
  {
    id: 5,
    date: "2026-07-02",
    tag: "AWS",
    title: "Security Groups act as stateful virtual firewalls",
    body: "Learned how AWS Security Groups control inbound and outbound traffic for resources such as EC2 instances and automatically allow corresponding return traffic.",
    accent: "#f97316",
  },
  {
    id: 6,
    date: "2026-06-30",
    tag: "DevSecOps",
    title: "Security checks can be integrated into CI/CD",
    body: "Learned how tools such as Bandit, Semgrep, Gitleaks, pip-audit, and Trivy can be used to identify security issues during the software delivery process.",
    accent: "#4ade80",
  },
];

/* ══════════════════════════════════════════════════════════════════
   MERMAID DIAGRAM — pure SVG, no external dependency
══════════════════════════════════════════════════════════════════ */
function AWSArchDiagram() {
  const nodes = {
    internet: {
      x: 310,
      y: 20,
      w: 120,
      h: 36,
      label: "🌐 Internet",
      color: "#22d3ee",
      fill: "#0d2333",
    },
    alb: {
      x: 270,
      y: 100,
      w: 200,
      h: 36,
      label: "⚡ ALB (Public)",
      color: "#4ade80",
      fill: "#0d2319",
    },
    web1: {
      x: 100,
      y: 200,
      w: 140,
      h: 36,
      label: "🖥 EC2 Web (AZ-1a)",
      color: "#38bdf8",
      fill: "#0d1a2e",
    },
    web2: {
      x: 500,
      y: 200,
      w: 140,
      h: 36,
      label: "🖥 EC2 Web (AZ-1b)",
      color: "#38bdf8",
      fill: "#0d1a2e",
    },
    app1: {
      x: 100,
      y: 310,
      w: 140,
      h: 36,
      label: "⚙️ EC2 App (AZ-1a)",
      color: "#a78bfa",
      fill: "#1a0d2e",
    },
    app2: {
      x: 500,
      y: 310,
      w: 140,
      h: 36,
      label: "⚙️ EC2 App (AZ-1b)",
      color: "#a78bfa",
      fill: "#1a0d2e",
    },
    rds: {
      x: 270,
      y: 420,
      w: 200,
      h: 36,
      label: "🗄 RDS MySQL (Multi-AZ)",
      color: "#f97316",
      fill: "#2e1a0d",
    },
  };

  const edges = [
    ["internet", "alb"],
    ["alb", "web1"],
    ["alb", "web2"],
    ["web1", "app1"],
    ["web2", "app2"],
    ["app1", "rds"],
    ["app2", "rds"],
  ];

  function cx(n) {
    return n.x + n.w / 2;
  }
  function cy(n) {
    return n.y + n.h / 2;
  }

  const zones = [
    { label: "Public Subnet", x: 60, y: 80, w: 620, h: 170, color: "#22d3ee" },
    {
      label: "Private Subnet (App)",
      x: 60,
      y: 280,
      w: 620,
      h: 80,
      color: "#a78bfa",
    },
    {
      label: "Private Subnet (Data)",
      x: 230,
      y: 390,
      w: 280,
      h: 90,
      color: "#f97316",
    },
  ];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-700 bg-[#060d1a] p-4">
      <p className="mono text-xs text-cyan-500 mb-3">
        # Three-Tier AWS Architecture — VPC / ALB / EC2 / RDS
      </p>
      <svg
        viewBox="0 0 740 480"
        className="w-full max-w-2xl mx-auto"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* VPC outer box */}
        <rect
          x="10"
          y="10"
          width="720"
          height="460"
          rx="12"
          fill="none"
          stroke="#1e293b"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
        <text x="24" y="30" fill="#334155" fontSize="11" fontWeight="bold">
          VPC: 10.0.0.0/16
        </text>

        {/* zone rectangles */}
        {zones.map((z) => (
          <g key={z.label}>
            <rect
              x={z.x}
              y={z.y}
              width={z.w}
              height={z.h}
              rx="8"
              fill={z.color + "0d"}
              stroke={z.color + "33"}
              strokeWidth="1.5"
              strokeDasharray="5 3"
            />
            <text x={z.x + 8} y={z.y + 14} fill={z.color + "99"} fontSize="9">
              {z.label}
            </text>
          </g>
        ))}

        {/* edges */}
        {edges.map(([a, b], i) => {
          const na = nodes[a],
            nb = nodes[b];
          return (
            <line
              key={i}
              x1={cx(na)}
              y1={cy(na)}
              x2={cx(nb)}
              y2={cy(nb)}
              stroke="#22d3ee44"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arr)"
            />
          );
        })}

        {/* arrow marker */}
        <defs>
          <marker
            id="arr"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#22d3ee66" />
          </marker>
        </defs>

        {/* node boxes */}
        {Object.values(nodes).map((n) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="7"
              fill={n.fill}
              stroke={n.color + "88"}
              strokeWidth="1.5"
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 4}
              textAnchor="middle"
              fill={n.color}
              fontSize="10"
              fontWeight="600"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* S3 storage icon off to side */}
        <rect
          x="620"
          y="410"
          width="100"
          height="36"
          rx="7"
          fill="#0d2319"
          stroke="#4ade8088"
          strokeWidth="1.5"
        />
        <text
          x="670"
          y="432"
          textAnchor="middle"
          fill="#4ade80"
          fontSize="10"
          fontWeight="600"
        >
          📦 S3 (Logs)
        </text>
        <line
          x1="620"
          y1="428"
          x2="530"
          y2="438"
          stroke="#4ade8044"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GITHUB CONTRIBUTION GRAPH — synthetic heatmap placeholder
══════════════════════════════════════════════════════════════════ */
function GitHubGraph({ username }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-[#0d1117] p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-800 to-emerald-800 flex items-center justify-center text-lg select-none">
            H
          </div>

          <div>
            <p className="mono text-sm font-bold text-white">{username}</p>
            <p className="mono text-xs text-slate-500">
              GitHub contribution activity
            </p>
          </div>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="mono text-xs text-cyan-500 border border-cyan-800 rounded px-3 py-1.5 hover:bg-cyan-950 transition-colors"
        >
          View on GitHub ↗
        </a>
      </div>

      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          blockSize={11}
          blockMargin={3}
          fontSize={11}
          colorScheme="dark"
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FLOATING ACTION BUTTON — Download CV
══════════════════════════════════════════════════════════════════ */
function DownloadFAB() {
  const [scrolled, setScrolled] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <a
      href="/Harshal_Dahiwale_CDAC_Resume.pdf"
      download
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Download CV"
      style={{
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
        transform: scrolled ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.35s, transform 0.35s",
        boxShadow: hov
          ? "0 0 28px #22d3ee66, 0 4px 24px #00000088"
          : "0 4px 24px #00000088",
      }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 pl-4 pr-5 py-3 mono text-sm font-bold text-[#060d1a] hover:from-cyan-400 hover:to-emerald-400 transition-colors"
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.3s",
          transform: hov ? "translateY(3px)" : "translateY(0)",
        }}
      >
        ↓
      </span>
      <span className="hidden sm:inline">Download CV</span>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════
   REUSABLE UI
══════════════════════════════════════════════════════════════════ */
function Badge({ name, icon, color, mono }) {
  return (
    <span
      style={{ borderColor: color + "55", color }}
      className="inline-flex items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-default select-none"
    >
      <span className={mono ? "font-mono" : ""}>{icon}</span>
      {name}
    </span>
  );
}

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-cyan-400 text-sm select-none">~/</span>
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        {label}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-800/60 to-transparent ml-2" />
    </div>
  );
}

function RevealSection({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PROJECT CARD  (with optional diagram drawer)
══════════════════════════════════════════════════════════════════ */
function ProjectCard({ p }) {
  const [hov, setHov] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov ? p.accent + "88" : "#1e293b",
        boxShadow: hov ? `0 0 32px ${p.accent}22` : "none",
      }}
      className="relative flex flex-col gap-3 rounded-xl border bg-[#0d1526] p-6 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl">{p.icon}</span>

        <span
          style={{
            background: p.status === "Completed" ? "#15803d33" : "#b4530933",
            color: p.status === "Completed" ? "#4ade80" : "#fb923c",
          }}
          className="rounded-full px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider"
        >
          {p.status === "Completed" ? "● DONE" : "◌ WIP"}
        </span>
      </div>

      <h3
        style={{ color: p.accent }}
        className="text-lg font-bold leading-tight font-mono"
      >
        {p.title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed flex-1">{p.desc}</p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {p.tags.map((t) => (
          <span
            key={t}
            style={{ background: p.accent + "18", color: p.accent }}
            className="rounded px-2 py-0.5 text-xs font-mono font-semibold"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            style={{
              color: p.accent,
              borderColor: p.accent + "55",
            }}
            className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs mono font-semibold hover:bg-white/5 transition-colors"
          >
            GitHub ↗
          </a>
        )}

        {p.hasDiagram && (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              color: p.accent,
              borderColor: p.accent + "55",
            }}
            className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs mono font-semibold hover:bg-white/5 transition-colors"
          >
            {open ? "▲ Hide" : "▼ View"} Architecture
          </button>
        )}
      </div>

      {p.hasDiagram && open && (
        <div className="mt-2 animate-in">
          <AWSArchDiagram />
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CERTIFICATIONS SECTION
══════════════════════════════════════════════════════════════════ */
function CertCard({ cert }) {
  const [hov, setHov] = useState(false);
  const statusColor =
    cert.status === "In Progress"
      ? "#facc15"
      : cert.status === "Earned"
        ? "#4ade80"
        : "#64748b";
  const statusLabel =
    cert.status === "In Progress"
      ? "◌ In Progress"
      : cert.status === "Earned"
        ? "● Earned"
        : "○ Planned";

  return (
    <a
      href={cert.verifyUrl}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderColor: hov ? cert.accent + "88" : "#1e293b",
        boxShadow: hov ? `0 0 24px ${cert.accent}22` : "none",
      }}
      className={`flex flex-col gap-4 rounded-xl border bg-gradient-to-b ${cert.bg} p-6 transition-all duration-300 cursor-pointer group`}
    >
      {/* badge image area */}
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg border border-slate-700 bg-[#060d1a]">
          {cert.logo}
        </div>
        <span
          style={{ color: statusColor, background: statusColor + "18" }}
          className="rounded-full px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider"
        >
          {statusLabel}
        </span>
      </div>

      <div>
        <p className="mono text-xs text-slate-500 mb-1">
          {cert.issuer} · {cert.year}
        </p>
        <h3
          style={{ color: cert.accent }}
          className="font-bold text-sm leading-snug mono group-hover:underline"
        >
          {cert.name}
        </h3>
        <p className="mono text-xs text-slate-600 mt-1">{cert.abbr}</p>
      </div>

      <div
        style={{ color: cert.accent }}
        className="mono text-xs flex items-center gap-1 mt-auto"
      >
        View certification ↗
      </div>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TIL CARD
══════════════════════════════════════════════════════════════════ */
function TILCard({ entry }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{ borderColor: entry.accent + "33" }}
      className="rounded-xl border bg-[#0d1526] p-5 flex flex-col gap-2 transition-all duration-200 hover:border-opacity-70"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          style={{ background: entry.accent + "22", color: entry.accent }}
          className="mono text-xs font-bold px-2.5 py-0.5 rounded-full"
        >
          {entry.tag}
        </span>
        <span className="mono text-xs text-slate-600">{entry.date}</span>
      </div>

      <h3 className="text-sm font-semibold text-white leading-snug">
        {entry.title}
      </h3>

      <p
        className={`text-xs text-slate-400 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}
      >
        {entry.body}
      </p>

      <button
        onClick={() => setExpanded((e) => !e)}
        style={{ color: entry.accent }}
        className="mono text-xs self-start hover:underline mt-1"
      >
        {expanded ? "↑ less" : "↓ read more"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    "About",
    "Skills",
    "Projects",
    "Certs",
    "GitHub",
    "TIL",
    "Education",
    "Contact",
  ];
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#060d1a]/92 backdrop-blur border-b border-slate-800 py-3" : "py-5"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span className="font-mono text-cyan-400 font-bold text-lg tracking-tight select-none">
          harshal<span className="text-emerald-400">@</span>devops
          <span className="animate-pulse">_</span>
        </span>
        <div className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-slate-400 hover:text-cyan-400 font-mono text-xs transition-colors duration-200"
            >
              ./{l}
            </a>
          ))}
          <a
            href="/harshal-dahiwale-cv.pdf"
            download
            className="ml-2 rounded-lg border border-cyan-500 px-4 py-1.5 font-mono text-xs text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
          >
            ↓ CV
          </a>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-slate-400 hover:text-cyan-400 font-mono text-lg"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#060d1a] border-t border-slate-800 px-6 pb-4 pt-2 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-cyan-400 font-mono text-sm transition-colors duration-200"
            >
              ./{l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TERMINAL HERO PROMPT
══════════════════════════════════════════════════════════════════ */
function TerminalPrompt() {
  const lines = [
    { prompt: "$ whoami", out: "harshal_dahiwale" },
    {
      prompt: "$ cat role.txt",
      out: "Aspiring DevOps & Cloud Engineer · PG-DITISS",
    },
    { prompt: "$ focus", out: "Linux · AWS · Docker · DevSecOps" },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 900 + shown * 600);
    return () => clearTimeout(t);
  }, [shown]);
  return (
    <div className="rounded-xl border border-slate-700 bg-[#060d1a] p-5 font-mono text-sm w-full max-w-lg shadow-2xl shadow-cyan-950/60">
      <div className="flex gap-1.5 mb-4">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <span className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-slate-500 text-xs">harshal@devops:~</span>
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <div key={i} className="mb-2">
          <div className="text-cyan-400">{l.prompt}</div>
          <div className="text-emerald-400 pl-2">{l.out}</div>
        </div>
      ))}
      {shown < lines.length && (
        <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const taglines = [
    "Aspiring DevOps & Cloud Engineer",
    "DevSecOps Practitioner",
    "Linux & AWS Learner",
    "Automation Builder",
  ];
  const typed = useTypewriter(taglines);
  const [tilFilter, setTilFilter] = useState("All");
  const tilTags = [
    "All",
    ...Array.from(new Set(TIL_ENTRIES.map((t) => t.tag))),
  ];
  const filteredTil =
    tilFilter === "All"
      ? TIL_ENTRIES
      : TIL_ENTRIES.filter((t) => t.tag === tilFilter);

  return (
    <div className="min-h-screen bg-[#060d1a] text-slate-200 overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&display=swap');
        :root { scroll-behavior: smooth; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .scanline::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
          pointer-events: none;
        }
        .glow-cyan   { text-shadow: 0 0 30px rgba(34,211,238,0.5); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .animate-in { animation: fadeSlide 0.4s ease both; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Nav />
      <DownloadFAB />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen grid-bg scanline flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-5xl w-full flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800 bg-cyan-950/40 px-4 py-1.5 text-xs mono text-cyan-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white tracking-tight">
              Harshal
              <br />
              <span className="glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Dahiwale
              </span>
            </h1>
            <div className="mono text-lg sm:text-xl text-slate-400 mb-8 h-8 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-cyan-500">›</span>
              <span className="text-emerald-300">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-cyan-400 animate-pulse" />
            </div>
            <p className="text-slate-400 leading-relaxed max-w-lg text-sm sm:text-base mb-8 mx-auto lg:mx-0">
              B.Tech IT graduate from VIIT Pune · PG-DITISS, CDAC ACTS.
              <br />
              Building hands-on skills in Linux, AWS, Docker, CI/CD, and
              DevSecOps.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#projects"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-2.5 text-sm font-bold text-[#060d1a] mono hover:opacity-90 transition-opacity shadow-lg shadow-cyan-900/40"
              >
                ./view-projects
              </a>
              <a
                href="/Harshal_Dahiwale_CDAC_Resume.pdf"
                download
                className="rounded-lg border border-slate-700 px-6 py-2.5 text-sm font-bold text-slate-300 mono hover:border-cyan-600 hover:text-cyan-400 transition-all flex items-center gap-2"
              >
                <span>↓</span> Download CV
              </a>
            </div>
          </div>
          <div className="flex-shrink-0 w-full max-w-sm">
            <TerminalPrompt />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 mono text-xs text-slate-600 animate-bounce">
          <span>scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <RevealSection>
          <SectionLabel label="About Me" />

          <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
            {/* Profile Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="w-64 h-72 rounded-2xl border border-cyan-700/60 bg-[#0d1526] overflow-hidden shadow-[0_0_35px_rgba(34,211,238,0.10)]">
                  <img
                    src="/profile.jpg"
                    alt="Harshal Dahiwale"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-cyan-800 bg-[#060d1a] px-4 py-1.5 mono text-xs text-cyan-400 whitespace-nowrap">
                  Harshal · Pune
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-5">
              <p className="text-base text-slate-300 leading-relaxed">
                Hi — I'm{" "}
                <span className="text-cyan-400 font-semibold">
                  Harshal Dahiwale
                </span>
                , a B.Tech Information Technology graduate from{" "}
                <span className="text-emerald-400 font-semibold">
                  VIIT Pune
                </span>{" "}
                (2025).
              </p>

              <p className="text-base text-slate-400 leading-relaxed">
                I recently completed the{" "}
                <span className="text-emerald-400 font-semibold">
                  PG-DITISS
                </span>{" "}
                programme at CDAC ACTS Pune, where I developed hands-on
                experience in Linux administration, networking, cloud
                infrastructure, DevOps, and cybersecurity.
              </p>

              <p className="text-base text-slate-400 leading-relaxed">
                My current focus is on building reliable infrastructure and
                automation using{" "}
                <span className="text-white font-semibold">
                  Linux, AWS, Docker, GitHub Actions, CI/CD, and DevSecOps
                </span>
                . I enjoy learning by building practical projects and
                understanding how systems work end-to-end.
              </p>

              <p className="text-base text-slate-400 leading-relaxed">
                I'm currently looking for opportunities where I can contribute,
                learn from experienced engineers, and grow as a{" "}
                <span className="text-cyan-400 font-semibold">
                  Cloud / DevOps Engineer
                </span>
                .
              </p>

              {/* Resume Button */}
              <div className="pt-3">
                <a
                  href="/Harshal_Dahiwale_CDAC_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-700 bg-cyan-950/30 px-5 py-2.5 mono text-sm font-semibold text-cyan-400 hover:bg-cyan-900/40 hover:border-cyan-500 transition-all duration-200"
                >
                  ↓ View Resume
                </a>
              </div>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                <div className="rounded-lg border border-slate-800 bg-[#0d1526] px-4 py-3">
                  <p className="mono text-[10px] text-slate-500">Focus</p>
                  <p className="mono text-sm font-semibold text-cyan-400">
                    Cloud & DevOps
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-[#0d1526] px-4 py-3">
                  <p className="mono text-[10px] text-slate-500">Training</p>
                  <p className="mono text-sm font-semibold text-emerald-400">
                    PG-DITISS · CDAC
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-[#0d1526] px-4 py-3">
                  <p className="mono text-[10px] text-slate-500">Status</p>
                  <p className="mono text-sm font-semibold text-cyan-400">
                    Open to Work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── SKILLS ─────────────────────────────────────────────────────────── */}
      <section
        id="skills"
        className="bg-[#080f1e] border-y border-slate-800/60 py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <SectionLabel label="Technical Toolbox" />
            <div className="flex flex-wrap gap-3 justify-start">
              {SKILLS.map((s) => (
                <Badge key={s.name} {...s} />
              ))}
            </div>
            <div className="mt-12 grid sm:grid-cols-3 gap-5">
              {[
                {
                  title: "Cloud & Infrastructure",
                  icon: "☁️",
                  color: "#f97316",
                  items: [
                    "AWS EC2 / S3 / VPC / IAM",
                    "Linux Administration",
                    "Networking & Subnets",
                    "Terraform Infrastructure as Code",
                  ],
                },
                {
                  title: "DevOps & Automation",
                  icon: "⚙️",
                  color: "#22d3ee",
                  items: [
                    "Git & GitHub",
                    "Docker & Docker Compose",
                    "Kubernetes",
                    "Jenkins & CI/CD",
                  ],
                },
                {
                  title: "Security & Monitoring",
                  icon: "🛡️",
                  color: "#4ade80",
                  items: [
                    "DevSecOps Practices",
                    "Prometheus & Grafana",
                    "Security Testing",
                    "Bash & Python Automation",
                  ],
                },
              ].map((cat) => (
                <div
                  key={cat.title}
                  style={{ borderColor: cat.color + "33" }}
                  className="rounded-xl border bg-[#0d1526] p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">{cat.icon}</span>
                    <h3
                      style={{ color: cat.color }}
                      className="font-bold mono text-sm"
                    >
                      {cat.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-400"
                      >
                        <span
                          style={{ color: cat.color }}
                          className="mt-0.5 text-xs"
                        >
                          ▸
                        </span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────────────────── */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <RevealSection>
          <SectionLabel label="Projects / Labs" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────────────────── */}
      <section
        id="certs"
        className="bg-[#080f1e] border-y border-slate-800/60 py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <SectionLabel label="Certifications" />
            <p className="text-slate-500 text-sm mb-8 mono">
              # Click any badge to verify — credentials open in certification
              authority
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CERTS.map((c) => (
                <CertCard key={c.name} cert={c} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <section id="github" className="max-w-6xl mx-auto px-6 py-24">
        <RevealSection>
          <SectionLabel label="GitHub Activity" />
          <GitHubGraph username="30032003" />
        </RevealSection>
      </section>

      {/* ── TIL ────────────────────────────────────────────────────────────── */}
      <section
        id="til"
        className="bg-[#080f1e] border-y border-slate-800/60 py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <SectionLabel label="Technical Notes" />{" "}
            <p className="text-slate-500 text-sm mb-6 mono">
              # Short technical notes from my hands-on learning and lab practice
            </p>
            {/* filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tilTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTilFilter(tag)}
                  className={`mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    tilFilter === tag
                      ? "border-cyan-500 bg-cyan-950/60 text-cyan-400"
                      : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTil.map((e) => (
                <TILCard key={e.id} entry={e} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── EDUCATION ──────────────────────────────────────────────────────── */}
      <section id="education" className="max-w-6xl mx-auto px-6 py-24">
        <RevealSection>
          <SectionLabel label="Education" />
          <div className="flex flex-col gap-6 max-w-3xl">
            {EDUCATION.map((e, i) => (
              <div
                key={i}
                style={{ borderLeftColor: e.accent }}
                className="relative border-l-2 pl-6"
              >
                <div
                  className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                  style={{ background: e.accent }}
                />
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-lg">{e.icon}</span>
                  <h3
                    style={{ color: e.accent }}
                    className="font-bold mono text-base"
                  >
                    {e.inst}
                  </h3>
                  <span className="ml-auto mono text-xs text-slate-500 border border-slate-700 rounded px-2 py-0.5">
                    {e.year}
                  </span>
                </div>
                <p className="font-semibold text-white mb-2">{e.degree}</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {e.note}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="bg-[#080f1e] border-t border-slate-800/60"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <RevealSection>
            <SectionLabel label="Contact" />

            <div className="max-w-xl mx-auto space-y-4 mb-10 text-slate-400">
              <p className="text-lg">
                I'm actively seeking Cloud / DevOps / Sysadmin roles.
              </p>

              <p className="text-sm">
                Whether you have an opportunity, a collaboration, or just want
                to talk infrastructure — reach out.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {[
                {
                  icon: "📧",
                  label: "dahiwaleharshal9@gmail.com",
                  href: "mailto:dahiwaleharshal9@gmail.com",
                  hc: "hover:border-cyan-600 hover:text-cyan-400",
                },
                {
                  icon: "⌥",
                  label: "/github/30032003",
                  href: "https://github.com/30032003",
                  hc: "hover:border-emerald-600 hover:text-emerald-400",
                },
                {
                  icon: "🔗",
                  label: "/in/harshal-dahiwale",
                  href: "https://www.linkedin.com/in/harshal-dahiwale-02610a22a/",
                  hc: "hover:border-blue-500 hover:text-blue-400",
                },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0d1526] px-6 py-3 mono text-sm text-slate-300 ${l.hc} transition-all duration-200`}
                >
                  <span>{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>

            <div className="mt-12 mono text-xs text-slate-600">
              <span className="text-cyan-700">$</span> Open to DevOps & Cloud
              opportunities
            </div>
          </RevealSection>
        </div>
      </section>
      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-6 text-center mono text-xs text-slate-600">
        <p>
          © 2026 Harshal Dahiwale · <span className="text-cyan-700">React</span>{" "}
          + <span className="text-emerald-700">Tailwind</span> ·{" "}
          <span className="text-slate-500">~/portfolio/v2.0.0</span>
        </p>
      </footer>
    </div>
  );
}
