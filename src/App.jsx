import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Code2,
  Eye,
  EyeOff,
  FileSearch,
  Globe2,
  KeyRound,
  Link2,
  ListChecks,
  LoaderCircle,
  LocateFixed,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Network,
  PlayCircle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  SquarePen,
  Webhook,
  X,
  XCircle,
} from "lucide-react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { auth, firebaseEnabled, googleProvider } from "./firebase";

const AuthContext = createContext({
  user: null,
  loading: true,
});

const toolGroups = [
  {
    title: "Technical SEO",
    count: "11 tools",
    color: "blue",
    icon: Settings2,
    items: [
      "E-E-A-T Audit (60+ checks)",
      "Robots.txt Analyzer",
      "Crawl Optimization",
      "Speed Optimization",
      "Duplicate Checker",
      "Plagiarism Checker",
      "GSC Audit",
      "Bing Audit",
      "Screaming Frog Analyzer",
      "Backlinks Audit",
      "Bulk Analysis Dashboard",
    ],
  },
  {
    title: "AI Link Builder",
    count: "6 tools",
    color: "gold",
    icon: Link2,
    items: [
      "AI Link Prospecting",
      "Expired Domain Finder",
      "Backlink Directory (2900+)",
      "CSV Link Generator",
      "Backlink Cleaner",
      "Backlink Indexer",
    ],
  },
  {
    title: "Content Creation",
    count: "10 tools",
    color: "green",
    icon: SquarePen,
    items: [
      "AI Content Writer (12-step)",
      "Outline Creator",
      "Entities Extractor",
      "Entities Generator",
      "N-Grams Extractor",
      "NLP Keywords",
      "Grammar Generator",
      "Unique N-Grams",
      "Skip-Gram Generator",
      "ChatGPT Watermark Remover",
    ],
  },
  {
    title: "Semantic SEO",
    count: "4 tools",
    color: "purple",
    icon: BrainCircuit,
    items: [
      "SEO Encyclopedia (100+ articles)",
      "Topical Maps",
      "Resources Hub",
      "AI Agents",
    ],
  },
  {
    title: "Schema SEO",
    count: "2 tools",
    color: "cyan",
    icon: Code2,
    items: ["Schema Generator (50+ types)", "Competitor Schema Checker"],
  },
  {
    title: "Keyword Research",
    count: "3 tools",
    color: "red",
    icon: KeyRound,
    items: ["Keyword Suggest", "Ubersuggest Visual Tool", "SERP Checker"],
  },
  {
    title: "Local SEO",
    count: "2 tools",
    color: "cyan",
    icon: MapPin,
    items: ["Rank Grid Pro", "Image Geo Tagger"],
  },
  {
    title: "On-Page SEO",
    count: "1 tool",
    color: "blue",
    icon: ListChecks,
    items: ["On-Page SEO Checker (61 checks)"],
  },
  {
    title: "GEO SEO",
    count: "4 tools",
    color: "purple",
    icon: Globe2,
    items: [
      "GEO Encyclopedia",
      "LLMs.txt Generator",
      "AI Model Index Checker",
      "AI Compatibility Checker",
    ],
  },
  {
    title: "YouTube SEO",
    count: "2 tools",
    color: "red",
    icon: PlayCircle,
    items: ["YouTube SEO Checker", "YouTube Checklist"],
  },
  {
    title: "Site Audit",
    count: "2 tools",
    color: "pink",
    icon: Search,
    items: ["Full Site Crawler", "Website Auditor"],
  },
  {
    title: "Upwork Success",
    count: "2 tools",
    color: "green",
    icon: Activity,
    items: ["Upwork Encyclopedia", "Upwork Checklist"],
  },
  {
    title: "SEO Tools Suite",
    count: "1 tool",
    color: "gold",
    icon: Settings2,
    items: [
      "50+ Micro SEO Tools (word counter, meta generator, keyword density, and more)",
    ],
  },
];

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "0",
    features: [
      ["Access to all SEO tools", true],
      ["Basic backlink directory", true],
      ["Encyclopedia access", true],
      ["Priority support", false],
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "For growing businesses",
    price: "20",
    popular: true,
    features: [
      ["Everything in Free", true],
      ["Full backlink database", true],
      ["AI content generation", true],
      ["Priority email support", true],
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "For agencies & teams",
    price: "50",
    features: [
      ["Everything in Professional", true],
      ["Unlimited projects", true],
      ["API access", true],
      ["24/7 priority support", true],
    ],
    cta: "Get Started",
  },
];

