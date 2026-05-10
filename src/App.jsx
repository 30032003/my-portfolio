import { useState, useEffect, useRef } from "react";

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
  { name: "AWS", icon: "☁️", color: "#f97316" },
  { name: "Docker", icon: "🐳", color: "#38bdf8" },
  { name: "Kubernetes", icon: "⎈", color: "#6366f1" },
  { name: "Jenkins", icon: "⚙️", color: "#e11d48" },
  { name: "Python", icon: "🐍", color: "#4ade80" },
  { name: "Terraform", icon: "🏗️", color: "#a78bfa" },
  { name: "Networking", icon: "🌐", color: "#22d3ee" },
  { name: "Bash", icon: "$", color: "#4ade80", mono: true },
  { name: "Git", icon: "⌥", color: "#fb923c", mono: true },
  { name: "Nginx", icon: "⚡", color: "#34d399" },
  { name: "Prometheus", icon: "🔥", color: "#f59e0b" },
];

const PROJECTS = [
  {
    title: "CI/CD Pipeline Automation",
    desc: "End-to-end Jenkins pipeline for containerised Python microservices — automated build, test, Docker image push, and Kubernetes rolling-deploy.",
    tags: ["Jenkins", "Docker", "K8s", "GitHub"],
    accent: "#22d3ee",
    icon: "⚙️",
    status: "Completed",
    hasDiagram: false,
  },
  {
    title: "Three-Tier AWS Architecture",
    desc: "Provisioned a production-grade three-tier VPC on AWS with public/private subnets, ALB, EC2 Auto Scaling, and RDS using Terraform modules.",
    tags: ["Terraform", "AWS", "VPC", "ALB"],
    accent: "#4ade80",
    icon: "🏗️",
    status: "Completed",
    hasDiagram: true,
  },
  {
    title: "Linux Server Hardening Lab",
    desc: "Automated CIS benchmark hardening for Ubuntu servers: SSH key-only auth, UFW rules, fail2ban, auditd, and automated compliance reporting.",
    tags: ["Linux", "Bash", "Python", "Security"],
    accent: "#facc15",
    icon: "🔒",
    status: "In Progress",
    hasDiagram: false,
  },
  {
    title: "Container Orchestration Lab",
    desc: "Deployed a multi-service app on a self-managed Kubernetes cluster (kubeadm). Configured Ingress, HPA, PVCs, and Helm chart packaging.",
    tags: ["Kubernetes", "Helm", "Ingress", "Nginx"],
    accent: "#a78bfa",
    icon: "⎈",
    status: "Completed",
    hasDiagram: false,
  },
  {
    title: "Cloud Monitoring Dashboard",
    desc: "Prometheus + Grafana stack on AWS EC2 monitoring node health, container metrics, and custom application SLOs with PagerDuty alerting.",
    tags: ["Prometheus", "Grafana", "AWS", "Alerting"],
    accent: "#f97316",
    icon: "📊",
    status: "In Progress",
    hasDiagram: false,
  },
  {
    title: "Automated Backup System",
    desc: "Python cron-driven backup solution: compresses, encrypts, and ships server snapshots to S3. Sends status reports via email and Slack webhook.",
    tags: ["Python", "S3", "Cron", "Boto3"],
    accent: "#34d399",
    icon: "💾",
    status: "Completed",
    hasDiagram: false,
  },
];

const EDUCATION = [
  {
    degree: "Post-Graduate Diploma — IT Infrastructure, Systems & Security",
    inst: "CDAC ACTS, Pune",
    year: "2025 – Present",
    note: "Intensive ITISS training covering enterprise Linux, networking protocols, cloud architecture, and cybersecurity fundamentals.",
    accent: "#22d3ee",
    icon: "🏛️",
  },
  {
    degree: "B.E. Information Technology",
    inst: "VIIT Pune (Vishwakarma Institute of Information Technology)",
    year: "Batch of 2025",
    note: "Core CS fundamentals, data structures, OS, DBMS, and capstone projects in cloud-integrated applications.",
    accent: "#4ade80",
    icon: "🎓",
  },
];

