import {
  ArrowRight,
  Briefcase,
  Cookie,
  FileText,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Newspaper,
  Package,
  PawPrint,
  Phone,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";

function PageShell({
  eyebrow,
  icon,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '1080px' }}>
      <div className="text-center mx-auto" style={{ maxWidth: '720px' }}>
        <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
          {icon} {eyebrow}
        </span>
        <h1 className="mt-4 fw-bold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '42px' }}>
          {title}
        </h1>
        <p className="mt-3 text-muted" style={{ fontFamily: 'Manrope', fontSize: '16px' }}>{subtitle}</p>
      </div>
      <div className="mt-5 pt-4">{children}</div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border p-4 p-md-5 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
      {title && (
        <div className="fw-semibold text-dark mb-3" style={{ fontFamily: 'Sora', fontSize: '20px' }}>
          {title}
        </div>
      )}
      <div className="d-flex flex-column gap-3" style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#4B5563', lineHeight: '1.6' }}>
        {children}
      </div>
    </div>
  );
}

function CTA({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <div className="mt-5 pt-3 border p-4 p-md-5 text-center" style={{ backgroundColor: '#FFF8F1', borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
      <div className="d-inline-flex align-items-center justify-content-center text-white" style={{ width: '56px', height: '56px', borderRadius: '1rem', backgroundColor: '#0F766E' }}>
        <PawPrint size={22} />
      </div>
      <h2 className="mt-4 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '28px' }}>
        Ready to meet smarter care?
      </h2>
      <button
        onClick={() => setRoute("signup")}
        className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 mt-4 px-4"
        style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
      >
        Start free — add your first pet <ArrowRight size={16} />
      </button>
    </div>
  );
}

export function About({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <PageShell
      eyebrow="About Zootopia"
      icon={<Heart size={13} />}
      title="Smarter care for the pets who run your home."
      subtitle="We started Zootopia after watching friends forget refills, guess at nutrition, and juggle five apps to keep one dog fed."
    >
      <div className="row g-4">
        {[
          ["2024", "Founded in Austin by pet parents and engineers."],
          ["48k+", "Pet profiles powering personalized picks every day."],
          ["93%", "Customers who say reorder reminders changed their routine."],
        ].map(([n, d]) => (
          <div key={n} className="col-12 col-md-4">
            <div className="bg-white border p-4 p-lg-5 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '36px', color: '#0F766E' }}>{n}</div>
              <div className="mt-2" style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#4B5563' }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 row g-4">
        <div className="col-12 col-md-6">
          <Card title="Our mission">
            <p className="m-0">
              Every pet deserves the right food, the right care, and an owner who isn't
              scrambling. We build quiet software that keeps households running so
              humans can focus on the cuddles.
            </p>
          </Card>
        </div>
        <div className="col-12 col-md-6">
          <Card title="Our values">
            <ul className="m-0 ps-4 d-flex flex-column gap-2">
              <li>Vet-reviewed products, no hype.</li>
              <li>Pet profile first, catalog second.</li>
              <li>You stay in control — pause, skip, cancel anytime.</li>
            </ul>
          </Card>
        </div>
      </div>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

export function Careers({ setRoute }: { setRoute: (r: string) => void }) {
  const roles = [
    ["Senior Product Designer", "Design", "Remote · Full-time"],
    ["Backend Engineer (Node.js)", "Engineering", "Austin, TX · Full-time"],
    ["Veterinary Content Lead", "Content", "Remote · Full-time"],
    ["Customer Experience Specialist", "Support", "Remote · Part-time"],
    ["Growth Marketing Manager", "Marketing", "Austin, TX · Full-time"],
  ];
  return (
    <PageShell
      eyebrow="Careers"
      icon={<Briefcase size={13} />}
      title="Build the calmest pet-care experience on the internet."
      subtitle="We're a small, cross-functional team who move quickly, stay kind, and love our dogs loudly."
    >
      <div className="row g-4 mb-5 pb-3">
        {[
          ["Remote-friendly", "Work from anywhere in the US. Quarterly team weeks in Austin."],
          ["Real ownership", "Ship end-to-end. No layers of approval — just good judgment."],
          ["Pet perks", "Monthly Zootopia credit and paid time off for new adoptions."],
        ].map(([t, d]) => (
          <div key={t} className="col-12 col-md-4">
            <div className="bg-white border p-4 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>{t}</div>
              <div className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px', lineHeight: '1.6' }}>
                {d}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border overflow-hidden" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
        <div className="px-4 py-3 fw-semibold text-dark" style={{ borderBottom: '1px solid #E7E2D9', fontFamily: 'Sora', fontSize: '16px' }}>
          Open roles
        </div>
        <ul className="list-unstyled m-0 d-flex flex-column" style={{ borderTop: 'none' }}>
          {roles.map(([t, team, loc], idx) => (
            <li
              key={t}
              className="px-4 py-3 d-flex flex-wrap align-items-center justify-content-between gap-3 hover-bg-light"
              style={{ borderTop: idx > 0 ? '1px solid #E7E2D9' : 'none' }}
            >
              <div>
                <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                  {t}
                </div>
                <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  {team} · {loc}
                </div>
              </div>
              <button className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 px-3" style={{ height: '36px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
                Apply <ArrowRight size={13} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

export function Press({ setRoute }: { setRoute: (r: string) => void }) {
  const articles = [
    ["TechCrunch", "How Zootopia turned pet profiles into a retail engine", "Mar 2026"],
    ["Fast Company", "The startups making pet parenting quieter", "Feb 2026"],
    ["Forbes", "Subscription done right: lessons from Zootopia", "Jan 2026"],
    ["Wired", "Inside the smart filtering behind personalized pet picks", "Nov 2025"],
  ];
  return (
    <PageShell
      eyebrow="Press"
      icon={<Newspaper size={13} />}
      title="Stories, assets, and things journalists ask for."
      subtitle="For press inquiries, reach us at press@petcare.example and we'll respond within one business day."
    >
      <div className="bg-white border overflow-hidden mb-5" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
        <div className="px-4 py-3 fw-semibold text-dark" style={{ borderBottom: '1px solid #E7E2D9', fontFamily: 'Sora', fontSize: '16px' }}>
          In the news
        </div>
        <ul className="list-unstyled m-0 d-flex flex-column">
          {articles.map(([outlet, title, date], idx) => (
            <li key={title} className="px-4 py-3 d-flex align-items-center justify-content-between gap-3" style={{ borderTop: idx > 0 ? '1px solid #E7E2D9' : 'none' }}>
              <div>
                <div className="fw-semibold text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.1em', color: '#0F766E' }}>
                  {outlet}
                </div>
                <div className="mt-1 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                  {title}
                </div>
                <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{date}</div>
              </div>
              <ArrowRight size={16} className="text-muted flex-shrink-0" />
            </li>
          ))}
        </ul>
      </div>

      <Card title="Brand assets">
        <p className="m-0">
          Logos, product photography, and founder headshots are available as a single
          zip. Please don't modify the wordmark or recolor the paw icon.
        </p>
        <button className="mt-3 btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 px-4 shadow-none align-self-start" style={{ height: '40px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '13px' }}>
          Download press kit <ArrowRight size={14} />
        </button>
      </Card>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

export function Sustainability({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <PageShell
      eyebrow="Sustainability"
      icon={<Leaf size={13} />}
      title="Good for pets. Gentler on the planet."
      subtitle="We measure the footprint of every box we ship, and publish progress annually."
    >
      <div className="row g-4">
        {[
          ["100%", "Recyclable packaging across food and treats."],
          ["-38%", "Reduction in shipping emissions vs. 2024 baseline."],
          ["12k lbs", "Surplus food donated to local shelters in 2025."],
        ].map(([n, d]) => (
          <div key={n} className="col-12 col-md-4">
            <div className="bg-white border p-4 p-lg-5 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '36px', color: '#0F766E' }}>{n}</div>
              <div className="mt-2" style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#4B5563' }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 row g-4">
        <div className="col-12 col-md-6">
          <Card title="Packaging">
            <p className="m-0">
              Every parcel ships in curbside-recyclable paperboard. Ice packs in our
              fresh line are plant-based and home-compostable.
            </p>
          </Card>
        </div>
        <div className="col-12 col-md-6">
          <Card title="Sourcing">
            <p className="m-0">
              We prioritize suppliers with third-party welfare certifications and
              regional sourcing to shrink transport emissions.
            </p>
          </Card>
        </div>
        <div className="col-12 col-md-6">
          <Card title="Subscriptions reduce waste">
            <p className="m-0">
              Right-sized refills mean fewer half-used bags at the back of the pantry
              and fewer emergency trips across town.
            </p>
          </Card>
        </div>
        <div className="col-12 col-md-6">
          <Card title="Annual report">
            <p className="m-0">
              Read our 2025 sustainability report for the full breakdown of materials,
              emissions, and goals for 2026.
            </p>
          </Card>
        </div>
      </div>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

export function Shipping({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <PageShell
      eyebrow="Shipping"
      icon={<Truck size={13} />}
      title="Fast, trackable, and free over $49."
      subtitle="We ship from three regional warehouses, so most orders arrive in 2–4 business days."
    >
      <div className="row g-4 mb-5 pb-3">
        {[
          [<Package size={18} />, "Standard", "2–4 business days", "Free over $49 · otherwise $5.99"],
          [<Truck size={18} />, "Express", "1–2 business days", "$12.99 flat"],
          [<MapPin size={18} />, "Local same-day", "Select metros", "$14.99 · order by 12pm local"],
        ].map(([icon, label, eta, fee]: any) => (
          <div key={label} className="col-12 col-md-4">
            <div className="bg-white border p-4 h-100 d-flex flex-column" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="rounded-3 d-flex align-items-center justify-content-center mb-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                {icon}
              </div>
              <div className="fw-semibold text-dark mb-1" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                {label}
              </div>
              <div className="text-muted flex-grow-1" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>{eta}</div>
              <div className="mt-2 fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '12px', color: '#0F766E' }}>
                {fee}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Card title="Where we ship">
            <p className="m-0">
              All 50 US states and Washington, DC. International shipping isn't
              available yet — we're working on Canada for late 2026.
            </p>
          </Card>
        </div>
        <div className="col-12 col-md-6">
          <Card title="Tracking">
            <p className="m-0">
              You'll get a tracking link the moment your order leaves the warehouse.
              Orders page also shows a live timeline for every shipment.
            </p>
          </Card>
        </div>
      </div>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

export function Returns({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <PageShell
      eyebrow="Returns"
      icon={<RotateCcw size={13} />}
      title="30-day, no-questions-asked returns."
      subtitle="If your pet isn't thrilled, send it back. We cover return shipping on anything unopened."
    >
      <div className="row g-4 mb-5 pb-3">
        {[
          ["1. Start your return", "Open the order from your dashboard and tap 'Start return'."],
          ["2. Print the label", "We'll email a prepaid label within minutes."],
          ["3. Get refunded", "Refunds hit your original payment method in 3–5 business days."],
        ].map(([t, d], i) => (
          <div key={t} className="col-12 col-md-4">
            <div className="bg-white border p-4 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="rounded-3 text-white fw-bold d-flex align-items-center justify-content-center mb-3" style={{ width: '40px', height: '40px', backgroundColor: '#0F766E', fontFamily: 'Sora' }}>
                {i + 1}
              </div>
              <div className="fw-semibold text-dark mb-2" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                {t}
              </div>
              <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px', lineHeight: '1.6' }}>
                {d}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Card title="What's eligible">
            <ul className="m-0 ps-4 d-flex flex-column gap-2">
              <li>Unopened food, treats, and supplements within 30 days.</li>
              <li>Toys and grooming items with original tags.</li>
              <li>Damaged-in-transit items — we replace immediately.</li>
            </ul>
          </Card>
        </div>
        <div className="col-12 col-md-6">
          <Card title="Food your pet didn't like">
            <p className="m-0">
              We'll still refund it. Ask us on chat and we'll also suggest a different
              formula based on your pet's profile.
            </p>
          </Card>
        </div>
      </div>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

export function Contact({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <PageShell
      eyebrow="Contact"
      icon={<Mail size={13} />}
      title="Talk to a real human about your pet."
      subtitle="Most questions get answered in under 10 minutes during business hours."
    >
      <div className="row g-4 mb-5 pb-3">
        {[
          [<Mail size={18} />, "Email", "hello@petcare.example", "Replies within 4 hours"],
          [<Phone size={18} />, "Phone", "1-800-PET-CARE", "Mon–Fri · 8am–8pm CT"],
          [<MapPin size={18} />, "HQ", "500 Cesar Chavez St, Austin TX", "By appointment"],
        ].map(([icon, label, value, sub]: any) => (
          <div key={label} className="col-12 col-md-4">
            <div className="bg-white border p-4 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="rounded-3 d-flex align-items-center justify-content-center mb-3" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                {icon}
              </div>
              <div className="fw-semibold text-uppercase text-muted mb-1" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.1em' }}>
                {label}
              </div>
              <div className="fw-semibold text-dark mb-1" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                {value}
              </div>
              <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border p-4 p-md-5" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
        <div className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '20px' }}>
          Send us a message
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="row g-4"
        >
          <div className="col-12 col-md-6"><Field label="Your name" /></div>
          <div className="col-12 col-md-6"><Field label="Email" type="email" /></div>
          <div className="col-12"><Field label="Subject" full /></div>
          <div className="col-12">
            <label className="fw-semibold text-muted mb-2 d-block" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
              Message
            </label>
            <textarea
              rows={5}
              className="form-control"
              style={{ borderRadius: '1rem', border: '1px solid #E7E2D9', backgroundColor: '#FFF8F1', padding: '12px 16px', fontFamily: 'Manrope', fontSize: '14px', boxShadow: 'none' }}
            />
          </div>
          <div className="col-12 mt-4">
            <button className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 px-4 shadow-none" style={{ height: '44px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}>
              Send message <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </div>
      <CTA setRoute={setRoute} />
    </PageShell>
  );
}

function Field({
  label,
  type = "text",
  full,
}: {
  label: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <div>
      <label className="fw-semibold text-muted mb-2 d-block" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        style={{ height: '44px', borderRadius: '22px', border: '1px solid #E7E2D9', backgroundColor: '#FFF8F1', padding: '0 16px', fontFamily: 'Manrope', fontSize: '14px', boxShadow: 'none' }}
      />
    </div>
  );
}

function LegalShell({
  eyebrow,
  icon,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  updated: string;
  sections: Array<[string, string]>;
}) {
  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '880px' }}>
      <div style={{ maxWidth: '720px' }}>
        <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
          {icon} {eyebrow}
        </span>
        <h1 className="mt-4 fw-bold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '40px' }}>
          {title}
        </h1>
        <p className="mt-3 text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
          Last updated {updated}
        </p>
      </div>

      <div className="mt-5 bg-white border p-4 p-md-5 d-flex flex-column gap-5" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
        {sections.map(([h, body]) => (
          <section key={h}>
            <h2 className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
              {h}
            </h2>
            <p className="mt-3 m-0" style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#4B5563', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <LegalShell
      eyebrow="Privacy"
      icon={<Shield size={13} />}
      title="Privacy policy"
      updated="March 14, 2026"
      sections={[
        [
          "Overview",
          "Zootopia collects the minimum information needed to personalize recommendations and deliver your orders. We never sell your data to advertisers or data brokers.",
        ],
        [
          "What we collect",
          "Account details (name, email, address), pet profile information (species, breed, age, weight, preferences), and order history. With your permission, we may also collect delivery preferences and veterinary notes.",
        ],
        [
          "How we use it",
          "To personalize product picks, remind you before refills run out, process orders, prevent fraud, and improve our service. We use aggregated, de-identified data to understand trends.",
        ],
        [
          "Your rights",
          "You can export or delete your data anytime from Account → Privacy. We respond to GDPR and CCPA requests within 30 days.",
        ],
        [
          "Contact",
          "Questions? Email privacy@petcare.example.",
        ],
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalShell
      eyebrow="Terms"
      icon={<FileText size={13} />}
      title="Terms of service"
      updated="March 14, 2026"
      sections={[
        [
          "Agreement",
          "By using Zootopia, you agree to these terms. If you don't agree, please don't use the service.",
        ],
        [
          "Accounts",
          "You're responsible for keeping your login secure and for activity under your account. You must be at least 18 to purchase.",
        ],
        [
          "Subscriptions",
          "Recurring orders charge on the cadence you set. You can pause, skip, or cancel anytime in your dashboard before the next billing date.",
        ],
        [
          "Shipping and returns",
          "See our Shipping and Returns pages for specifics. Refunds follow the policies described there.",
        ],
        [
          "Limitation of liability",
          "Zootopia isn't a veterinary service. Always consult a licensed vet about health concerns for your pet.",
        ],
        [
          "Changes",
          "We may update these terms occasionally. Material changes will be emailed to you at least 14 days before taking effect.",
        ],
      ]}
    />
  );
}

export function Cookies() {
  return (
    <LegalShell
      eyebrow="Cookies"
      icon={<Cookie size={13} />}
      title="Cookie policy"
      updated="March 14, 2026"
      sections={[
        [
          "What cookies are",
          "Small text files your browser stores so sites can remember you between visits.",
        ],
        [
          "How we use them",
          "Essential cookies keep you signed in and your cart filled. Analytics cookies help us understand which features are useful. Preference cookies remember things like your pet's default profile.",
        ],
        [
          "Your choices",
          "You can manage cookies from Account → Privacy, or clear them anytime via your browser settings. Disabling essential cookies may break checkout.",
        ],
        [
          "Third parties",
          "We use a small number of trusted vendors (analytics, error reporting) who are contractually barred from using your data for their own purposes.",
        ],
      ]}
    />
  );
}
