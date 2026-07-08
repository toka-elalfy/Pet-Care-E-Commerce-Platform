import { Bell, RefreshCw, ShoppingCart, Loader2 } from "lucide-react";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";
import { useState, useEffect } from "react";

export function Reminders({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const [remindersList, setRemindersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ low: 0, upcoming: 0, suggestions: 0 });

  useEffect(() => {
    api.reminders.getAll()
      .then(res => {
        const list = Array.isArray(res) ? res : res?.reminders || res?.data || [];
        setRemindersList(list);
        const low = list.filter((r: any) => r.type === 'reorder' && r.urgency === 'high').length;
        const upcoming = list.filter((r: any) => r.type === 'delivery').length;
        setMetrics({ low, upcoming, suggestions: 2 }); // dummy suggestions fallback for layout scale
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title="Reminders & notifications"
      subtitle="We watch supplies for you and nudge before you run out."
    >
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-secondary" role="status" />
        </div>
      ) : (
        <>
          <div className="row g-4 mb-5">
            {[
              ["Running low", metrics.low.toString(), "#DC2626"],
              ["Upcoming deliveries", metrics.upcoming.toString(), "#0F766E"],
              ["Suggestions", metrics.suggestions.toString(), "#F97360"],
            ].map(([label, value, color]) => (
              <div key={label} className="col-12 col-lg-4">
                <div className="bg-white border p-4 p-md-5 d-flex align-items-center gap-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: '48px', height: '48px', background: `${color}1A`, color }}
                  >
                    <Bell size={18} />
                  </div>
                  <div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{label}</div>
                    <div className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '22px' }}>{value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-column gap-3">
            {remindersList.length === 0 ? <p className="text-muted">No pending reminders at the moment.</p> : remindersList.map((r) => {
              const productTitle = r.product?.title || r.product?.name || "Product";
              const productImage = r.product?.images?.[0]?.url || r.product?.thumbnail?.url || r.product?.image || "";
              const bar =
                r.urgency === "high" ? 85 : r.urgency === "medium" ? 55 : 25;
              const barColor =
                r.urgency === "high"
                  ? "#DC2626"
                  : r.urgency === "medium"
                    ? "#F59E0B"
                    : "#16A34A";
              return (
                <div
                  key={r._id || r.id}
                  className="bg-white border p-4 p-md-5 d-flex flex-wrap align-items-center gap-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
                >
                  <img
                    src={productImage || "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=2574"}
                    className="rounded-4 object-fit-cover flex-shrink-0" style={{ width: '64px', height: '64px', backgroundColor: '#FFF8F1' }}
                  />
                  <div className="flex-grow-1" style={{ minWidth: '240px' }}>
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                      {r.title || r.message}
                    </div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                      {productTitle}
                    </div>
                    <div className="mt-3 d-flex align-items-center gap-3">
                      <div className="flex-grow-1 rounded-pill overflow-hidden" style={{ height: '6px', backgroundColor: '#E7E2D9' }}>
                        <div
                          className="h-100 rounded-pill"
                          style={{ width: `${bar}%`, background: barColor }}
                        />
                      </div>
                      <span
                        className="fw-semibold"
                        style={{ fontFamily: 'Manrope', fontSize: '11px', color: barColor }}
                      >
                        {r.left}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      onClick={() => setRoute("shop")}
                      className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center justify-content-center gap-2" style={{ height: '36px', padding: '0 1rem', background: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}
                    >
                      <ShoppingCart size={13} /> Reorder now
                    </button>
                    <button
                      onClick={() => setRoute("subscriptions")}
                      className="btn bg-white rounded-pill border text-dark fw-semibold d-inline-flex align-items-center justify-content-center gap-2" style={{ height: '36px', padding: '0 1rem', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '12px' }}
                    >
                      <RefreshCw size={13} /> Convert to subscription
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-3">
            <div className="fw-semibold text-dark mb-3" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
              Notification history
            </div>
            <div className="bg-white border text-dark d-flex flex-column" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
              {[
                ["Apr 21", "Your order ORD-10482 was delivered"],
                ["Apr 18", "Bella's food predicted to run out in 7 days"],
                ["Apr 14", "Milo's subscription shipped"],
                ["Apr 10", "New recommendation: Senior Joint Support"],
              ].map(([d, t], i) => (
                <div key={t} className="p-4 d-flex align-items-center gap-4" style={i !== 0 ? { borderTop: '1px solid #E7E2D9' } : {}}>
                  <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px', width: '64px' }}>{d}</div>
                  <div className="flex-grow-1 fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
}
