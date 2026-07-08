import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CreditCard,
  HelpCircle,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  PawPrint,
  Sparkles,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
export function HowItWorks({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '1080px' }}>
      <div className="text-center mx-auto" style={{ maxWidth: '640px' }}>
        <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
          <Sparkles size={13} /> How Zootopia works
        </span>
        <h1 className="mt-4 fw-bold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '42px' }}>
          Personalized pet care in three simple steps.
        </h1>
        <p className="mt-3 text-muted" style={{ fontFamily: 'Manrope', fontSize: '16px' }}>
          Smarter than generic shopping. More attentive than a calendar alarm.
        </p>
      </div>

      <div className="mt-5 pt-4 row g-4">
        {[
          ["Create a pet profile", "Species, breed, age, weight — we keep it simple."],
          ["Get matched picks", "Vet-reviewed products filtered for each pet."],
          ["We remind you before you run out", "Subscribe, skip, pause — you're always in control."],
        ].map(([t, d], i) => (
          <div key={t} className="col-12 col-md-4">
            <div className="bg-white border p-4 p-md-5 h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <div className="rounded-3 text-white fw-bold d-flex align-items-center justify-content-center mb-4" style={{ width: '40px', height: '40px', backgroundColor: '#0F766E', fontFamily: 'Sora' }}>
                {i + 1}
              </div>
              <div className="fw-semibold text-dark mb-2" style={{ fontFamily: 'Sora', fontSize: '20px' }}>{t}</div>
              <p className="text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '14px', lineHeight: '1.6' }}>{d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border p-4 p-md-5 text-center" style={{ backgroundColor: '#FFF8F1', borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
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
    </div>
  );
}

export function Help({ setRoute }: { setRoute: (r: string) => void }) {
  const groups = [
    {
      title: "Orders",
      qs: [
        ["When will my order ship?", "Most orders ship within 24 hours on business days."],
        ["Can I change my order after placing it?", "You can edit or cancel within 30 minutes of checkout."],
        ["What's the return policy?", "Free 30-day returns on any unopened item."],
      ],
    },
    {
      title: "Subscriptions",
      qs: [
        ["How do I pause or skip?", "Open Subscriptions in your dashboard and tap Pause or Skip next delivery."],
        ["Can I change frequency?", "Yes — anytime, and next delivery recalculates automatically."],
      ],
    },
    {
      title: "Pet profiles",
      qs: [
        ["How do breed/age affect picks?", "They narrow the catalog to the nutrition and size your pet needs."],
        ["Can I add multiple pets?", "Absolutely. Each pet gets its own recommendations."],
      ],
    },
  ];

  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '1080px' }}>
      <div className="text-center">
        <div className="d-inline-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', borderRadius: '1rem', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
          <HelpCircle size={22} />
        </div>
        <h1 className="mt-4 fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '40px' }}>
          How can we help?
        </h1>
        <div className="mt-4 mx-auto" style={{ maxWidth: '520px' }}>
          <input
            placeholder="Search help articles…"
            className="form-control rounded-pill shadow-none"
            style={{ height: '56px', border: '1px solid #E7E2D9', padding: '0 24px', fontFamily: 'Manrope', fontSize: '15px' }}
          />
        </div>
      </div>

      <div className="mt-5 pt-4 row g-4">
        {groups.map((g) => (
          <div key={g.title} className="col-12 col-md-4">
            <div className="fw-semibold text-dark mb-3" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
              {g.title}
            </div>
            <div className="d-flex flex-column gap-2">
              {g.qs.map(([q, a]) => (
                <details
                  key={q}
                  className="bg-white border p-3 group faq-item"
                  style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
                >
                  <summary className="cursor-pointer fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '14px', listStyle: 'none' }}>
                    {q}
                  </summary>
                  <p className="mt-2 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 p-4 p-md-5 text-white d-flex flex-wrap align-items-center justify-content-between gap-4" style={{ borderRadius: '1.5rem', backgroundColor: '#0F766E' }}>
        <div>
          <div className="fw-semibold text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255, 255, 255, 0.7)' }}>
            Still need help?
          </div>
          <h2 className="mt-2 fw-semibold" style={{ fontFamily: 'Sora', fontSize: '26px', maxWidth: '420px' }}>
            Our care team replies in under an hour, every day.
          </h2>
        </div>
        <button className="btn rounded-pill bg-white fw-semibold d-inline-flex align-items-center gap-2 px-4 shadow-none" style={{ height: '48px', color: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}>
          <MessageCircle size={15} /> Contact support
        </button>
      </div>
    </div>
  );
}

export function PublicSubs({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '1080px' }}>
      <div className="text-center mx-auto" style={{ maxWidth: '680px' }}>
        <h1 className="fw-bold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '44px' }}>
          Subscribe, save, and never run out.
        </h1>
        <p className="mt-4 text-muted" style={{ fontFamily: 'Manrope', fontSize: '16px' }}>
          Save 15% on every recurring delivery. Pause, skip, or cancel anytime.
        </p>
      </div>
      <div className="mt-5 pt-3 row g-4">
        {[
          ["Every 2 weeks", "For active pets or big households", "$39+", false],
          ["Every 4 weeks", "Most popular cadence", "$49+", true],
          ["Every 8 weeks", "Great for treats and toys", "$59+", false],
        ].map(([t, d, p, featured]: any) => (
          <div key={t} className="col-12 col-md-4">
            <div
              className={`p-4 p-lg-5 border h-100 position-relative`}
              style={{
                borderRadius: '1.5rem',
                backgroundColor: featured ? '#0F766E' : 'white',
                borderColor: featured ? '#0F766E' : '#E7E2D9',
                boxShadow: featured ? '0 20px 40px -15px rgba(15,118,110,0.3)' : 'none'
              }}
            >
              {featured && (
                <span className="d-inline-block fw-semibold text-white px-2 py-1 rounded-pill text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.1em', backgroundColor: '#F97360' }}>
                  Most popular
                </span>
              )}
              <div className={`mt-3 fw-semibold ${featured ? "text-white" : "text-dark"}`} style={{ fontFamily: 'Sora', fontSize: '22px' }}>
                {t}
              </div>
              <p className={`mt-2 ${featured ? "text-white opacity-75" : "text-muted"}`} style={{ fontFamily: 'Manrope', fontSize: '13px' }}>{d}</p>
              <div className={`mt-4 pt-2 fw-bold ${featured ? "text-white" : "text-dark"}`} style={{ fontFamily: 'Sora', fontSize: '32px' }}>{p}</div>
              <button
                onClick={() => setRoute("shop")}
                className={`w-100 btn rounded-pill fw-semibold mt-4`}
                style={{
                  height: '44px', fontFamily: 'Manrope', fontSize: '14px',
                  backgroundColor: featured ? 'white' : '#0F766E',
                  color: featured ? '#0F766E' : 'white'
                }}
              >
                Choose products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Account({ setRoute: _setRoute }: { setRoute: (r: string) => void }) {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const [open, setOpen] = useState<string | null>(null);

  const [personal, setPersonal] = useState({
    name: user?.firstName ? `${user.firstName} ${user?.lastName || ""}`.trim() : (user?.name || "Your Name"),
    email: user?.email || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (user) {
      setPersonal({
        name: user.firstName ? `${user.firstName} ${user?.lastName || ""}`.trim() : (user.name || ""),
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleSavePersonal = async (v: { name: string; email: string; phone: string }) => {
    try {
      const parts = v.name.trim().split(" ");
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ");
      await api.user.updateProfile({
        firstName,
        lastName,
        email: v.email,
        phone: v.phone
      });
      setPersonal(v);
      setOpen(null);
      toast.success("Personal info updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  const handleSaveSecurity = async () => {
    if (!security.current || security.next !== security.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await api.user.updatePassword({
        currentPassword: security.current,
        newPassword: security.next
      });
      setSecurity({ current: "", next: "", confirm: "" });
      setOpen(null);
      toast.success("Password updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update password");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      try {
        await api.user.deleteAccount();
        toast.success("Account deleted.");
        handleLogout();
      } catch (err: any) {
        toast.error(err.message || "Failed to delete account.");
      }
    }
  };

  const addresses = user?.addresses || [];
  const [payments, setPayments] = useState([
    { id: "p1", brand: "Visa", last4: "4242", exp: "08/28", primary: true },
  ]);
  const [security, setSecurity] = useState({ current: "", next: "", confirm: "" });
  const [notifications, setNotifications] = useState({
    reminders: true,
    orders: true,
    promos: false,
    productUpdates: true,
    email: true,
    sms: false,
  });

  const sections: Array<{
    id: string;
    icon: any;
    title: string;
    summary: string;
  }> = [
      {
        id: "personal",
        icon: User,
        title: "Personal info",
        summary: `${personal.name} · ${personal.email}`,
      },
      {
        id: "addresses",
        icon: MapPin,
        title: "Address book",
        summary: `${addresses.length} saved ${addresses.length === 1 ? "address" : "addresses"}`,
      },
      {
        id: "payments",
        icon: CreditCard,
        title: "Payment methods",
        summary: payments.length
          ? `${payments[0].brand} ending ${payments[0].last4}`
          : "No payment methods",
      },
      {
        id: "security",
        icon: Lock,
        title: "Password & security",
        summary: "Last changed 2 months ago",
      },
      {
        id: "notifications",
        icon: Bell,
        title: "Notification preferences",
        summary: `${Object.values(notifications).filter(Boolean).length} channels on`,
      },
    ];

  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '960px' }}>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-link p-0 text-decoration-none shadow-none text-muted d-inline-flex align-items-center gap-2 mb-4"
        style={{ fontFamily: 'Manrope', fontSize: '13px' }}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      <h1 className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '32px' }}>
        Account settings
      </h1>
      <p className="mt-2 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
        Manage personal info, addresses, payments, and preferences.
      </p>

      <div className="mt-5 d-flex flex-column gap-3">
        {sections.map((s) => {
          const isOpen = open === s.id;
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="bg-white border overflow-hidden"
              style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : s.id)}
                className="w-100 btn btn-link text-decoration-none shadow-none p-4 d-flex align-items-center gap-3 hover-bg-light"
              >
                <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                  <Icon size={17} />
                </div>
                <div className="flex-grow-1 text-start">
                  <div className="fw-semibold text-dark mb-1" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                    {s.title}
                  </div>
                  <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                    {s.summary}
                  </div>
                </div>
                <div
                  className={`d-inline-flex align-items-center justify-content-center px-3 rounded-pill fw-semibold border`}
                  style={{
                    height: '36px', fontFamily: 'Manrope', fontSize: '12px',
                    backgroundColor: isOpen ? '#0F766E' : '#FFF8F1',
                    borderColor: isOpen ? '#0F766E' : '#E7E2D9',
                    color: isOpen ? 'white' : '#1F2937'
                  }}
                >
                  {isOpen ? "Close" : "Edit"}
                </div>
              </button>

              {isOpen && (
                <div className="p-4" style={{ borderTop: '1px solid #E7E2D9', backgroundColor: '#FFF8F1' }}>
                  {s.id === "personal" && (
                    <PersonalForm
                      value={personal}
                      onSave={handleSavePersonal}
                    />
                  )}
                  {s.id === "addresses" && (
                    <AddressBook
                      addresses={addresses}
                      refreshUser={refreshUser}
                    />
                  )}
                  {s.id === "payments" && (
                    <PaymentsBook payments={payments} setPayments={setPayments} />
                  )}
                  {s.id === "security" && (
                    <SecurityForm
                      value={security}
                      setValue={setSecurity}
                      onSave={handleSaveSecurity}
                    />
                  )}
                  {s.id === "notifications" && (
                    <NotificationsForm
                      value={notifications}
                      setValue={setNotifications}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 bg-white border p-4 d-flex align-items-center justify-content-between" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
        <div>
          <div className="fw-semibold text-danger mb-1" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
            Delete account
          </div>
          <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
            Permanently remove your data, pets, and subscriptions.
          </div>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="btn rounded-pill bg-white border fw-semibold px-4 shadow-none"
          style={{ height: '36px', borderColor: '#FCA5A5', color: '#DC2626', fontFamily: 'Manrope', fontSize: '12px' }}
        >
          Delete
        </button>
      </div>

      <div className="mt-3 mb-5 bg-white border p-4 d-flex align-items-center justify-content-between" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
        <div>
          <div className="fw-semibold text-dark mb-1" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
            Sign out
          </div>
          <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
            Securely sign out of your account on this device.
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn rounded-pill bg-white border fw-semibold px-4 text-dark shadow-none"
          style={{ height: '36px', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '12px' }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: any;
}) {
  const Icon = icon;
  return (
    <div>
      <label className="fw-semibold text-muted mb-2 d-block" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
        {label}
      </label>
      <div className="position-relative">
        {Icon && (
          <Icon
            size={15}
            className="position-absolute text-muted"
            style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }}
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-control"
          style={{
            height: '44px', borderRadius: '22px', border: '1px solid #E7E2D9',
            backgroundColor: 'white', padding: Icon ? '0 16px 0 44px' : '0 16px',
            fontFamily: 'Manrope', fontSize: '14px', boxShadow: 'none'
          }}
        />
      </div>
    </div>
  );
}

function SaveRow({
  onSave,
  onCancel,
  saveLabel = "Save changes",
}: {
  onSave: () => void;
  onCancel?: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="mt-4 d-flex gap-2 justify-content-end">
      {onCancel && (
        <button
          onClick={onCancel}
          className="btn rounded-pill bg-white border text-dark fw-semibold px-4 shadow-none"
          style={{ height: '40px', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '13px' }}
        >
          Cancel
        </button>
      )}
      <button
        onClick={onSave}
        className="btn rounded-pill text-white fw-semibold px-4 shadow-none"
        style={{ height: '40px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '13px' }}
      >
        {saveLabel}
      </button>
    </div>
  );
}

function PersonalForm({
  value,
  onSave,
}: {
  value: { name: string; email: string; phone: string };
  onSave: (v: { name: string; email: string; phone: string }) => void;
}) {
  const [v, setV] = useState(value);
  return (
    <div>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <Field label="Full name" value={v.name} onChange={(name) => setV({ ...v, name })} icon={User} />
        </div>
        <div className="col-12 col-md-6">
          <Field label="Email" type="email" value={v.email} onChange={(email) => setV({ ...v, email })} icon={Mail} />
        </div>
        <div className="col-12 col-md-6">
          <Field label="Phone" value={v.phone} onChange={(phone) => setV({ ...v, phone })} />
        </div>
      </div>
      <SaveRow onSave={() => onSave(v)} />
    </div>
  );
}

function AddressBook({
  addresses,
  refreshUser,
}: {
  addresses: Array<{ _id: string; label: string; street: string; city: string; country: string; postalCode: string; isPrimary: boolean }>;
  refreshUser: () => Promise<void>;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ label: "", street: "", city: "", country: "", postalCode: "" });

  const makePrimary = async (id: string) => {
    try {
      await api.user.updatePrimaryAddress(id);
      await refreshUser();
      toast.success("Primary address updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update priority");
    }
  };

  const remove = async (id: string) => {
    try {
      await api.user.removeAddress(id);
      await refreshUser();
      toast.success("Address removed");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove address");
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      {addresses.map((a) => (
        <div
          key={a._id}
          className="bg-white border p-3 d-flex flex-wrap align-items-center gap-3"
          style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
        >
          <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
            <MapPin size={15} />
          </div>
          <div className="flex-grow-1" style={{ minWidth: '200px' }}>
            <div className="fw-semibold text-dark d-flex align-items-center gap-2 mb-1" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
              {a.label}
              {a.isPrimary && (
                <span className="rounded-pill fw-semibold text-uppercase" style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', padding: '2px 8px', fontFamily: 'Manrope', fontSize: '10px', letterSpacing: '0.1em' }}>
                  Primary
                </span>
              )}
            </div>
            <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{a.street}, {a.city}, {a.country} {a.postalCode}</div>
          </div>
          {!a.isPrimary && (
            <button
              onClick={() => makePrimary(a._id)}
              className="btn rounded-pill bg-white border fw-semibold px-3 shadow-none"
              style={{ height: '32px', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '11px' }}
            >
              Make primary
            </button>
          )}
          <button
            onClick={() => remove(a._id)}
            className="btn rounded-pill bg-white border fw-semibold px-3 shadow-none"
            style={{ height: '32px', borderColor: '#FCA5A5', color: '#DC2626', fontFamily: 'Manrope', fontSize: '11px' }}
          >
            Remove
          </button>
        </div>
      ))}

      {adding ? (
        <div className="bg-white border p-3" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <Field label="Label (e.g Home)" value={draft.label} onChange={(label) => setDraft({ ...draft, label })} />
            </div>
            <div className="col-12 col-md-6">
              <Field label="Street Address" value={draft.street} onChange={(street) => setDraft({ ...draft, street })} />
            </div>
            <div className="col-12 col-md-4">
              <Field label="City" value={draft.city} onChange={(city) => setDraft({ ...draft, city })} />
            </div>
            <div className="col-12 col-md-4">
              <Field label="State / Country" value={draft.country} onChange={(country) => setDraft({ ...draft, country })} />
            </div>
            <div className="col-12 col-md-4">
              <Field label="ZIP Code" value={draft.postalCode} onChange={(postalCode) => setDraft({ ...draft, postalCode })} />
            </div>
            <div className="col-12">
              <SaveRow
                saveLabel="Add address"
                onCancel={() => {
                  setAdding(false);
                  setDraft({ label: "", street: "", city: "", country: "", postalCode: "" });
                }}
                onSave={async () => {
                  if (!draft.label || !draft.street || !draft.city || !draft.country || !draft.postalCode) {
                    toast.error("Please fill all address fields");
                    return;
                  }
                  try {
                    await api.user.addAddress({
                      ...draft,
                      isPrimary: addresses.length === 0
                    });
                    await refreshUser();
                    setDraft({ label: "", street: "", city: "", country: "", postalCode: "" });
                    setAdding(false);
                    toast.success("Address added");
                  } catch (err: any) {
                    toast.error(err.message || "Failed to add address");
                  }
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="btn w-100 fw-semibold text-muted shadow-none hover-text-primary"
          style={{ height: '44px', borderRadius: '1rem', border: '2px dashed #E7E2D9', fontFamily: 'Manrope', fontSize: '13px' }}
        >
          + Add new address
        </button>
      )}
    </div>
  );
}

function PaymentsBook({
  payments,
  setPayments,
}: {
  payments: Array<{ id: string; brand: string; last4: string; exp: string; primary: boolean }>;
  setPayments: (v: any) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ number: "", exp: "", cvc: "" });
  const remove = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id));
    toast.success("Payment method removed");
  };
  const brandOf = (n: string) =>
    n.startsWith("4") ? "Visa" : n.startsWith("5") ? "Mastercard" : "Card";

  return (
    <div className="d-flex flex-column gap-3">
      {payments.map((p) => (
        <div
          key={p.id}
          className="bg-white border p-3 d-flex align-items-center gap-3"
          style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
        >
          <div className="rounded text-white fw-semibold d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '28px', background: 'linear-gradient(to bottom right, #0F766E, #134E4A)', fontFamily: 'Manrope', fontSize: '10px' }}>
            {p.brand.slice(0, 4).toUpperCase()}
          </div>
          <div className="flex-grow-1">
            <div className="fw-semibold text-dark mb-1" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
              {p.brand} ending {p.last4}
            </div>
            <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
              Expires {p.exp} {p.primary && "· Primary"}
            </div>
          </div>
          <button
            onClick={() => remove(p.id)}
            className="btn rounded-pill bg-white border fw-semibold px-3 shadow-none flex-shrink-0"
            style={{ height: '32px', borderColor: '#FCA5A5', color: '#DC2626', fontFamily: 'Manrope', fontSize: '11px' }}
          >
            Remove
          </button>
        </div>
      ))}

      {adding ? (
        <div className="bg-white border p-3" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
          <div className="row g-3">
            <div className="col-12">
              <Field
                label="Card number"
                value={draft.number}
                onChange={(number) => setDraft({ ...draft, number })}
                icon={CreditCard}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field label="Expiry (MM/YY)" value={draft.exp} onChange={(exp) => setDraft({ ...draft, exp })} />
            </div>
            <div className="col-12 col-md-6">
              <Field label="CVC" value={draft.cvc} onChange={(cvc) => setDraft({ ...draft, cvc })} />
            </div>
            <div className="col-12">
              <SaveRow
                saveLabel="Add card"
                onCancel={() => {
                  setAdding(false);
                  setDraft({ number: "", exp: "", cvc: "" });
                }}
                onSave={() => {
                  const digits = draft.number.replace(/\s/g, "");
                  if (digits.length < 4 || !draft.exp) {
                    toast.error("Enter a valid card");
                    return;
                  }
                  setPayments([
                    ...payments,
                    {
                      id: `p${Date.now()}`,
                      brand: brandOf(digits),
                      last4: digits.slice(-4),
                      exp: draft.exp,
                      primary: payments.length === 0,
                    },
                  ]);
                  setDraft({ number: "", exp: "", cvc: "" });
                  setAdding(false);
                  toast.success("Card added");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="btn w-100 fw-semibold text-muted shadow-none hover-text-primary"
          style={{ height: '44px', borderRadius: '1rem', border: '2px dashed #E7E2D9', fontFamily: 'Manrope', fontSize: '13px' }}
        >
          + Add new card
        </button>
      )}
    </div>
  );
}

function SecurityForm({
  value,
  setValue,
  onSave,
}: {
  value: { current: string; next: string; confirm: string };
  setValue: (v: any) => void;
  onSave: () => void;
}) {
  return (
    <div>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <Field
            label="Current password"
            type="password"
            value={value.current}
            onChange={(current) => setValue({ ...value, current })}
          />
        </div>
        <div className="col-12 col-md-4">
          <Field
            label="New password"
            type="password"
            value={value.next}
            onChange={(next) => setValue({ ...value, next })}
          />
        </div>
        <div className="col-12 col-md-4">
          <Field
            label="Confirm new password"
            type="password"
            value={value.confirm}
            onChange={(confirm) => setValue({ ...value, confirm })}
          />
        </div>
      </div>
      <SaveRow onSave={onSave} saveLabel="Update password" />
    </div>
  );
}

function NotificationsForm({
  value,
  setValue,
}: {
  value: Record<string, boolean>;
  setValue: (v: any) => void;
}) {
  const rows: Array<[string, string, string]> = [
    ["reminders", "Reorder reminders", "Alerts before food and meds run out"],
    ["orders", "Order updates", "Shipping confirmations and delivery alerts"],
    ["promos", "Promotions", "Sales, bundles, and seasonal offers"],
    ["productUpdates", "Product updates", "New arrivals matched to your pet"],
    ["email", "Email channel", "Receive notifications by email"],
    ["sms", "SMS channel", "Receive notifications by text"],
  ];
  const toggle = (k: string, t: string) => {
    const nextVal = !value[k];
    setValue({ ...value, [k]: nextVal });
    toast.success(`${t} ${nextVal ? "on" : "off"}`);
  };
  return (
    <div className="d-flex flex-column gap-2">
      {rows.map(([k, t, d]) => (
        <div
          key={k}
          role="button"
          tabIndex={0}
          onClick={() => toggle(k, t)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle(k, t);
            }
          }}
          className="d-flex align-items-center gap-3 bg-white border p-3 hover-border-primary cursor-pointer"
          style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
        >
          <div className="flex-grow-1">
            <div className="fw-semibold text-dark mb-1" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{t}</div>
            <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{d}</div>
          </div>
          <Toggle checked={!!value[k]} />
        </div>
      ))}
    </div>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <div className="form-check form-switch m-0 d-flex align-items-center">
      <input
        className="form-check-input shadow-none m-0"
        type="checkbox"
        checked={checked}
        readOnly
        style={{ width: '44px', height: '24px', backgroundColor: checked ? '#0F766E' : '#E7E2D9', borderColor: 'transparent', cursor: 'pointer' }}
      />
    </div>
  );
}
