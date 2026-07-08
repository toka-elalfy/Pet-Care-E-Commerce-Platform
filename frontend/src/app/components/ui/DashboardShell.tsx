import {
  LayoutDashboard,
  PawPrint,
  ShoppingBag,
  Package,
  RefreshCw,
  Bell,
  Sparkles,
  Settings,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { usePets, useOrders, useSubscriptions, useReminders } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";

type Item = {
  route: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: number;
  tone?: "default" | "alert";
};

const primary: Item[] = [
  { route: "dashboard", label: "Overview", icon: LayoutDashboard },
  { route: "pets", label: "My Pets", icon: PawPrint },
  { route: "recommendations", label: "For My Pet", icon: Sparkles },
];

const footerNav: Item[] = [
  { route: "account", label: "Account", icon: Settings },
];

export function DashboardShell({
  route,
  setRoute,
  children,
  title,
  subtitle,
  actions,
}: {
  route: string;
  setRoute: (r: string) => void;
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const { status: petsStatus, value: pets } = usePets();
  const { status: ordersStatus, value: orders } = useOrders();
  const { status: subsStatus, value: subscriptions } = useSubscriptions();
  const { status: remsStatus, value: reminders } = useReminders();

  const isPending = petsStatus !== "success" || ordersStatus !== "success" || subsStatus !== "success" || remsStatus !== "success";

  if (isPending || !pets || !orders || !subscriptions || !reminders) {
    return (
      <div className="d-flex w-100 flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border" style={{ color: '#0F766E' }} role="status">
          <span className="visually-hidden">Loading Dashboard Data...</span>
        </div>
      </div>
    );
  }

  const openOrders = orders.filter((o: any) => o.status === "Processing" || o.status === "Shipped").length;
  const activeSubs = subscriptions.filter((s: any) => s.status === "Active").length;
  const reminderCount = reminders.length;

  const commerce: Item[] = [
    { route: "shop", label: "Shop", icon: ShoppingBag },
    { route: "orders", label: "Orders", icon: Package, badge: openOrders },
    {
      route: "subscriptions",
      label: "Subscriptions",
      icon: RefreshCw,
      badge: activeSubs,
    },
    {
      route: "reminders",
      label: "Reminders",
      icon: Bell,
      badge: reminderCount,
      tone: "alert",
    },
  ];

  return (
    <div className="container-fluid" style={{ maxWidth: '1280px', padding: '2rem 1.5rem' }}>
      <div className="row g-4">
        <aside className="d-none d-lg-block col-lg-3">
          <div
            className="sticky-top bg-white border p-3 d-flex flex-column"
            style={{
              top: '88px',
              borderRadius: '1.5rem',
              borderColor: 'rgba(231, 226, 217, 0.8)',
              boxShadow: '0 1px 2px rgba(17, 24, 39, 0.04), 0 8px 24px -12px rgba(15, 118, 110, 0.12)',
            }}
          >
            <HouseholdBlock pets={pets} activeSubs={activeSubs} />

            <NavGroup label="Menu">
              {primary.map((it) => (
                <NavRow key={it.route} item={it} active={route === it.route} onClick={() => setRoute(it.route)} />
              ))}
            </NavGroup>

            <NavGroup label="Shopping">
              {commerce.map((it) => (
                <NavRow key={it.route} item={it} active={route === it.route} onClick={() => setRoute(it.route)} />
              ))}
            </NavGroup>

            <div className="mt-3 mx-2 border-top" style={{ borderColor: 'rgba(231, 226, 217, 0.8)' }} />

            <nav className="mt-3 d-flex flex-column gap-1">
              {footerNav.map((it) => (
                <NavRow key={it.route} item={it} active={route === it.route} onClick={() => setRoute(it.route)} />
              ))}
            </nav>
          </div>
        </aside>

        <main className="col-12 col-lg-9">
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
            <div>
              <h1 className="m-0 fw-semibold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '28px' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 mb-0 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
                  {subtitle}
                </p>
              )}
            </div>
            {actions}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function HouseholdBlock({ pets, activeSubs }: { pets: any[], activeSubs: number }) {
  const { user } = useAuth();
  const avatars = pets.slice(0, 3);
  return (
    <div className="mx-1 mb-2 p-3 border transition-all hover-lift" style={{ borderRadius: '1rem', backgroundImage: 'linear-gradient(to bottom right, #FFF8F1, #ffffff)', borderColor: 'rgba(231, 226, 217, 0.7)' }}>
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative d-flex" style={{ marginLeft: '-0.5rem' }}>
          {avatars.map((p: any) => (
            <img
              key={p.id || p._id}
              src={p.photo || p.avatar || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=2574"}
              alt={p.name}
              className="rounded-circle object-fit-cover border border-2 border-white"
              style={{ width: '36px', height: '36px' }}
            />
          ))}
          {pets.length > avatars.length && (
            <div className="rounded-circle text-white border border-2 border-white d-flex align-items-center justify-content-center fw-semibold" style={{ width: '36px', height: '36px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '11px' }}>
              +{pets.length - avatars.length}
            </div>
          )}
        </div>
        <button className="btn btn-sm btn-light ms-auto rounded-circle d-flex align-items-center justify-content-center border transition-all btn-hover-scale" style={{ width: '28px', height: '28px' }}>
          <ChevronRight size={14} className="text-muted" />
        </button>
      </div>
      <div className="mt-3">
        <div className="fw-semibold text-uppercase text-primary" style={{ fontFamily: 'Manrope', fontSize: '10px', letterSpacing: '0.14em', color: '#0F766E' }}>
          Household
        </div>
        <div className="mt-1 fw-semibold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '15px' }}>
          {user?.fname ? `${user.fname}'s pets` : "My pets"}
        </div>
        <div className="mt-1 text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
          {pets.length} profiles · {activeSubs} active subs
        </div>
      </div>
    </div>
  );
}

function NavGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-3">
      <div className="px-3 pb-1 fw-semibold text-uppercase text-muted" style={{ fontFamily: 'Manrope', fontSize: '10px', letterSpacing: '0.14em' }}>
        {label}
      </div>
      <nav className="d-flex flex-column gap-1">{children}</nav>
    </div>
  );
}

function NavRow({ item, active, onClick }: { item: Item; active: boolean; onClick: () => void }) {
  const { label, icon: Icon, badge, tone } = item;
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`btn border-0 text-start position-relative d-flex align-items-center gap-3 w-100 transition-all btn-hover-opacity ${active ? "text-white fw-semibold shadow-sm" : "text-dark"}`}
      style={{
        height: '40px',
        paddingLeft: '1.2rem',
        paddingRight: '0.8rem',
        borderRadius: '0.75rem',
        fontFamily: 'Manrope',
        fontSize: '13.5px',
        backgroundColor: active ? '#0F766E' : 'transparent',
      }}
    >
      <span
        className="position-absolute top-50 start-0 translate-middle-y rounded-pill"
        style={{ width: '3px', height: '20px', backgroundColor: '#F97360', opacity: active ? 1 : 0, transition: 'opacity 0.2s' }}
      />
      <Icon size={17} strokeWidth={active ? 2.2 : 1.8} style={{ color: active ? 'white' : '#6B7280' }} />
      <span className="flex-grow-1" style={{ letterSpacing: '-0.005em' }}>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span
          className="badge rounded-pill d-flex align-items-center justify-content-center fw-semibold"
          style={{
            minWidth: '20px',
            height: '20px',
            fontFamily: 'Manrope',
            fontSize: '11px',
            backgroundColor: active ? 'rgba(255,255,255,0.2)' : tone === "alert" ? '#F97360' : 'rgba(15,118,110,0.1)',
            color: active || tone === "alert" ? 'white' : '#0F766E',
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
