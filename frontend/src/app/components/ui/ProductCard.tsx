import { Star, Plus } from "lucide-react";
import type { Product } from "../../data";

export function ProductCard({
  product,
  onOpen,
  onAdd,
  showReason,
}: {
  product: Product;
  onOpen: () => void;
  onAdd: () => void;
  showReason?: boolean;
}) {
  console.log(product._id);
  return (
    <div
      className="bg-white border overflow-hidden position-relative product-card transition-all hover-lift"
      style={{ borderRadius: '1rem', borderColor: '#E7E2D9', cursor: 'pointer' }}
    >
      <button
        onClick={onOpen}
        className="d-block w-100 position-relative border-0 p-0 overflow-hidden text-start bg-transparent"
        style={{ aspectRatio: '4/3', backgroundColor: '#FFF8F1' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100 object-fit-cover hover-scale"
          style={{ transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
        {product.recommendedFor && (
          <span className="position-absolute top-0 start-0 m-3 text-white fw-semibold rounded-pill"
            style={{ backgroundColor: '#0F766E', fontSize: '11px', fontFamily: 'Manrope', padding: '0.25rem 0.625rem' }}>
            For {product.recommendedFor}
          </span>
        )}
        <span className="position-absolute top-0 end-0 m-3 text-dark fw-semibold rounded-pill"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', fontSize: '11px', fontFamily: 'Manrope', padding: '0.25rem 0.625rem' }}>
          {product.petType === "All" ? "Any Pet" : product.petType}
        </span>
      </button>
      <div className="p-4">
        <div className="d-flex align-items-center gap-2 text-uppercase fw-semibold"
          style={{ fontSize: '11px', fontFamily: 'Manrope', color: '#6B7280', letterSpacing: '0.05em' }}>
          <span>{product.brand}</span>
          <span>·</span>
          <span>{product.category}</span>
        </div>
        <button
          onClick={onOpen}
          className="mt-2 text-start fw-semibold text-dark border-0 p-0 bg-transparent text-truncate w-100"
          style={{ fontFamily: 'Sora', fontSize: '15px', lineHeight: '1.4' }}
        >
          {product.name}
        </button>
        <div className="mt-2 d-flex align-items-center gap-2 text-muted" style={{ fontFamily: 'Manrope', fontSize: '12px' }}>
          <Star size={13} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
          <span className="text-dark fw-semibold">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        {showReason && product.recommendReason && (
          <div className="mt-3 border rounded-3 p-2"
            style={{ backgroundColor: 'rgba(167, 199, 163, 0.2)', borderColor: 'rgba(167, 199, 163, 0.5)', color: '#0F766E', fontFamily: 'Manrope', fontSize: '12px' }}>
            {product.recommendReason}
          </div>
        )}
        <div className="mt-4 d-flex align-items-center justify-content-between">
          <div>
            <div className="fw-semibold text-dark" style={{ fontFamily: 'Sora', fontSize: '17px' }}>
              ${product.price}
            </div>
            <div className="fw-semibold mt-1" style={{ fontFamily: 'Manrope', fontSize: '11px', color: '#0F766E' }}>
              ${product.subPrice} subscribe
            </div>
          </div>
          <button
            onClick={onAdd}
            className="btn rounded-circle text-white d-flex align-items-center justify-content-center p-0 border-0 btn-hover-scale"
            style={{ width: '40px', height: '40px', backgroundColor: '#0F766E' }}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