const CERTS = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
    status: "In Progress",
    verifyUrl: "https://aws.amazon.com/certification/",
    accent: "#f97316",
    bg: "from-orange-950/60 to-[#0d1526]",
    abbr: "CLF-C02",
    logo: (
      <svg viewBox="0 0 80 48" className="w-16 h-10" fill="none">
        <rect width="80" height="48" rx="6" fill="#232F3E" />
        <path
          d="M18 30c0 0 6-12 22-12s22 12 22 12"
          stroke="#FF9900"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M28 30l12-14 12 14"
          stroke="#FF9900"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="40" cy="18" r="3" fill="#FF9900" />
        <text
          x="40"
          y="44"
          textAnchor="middle"
          fill="#FF9900"
          fontSize="7"
          fontFamily="monospace"
          fontWeight="bold"
        >
          AWS
        </text>
      </svg>
    ),
  },
  {
    name: "Red Hat Certified System Administrator",
    issuer: "Red Hat",
    year: "2025",
    status: "In Progress",
    verifyUrl: "https://www.redhat.com/en/services/certification/rhcsa",
    accent: "#e11d48",
    bg: "from-red-950/60 to-[#0d1526]",
    abbr: "RHCSA",
    logo: (
      <svg viewBox="0 0 80 48" className="w-16 h-10" fill="none">
        <rect width="80" height="48" rx="6" fill="#1a0000" />
        <path
          d="M14 34 C14 34 24 14 40 14 C56 14 66 34 66 34 Z"
          fill="#EE0000"
        />
        <path
          d="M25 34 C25 34 30 24 40 24 C50 24 55 34 55 34 Z"
          fill="#CC0000"
        />
        <circle cx="40" cy="20" r="5" fill="white" opacity="0.9" />
        <text
          x="40"
          y="45"
          textAnchor="middle"
          fill="#EE0000"
          fontSize="7"
          fontFamily="monospace"
          fontWeight="bold"
        >
          RHCSA
        </text>
      </svg>
    ),
  },
  {
    name: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "Planned",
    status: "Planned",
    verifyUrl:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    accent: "#facc15",
    bg: "from-yellow-950/40 to-[#0d1526]",
    abbr: "SAA-C03",
    logo: (
      <svg viewBox="0 0 80 48" className="w-16 h-10" fill="none">
        <rect width="80" height="48" rx="6" fill="#232F3E" />
        <polygon
          points="40,10 55,20 55,36 40,44 25,36 25,20"
          stroke="#FF9900"
          strokeWidth="2"
          fill="none"
        />
        <polygon
          points="40,18 49,23 49,33 40,38 31,33 31,23"
          fill="#FF9900"
          opacity="0.7"
        />
        <text
          x="40"
          y="44"
          textAnchor="middle"
          fill="#FF9900"
          fontSize="6"
          fontFamily="monospace"
          fontWeight="bold"
        >
          AWS SAA
        </text>
      </svg>
    ),
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "CNCF / Linux Foundation",
    year: "Planned",
    status: "Planned",
    verifyUrl: "https://www.cncf.io/certification/cka/",
    accent: "#6366f1",
    bg: "from-indigo-950/50 to-[#0d1526]",
    abbr: "CKA",
    logo: (
      <svg viewBox="0 0 80 48" className="w-16 h-10" fill="none">
        <rect width="80" height="48" rx="6" fill="#0d1117" />
        <polygon
          points="40,8 54,16 54,32 40,40 26,32 26,16"
          stroke="#326CE5"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="40" cy="24" r="6" fill="#326CE5" opacity="0.9" />
        <line
          x1="40"
          y1="14"
          x2="40"
          y2="34"
          stroke="#326CE5"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="31"
          y1="19"
          x2="49"
          y2="29"
          stroke="#326CE5"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="49"
          y1="19"
          x2="31"
          y2="29"
          stroke="#326CE5"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <text
          x="40"
          y="45"
          textAnchor="middle"
          fill="#326CE5"
          fontSize="7"
          fontFamily="monospace"
          fontWeight="bold"
        >
          CKA
        </text>
      </svg>
    ),
  },
];

