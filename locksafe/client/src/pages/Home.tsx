import { useAuth } from "@/_core/hooks/useAuth";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  Eye,
  Laptop,
  LocateFixed,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  Radio,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { startLogin } from "@/const";

type ViewName = "overview" | "devices" | "activity" | "safety";

type NavItem = {
  id: ViewName;
  label: string;
  icon: typeof Shield;
};

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: ShieldCheck },
  { id: "devices", label: "My devices", icon: Smartphone },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "safety", label: "Recovery guide", icon: CircleHelp },
];

const viewCopy: Record<ViewName, { eyebrow: string; title: string; subtitle: string }> = {
  overview: {
    eyebrow: "OWNER PORTAL",
    title: "Your recovery overview",
    subtitle: "A clear picture of the devices and signals connected to your account.",
  },
  devices: {
    eyebrow: "DEVICE REGISTER",
    title: "Your devices",
    subtitle: "Only devices you set up and connect can appear here.",
  },
  activity: {
    eyebrow: "SECURITY HISTORY",
    title: "Recent activity",
    subtitle: "Review location reports, device actions, and recovery events.",
  },
  safety: {
    eyebrow: "WHEN A DEVICE GOES MISSING",
    title: "Recovery guide",
    subtitle: "Use the safest available steps while LockSafe device pairing is being built.",
  },
};

const sampleEvents = [
  { title: "Example location report", detail: "Illustrative only · 12 minutes ago", icon: MapPin },
  { title: "Example device check-in", detail: "Illustrative only · 38 minutes ago", icon: Radio },
  { title: "Example security check", detail: "Illustrative only · Yesterday", icon: ShieldCheck },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-lockup${compact ? " brand-lockup-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <ShieldCheck size={21} strokeWidth={2.25} />
      </span>
      <span className="brand-name-wrap">
        <span className="brand-name">LockSafe</span>
        {!compact && <span className="brand-caption">DEVICE RECOVERY</span>}
      </span>
    </div>
  );
}

function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "demo";
}) {
  return <span className={`status-pill status-pill-${tone}`}>{children}</span>;
}

function EmptyPanel({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: typeof Smartphone;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty-panel">
      <span className="empty-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  action,
}: {
  icon: typeof Smartphone;
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-title">
        <span className="section-icon" aria-hidden="true">
          <Icon size={17} />
        </span>
        <div>
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
        </div>
      </div>
      {action}
    </div>
  );
}

function MapIllustration({ demo }: { demo: boolean }) {
  return (
    <div className={`map-illustration${demo ? " map-illustration-demo" : ""}`}>
      {demo ? (
        <>
          <svg
            className="demo-map-lines"
            viewBox="0 0 680 280"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path d="M-20 215 C95 175 110 240 230 190 S380 135 440 174 570 245 720 160" />
            <path d="M-20 106 C82 150 128 74 235 115 S374 160 455 100 605 54 720 105" />
            <path d="M130 -20 C170 55 125 115 191 170 S255 230 230 300" />
            <path d="M500 -20 C452 54 525 107 480 157 S422 240 470 300" />
            <path d="M12 38 L622 248" />
            <path d="M38 260 L620 10" />
          </svg>
          <span className="demo-map-road demo-map-road-one" />
          <span className="demo-map-road demo-map-road-two" />
          <span className="demo-map-pin" aria-hidden="true">
            <MapPin size={27} fill="currentColor" />
          </span>
          <span className="demo-map-label">EXAMPLE AREA</span>
          <span className="map-disclaimer">Illustrative map · not a live position</span>
        </>
      ) : (
        <div className="map-empty-message">
          <span className="map-target" aria-hidden="true">
            <LocateFixed size={25} />
          </span>
          <p className="map-empty-title">No location received</p>
          <p>Connect a device first. Its last reported position will appear here with a time and accuracy estimate.</p>
        </div>
      )}
    </div>
  );
}

