import {
  LayoutDashboard,
  Package,
  Users,
  Activity,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  Lock,
  PawPrint,
  Search,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api";
import { StatusBadge } from "./Dashboard";
import type { ReactNode } from "react";

export function AdminLogin({
  setRoute,
}: {
  setRoute: (r: string) => void;
}) {
  return (
    <div className="d-flex align-items-center justify-content-center px-4" style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: '#0F1F1D' }}>
      <div className="w-100 bg-white p-4 p-md-5" style={{ maxWidth: '420px', borderRadius: '1.5rem' }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 text-white" style={{ width: '40px', height: '40px', backgroundColor: '#0F766E' }}>
            <Lock size={18} />
          </div>
          <div>
            <div className="fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '18px' }}>Zootopia Admin</div>
            <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
              Restricted access
            </div>
          </div>
        </div>
        <h1 className="fw-bold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '26px' }}>
          Admin sign in
        </h1>
        <div className="d-flex flex-column gap-3">
          <input
            placeholder="Admin email"
            className="form-control rounded-3 border shadow-none"
            style={{ height: '48px', backgroundColor: '#FFF8F1', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control rounded-3 border shadow-none"
            style={{ height: '48px', backgroundColor: '#FFF8F1', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
          />
          <input
            placeholder="2FA code"
            className="form-control rounded-3 border shadow-none"
            style={{ height: '48px', backgroundColor: '#FFF8F1', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
          />
          <button
            onClick={() => setRoute("admin")}
            className="btn w-100 rounded-pill text-white fw-semibold border-0 mt-3"
            style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
          >
            Secure sign in
          </button>
          <button
            onClick={() => setRoute("home")}
            className="btn w-100 text-muted shadow-none bg-transparent m-0 p-0"
            style={{ fontFamily: 'Manrope', fontSize: '13px' }}
          >
            ← Back to site
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminShell({
  route,
  setRoute,
  title,
  children,
  actions,
}: {
  route: string;
  setRoute: (r: string) => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const items = [
    ["admin", "Overview", LayoutDashboard],
    ["admin-products", "Products", Package],
    ["admin-orders", "Orders", ShoppingBag],
    ["admin-users", "Users", Users],
    ["admin-activity", "Activity", Activity],
  ] as const;
  return (
    <div className="row g-0 m-0" style={{ minHeight: 'calc(100vh - 72px)', backgroundColor: '#FAF7F2' }}>
      <aside className="d-none d-lg-flex col-lg-2 flex-column p-4 gap-2" style={{ backgroundColor: '#0F1F1D', color: 'white', minHeight: '100%' }}>
        <div className="d-flex align-items-center gap-2 mb-4 px-2">
          <div className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '36px', height: '36px', backgroundColor: '#F97360' }}>
            <PawPrint size={17} />
          </div>
          <div>
            <div className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '14px' }}>Zootopia</div>
            <div className="text-white-50 text-uppercase fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '10px', letterSpacing: '0.1em' }}>
              Admin
            </div>
          </div>
        </div>
        {items.map(([r, label, Icon]) => (
          <button
            key={r}
            onClick={() => setRoute(r)}
            className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded-3 border-0 shadow-none text-white transition-colors`}
            style={{
              fontFamily: 'Manrope', fontSize: '13px',
              backgroundColor: route === r ? 'rgba(255,255,255,0.1)' : 'transparent',
              opacity: route === r ? 1 : 0.6
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
        <div className="mt-auto pt-3 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setRoute("home")}
            className="btn text-white-50 shadow-none px-3 py-2 rounded-3 border-0 text-start w-100"
            style={{ fontFamily: 'Manrope', fontSize: '12px' }}
          >
            ← Back to site
          </button>
        </div>
      </aside>
      <main className="col-12 col-lg-10 p-4 p-md-5">
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-4 mb-4">
          <h1 className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '28px' }}>{title}</h1>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}

export function AdminDashboard({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.orders.getAll().then((data) => {
      if (mounted) {
        setOrders(data);
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <AdminShell route={route} setRoute={setRoute} title="Platform overview">
      <div className="row g-3 g-md-4">
        {[
          ["Revenue (30d)", "$128,420", "+12.4%"],
          ["New orders", "1,284", "+5.2%"],
          ["Active subscribers", "4,092", "+2.1%"],
          ["Products live", "328", "+8 new"],
        ].map(([l, v, t]) => (
          <div key={l} className="col-6 col-lg-3">
            <div className="bg-white border p-4 h-100" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
              <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>{l}</div>
              <div className="mt-2 fw-bold text-dark" style={{ fontFamily: 'Sora', fontSize: '26px' }}>{v}</div>
              <div className="mt-1 fw-semibold d-inline-flex align-items-center gap-1" style={{ fontFamily: 'Manrope', fontSize: '11px', color: '#0F766E' }}>
                <TrendingUp size={12} /> {t}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-1">
        <div className="col-12 col-lg-8">
          <div className="bg-white border p-4 h-100 flex-column d-flex" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '16px' }}>Orders (7 days)</div>
              <select className="form-select border rounded-pill shadow-none fw-semibold text-dark w-auto" style={{ height: '36px', paddingLeft: '1rem', fontFamily: 'Manrope', fontSize: '12px', borderColor: '#E7E2D9' }}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="d-flex align-items-end gap-3 mt-auto" style={{ height: '192px' }}>
              {[40, 62, 55, 78, 90, 72, 95].map((v, i) => (
                <div key={i} className="flex-grow-1 d-flex flex-column align-items-center gap-2 h-100 justify-content-end">
                  <div
                    className="w-100 rounded-top"
                    style={{ height: `${v}%`, backgroundImage: 'linear-gradient(to top, #0F766E, #A7C7A3)' }}
                  />
                  <div className="text-muted text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="bg-white border p-4 h-100" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
            <div className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '16px' }}>Alerts</div>
            <div className="d-flex flex-column gap-3">
              {[
                ["Low stock: Wildroot Salmon 12kg", "high"],
                ["Delayed shipment: Austin hub", "medium"],
                ["Refund flagged: ORD-10433", "medium"],
              ].map(([t, u]) => (
                <div key={t} className="d-flex gap-3 align-items-start">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: '32px', height: '32px',
                      backgroundColor: u === "high" ? 'rgba(220, 38, 38, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: u === "high" ? '#DC2626' : '#B45309'
                    }}
                  >
                    <AlertCircle size={15} />
                  </div>
                  <div className="flex-grow-1 text-dark" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                    {t}
                    <div className="text-muted mt-1" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                      3 hours ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white border p-4 overflow-auto" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
        <div className="fw-semibold text-dark mb-4" style={{ fontFamily: 'Sora', fontSize: '16px' }}>Recent activity</div>
        <table className="table table-borderless m-0 w-100">
          <thead className="text-uppercase text-muted" style={{ fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em', borderBottom: '1px solid #E7E2D9' }}>
            <tr>
              <th className="py-3 px-2">Order</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Items</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-end">Total</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
            {loading ? (
              <tr><td colSpan={5} className="py-4 px-2 text-center text-muted">Loading activity...</td></tr>
            ) : orders.map((o) => {
              const orderId = o.id || o._id;
              const status = o.status || "Processing";
              const totalAmount = o.totalAmount || o.total || 0;
              const orderItems = o.items || o.orderItems || [];
              const itemsText = orderItems.map((i: any) => i.name || i.product?.title || i.product?.name || "Item").join(", ");
              return (
                <tr key={orderId} style={{ borderBottom: '1px solid #E7E2D9' }}>
                  <td className="py-3 px-2 fw-semibold text-dark align-middle">{orderId?.substring(0, 8) || orderId}</td>
                  <td className="py-3 px-2 align-middle text-dark">Sarah Johnson</td>
                  <td className="py-3 px-2 text-muted align-middle text-truncate" style={{ maxWidth: '260px' }}>{itemsText || "No items"}</td>
                  <td className="py-3 px-2 align-middle"><StatusBadge status={status} /></td>
                  <td className="py-3 px-2 text-end fw-semibold text-dark align-middle">${Number(totalAmount).toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

export function AdminProducts({
  route,
  setRoute,
}: {
  route: string;
  setRoute: (r: string) => void;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.products.getAll().then((data) => {
      if (mounted) {
        setProducts(data?.products);
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <AdminShell
      route={route}
      setRoute={setRoute}
      title="Products"
      actions={
        <button className="btn rounded-pill border-0 text-white fw-semibold d-inline-flex align-items-center gap-2"
          style={{ height: '44px', padding: '0 1.25rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}>
          <Plus size={15} /> Add product
        </button>
      }
    >
      <div className="d-flex gap-3 mb-4">
        <div className="position-relative flex-grow-1" style={{ maxWidth: '360px' }}>
          <Search size={16} className="position-absolute top-50 translate-middle-y text-muted" style={{ left: '1rem' }} />
          <input
            placeholder="Search products…"
            className="form-control rounded-pill border shadow-none"
            style={{ paddingLeft: '2.5rem', paddingRight: '1rem', height: '44px', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
          />
        </div>
      </div>
      <div className="bg-white border overflow-auto" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
        <table className="table table-borderless m-0 w-100 text-start align-middle">
          <thead className="text-uppercase text-muted" style={{ backgroundColor: '#FFF8F1', fontFamily: 'Manrope', fontSize: '11px', letterSpacing: '0.14em' }}>
            <tr>
              <th className="py-3 px-4 flex-grow-1">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Pet</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-4 text-muted">Loading products...</td></tr>
            ) : products.map((p, i) => (
              <tr key={p.id} style={{ borderTop: '1px solid #E7E2D9' }}>
                <td className="px-4 py-3 d-flex align-items-center gap-3 bg-white">
                  <img src={p.image || p.thumbnail?.url || ""} className="rounded-3 object-fit-cover flex-shrink-0" style={{ width: '40px', height: '40px', backgroundColor: '#FFF8F1' }} />
                  <div>
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>{p.name}</div>
                    <div className="text-muted" style={{ fontSize: '11px' }}>{p.brand}</div>
                  </div>
                </td>
                <td className="px-4 py-3 bg-white text-dark">{p.category}</td>
                <td className="px-4 py-3 bg-white text-dark">{p.petType || "All"}</td>
                <td className="px-4 py-3 bg-white fw-semibold text-dark">${p.price}</td>
                <td className="px-4 py-3 bg-white">
                  <StatusBadge status={i % 4 === 0 ? "Processing" : "Active"} />
                </td>
                <td className="px-4 py-3 bg-white text-end">
                  <button className="btn btn-link p-0 fw-semibold text-decoration-none shadow-none" style={{ fontFamily: 'Manrope', fontSize: '12px', color: '#0F766E' }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
