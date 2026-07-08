import { Lock, ShieldCheck, Truck } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export function Checkout({
  setRoute,
}: {
  setRoute: (r: string) => void;
}) {
  const { cart, clearCart } = useCartContext();
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);

  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateForm, setStateForm] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const savedAddresses = user?.addresses || [];
  const primaryId = savedAddresses.find((a: any) => a.isPrimary)?._id || (savedAddresses.length > 0 ? savedAddresses[0]._id : null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(primaryId || "new");

  useEffect(() => {
    if (selectedAddressId && selectedAddressId !== "new") {
      const a = savedAddresses.find((x: any) => x._id === selectedAddressId);
      if (a) {
        setAddress(a.street || "");
        setCity(a.city || "");
        setStateForm(a.country || "");
        setZip(a.postalCode || "");
      }
    }
  }, [selectedAddressId, savedAddresses]);

  const expanded = cart
    .filter((it) => it.product)
    .map((it) => ({ ...it, product: it.product! }));
  const subtotal = expanded.reduce(
    (s, it) => s + (it.sub ? it.product.subPrice : it.product.price) * it.qty,
    0
  );
  const total = subtotal + (subtotal >= 40 ? 0 : 6);

  return (
    <div className="container-fluid py-4 px-3 px-md-4" style={{ maxWidth: '1280px' }}>
      <button
        onClick={() => setRoute("cart")}
        className="btn btn-link p-0 text-decoration-none shadow-none text-muted transition-colors fw-semibold"
        style={{ fontFamily: 'Manrope', fontSize: '13px' }}
      >
        ← Back to cart
      </button>
      <h1 className="mt-3 fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '32px' }}>Checkout</h1>

      <div className="row g-4 mt-2">
        <div className="col-12 col-lg-7 d-flex flex-column gap-4">
          <Section title="Contact">
            <div className="row g-3">
              <Input wrapperClass="col-12 col-md-6" label="First name" value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
              <Input wrapperClass="col-12 col-md-6" label="Last name" value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
              <Input wrapperClass="col-12" label="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
            </div>
          </Section>

          <Section title="Shipping address">
            {savedAddresses.length > 0 && (
              <div className="mb-4 bg-white border p-3 rounded-3" style={{ borderColor: '#E7E2D9' }}>
                <div className="fw-semibold text-dark mb-2" style={{ fontFamily: 'Sora', fontSize: '13px' }}>Saved addresses</div>
                <div className="d-flex flex-column gap-2">
                  {savedAddresses.map((a: any) => (
                    <label key={a._id} className="d-flex align-items-center gap-3 w-100 m-0 p-2 rounded-3 transition-colors" style={{ cursor: 'pointer', backgroundColor: selectedAddressId === a._id ? 'rgba(15, 118, 110, 0.05)' : 'white', border: `1px solid ${selectedAddressId === a._id ? '#0F766E' : 'transparent'}` }}>
                      <input type="radio" checked={selectedAddressId === a._id} onChange={() => setSelectedAddressId(a._id)} className="form-check-input mt-0" />
                      <div>
                        <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>{a.label} {a.isPrimary && <span className="text-muted" style={{ fontWeight: 'normal' }}>(Primary)</span>}</div>
                        <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{a.street}, {a.city}, {a.country} {a.postalCode}</div>
                      </div>
                    </label>
                  ))}
                  <label className="d-flex align-items-center gap-3 w-100 m-0 p-2 rounded-3 transition-colors" style={{ cursor: 'pointer', backgroundColor: selectedAddressId === "new" ? 'rgba(15, 118, 110, 0.05)' : 'white', border: `1px solid ${selectedAddressId === "new" ? '#0F766E' : 'transparent'}` }}>
                    <input type="radio" checked={selectedAddressId === "new"} onChange={() => { setSelectedAddressId("new"); setAddress(""); setCity(""); setStateForm(""); setZip(""); }} className="form-check-input mt-0" />
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>Use a different address</div>
                  </label>
                </div>
              </div>
            )}
            <div className="row g-3" style={selectedAddressId !== "new" && savedAddresses.length > 0 ? { opacity: 0.5, pointerEvents: "none" } : {}}>
              <Input wrapperClass="col-12" label="Address" value={address} onChange={(e: any) => setAddress(e.target.value)} placeholder="128 Willow Lane" />
              <Input wrapperClass="col-12 col-md-6" label="City" value={city} onChange={(e: any) => setCity(e.target.value)} placeholder="Austin" />
              <Input wrapperClass="col-12 col-md-6" label="State" value={stateForm} onChange={(e: any) => setStateForm(e.target.value)} placeholder="TX" />
              <Input wrapperClass="col-12 col-md-6" label="ZIP code" value={zip} onChange={(e: any) => setZip(e.target.value)} placeholder="78701" />
              <Input wrapperClass="col-12 col-md-6" label="Phone" value={phone} onChange={(e: any) => setPhone(e.target.value)} placeholder="(512) 555-0134" />
            </div>
          </Section>

          <Section title="Delivery">
            <div className="d-flex flex-column gap-3">
              {[
                ["Standard", "3–5 business days", "Free"],
                ["Express", "1–2 business days", "$9.00"],
                ["Same day", "Austin only", "$15.00"],
              ].map(([n, d, p], i) => (
                <label
                  key={n}
                  className="d-flex align-items-center gap-3 p-3 p-md-4 rounded-3 border w-100 m-0"
                  style={{
                    backgroundColor: i === 0 ? 'rgba(15, 118, 110, 0.05)' : 'white',
                    borderColor: i === 0 ? '#0F766E' : '#E7E2D9',
                    cursor: 'pointer'
                  }}
                >
                  <input type="radio" name="delivery" defaultChecked={i === 0} className="form-check-input mt-0" />
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{n}</div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{d}</div>
                  </div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{p}</div>
                </label>
              ))}
            </div>
          </Section>

          <Section title="Payment">
            <div className="rounded-3 border p-3 p-md-4 d-flex align-items-start gap-3 mb-3" style={{ backgroundColor: '#FFF8F1', borderColor: '#E7E2D9' }}>
              <Lock size={16} className="mt-1 flex-shrink-0" style={{ color: '#0F766E' }} />
              <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px', lineHeight: '1.6' }}>
                Place your order below. For the current release, payment is
                collected on delivery — online payment integration is coming in
                a future update.
              </div>
            </div>
            <div className="d-flex flex-column gap-3">
              {[
                ["Cash on delivery", "Pay in person when your order arrives"],
                ["Bank transfer", "Receive instructions by email after you order"],
              ].map(([n, d], i) => (
                <label
                  key={n}
                  className="d-flex align-items-center gap-3 p-3 p-md-4 rounded-3 border w-100 m-0"
                  style={{
                    backgroundColor: i === 0 ? 'rgba(15, 118, 110, 0.05)' : 'white',
                    borderColor: i === 0 ? '#0F766E' : '#E7E2D9',
                    cursor: 'pointer'
                  }}
                >
                  <input type="radio" name="pay" defaultChecked={i === 0} className="form-check-input mt-0" />
                  <div>
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>{n}</div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{d}</div>
                  </div>
                </label>
              ))}
            </div>
          </Section>
        </div>

        <div className="col-12 col-lg-5">
          <div className="bg-white border p-4 p-md-5 sticky-lg-top" style={{ borderRadius: '1rem', borderColor: '#E7E2D9', top: '88px' }}>
            <div className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
              Order summary
            </div>
            <div className="d-flex flex-column gap-3">
              {expanded.map((it) => (
                <div key={it.id} className="d-flex align-items-center gap-3">
                  <div className="rounded-3 overflow-hidden flex-shrink-0" style={{ width: '56px', height: '56px', backgroundColor: '#FFF8F1' }}>
                    <img src={it.product.image} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark text-truncate" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                      {it.product.name}
                    </div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                      Qty {it.qty}{it.sub ? " · subscription" : ""}
                    </div>
                  </div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                    ${((it.sub ? it.product.subPrice : it.product.price) * it.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-4" style={{ borderTop: '1px solid #E7E2D9' }} />
            <div className="d-flex justify-content-between text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
              <span>Subtotal</span>
              <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-muted mt-2" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
              <span>Shipping</span>
              <span className="fw-semibold text-dark">
                {subtotal >= 40 ? "Free" : "$6.00"}
              </span>
            </div>
            <div className="mt-3 mt-md-4 d-flex justify-content-between align-items-center">
              <span className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>Total</span>
              <span className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '22px' }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={async () => {
                if (placing) return;
                setPlacing(true);
                try {
                  await api.orders.create({
                    shippingAddress: {
                      street: address,
                      city: city,
                      postalCode: zip,
                      country: stateForm
                    },
                    paymentMethod: "cash_on_delivery"
                  });
                  await clearCart();
                  setRoute("order-success");
                } catch (e: any) {
                  toast.error(e.message || "Failed to place order.");
                } finally {
                  setPlacing(false);
                }
              }}
              disabled={placing}
              className="btn w-100 rounded-pill text-white fw-semibold mt-4 d-inline-flex align-items-center justify-content-center gap-2" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '15px' }}
            >
              <Lock size={15} /> {placing ? "Processing..." : "Place order"}
            </button>
            <div className="row g-2 mt-3 text-muted" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
              <div className="col-6 d-flex align-items-center gap-2"><ShieldCheck size={13} style={{ color: '#0F766E' }} /> SSL secure</div>
              <div className="col-6 d-flex align-items-center gap-2"><Truck size={13} style={{ color: '#0F766E' }} /> Free returns</div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

function Section({ title, children }: any) {
  return (
    <div className="bg-white border p-4 p-md-5 d-flex flex-column gap-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
      <div className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '16px' }}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

function Input({ label, wrapperClass = "", value, onChange, ...rest }: any) {
  return (
    <label className={`d-block ${wrapperClass}`}>
      <span className="d-block fw-semibold text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
        {label}
      </span>
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className="form-control border shadow-none"
        style={{ height: '44px', borderRadius: '0.75rem', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '14px' }}
      />
    </label>
  );
}