function Brand({ compact = false }) {
  return (
    <Link className={`brand ${compact ? "brand-compact" : ""}`} to="/">
      <img src="/logo.png" alt="SemanticsX" />
    </Link>
  );
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Main navigation">
        <Brand />
        <button
          className="menu-button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
          type="button"
        >
          {open ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${open ? "nav-open" : ""}`}>
          <a href="/#features">Features</a>
          <a href="/#pricing">Pricing</a>
          <a href="#footer">Help</a>
          <a href="#technical">Desktop App</a>
          <a href="#audit-demo">Free SEO Audit</a>
        </div>
        <div className={`nav-actions ${open ? "nav-open" : ""}`}>
          {user ? (
            <Link className="login-link" to="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link className="login-link" to="/login">
              Login
            </Link>
          )}
          <Link className="button button-small button-primary" to="/register">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Home() {
  return (
    <div className="site-page">
      <Header />
      <main>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-grid" />
          <div className="shell hero-inner">
            <div className="eyebrow hero-eyebrow">
              <span className="live-dot" />
              The 2026 Intelligence Framework is Live
            </div>
            <h1>
              Master the AI Search
              <br />
              with <span>Semantic</span>
              <br />
              <span>Intelligence</span>
            </h1>
            <p>
              60+ advanced SEO tools engineered into a single architectural
              framework. Leverage deep NLP models and entity extraction to
              outpace the competition.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#audit-demo">
                Start Your Free Audit
              </a>
              <Link className="button button-outline" to="/register">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section className="experts-strip">
          <p>Inspired by Global Search Experts</p>
          <div className="expert-logos">
            {["Ahrefs", "SEMrush", "Moz", "Majestic", "Screaming Frog", "Surfer SEO"].map(
              (name) => (
                <span key={name}>{name}</span>
              ),
            )}
          </div>
        </section>

        <section className="section shell" id="audit-demo">
          <SectionHeading
            eyebrow="Live Demo"
            title="See Our E-E-A-T Audit in Action"
            description="Watch how our audit scanner analyzes any website for Experience, Expertise, Authority, and Trust signals in real-time."
          />
          <AuditScanner />
        </section>

        <section className="section shell">
          <SectionHeading
            eyebrow="SEO Optimization Suite"
            title={
              <>
                Complete SEO Optimizations <span className="gradient-text">by SemanticsX</span>
              </>
            }
            description="50+ professional tools covering every aspect of SEO — from technical audits to AI-powered content creation and link building"
          />
          <Comparison />
          <div className="tool-pills">
            {[
              "E-E-A-T Audit",
              "On-Page SEO",
              "AI Content Writer",
              "Link Building",
              "Schema SEO",
              "Speed Optimization",
            ].map((tool) => (
              <span key={tool}>
                <i /> {tool}
              </span>
            ))}
          </div>
        </section>

        <section className="section shell" id="features">
          <SectionHeading
            align="left"
            title={
              <>
                Engineered <span className="gradient-text">for Precision</span>
              </>
            }
            description="Move beyond basic keywords. Our suite provides architectural clarity for every layer of your digital presence."
          />
          <div className="tool-grid">
            {toolGroups.map((group) => (
              <ToolCard key={group.title} {...group} />
            ))}
          </div>
        </section>

        <section className="section shell" id="technical">
          <SectionHeading
            title="Powerful Technical Audits"
            description="Experience the most comprehensive E-E-A-T analysis engine on the market."
          />
          <div className="dashboard-shot">
            <img
              src="/audit-dashboard.jpg"
              alt="SemanticsX Technical Audit Interface"
            />
          </div>
        </section>

        <section className="section semantic-section">
          <div className="shell semantic-grid">
            <div className="semantic-visual">
              <img
                src="/semantic-visual.png"
                alt="Semantic Intelligence Visualization"
              />
              <div className="precision-card">
                <span>Entity Map Analysis</span>
                <strong>98.4% Precision Rate</strong>
                <BarChart3 />
              </div>
            </div>
            <div>
              <h2>The Semantic Advantage: Intelligence Above All</h2>
              <FeatureLine
                icon={BrainCircuit}
                title="Natural Language Processing"
                text="Our system doesn't just read words; it understands intent and thematic relationships across millions of data points."
              />
              <FeatureLine
                icon={Network}
                title="N-gram & Entity Extraction"
                text="Automated extraction of semantic n-grams to identify content gaps your competitors haven't even seen yet."
              />
              <FeatureLine
                icon={CircleGauge}
                title="Predictive SERP Modeling"
                text="Simulate ranking outcomes before you even hit publish using our search-engine neural simulations."
              />
            </div>
          </div>
        </section>

        <section className="section shell">
          <SectionHeading
            title="Deep Integration Ecosystem"
            description="Seamlessly connect your existing workflow. Data flows both ways with zero friction."
          />
          <div className="integration-grid">
            <Integration icon={Activity} name="Search Console" />
            <Integration icon={Search} name="Bing Webmaster" />
            <Integration icon={Bot} name="AI Model API" />
            <Integration icon={Webhook} name="Custom Webhooks" />
          </div>
        </section>

        <section className="section shell" id="pricing">
          <SectionHeading
            title="Scale Your Intelligence"
            description="Choose the framework that fits your organizational goals."
          />
          <div className="pricing-grid">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section className="section shell cta-wrap">
          <div className="final-cta">
            <h2>Ready to Own the SERPs?</h2>
            <p>
              Join 5,000+ SEO professionals who have scaled their organic
              traffic by 400% using our intelligence framework.
            </p>
            <div className="lifetime-card">
              <span>Limited Time Invitation</span>
              <strong>Lifetime Access for $100</strong>
              <small>One-time payment. All future updates included.</small>
            </div>
            <div className="hero-actions">
              <Link className="button button-primary" to="/register">
                Get Lifetime Deal
              </Link>
              <Link className="button button-ghost" to="/register">
                Get Started FREE
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function AuditScanner() {
  const scores = [
    ["Experience", "First-hand expertise signals", 88, "blue"],
    ["Expertise", "Topical depth and credentials", 92, "purple"],
    ["Authority", "Reputation and references", 85, "green"],
    ["Trust", "Transparency and security", 90, "gold"],
    ["Schema", "Structured data markup", 91, "cyan"],
  ];

  return (
    <div className="audit-window">
      <div className="window-bar">
        <div className="window-title">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          E-E-A-T Audit Scanner
        </div>
        <span className="running">
          <Sparkles size={13} /> Running Audit
        </span>
      </div>
      <div className="audit-body">
        <label>Target URL</label>
        <div className="url-field">
          <Search size={21} />
          <span>https://bigtechies.com</span>
        </div>
        <span className="audit-label">Audit Results</span>
        <div className="score-list">
          {scores.map(([name, text, score, color]) => (
            <div className="score-row" key={name}>
              <div className={`score-icon ${color}`}>
                <ShieldCheck size={20} />
              </div>
              <div className="score-copy">
                <strong>{name}</strong>
                <small>{text}</small>
                <span className="progress">
                  <i style={{ width: `${score}%` }} />
                </span>
              </div>
              <b>{score}<small>/100</small></b>
            </div>
          ))}
        </div>
        <div className="total-score">
          <div className="score-ring">
            <strong>87</strong>
            <span>E-E-A-T Score</span>
          </div>
          <div className="score-tags">
            <span><i /> Strong Signals</span>
            <span>↑ Above Average</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Comparison() {
  const issues = [
    ["E-E-A-T compliance gaps", "Detected"],
    ["Core Web Vitals issues", "Found"],
    ["Crawl optimization needed", "12 Issues"],
    ["Content quality scoring", "Low"],
    ["Schema markup missing", "None"],
  ];
  const solutions = [
    ["AI Content Writer", "12-Step"],
    ["Link Building Intelligence", "2900+ Sites"],
    ["On-Page SEO Optimization", "61 Checks"],
    ["Schema Generator", "50+ Types"],
    ["Speed & Crawl Optimization", "Active"],
  ];

  return (
    <div className="comparison">
      <ComparisonCard
        title="Issues We Detect"
        subtitle="60+ diagnostic audit checks"
        items={issues}
        totalLabel="Audit Checks"
        total="60+"
        tone="danger"
      />
      <div className="comparison-arrow">
        <ArrowRight />
      </div>
      <ComparisonCard
        title="SemanticsX Solution"
        subtitle="50+ optimization tools"
        items={solutions}
        totalLabel="SEO Tools"
        total="50+"
        tone="success"
      />
    </div>
  );
}

function ComparisonCard({
  title,
  subtitle,
  items,
  totalLabel,
  total,
  tone,
}) {
  return (
    <div className={`comparison-card ${tone}`}>
      <div className="comparison-title">
        <span>{tone === "danger" ? <X /> : <Check />}</span>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="comparison-list">
        {items.map(([label, result]) => (
          <div key={label}>
            <span><i />{label}</span>
            <strong>{result}</strong>
          </div>
        ))}
      </div>
      <div className="comparison-total">
        <span>{totalLabel}</span>
        <strong>{total}</strong>
      </div>
    </div>
  );
}

function ToolCard({ title, count, color, icon: Icon, items }) {
  return (
    <article className={`tool-card tone-${color}`}>
      <div className="tool-card-heading">
        <span><Icon size={23} /></span>
        <div>
          <h3>{title}</h3>
          <small>{count}</small>
        </div>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Check size={15} /> <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function FeatureLine({ icon: Icon, title, text }) {
  return (
    <div className="feature-line">
      <span><Icon /></span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Integration({ icon: Icon, name }) {
  return (
    <div className="integration-card">
      <Icon />
      <strong>{name}</strong>
    </div>
  );
}

function PricingCard({ plan }) {
  return (
    <article className={`price-card ${plan.popular ? "price-popular" : ""}`}>
      {plan.popular && <span className="popular-label">Most Popular</span>}
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <div className="price">
        <span>$</span>
        <strong>{plan.price}</strong>
        <small>/month</small>
      </div>
      <ul>
        {plan.features.map(([feature, included]) => (
          <li className={!included ? "disabled" : ""} key={feature}>
            {included ? <Check size={19} /> : <X size={19} />}
            {feature}
          </li>
        ))}
      </ul>
      <Link
        className={`button ${plan.popular ? "button-primary" : "button-outline"}`}
        to="/register"
      >
        {plan.cta}
      </Link>
    </article>
  );
}

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="shell footer-grid">
        <div>
          <Brand compact />
          <p>
            The next generation of SEO tools designed for agencies and
            growth-focused startups.
          </p>
        </div>
        <FooterLinks
          title="Platform"
          links={[
            "Backlink Directory",
            "E-E-A-T Audit",
            "SEO Encyclopedia",
            "Pricing",
            "Desktop App",
          ]}
        />
        <FooterLinks
          title="Company"
          links={[
            "About Us",
            "Blog",
            "Contact",
            "Become an Affiliate",
            "Terms of Service",
            "Privacy Policy",
          ]}
        />
        <FooterLinks
          title="Account"
          links={[
            ["Sign In", "/login"],
            ["Create Account", "/register"],
            ["Dashboard", "/dashboard"],
          ]}
        />
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 SemanticsX Inc. All rights reserved.</span>
        <div>
          <a href="#footer">Terms</a>
          <a href="#footer">Privacy</a>
          <a href="#footer">Twitter</a>
          <a href="#footer">LinkedIn</a>
          <a href="#footer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div className="footer-links">
      <h3>{title}</h3>
      {links.map((entry) => {
        const [label, href] = Array.isArray(entry)
          ? entry
          : [entry, "#footer"];
        return href.startsWith("/") ? (
          <Link key={label} to={href}>{label}</Link>
        ) : (
          <a key={label} href={href}>{label}</a>
        );
      })}
    </div>
  );
}

function AuthLayout({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setMessage("");
    setError("");
  }, [mode]);

  if (user) return <Navigate to="/dashboard" replace />;

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!auth) {
      setError("Add your Firebase keys to a .env file to enable authentication.");
      return;
    }
    if (isRegister && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      if (isRegister) {
        const credential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );
        await updateProfile(credential.user, { displayName: form.name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
      navigate("/dashboard");
    } catch (firebaseError) {
      setError(friendlyAuthError(firebaseError.code));
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    setError("");
    if (!auth) {
      setError("Add your Firebase keys to a .env file to enable authentication.");
      return;
    }

    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (firebaseError) {
      setError(friendlyAuthError(firebaseError.code));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setError("");
    setMessage("");
    if (!form.email) {
      setError("Enter your email address first.");
      return;
    }
    if (!auth) {
      setError("Add your Firebase keys to a .env file to enable authentication.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, form.email);
      setMessage("Password reset email sent.");
    } catch (firebaseError) {
      setError(friendlyAuthError(firebaseError.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <Link className="auth-brand" to="/">
        <span>S</span>
        <strong>Semantics<span>X</span></strong>
      </Link>
      <section className="auth-card">
        <div className="auth-copy">
          <div className="auth-icon">
            {isRegister ? <Sparkles /> : <LockKeyhole />}
          </div>
          <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p>
            {isRegister
              ? "Start using the complete semantic intelligence platform"
              : "Sign in to continue to your dashboard"}
          </p>
        </div>

        {!firebaseEnabled && (
          <div className="config-notice">
            Firebase is wired in. Add the values from <code>.env.example</code>{" "}
            to <code>.env</code> to connect your project.
          </div>
        )}

        <form onSubmit={submit} className="auth-form">
          {isRegister && (
            <AuthField
              icon={Sparkles}
              label="Full name"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={updateField}
              required
            />
          )}
          <AuthField
            icon={Mail}
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={updateField}
            required
          />
          <AuthField
            icon={KeyRound}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={updateField}
            required
            action={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            }
          />
          {isRegister && (
            <AuthField
              icon={ShieldCheck}
              label="Confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={updateField}
              required
            />
          )}
          {!isRegister && (
            <button
              className="forgot-button"
              type="button"
              onClick={resetPassword}
            >
              Forgot password?
            </button>
          )}

          {error && <div className="auth-alert auth-error"><XCircle />{error}</div>}
          {message && (
            <div className="auth-alert auth-success">
              <CheckCircle2 />{message}
            </div>
          )}

          <button className="button button-primary auth-submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="spin" />
            ) : (
              <>
                {isRegister ? "Create Account" : "Sign In"}
                <ArrowRight />
              </>
            )}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>
        <button
          className="google-button"
          type="button"
          onClick={continueWithGoogle}
          disabled={loading}
        >
          <GoogleMark />
          Continue with Google
        </button>

        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Sign in" : "Sign up free"}
          </Link>
        </p>
      </section>
      <Link className="back-home" to="/">
        <ArrowLeft /> Back to home
      </Link>
    </main>
  );
}

function AuthField({ icon: Icon, label, action, ...props }) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <div>
        <Icon />
        <input {...props} />
        {action}
      </div>
    </label>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.6Z" />
      <path fill="#34A853" d="M12 22c2.8 0 5.1-.9 6.8-2.5l-3.3-2.6c-.9.6-2.1 1-3.5 1a6 6 0 0 1-5.6-4.1H3v2.7A10.3 10.3 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.8a6.3 6.3 0 0 1 0-4V7.1H3a10.2 10.2 0 0 0 0 9.4l3.4-2.7Z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.9.5 4 1.6l3-3A10 10 0 0 0 3 7.1l3.4 2.7A6 6 0 0 1 12 5.9Z" />
    </svg>
  );
}

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace />;

  const logOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const tools = [
    [FileSearch, "Run E-E-A-T Audit", "Analyze 60+ trust and authority signals"],
    [BrainCircuit, "Create AI Content", "Build a semantic 12-step article"],
    [Network, "Explore Backlinks", "Search 2,900+ link opportunities"],
    [LocateFixed, "Track Local Rankings", "Monitor geographic search visibility"],
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <Brand />
        <div className="dashboard-user">
          <span>{user.displayName || user.email}</span>
          <button type="button" onClick={logOut}>Log out</button>
        </div>
      </header>
      <main className="dashboard-main shell">
        <div className="dashboard-welcome">
          <div>
            <span className="eyebrow">Intelligence Console</span>
            <h1>Welcome back, {user.displayName?.split(" ")[0] || "Explorer"}</h1>
            <p>Your semantic optimization workspace is ready.</p>
          </div>
          <Link className="button button-primary" to="/">View Homepage</Link>
        </div>
        <div className="dashboard-stats">
          <div><span>Site Health</span><strong>87%</strong><small>+4 this week</small></div>
          <div><span>Active Projects</span><strong>3</strong><small>1 needs review</small></div>
          <div><span>Content Score</span><strong>92</strong><small>Excellent coverage</small></div>
          <div><span>Links Found</span><strong>248</strong><small>36 new prospects</small></div>
        </div>
        <h2>Start optimizing</h2>
        <div className="dashboard-tools">
          {tools.map(([Icon, title, text]) => (
            <button type="button" key={title}>
              <span><Icon /></span>
              <strong>{title}</strong>
              <small>{text}</small>
              <ChevronRight />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

function FullScreenLoader() {
  return (
    <div className="screen-loader">
      <LoaderCircle className="spin" />
    </div>
  );
}

function friendlyAuthError(code = "") {
  const errors = {
    "auth/email-already-in-use": "An account already exists for this email.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/popup-blocked": "Allow popups to continue with Google.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/weak-password": "Choose a stronger password with at least 6 characters.",
  };
  return errors[code] || "Something went wrong. Please try again.";
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthLayout mode="login" />} />
      <Route path="/register" element={<AuthLayout mode="register" />} />
      <Route path="/signup" element={<Navigate to="/register" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
