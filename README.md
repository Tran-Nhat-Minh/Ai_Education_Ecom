# EduAI Store - Nền tảng thương mại điện tử giáo dục tích hợp AI

## Tổng quan
EduAI Store là một nền tảng thương mại điện tử về giáo dục, tích hợp hệ thống đề xuất khóa học cá nhân hóa sử dụng trí tuệ nhân tạo (AI). Ứng dụng cho phép người dùng duyệt, tìm kiếm, lọc và đánh dấu yêu thích các khóa học, xem chi tiết từng khóa học, đồng thời nhận được các gợi ý khóa học phù hợp dựa trên lịch sử và sở thích của họ.

## Tính năng chính
- Hiển thị danh sách khóa học với thông tin chi tiết
- Tìm kiếm và lọc khóa học theo tên, danh mục và khoảng giá
- Gợi ý khóa học cá nhân hóa sử dụng AI
- Thêm / xóa khóa học yêu thích
- Xem thông tin khóa học chi tiết trong cửa sổ modal
- Lưu lịch sử xem khóa học
- Giao diện responsive cho máy tính, máy tính bảng và điện thoại
- Thông báo dạng toast khi người dùng thực hiện hành động

## Cấu trúc dự án
```
/aieducationecom
├── public/               # Tài nguyên tĩnh như ảnh
├── src/
│   ├── assets/           # Hình ảnh và file tĩnh
│   ├── components/       # Các component React tái sử dụng (ProductCard, ProductModal, Toast,...)
│   ├── data/             # Dữ liệu mô phỏng khóa học
│   ├── pages/            # Các trang chính (HomePage, FavoritesPage, HistoryPage)
│   ├── utils/            # Hàm tiện ích bao gồm tích hợp Gemini API
│   ├── App.jsx           # Component gốc của ứng dụng
│   ├── main.jsx          # Điểm khởi đầu ứng dụng
│   └── index.css         # CSS toàn cục
├── package.json          # Cấu hình phụ thuộc và script
└── README.md             # Tài liệu dự án
```

## Cách hoạt động
- Component `HomePage` xử lý việc hiển thị, tìm kiếm, lọc và gọi AI để gợi ý khóa học.
- Người dùng tương tác như thêm yêu thích hoặc xem chi tiết sẽ được lưu vào state và local storage.
- Gợi ý AI được gọi thông qua hàm trong `utils/geminiApi.js`, gửi dữ liệu lịch sử và yêu thích người dùng đến Gemini API để nhận gợi ý.
- Nếu AI không trả về hợp lệ, fallback mặc định sẽ được dùng.
- Các toast thông báo được hiển thị mỗi khi người dùng thực hiện hành động như thêm yêu thích hoặc nhận gợi ý.

## Hướng dẫn cài đặt và chạy
### Yêu cầu
- Node.js (>= 16.0.0)
- Yarn (cài bằng lệnh `npm install --global yarn` nếu chưa có)

### Cài đặt và chạy dự án
1. Clone repository về máy.
2. Mở terminal và chuyển đến thư mục dự án.
3. Cài đặt thư viện và khởi chạy bằng Yarn:
```
yarn
yarn dev
```
- Server sẽ khởi động tại địa chỉ http://localhost:5173

### Build bản sản phẩm
```
yarn build
```
- Tạo build tối ưu trong thư mục `dist`

### Xem trước bản build sản phẩm
```
yarn preview
```
- Chạy bản build vừa tạo để kiểm thử

## Ghi chú
- API Key của Gemini đã được tích hợp sẵn trong dự án tuy nhiên có thể tự động bị vô hiệu hóa nếu sau một thời gian không sử dung hoặc sử dụng hết lượt miễn phí.
- Dữ liệu khóa học sử dụng dữ liệu mô phỏng, nhưng việc gợi ý là từ AI thật.
- Giao diện được tối ưu cho trải nghiệm người dùng với hiệu ứng loading skeleton và toast thông báo.