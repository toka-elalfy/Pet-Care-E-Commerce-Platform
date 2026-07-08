import { ArrowLeft, Trash2, ShoppingBag, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";
import { useCartContext } from "../context/CartContext";

export function Cart({
  setRoute,
}: {
  setRoute: (r: string) => void;
}) {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, loadingCart } = useCartContext();

  const expanded = cart
    .filter(it => it.product)
    .map(it => ({ ...it, product: it.product! })) as (CartItem & { product: NonNullable<CartItem['product']> })[];

  const subtotal = expanded.reduce(
    (s, it) => s + (it.sub ? it.product.subPrice : it.product.price) * it.qty,
    0
  );
  const shipping = subtotal >= 40 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  if (expanded.length === 0) {
    return (
      <div className="container-fluid text-center py-5 px-4" style={{ maxWidth: '1280px', marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center border" style={{ width: '80px', height: '80px', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9' }}>
          <ShoppingBag size={30} style={{ color: '#0F766E' }} />
        </div>
        <h1 className="mt-4 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '28px' }}>
          Your cart is empty
        </h1>
        <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
          Once you add something, it'll show up here.
        </p>
        <button
          onClick={() => setRoute("shop")}
          className="btn rounded-pill text-white fw-semibold mt-4" style={{ height: '44px', padding: '0 1.5rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
        >
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 px-3 px-md-4" style={{ maxWidth: '1280px' }}>
      <button
        onClick={() => navigate(-1)}
        className="btn bg-white border rounded-pill d-inline-flex align-items-center gap-2 fw-semibold text-dark mb-4 transition-colors"
        style={{ height: '32px', padding: '0 0.75rem 0 0.5rem', fontFamily: 'Manrope', fontSize: '12px', borderColor: '#E7E2D9' }}
      >
        <ArrowLeft size={13} />
        Back
      </button>
      <h1 className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '32px' }}>Your cart</h1>
      <p className="mt-1 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
        {expanded.length} items · review before checkout
      </p>
      <div className="row g-4 mt-2">
        <div className="col-12 col-lg-8 d-flex flex-column gap-3">
          {expanded.map((it) => (
            <div
              key={it.id}
              className="bg-white border p-3 p-md-4 d-flex gap-3 gap-md-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}
            >
              <div className="rounded-3 overflow-hidden flex-shrink-0" style={{ width: '112px', height: '112px', backgroundColor: '#FFF8F1' }}>
                <img src={it.product.image} className="w-100 h-100 object-fit-cover" />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between gap-3">
                  <div>
                    <div className="text-muted text-uppercase fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.05em' }}>
                      {it.product.brand}
                    </div>
                    <div className="fw-semibold text-dark mt-1" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                      {it.product.name}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(it.id)}
                    className="btn btn-link p-0 text-muted shadow-none m-0 h-auto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="mt-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-1 border rounded-pill p-1" style={{ backgroundColor: '#FFF8F1', borderColor: '#E7E2D9' }}>
                      <button
                        onClick={() => updateCartItem(it.id, Math.max(1, it.qty - 1), it.sub)}
                        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 border-0" style={{ width: '28px', height: '28px' }}
                      >
                        −
                      </button>
                      <div className="text-center fw-semibold" style={{ width: '32px', fontFamily: 'Sora', fontSize: '13px' }}>
                        {it.qty}
                      </div>
                      <button
                        onClick={() => updateCartItem(it.id, it.qty + 1, it.sub)}
                        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 border-0" style={{ width: '28px', height: '28px' }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => updateCartItem(it.id, it.qty, !it.sub)}
                      className={`btn rounded-pill border fw-semibold d-inline-flex align-items-center gap-2 px-3 ${it.sub ? 'text-white' : 'bg-white text-dark'}`}
                      style={{
                        height: '32px', fontFamily: 'Manrope', fontSize: '12px',
                        backgroundColor: it.sub ? '#0F766E' : 'white',
                        borderColor: it.sub ? '#0F766E' : '#E7E2D9'
                      }}
                    >
                      <RefreshCw size={12} />
                      {it.sub ? "Subscription (save 15%)" : "One-time"}
                    </button>
                  </div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                    ${((it.sub ? it.product.subPrice : it.product.price) * it.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-4">
          <div className="bg-white border p-4 p-md-5 sticky-lg-top" style={{ borderRadius: '1rem', borderColor: '#E7E2D9', top: '88px' }}>
            <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
              Order summary
            </div>
            <div className="mt-4 d-flex flex-column gap-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row
                label="Shipping"
                value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              />
              <Row label="Estimated tax" value="$0.00" />
            </div>
            <div className="my-4" style={{ borderTop: '1px solid #E7E2D9' }} />
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>Total</span>
              <span className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '22px' }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setRoute("checkout")}
              className="btn w-100 rounded-pill text-white fw-semibold mt-4" style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '15px' }}
            >
              Secure checkout
            </button>
            <button
              onClick={() => setRoute("shop")}
              className="btn w-100 rounded-pill bg-white border fw-semibold text-dark mt-2" style={{ height: '44px', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

function Row({ label, value }: any) {
  return (
    <div className="d-flex justify-content-between">
      <span>{label}</span>
      <span className="fw-semibold text-dark">{value}</span>
    </div>
  );
}
