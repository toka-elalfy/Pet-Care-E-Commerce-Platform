import { Star, Minus, Plus, Truck, ShieldCheck, RefreshCw, Package } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "../components/ui/ProductCard";
import { useProduct, useProducts } from "../hooks/useApi";

export function ProductDetails({
  id,
  setRoute,
  openProduct,
  addToCart,
}: {
  id: string;
  setRoute: (r: string) => void;
  openProduct: (id: string) => void;
  addToCart: (id: string, qty?: number, sub?: boolean) => void;
}) {
  const goBundle = () => setRoute("bundle");

  const { status, value: product } = useProduct(id);
  const { value: productsData } = useProducts();
  const allProducts = productsData?.products || [];
  const total = productsData?.total || 0;

  const [qty, setQty] = useState(1);
  const [sub, setSub] = useState(true);
  const [freq, setFreq] = useState("Every 4 weeks");
  console.log(allProducts);
  if (status === "error") {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
        <div className="fs-1">⚠️</div>
        <div className="fw-bold fs-4 mt-2 mb-2">Error loading product</div>
        <button className="btn btn-outline-secondary mt-2" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (status !== "success" || !product) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5" style={{ height: '50vh' }}>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading product...</span>
        </div>
      </div>
    );
  }

  const related = (allProducts || [])?.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="container-fluid py-4 px-3 px-md-4" style={{ maxWidth: '1280px' }}>
      <button
        onClick={() => setRoute("shop")}
        className="btn btn-link p-0 text-decoration-none shadow-none text-muted transition-colors fw-semibold mb-4"
        style={{ fontFamily: 'Manrope', fontSize: '13px' }}
      >
        ← Back to shop
      </button>
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="rounded-4 overflow-hidden border" style={{ backgroundColor: '#FFF8F1', borderColor: '#E7E2D9', aspectRatio: '4/3' }}>
            <img src={product.image} className="w-100 h-100 object-fit-cover" />
          </div>
          <div className="mt-3 row g-2">
            {[product.image].map((src, i) => (
              <div key={i} className="col-3">
                <div
                  className="rounded-3 overflow-hidden border"
                  style={{
                    aspectRatio: '1', backgroundColor: '#FFF8F1',
                    borderColor: i === 0 ? '#0F766E' : '#E7E2D9'
                  }}
                >
                  <img src={src} className="w-100 h-100 object-fit-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="fw-semibold text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em', color: '#0F766E' }}>
            {product.brand} · {product.category}
          </div>
          <h1 className="mt-2 fw-semibold text-dark lh-sm m-0" style={{ fontFamily: 'Sora', fontSize: '32px' }}>
            {product.name}
          </h1>
          <div className="mt-2 d-flex align-items-center gap-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
            <div className="d-flex align-items-center gap-1">
              <Star size={15} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
              <span className="fw-semibold text-dark">{product.rating}</span>
            </div>
            <span>·</span>
            <span>{product.reviews} reviews</span>
          </div>

          <p className="mt-4 text-muted" style={{ fontFamily: 'Manrope', fontSize: '15px', lineHeight: '1.6' }}>
            {product.description}
          </p>

          <div className="mt-4 d-flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span
                key={t}
                className="fw-semibold rounded-pill"
                style={{ backgroundColor: 'rgba(167, 199, 163, 0.25)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px', padding: '0.375rem 0.75rem' }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="fw-semibold text-uppercase text-muted mb-3" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em' }}>
              Suitable for
            </div>
            <div className="row g-3 text-center">
              <div className="col-4"><Attr label="Pet" value={product.petType} /></div>
              <div className="col-4"><Attr label="Age" value={product.ageGroup} /></div>
              <div className="col-4"><Attr label="Size" value={product.size} /></div>
            </div>
          </div>

          <div className="mt-4 d-flex flex-column gap-3">
            <label
              className="d-flex align-items-start gap-3 p-3 p-md-4 rounded-3 border w-100 m-0"
              style={{
                backgroundColor: sub ? 'rgba(15, 118, 110, 0.05)' : 'white',
                borderColor: sub ? '#0F766E' : '#E7E2D9',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                checked={sub}
                onChange={() => setSub(true)}
                className="form-check-input mt-1"
              />
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                    Subscribe & save 15%
                  </div>
                  <div className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '16px', color: '#0F766E' }}>
                    ${product.subPrice}
                  </div>
                </div>
                <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  Free delivery · pause or cancel anytime
                </div>
                {sub && (
                  <select
                    value={freq}
                    onChange={(e) => setFreq(e.target.value)}
                    className="form-select border shadow-none mt-3"
                    style={{ height: '36px', borderRadius: '2rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
                  >
                    <option>Every 2 weeks</option>
                    <option>Every 4 weeks</option>
                    <option>Every 6 weeks</option>
                    <option>Every 8 weeks</option>
                  </select>
                )}
              </div>
            </label>
            <label
              className="d-flex align-items-start gap-3 p-3 p-md-4 rounded-3 border w-100 m-0"
              style={{
                backgroundColor: !sub ? 'rgba(15, 118, 110, 0.05)' : 'white',
                borderColor: !sub ? '#0F766E' : '#E7E2D9',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                checked={!sub}
                onChange={() => setSub(false)}
                className="form-check-input mt-1"
              />
              <div className="flex-grow-1 d-flex align-items-center justify-content-between">
                <div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                    One-time purchase
                  </div>
                  <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                    Ships in 1–2 business days
                  </div>
                </div>
                <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                  ${product.price}
                </div>
              </div>
            </label>
          </div>

          <div className="mt-4 d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1 bg-white border rounded-pill p-1" style={{ borderColor: '#E7E2D9' }}>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 border-0" style={{ width: '36px', height: '36px' }}
              >
                <Minus size={15} />
              </button>
              <div className="text-center fw-semibold text-dark" style={{ width: '32px', fontFamily: 'Sora', fontSize: '15px' }}>{qty}</div>
              <button
                onClick={() => setQty(qty + 1)}
                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 border-0" style={{ width: '36px', height: '36px' }}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(product._id || product.id, qty, sub);
                setRoute("cart");
              }}
              className="btn flex-grow-1 rounded-pill text-white fw-semibold" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '15px' }}
            >
              Add to cart · ${(sub ? product.subPrice : product.price) * qty}
            </button>
          </div>

          <button
            onClick={goBundle}
            className="btn mt-3 w-100 rounded-pill bg-white border fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
            style={{ height: '48px', borderColor: 'rgba(15, 118, 110, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            <Package size={15} /> Add to a bundle · save up to 20%
          </button>

          <div className="mt-4 row g-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
            <div className="col-4 d-flex align-items-center gap-1 gap-md-2"><Truck size={15} style={{ color: '#0F766E' }} /> Free over $40</div>
            <div className="col-4 d-flex align-items-center gap-1 gap-md-2"><ShieldCheck size={15} style={{ color: '#0F766E' }} /> Vet approved</div>
            <div className="col-4 d-flex align-items-center gap-1 gap-md-2"><RefreshCw size={15} style={{ color: '#0F766E' }} /> 30-day returns</div>
          </div>
        </div>
      </div>

      <section className="mt-5 pt-4">
        <h2 className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '24px' }}>
          You may also like
        </h2>
        <div className="row g-4">
          {related.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard
                product={p}
                onOpen={() => openProduct(p._id || p.id)}
                onAdd={() => addToCart(p._id || p.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-uppercase text-muted" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.1em' }}>{label}</div>
      <div className="fw-semibold text-dark mt-1" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{value}</div>
    </div>
  );
}
