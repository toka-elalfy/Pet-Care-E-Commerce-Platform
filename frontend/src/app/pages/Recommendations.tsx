import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardShell } from "../components/ui/DashboardShell";
import { ProductCard } from "../components/ui/ProductCard";
import { api } from "../api";

export function Recommendations({
  route,
  setRoute,
  openProduct,
  addToCart,
}: {
  route: string;
  setRoute: (r: string) => void;
  openProduct: (id: string) => void;
  addToCart: (id: string) => void;
}) {
  const [petId, setPetId] = useState("");
  const [pets, setPets] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const fetchedPets = await api.pets.getAll();
        const fetchedProducts = await api.products.getAll();
        if (mounted) {
          setPets(fetchedPets);
          setProducts(fetchedProducts);
          if (fetchedPets.length > 0) {
            setPetId(fetchedPets[0].id || fetchedPets[0]._id);
          }
        }
      } catch (err) {
        console.error("Error fetching recommendations data", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, []);

  const pet = pets.find((p) => (p.id || p._id) === petId);
  const list = pet ? products
    .filter(
      (p) =>
        p.petType === pet.type ||
        p.petType === pet.petType ||
        p.petType === "All" ||
        p.recommendedFor === pet.name
    )
    .map((p) => ({
      ...p,
      recommendedFor: pet.name,
      recommendReason:
        p.recommendReason ||
        `Matches ${pet.name}'s ${(pet.size || 'medium').toLowerCase()}-breed ${p.category === "Food" ? "nutrition needs" : "lifestyle"}.`,
    })) : [];

  if (loading) {
    return <DashboardShell route={route} setRoute={setRoute} title="Loading..." subtitle=""><div className="text-center py-5">Loading recommendations...</div></DashboardShell>;
  }

  if (!pet) {
    return <DashboardShell route={route} setRoute={setRoute} title="Recommendations" subtitle=""><div className="text-center py-5">No pet profiles found.</div></DashboardShell>;
  }

  return (
    <DashboardShell
      route={route}
      setRoute={setRoute}
      title={`For ${pet.name}`}
      subtitle="Personalized picks with clear reasons — curated from your pet's profile."
    >
      <div className="d-flex flex-wrap gap-2 mb-4">
        {pets.map((p) => {
          const pid = p.id || p._id;
          return (
            <button
              key={pid}
              onClick={() => setPetId(pid)}
              className={`btn rounded-pill border fw-semibold d-inline-flex align-items-center gap-2 py-1 px-3 px-md-4 transition-colors ${pid === petId ? 'text-white' : 'bg-white text-dark'
                }`}
              style={{
                fontFamily: 'Manrope', fontSize: '13px',
                backgroundColor: pid === petId ? '#0F766E' : 'white',
                borderColor: pid === petId ? '#0F766E' : '#E7E2D9'
              }}
            >
              <img
                src={p.photo || p.avatar || p.image || ""}
                className="rounded-circle object-fit-cover"
                style={{ width: '28px', height: '28px' }}
                alt={p.name}
              />
              {p.name}
            </button>
          )
        })}
      </div>

      <div className="text-white p-4 p-md-5 mb-5 d-flex flex-column flex-md-row align-items-center gap-4" style={{ borderRadius: '1.5rem', background: 'linear-gradient(to right, #0F766E, #14857C)' }}>
        <img
          src={pet.photo || pet.avatar || pet.image}
          className="rounded-4 object-fit-cover border border-4 border-white-50"
          style={{ width: '80px', height: '80px' }}
          alt={pet.name}
        />
        <div className="flex-grow-1">
          <div className="fw-semibold text-uppercase text-white-50 d-inline-flex align-items-center gap-1" style={{ fontFamily: 'Manrope', fontSize: '12px', letterSpacing: '0.1em' }}>
            <Sparkles size={13} /> Based on {pet.name}'s profile
          </div>
          <div className="mt-1 fw-semibold text-white lh-sm" style={{ fontFamily: 'Sora', fontSize: '22px' }}>
            {pet.breed || "Mixed"} · {pet.age || "Adult"} · {pet.size || "Medium"} breed
          </div>
          <div className="mt-1 text-white-50" style={{ fontFamily: 'Manrope', fontSize: '13px' }}>
            We filtered the catalog to {list.length} high-quality matches.
          </div>
        </div>
      </div>

      <div className="row g-4">
        {list.map((p) => {
          const pid = p._id || p.id;
          return (
            <div key={pid} className="col-12 col-md-6 col-xl-4">
              <ProductCard
                product={p}
                showReason
                onOpen={() => openProduct(pid)}
                onAdd={() => addToCart(pid)}
              />
            </div>
          )
        })}
      </div>
    </DashboardShell>
  );
}
