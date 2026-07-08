import { Pause, Play, RefreshCw, SkipForward, X, Pencil, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";
import { StatusBadge } from "./Dashboard";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function Subscriptions({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const navigate = useNavigate();
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.subscriptions.getAll()
      .then(res => setSubs(Array.isArray(res) ? res : res?.subscriptions || res?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title="Subscriptions"
      subtitle="Manage recurring deliveries, frequencies, and upcoming shipments."
    >
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-secondary" role="status" />
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {subs.length === 0 ? <p className="text-muted">You have no active subscriptions.</p> : subs.map((s) => {
            const productTitle = s.product?.title || s.product?.name || "Subscription item";
            const productImage = s.product?.images?.[0]?.url || s.product?.thumbnail?.url || s.product?.image || "";
            return (
              <div
                key={s._id || s.id}
                className="bg-white border p-4 d-flex flex-wrap gap-4 align-items-center"
                style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
              >
                <img
                  src={productImage || "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=2574"}
                  className="rounded-3 object-fit-cover"
                  style={{ width: '80px', height: '80px', backgroundColor: '#FFF8F1' }}
                />
                <div className="flex-grow-1" style={{ minWidth: '220px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                      {productTitle}
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="text-muted mt-2" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                    For {s.pet?.name || 'your pet'} · {s.frequency}
                  </div>
                  <div className="mt-3 d-flex align-items-center gap-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                    <RefreshCw size={13} style={{ color: '#0F766E' }} />
                    Next delivery: <b className="text-dark">{s.nextDeliveryDate ? new Date(s.nextDeliveryDate).toLocaleDateString() : "Soon"}</b>
                  </div>
                </div>
                <div className="text-end">
                  <div className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '20px' }}>
                    ${(s.totalAmount || s.price || s.product?.price || 0).toFixed(2)}
                  </div>
                  <div className="fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '11px', color: '#0F766E' }}>
                    billed per delivery
                  </div>
                </div>
                <div className="w-100 col-md-auto d-flex flex-wrap gap-2 border-start-md ps-md-4" style={{ borderColor: '#E7E2D9' }}>
                  <Btn
                    icon={<Pencil size={13} />}
                    onClick={() => navigate(`/subscriptions/${s._id || s.id}`)}
                  >
                    Edit
                  </Btn>
                  {(s.status || "Active").toLowerCase() === "active" ? (
                    <Btn icon={<SkipForward size={14} />} onClick={async () => {
                      try {
                        await api.subscriptions.skipDelivery(s._id || s.id);
                        toast.success("Delivery skipped");
                        load();
                      } catch (err: any) {
                        toast.error(err.message || "Failed to skip delivery");
                      }
                    }}>Skip next</Btn>
                  ) : null}
                  {(s.status || "Active").toLowerCase() === "active" ? (
                    <Btn icon={<Pause size={14} />} onClick={async () => {
                      try {
                        await api.subscriptions.updateStatus(s._id || s.id, { status: "paused" });
                        toast.success("Subscription paused");
                        load();
                      } catch (err: any) {
                        toast.error(err.message || "Failed to pause");
                      }
                    }}>Pause</Btn>
                  ) : (
                    <Btn icon={<Play size={14} />} primary onClick={async () => {
                      try {
                        await api.subscriptions.updateStatus(s._id || s.id, { status: "active" });
                        toast.success("Subscription resumed");
                        load();
                      } catch (err: any) {
                        toast.error(err.message || "Failed to resume");
                      }
                    }}>
                      Resume
                    </Btn>
                  )}
                  <Btn icon={<X size={14} />} danger onClick={async () => {
                    if (window.confirm("Are you sure you want to cancel this subscription?")) {
                      try {
                        await api.subscriptions.updateStatus(s._id || s.id, { status: "cancelled" });
                        toast.success("Subscription cancelled");
                        load();
                      } catch (err: any) {
                        toast.error(err.message || "Failed to cancel");
                      }
                    }
                  }}>
                    Cancel
                  </Btn>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}

function Btn({ children, icon, primary, danger, onClick }: any) {
  const bg = primary ? '#0F766E' : 'white';
  const color = primary ? 'white' : danger ? '#DC2626' : '#1F2937';
  const border = primary ? '#0F766E' : '#E7E2D9';

  return (
    <button
      onClick={onClick}
      className="btn rounded-pill border fw-semibold d-inline-flex align-items-center gap-2"
      style={{
        height: '36px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '12px',
        backgroundColor: bg, color: color, borderColor: border
      }}
    >
      {icon}
      {children}
    </button>
  );
}