function SignInScreen({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    try {
      startLogin();
    } catch {
      setLoginError("Secure sign-in is not configured in this environment yet.");
    }
  };

  return (
    <div className="signin-screen">
      <div className="signin-side" aria-hidden="true">
        <div className="signin-side-content">
          <Brand />
          <div className="signin-message">
            <span className="signin-kicker">PREPARE BEFORE YOU NEED IT</span>
            <h1>Your next step should be clear—even when your device is gone.</h1>
            <p>LockSafe brings device status, recovery steps, and supported security actions into one owner-controlled place.</p>
          </div>
          <div className="signin-side-foot">
            <ShieldCheck size={17} />
            <span>Private by design. Built for the device owner.</span>
          </div>
          <div className="signin-orbit signin-orbit-one" />
          <div className="signin-orbit signin-orbit-two" />
          <div className="signin-glow" />
        </div>
      </div>
      <main className="signin-main">
        <div className="signin-card">
          <Brand compact />
          <span className="signin-kicker">OWNER ACCESS</span>
          <h2>Sign in to LockSafe</h2>
          <p className="signin-copy">Use your secure account to review your devices and recovery options from another phone or computer.</p>
          <button className="button button-primary button-wide" type="button" onClick={handleLogin}>
            Sign in with Manus
            <ArrowRight size={17} />
          </button>
          {loginError && <p className="form-error" role="alert">{loginError}</p>}
          <button className="button button-secondary button-wide signin-demo-button" type="button" onClick={onOpenDemo}>
            <Eye size={17} />
            Explore the read-only demo
          </button>
          <p className="signin-demo-note">No account needed. All device, location, and activity details are sample-only; nothing is tracked or controlled.</p>
          <div className="signin-divider"><span>SECURITY NOTE</span></div>
          <div className="signin-note">
            <Shield size={17} />
            <p>Never share a device passcode or verification code with someone claiming they found your phone.</p>
          </div>
          <p className="signin-footnote">Location and remote actions require prior device setup, supported platform controls, and a reachable device.</p>
        </div>
      </main>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <span className="loading-mark"><ShieldCheck size={23} /></span>
      <span>Checking your secure session…</span>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  caption,
  tone = "blue",
}: {
  icon: typeof Smartphone;
  label: string;
  value: string;
  caption: string;
  tone?: "blue" | "mint" | "sand";
}) {
  return (
    <article className="stat-card">
      <span className={`stat-icon stat-icon-${tone}`} aria-hidden="true"><Icon size={18} /></span>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <strong>{value}</strong>
        <span className="stat-caption">{caption}</span>
      </div>
      <ArrowDownRight className="stat-corner" size={15} aria-hidden="true" />
    </article>
  );
}

