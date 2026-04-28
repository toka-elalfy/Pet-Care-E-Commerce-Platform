import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Shared images
import bellaImg from '../assets/images/dashboard-bella.png';
import miloImg  from '../assets/images/dashboard-milo.png';
import cocoImg  from '../assets/images/dashboard-coco.png';

// Icons
import arrowLeftIcon     from '../assets/icons/arrow-left-icon.svg';
import plusCircleIcon    from '../assets/icons/plus-circle-icon.svg';
import petProfileIcon    from '../assets/icons/pet-profile.svg';

// ─── Static form options ──────────────────────────────────────────────────────
const ANIMAL_TYPES   = ['Dog', 'Cat', 'Rabbit', 'Bird'];
const SIZES          = ['Small', 'Medium', 'Large'];
const PREFERENCES    = [
  'Grain-free', 'Joint support', 'Sensitive skin', 'Puppy growth',
  'Weight management', 'Dental care', 'Hairball control', 'Kidney health',
];

// ─── Mock Data (To simulate loading) ──────────────────────────────────────────
const INITIAL_PETS = [
  { id: 1, name: 'Bella',  type: 'Dog', breed: 'Golden Retriever', age: '3 years', weight: '28 kg', size: 'Large',  image: bellaImg, preferences: ['Grain-free', 'Joint support'] },
  { id: 2, name: 'Milo',   type: 'Cat', breed: 'British Shorthair', age: '5 years', weight: '4.2 kg', size: 'Medium', image: miloImg,  preferences: ['Sensitive skin'] },
  { id: 3, name: 'Coco',   type: 'Dog', breed: 'Shih Tzu',          age: '1 year',  weight: '6 kg',   size: 'Small',  image: cocoImg,  preferences: ['Dental care'] },
];