// TIL entries
const TIL_ENTRIES = [
  {
    id: 1,
    date: "2025-06-12",
    tag: "Kubernetes",
    title: "K8s RBAC inheritance is additive, not restrictive",
    body: "Learned that ClusterRoles bound at namespace level via RoleBinding only grant access within that namespace — even if the ClusterRole has cluster-wide rules. The binding scope wins.",
    accent: "#6366f1",
  },
  {
    id: 2,
    date: "2025-06-08",
    tag: "AWS",
    title: "Security Groups are stateful, NACLs are stateless",
    body: "SGs automatically allow return traffic; NACLs require explicit inbound AND outbound rules. Spent 40 minutes debugging an RDS connection before realising the NACL was dropping the ephemeral port response.",
    accent: "#f97316",
  },
  {
    id: 3,
    date: "2025-06-03",
    tag: "Linux",
    title: "`ss -tulnp` is the modern replacement for `netstat`",
    body: "netstat is deprecated on most modern distros. `ss -tulnp` is faster, ships with iproute2, and gives cleaner output. Alias it immediately on any new server.",
    accent: "#facc15",
  },
  {
    id: 4,
    date: "2025-05-28",
    tag: "Docker",
    title: "COPY vs ADD — use COPY unless you need tar extraction",
    body: "ADD silently extracts tarballs and fetches remote URLs, which can introduce unexpected behaviour. COPY is explicit and predictable. Reserve ADD only when you explicitly need its extra powers.",
    accent: "#38bdf8",
  },
  {
    id: 5,
    date: "2025-05-21",
    tag: "Terraform",
    title: "`terraform plan -out` saves the plan as a binary artefact",
    body: "Running `terraform apply` without a saved plan can apply changes that drifted since planning. In CI/CD, always `plan -out=tfplan` and `apply tfplan` to guarantee what was reviewed is what runs.",
    accent: "#a78bfa",
  },
  {
    id: 6,
    date: "2025-05-15",
    tag: "Bash",
    title: "Use `set -euo pipefail` at the top of every script",
    body: "`-e` exits on error, `-u` treats unset variables as errors, `-o pipefail` catches failures in piped commands. Together they turn silent failures into loud, debuggable crashes.",
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
function GitHubGraph({ username = "harshal-dahiwale" }) {
  // Generate a realistic-looking 52-week contribution map
  const weeks = 52;
  const days = 7;
  const seed = (w, d) => {
    // heavier on weekdays, some bursts
    const base = d < 5 ? 0.45 : 0.15;
    const burst = w % 8 === 3 || w % 13 === 7 ? 0.6 : 0;
    return Math.random() < base + burst ? Math.floor(Math.random() * 5) : 0;
  };
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => seed(w, d)),
  );

  const levelColor = (v) => {
    if (v === 0) return "#0d1526";
    if (v === 1) return "#0e4429";
    if (v === 2) return "#006d32";
    if (v === 3) return "#26a641";
    return "#39d353";
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const totalContribs = grid.flat().filter((v) => v > 0).length * 3;

  return (
    <div className="rounded-xl border border-slate-700 bg-[#0d1117] p-5">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-800 to-emerald-800 flex items-center justify-center text-lg select-none">
            H
          </div>
          <div>
            <p className="mono text-sm font-bold text-white">{username}</p>
            <p className="mono text-xs text-slate-500">
              {totalContribs} contributions in the last year
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

      {/* month labels */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: 660 }}>
          <div className="flex ml-8 mb-1 gap-0">
            {months.map((m, i) => (
              <span key={m} className="mono text-[9px] text-slate-600 flex-1">
                {m}
              </span>
            ))}
          </div>

          {/* grid */}
          <div className="flex gap-[3px]">
            {/* day labels */}
            <div className="flex flex-col gap-[3px] mr-1">
              {["", "M", "", "W", "", "F", ""].map((d, i) => (
                <span
                  key={i}
                  className="mono text-[9px] text-slate-600 h-[11px] w-4 leading-[11px]"
                >
                  {d}
                </span>
              ))}
            </div>

            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((val, di) => (
                  <div
                    key={di}
                    title={`${val} contributions`}
                    style={{
                      background: levelColor(val),
                      width: 11,
                      height: 11,
                      borderRadius: 2,
                    }}
                    className="transition-transform hover:scale-125 cursor-default"
                  />
                ))}
              </div>
            ))}
          </div>

          {/* legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="mono text-[9px] text-slate-600">Less</span>
            {[0, 1, 2, 3, 4].map((v) => (
              <div
                key={v}
                style={{
                  background: levelColor(v),
                  width: 11,
                  height: 11,
                  borderRadius: 2,
                }}
              />
            ))}
            <span className="mono text-[9px] text-slate-600">More</span>
          </div>
        </div>
      </div>

      <p className="mono text-[10px] text-slate-600 mt-3 text-center">
        ⓘ Replace with{" "}
        <code className="text-cyan-700">react-github-calendar</code> + your
        Personal Access Token for live data
      </p>
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
      href="/harshal-dahiwale-cv.pdf"
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

      {p.hasDiagram && (
        <button
          onClick={() => setOpen((o) => !o)}
          style={{ color: p.accent, borderColor: p.accent + "55" }}
          className="mt-2 flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs mono font-semibold hover:bg-white/5 transition-colors self-start"
        >
          {open ? "▲ Hide" : "▼ View"} Architecture Diagram
        </button>
      )}

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
        Verify credential ↗
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
        style={{ fontFamily: "'Sora', sans-serif" }}
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
      out: "Cloud & DevOps Engineer · CDAC ITISS Trainee",
    },
    { prompt: "$ uptime", out: "Continuous learner · 24/7 builder" },
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
    "Cloud Engineer",
    "DevOps Practitioner",
    "Linux Enthusiast",
    "Automation Builder",
    "AWS Learner",
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
    <div
      className="min-h-screen bg-[#060d1a] text-slate-200 overflow-x-hidden"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Sora:wght@400;600;700;800&display=swap');
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
              IT Graduate from VIIT Pune · CDAC ACTS ITISS Trainee.
              <br />
              Building reliable infrastructure, automated pipelines, and
              cloud-native systems.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="#projects"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-2.5 text-sm font-bold text-[#060d1a] mono hover:opacity-90 transition-opacity shadow-lg shadow-cyan-900/40"
              >
                ./view-projects
              </a>
              <a
                href="/harshal-dahiwale-cv.pdf"
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
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <RevealSection>
          <SectionLabel label="About Me" />
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2 flex justify-center md:justify-start">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-cyan-800/60 shadow-2xl shadow-cyan-950/50">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-[#0d1526] to-emerald-950 flex items-center justify-center text-7xl select-none">
                  👨‍💻
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060d1a]/80 to-transparent p-3">
                  <p className="mono text-xs text-cyan-400 text-center">
                    Harshal · Pune
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 space-y-4 text-slate-400 leading-relaxed">
              <p>
                Hi — I'm{" "}
                <span className="text-cyan-400 font-semibold">
                  Harshal Dahiwale
                </span>
                , an IT graduate from{" "}
                <span className="text-emerald-400 font-semibold">
                  VIIT Pune
                </span>{" "}
                (Batch of 2025) deepening my expertise through the{" "}
                <span className="text-emerald-400 font-semibold">
                  CDAC ACTS ITISS programme
                </span>
                .
              </p>
              <p>
                My passion is taking manual, error-prone processes and replacing
                them with reliable, observable, automated pipelines. I thrive in
                the intersection of{" "}
                <span className="text-white">
                  Linux administration, cloud infrastructure, and DevOps tooling
                </span>
                .
              </p>
              <p>
                Outside labs I'm obsessed with shell scripting, AWS architecture
                case studies, and occasionally breaking VMs just to fix them.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {[
                  ["Focus", "Cloud & DevOps"],
                  ["Location", "Pune, India"],
                  ["Status", "Open to Work"],
                  ["Training", "CDAC ITISS"],
                  ["Grad", "VIIT 2025"],
                  ["Mode", "Always Learning"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-lg border border-slate-800 bg-[#0d1526] px-4 py-3"
                  >
                    <p className="mono text-xs text-slate-500">{k}</p>
                    <p className="mono text-sm text-cyan-400 font-semibold mt-0.5">
                      {v}
                    </p>
                  </div>
                ))}
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
                  title: "Infrastructure & Cloud",
                  icon: "☁️",
                  color: "#f97316",
                  items: [
                    "AWS EC2 / S3 / VPC / IAM",
                    "Terraform IaC",
                    "Networking & Subnets",
                    "Linux Server Admin",
                  ],
                },
                {
                  title: "DevOps & Automation",
                  icon: "⚙️",
                  color: "#22d3ee",
                  items: [
                    "Jenkins CI/CD Pipelines",
                    "Docker & Compose",
                    "Kubernetes & Helm",
                    "Bash & Python Scripts",
                  ],
                },
                {
                  title: "Monitoring & Security",
                  icon: "🔒",
                  color: "#4ade80",
                  items: [
                    "Prometheus + Grafana",
                    "Server Hardening (CIS)",
                    "fail2ban / UFW",
                    "Log Analysis",
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

      {/* ── GITHUB GRAPH ───────────────────────────────────────────────────── */}
      <section id="github" className="max-w-6xl mx-auto px-6 py-24">
        <RevealSection>
          <SectionLabel label="GitHub Activity" />
          <GitHubGraph username="harshal-dahiwale" />
        </RevealSection>
      </section>

      {/* ── TIL ────────────────────────────────────────────────────────────── */}
      <section
        id="til"
        className="bg-[#080f1e] border-y border-slate-800/60 py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <SectionLabel label="Today I Learned" />
            <p className="text-slate-500 text-sm mb-6 mono">
              # Short technical notes from the lab — one discovery at a time
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
            <div className="flex flex-wrap gap-4 justify-center mb-14">
              {[
                {
                  icon: "📧",
                  label: "harshal@example.com",
                  href: "mailto:harshal@example.com",
                  hc: "hover:border-cyan-600 hover:text-cyan-400",
                },
                {
                  icon: "⌥",
                  label: "/github/harshal-dahiwale",
                  href: "https://github.com/",
                  hc: "hover:border-emerald-600 hover:text-emerald-400",
                },
                {
                  icon: "🔗",
                  label: "/in/harshal-dahiwale",
                  href: "https://linkedin.com/in/",
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
                  <span>{l.icon}</span> {l.label}
                </a>
              ))}
            </div>
            <div className="inline-block rounded-xl border border-slate-700 bg-[#060d1a] px-6 py-4 mono text-sm text-left max-w-sm w-full">
              <p className="text-slate-500 mb-1"># reach out</p>
              <p className="text-cyan-400">
                $ curl -X POST /api/hire-harshal \
              </p>
              <p className="text-slate-400 pl-4">
                -d '{`{"role":"DevOps","team":"yours"}`}'
              </p>
              <p className="text-emerald-400 mt-1">
                ✓ 200 OK — Let's build something.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-6 text-center mono text-xs text-slate-600">
        <p>
          © 2025 Harshal Dahiwale · <span className="text-cyan-700">React</span>{" "}
          + <span className="text-emerald-700">Tailwind</span> ·{" "}
          <span className="text-slate-500">~/portfolio/v2.0.0</span>
        </p>
      </footer>
    </div>
  );
}
