# Website Nha khoa T-Smile Ninh Bình

Landing page một trang cho Nha khoa T-Smile Ninh Bình (Phiếu Dev 50). Mục tiêu duy nhất của trang là **đặt lịch / nhận tư vấn**.

- Tài liệu yêu cầu (nguồn thông tin gốc): [docs/YEU-CAU-DU-AN.md](docs/YEU-CAU-DU-AN.md)
- Quy tắc làm việc trong repo: [AGENTS.md](AGENTS.md)

## Chạy dự án

Dùng **npm**.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Công nghệ

Next.js 16.4 (App Router, Cache Components), React 19, antd 6 (chỉ dùng cho form đặt lịch và menu Drawer), Tailwind CSS 4, TypeScript strict.

## Cấu trúc chính

| Đường dẫn | Nội dung |
|---|---|
| `app/page.tsx` | Trang chủ, chỉ ghép các section |
| `app/actions/booking.ts` | Server Action của form đặt lịch. **Chưa gửi dữ liệu đi đâu** (chờ chốt Q-09) |
| `components/sections/` | Các section của landing page và form đặt lịch |
| `components/layout/` | Header, Footer, thanh liên hệ nổi trên mobile, Providers của antd |
| `lib/site-config.ts` | Tên, SĐT, Zalo, địa chỉ, link (nguồn duy nhất) |
| `lib/services.ts` | 5 dịch vụ |
| `lib/theme.ts` + `app/globals.css` | Design token, hai nơi phải luôn khớp nhau |
| `public/images/` | Ảnh đã xử lý cho web (`brand/`, `clinic/`, `services/`) |
| `assets/library/` | Ảnh gốc khách gửi. Không nằm trong `public/` nên không bị deploy |
