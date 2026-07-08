import { Logo } from "./Logo";

type Link = { label: string; route: string };

export function Footer({ setRoute }: { setRoute: (r: string) => void }) {
    const cols: Array<{ title: string; links: Link[] }> = [
        {
            title: "Shop",
            links: [
                { label: "Dogs", route: "shop" },
                { label: "Cats", route: "shop" },
                { label: "Food", route: "shop" },
                { label: "Toys", route: "shop" },
                { label: "Health", route: "shop" },
                { label: "Grooming", route: "shop" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About", route: "about" },
                { label: "Careers", route: "careers" },
                { label: "Press", route: "press" },
                { label: "Sustainability", route: "sustainability" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Help Center", route: "help" },
                { label: "Shipping", route: "shipping" },
                { label: "Returns", route: "returns" },
                { label: "Contact", route: "contact" },
            ],
        },
    ];
    return (
        <footer className="text-white mt-5" style={{ backgroundColor: '#0F1F1D' }}>
            <div className="container-fluid py-5 px-md-4" style={{ maxWidth: '1280px' }}>
                <div className="row gy-5">
                    <div className="col-12 col-md-4 col-lg-5">
                        <div className="mb-4">
                            <Logo size={38} tone="light" variant="brand" />
                        </div>
                        <p className="text-white-50" style={{ fontFamily: 'Manrope', fontSize: '14px', lineHeight: '1.6', maxWidth: '320px' }}>
                            Smarter care for the pets who run your home. Personalized nutrition,
                            on time, every time.
                        </p>
                        <div className="mt-4 d-flex gap-2">
                            <input
                                placeholder="Your email"
                                className="form-control rounded-pill border shadow-none placeholder-white-50 text-white"
                                style={{ height: '44px', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', fontFamily: 'Manrope', fontSize: '14px' }}
                            />
                            <button className="btn rounded-pill fw-semibold text-white border-0 transition-all btn-hover-scale"
                                style={{ height: '44px', padding: '0 1.25rem', backgroundColor: '#F97360', fontFamily: 'Manrope', fontSize: '14px' }}>
                                Join
                            </button>
                        </div>
                    </div>
                    {cols.map((c) => (
                        <div key={c.title} className="col-6 col-md-2">
                            <div className="fw-semibold mb-3" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                                {c.title}
                            </div>
                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                {c.links.map((l) => (
                                    <li key={l.label}>
                                        <button
                                            onClick={() => setRoute(l.route)}
                                            className="btn btn-link p-0 text-start text-decoration-none text-white-50 shadow-none transition-all btn-hover-opacity"
                                            style={{ fontFamily: 'Manrope', fontSize: '14px' }}
                                        >
                                            {l.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="container-fluid py-4 px-md-4 d-flex flex-wrap align-items-center justify-content-between gap-3 text-white-50"
                    style={{ maxWidth: '1280px', fontFamily: 'Manrope', fontSize: '13px' }}>
                    <span>© 2026 Zootopia, Inc. All rights reserved.</span>
                    <div className="d-flex gap-4">
                        <button
                            onClick={() => setRoute("privacy")}
                            className="btn btn-link p-0 text-decoration-none text-white-50 shadow-none transition-all btn-hover-opacity"
                            style={{ fontSize: '13px' }}
                        >
                            Privacy
                        </button>
                        <button
                            onClick={() => setRoute("terms")}
                            className="btn btn-link p-0 text-decoration-none text-white-50 shadow-none transition-all btn-hover-opacity"
                            style={{ fontSize: '13px' }}
                        >
                            Terms
                        </button>
                        <button
                            onClick={() => setRoute("cookies")}
                            className="btn btn-link p-0 text-decoration-none text-white-50 shadow-none transition-all btn-hover-opacity"
                            style={{ fontSize: '13px' }}
                        >
                            Cookies
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
