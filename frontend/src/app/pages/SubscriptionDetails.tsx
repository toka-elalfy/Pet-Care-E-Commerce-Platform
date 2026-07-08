import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Pause,
  Play,
  SkipForward,
  X,
  Minus,
  Plus,
  CalendarClock,
  RefreshCw,
} from "lucide-react";
import { useParams } from "react-router";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";
import { StatusBadge } from "./Dashboard";

export function SubscriptionDetails({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const { id } = useParams();

  const [sub, setSub] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const [freq, setFreq] = useState("Every 4 weeks");
  const [paused, setPaused] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const subs = await api.subscriptions.getAll();
      const foundSub = subs.find((s: any) => s.id === id || s._id === id);
      if (foundSub) {
        setSub(foundSub);
        setQty(foundSub.quantity || 1);
        setFreq(foundSub.frequency || "Every 4 weeks");
        setPaused(foundSub.status?.toLowerCase() === "paused");

        if (foundSub.product && typeof foundSub.product === 'object' && foundSub.product.title) {
          setProduct(foundSub.product);
        } else {
          try {
            const pId = typeof foundSub.product === 'string' ? foundSub.product : (foundSub.productId || foundSub.product?._id);
            if (pId) {
              const pData = await api.products.getById(pId);
              setProduct(pData);
            }
          } catch (e) { }
        }
      }
    } catch (e) {
      console.error("Failed to load subscription details:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (id) {
      loadData();
    } else {
      setLoading(false);
    }
    return () => { mounted = false; };
  }, [id]);

  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 1800);
  };

  const frequencies = [
    "Every 2 weeks",
    "Every 4 weeks",
    "Every 6 weeks",
    "Every 8 weeks",
  ];

  const actionsNode = (
    <button
      onClick={() => setRoute("subscriptions")}
      className="btn btn-light rounded-pill border fw-semibold bg-white d-inline-flex align-items-center gap-2"
      style={{ height: '44px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
    >
      <ArrowLeft size={14} /> All subscriptions
    </button>
  );

  if (loading) {
    return <DashboardShell route={route} setRoute={setRoute} title="Loading..." subtitle="" actions={actionsNode}><div className="text-center py-5">Loading subscription details...</div></DashboardShell>;
  }

  if (!sub || !product) {
    return <DashboardShell route={route} setRoute={setRoute} title="Not Found" subtitle="" actions={actionsNode}><div className="text-center py-5">Subscription not found.</div></DashboardShell>;
  }

  const productName = product.name || product.title || "Unknown Product";
  const productBrand = product.brand || "Brand";
  const productCategory = product.category || "Category";
  const productPrice = product.subPrice || product.discountPrice || product.price || 0;
  const productImage = product.image || product.thumbnail?.url || product.images?.[0]?.url || "";
  const petName = sub.pet || sub.petName || "Your Pet";
  const nextDateStr = new Date(sub.next || sub.nextDeliveryDate || new Date()).toLocaleDateString();
  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title="Edit subscription"
      subtitle="Change frequency, quantity, or pause anytime."
      actions={actionsNode}
    >
      {toast && (
        <div className="mb-4 text-primary px-3 py-2 fw-semibold" style={{ backgroundColor: 'rgba(167, 199, 163, 0.25)', border: '1px solid rgba(167, 199, 163, 0.6)', color: '#0F766E', borderRadius: '0.75rem', fontFamily: 'Manrope', fontSize: '13px' }}>
          {toast}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-8 d-flex flex-column gap-4">
          {/* Product summary */}
          <div className="bg-white border p-4 d-flex flex-wrap gap-4 align-items-center" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <img
              src={productImage}
              className="rounded-3 object-fit-cover"
              style={{ width: '96px', height: '96px', backgroundColor: '#FFF8F1' }}
              alt={productName}
            />
            <div className="flex-grow-1" style={{ minWidth: '220px' }}>
              <div className="d-flex align-items-center gap-2">
                <StatusBadge status={paused ? "Paused" : "Active"} />
                <span className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  For {petName}
                </span>
              </div>
              <div className="mt-2 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                {productName}
              </div>
              <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                {productBrand} · {productCategory}
              </div>
            </div>
            <div className="text-end">
              <div className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '22px' }}>
                ${(productPrice * qty).toFixed(2)}
              </div>
              <div className="fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '11px', color: '#0F766E' }}>
                per delivery
              </div>
            </div>
          </div>

          {/* Frequency */}
          <Section
            title="Delivery frequency"
            desc="How often your subscription ships. Next delivery recalculates instantly."
          >
            <div className="row g-2">
              {frequencies.map((f) => (
                <div key={f} className="col-6 col-md-3">
                  <button
                    onClick={async () => {
                      try {
                        await api.subscriptions.update(id!, { frequency: f });
                        setFreq(f);
                        flash(`Frequency updated to ${f.toLowerCase()}.`);
                        loadData();
                      } catch (err: any) {
                        flash(err.message || "Failed to update frequency.");
                      }
                    }}
                    className={`btn w-100 rounded-3 fw-semibold border ${freq === f ? "text-white" : "bg-white text-dark"}`}
                    style={{
                      height: '44px', fontFamily: 'Manrope', fontSize: '13px',
                      backgroundColor: freq === f ? '#0F766E' : 'white',
                      borderColor: freq === f ? '#0F766E' : '#E7E2D9'
                    }}
                  >
                    {f}
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Quantity */}
          <Section
            title="Quantity per delivery"
            desc="Match the volume to your pet's usage to avoid waste."
          >
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-1 bg-white border rounded-pill p-1" style={{ borderColor: '#E7E2D9' }}>
                <button
                  onClick={async () => {
                    const newQty = Math.max(1, qty - 1);
                    if (newQty === qty) return;
                    try {
                      await api.subscriptions.update(id!, { quantity: newQty });
                      setQty(newQty);
                      loadData();
                    } catch (err) {
                      flash("Failed to update quantity");
                    }
                  }}
                  className="btn btn-light rounded-circle shadow-none p-0 d-flex align-items-center justify-content-center bg-transparent border-0"
                  style={{ width: '36px', height: '36px' }}
                >
                  <Minus size={14} />
                </button>
                <div className="text-center fw-semibold" style={{ width: '40px', fontFamily: 'Sora', fontSize: '15px' }}>
                  {qty}
                </div>
                <button
                  onClick={async () => {
                    const newQty = qty + 1;
                    try {
                      await api.subscriptions.update(id!, { quantity: newQty });
                      setQty(newQty);
                      loadData();
                    } catch (err) {
                      flash("Failed to update quantity");
                    }
                  }}
                  className="btn btn-light rounded-circle shadow-none p-0 d-flex align-items-center justify-content-center bg-transparent border-0"
                  style={{ width: '36px', height: '36px' }}
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                ${productPrice} × {qty} ={" "}
                <b className="text-dark">
                  ${(productPrice * qty).toFixed(2)}
                </b>{" "}
                per delivery
              </div>
            </div>
          </Section>

          {/* Manage actions */}
          <Section title="Manage subscription">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <Action
                  icon={<SkipForward size={15} />}
                  title="Skip next delivery"
                  desc="Pushes back your next ship date by one cycle."
                  onClick={async () => {
                    try {
                      await api.subscriptions.skipDelivery(id!);
                      flash("Next delivery skipped.");
                      loadData();
                    } catch (err) {
                      flash("Failed to skip delivery.");
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-4">
                <Action
                  icon={paused ? <Play size={15} /> : <Pause size={15} />}
                  title={paused ? "Resume subscription" : "Pause subscription"}
                  desc={
                    paused
                      ? "Restart on your next scheduled date."
                      : "Pause deliveries with no end date."
                  }
                  onClick={async () => {
                    try {
                      await api.subscriptions.updateStatus(id!, { status: paused ? "Active" : "Paused" });
                      setPaused(!paused);
                      flash(paused ? "Subscription resumed." : "Subscription paused.");
                    } catch (err) {
                      flash("Failed to update status.");
                    }
                  }}
                  primary={paused}
                />
              </div>
              <div className="col-12 col-md-4">
                <Action
                  icon={<X size={15} />}
                  title="Cancel subscription"
                  desc="Stops future deliveries. You can resubscribe later."
                  onClick={() => setCancelOpen(true)}
                  danger
                />
              </div>
            </div>
          </Section>
        </div>

        <aside className="col-12 col-lg-4 d-flex flex-column gap-4">
          <div className="bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="d-flex align-items-center gap-2 fw-semibold text-uppercase text-muted mb-3" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.14em' }}>
              <CalendarClock size={14} style={{ color: '#0F766E' }} /> Next delivery
            </div>
            <div className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '22px' }}>
              {paused ? "Paused" : nextDateStr}
            </div>
            <div className="text-muted mt-1" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
              {freq.toLowerCase()}
            </div>
          </div>

          <div className="bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="fw-semibold text-dark mb-3" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
              Upcoming schedule
            </div>
            <div className="d-flex flex-column gap-2">
              {[nextDateStr].map((d, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center gap-3 p-2 rounded-3"
                  style={{ backgroundColor: '#FFF8F1' }}
                >
                  <div className="bg-white border d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '0.5rem', borderColor: '#E7E2D9', color: '#0F766E' }}>
                    <RefreshCw size={13} />
                  </div>
                  <div className="min-w-0">
                    <div className="fw-semibold text-dark text-truncate" style={{ fontFamily: 'Sora', fontSize: '13px' }}>{d}</div>
                    <div className="text-muted text-truncate" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                      {qty} × {productName.split(" ").slice(0, 3).join(" ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {cancelOpen && (
        <Modal onClose={() => setCancelOpen(false)}>
          <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '20px' }}>
            Cancel this subscription?
          </div>
          <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
            You'll lose the 15% recurring discount. You can always resubscribe
            from the product page.
          </p>
          <div className="mt-4 d-flex gap-2 justify-content-end">
            <button
              onClick={() => setCancelOpen(false)}
              className="btn btn-light rounded-pill border fw-semibold bg-white text-dark"
              style={{ height: '40px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
            >
              Keep subscription
            </button>
            <button
              onClick={async () => {
                setCancelOpen(false);
                try {
                  await api.subscriptions.updateStatus(id!, { status: "cancelled" });
                  flash("Subscription cancelled.");
                  setTimeout(() => setRoute("subscriptions"), 1200);
                } catch (err) {
                  flash("Failed to cancel subscription.");
                }
              }}
              className="btn rounded-pill border-0 text-white fw-semibold"
              style={{ height: '40px', padding: '0 1rem', backgroundColor: '#DC2626', fontFamily: 'Manrope', fontSize: '13px' }}
            >
              Yes, cancel
            </button>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
}

function Section({ title, desc, children }: any) {
  return (
    <div className="bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
      <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
        {title}
      </div>
      {desc && (
        <p className="mt-1 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>{desc}</p>
      )}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Action({ icon, title, desc, onClick, primary, danger }: any) {
  return (
    <button
      onClick={onClick}
      className={`btn text-start p-3 w-100 h-100 border d-flex flex-column gap-1`}
      style={{
        borderRadius: '0.75rem',
        backgroundColor: danger ? 'white' : primary ? 'rgba(15, 118, 110, 0.05)' : 'white',
        borderColor: danger ? '#E7E2D9' : primary ? '#0F766E' : '#E7E2D9'
      }}
    >
      <div
        className={`rounded-3 d-flex align-items-center justify-content-center mb-1 flex-shrink-0`}
        style={{
          width: '32px', height: '32px',
          backgroundColor: danger ? 'rgba(220, 38, 38, 0.1)' : 'rgba(15, 118, 110, 0.1)',
          color: danger ? '#DC2626' : '#0F766E'
        }}
      >
        {icon}
      </div>
      <div
        className={`fw-semibold ${danger ? "text-danger" : "text-dark"}`}
        style={{ fontFamily: 'Sora', fontSize: '13px' }}
      >
        {title}
      </div>
      <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '11px', lineHeight: '1.4' }}>{desc}</div>
    </button>
  );
}

function Modal({ children, onClose }: any) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 px-3 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white border p-4 w-100"
        style={{ borderRadius: '1rem', borderColor: '#E7E2D9', maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
