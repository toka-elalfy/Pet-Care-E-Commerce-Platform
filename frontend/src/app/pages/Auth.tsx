import { PawPrint, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { api } from "../api";
import { toast } from "sonner";

function Shell({ title, subtitle, side, children }: any) {
  return (
    <div className="row g-0" style={{ minHeight: 'calc(100vh - 72px)' }}>
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center px-4 py-5 font-manrope">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="rounded-3 text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#0F766E' }}>
              <PawPrint size={18} />
            </div>
            <span className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '18px' }}>Zootopia</span>
          </div>
          <h1 className="fw-bold text-dark lh-sm m-0" style={{ fontFamily: 'Sora', fontSize: '32px' }}>
            {title}
          </h1>
          <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>{subtitle}</p>
          <div className="mt-4 d-flex flex-column gap-3">{children}</div>
        </div>
      </div>
      <div className="d-none d-lg-block col-lg-6 position-relative overflow-hidden" style={{ backgroundColor: '#0F766E' }}>
        <img
          src="https://images.unsplash.com/photo-1702914954859-f037fc75b760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          style={{ opacity: 0.6, mixBlendMode: 'multiply' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to bottom right, rgba(15,118,110,0.8), rgba(15,118,110,0.4))' }} />
        <div className="position-relative p-5 h-100 d-flex flex-column justify-content-end text-white">
          {side}
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder, error, value, onChange }: any) {
  return (
    <label className="d-block w-100 mb-0">
      <span className="d-block fw-semibold text-muted mb-1" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control border shadow-none"
        style={{
          height: '48px', borderRadius: '0.75rem', backgroundColor: '#FFF8F1', fontFamily: 'Manrope', fontSize: '14px',
          borderColor: error ? '#DC2626' : '#E7E2D9'
        }}
      />
      {error && (
        <span className="mt-1 d-block text-danger" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
          {error}
        </span>
      )}
    </label>
  );
}

export function SignUp({
  setRoute,
  register,
}: {
  setRoute: (r: string) => void;
  register: (data: any, onSuccess?: () => void) => Promise<boolean>;
}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    await register({ fname, lname, email, password }, () => {
      setRoute("onboarding");
    });
    setLoading(false);
  };

  return (
    <Shell
      title="Create your Zootopia account"
      subtitle="Your pets deserve better. Set up in under a minute."
      side={
        <>
          <div className="font-[Sora] font-semibold text-[28px] leading-tight max-w-[360px]">
            Join 120,000+ pet parents caring smarter every day.
          </div>
          <ul className="mt-6 space-y-2 font-[Manrope] text-[14px] text-white/85">
            {["Personalized picks for every pet", "Vet-approved products", "Reorder reminders before you run out"].map(
              (l) => (
                <li key={l} className="flex gap-2 items-center">
                  <CheckCircle2 size={16} /> {l}
                </li>
              )
            )}
          </ul>
        </>
      }
    >
      <div className="row g-3">
        <div className="col-6"><Field label="First name" placeholder="Sarah" value={fname} onChange={(e: any) => setFname(e.target.value)} /></div>
        <div className="col-6"><Field label="Last name" placeholder="Johnson" value={lname} onChange={(e: any) => setLname(e.target.value)} /></div>
      </div>
      <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e: any) => setEmail(e.target.value)} />
      <Field label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={(e: any) => setPassword(e.target.value)} />
      <div className="text-muted d-flex flex-column gap-1" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
        <div className="d-flex align-items-center gap-1"><CheckCircle2 size={13} style={{ color: '#16A34A' }} /> 8+ characters</div>
        <div className="d-flex align-items-center gap-1"><CheckCircle2 size={13} style={{ color: '#16A34A' }} /> 1 uppercase, 1 number</div>
      </div>
      <button
        disabled={loading}
        onClick={handleRegister}
        className="btn w-100 rounded-pill text-white fw-semibold d-inline-flex align-items-center justify-content-center gap-2 mt-2" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
      >
        {loading ? "Creating account..." : <>Create account <ArrowRight size={15} /></>}
      </button>
      <div className="text-center text-muted mt-2" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
        Already have an account?{" "}
        <button
          onClick={() => setRoute("login")}
          className="btn btn-link p-0 text-decoration-none shadow-none fw-semibold" style={{ color: '#0F766E' }}
        >
          Sign in
        </button>
      </div>
    </Shell>
  );
}

