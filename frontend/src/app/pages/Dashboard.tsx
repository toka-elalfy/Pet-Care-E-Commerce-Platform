import {
  Bell,
  Package,
  RefreshCw,
  Sparkles,
  TrendingUp,
  ArrowRight,
  PawPrint,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardShell } from "../components/ui/DashboardShell";
import { api } from "../api";

export function Dashboard({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const [data, setData] = useState({
    pets: [] as any[],
    orders: [] as any[],
    subs: [] as any[],
    rems: [] as any[],
    loading: true
  });

  useEffect(() => {
    Promise.all([
      api.pets.getAll(),
      api.orders.getAll(),
      api.subscriptions.getAll(),
      api.reminders.getAll()
    ]).then(([p, o, s, r]) => {
      // Safely extract array values handling different backend envelope types
      const petsData = Array.isArray(p) ? p : p?.pets || p?.data || [];
      const ordersData = Array.isArray(o) ? o : o?.orders || o?.data || [];
      const subsData = Array.isArray(s) ? s : s?.subscriptions || s?.data || [];
      const remsPayload = r?.reminders || r?.data || r || {};

      const upcoming = (remsPayload.upcomingDeliveries || []).map((x: any) => ({
        id: x._id,
        urgency: "high",
        title: "Upcoming delivery",
        product: x.product?.title || x.product?.name,
        left: x.nextDeliveryDate ? new Date(x.nextDeliveryDate).toLocaleDateString() : "Soon",
        action: "Manage"
      }));

      const runningLow = (remsPayload.runningLow || []).map((x: any) => ({
        id: x._id,
        urgency: "medium",
        title: "Running low",
        product: x.title || x.name,
        left: "Based on previous order",
        action: "Reorder"
      }));

      setData({
        pets: petsData,
        orders: ordersData.map((x: any) => ({
          id: x._id.substring(x._id.length - 6).toUpperCase(),
          date: new Date(x.createdAt).toLocaleDateString(),
          status: (x.orderStatus || x.status || "Pending").charAt(0).toUpperCase() + (x.orderStatus || x.status || "Pending").slice(1),
          total: x.totalAmount || x.totalPrice || 0,
          rawId: x._id
        })),
        subs: subsData.map((x: any) => ({
          id: x._id,
          product: x.product?.title || x.product?.name || "Subscription item",
          frequency: x.frequency,
          next: x.nextDeliveryDate ? new Date(x.nextDeliveryDate).toLocaleDateString() : "-"
        })),
        rems: [...upcoming, ...runningLow],
        loading: false
      });
    }).catch(console.error);
  }, []);

  if (data.loading) {
    return (
      <DashboardShell route={route} setRoute={setRoute} title="Loading dashboard..." subtitle="Grabbing your information.">
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-secondary" role="status" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title="Welcome back, Sarah 👋"
      subtitle="Here's what's happening in the Johnson household today."
      actions={
        <button
          onClick={() => setRoute("shop")}
          className="h-11 px-5 rounded-full bg-[#0F766E] text-white font-[Manrope] font-semibold text-[14px] inline-flex items-center gap-2"
        >
          <Sparkles size={15} /> See picks for my pets
        </button>
      }
    >
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3"><Stat icon={<PawPrint size={16} />} label="Pets" value={data.pets.length.toString()} trend="Up to date" /></div>
        <div className="col-12 col-sm-6 col-lg-3"><Stat icon={<Package size={16} />} label="Total orders" value={data.orders.length.toString()} trend="All time" /></div>
        <div className="col-12 col-sm-6 col-lg-3"><Stat icon={<RefreshCw size={16} />} label="Active subs" value={data.subs.length.toString()} trend="15% saved" /></div>
        <div className="col-12 col-sm-6 col-lg-3"><Stat icon={<Bell size={16} />} label="Reminders" value={data.rems.length.toString()} trend={`${data.rems.filter(x => x.urgency === 'high').length} needs action`} /></div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8 d-flex flex-column gap-4">
          <Card
            title="Your pets"
            action={
              <button
                onClick={() => setRoute("pets")}
                className="btn btn-link p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
                style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}
              >
                Manage pets <ArrowRight size={14} />
              </button>
            }
          >
            <div className="row g-3">
              {data.pets.length === 0 ? <p className="text-muted">No pets added yet.</p> : data.pets.map((p) => (
                <div key={p._id || p.id} className="col-12 col-md-6 col-xl-4">
                  <div className="border p-3 d-flex gap-3 h-100" style={{ backgroundColor: '#FFF8F1', borderRadius: '1rem', borderColor: '#E7E2D9' }}>
                    <img
                      src={p.photo || p.avatar || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=2574"}
                      className="rounded-3 object-fit-cover flex-shrink-0"
                      style={{ width: '56px', height: '56px' }}
                      alt={p.name}
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
                        {p.name}
                      </div>
                      <div className="text-muted text-truncate" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                        {p.breed || p.type} · {p.age ? p.age + ' yrs' : '-'} · {p.weight ? p.weight + ' lbs' : '-'}
                      </div>
                      <button
                        onClick={() => setRoute("recommendations")}
                        className="btn btn-link p-0 text-decoration-none mt-2 fw-semibold"
                        style={{ fontFamily: 'Manrope', fontSize: '12px', color: '#0F766E' }}
                      >
                        View picks →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Recent orders"
            action={
              <button
                onClick={() => setRoute("orders")}
                className="btn btn-link p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
                style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}
              >
                View all <ArrowRight size={14} />
              </button>
            }
          >
            <div className="border overflow-hidden" style={{ borderRadius: '0.75rem', borderColor: '#E7E2D9' }}>
              <table className="table table-hover mb-0 text-start align-middle">
                <thead>
                  <tr>
                    <th className="px-3 py-2 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Order</th>
                    <th className="px-3 py-2 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Date</th>
                    <th className="px-3 py-2 fw-semibold text-uppercase text-muted border-0" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Status</th>
                    <th className="px-3 py-2 fw-semibold text-uppercase text-muted border-0 text-end" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', backgroundColor: '#FFF8F1' }}>Total</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#1F2937' }}>
                  {data.orders.length === 0 && <tr><td colSpan={4} className="p-3 text-muted">No recent orders found.</td></tr>}
                  {data.orders.slice(0, 4).map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => setRoute("orders")}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="px-3 py-2 fw-semibold">{o.id}</td>
                      <td className="px-3 py-2 text-muted">{o.date}</td>
                      <td className="px-3 py-2">
                        <StatusBadge status={o.status} />
                      </td>
                      <td className="px-3 py-2 text-end fw-semibold">
                        ${o.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-4 d-flex flex-column gap-4">
          <Card
            title="Reorder reminders"
            action={
              <button
                onClick={() => setRoute("reminders")}
                className="btn btn-link p-0 text-decoration-none fw-semibold"
                style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}
              >
                All
              </button>
            }
          >
            <div className="d-flex flex-column gap-3">
              {data.rems.length === 0 ? <p className="text-muted">You're all caught up!</p> : data.rems.slice(0, 4).map((r) => (
                <div
                  key={r.id}
                  className="p-3 border"
                  style={{ borderRadius: '0.75rem', borderColor: '#E7E2D9', backgroundColor: '#FFF8F1' }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="rounded-circle"
                      style={{
                        width: '8px', height: '8px',
                        backgroundColor: r.urgency === "high" ? "#DC2626" : r.urgency === "medium" ? "#F59E0B" : "#16A34A"
                      }}
                    />
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                      {r.title}
                    </div>
                  </div>
                  <div className="mt-1 text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                    {r.product} · {r.left}
                  </div>
                  <button className="btn btn-link p-0 text-decoration-none mt-2 fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '12px', color: '#0F766E' }}>
                    {r.action} →
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Active subscriptions">
            <div className="d-flex flex-column gap-2">
              {data.subs.length === 0 ? <p className="text-muted mb-0">No active subscriptions.</p> : data.subs.slice(0, 2).map((s) => (
                <div
                  key={s.id}
                  className="p-3 border d-flex gap-3 align-items-center"
                  style={{ borderRadius: '0.75rem', borderColor: '#E7E2D9' }}
                >
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                    <RefreshCw size={16} />
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-semibold text-dark text-truncate" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                      {s.product}
                    </div>
                    <div className="text-muted text-truncate" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                      {s.frequency} · next {s.next}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

function Stat({ icon, label, value, trend }: any) {
  return (
    <div className="bg-white border p-4 h-100" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
      <div className="d-flex align-items-center gap-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
        <span style={{ color: '#0F766E' }}>{icon}</span>
        {label}
      </div>
      <div className="mt-2 fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '28px' }}>{value}</div>
      <div className="mt-1 d-inline-flex align-items-center gap-1 fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '11px', color: '#0F766E' }}>
        <TrendingUp size={12} /> {trend}
      </div>
    </div>
  );
}

function Card({ title, action, children }: any) {
  return (
    <div className="bg-white border p-4 h-100" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string, text: string }> = {
    Delivered: { bg: 'rgba(167, 199, 163, 0.3)', text: '#0F766E' },
    Shipped: { bg: 'rgba(15, 118, 110, 0.1)', text: '#0F766E' },
    Processing: { bg: 'rgba(245, 158, 11, 0.15)', text: '#B45309' },
    Pending: { bg: '#E7E2D9', text: '#6B7280' },
    Paused: { bg: 'rgba(107, 114, 128, 0.15)', text: '#6B7280' },
    Active: { bg: 'rgba(167, 199, 163, 0.3)', text: '#0F766E' },
  };

  const style = map[status] ?? { bg: '#E7E2D9', text: '#6B7280' };

  return (
    <span
      className="d-inline-block rounded-pill fw-semibold"
      style={{
        padding: '0.25rem 0.6rem',
        fontFamily: 'Manrope',
        fontSize: '11px',
        backgroundColor: style.bg,
        color: style.text
      }}
    >
      {status}
    </span>
  );
}
