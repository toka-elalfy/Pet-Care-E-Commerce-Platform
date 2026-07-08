import { useState, useEffect } from "react";
import { ArrowLeft, Check, Trash2, Loader2 } from "lucide-react";
import { useParams } from "react-router";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";
import { toast } from "sonner";

export function PetForm({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const { id } = useParams();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    weight: "",
    size: "Medium",
    prefs: [] as string[],
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [existing, setExisting] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      api.pets.getAll().then(res => {
        const allPets = Array.isArray(res) ? res : res?.pets || res?.data || [];
        const found = allPets.find((p: any) => p._id === id || p.id === id);
        if (found) {
          setExisting(found);
          setForm({
            name: found.name || "",
            type: found.type || "Dog",
            breed: found.breed || "",
            age: found.age?.toString() || "",
            weight: found.weight?.toString() || "",
            size: found.size || "Medium",
            prefs: Array.isArray(found.needs) ? found.needs : (found.needs ? found.needs.split(",").map((s: string) => s.trim()) : [])
          });
        }
      }).catch(console.error).finally(() => setLoading(false));
    }
  }, [id]);

  const togglePref = (p: string) =>
    setForm((f) => ({
      ...f,
      prefs: f.prefs.includes(p)
        ? f.prefs.filter((x) => x !== p)
        : [...f.prefs, p],
    }));

  const handleSave = async () => {
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

      if (photo) {
        payload.append("photo", photo);
      }

      if (isEdit && id) {
        await api.pets.update(id, payload);
      } else {
        await api.pets.create(payload);
      }
      toast.success(isEdit ? "Pet profile updated." : "Pet profile created.");
      setRoute("pets");
    } catch (e: any) {
      toast.error(e.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Are you sure you want to remove this pet profile?")) {
      try {
        await api.pets.delete(id);
        toast.success("Pet profile removed.");
        setRoute("pets");
      } catch (e: any) {
        toast.error(e.message || "Failed to remove pet.");
      }
    }
  };


  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title={isEdit ? `Edit ${existing?.name || 'pet'}'s profile` : "Add a new pet"}
      subtitle="Pet profile data powers personalization across the platform."
      actions={
        <button
          onClick={() => setRoute("pets")}
          className="h-11 px-4 rounded-full bg-white border border-[#E7E2D9] font-[Manrope] font-semibold text-[13px] inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Back to pets
        </button>
      }
    >
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-secondary" role="status" />
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8 d-flex flex-column gap-4">
            <Section title="Basic info">
              <Field
                label="Pet's name"
                value={form.name}
                onChange={(v: string) => setForm((f) => ({ ...f, name: v }))}
                placeholder="e.g. Bella"
              />
              <div>
                <Label>Pet Photo (optional)</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => e.target.files?.[0] && setPhoto(e.target.files[0])}
                  className="form-control border shadow-none"
                  style={{ height: '44px', borderRadius: '0.75rem', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '14px' }}
                />
              </div>
              <div>
                <Label>Animal type</Label>
                <div className="d-flex flex-wrap gap-2">
                  {["Dog", "Cat", "Rabbit", "Bird"].map((t) => (
                    <Chip
                      key={t}
                      active={form.type === t}
                      onClick={() =>
                        setForm((f) => ({ ...f, type: t as any }))
                      }
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <Field
                    label="Breed"
                    value={form.breed}
                    onChange={(v: string) => setForm((f) => ({ ...f, breed: v }))}
                    placeholder="Golden Retriever"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Field
                    label="Age"
                    value={form.age}
                    onChange={(v: string) => setForm((f) => ({ ...f, age: v }))}
                    placeholder="3 years"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Field
                    label="Weight"
                    value={form.weight}
                    onChange={(v: string) => setForm((f) => ({ ...f, weight: v }))}
                    placeholder="28 kg"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Label>Size</Label>
                  <div className="d-flex gap-2">
                    {["Small", "Medium", "Large"].map((s) => (
                      <Chip
                        key={s}
                        active={form.size === s}
                        onClick={() =>
                          setForm((f) => ({ ...f, size: s as any }))
                        }
                        className="flex-1"
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Preferences & needs">
              <p className="text-muted mb-3" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                These directly drive smart filtering on the shop.
              </p>
              <div className="d-flex flex-wrap gap-2">
                {[
                  "Grain-free",
                  "Joint support",
                  "Sensitive skin",
                  "Puppy growth",
                  "Weight management",
                  "Dental care",
                  "Hairball control",
                  "Kidney health",
                ].map((p) => (
                  <Chip
                    key={p}
                    active={form.prefs.includes(p)}
                    onClick={() => togglePref(p)}
                  >
                    {p}
                  </Chip>
                ))}
              </div>
            </Section>

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              {isEdit && (
                <button onClick={handleDelete} className="btn btn-outline-danger rounded-pill fw-semibold border d-inline-flex align-items-center gap-2" style={{ height: '44px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}>
                  <Trash2 size={14} /> Delete profile
                </button>
              )}
              <div className="d-flex gap-2 ms-auto">
                <button
                  onClick={() => setRoute("pets")}
                  className="btn btn-light rounded-pill border fw-semibold bg-white text-dark"
                  style={{ height: '44px', padding: '0 1.25rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn rounded-pill border-0 text-white fw-semibold"
                  style={{ height: '44px', padding: '0 1.5rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '13px' }}
                >
                  {saving ? "Saving..." : isEdit ? "Save changes" : "Create profile"}
                </button>
              </div>
            </div>
          </div>

          <aside className="col-12 col-lg-4 d-flex flex-column gap-4">
            <div className="text-white p-4" style={{ backgroundColor: '#0F766E', borderRadius: '1rem' }}>
              <div className="fw-semibold text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', opacity: 0.7 }}>
                Why we ask
              </div>
              <h3 className="mt-2 fw-semibold lh-sm m-0" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                Pet data powers the whole platform.
              </h3>
              <ul className="mt-3 list-unstyled d-flex flex-column gap-2 m-0" style={{ fontFamily: 'Manrope', fontSize: '13px', opacity: 0.85 }}>
                <li>• Narrows the catalog to what fits this pet</li>
                <li>• Sets portion sizes for reorder reminders</li>
                <li>• Matches subscription frequencies to real use</li>
              </ul>
            </div>
            <div className="bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
              <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                Preview card
              </div>
              <div className="mt-3 p-3 overflow-hidden" style={{ backgroundColor: '#FFF8F1', borderRadius: '0.75rem' }}>
                <div className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                  {form.name || "Your pet"}
                </div>
                <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  {form.type} · {form.breed || "breed"} · {form.age || "age"} ·{" "}
                  {form.weight || "weight"}
                </div>
                {form.prefs.length > 0 && (
                  <div className="mt-3 d-flex flex-wrap gap-1">
                    {form.prefs.map((p) => (
                      <span
                        key={p}
                        className="fw-semibold rounded-pill"
                        style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '11px', padding: '0.125rem 0.5rem' }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      )
      }
    </DashboardShell >
  );
}

function Section({ title, children }: any) {
  return (
    <div className="bg-white border p-4 p-md-5 d-flex flex-column gap-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
      <div className="fw-semibold text-dark m-0 pb-1 border-bottom" style={{ fontFamily: 'Sora', fontSize: '16px', borderColor: '#E7E2D9' }}>
        {title}
      </div>
      <div className="d-flex flex-column gap-3">{children}</div>
    </div>
  );
}

function Label({ children }: any) {
  return (
    <span className="d-block fw-semibold text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
      {children}
    </span>
  );
}

function Field({ label, value, onChange, placeholder }: any) {
  return (
    <label className="d-block w-100 mt-3 mt-md-0">
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-control border shadow-none"
        style={{ height: '44px', borderRadius: '0.75rem', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '14px' }}
      />
    </label>
  );
}

function Chip({ children, active, onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`btn rounded-pill border fw-semibold px-3 ${active ? 'text-white' : 'bg-white text-dark'} ${className}`}
      style={{
        height: '40px', fontFamily: 'Manrope', fontSize: '13px',
        backgroundColor: active ? '#0F766E' : 'white',
        borderColor: active ? '#0F766E' : '#E7E2D9'
      }}
    >
      {children}
    </button>
  );
}