function RecoverySteps() {
  return (
    <div className="recovery-steps">
      <div className="recovery-step">
        <span className="step-number">01</span>
        <div>
          <h3>Use the platform’s lost-device service</h3>
          <p>It is the most direct route to locate, secure, or erase a device you prepared in advance.</p>
          <div className="step-links">
            <a href="https://android.com/find" target="_blank" rel="noreferrer">
              Google Find Hub <ExternalLink size={13} />
            </a>
            <a href="https://icloud.com/find" target="_blank" rel="noreferrer">
              Apple Find My <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
      <div className="recovery-step">
        <span className="step-number">02</span>
        <div>
          <h3>Protect your mobile account</h3>
          <p>Contact your carrier to suspend the SIM or service if you believe the device was stolen.</p>
        </div>
      </div>
      <div className="recovery-step">
        <span className="step-number">03</span>
        <div>
          <h3>Report the theft safely</h3>
          <p>Keep the serial number or IMEI for a police report. Do not confront a suspected thief.</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading, logout } = useAuth();
  const [activeView, setActiveView] = useState<ViewName>("overview");
  const [isDemo, setIsDemo] = useState(false);
  const [guestDemo, setGuestDemo] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [lockInfoOpen, setLockInfoOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading && !guestDemo) return <LoadingScreen />;
  if (!user && !guestDemo) {
    return <SignInScreen onOpenDemo={() => { setGuestDemo(true); setIsDemo(true); }} />;
  }

  const isGuestDemo = !user && guestDemo;
  const showDemo = isGuestDemo || isDemo;
  const greetingName = user?.name?.trim().split(/\s+/)[0] || "there";
  const initials = isGuestDemo ? "D" : (user?.name || user?.email || "LS").trim().slice(0, 1).toUpperCase();
  const profileName = isGuestDemo ? "Demo visitor" : (user?.name || user?.email || "LockSafe owner");
  const currentCopy = viewCopy[activeView];

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      setLogoutError("We could not complete sign out. Please try again.");
    }
  };

  const selectView = (view: ViewName) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="portal-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className={`sidebar${mobileMenuOpen ? " sidebar-open" : ""}`} aria-label="LockSafe navigation">
        <div className="sidebar-brand"><Brand /></div>
        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="primary-nav" id="primary-navigation" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = activeView === item.id;
            return (
              <button
                className={`nav-item${selected ? " nav-item-active" : ""}`}
                type="button"
                key={item.id}
                aria-current={selected ? "page" : undefined}
                onClick={() => selectView(item.id)}
              >
                <Icon size={18} strokeWidth={selected ? 2.2 : 1.8} />
                <span>{item.label}</span>
                {item.id === "devices" && <span className="nav-count">0</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-safety-card">
            <span className="sidebar-safety-icon"><ShieldCheck size={18} /></span>
            <div>
              <strong>{isGuestDemo ? "Read-only preview" : "Signed-in access"}</strong>
              <span>{isGuestDemo ? "No account or real device data is connected." : "Sign-in is required to open this portal."}</span>
            </div>
          </div>
          <div className="profile-row">
            <span className="profile-avatar" aria-hidden="true">{initials}</span>
            <span className="profile-details">
              <strong>{profileName}</strong>
              <span>{isGuestDemo ? "Demo visitor" : "Owner account"}</span>
            </span>
            {!isGuestDemo && (
              <button className="icon-button signout-button" onClick={handleLogout} type="button" aria-label="Sign out" title="Sign out">
                <LogOut size={16} />
              </button>
            )}
          </div>
          {logoutError && <p className="sidebar-error" role="alert">{logoutError}</p>}
        </div>
      </aside>

      {mobileMenuOpen && <button className="mobile-scrim" type="button" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} />}

      <main className="main-area" id="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-controls="primary-navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="topbar-breadcrumb"><span>LOCKSAFE</span><ChevronRight size={13} /><strong>{currentCopy.eyebrow}</strong></div>
          </div>
          <div className="topbar-actions">
            <span className="session-chip"><span className={`session-dot${isGuestDemo ? " session-dot-demo" : ""}`} />{isGuestDemo ? "Read-only demo" : "Secure session"}</span>
            {isGuestDemo ? (
              <button className="button button-primary button-small" type="button" onClick={() => { setGuestDemo(false); setIsDemo(false); setActiveView("overview"); }}>
                Return to sign in
              </button>
            ) : (
              <button className="topbar-avatar" type="button" onClick={handleLogout} aria-label="Sign out of LockSafe" title="Sign out">
                {initials}
              </button>
            )}
          </div>
        </header>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" key={item.id} className={activeView === item.id ? "mobile-nav-item mobile-nav-item-active" : "mobile-nav-item"} aria-current={activeView === item.id ? "page" : undefined} onClick={() => selectView(item.id)}>
                <Icon size={17} /><span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <span className="page-eyebrow">{currentCopy.eyebrow}</span>
              <h1>{activeView === "overview" ? `Good to see you, ${greetingName}.` : currentCopy.title}</h1>
              <p>{activeView === "overview" ? "Your recovery options are easier to use when everything is prepared ahead of time." : currentCopy.subtitle}</p>
            </div>
            {isGuestDemo ? (
              <span className="status-pill status-pill-demo">READ-ONLY DEMO</span>
            ) : (
              <button className={`button ${isDemo ? "button-demo-active" : "button-secondary"}`} type="button" aria-pressed={isDemo} onClick={() => setIsDemo((demo) => !demo)}>
                <span className="demo-button-dot" />
                {isDemo ? "Exit example view" : "Preview example data"}
              </button>
            )}
          </div>

          {showDemo && (
            <div className="demo-banner" role="status">
              <TriangleAlert size={18} />
              <div><strong>Example view — not a live device.</strong><span>All device details, locations, and events below are illustrative. No tracking is active and no command will be sent.</span></div>
              {!isGuestDemo && <button className="demo-banner-close" type="button" aria-label="Exit example view" onClick={() => setIsDemo(false)}><X size={17} /></button>}
            </div>
          )}

          {activeView === "overview" && (
            <OverviewView
              greetingName={greetingName}
              isDemo={showDemo}
              onAddDevice={() => setSetupOpen(true)}
              onLockInfo={() => setLockInfoOpen(true)}
              onNavigate={selectView}
            />
          )}
          {activeView === "devices" && <DevicesView isDemo={showDemo} onAddDevice={() => setSetupOpen(true)} onLockInfo={() => setLockInfoOpen(true)} />}
          {activeView === "activity" && <ActivityView isDemo={showDemo} />}
          {activeView === "safety" && <SafetyView onAddDevice={() => setSetupOpen(true)} />}

          <footer className="page-footer">
            <span>LockSafe is a recovery companion—not a replacement for Find My or Find Hub.</span>
            <span>Location and device actions depend on setup, permissions, connectivity, and OS support.</span>
          </footer>
        </div>
      </main>

      <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
        <DialogContent className="locksafe-dialog">
          <DialogHeader>
            <span className="dialog-icon dialog-icon-blue"><Smartphone size={20} /></span>
            <DialogTitle>Connect a device</DialogTitle>
            <DialogDescription>Device enrollment is the next build phase. This web portal cannot read a phone’s location or lock the operating system on its own.</DialogDescription>
          </DialogHeader>
          <div className="dialog-notice">
            <ShieldAlert size={18} />
            <p>Pairing will require a companion app installed and authorized on the device before it is lost. Until then, use the platform’s own recovery service.</p>
          </div>
          <div className="dialog-link-list">
            <a href="https://android.com/find" target="_blank" rel="noreferrer"><span className="dialog-link-icon"><Smartphone size={16} /></span><span><strong>Android</strong><small>Open Google Find Hub</small></span><ExternalLink size={15} /></a>
            <a href="https://icloud.com/find" target="_blank" rel="noreferrer"><span className="dialog-link-icon"><Laptop size={16} /></span><span><strong>Apple devices</strong><small>Open Apple Find My</small></span><ExternalLink size={15} /></a>
          </div>
          <DialogFooter>
            <button className="button button-secondary" type="button" onClick={() => setSetupOpen(false)}>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={lockInfoOpen} onOpenChange={setLockInfoOpen}>
        <DialogContent className="locksafe-dialog">
          <DialogHeader>
            <span className="dialog-icon dialog-icon-mint"><LockKeyhole size={20} /></span>
            <DialogTitle>Lock requests need a paired device</DialogTitle>
            <DialogDescription>No device is currently connected to this account, so LockSafe cannot send or confirm a lock action.</DialogDescription>
          </DialogHeader>
          <div className="dialog-notice">
            <Clock3 size={18} />
            <p>In a future connected flow, LockSafe will show whether the platform supports the action and whether the device confirms receipt. Offline, unsupported, or unconfirmed actions will never be shown as successful.</p>
          </div>
          <DialogFooter>
            <button className="button button-secondary" type="button" onClick={() => setLockInfoOpen(false)}>Understood</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OverviewView({
  greetingName,
  isDemo,
  onAddDevice,
  onLockInfo,
  onNavigate,
}: {
  greetingName: string;
  isDemo: boolean;
  onAddDevice: () => void;
  onLockInfo: () => void;
  onNavigate: (view: ViewName) => void;
}) {
  return (
    <>
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-eyebrow"><span className="welcome-eyebrow-line" />BE READY BEFORE A DEVICE GOES MISSING</span>
          <h2>{isDemo ? "A connected device at a glance." : "Protection starts before you need it."}</h2>
          <p>{isDemo ? "This illustrative view shows the information LockSafe may display after a supported device is paired." : `Hi ${greetingName}, link a device before it is lost so its supported status and reports can be available here.`}</p>
        </div>
        <button className="button button-light" type="button" onClick={onAddDevice}>
          {isDemo ? "See pairing requirements" : "Connect a device"}
          <ArrowRight size={16} />
        </button>
        <div className="welcome-decoration" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <section className="stats-grid" aria-label="Device readiness summary">
        <StatCard icon={Smartphone} label="Devices linked" value={isDemo ? "01" : "00"} caption={isDemo ? "Example only" : "No device connected"} tone="blue" />
        <StatCard icon={LockKeyhole} label="Lock readiness" value={isDemo ? "Review" : "Not set"} caption={isDemo ? "Illustrative status" : "Pair a device first"} tone="mint" />
        <StatCard icon={Radio} label="Last device signal" value={isDemo ? "12m ago" : "—"} caption={isDemo ? "Not a live report" : "No signal received"} tone="sand" />
      </section>

      <div className="dashboard-grid">
        <div className="dashboard-main-column">
          <section className="panel device-panel">
            <SectionHeading
              icon={Smartphone}
              eyebrow="REGISTERED DEVICES"
              title="Your devices"
              action={<button className="text-button" type="button" onClick={() => onNavigate("devices")}>View all <ArrowRight size={14} /></button>}
            />
            {isDemo ? (
              <div className="device-preview-card">
                <span className="device-type-icon"><Smartphone size={21} /></span>
                <div className="device-preview-copy"><strong>Example Android phone</strong><span>Sample device · not enrolled</span></div>
                <StatusPill tone="demo">EXAMPLE</StatusPill>
                <button className="button button-outline button-small" type="button" onClick={onLockInfo}>Lock workflow</button>
              </div>
            ) : (
              <EmptyPanel icon={Smartphone} title="No devices connected yet">
                Devices must be enrolled before LockSafe can show their status or receive location reports.
                <button className="button button-outline button-small empty-cta" type="button" onClick={onAddDevice}>See setup requirements <ArrowRight size={14} /></button>
              </EmptyPanel>
            )}
          </section>

          <section className="panel location-panel">
            <SectionHeading
              icon={MapPin}
              eyebrow="LATEST AVAILABLE POSITION"
              title="Location"
              action={<StatusPill tone={isDemo ? "demo" : "neutral"}>{isDemo ? "EXAMPLE" : "NO SIGNAL"}</StatusPill>}
            />
            <MapIllustration demo={isDemo} />
            <div className="location-footnote">
              <span><Clock3 size={14} />{isDemo ? "Example timestamp · 12 minutes ago" : "No timestamp available yet"}</span>
              <span>{isDemo ? "Accuracy shown: illustrative" : "Accuracy will appear with a device report"}</span>
            </div>
          </section>
        </div>

        <aside className="dashboard-side-column" aria-label="Recovery guidance">
          <section className="panel action-panel">
            <SectionHeading icon={ShieldAlert} eyebrow="IF A DEVICE IS STOLEN" title="Start with these steps" />
            <div className="quick-actions">
              <a className="quick-action" href="https://android.com/find" target="_blank" rel="noreferrer">
                <span className="quick-action-icon quick-action-android"><Smartphone size={17} /></span>
                <span><strong>Find an Android device</strong><small>Google Find Hub</small></span>
                <ExternalLink size={14} />
              </a>
              <a className="quick-action" href="https://icloud.com/find" target="_blank" rel="noreferrer">
                <span className="quick-action-icon quick-action-apple"><Laptop size={17} /></span>
                <span><strong>Find an Apple device</strong><small>Apple Find My</small></span>
                <ExternalLink size={14} />
              </a>
              <button className="quick-action" type="button" onClick={onLockInfo}>
                <span className="quick-action-icon quick-action-lock"><LockKeyhole size={17} /></span>
                <span><strong>Lock with LockSafe</strong><small>{isDemo ? "Demo only · no command sent" : "Available after device pairing"}</small></span>
                <ChevronRight size={15} />
              </button>
            </div>
            <div className="safety-callout"><TriangleAlert size={16} /><p>Do not approach or confront someone based on a device location. Share information with local authorities.</p></div>
          </section>

          <section className="readiness-card">
            <div className="readiness-icon"><ShieldCheck size={18} /></div>
            <div className="readiness-heading"><span>SETUP STATUS</span><StatusPill tone="warning">ACTION NEEDED</StatusPill></div>
            <h3>Prepare while your device is with you.</h3>
            <p>Location and remote security actions depend on prior setup, permissions, supported platform controls, and connectivity.</p>
            <button className="readiness-link" type="button" onClick={() => onNavigate("safety")}>Read the recovery guide <ArrowRight size={14} /></button>
          </section>
        </aside>
      </div>

      <section className="panel activity-panel">
        <SectionHeading
          icon={Activity}
          eyebrow="OWNER AUDIT TRAIL"
          title="Recent activity"
          action={<button className="text-button" type="button" onClick={() => onNavigate("activity")}>Open activity <ArrowRight size={14} /></button>}
        />
        {isDemo ? (
          <div className="activity-list">
            {sampleEvents.map((event) => {
              const Icon = event.icon;
              return <div className="activity-row" key={event.title}><span className="activity-icon"><Icon size={16} /></span><span className="activity-copy"><strong>{event.title}</strong><small>{event.detail}</small></span><StatusPill tone="demo">SAMPLE</StatusPill></div>;
            })}
          </div>
        ) : (
          <div className="activity-empty"><span className="activity-empty-icon"><Activity size={17} /></span><p><strong>No device activity to show.</strong><span>Location reports and security events will appear here after a device is connected.</span></p></div>
        )}
      </section>
    </>
  );
}

function DevicesView({ isDemo, onAddDevice, onLockInfo }: { isDemo: boolean; onAddDevice: () => void; onLockInfo: () => void }) {
  return (
    <section className="panel full-panel">
      <SectionHeading
        icon={Smartphone}
        eyebrow="DEVICE REGISTER"
        title="Connected devices"
        action={<button className="button button-primary button-small" type="button" onClick={onAddDevice}><Smartphone size={15} />Connect a device</button>}
      />
      {isDemo ? (
        <div className="device-detail-card">
          <span className="device-type-icon"><Smartphone size={22} /></span>
          <div className="device-detail-copy"><strong>Example Android phone</strong><span>Illustrative record · Android · Sample-only status</span></div>
          <div className="device-detail-status"><StatusPill tone="demo">EXAMPLE DATA</StatusPill><span>Not paired to this account</span></div>
          <button className="button button-outline button-small" type="button" onClick={onLockInfo}>Review lock flow</button>
        </div>
      ) : (
        <EmptyPanel icon={Smartphone} title="Your device list is empty">
          LockSafe will list a phone or laptop after it is enrolled from the companion app. The web portal cannot silently add or track a device.
          <button className="button button-primary button-small empty-cta" type="button" onClick={onAddDevice}>View pairing requirements <ArrowRight size={14} /></button>
        </EmptyPanel>
      )}
      <div className="platform-note-grid">
        <div><span className="platform-dot platform-dot-android" /><strong>Android</strong><span>Location and locking need device-side setup and supported controls.</span></div>
        <div><span className="platform-dot platform-dot-apple" /><strong>Apple</strong><span>Consumer recovery actions are handled through Find My; MDM is for managed devices.</span></div>
        <div><span className="platform-dot platform-dot-laptop" /><strong>Laptops</strong><span>Remote actions vary by operating system and management setup.</span></div>
      </div>
    </section>
  );
}

function ActivityView({ isDemo }: { isDemo: boolean }) {
  return (
    <section className="panel full-panel">
      <SectionHeading icon={Activity} eyebrow="OWNER AUDIT TRAIL" title="Security activity" action={isDemo ? <StatusPill tone="demo">EXAMPLE VIEW</StatusPill> : <StatusPill>NO EVENTS</StatusPill>} />
      {isDemo ? (
        <div className="activity-list activity-list-large">
          {sampleEvents.map((event) => {
            const Icon = event.icon;
            return <div className="activity-row" key={event.title}><span className="activity-icon"><Icon size={16} /></span><span className="activity-copy"><strong>{event.title}</strong><small>{event.detail}</small></span><StatusPill tone="demo">SAMPLE</StatusPill></div>;
          })}
        </div>
      ) : (
        <EmptyPanel icon={Activity} title="No security events received">
          The activity history will record events reported by a connected device and actions requested by the account owner. It will not invent events while a device is offline.
        </EmptyPanel>
      )}
      <p className="timeline-note"><Clock3 size={14} /> Device-reported events may arrive late or not at all when a device is offline or its app is unavailable.</p>
    </section>
  );
}

function SafetyView({ onAddDevice }: { onAddDevice: () => void }) {
  return (
    <div className="safety-layout">
      <section className="panel full-panel">
        <SectionHeading icon={ShieldAlert} eyebrow="SAFE, PRACTICAL NEXT STEPS" title="If your phone or laptop is missing" />
        <RecoverySteps />
      </section>
      <section className="truth-card">
        <span className="truth-icon"><ShieldCheck size={19} /></span>
        <div>
          <span className="section-eyebrow">WHAT LOCKSAFE CAN PROMISE</span>
          <h2>Clear status, not false certainty.</h2>
          <p>LockSafe can show reports and action results that a connected device actually sends. It cannot guarantee location while offline or make a third-party app impossible to remove, bypass, or defeat.</p>
        </div>
      </section>
      <section className="panel setup-cta-panel">
        <div className="setup-cta-icon"><Smartphone size={19} /></div>
        <div><h2>Prepare before you need recovery.</h2><p>Pairing a device requires a companion app and permissions configured while you have the device.</p></div>
        <button className="button button-primary" type="button" onClick={onAddDevice}>View setup requirements <ArrowRight size={15} /></button>
      </section>
    </div>
  );
}