export function Login({
  setRoute,
  login,
}: {
  setRoute: (r: string) => void;
  login: (data: any) => Promise<boolean>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const success = await login({ email, password });
    setLoading(false);
    if (success) {
      setRoute("dashboard");
    }
  };

  return (
    <Shell
      title="Welcome back"
      subtitle="Sign in to manage your pets, orders, and subscriptions."
      side={
        <div className="font-[Sora] font-semibold text-[28px] leading-tight max-w-[360px]">
          Warm welcomes, happy tails. Pick up right where you left off.
        </div>
      }
    >
      <Field label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e: any) => setEmail(e.target.value)} />
      <Field label="Password" type="password" placeholder="••••••••" value={password} onChange={(e: any) => setPassword(e.target.value)} />
      <div className="d-flex align-items-center justify-content-between mt-2" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
        <label className="d-inline-flex align-items-center gap-2 text-muted m-0">
          <input type="checkbox" defaultChecked className="form-check-input m-0" /> Remember me
        </label>
        <button
          onClick={() => setRoute("forgot")}
          className="btn btn-link p-0 text-decoration-none shadow-none fw-semibold" style={{ color: '#0F766E' }}
        >
          Forgot password?
        </button>
      </div>
      <button
        disabled={loading}
        onClick={handleLogin}
        className="btn w-100 rounded-pill text-white fw-semibold mt-2" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <div className="text-center text-muted mt-2" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
        New to Zootopia?{" "}
        <button
          onClick={() => setRoute("signup")}
          className="btn btn-link p-0 text-decoration-none shadow-none fw-semibold" style={{ color: '#0F766E' }}
        >
          Create account
        </button>
      </div>
    </Shell>
  );
}

export function Forgot({ setRoute }: { setRoute: (r: string) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <Shell
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "We sent a reset link to your email."
          : "Enter the email on your account and we'll send a reset link."
      }
      side={
        <div className="font-[Sora] font-semibold text-[24px] leading-tight max-w-[360px]">
          Forgotten passwords happen. Your pets still love you.
        </div>
      }
    >
      {sent ? (
        <>
          <div className="border rounded-3 p-3" style={{ backgroundColor: 'rgba(167, 199, 163, 0.2)', borderColor: 'rgba(167, 199, 163, 0.5)', fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}>
            Reset link sent. It may take a minute to arrive.
          </div>
          <button
            onClick={() => setRoute("login")}
            className="btn w-100 rounded-pill text-white fw-semibold mt-2" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            Back to sign in
          </button>
        </>
      ) : (
        <>
          <Field label="Email" type="email" placeholder="you@example.com" />
          <button
            onClick={() => setSent(true)}
            className="btn w-100 rounded-pill text-white fw-semibold mt-2" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            Send reset link
          </button>
        </>
      )}
    </Shell>
  );
}

