import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, History, GraduationCap } from 'lucide-react';

const Header = ({ favoriteCount }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <GraduationCap size={32} />
          <span>EduAI Store</span>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Trang chủ</span>
          </Link>
          
          <Link 
            to="/favorites" 
            className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            <Heart size={20} />
            <span>Yêu thích</span>
            {favoriteCount > 0 && (
              <span className="badge">{favoriteCount}</span>
            )}
          </Link>
          
          <Link 
            to="/history" 
            className={`nav-link ${isActive('/history') ? 'active' : ''}`}
          >
            <History size={20} />
            <span>Lịch sử</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;