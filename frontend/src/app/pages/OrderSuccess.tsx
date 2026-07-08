import { Check, Package, Calendar, Truck } from "lucide-react";

export function OrderSuccess({ setRoute }: { setRoute: (r: string) => void }) {
  return (
    <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '760px' }}>
      <div className="bg-white border text-center position-relative overflow-hidden p-4 p-md-5" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
        <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E' }}>
          <Check size={36} strokeWidth={2.5} />
        </div>
        <h1 className="mt-4 fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '32px' }}>
          Order confirmed!
        </h1>
        <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '15px' }}>
          Thanks Sarah — we'll email a receipt to <b>sarah.j@example.com</b>.
        </p>

        <div className="mt-4 border p-4 row g-3 text-start" style={{ backgroundColor: '#FFF8F1', borderRadius: '1rem', borderColor: '#E7E2D9' }}>
          <div className="col-12 col-sm-4"><Info icon={<Package size={16} />} label="Order number" value="#ORD-10493" /></div>
          <div className="col-12 col-sm-4"><Info icon={<Calendar size={16} />} label="Placed" value="Apr 23, 2026" /></div>
          <div className="col-12 col-sm-4"><Info icon={<Truck size={16} />} label="Arrives" value="Apr 26 – 28" /></div>
        </div>

        <div className="mt-5 text-start">
          <div className="fw-semibold text-dark mb-3" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
            What's in this order
          </div>
          <div className="d-flex flex-column gap-2">
            {[
              ["Grain-Free Salmon Adult Formula", "Qty 1 · subscription", "$49.00"],
              ["Plush Lamb Comfort Toy", "Qty 1 · one-time", "$18.00"],
            ].map(([n, d, p]) => (
              <div
                key={n}
                className="d-flex justify-content-between align-items-center bg-white border p-3" style={{ borderRadius: '0.75rem', borderColor: '#E7E2D9' }}
              >
                <div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{n}</div>
                  <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{d}</div>
                </div>
                <div className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{p}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 d-flex flex-wrap justify-content-center gap-3">
          <button
            onClick={() => setRoute("orders")}
            className="btn rounded-pill text-white fw-semibold px-4" style={{ height: '44px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            View order details
          </button>
          <button
            onClick={() => setRoute("shop")}
            className="btn rounded-pill bg-white border text-dark fw-semibold px-4" style={{ height: '44px', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: any) {
  return (
    <div>
      <div className="d-flex items-center gap-2 text-uppercase text-muted fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.1em' }}>
        {icon} {label}
      </div>
      <div className="mt-1 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>{value}</div>
    </div>
  );
}
