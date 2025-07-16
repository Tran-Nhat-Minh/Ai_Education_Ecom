const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-meta">
              <div className="skeleton-rating"></div>
              <div className="skeleton-students"></div>
            </div>
            <div className="skeleton-footer">
              <div className="skeleton-price"></div>
              <div className="skeleton-level"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;