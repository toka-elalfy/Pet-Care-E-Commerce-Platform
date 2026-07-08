import { ShoppingCart, Bell, Search, Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

type Props = {
    route: string;
    setRoute: (r: string) => void;
    authed: boolean;
    setAuthed: (v: boolean) => void;
    cartCount: number;
};

export function Nav({ route, setRoute, authed, setAuthed, cartCount }: Props) {
    const [open, setOpen] = useState(false);
    const publicLinks = [
        ["home", "Home"],
        ["shop", "Shop"],
        ["bundle", "Bundle Builder"],
        ["how", "How It Works"],
        ["help", "Help"],
    ];
    const authLinks = [
        ["dashboard", "Dashboard"],
        ["pets", "My Pets"],
        ["shop", "Shop"],
        ["recommendations", "For My Pet"],
        ["bundle", "Bundles"],
        ["orders", "Orders"],
        ["subscriptions", "Subscriptions"],
        ["reminders", "Reminders"],
    ];
    const links = authed ? authLinks : publicLinks;

    return (
        <header className="sticky-top border-bottom z-3" style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderColor: '#E7E2D9' }}>
            <div className="container-fluid d-flex align-items-center gap-3" style={{ maxWidth: '1280px', padding: '0 1.5rem', height: '72px' }}>
                <button
                    onClick={() => setRoute(authed ? "dashboard" : "home")}
                    className="btn btn-link p-0 d-flex align-items-center gap-2 flex-shrink-0 text-decoration-none btn-hover-scale"
                >
                    <Logo size={36} />
                </button>

                <nav className="d-none d-lg-flex align-items-center gap-1 ms-3">
                    {links.map(([r, label]) => (
                        <button
                            key={r}
                            onClick={() => setRoute(r)}
                            className={`btn border-0 px-3 py-2 rounded-3 transition-all btn-hover-opacity ${route === r ? "fw-semibold" : ""}`}
                            style={{
                                fontFamily: 'Manrope', fontSize: '14px',
                                backgroundColor: route === r ? 'rgba(15,118,110,0.1)' : 'transparent',
                                color: route === r ? '#0F766E' : 'rgba(31, 41, 55, 0.75)'
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="flex-grow-1" />

                {!authed && (
                    <div className="d-none d-md-flex align-items-center gap-2">
                        <div className="position-relative">
                            <Search
                                size={16}
                                className="position-absolute top-50 translate-middle-y text-muted"
                                style={{ left: '12px' }}
                            />
                            <input
                                placeholder="Search products, pets, advice…"
                                className="form-control rounded-pill bg-light border"
                                style={{ paddingLeft: '36px', paddingRight: '12px', height: '40px', width: '260px', fontFamily: 'Manrope', fontSize: '14px', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9' }}
                            />
                        </div>
                    </div>
                )}

                <div className="d-flex align-items-center gap-2">
                    {authed ? (
                        <>
                            <button
                                onClick={() => setRoute("reminders")}
                                className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center position-relative border-0 btn-hover-scale transition-all"
                                style={{ width: '40px', height: '40px' }}
                            >
                                <Bell size={18} className="text-dark" />
                                <span className="position-absolute rounded-circle" style={{ top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: '#F97360' }} />
                            </button>
                            <button
                                onClick={() => setRoute("cart")}
                                className="btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center position-relative border-0 btn-hover-scale transition-all"
                                style={{ width: '40px', height: '40px' }}
                            >
                                <ShoppingCart size={18} className="text-dark" />
                                {cartCount > 0 && (
                                    <span className="position-absolute badge rounded-pill d-flex align-items-center justify-content-center text-white" style={{ top: '-2px', right: '-2px', minWidth: '18px', height: '18px', padding: '0 4px', backgroundColor: '#F97360', fontSize: '11px', fontFamily: 'Manrope' }}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setRoute("account")}
                                className="btn rounded-circle p-0 d-flex align-items-center justify-content-center fw-semibold border-0 btn-hover-scale transition-all"
                                style={{ width: '40px', height: '40px', backgroundColor: 'rgba(167, 199, 163, 0.4)', color: '#0F766E', fontFamily: 'Sora' }}
                            >
                                SJ
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setRoute("login")}
                                className="btn btn-light rounded-pill d-none d-sm-block border-0 btn-hover-opacity transition-all"
                                style={{ height: '40px', padding: '0 1rem', fontFamily: 'Manrope', fontSize: '14px' }}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setRoute("signup")}
                                className="btn rounded-pill text-white border-0 fw-semibold shadow-sm btn-hover-scale transition-all"
                                style={{ height: '40px', padding: '0 1rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
                            >
                                Get Started
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setOpen(!open)}
                        className="btn btn-light rounded-circle p-0 d-flex d-lg-none align-items-center justify-content-center border-0"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </div>
            {open && (
                <div className="d-lg-none border-top bg-white p-3 d-flex flex-wrap gap-2" style={{ borderColor: '#E7E2D9' }}>
                    {links.map(([r, label]) => (
                        <button
                            key={r}
                            onClick={() => {
                                setRoute(r);
                                setOpen(false);
                            }}
                            className="btn btn-outline-secondary rounded-pill py-1 px-3 btn-hover-opacity transition-all"
                            style={{ fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9', color: '#1F2937' }}
                        >
                            {label}
                        </button>
                    ))}
                    {!authed && (
                        <>
                            <button
                                onClick={() => { setRoute("login"); setOpen(false); }}
                                className="btn btn-outline-secondary rounded-pill py-1 px-3 btn-hover-opacity transition-all"
                                style={{ fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9', color: '#1F2937' }}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => { setRoute("signup"); setOpen(false); }}
                                className="btn btn-outline-secondary rounded-pill py-1 px-3 btn-hover-opacity transition-all"
                                style={{ fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9', color: '#1F2937' }}
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}
