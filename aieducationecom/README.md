# EduAI Store - Sàn Giáo Dục Thương Mại Điện Tử Tích Hợp AI

## Mô tả dự án

EduAI Store là một sàn giáo dục thương mại điện tử hiện đại tích hợp AI, nơi người dùng có thể tìm kiếm, khám phá và yêu thích các khóa học hoặc sản phẩm giáo dục. Dự án được xây dựng với React và Vite, tập trung vào thiết kế UI hiện đại, tối ưu UX và đảm bảo responsive trên mọi thiết bị.

## Tính năng chính

### ✅ Đã hoàn thành
- **Hiển thị danh sách sản phẩm**: Danh sách khóa học với thông tin đầy đủ
- **Tìm kiếm và lọc**: Tìm kiếm theo tên, lọc theo danh mục và khoảng giá
- **Gợi ý thông minh AI**: Gợi ý sản phẩm phù hợp dựa trên hành vi người dùng
- **Modal chi tiết sản phẩm**: Hiển thị thông tin chi tiết khi click vào sản phẩm
- **Yêu thích**: Đánh dấu và quản lý sản phẩm yêu thích
- **Lịch sử xem**: Theo dõi các sản phẩm đã xem
- **Loading skeleton**: Hiệu ứng loading khi gọi API
- **Toast notifications**: Thông báo khi thêm/xóa yêu thích
- **Responsive design**: Hoạt động tốt trên desktop, tablet, mobile

## Công nghệ sử dụng

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Routing**: React Router DOM 6.26.1
- **HTTP Client**: Axios 1.6.2
- **Icons**: Lucide React 0.294.0
- **Styling**: CSS3 với Flexbox và Grid
- **State Management**: React Hooks (useState, useEffect)
- **Local Storage**: Lưu trữ favorites và view history

## Hướng dẫn cài đặt và chạy

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- npm hoặc yarn

### Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd aieducationecom
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

### Chạy dự án

1. **Development mode**:
```bash
npm run dev
# hoặc
yarn dev
```
Truy cập: http://localhost:5173

2. **Build production**:
```bash
npm run build
# hoặc
yarn build
```

3. **Preview production build**:
```bash
npm run preview
# hoặc
yarn preview
```

## Tính năng chi tiết

### 🏠 Trang chủ
- Hiển thị danh sách tất cả khóa học
- Tìm kiếm theo tên khóa học
- Lọc theo danh mục và khoảng giá
- Gợi ý AI dựa trên hành vi người dùng
- Thêm/xóa yêu thích
- Xem chi tiết sản phẩm

### ❤️ Trang yêu thích
- Hiển thị danh sách sản phẩm đã yêu thích
- Xóa khỏi danh sách yêu thích
- Xem chi tiết sản phẩm

### 📚 Trang lịch sử
- Hiển thị các sản phẩm đã xem
- Thời gian xem gần nhất
- Xóa toàn bộ lịch sử

## Mock Data

Dự án sử dụng mock data với 8 khóa học mẫu bao gồm các lĩnh vực: Ngôn ngữ, Lập trình, Marketing, Thiết kế, Data Science, và Kinh doanh.

## Responsive Design

- **Desktop**: Grid layout 3-4 cột
- **Tablet**: Grid layout 2 cột  
- **Mobile**: Single column layout

## Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
