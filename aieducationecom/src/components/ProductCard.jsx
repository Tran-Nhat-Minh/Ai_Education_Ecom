import { useState } from 'react';
import { Heart, Star, Users, Clock } from 'lucide-react';

const ProductCard = ({ product, onViewDetails, onToggleFavorite, isFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(product)}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
        >
          <Heart size={20} fill={isFavorite ? '#ff4757' : 'none'} />
        </button>
        <div className="product-overlay">
          <button className="view-details-btn">
            Xem chi tiết
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.shortDescription}</p>
        
        <div className="product-meta">
          <div className="rating">
            <Star size={16} fill="#ffd700" color="#ffd700" />
            <span>{product.rating}</span>
          </div>
          <div className="students">
            <Users size={16} />
            <span>{product.students}</span>
          </div>
          <div className="duration">
            <Clock size={16} />
            <span>{product.duration}</span>
          </div>
        </div>
        
        <div className="product-footer">
          <div className="price">{formatPrice(product.price)}</div>
          <div className="level">{product.level}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;