// ─── Chip selector component ─────────────────────────────────────────────────
const Chip = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-10 px-5 rounded-full font-manrope font-semibold text-[13px] leading-[19.5px] border transition-all whitespace-nowrap ${
      active
        ? 'bg-[#0f766e] border-[#0f766e] text-white shadow-md'
        : 'bg-white border-[#e7e2d9] text-[#1f2937] hover:border-[#0f766e]/40 hover:bg-[#f0faf9]'
    }`}
  >
    {label}
  </button>
);

// ─── Form field wrapper ───────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="font-manrope font-semibold text-[12px] text-[#6b7280] leading-[18px]">{label}</label>
    {children}
  </div>
);

// ─── Text Input ───────────────────────────────────────────────────────────────
const TextInput = ({ placeholder, value, onChange, name }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="bg-[#fff8f1] border border-[#e7e2d9] rounded-[14px] h-11 px-4 font-manrope text-[14px] text-[#1f2937] placeholder:text-[rgba(31,41,55,0.5)] focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 transition-all w-full"
  />
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const EditPet = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pet = INITIAL_PETS.find(p => p.id === parseInt(id));
  
  const [form, setForm] = useState({
    name: pet?.name || '',
    animalType: pet?.type || 'Dog',
    breed: pet?.breed || '',
    age: pet?.age || '',
    weight: pet?.weight || '',
    size: pet?.size || 'Medium',
    preferences: pet?.preferences || []
  });
  const [petImage, setPetImage] = useState(pet?.image || null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setError('');
    const imageUrl = URL.createObjectURL(file);
    setPetImage(imageUrl);
  };

  const handleTypeSelect  = (val) => setForm(prev => ({ ...prev, animalType: val }));
  const handleSizeSelect  = (val) => setForm(prev => ({ ...prev, size: val }));
  const handlePrefToggle  = (pref) => {
    setForm(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: PUT /api/pets/:id  →  { ...form }
    console.log('Pet updated:', form);
    navigate('/my-pets');
  };

  return (
    <main className="flex-1 flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sora font-semibold text-[24px] lg:text-[28px] text-[#1f2937] leading-tight">Edit pet profile</h1>
          <p className="font-manrope text-[13px] lg:text-[14px] text-[#6b7280] leading-[21px]">
            Update your pet's details to keep recommendations accurate.
          </p>
        </div>
        <button
          onClick={() => navigate('/my-pets')}
          className="flex items-center gap-2 bg-white border border-[#e7e2d9] rounded-full h-10 lg:h-11 px-4 font-manrope font-semibold text-[13px] text-[#1f2937] hover:bg-gray-50 transition-colors shrink-0"
        >
          <img src={arrowLeftIcon} alt="" className="w-[14px] h-[14px]" />
          Back to pets
        </button>
      </div>

      {/* Form + Right sidebar */}
      <div className="flex gap-6 pb-16 items-start">
        {/* Left: form sections */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">

          {/* ── Basic Info Section ── */}
          <section className="bg-white border border-[#e7e2d9] rounded-[20px] lg:rounded-[16px] p-5 lg:p-6 flex flex-col gap-6 lg:gap-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-sora font-semibold text-[16px] text-[#1f2937]">Basic info</h2>
              {error && <span className="text-[#f97360] text-[11px] font-manrope font-medium animate-pulse">{error}</span>}
            </div>

            {/* Pet Image Upload */}
            <div className="flex flex-col gap-3">
              <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280] uppercase tracking-wider">Pet photo</label>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                <div 
                  className="relative w-[100px] h-[100px] lg:w-[112px] lg:h-[112px] rounded-full border-2 border-dashed border-[#e7e2d9] bg-[#fff8f1] flex items-center justify-center overflow-hidden group hover:border-[#0f766e]/40 transition-all cursor-pointer shrink-0"
                  onClick={() => document.getElementById('pet-photo-upload').click()}
                >
                  {petImage ? (
                    <>
                      <img src={petImage} alt="Pet preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-[11px] font-semibold bg-[#0f766e] px-3 py-1 rounded-full">Change</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#0f766e]/10 rounded-full flex items-center justify-center group-hover:bg-[#0f766e]/20 transition-colors">
                        <img src={plusCircleIcon} alt="" className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
                  <button 
                    type="button"
                    onClick={() => document.getElementById('pet-photo-upload').click()}
                    className="font-manrope font-semibold text-[14px] text-[#0f766e] hover:text-[#0d6962] transition-colors w-fit"
                  >
                    {petImage ? 'Change photo' : 'Upload photo'}
                  </button>
                  <p className="font-manrope text-[11px] lg:text-[12px] text-[#6b7280]">
                    JPG, PNG or WebP. Max 5MB.
                  </p>
                </div>
                <input 
                  id="pet-photo-upload"
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Pet's name */}
            <Field label="Pet's name">
              <TextInput name="name" placeholder="e.g. Bella" value={form.name} onChange={handleChange} />
            </Field>

            {/* Animal type */}
            <div className="flex flex-col gap-2">
              <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280] uppercase tracking-wider">Animal type</label>
              <div className="flex flex-wrap gap-2">
                {ANIMAL_TYPES.map(type => (
                  <Chip key={type} label={type} active={form.animalType === type} onClick={() => handleTypeSelect(type)} />
                ))}
              </div>
            </div>

            {/* Breed + Age (2-col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-4">
              <Field label="Breed">
                <TextInput name="breed" placeholder="Golden Retriever" value={form.breed} onChange={handleChange} />
              </Field>
              <Field label="Age">
                <TextInput name="age" placeholder="3 years" value={form.age} onChange={handleChange} />
              </Field>
            </div>

            {/* Weight + Size (2-col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-4">
              <Field label="Weight">
                <TextInput name="weight" placeholder="28 kg" value={form.weight} onChange={handleChange} />
              </Field>
              <div className="flex flex-col gap-2">
                <label className="font-manrope font-semibold text-[11px] lg:text-[12px] text-[#6b7280] uppercase tracking-wider">Size</label>
                <div className="flex gap-2">
                  {SIZES.map(s => (
                    <Chip key={s} label={s} active={form.size === s} onClick={() => handleSizeSelect(s)} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Preferences & Needs Section ── */}
          <section className="bg-white border border-[#e7e2d9] rounded-[20px] lg:rounded-[16px] p-5 lg:p-6 flex flex-col gap-4 shadow-sm">
            <div>
              <h2 className="font-sora font-semibold text-[16px] text-[#1f2937]">Preferences &amp; needs</h2>
              <p className="font-manrope text-[13px] text-[#6b7280] mt-1">
                These directly drive smart filtering on the shop.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES.map(pref => (
                <Chip
                  key={pref}
                  label={pref}
                  active={form.preferences.includes(pref)}
                  onClick={() => handlePrefToggle(pref)}
                />
              ))}
            </div>
          </section>

          {/* ── Action Buttons ── */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate('/my-pets')}
              className="h-11 px-8 bg-white border border-[#e7e2d9] rounded-full font-manrope font-semibold text-[14px] text-[#1f2937] hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-8 bg-[#0f766e] hover:bg-[#0d6962] rounded-full font-manrope font-semibold text-[14px] text-white transition-all hover:shadow-lg active:scale-95 w-full sm:w-auto"
            >
              Save changes
            </button>
          </div>
        </form>

        {/* Right sidebar: info panel + preview card */}
        <div className="w-[290px] shrink-0 hidden xl:flex flex-col gap-4">

          {/* Why We Ask – teal card */}
          <div className="bg-[#0f766e] rounded-[16px] p-5 flex flex-col gap-4">
            <p className="font-manrope font-semibold text-[11px] text-white/70 uppercase tracking-widest">
              Why we ask
            </p>
            <h3 className="font-sora font-semibold text-[18px] text-white leading-tight">
              Pet data powers the whole platform.
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                'Narrows the catalog to what fits this pet',
                'Sets portion sizes for reorder reminders',
                'Matches subscription frequencies to real use',
              ].map(item => (
                <li key={item} className="font-manrope text-[13px] text-white/85 leading-snug">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Preview card */}
          <div className="bg-white border border-[#e7e2d9] rounded-[16px] p-5 flex flex-col gap-3 shadow-sm">
            <h4 className="font-sora font-semibold text-[14px] text-[#1f2937]">Preview card</h4>
            <div className="bg-[#fff8f1] rounded-[14px] p-4 flex items-center gap-4 border border-[#e7e2d9]/30">
              <div className="w-14 h-14 rounded-xl bg-[#e7e2d9]/40 overflow-hidden shrink-0 flex items-center justify-center">
                {petImage ? (
                  <img src={petImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <img src={petProfileIcon} alt="" className="w-6 h-6 opacity-40" />
                )}
              </div>
              <div className="flex flex-col">
                <h4 className="font-sora font-semibold text-[15px] text-[#1f2937] leading-tight">
                  {form.name || 'Your pet'}
                </h4>
                <p className="font-manrope text-[11px] text-[#6b7280]">
                  {form.animalType} · {form.breed || 'breed'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default EditPet;
