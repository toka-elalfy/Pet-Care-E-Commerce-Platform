import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeIcon from '../assets/icons/welcome-icon.svg';
import arrowRight from '../assets/icons/arrow-right.svg';

const Onboarding = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    petName: '',
    petType: 'Dog',
    breed: '',
    age: '',
    weight: '',
    size: '',
    preferences: []
  });

  const handleTypeSelect = (type) => setFormData(prev => ({ ...prev, petType: type }));
  const handleSizeSelect = (size) => setFormData(prev => ({ ...prev, size }));
  const handlePreferenceSelect = (pref) => {
    setFormData(prev => {
      const isSelected = prev.preferences.includes(pref);
      if (isSelected) {
        return { ...prev, preferences: prev.preferences.filter(p => p !== pref) };
      }
      return { ...prev, preferences: [...prev.preferences, pref] };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const petTypes = ['Dog', 'Cat', 'Rabbit', 'Bird'];
  const sizes = ['Small', 'Medium', 'Large'];
  const allPreferences = ['Grain-free', 'Joint support', 'Sensitive skin', 'Puppy growth', 'Weight management', 'Dental care'];

  return (
    <div className="min-h-screen bg-[#fff8f1] flex flex-col font-manrope selection:bg-[#0f766e]/30">
      {/* Header */}
      <header className="bg-white border-b border-[#e7e2d9] h-16 md:h-[73px] flex items-center px-4 md:px-[148.5px] shrink-0 w-full relative z-20">
        <button 
          onClick={() => navigate('/signup')} 
          className="font-sora font-semibold text-[#1f2937] text-[15px] md:text-[16px] hover:text-[#0f766e] transition-colors"
        >
          ← Zootopia
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-8 md:pt-[64px] px-4 md:px-6 pb-16 w-full max-w-[808px] mx-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
        
        {/* Welcome Badge */}
        <div className="bg-[#A7C7A3]/30 rounded-full flex items-center justify-center gap-[6px] h-7 px-4 mb-4 transition-transform hover:scale-105">
          <img src={welcomeIcon} alt="welcome" className="w-3 h-3 md:w-[13px] md:h-[13px]" />
          <span className="font-manrope font-semibold text-[#0f766e] text-[11px] md:text-[12px]">
            Welcome to Zootopia
          </span>
        </div>

        {/* Headings */}
        <h1 className="font-sora font-bold text-[#1f2937] text-[24px] md:text-[32px] leading-tight text-center mb-2">
          Tell us about your first pet
        </h1>
        <p className="font-manrope text-[#6b7280] text-[13px] md:text-[14px] text-center max-w-[440px] mb-8 md:mb-10">
          It only takes a minute — we'll use this to personalize every recommendation.
        </p>

        {/* Form Card */}
        <div className="bg-white border border-[#e7e2d9] rounded-[24px] p-5 md:p-8 w-full flex flex-col gap-5 md:gap-[20px] shadow-sm transition-all hover:shadow-md duration-300">
          
          {/* Pet's name */}
          <div className="flex flex-col gap-1.5 w-full group">
            <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px] group-focus-within:text-[#0f766e] transition-colors">
              Pet's name
            </label>
            <input 
              type="text" 
              name="petName"
              value={formData.petName}
              onChange={handleInputChange}
              placeholder="e.g. Bella"
              className="bg-[#fff8f1] border border-[#e7e2d9] h-11 md:h-[48px] rounded-[12px] md:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/10 transition-all"
            />
          </div>

          {/* Pet type */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px]">
              Pet type
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              {petTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className={`h-10 md:h-[44px] px-5 rounded-full font-manrope font-semibold text-[13px] transition-all whitespace-nowrap border ${
                    formData.petType === type 
                      ? 'bg-[#0f766e] text-white border-[#0f766e] shadow-md' 
                      : 'bg-white text-[#1f2937] border-[#e7e2d9] hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Breed & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[16px] w-full">
            <div className="flex flex-col gap-1.5 group">
              <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px] group-focus-within:text-[#0f766e] transition-colors">
                Breed
              </label>
              <input 
                type="text" 
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                placeholder="Golden Retriever"
                className="bg-[#fff8f1] border border-[#e7e2d9] h-11 md:h-[48px] rounded-[12px] md:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/10 transition-all w-full"
              />
            </div>
            <div className="flex flex-col gap-1.5 group">
              <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px] group-focus-within:text-[#0f766e] transition-colors">
                Age
              </label>
              <input 
                type="text" 
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="3 years"
                className="bg-[#fff8f1] border border-[#e7e2d9] h-11 md:h-[48px] rounded-[12px] md:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/10 transition-all w-full"
              />
            </div>
          </div>

          {/* Weight & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[16px] w-full">
            <div className="flex flex-col gap-1.5 group">
              <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px] group-focus-within:text-[#0f766e] transition-colors">
                Weight
              </label>
              <input 
                type="text" 
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="28 kg"
                className="bg-[#fff8f1] border border-[#e7e2d9] h-11 md:h-[48px] rounded-[12px] md:rounded-[14px] px-4 font-manrope text-[14px] text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/10 transition-all w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px]">
                Size
              </label>
              <div className="flex gap-2 h-10 md:h-[44px] w-full">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`flex-1 rounded-full font-manrope font-semibold text-[12px] md:text-[13px] transition-all border ${
                      formData.size === size 
                        ? 'bg-[#0f766e] text-white border-[#0f766e] shadow-md' 
                        : 'bg-white text-[#1f2937] border-[#e7e2d9] hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences & needs */}
          <div className="flex flex-col gap-2 w-full mb-2">
            <label className="font-manrope font-semibold text-[#6b7280] text-[11px] md:text-[12px]">
              Preferences & needs
            </label>
            <div className="flex flex-wrap gap-2">
              {allPreferences.map(pref => (
                <button
                  key={pref}
                  onClick={() => handlePreferenceSelect(pref)}
                  className={`h-9 px-4 rounded-full font-manrope font-medium text-[11px] md:text-[12px] transition-all border ${
                    formData.preferences.includes(pref)
                      ? 'bg-[#0f766e]/10 text-[#0f766e] border-[#0f766e] shadow-sm'
                      : 'bg-transparent text-[#1f2937] border-[#e7e2d9] hover:bg-gray-50'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-2 gap-4 w-full">
            <button 
              onClick={() => navigate('/dashboard')}
              className="font-manrope font-medium text-[#6b7280] text-[13px] hover:text-[#1f2937] transition-colors"
            >
              Skip for now
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="bg-[#0f766e] hover:bg-[#0d6962] text-white rounded-full h-12 md:h-[48px] px-8 flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 w-full sm:w-auto min-w-[220px]"
            >
              <span className="font-manrope font-semibold text-[14px]">
                See recommendations
              </span>
              <img src={arrowRight} alt="arrow" className="w-4 h-4" />
            </button>
          </div>

        </div>
      </main>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
