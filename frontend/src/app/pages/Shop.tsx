import { ArrowLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ProductCard } from "../components/ui/ProductCard";
import { useProducts, useCategories } from "../hooks/useApi";

export function Shop({
  openProduct,
  addToCart,
}: {
  openProduct: (id: string) => void;
  addToCart: (id: string) => void;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [pet, setPet] = useState<"All" | "Dog" | "Cat">("All");
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState("Recommended");

  const { status, value: products } = useProducts();
  const { status: catStatus, value: catsData } = useCategories();

  const cats = catsData || ["All", "Food", "Toys", "Health", "Grooming"];
  const sorts = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"];

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products.filter((p: any) => {
      if (pet !== "All" && p.petType !== pet && p.petType !== "All") return false;
      if (cat !== "All" && p.category !== cat) return false;
      if (q && !(p.name + p.brand).toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, pet, cat, sort, products]); // Add products to dependency array

  return (
    <div className="container-fluid mx-auto px-4 py-5 animate-slide-up" style={{ maxWidth: '1280px' }}>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light rounded-pill border bg-white d-inline-flex align-items-center gap-1 shadow-sm mb-4 fw-semibold text-dark transition-all btn-hover-scale"
        style={{ height: '36px', padding: '0 0.75rem 0 0.5rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
      >
        <ArrowLeft size={15} />
        Back
      </button>

      {status === "error" ? (
        <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '60vh' }}>
          <div style={{ fontSize: '40px' }}>⚠️</div>
          <div className="fw-bold fs-4 mt-2 mb-2 text-dark">Error loading products</div>
          <p className="text-muted">There was a problem communicating with our servers.</p>
          <button className="btn btn-outline-secondary mt-3 rounded-pill" onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : status !== "success" || !products ? (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '60vh' }}>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading Catalog...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex flex-wrap align-items-end justify-content-between gap-4 mb-5">
            <div>
              <h1 className="fw-semibold text-dark lh-sm m-0" style={{ fontFamily: 'Sora', fontSize: '32px' }}>
                Shop everything for your pet
              </h1>
              <p className="mt-2 text-muted m-0" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
                {filtered.length} products · personalized for your household
              </p>
            </div>
            <div className="position-relative w-100" style={{ maxWidth: '360px' }}>
              <Search size={16} className="position-absolute top-50 translate-middle-y text-muted" style={{ left: '1rem' }} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, brands, tags…"
                className="form-control rounded-pill border shadow-none"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', height: '44px', fontFamily: 'Manrope', fontSize: '14px', borderColor: '#E7E2D9' }}
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="btn position-absolute top-50 translate-middle-y rounded-circle p-0 d-flex align-items-center justify-content-center text-muted border-0 shadow-none bg-transparent"
                  style={{ right: '0.75rem', width: '28px', height: '28px' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="row g-5">
            <aside className="col-12 col-lg-3">
              <div className="bg-white border p-4 sticky-top" style={{ borderRadius: '1rem', borderColor: '#E7E2D9', top: '88px', zIndex: 10 }}>
                <div className="d-flex align-items-center gap-2 mb-4">
                  <SlidersHorizontal size={15} style={{ color: '#0F766E' }} />
                  <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '14px' }}>Filters</div>
                </div>
                <div className="d-flex flex-column gap-3">
                  <FilterGroup label="Pet type" index={0}>
                    {(["All", "Dog", "Cat"] as const).map((p) => (
                      <Chip key={p} active={pet === p} onClick={() => setPet(p)}>
                        {p}
                      </Chip>
                    ))}
                  </FilterGroup>
                  <FilterGroup label="Category">
                    {cats.map((c) => (
                      <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                        {c}
                      </Chip>
                    ))}
                  </FilterGroup>
                  <FilterGroup label="Age group">
                    {["All", "Puppy", "Adult", "Senior"].map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </FilterGroup>
                  <FilterGroup label="Size">
                    {["Small", "Medium", "Large"].map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </FilterGroup>
                </div>
              </div>
            </aside>

            <div className="col-12 col-lg-9">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div className="d-flex flex-wrap gap-2">
                  {pet !== "All" && (
                    <ActiveTag onClear={() => setPet("All")}>Pet: {pet}</ActiveTag>
                  )}
                  {cat !== "All" && (
                    <ActiveTag onClear={() => setCat("All")}>Category: {cat}</ActiveTag>
                  )}
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="form-select border rounded-pill shadow-none fw-semibold text-dark"
                  style={{ width: 'auto', height: '40px', paddingLeft: '1rem', fontFamily: 'Manrope', fontSize: '13px', borderColor: '#E7E2D9' }}
                >
                  {sorts.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white border text-center py-5 px-3" style={{ borderRadius: '1rem', borderStyle: 'dashed', borderWidth: '2px', borderColor: '#E7E2D9' }}>
                  <div style={{ fontSize: '40px' }}>🐾</div>
                  <div className="mt-4 fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '18px' }}>
                    No results for "{q}"
                  </div>
                  <p className="mt-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '14px' }}>
                    Try clearing a filter or searching a broader term.
                  </p>
                  <button
                    onClick={() => {
                      setQ("");
                      setPet("All");
                      setCat("All");
                    }}
                    className="btn rounded-pill border-0 text-white fw-semibold mt-4"
                    style={{ height: '40px', padding: '0 1.25rem', backgroundColor: '#0F766E', fontFamily: 'Manrope', fontSize: '13px' }}
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="row g-4">
                  {filtered.map((p) => {
                    const pid = p._id || p.id;
                    return (
                      <div key={pid} className="col-12 col-sm-6 col-xl-4">
                        <ProductCard
                          product={p}
                          onOpen={() => openProduct(pid)}
                          onAdd={() => addToCart(pid)}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FilterGroup({ label, children, index = 1 }: any) {
  return (
    <div className={index === 0 ? "pb-2" : "py-2 border-top"} style={{ borderColor: '#E7E2D9' }}>
      <div className="fw-semibold text-uppercase text-muted mb-2" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.14em' }}>
        {label}
      </div>
      <div className="d-flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`btn rounded-pill border shadow-none transition-all btn-hover-scale ${active ? 'text-white' : 'bg-white text-dark'}`}
      style={{
        padding: '0.25rem 0.75rem', fontFamily: 'Manrope', fontSize: '12px',
        backgroundColor: active ? '#0F766E' : 'white',
        borderColor: active ? '#0F766E' : '#E7E2D9'
      }}
    >
      {children}
    </button>
  );
}

function ActiveTag({ children, onClear }: any) {
  return (
    <span className="d-inline-flex align-items-center gap-2 rounded-pill fw-semibold" style={{ backgroundColor: 'rgba(15, 118, 110, 0.1)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px', padding: '0.25rem 0.375rem 0.25rem 0.75rem' }}>
      {children}
      <button onClick={onClear} className="btn rounded-circle d-flex align-items-center justify-content-center p-0 shadow-none border-0 text-white" style={{ width: '20px', height: '20px', backgroundColor: '#0F766E' }}>
        <X size={11} />
      </button>
    </span>
  );
}
