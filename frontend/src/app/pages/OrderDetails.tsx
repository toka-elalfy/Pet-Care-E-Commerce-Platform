import {
  ArrowLeft,
  Check,
  Package,
  Truck,
  MapPin,
  CreditCard,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";
import { StatusBadge } from "./Dashboard";

export function OrderDetails({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchOrder() {
      if (!id) return;
      try {
        const res = await api.orders.getById(id);
        if (mounted) setOrder(res.order || res.data || res);
      } catch (err) {
        console.error("Failed to fetch order", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchOrder();
    return () => { mounted = false; };
  }, [id]);

  const actionsNode = (
    <button
      onClick={() => setRoute("orders")}
      className="btn btn-light rounded-pill border fw-semibold bg-white text-dark d-inline-flex align-items-center gap-2"
      style={{ height: '44px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
    >
      <ArrowLeft size={14} /> All orders
    </button>
  );

  if (loading) {
    return <DashboardShell route={route} setRoute={setRoute} title="Loading..." subtitle="" actions={actionsNode}><div className="text-center py-5">Loading order details...</div></DashboardShell>;
  }
  if (!order) {
    return <DashboardShell route={route} setRoute={setRoute} title="Order Not Found" subtitle="" actions={actionsNode}><div className="text-center py-5">Order not found.</div></DashboardShell>;
  }

  const orderItems = order.items || order.orderItems || [];
  const lineItems = orderItems.map((item: any) => ({
    name: item.name || item.product?.title || item.product?.name || "Product",
    image: item.image || item.product?.thumbnail?.url || item.product?.images?.[0]?.url || "",
    qty: item.quantity || item.qty || 1,
    sub: item.purchaseType === "subscription",
    price: item.price || item.product?.price || 0,
    subPrice: item.discountPrice || item.product?.discountPrice || item.price || item.product?.price || 0,
  }));

  const calculatedSubtotal = lineItems.reduce((s: number, it: any) => s + (it.sub ? it.subPrice : it.price) * it.qty, 0);
  const subtotal = order.subtotal || calculatedSubtotal;
  const shipping = order.shippingPrice || order.shipping || (subtotal >= 40 ? 0 : 6);
  const total = order.totalAmount || order.total || (subtotal + shipping);

  const orderDateObj = new Date(order.date || order.createdAt || new Date());
  const orderDateStr = !isNaN(orderDateObj.getTime()) ? orderDateObj.toLocaleDateString() : (order.date || order.createdAt || "Unknown");

  const timeline = [
    { label: "Order placed", date: orderDateStr, done: true },
    { label: "Processing", date: orderDateStr, done: true },
    {
      label: "Shipped",
      date: order.status === "Delivered" || order.status === "Shipped" ? orderDateStr : "—",
      done: order.status === "Delivered" || order.status === "Shipped",
    },
    {
      label: "Delivered",
      date: order.status === "Delivered" ? orderDateStr : "Estimated 2–3 days",
      done: order.status === "Delivered",
    },
  ];

  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title={"Order " + (order.id || order._id || id)}
      subtitle={"Placed " + orderDateStr}
      actions={actionsNode}
    >
      <div className="row g-4">
        <div className="col-12 col-lg-8 d-flex flex-column gap-4">
          {/* Status tracker */}
          <div className="bg-white border p-4 p-md-5" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                  <Package size={18} />
                </div>
                <div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                    {order.status === "Delivered"
                      ? "Delivered"
                      : order.status === "Shipped"
                        ? "On the way"
                        : "Being prepared"}
                  </div>
                  <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                    Tracking #1Z999AA10123456784
                  </div>
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="position-relative row g-2">
              {timeline.map((s, i) => (
                <div key={s.label} className="col-3 position-relative">
                  {i < timeline.length - 1 && (
                    <div
                      className="position-absolute"
                      style={{
                        top: '1rem',
                        left: 'calc(50% + 16px)',
                        right: 'calc(-50% + 16px)',
                        height: '2px',
                        backgroundColor: timeline[i + 1].done ? '#0F766E' : '#E7E2D9'
                      }}
                    />
                  )}
                  <div
                    className="position-relative bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px', height: '32px',
                      backgroundColor: s.done ? '#0F766E' : '#FFF8F1',
                      border: s.done ? 'none' : '2px solid #E7E2D9',
                      color: s.done ? 'white' : '#6B7280'
                    }}
                  >
                    {s.done ? <Check size={14} /> : <span className="rounded-circle bg-current" style={{ width: '8px', height: '8px' }} />}
                  </div>
                  <div className="mt-3 text-center">
                    <div
                      className="fw-semibold"
                      style={{ fontFamily: 'Sora', fontSize: '12px', color: s.done ? '#1F2937' : '#6B7280' }}
                    >
                      {s.label}
                    </div>
                    <div className="text-muted mt-1" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                      {s.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white border p-4 p-md-5" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
              Items in this order
            </div>
            <div>
              {lineItems.map((it: any, i: number) => (
                <div key={i} className="py-3 d-flex gap-4 align-items-center border-top" style={{ borderColor: '#E7E2D9' }}>
                  <img
                    src={it.image}
                    className="rounded-3 object-fit-cover"
                    style={{ width: '64px', height: '64px', backgroundColor: '#FFF8F1' }}
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-semibold text-dark text-truncate" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                      {it.name}
                    </div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                      Qty {it.qty}
                      {it.sub ? " · subscription" : " · one-time"}
                    </div>
                  </div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                    ${((it.sub ? it.subPrice : it.price) * it.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-top d-flex flex-wrap gap-2" style={{ borderColor: '#E7E2D9' }}>
              <button
                onClick={() => setRoute("cart")}
                className="btn rounded-pill border-0 text-white fw-semibold d-inline-flex align-items-center gap-2"
                style={{ height: '40px', padding: '0 1rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '13px' }}
              >
                <ShoppingCart size={13} /> Reorder
              </button>
              <button
                onClick={() => setRoute("subscriptions")}
                className="btn btn-light rounded-pill border fw-semibold bg-white text-dark d-inline-flex align-items-center gap-2"
                style={{ height: '40px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
              >
                <RefreshCw size={13} /> Convert to subscription
              </button>
            </div>
          </div>
        </div>

        <aside className="col-12 col-lg-4 d-flex flex-column gap-4">
          <Card title="Delivery address" icon={<MapPin size={15} />}>
            <div className="text-dark" style={{ fontFamily: 'Manrope', fontSize: '13px', lineHeight: '1.6' }}>
              Sarah Johnson
              <br />
              128 Willow Lane
              <br />
              Austin, TX 78701
              <br />
              (512) 555-0134
            </div>
          </Card>
          <Card title="Shipping method" icon={<Truck size={15} />}>
            <div className="text-dark" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
              Standard · 3–5 business days
            </div>
          </Card>
          <Card title="Payment" icon={<CreditCard size={15} />}>
            <div className="text-dark" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
              Cash on delivery
            </div>
          </Card>
          <div className="bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
              Summary
            </div>
            <div className="d-flex flex-column gap-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
              <Row label="Tax" value="$0.00" />
            </div>
            <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center" style={{ borderColor: '#E7E2D9' }}>
              <span className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>Total</span>
              <span className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '18px' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function Card({ title, icon, children }: any) {
  return (
    <div className="bg-white border p-4" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
      <div className="d-flex align-items-center gap-2 fw-semibold text-uppercase text-muted mb-3" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.14em' }}>
        <span style={{ color: '#0F766E' }}>{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <span>{label}</span>
      <span className="fw-semibold text-dark">{value}</span>
    </div>
  );
}
