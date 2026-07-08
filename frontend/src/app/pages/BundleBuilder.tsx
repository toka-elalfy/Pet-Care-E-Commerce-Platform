import { useMemo, useState, useEffect } from "react";
import {
  Package,
  Plus,
  Check,
  X,
  Sparkles,
  Filter,
  ShoppingCart,
  Percent,
} from "lucide-react";
import { api } from "../api";

const TIERS = [
  { min: 2, pct: 5, label: "2 items · 5% off" },
  { min: 3, pct: 10, label: "3 items · 10% off" },
  { min: 4, pct: 15, label: "4 items · 15% off" },
  { min: 5, pct: 20, label: "5+ items · 20% off" },
];

function tierFor(count: number) {
  return [...TIERS].reverse().find((t) => count >= t.min);
}

export function BundleBuilder({
  setRoute,
  addManyToCart,
}: {
  setRoute: (r: string) => void;
  addManyToCart: (ids: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [cat, setCat] = useState<string>("All");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      try {
        const data = await api.products.getAll();
        if (mounted) {
          setProducts(data);
          if (data.length >= 2) {
            const pid1 = data[0].id;
            const pid2 = data[1].id;
            if (pid1 && pid2) setSelected([pid1, pid2]);
          }
        }
      } catch (err) {
        console.error("Failed to load products for bundle", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProducts();
    return () => { mounted = false; };
  }, []);

  const cats = ["All", "Food", "Toys", "Health", "Grooming"];
  const filtered = useMemo(
    () =>
      products.filter((p) => (cat === "All" ? true : p.category === cat)),
    [cat, products]
  );

  const items = selected
    .map((id) => products.find((p) => (p.id || p._id) === id))
    .filter(Boolean);

  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const tier = tierFor(items.length);
  const discount = tier ? (subtotal * tier.pct) / 100 : 0;
  const total = subtotal - discount;
  const nextTier = TIERS.find((t) => items.length < t.min);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '1280px' }}>
      {loading && <div className="text-center py-4">Loading bundle products...</div>}
      <div className="d-flex flex-wrap align-items-end justify-content-between gap-3">
        <div>
          <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(249, 115, 96, 0.1)', color: '#F97360', fontFamily: 'Manrope', fontSize: '12px' }}>
            <Package size={13} /> Bundle Builder
          </span>
          <h1 className="mt-3 fw-bold text-dark lh-sm m-0" style={{ fontFamily: 'Sora', fontSize: '36px' }}>
            Build a bundle. Save more as you add.
          </h1>
          <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '15px', maxWidth: '580px' }}>
            Combine food, toys, health, and grooming into a single order.
            Discounts stack automatically as your bundle grows.
          </p>
        </div>
      </div>

      {/* Tier ladder */}
      <div className="mt-4 bg-white border p-4 p-md-5" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-2 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
            <Percent size={15} style={{ color: '#0F766E' }} /> Bundle discount
          </div>
          {nextTier ? (
            <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
              Add{" "}
              <b style={{ color: '#0F766E' }}>{nextTier.min - items.length}</b>{" "}
              more to unlock{" "}
              <b style={{ color: '#0F766E' }}>{nextTier.pct}% off</b>
            </div>
          ) : (
            <div className="fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}>
              Max tier unlocked — 20% off
            </div>
          )}
        </div>
        <div className="row g-2">
          {TIERS.map((t) => {
            const active = items.length >= t.min;
            return (
              <div key={t.min} className="col-3">
                <div
                  className="rounded-3 border text-center transition-colors p-3"
                  style={{
                    backgroundColor: active ? '#0F766E' : '#FFF8F1',
                    borderColor: active ? '#0F766E' : '#E7E2D9',
                    color: active ? 'white' : '#1F2937'
                  }}
                >
                  <div className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                    {t.pct}%
                  </div>
                  <div
                    style={{
                      fontFamily: 'Manrope', fontSize: '11px',
                      color: active ? 'rgba(255, 255, 255, 0.8)' : '#6B7280'
                    }}
                  >
                    {t.min}+ items
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 row g-4">
        {/* Catalog */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-wrap gap-2 mb-4">
            <div className="d-flex align-items-center gap-2 text-uppercase text-muted fw-semibold me-1" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em' }}>
              <Filter size={14} /> Filter
            </div>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`btn rounded-pill border fw-semibold px-3 py-1 ${cat === c
                  ? "text-white"
                  : "bg-white text-dark"
                  }`}
                style={{
                  height: '36px', fontFamily: 'Manrope', fontSize: '12px',
                  backgroundColor: cat === c ? '#0F766E' : 'white',
                  borderColor: cat === c ? '#0F766E' : '#E7E2D9'
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="row g-3">
            {filtered.map((p) => {
              const pid = p.id || p._id;
              const on = selected.includes(pid);
              return (
                <div key={pid} className="col-12 col-sm-6 col-xl-4">
                  <div
                    className="position-relative bg-white border transition-all h-100 d-flex flex-column"
                    style={{
                      borderRadius: '1rem', overflow: 'hidden',
                      borderColor: on ? '#0F766E' : '#E7E2D9',
                      boxShadow: on ? '0 10px 30px -14px rgba(15,118,110,0.4)' : 'none'
                    }}
                  >
                    <div className="position-relative overflow-hidden" style={{ aspectRatio: '4/3', backgroundColor: '#FFF8F1' }}>
                      <img
                        src={p.image || p.thumbnail?.url || ""}
                        className="w-100 h-100 object-fit-cover"
                        alt={p.name || "Product"}
                      />
                      <span className="position-absolute bg-white fw-semibold rounded-pill px-2 py-1" style={{ top: '10px', left: '10px', fontFamily: 'Manrope', fontSize: '11px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                        {p.category}
                      </span>
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <div className="fw-semibold text-dark mb-3 flex-grow-1" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                        {p.name}
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                          ${p.price}
                        </div>
                        <button
                          onClick={() => toggle(pid)}
                          className={`btn rounded-pill fw-semibold d-inline-flex align-items-center gap-2 border px-3`}
                          style={{
                            height: '36px', fontFamily: 'Manrope', fontSize: '12px',
                            backgroundColor: on ? '#0F766E' : 'white',
                            color: on ? 'white' : '#1F2937',
                            borderColor: on ? '#0F766E' : '#E7E2D9'
                          }}
                        >
                          {on ? (
                            <>
                              <Check size={13} /> In bundle
                            </>
                          ) : (
                            <>
                              <Plus size={13} /> Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bundle summary */}
        <div className="col-12 col-lg-4">
          <div className="bg-white border p-4 p-md-5 sticky-lg-top" style={{ borderRadius: '1rem', borderColor: '#E7E2D9', top: '88px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                Your bundle
              </div>
              <span className="fw-semibold rounded-pill px-3 py-1" style={{ fontFamily: 'Manrope', fontSize: '11px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                {items.length} items
              </span>
            </div>

            {items.length === 0 ? (
              <div className="mt-4 border p-4 text-center" style={{ borderRadius: '0.75rem', borderStyle: 'dashed', borderColor: '#E7E2D9' }}>
                <Sparkles size={18} className="mx-auto" style={{ color: '#0F766E' }} />
                <div className="mt-2 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                  Pick at least 2 items
                </div>
                <p className="mt-1 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  Discounts unlock at 2, 3, 4, and 5+ items.
                </p>
              </div>
            ) : (
              <div className="mt-4 d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: '280px', paddingRight: '0.25rem' }}>
                {items.map((p) => {
                  const pid = p.id;
                  return (
                    <div
                      key={pid}
                      className="d-flex align-items-center gap-3 p-2 rounded-3 hover-bg-light transition-colors"
                    >
                      <img
                        src={p.image || p.thumbnail?.url || ""}
                        className="rounded-3 object-fit-cover" style={{ width: '48px', height: '48px', backgroundColor: '#FFF8F1' }}
                      />
                      <div className="flex-grow-1 min-w-0">
                        <div className="fw-semibold text-dark text-truncate" style={{ fontFamily: 'Sora', fontSize: '12px' }}>
                          {p.name}
                        </div>
                        <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                          ${p.price}
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(pid)}
                        className="btn btn-link p-0 text-decoration-none shadow-none text-muted d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '28px', height: '28px' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-4 pt-4 text-muted d-flex flex-column gap-2" style={{ borderTop: '1px solid #E7E2D9', fontFamily: 'Manrope', fontSize: '14px' }}>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span className="text-dark fw-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>
                  Bundle discount
                  {tier && (
                    <span className="ms-2 fw-semibold rounded-pill px-2 py-1" style={{ fontFamily: 'Manrope', fontSize: '11px', backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E' }}>
                      −{tier.pct}%
                    </span>
                  )}
                </span>
                <span className="fw-semibold" style={{ color: '#0F766E' }}>
                  −${discount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <span className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                Total
              </span>
              <span className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '24px' }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              disabled={items.length < 2}
              onClick={() => {
                addManyToCart(selected);
                setRoute("cart");
              }}
              className="btn w-100 rounded-pill text-white fw-semibold d-inline-flex align-items-center justify-content-center gap-2 mt-4" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
            >
              <ShoppingCart size={15} /> Add bundle to cart
            </button>
            <p className="mt-3 text-muted text-center m-0" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
              Build once, reorder anytime. Bundles are saved to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
