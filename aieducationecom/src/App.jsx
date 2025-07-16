import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import { storage, STORAGE_KEYS } from './utils/api';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFavorites = storage.get(STORAGE_KEYS.FAVORITES) || [];
    const savedHistory = storage.get(STORAGE_KEYS.VIEW_HISTORY) || [];
    
    setFavorites(savedFavorites);
    setViewHistory(savedHistory);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  // Save view history to localStorage whenever it changes
  useEffect(() => {
    storage.set(STORAGE_KEYS.VIEW_HISTORY, viewHistory);
  }, [viewHistory]);

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleAddToHistory = (product) => {
    const historyItem = {
      productId: product.id,
      viewedAt: new Date().toISOString()
    };
    
    setViewHistory(prev => {
      // Remove existing entry for this product
      const filtered = prev.filter(item => item.productId !== product.id);
      // Add new entry at the end
      return [...filtered, historyItem];
    });
  };

  const handleClearHistory = () => {
    setViewHistory([]);
  };

  return (
    <Router>
      <div className="app">
        <Header favoriteCount={favorites.length} />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  viewHistory={viewHistory}
                  onAddToHistory={handleAddToHistory}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <FavoritesPage 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToHistory={handleAddToHistory}
                />
              } 
            />
            <Route 
              path="/history" 
              element={
                <HistoryPage 
                  viewHistory={viewHistory}
                  onClearHistory={handleClearHistory}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToHistory={handleAddToHistory}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
