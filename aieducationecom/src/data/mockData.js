// Mock data cho sản phẩm giáo dục
export const products = [
  {
    id: 1,
    name: "Khóa học Tiếng Anh Giao Tiếp Cơ Bản",
    price: 299000,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    shortDescription: "Học tiếng Anh giao tiếp từ cơ bản đến nâng cao với giáo viên bản ngữ",
    fullDescription: "Khóa học tiếng Anh giao tiếp toàn diện với 50+ bài học video HD, tài liệu PDF đầy đủ, và hỗ trợ 1-1 với giáo viên. Phù hợp cho người mới bắt đầu muốn giao tiếp tự tin trong môi trường quốc tế.",
    category: "Ngôn ngữ",
    rating: 4.8,
    students: 1250,
    duration: "40 giờ",
    level: "Cơ bản"
  },
  {
    id: 2,
    name: "Lập Trình React từ Zero đến Hero",
    price: 599000,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    shortDescription: "Khóa học React.js toàn diện từ cơ bản đến nâng cao",
    fullDescription: "Học React.js từ những kiến thức cơ bản nhất đến các kỹ thuật nâng cao. Bao gồm Hooks, Context API, Redux, và các dự án thực tế. Phù hợp cho developer muốn chuyển sang Frontend.",
    category: "Lập trình",
    rating: 4.9,
    students: 890,
    duration: "60 giờ",
    level: "Trung bình"
  },
  {
    id: 3,
    name: "Digital Marketing Toàn Diện 2024",
    price: 799000,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    shortDescription: "Chiến lược marketing online hiệu quả cho doanh nghiệp",
    fullDescription: "Khóa học Digital Marketing bao gồm SEO, SEM, Social Media Marketing, Content Marketing và Analytics. Học cách xây dựng chiến lược marketing toàn diện cho doanh nghiệp trong thời đại số.",
    category: "Marketing",
    rating: 4.7,
    students: 2100,
    duration: "45 giờ",
    level: "Trung bình"
  },
  {
    id: 4,
    name: "Thiết Kế UI/UX với Figma",
    price: 450000,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    shortDescription: "Học thiết kế giao diện người dùng chuyên nghiệp",
    fullDescription: "Khóa học UI/UX Design với Figma từ cơ bản đến nâng cao. Học cách thiết kế wireframe, prototype, và tạo ra những giao diện người dùng đẹp mắt và dễ sử dụng.",
    category: "Thiết kế",
    rating: 4.6,
    students: 750,
    duration: "35 giờ",
    level: "Cơ bản"
  },
  {
    id: 5,
    name: "Python cho Data Science",
    price: 699000,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    shortDescription: "Phân tích dữ liệu và Machine Learning với Python",
    fullDescription: "Khóa học Python Data Science bao gồm Pandas, NumPy, Matplotlib, Seaborn và Scikit-learn. Học cách thu thập, xử lý và phân tích dữ liệu để đưa ra quyết định kinh doanh thông minh.",
    category: "Data Science",
    rating: 4.8,
    students: 1450,
    duration: "55 giờ",
    level: "Nâng cao"
  },
  {
    id: 6,
    name: "Photoshop CC 2024 Toàn Tập",
    price: 399000,
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
    shortDescription: "Chỉnh sửa ảnh chuyên nghiệp với Adobe Photoshop",
    fullDescription: "Khóa học Photoshop từ cơ bản đến nâng cao. Học các kỹ thuật chỉnh sửa ảnh, tạo poster, banner, và thiết kế đồ họa chuyên nghiệp. Phù hợp cho designer và marketer.",
    category: "Thiết kế",
    rating: 4.5,
    students: 980,
    duration: "30 giờ",
    level: "Cơ bản"
  },
  {
    id: 7,
    name: "Khởi Nghiệp Thành Công",
    price: 899000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    shortDescription: "Hướng dẫn khởi nghiệp từ ý tưởng đến thành công",
    fullDescription: "Khóa học khởi nghiệp toàn diện từ việc tìm ý tưởng, lập kế hoạch kinh doanh, gọi vốn đầu tư đến vận hành và phát triển doanh nghiệp. Được giảng dạy bởi các chuyên gia có kinh nghiệm thực tế.",
    category: "Kinh doanh",
    rating: 4.9,
    students: 650,
    duration: "50 giờ",
    level: "Trung bình"
  },
  {
    id: 8,
    name: "Tiếng Nhật N5-N3 Cấp Tốc",
    price: 549000,
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
    shortDescription: "Học tiếng Nhật hiệu quả cho người mới bắt đầu",
    fullDescription: "Khóa học tiếng Nhật từ N5 đến N3 với phương pháp học hiện đại. Bao gồm Hiragana, Katakana, Kanji cơ bản, ngữ pháp và giao tiếp hàng ngày. Có bài tập thực hành và kiểm tra định kỳ.",
    category: "Ngôn ngữ",
    rating: 4.7,
    students: 1100,
    duration: "65 giờ",
    level: "Cơ bản"
  }
];

// Mock API suggestions
export const mockSuggestions = {
  1: [1, 3, 5], // User 1 được gợi ý sản phẩm 1, 3, 5
  2: [2, 4, 6],
  3: [1, 7, 8],
  default: [1, 2, 3, 4]
};

// Categories for filtering
export const categories = [
  "Tất cả",
  "Ngôn ngữ",
  "Lập trình",
  "Marketing",
  "Thiết kế",
  "Data Science",
  "Kinh doanh"
];

// Price ranges for filtering
export const priceRanges = [
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "Dưới 500K", min: 0, max: 500000 },
  { label: "500K - 1 triệu", min: 500000, max: 1000000 },
  { label: "Trên 1 triệu", min: 1000000, max: Infinity }
];