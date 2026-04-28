import filterIcon from '../../assets/icons/filter-icon.svg';

const FilterGroup = ({ title, options, activeValue, onChange }) => (
  <div className="flex flex-col gap-3 py-4 lg:py-[20px] border-t border-[#e7e2d9] first:border-t-0">
    <h3 className="text-[#6b7280] text-[10px] lg:text-[12px] font-semibold tracking-[1px] lg:tracking-[1.2px] uppercase">
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`h-8 px-3 rounded-full text-[11px] lg:text-[12px] font-medium border transition-all ${
            activeValue === option
              ? 'bg-[#0f766e] border-[#0f766e] text-white shadow-sm'
              : 'bg-white border-[#e7e2d9] text-[#1f2937] hover:border-[#0f766e]/50'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const ShopFilterSidebar = ({ filters, setFilters }) => {
  const filterSections = [
    {
      id: 'petType',
      title: 'Pet type',
      options: ['All', 'Dog', 'Cat']
    },
    {
      id: 'category',
      title: 'Category',
      options: ['All', 'Food', 'Toys', 'Health', 'Grooming']
    },
    {
      id: 'ageGroup',
      title: 'Age group',
      options: ['All', 'Puppy', 'Adult', 'Senior']
    },
    {
      id: 'size',
      title: 'Size',
      options: ['Small', 'Medium', 'Large']
    }
  ];

  return (
    <div className="bg-white lg:border border-[#e7e2d9] rounded-[16px] p-4 lg:p-[20px] lg:sticky lg:top-[105px]">
      {/* Header */}
      <div className="hidden lg:flex items-center gap-2 mb-4">
        <img src={filterIcon} alt="filters" className="w-[15px] h-[15px]" />
        <span className="text-[#1f2937] font-sora font-semibold text-[14px]">Filters</span>
      </div>

      {/* Groups */}
      <div className="flex flex-col">
        {filterSections.map(section => (
          <FilterGroup
            key={section.id}
            title={section.title}
            options={section.options}
            activeValue={filters[section.id]}
            onChange={(value) => setFilters({ ...filters, [section.id]: value })}
          />
        ))}
      </div>

      {/* Clear Filters (Desktop/Tablet) */}
      <button 
        onClick={() => setFilters({ petType: 'All', category: 'All', ageGroup: 'All', size: 'All' })}
        className="w-full mt-2 py-2 text-[#6b7280] text-[11px] lg:text-[12px] font-semibold hover:text-[#0f766e] transition-colors border-t border-[#e7e2d9]/50 pt-4"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default ShopFilterSidebar;
