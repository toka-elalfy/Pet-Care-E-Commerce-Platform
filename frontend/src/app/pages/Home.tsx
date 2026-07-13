import { ArrowRight, ShieldCheck, Truck, Bell, Star, ChevronRight, PawPrint, Filter, Package, RefreshCw } from "lucide-react";
import { ProductCard } from "../components/ui/ProductCard";
import { useProducts } from "../hooks/useApi";

export function Home({
  setRoute,
  openProduct,
  addToCart,
}: {
  setRoute: (r: string) => void;
  openProduct: (id: string) => void;
  addToCart: (id: string) => void;
}) {
  const { status, value } = useProducts();
  const products = value?.products;

  if (status === "error") {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh' }}>
        <div style={{ fontSize: '40px' }}>⚠️</div>
        <div className="fw-bold fs-4 mt-2 mb-2 text-dark">Error loading products</div>
        <button className="btn btn-outline-secondary mt-3 rounded-pill" onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (status !== "success" || !products) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const featured = products.slice(0, 4);

  const categories = [
    {
      name: "Dog Food",
      count: "184 items",
      img: "https://images.unsplash.com/photo-1725696866074-3a7f63fe004d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
      name: "Cat Food",
      count: "122 items",
      img: "https://images.unsplash.com/photo-1736367536182-51ffce2eee0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
      name: "Toys & Play",
      count: "96 items",
      img: "https://images.unsplash.com/photo-1678652231344-109ed2855ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
    {
      name: "Health & Care",
      count: "74 items",
      img: "https://images.unsplash.com/photo-1645649835084-dc1d1eb24b49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="position-relative overflow-hidden">
        <div className="container-fluid px-3 px-md-4 py-5" style={{ maxWidth: '1280px' }}>
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(167, 199, 163, 0.3)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
                <PawPrint size={14} /> A platform built around your pet's profile
              </span>
              <h1 className="mt-4 fw-bold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '52px', letterSpacing: '-0.02em' }}>
                Pet-care shopping,{" "}
                <span style={{ color: '#0F766E' }}>personalized</span>{" "}
                by your pet's profile.
              </h1>
              <p className="mt-4 text-muted" style={{ fontFamily: 'Manrope', fontSize: '17px', lineHeight: '1.6', maxWidth: '520px' }}>
                Create a profile for every pet and Zootopia filters the catalog to
                what actually fits them. Subscribe to essentials, build custom
                bundles, and get reminded before supplies run out.
              </p>
              <div className="mt-5 d-flex flex-wrap align-items-center gap-3">
                <button
                  onClick={() => setRoute("signup")}
                  className="btn rounded-pill text-white fw-semibold d-inline-flex align-items-center gap-2 px-4 shadow-sm"
                  style={{ height: '48px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '15px' }}
                >
                  Create a pet profile <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setRoute("how")}
                  className="btn rounded-pill bg-white border text-dark fw-semibold px-4"
                  style={{ height: '48px', borderColor: '#E7E2D9', fontFamily: 'Manrope', fontSize: '15px' }}
                >
                  How it works
                </button>
              </div>
              <div className="mt-5 d-flex flex-wrap align-items-center gap-4 text-muted fw-semibold" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
                <div className="d-flex align-items-center gap-2">
                  <ShieldCheck size={16} style={{ color: '#0F766E' }} /> Vet-approved
                  brands
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Truck size={16} style={{ color: '#0F766E' }} /> Free delivery
                  over $40
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Star
                    size={16}
                    style={{ fill: '#F59E0B', color: '#F59E0B' }}
                  />{" "}
                  4.9 from 12,400+ owners
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 position-relative mt-5 mt-lg-0">
              <div className="position-relative border bg-white" style={{ borderRadius: '2rem', overflow: 'hidden', borderColor: '#E7E2D9' }}>
                <img
                  src="https://images.unsplash.com/photo-1767381604151-bae00f2fb337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
                  alt="Happy dog"
                  className="w-100 object-fit-cover"
                  style={{ aspectRatio: '5/6' }}
                />
                <div className="position-absolute bg-white p-3 d-flex align-items-center gap-3 shadow-sm" style={{ bottom: '20px', left: '20px', right: '20px', borderRadius: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
                  <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                    <PawPrint size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                      Recommended for Bella
                    </div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                      Grain-free salmon · delivered every 4 weeks
                    </div>
                  </div>
                  <button
                    onClick={() => setRoute("recommendations")}
                    className="btn rounded-circle text-white d-flex align-items-center justify-content-center p-0"
                    style={{ width: '36px', height: '36px', backgroundColor: '#0F766E' }}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="position-absolute d-none d-md-flex align-items-center gap-3 bg-white border p-3 shadow-sm" style={{ top: '-16px', left: '-16px', borderRadius: '1rem', borderColor: '#E7E2D9' }}>
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(249, 115, 96, 0.15)', color: '#F97360' }}>
                  <Bell size={18} />
                </div>
                <div>
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                    Running low soon
                  </div>
                  <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '11px' }}>
                    Bella's food · 6 days left
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-4" style={{ maxWidth: '1280px' }}>
        <div className="d-flex align-items-end justify-content-between mb-4">
          <div>
            <h2 className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '26px' }}>
              Shop by category
            </h2>
            <p className="text-muted mt-2 m-0" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
              Curated by veterinarians and real pet parents.
            </p>
          </div>
          <button
            onClick={() => setRoute("shop")}
            className="btn btn-link p-0 text-decoration-none shadow-none fw-semibold d-inline-flex align-items-center gap-1"
            style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#0F766E' }}
          >
            Browse all <ChevronRight size={16} />
          </button>
        </div>
        <div className="row g-3">
          {categories.map((c) => (
            <div key={c.name} className="col-6 col-lg-3">
              <button
                onClick={() => setRoute("shop")}
                className="w-100 position-relative border p-0 text-start overflow-hidden hover-scale-img"
                style={{ borderRadius: '1rem', aspectRatio: '4/5', borderColor: '#E7E2D9' }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover transition-transform"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
                <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
                  <div className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                    {c.name}
                  </div>
                  <div style={{ fontFamily: 'Manrope', fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    {c.count}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5" style={{ maxWidth: '1280px' }}>
        <div className="d-flex align-items-end justify-content-between mb-4">
          <div>
            <h2 className="fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '26px' }}>
              Featured this week
            </h2>
            <p className="text-muted mt-2 m-0" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
              Hand-picked favorites loved by thousands of pets.
            </p>
          </div>
          <button
            onClick={() => setRoute("shop")}
            className="btn btn-link p-0 text-decoration-none shadow-none fw-semibold d-inline-flex align-items-center gap-1"
            style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#0F766E' }}
          >
            See all products <ChevronRight size={16} />
          </button>
        </div>
        <div className="row g-4">
          {featured.map((p: any) => {
            const pid = p._id || p.id;
            return (
              <div key={pid} className="col-12 col-sm-6 col-lg-3">
                <ProductCard
                  product={p}
                  onOpen={() => openProduct(pid)}
                  onAdd={() => addToCart(pid)}
                />
              </div>
            )
          })}
        </div>
      </section>

      {/* Platform pillars */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5" style={{ maxWidth: '1280px' }}>
        <div className="text-center mx-auto" style={{ maxWidth: '620px' }}>
          <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
            Why Zootopia is a platform, not a shop
          </span>
          <h2 className="mt-3 fw-semibold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '30px' }}>
            Four systems that work together for every pet.
          </h2>
        </div>
        <div className="mt-5 row g-4">
          {[
            [
              <PawPrint key="i" size={18} />,
              "Pet profiles",
              "Save breed, age, weight, size, and needs — the data that powers every recommendation.",
              "Create a profile",
              "signup",
            ],
            [
              <Filter key="i" size={18} />,
              "Smart filtering",
              "Catalog narrowed to what fits your pet, with clear suitability tags on every product.",
              "Browse catalog",
              "shop",
            ],
            [
              <RefreshCw key="i" size={18} />,
              "Subscriptions",
              "Automatic recurring deliveries for essentials. Change frequency, pause, or cancel anytime.",
              "See subscriptions",
              "subscriptions",
            ],
            [
              <Bell key="i" size={18} />,
              "Reorder reminders",
              "We estimate usage from portion size and nudge you before supplies run low.",
              "How it works",
              "how",
            ],
          ].map(([icon, t, d, cta, route]: any) => (
            <div key={t} className="col-12 col-md-6 col-lg-3">
              <div className="bg-white border p-4 h-100 d-flex flex-column" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
                <div className="rounded-3 d-flex align-items-center justify-content-center mb-4" style={{ width: '44px', height: '44px', backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E' }}>
                  {icon}
                </div>
                <div className="fw-semibold text-dark mb-2" style={{ fontFamily: 'Sora', fontSize: '16px' }}>
                  {t}
                </div>
                <p className="text-muted flex-grow-1 mb-4" style={{ fontFamily: 'Manrope', fontSize: '13px', lineHeight: '1.6' }}>
                  {d}
                </p>
                <button
                  onClick={() => setRoute(route)}
                  className="btn btn-link p-0 text-decoration-none shadow-none fw-semibold d-inline-flex align-items-center gap-1 text-start"
                  style={{ fontFamily: 'Manrope', fontSize: '13px', color: '#0F766E' }}
                >
                  {cta} <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundle Builder feature */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5" style={{ maxWidth: '1280px' }}>
        <div className="text-white position-relative overflow-hidden p-4 p-lg-5" style={{ borderRadius: '1.5rem', background: 'linear-gradient(to bottom right, #0F766E, #14857C)' }}>
          <div className="position-absolute rounded-circle" style={{ right: '-64px', top: '-64px', width: '256px', height: '256px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
          <div className="row g-5 align-items-center position-relative">
            <div className="col-12 col-lg-7">
              <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold px-3 py-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', fontFamily: 'Manrope', fontSize: '12px' }}>
                <Package size={13} /> Bundle Builder
              </span>
              <h2 className="mt-3 fw-semibold lh-sm" style={{ fontFamily: 'Sora', fontSize: '34px', maxWidth: '520px' }}>
                Combine food, toys, and care into one bundle — save up to 20%.
              </h2>
              <p className="mt-3" style={{ fontFamily: 'Manrope', fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '520px' }}>
                Pick any products from the catalog. Bundle discounts stack
                automatically as you add more — no codes, no coupons.
              </p>
              <div className="mt-4 d-flex flex-wrap gap-3">
                <button
                  onClick={() => setRoute("bundle")}
                  className="btn rounded-pill bg-white fw-semibold d-inline-flex align-items-center gap-2 px-4 shadow-none"
                  style={{ height: '48px', fontFamily: 'Manrope', fontSize: '14px', color: '#0F766E' }}
                >
                  Start building <ArrowRight size={15} />
                </button>
                <div className="d-inline-flex align-items-center gap-2 rounded-pill px-4" style={{ height: '48px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', fontFamily: 'Manrope', fontSize: '13px', fontWeight: '600' }}>
                  2 items · 5% off · 5+ items · 20% off
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="bg-white p-4 text-dark shadow" style={{ borderRadius: '1rem' }}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                    Bella's weekly bundle
                  </div>
                  <span className="rounded-pill px-2 py-1 fw-semibold" style={{ backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '11px' }}>
                    3 items · 10% off
                  </span>
                </div>
                {[
                  ["Grain-Free Salmon", "$58"],
                  ["Plush Lamb Toy", "$18"],
                  ["Joint Support Chews", "$32"],
                ].map(([n, p]) => (
                  <div
                    key={n}
                    className="d-flex justify-content-between py-2"
                    style={{ borderTop: '1px solid #E7E2D9', fontFamily: 'Manrope', fontSize: '13px' }}
                  >
                    <span>{n}</span>
                    <span className="fw-semibold">{p}</span>
                  </div>
                ))}
                <div className="d-flex justify-content-between mt-3 pt-3" style={{ borderTop: '1px solid #E7E2D9' }}>
                  <span className="fw-semibold" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                    Total
                  </span>
                  <span className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                    $97.20
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reorder reminders deep dive */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5" style={{ maxWidth: '1280px' }}>
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-6">
            <div className="h-100 border p-4 p-md-5" style={{ borderRadius: '1.5rem', backgroundColor: '#FFF8F1', borderColor: '#E7E2D9' }}>
              <span className="fw-semibold text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em', color: '#F97360' }}>
                Reorder reminders
              </span>
              <h3 className="mt-3 fw-semibold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '28px', maxWidth: '460px' }}>
                Never run out again.
              </h3>
              <p className="mt-3 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px', maxWidth: '440px' }}>
                Every order is tied to a usage estimate based on portion size, pet
                weight, and pack volume. We tell you when it's time to reorder —
                with one tap to buy again or convert to a subscription.
              </p>
              <div className="mt-4 d-flex flex-column gap-2">
                {[
                  ["Bella's food", "~6 days left", "high"],
                  ["Milo's food", "~14 days left", "medium"],
                  ["Coco's shampoo", "~21 days left", "low"],
                ].map(([n, l, u]) => (
                  <div
                    key={n}
                    className="bg-white border p-3 d-flex align-items-center gap-3"
                    style={{ borderRadius: '0.75rem', borderColor: '#E7E2D9' }}
                  >
                    <span
                      className="rounded-circle"
                      style={{
                        width: '8px', height: '8px',
                        backgroundColor: u === "high"
                          ? "#DC2626"
                          : u === "medium"
                            ? "#F59E0B"
                            : "#16A34A"
                      }}
                    />
                    <div className="flex-grow-1 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '13px' }}>
                      {n}
                    </div>
                    <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="h-100 bg-white border p-4 p-md-5" style={{ borderRadius: '1.5rem', borderColor: '#E7E2D9' }}>
              <span className="fw-semibold text-uppercase" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em', color: '#0F766E' }}>
                Subscriptions
              </span>
              <h3 className="mt-3 fw-semibold text-dark lh-sm" style={{ fontFamily: 'Sora', fontSize: '28px', maxWidth: '460px' }}>
                Save 15% on every recurring delivery.
              </h3>
              <ul className="mt-4 list-unstyled d-flex flex-column gap-3" style={{ fontFamily: 'Manrope', fontSize: '14px', color: '#4B5563' }}>
                {[
                  "Choose a frequency — 2, 4, 6, or 8 weeks",
                  "Pause, skip, or cancel anytime from your dashboard",
                  "Adjust quantity per delivery to match your pet's needs",
                ].map((l) => (
                  <li key={l} className="d-flex gap-2 align-items-start">
                    <span className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '20px', height: '20px', backgroundColor: 'rgba(167, 199, 163, 0.4)', color: '#0F766E', marginTop: '2px' }}>
                      ✓
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setRoute("shop")}
                className="btn rounded-pill text-white fw-semibold px-4 mt-4"
                style={{ height: '44px', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '14px' }}
              >
                Start a subscription
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5" style={{ maxWidth: '1280px' }}>
        <div className="text-center mx-auto" style={{ maxWidth: '560px' }}>
          <h2 className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '30px' }}>
            How Zootopia works
          </h2>
          <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '15px' }}>
            Three simple steps to personalized, worry-free pet care.
          </p>
        </div>
        <div className="mt-5 row g-4">
          {[
            [
              "01",
              "Tell us about your pet",
              "Breed, age, weight, and preferences build a profile we learn from.",
            ],
            [
              "02",
              "Get personalized picks",
              "See products matched to each pet — with clear reasons why.",
            ],
            [
              "03",
              "Subscribe & relax",
              "We deliver on schedule and remind you before anything runs out.",
            ],
          ].map(([n, t, d]) => (
            <div key={n} className="col-12 col-md-4">
              <div className="bg-white border p-4 p-lg-5 h-100" style={{ borderRadius: '1rem', borderColor: '#E7E2D9' }}>
                <div className="fw-bold" style={{ fontFamily: 'Sora', fontSize: '32px', color: 'rgba(15, 118, 110, 0.3)' }}>
                  {n}
                </div>
                <div className="mt-3 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                  {t}
                </div>
                <p className="mt-2 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '14px', lineHeight: '1.6' }}>
                  {d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5" style={{ maxWidth: '1280px' }}>
        <div className="row g-4">
          {[
            [
              "Our senior lab eats better now than he did at 3. The joint chews have been life-changing.",
              "Amelia R.",
              "Maple the Labrador",
            ],
            [
              "I used to panic-shop kibble at midnight. The reminder nudges me a week before — perfect.",
              "David K.",
              "Luna the Husky",
            ],
            [
              "Loved getting picks tailored to an indoor senior cat. Not generic filler — real recommendations.",
              "Priya S.",
              "Biscuit the Persian",
            ],
          ].map(([q, n, p]) => (
            <div key={n} className="col-12 col-md-4">
              <div className="border p-4 h-100 d-flex flex-column transition-all hover-lift" style={{ backgroundColor: '#FFF8F1', borderRadius: '1rem', borderColor: '#E7E2D9' }}>
                <div className="d-flex gap-1 mb-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      style={{ fill: '#F59E0B', color: '#F59E0B' }}
                    />
                  ))}
                </div>
                <p className="text-dark flex-grow-1" style={{ fontFamily: 'Manrope', fontSize: '15px', lineHeight: '1.6' }}>
                  "{q}"
                </p>
                <div className="mt-4 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>
                  {n}
                </div>
                <div className="text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
                  {p}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-fluid px-3 px-md-4 mt-5 pt-5 pb-5" style={{ maxWidth: '820px' }}>
        <div className="text-center">
          <h2 className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '30px' }}>
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-5 d-flex flex-column gap-3">
          {[
            [
              "How are recommendations personalized?",
              "We use your pet's profile — species, breed, age, weight, and preferences — to filter our catalog to products a vet would pick for them.",
            ],
            [
              "Can I pause or cancel my subscription?",
              "Absolutely. You can pause, skip, change frequency, or cancel anytime from your Subscriptions dashboard.",
            ],
            [
              "How do reorder reminders work?",
              "Based on portion size and delivery volume, we predict when you'll run out — and remind you a week before.",
            ],
          ].map(([q, a]) => (
            <details
              key={q}
              className="bg-white border rounded-3 p-4 faq-item group hover-shadow-sm transition-all"
              style={{ borderColor: '#E7E2D9' }}
            >
              <summary className="d-flex align-items-center justify-content-between cursor-pointer fw-semibold text-dark m-0" style={{ fontFamily: 'Sora', fontSize: '15px', listStyle: 'none' }}>
                {q}
                <ChevronRight
                  size={18}
                  className="text-muted transition-transform group-open-rotate"
                />
              </summary>
              <p className="mt-3 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '14px', lineHeight: '1.6' }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