export function Onboarding({ setRoute }: { setRoute: (r: string) => void }) {
  const [form, setForm] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    weight: "",
    size: "Medium",
    prefs: [] as string[],
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const togglePref = (p: string) =>
    setForm((f) => ({
      ...f,
      prefs: f.prefs.includes(p)
        ? f.prefs.filter((x) => x !== p)
        : [...f.prefs, p],
    }));

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Please enter a name for your pet.");
      return;
    }
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("type", form.type);
      payload.append("size", form.size);
      if (form.breed) payload.append("breed", form.breed);
      if (form.age) payload.append("age", form.age);
      if (form.weight) payload.append("weight", form.weight);
      form.prefs.forEach((p) => payload.append("needs", p));

      if (file) {
        payload.append("photo", file);
      }

      await api.pets.create(payload);
      toast.success("Pet profile created!");
      setRoute("recommendations");
    } catch (err: any) {
      toast.error(err.message || "Failed to save pet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '760px' }}>
      <div className="text-center">
        <div className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
          <PawPrint size={13} /> Welcome to Zootopia
        </div>
        <h1 className="mt-3 fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '32px' }}>
          Tell us about your first pet
        </h1>
        <p className="mt-2 text-muted mx-auto" style={{ fontFamily: 'Manrope', fontSize: '14px', maxWidth: '440px' }}>
          It only takes a minute — we'll use this to personalize every
          recommendation.
        </p>
      </div>

      <div className="mt-5 bg-white border p-4 p-md-5 d-flex flex-column gap-4" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
        <Field label="Pet's name" placeholder="e.g. Bella" value={form.name} onChange={(e: any) => setForm(f => ({ ...f, name: e.target.value }))} />
        <div>
          <span className="d-block fw-semibold text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
            Pet photo (optional)
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => e.target.files?.[0] && setFile(e.target.files[0])}
            className="form-control border shadow-none"
            style={{
              borderRadius: '0.75rem', backgroundColor: '#FFF8F1', fontFamily: 'Manrope', fontSize: '14px',
              borderColor: '#E7E2D9'
            }}
          />
        </div>
        <div>
          <span className="d-block fw-semibold text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
            Pet type
          </span>
          <div className="d-flex flex-wrap gap-2">
            {["Dog", "Cat", "Rabbit", "Bird"].map((t) => (
              <button
                key={t}
                onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`btn rounded-pill border fw-semibold px-4 ${form.type === t
                  ? "text-white"
                  : "bg-white text-dark"
                  }`}
                style={{
                  height: '44px', fontFamily: 'Manrope', fontSize: '13px',
                  backgroundColor: form.type === t ? '#0F766E' : 'white',
                  borderColor: form.type === t ? '#0F766E' : '#E7E2D9'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="row g-3">
          <div className="col-12 col-md-6"><Field label="Breed" placeholder="Golden Retriever" value={form.breed} onChange={(e: any) => setForm(f => ({ ...f, breed: e.target.value }))} /></div>
          <div className="col-12 col-md-6"><Field label="Age" placeholder="3 years" value={form.age} onChange={(e: any) => setForm(f => ({ ...f, age: e.target.value }))} /></div>
          <div className="col-12 col-md-6"><Field label="Weight" placeholder="28 kg" value={form.weight} onChange={(e: any) => setForm(f => ({ ...f, weight: e.target.value }))} /></div>
          <div className="col-12 col-md-6">
            <span className="d-block fw-semibold text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
              Size
            </span>
            <div className="d-flex gap-2">
              {["Small", "Medium", "Large"].map((s) => (
                <button
                  key={s}
                  onClick={() => setForm(f => ({ ...f, size: s }))}
                  className={`btn rounded-pill flex-grow-1 border fw-semibold ${form.size === s
                    ? "text-white"
                    : "bg-white text-dark"
                    }`}
                  style={{
                    height: '44px', fontFamily: 'Manrope', fontSize: '13px',
                    backgroundColor: form.size === s ? '#0F766E' : 'white',
                    borderColor: form.size === s ? '#0F766E' : '#E7E2D9'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <span className="d-block fw-semibold text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
            Preferences & needs
          </span>
          <div className="d-flex flex-wrap gap-2">
            {[
              "Grain-free",
              "Joint support",
              "Sensitive skin",
              "Puppy growth",
              "Weight management",
              "Dental care",
            ].map((t) => (
              <button
                key={t}
                onClick={() => togglePref(t)}
                className={`btn rounded-pill border px-3 py-1 ${form.prefs.includes(t) ? 'text-white' : 'bg-transparent text-dark'}`}
                style={{
                  height: '36px',
                  backgroundColor: form.prefs.includes(t) ? '#0F766E' : 'transparent',
                  borderColor: form.prefs.includes(t) ? '#0F766E' : '#E7E2D9',
                  fontFamily: 'Manrope', fontSize: '12px'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 d-flex justify-content-between align-items-center">
          <button
            onClick={() => setRoute("dashboard")}
            className="btn btn-link p-0 text-decoration-none shadow-none text-muted"
            style={{ fontFamily: 'Manrope', fontSize: '13px' }}
          >
            Skip for now
          </button>
          <button
            disabled={saving}
            onClick={handleSave}
            className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 px-4"
            style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            {saving ? "Saving..." : <>See recommendations <ArrowRight size={15} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
