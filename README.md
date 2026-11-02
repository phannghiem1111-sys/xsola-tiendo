# Tiến độ Xsola

Web app (PWA) theo dõi tiến độ triển khai **kiểm soát nhiệt độ** và **Sola** của Xsola, 15/11 – 31/12/2026.

## Cài lên điện thoại
Mở link GitHub Pages của repo này bằng Chrome (Android) hoặc Safari (iPhone), chọn **Thêm vào màn hình chính**.

## Cho cả đội cập nhật chung (Google Sheet)
1. Tạo Google Sheet mới, vào **Tiện ích mở rộng > Apps Script**.
2. Dán nội dung `apps-script/Code.gs`, bấm **Lưu**.
3. **Triển khai > Triển khai mới > Ứng dụng web**: *Thực thi bằng* = Tôi, *Ai có quyền truy cập* = Bất kỳ ai. Cấp quyền khi được hỏi.
4. Sao chép địa chỉ Web App (kết thúc bằng `/exec`) và dán vào `config.js` ở mục `sheetApi`.
5. Commit thay đổi. App tự đồng bộ mỗi 20 giây.

Lưu ý: ai có địa chỉ Web App đều ghi được dữ liệu, chỉ gửi cho người trong đội.

Nếu để trống `sheetApi`, dữ liệu chỉ lưu trên từng điện thoại.
