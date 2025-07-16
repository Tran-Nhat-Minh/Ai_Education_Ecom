import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchAndFilter from '../components/SearchAndFilter';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Toast from '../components/Toast';
// GeminiApiKeyModal không còn cần thiết vì chúng ta đã có API key cố định
// import GeminiApiKeyModal from '../components/GeminiApiKeyModal';
import { products, mockSuggestions, priceRanges } from '../data/mockData';
import { getPersonalizedRecommendations } from '../utils/geminiApi';

const HomePage = ({ 
  favorites, 
  onToggleFavorite, 
  viewHistory, 
  onAddToHistory 
}) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'Tất cả') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    const priceRange = priceRanges[selectedPriceRange];
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedPriceRange]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    onAddToHistory(product);
  };

  const handleToggleFavorite = (productId) => {
    const product = products.find(p => p.id === productId);
    const isFavorite = favorites.includes(productId);
    
    onToggleFavorite(productId);
    
    setToast({
      show: true,
      message: isFavorite 
        ? `Đã xóa "${product.name}" khỏi danh sách yêu thích`
        : `Đã thêm "${product.name}" vào danh sách yêu thích`,
      type: 'favorite'
    });
  };

  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const recommendationResults = await getPersonalizedRecommendations(
        viewHistory,
        favorites,
        products
      );
      
      setRecommendations(recommendationResults);
      
      const suggestedIds = recommendationResults.map(rec => rec.id);
      const suggestedProducts = products.filter(p => suggestedIds.includes(p.id));
      
      if (suggestedProducts.length === 0) {
        const fallbackIds = mockSuggestions.default;
        const fallbackProducts = products.filter(p => fallbackIds.includes(p.id));
        setFilteredProducts(fallbackProducts);
      } else {
        setFilteredProducts(suggestedProducts);
      }
      
      setShowSuggestions(true);
      
      setToast({
        show: true,
        message: 'Đã tải gợi ý khóa học phù hợp với bạn!',
        type: 'success'
      });
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      
      const fallbackIds = mockSuggestions.default;
      const fallbackProducts = products.filter(p => fallbackIds.includes(p.id));
      setFilteredProducts(fallbackProducts);
      setShowSuggestions(true);
      
      setToast({
        show: true,
        message: 'Đã tải gợi ý sản phẩm (chế độ dự phòng).',
        type: 'warning'
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedPriceRange(0);
    setShowSuggestions(false);
  };

  const getRecommendationReason = (productId) => {
    const recommendation = recommendations.find(rec => rec.id === productId);
    return recommendation ? recommendation.reason : 'Khóa học phổ biến';
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Khám phá khóa học</h1>
          <p>Tìm kiếm và học hỏi với hàng nghìn khóa học chất lượng cao</p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={setSelectedPriceRange}
          onGetSuggestions={handleGetSuggestions}
          isLoadingSuggestions={isLoadingSuggestions}
        />

        {showSuggestions && (
          <div className="suggestions-banner">
            <p>Hiển thị gợi ý khóa học dành cho bạn</p>
            <button onClick={resetFilters}>Xem tất cả khóa học</button>
          </div>
        )}

        <div className="products-section">
          <div className="products-header">
            <h2>Sản phẩm ({filteredProducts.length})</h2>
          </div>

          {isLoadingSuggestions ? (
            <LoadingSkeleton count={4} />
          ) : (
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="product-card-container">
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={handleViewDetails}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(product.id)}
                    />
                    {showSuggestions && (
                      <div className="recommendation-reason">
                        <span className="reason-label">Gợi ý:</span> {getRecommendationReason(product.id)}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.</p>
                  <button onClick={resetFilters}>Xóa bộ lọc</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct && favorites.includes(selectedProduct.id)}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default HomePage;