import { X, Star, Users, Clock, BookOpen, Award, Heart } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, onToggleFavorite, isFavorite }) => {
  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
          <X size={24} />
        </button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="modal-info">
            <div className="modal-header">
              <h2>{product.name}</h2>
              <button 
                className={`favorite-btn-modal ${isFavorite ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
              >
                <Heart size={24} fill={isFavorite ? '#ff4757' : 'none'} />
              </button>
            </div>
            
            <div className="modal-meta">
              <div className="meta-item">
                <Star size={18} fill="#ffd700" color="#ffd700" />
                <span>{product.rating} ({product.students} đánh giá)</span>
              </div>
              <div className="meta-item">
                <Users size={18} />
                <span>{product.students} học viên</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>{product.duration}</span>
              </div>
              <div className="meta-item">
                <BookOpen size={18} />
                <span>{product.level}</span>
              </div>
              <div className="meta-item">
                <Award size={18} />
                <span>{product.category}</span>
              </div>
            </div>
            
            <div className="modal-description">
              <h3>Mô tả khóa học</h3>
              <p>{product.fullDescription}</p>
            </div>
            
            <div className="modal-features">
              <h3>Bạn sẽ học được gì?</h3>
              <ul>
                <li>Kiến thức cơ bản đến nâng cao về {product.category.toLowerCase()}</li>
                <li>Thực hành với các dự án thực tế</li>
                <li>Hỗ trợ 1-1 từ giảng viên</li>
                <li>Chứng chỉ hoàn thành khóa học</li>
                <li>Truy cập trọn đời vào tài liệu</li>
              </ul>
            </div>
            
            <div className="modal-footer">
              <div className="price-section">
                <div className="current-price">{formatPrice(product.price)}</div>
                <div className="original-price">{formatPrice(product.price * 1.5)}</div>
                <div className="discount">Giảm 33%</div>
              </div>
              <button className="enroll-btn">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;