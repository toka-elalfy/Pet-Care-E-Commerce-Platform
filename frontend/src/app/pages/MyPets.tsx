import { Plus, Pencil, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { DashboardShell } from "../components/ui/DashboardShell";
import { useEffect, useState } from "react";
import { api } from "../api";
import { toast } from "sonner";

export function MyPets({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const navigate = useNavigate();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const res = await api.pets.getAll();
      setPets(Array.isArray(res) ? res : res?.pets || res?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this pet profile?")) {
      try {
        await api.pets.delete(id);
        toast.success("Pet removed successfully.");
        fetchPets();
      } catch (e: any) {
        toast.error(e.message || "Failed to remove pet.");
      }
    }
  };

  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title="My pets"
      subtitle="Keep profiles up to date for better recommendations."
      actions={
        <button
          onClick={() => navigate("/pets/new")}
          className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 shadow-sm border-0"
          style={{ height: '44px', padding: '0 1.25rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
        >
          <Plus size={16} /> Add a pet
        </button>
      }
    >
      <div className="row g-4">
        {loading ? (
          <div className="col-12 py-5 d-flex justify-content-center">
            <Loader2 className="spinner-border text-secondary" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <>
            {pets.map((p) => (
              <div key={p.id || p._id} className="col-12 col-md-6 col-xl-4">
                <div className="bg-white border overflow-hidden d-flex flex-column h-100" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: '5/4', backgroundColor: '#FFF8F1' }}>
                    <img src={p.photo || p.avatar || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=2574"} className="w-100 h-100 object-fit-cover" alt={p.name} />
                    <div className="position-absolute d-flex gap-2" style={{ top: '0.75rem', right: '0.75rem' }}>
                      <button
                        onClick={() => navigate(`/pets/${p.id || p._id}/edit`)}
                        className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0 border-0"
                        style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)' }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id || p._id)}
                        className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0 border-0 text-danger"
                        style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div>
                        <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '20px' }}>
                          {p.name}
                        </div>
                        <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                          {p.type} · {p.breed}
                        </div>
                      </div>
                      <span className="fw-semibold rounded-pill" style={{ fontFamily: 'Manrope', fontSize: '11px', backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', padding: '0.25rem 0.6rem' }}>
                        {p.size}
                      </span>
                    </div>
                    <div className="row g-2 text-center mb-4">
                      <div className="col-4"><Pill label="Age" value={p.age} /></div>
                      <div className="col-4"><Pill label="Weight" value={p.weight} /></div>
                      <div className="col-4"><Pill label="Size" value={p.size} /></div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => setRoute("recommendations")}
                        className="btn w-100 rounded-pill fw-semibold border d-inline-flex align-items-center justify-content-center gap-2"
                        style={{ height: '40px', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}
                      >
                        <Sparkles size={14} /> See picks for {p.name}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 col-md-6 col-xl-4">
              <button
                onClick={() => navigate("/pets/new")}
                className="w-100 h-100 bg-transparent border d-flex flex-column align-items-center justify-content-center py-5 text-muted"
                style={{ borderRadius: '1.5rem', border: '2px dashed #E7E2D9', minHeight: '320px', transition: 'all 0.2s', borderColor: '#E7E2D9' }}
              >
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                  <Plus size={20} />
                </div>
                <div className="fw-semibold text-dark mt-3" style={{ fontFamily: 'Sora', fontSize: '15px' }}>Add another pet</div>
                <div className="mt-1" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  Profiles help us personalize everything.
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  );
}

function Pill({ label, value }: any) {
  return (
    <div className="border bg-light text-center py-2" style={{ borderRadius: '0.75rem', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9' }}>
      <div className="text-muted text-uppercase fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '10px', letterSpacing: '0.14em' }}>
        {label}
      </div>
      <div className="fw-semibold text-dark mt-1" style={{ fontFamily: 'Sora', fontSize: '13px' }}>{value}</div>
    </div>
  );
}
