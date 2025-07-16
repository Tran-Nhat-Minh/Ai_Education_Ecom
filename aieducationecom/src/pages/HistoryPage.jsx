import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Toast from '../components/Toast';
import { products } from '../data/mockData';
import { History, Trash2 } from 'lucide-react';

const HistoryPage = ({ 
  viewHistory, 
  onClearHistory,
  favorites,
  onToggleFavorite, 
  onAddToHistory 
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Get unique products from history (most recent first)
  const historyProducts = viewHistory
    .map(historyItem => {
      const product = products.find(p => p.id === historyItem.productId);
      return product ? { ...product, viewedAt: historyItem.viewedAt } : null;
    })
    .filter(Boolean)
    .reverse(); // Most recent first

  // Remove duplicates, keeping the most recent view
  const uniqueHistoryProducts = historyProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );

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

  const handleClearHistory = () => {
    onClearHistory();
    setToast({
      show: true,
      message: 'Đã xóa toàn bộ lịch sử xem',
      type: 'success'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Vừa xem';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    }
  };

  return (
    <div className="history-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <History size={32} />
            Lịch sử xem
          </h1>
          <p>Các khóa học bạn đã xem gần đây</p>
        </div>

        {uniqueHistoryProducts.length > 0 ? (
          <>
            <div className="products-header">
              <h2>Có {uniqueHistoryProducts.length} sản phẩm trong lịch sử</h2>
              <button 
                className="clear-history-btn"
                onClick={handleClearHistory}
              >
                <Trash2 size={16} />
                Xóa lịch sử
              </button>
            </div>
            
            <div className="history-grid">
              {uniqueHistoryProducts.map(product => (
                <div key={product.id} className="history-item">
                  <div className="history-timestamp">
                    {formatDate(product.viewedAt)}
                  </div>
                  <ProductCard
                    product={product}
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(product.id)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <History size={64} color="#ddd" />
            </div>
            <h3>Chưa có lịch sử xem</h3>
            <p>Khi bạn xem chi tiết các khóa học, chúng sẽ xuất hiện ở đây!</p>
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

export default HistoryPage;