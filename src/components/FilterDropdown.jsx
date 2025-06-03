import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';

export const FilterDropdown = ({ filters, selectedCategory, onCategoryChange, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedFilter = filters.find(f => f.value === selectedCategory);

  return (
    <div className="flex justify-center mb-12">
      <div className="relative" ref={dropdownRef}>
        {/* Filter Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-6 py-3 bg-gray-950 border border-gray-800 text-white hover:border-gray-700 transition-all min-w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="font-light">
              {selectedFilter?.label || t('products.filters.all')}
            </span>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-950 border border-gray-800 z-50 max-h-80 overflow-y-auto">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  onCategoryChange(filter.value);
                  setIsOpen(false);
                }}
                className={`w-full px-6 py-3 text-left text-sm font-light transition-all hover:bg-gray-900 flex items-center justify-between ${
                  selectedCategory === filter.value
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{filter.label}</span>
                {selectedCategory === filter.value && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};