import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Toast from '../components/Toast';
import { products } from '../data/mockData';
import { Heart } from 'lucide-react';

const FavoritesPage = ({ 
  favorites, 
  onToggleFavorite, 
  onAddToHistory 
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const favoriteProducts = products.filter(product => 
    favorites.includes(product.id)
  );

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    onAddToHistory(product);
  };

  const handleToggleFavorite = (productId) => {
    const product = products.find(p => p.id === productId);
    onToggleFavorite(productId);
    
    setToast({
      show: true,
      message: `Đã xóa "${product.name}" khỏi danh sách yêu thích`,
      type: 'favorite'
    });
  };

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <Heart size={32} fill="#ff4757" color="#ff4757" />
            Sản phẩm yêu thích
          </h1>
          <p>Danh sách các khóa học bạn đã đánh dấu yêu thích</p>
        </div>

        {favoriteProducts.length > 0 ? (
          <>
            <div className="products-header">
              <h2>Có {favoriteProducts.length} sản phẩm trong danh sách yêu thích</h2>
            </div>
            
            <div className="products-grid">
              {favoriteProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Heart size={64} color="#ddd" />
            </div>
            <h3>Chưa có sản phẩm yêu thích</h3>
            <p>Hãy khám phá và thêm những khóa học bạn quan tâm vào danh sách yêu thích!</p>
            <a href="/" className="cta-button">
              Khám phá ngay
            </a>
          </div>
        )}
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

export default FavoritesPage;