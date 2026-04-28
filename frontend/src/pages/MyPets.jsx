import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Shared pet images
import bellaImg from '../assets/images/dashboard-bella.png';
import miloImg from '../assets/images/dashboard-milo.png';
import cocoImg from '../assets/images/dashboard-coco.png';

// Icons
import addPetIcon from '../assets/icons/add-pet-icon.svg';
import editIcon from '../assets/icons/edit-icon.svg';
import deleteIcon from '../assets/icons/delete-icon.svg';
import sparklesPicksIcon from '../assets/icons/sparkles-picks-icon.svg';
import plusCircleIcon from '../assets/icons/plus-circle-icon.svg';

// ─── Mock Pet Data ──────────────────────────────────────────────────────────
const INITIAL_PETS = [
  { id: 1, name: 'Bella',  type: 'Dog', breed: 'Golden Retriever', age: '3 yrs', weight: '28 kg', size: 'Large',  image: bellaImg },
  { id: 2, name: 'Milo',   type: 'Cat', breed: 'British Shorthair', age: '5 yrs', weight: '4.2 kg', size: 'Medium', image: miloImg },
  { id: 3, name: 'Coco',   type: 'Dog', breed: 'Shih Tzu',          age: '1 yr',  weight: '6 kg',   size: 'Small',  image: cocoImg },
];

// ─── Stat Pill ────────────────────────────────────────────────────────────────
const StatPill = ({ label, value }) => (
  <div className="flex-1 bg-[#fff8f1] border border-[#e7e2d9] rounded-[14px] pt-[9px] pb-px flex flex-col items-center min-w-0">
    <span className="font-manrope text-[9px] lg:text-[10px] text-[#6b7280] uppercase tracking-[0.5px] lg:tracking-[1px] leading-tight lg:leading-[15px]">{label}</span>
    <span className="font-sora font-semibold text-[12px] lg:text-[13px] text-[#1f2937] leading-tight lg:leading-[19.5px]">{value}</span>
  </div>
);

// ─── Pet Card ─────────────────────────────────────────────────────────────────
const PetCard = ({ pet, onDelete, onEdit }) => (
  <div className="bg-white border border-[#e7e2d9] rounded-[24px] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow h-full">
    {/* Image area */}
    <div className="relative h-[200px] lg:h-[232px] bg-[#fff8f1] overflow-hidden shrink-0">
      <img src={pet.image} alt={pet.name} className="absolute inset-0 w-full h-full object-cover" />
      {/* Action buttons on top-right */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button 
          onClick={() => onEdit(pet.id)}
          className="w-9 h-9 bg-white/95 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors hover:scale-110 active:scale-95"
        >
          <img src={editIcon} alt="Edit" className="w-[14px] h-[14px]" />
        </button>
        <button
          onClick={() => onDelete(pet.id)}
          className="w-9 h-9 bg-white/95 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors hover:scale-110 active:scale-95"
        >
          <img src={deleteIcon} alt="Delete" className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>

    {/* Info area */}
    <div className="p-4 lg:p-5 flex flex-col gap-3 lg:gap-4 flex-1">
      {/* Name + size badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-sora font-semibold text-[18px] lg:text-[20px] text-[#1f2937] leading-tight truncate">{pet.name}</h3>
          <p className="font-manrope text-[12px] lg:text-[13px] text-[#6b7280] truncate">{pet.type} · {pet.breed}</p>
        </div>
        <span className="bg-[#a7c7a3]/30 text-[#0f766e] font-manrope font-semibold text-[10px] lg:text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap">
          {pet.size}
        </span>
      </div>

      {/* Stat pills row */}
      <div className="flex gap-2">
        <StatPill label="Age"    value={pet.age} />
        <StatPill label="Weight" value={pet.weight} />
        <StatPill label="Size"   value={pet.size} />
      </div>

      {/* CTA button */}
      <button className="w-full h-10 bg-[#fff8f1] border border-[#e7e2d9] rounded-full flex items-center justify-center gap-2 hover:bg-[#e6f1f0] hover:border-[#0f766e]/30 transition-colors group mt-auto">
        <img src={sparklesPicksIcon} alt="" className="w-[14px] h-[14px]" />
        <span className="font-manrope font-semibold text-[12px] lg:text-[13px] text-[#0f766e]">
          See picks
        </span>
      </button>
    </div>
  </div>
);

// ─── Add Another Pet Card ─────────────────────────────────────────────────────
const AddPetCard = ({ onAdd }) => (
  <button
    onClick={onAdd}
    className="border-2 border-dashed border-[#e7e2d9] rounded-[24px] min-h-[320px] lg:h-full flex flex-col items-center justify-center gap-3 px-6 lg:px-10 hover:border-[#0f766e]/50 hover:bg-[#f0faf9] transition-all group py-8"
  >
    <div className="w-12 h-12 bg-[#0f766e]/10 rounded-full flex items-center justify-center group-hover:bg-[#0f766e]/20 transition-colors">
      <img src={plusCircleIcon} alt="Add pet" className="w-5 h-5" />
    </div>
    <span className="font-sora font-semibold text-[15px] text-[#6b7280] group-hover:text-[#374151] transition-colors">Add another pet</span>
    <span className="font-manrope font-medium text-[11px] lg:text-[12px] text-[#6b7280] text-center leading-relaxed max-w-[200px]">
      Profiles help us personalize everything.
    </span>
  </button>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const MyPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState(INITIAL_PETS);

  // Handlers (ready for backend wiring)
  const handleDelete = (id) => {
    // TODO: DELETE /api/pets/:id
    setPets(prev => prev.filter(p => p.id !== id));
  };

  const handleAddPet = () => {
    navigate('/add-pet');
  };

  const handleEdit = (id) => {
    navigate(`/edit-pet/${id}`);
  };

  return (
    <main className="flex-1 flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sora font-semibold text-[24px] lg:text-[28px] text-[#1f2937]">My pets</h1>
          <p className="font-manrope text-[13px] lg:text-[14px] text-[#6b7280]">
            Keep profiles up to date for better recommendations.
          </p>
        </div>
        <button
          onClick={handleAddPet}
          className="flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6962] text-white rounded-full h-10 lg:h-11 px-4 lg:px-5 font-manrope font-semibold text-[13px] lg:text-[14px] transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 shrink-0 w-full sm:w-auto justify-center"
        >
          <img src={addPetIcon} alt="" className="w-4 h-4" />
          Add a pet
        </button>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 pb-16">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
        <AddPetCard onAdd={handleAddPet} />
      </div>
    </main>
  );
};

export default MyPets;
