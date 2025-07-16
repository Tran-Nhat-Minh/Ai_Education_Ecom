import { useState } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { categories, priceRanges } from '../data/mockData';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedPriceRange, 
  onPriceRangeChange,
  onGetSuggestions,
  isLoadingSuggestions
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="search-filter-container">
      <div className="search-section">
        <div className="search-input-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          Bộ lọc
        </button>
        
        <button 
          className={`suggestions-btn ${isLoadingSuggestions ? 'loading' : ''}`}
          onClick={onGetSuggestions}
          disabled={isLoadingSuggestions}
        >
          <Sparkles size={20} />
          {isLoadingSuggestions ? 'Đang tải...' : 'Gợi ý AI'}
        </button>
      </div>
      
      {showFilters && (
        <div className="filters-section">
          <div className="filter-group">
            <label>Danh mục:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => onCategoryChange(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Khoảng giá:</label>
            <select 
              value={selectedPriceRange} 
              onChange={(e) => onPriceRangeChange(parseInt(e.target.value))}
              className="filter-select"
            >
              {priceRanges.map((range, index) => (
                <option key={index} value={index}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="clear-filters"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('Tất cả');
              onPriceRangeChange(0);
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;