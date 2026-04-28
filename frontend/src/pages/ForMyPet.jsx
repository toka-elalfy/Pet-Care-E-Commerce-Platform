import { useState } from 'react';
import { pets, recommendations } from '../constants/forMyPetData';
import ProductCard from '../components/dashboard/ProductCard';
import infoIcon from '../assets/icons/info-circle.svg';

const ForMyPet = () => {
  const [selectedPetId, setSelectedPetId] = useState('bella');
  
  const selectedPet = pets.find(p => p.id === selectedPetId);
  const currentRecommendations = recommendations[selectedPetId] || [];

  return (
    <div className="flex flex-col gap-6 lg:gap-[32px] pb-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[#1f2937] font-sora font-semibold text-[24px] lg:text-[28px] leading-tight">
          For {selectedPet.name}
        </h1>
        <p className="text-[#6b7280] text-[13px] lg:text-[14px] leading-relaxed max-w-[500px]">
          Personalized picks with clear reasons — curated from your pet's profile.
        </p>
      </div>

      {/* Pet Selection Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setSelectedPetId(pet.id)}
            className={`flex items-center gap-2.5 h-[38px] px-1 rounded-full border transition-all duration-300 whitespace-nowrap group ${
              selectedPetId === pet.id
                ? 'bg-[#0f766e] border-[#0f766e] pr-4 shadow-md'
                : 'bg-white border-[#e7e2d9] pr-4 hover:border-[#0f766e]/50'
            }`}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <span className={`text-[12px] lg:text-[13px] font-semibold ${
              selectedPetId === pet.id ? 'text-white' : 'text-[#1f2937]'
            }`}>
              {pet.name}
            </span>
          </button>
        ))}
      </div>

      {/* Banner Section */}
      <div 
        className="rounded-[24px] p-6 lg:p-[32px] flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 lg:gap-[24px]"
        style={{ 
          backgroundImage: "linear-gradient(90deg, #0f766e 0%, #14857c 100%)" 
        }}
      >
        <div className="w-16 h-16 lg:w-[80px] lg:h-[80px] rounded-[16px] border-4 border-white/20 overflow-hidden shrink-0 shadow-lg">
          <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <img src={infoIcon} alt="info" className="w-[13px] h-[13px] opacity-70" />
            <span className="text-white/70 text-[10px] lg:text-[12px] font-semibold tracking-widest uppercase">
              Based on {selectedPet.name}'s profile
            </span>
          </div>
          <h2 className="text-white font-sora font-semibold text-[18px] lg:text-[22px] leading-tight">
            {selectedPet.breed} · {selectedPet.age} · {selectedPet.size}
          </h2>
          <p className="text-white/80 text-[12px] lg:text-[13px]">
            We filtered the catalog to {selectedPet.count} high-quality matches.
          </p>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[20px]">
        {currentRecommendations.map((product) => (
          <ProductCard 
            key={product.id} 
            product={{ ...product, label: `For ${selectedPet.name}` }} 
          />
        ))}
      </div>
    </div>
  );
};

export default ForMyPet;
