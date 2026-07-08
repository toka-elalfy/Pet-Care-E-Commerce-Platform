import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";
import { StatusBadge } from "./Dashboard";

export function Orders({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchOrders() {
      try {
        const data = await api.orders.getAll();
        if (mounted) setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchOrders();
    return () => { mounted = false; };
  }, []);
  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title="Orders"
      subtitle="Track, reorder, and manage every delivery."
    >
      <div className="d-flex flex-wrap gap-3 mb-4">
        <div className="position-relative flex-grow-1" style={{ minWidth: '220px' }}>
          <Search size={16} className="position-absolute top-50 translate-middle-y text-muted" style={{ left: '12px' }} />
          <input
            placeholder="Search orders, products…"
            className="form-control rounded-pill border"
            style={{ paddingLeft: '36px', height: '44px', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
          />
        </div>
        {["All", "Processing", "Shipped", "Delivered"].map((f, i) => (
          <button
            key={f}
            className={`btn rounded-pill fw-semibold border ${i === 0 ? "text-white" : "bg-white text-dark"}`}
            style={{
              height: '44px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '13px',
              borderColor: i === 0 ? '#0F766E' : '#E7E2D9',
              backgroundColor: i === 0 ? '#0F766E' : 'white'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border overflow-hidden" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
        <table className="table table-hover mb-0 text-start align-middle">
          <thead>
            <tr>
              <th className="px-4 py-3 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Order</th>
              <th className="px-4 py-3 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Date</th>
              <th className="px-4 py-3 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Items</th>
              <th className="px-4 py-3 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Status</th>
              <th className="px-4 py-3 fw-semibold text-uppercase text-muted border-0 text-end" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Total</th>
              <th className="px-4 py-3 fw-semibold text-uppercase text-muted border-0" style={{ backgroundColor: '#FFF8F1' }} />
            </tr>
          </thead>
          <tbody style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#1F2937' }}>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-4 text-muted">Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-4 text-muted">No orders found.</td></tr>
            ) : orders.map((o) => {
              const orderId = o.id || o._id;
              const dateObj = new Date(o.date || o.createdAt);
              const formattedDate = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString() : (o.date || o.createdAt || "Unknown");
              const orderItems = o.items || o.orderItems || [];
              const itemsText = orderItems.map((i: any) => i.name || i.product?.title || i.product?.name || "Item").join(", ");
              const totalAmount = o.total || o.totalAmount || 0;
              return (
                <tr
                  key={orderId}
                  onClick={() => navigate(`/orders/${orderId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="px-4 py-3 fw-semibold" style={{ fontFamily: 'Sora' }}>{orderId?.substring(0, 8) || orderId}</td>
                  <td className="px-4 py-3 text-muted">{formattedDate}</td>
                  <td className="px-4 py-3 text-secondary text-truncate" style={{ maxWidth: '320px' }}>
                    {itemsText || "No items"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status || "Processing"} />
                  </td>
                  <td className="px-4 py-3 text-end fw-semibold">
                    ${Number(totalAmount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-link p-0 text-decoration-none fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
