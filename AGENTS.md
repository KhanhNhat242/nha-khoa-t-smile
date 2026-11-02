<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Quy tắc dự án: Website Nha khoa T-Smile Ninh Bình

Áp dụng cho **mọi** thay đổi trong repo, dù do người hay AI agent thực hiện: thêm tính năng, sửa lỗi, viết nội dung, chỉnh giao diện. Mọi việc làm sau này đều phải theo các quy tắc dưới đây.

> Không sửa khối `nextjs-agent-rules` ở trên vì `next dev` tự ghi lại khối đó. Quy tắc dự án chỉ viết ở phần này.

## 0. Trước khi bắt tay vào làm

1. **Đọc [docs/YEU-CAU-DU-AN.md](docs/YEU-CAU-DU-AN.md)**, ít nhất là các mục liên quan tới việc sắp làm. Đây là nguồn thông tin gốc về *làm gì*. File này (AGENTS.md) quy định *làm thế nào*.
2. Trước khi dùng bất kỳ API nào của Next.js, đọc hướng dẫn tương ứng trong `node_modules/next/dist/docs/`. Dự án dùng **Next.js 16.4**, khác nhiều so với kiến thức cũ.
3. Khi có mâu thuẫn, ưu tiên theo thứ tự:
   1. Chỉ đạo mới nhất của người dùng, nhưng phải **cập nhật vào tài liệu yêu cầu trước** rồi mới code.
   2. `docs/YEU-CAU-DU-AN.md`.
   3. File quy tắc này.
   4. Thói quen hay mặc định chung.
4. Yêu cầu nào có trong tài liệu nhưng mơ hồ hoặc đang thuộc mục 13 (câu hỏi mở) thì **hỏi lại**, không tự đoán rồi làm.

## 1. Nội dung: không bịa (quy tắc quan trọng nhất)

1. **Cấm tự tạo thông tin:** giá, bảng giá, khuyến mãi, tên/ảnh/bằng cấp bác sĩ, số năm hoạt động, số khách hàng, số ca, đánh giá, cảm nhận khách hàng, ảnh trước/sau, giờ mở cửa, giấy phép, chứng nhận, thương hiệu vật liệu, chế độ bảo hành.
2. Chỉ dùng nội dung có nhãn **[PHIẾU]**, **[SUY RA]** hoặc **[ĐỀ XUẤT]** trong tài liệu yêu cầu. Nội dung **[THIẾU]** thì bỏ qua, hoặc dùng câu trung tính không khẳng định sự kiện. Ví dụ: viết "Liên hệ hotline 0985 329 550 để được tư vấn chi phí", không viết "Giá chỉ từ 5 triệu".
3. Mọi nội dung tạm trong code phải đánh dấu `// TODO(content): <mô tả>` **và** ghi vào danh sách nội dung tạm ở mục 13 của tài liệu yêu cầu.
4. Đây là **quảng cáo dịch vụ y tế**, nên không dùng các từ cường điệu hoặc cam kết: "tốt nhất", "số 1", "hàng đầu", "rẻ nhất", "cam kết 100%", "khỏi hoàn toàn", "không đau", "vĩnh viễn", "trọn đời", trừ khi khách cung cấp và chịu trách nhiệm nội dung đó.
5. Câu "hàng ngàn khách hàng" lấy từ nội dung khách gửi. Giữ đúng câu đó, không đổi thành con số cụ thể, không làm bộ đếm.
6. **Không bao giờ hiển thị thông tin nội bộ** lên website: STT phiếu, mã DN (DN0136), tên sale, tên người liên hệ, trạng thái phiếu.
7. Chỉ có 5 dịch vụ, đúng tên và đúng thứ tự trong mục 4 của tài liệu yêu cầu. Không tự thêm dịch vụ.

## 2. Thương hiệu, ngôn ngữ, văn phong

1. Tên chuẩn: **"Nha khoa T-Smile"** (ngắn) và **"Nha khoa T-Smile Ninh Bình"** (đầy đủ). Không dùng lẫn "TSmile" hay "T Smile". Tên chỉ khai báo ở `lib/site-config.ts`.
2. **Chỉ có tiếng Việt, có dấu đầy đủ**: chữ trên giao diện, `alt`, `aria-label`, placeholder, thông báo lỗi, metadata. Định danh trong code (biến, hàm, file, component) viết bằng tiếng Anh. Comment có thể viết tiếng Việt.
3. Xưng hô: phòng khám tự xưng "Nha khoa T-Smile" / "chúng tôi", gọi người đọc là **"Quý khách"**, dùng thống nhất trên cả site. Không dùng teen code, tiếng lóng hay chữ viết tắt kiểu chat.
4. Văn phong "Chuyên nghiệp": rõ ràng, ân cần, câu ngắn, đi thẳng vào lợi ích. Không dùng nhiều dấu chấm than. Không tô chữ hoa cả đoạn.
5. Định dạng cố định:
   - SĐT hiển thị `0985 329 550`, link `tel:0985329550`.
   - Ngày theo dạng `DD/MM/YYYY`.
   - Địa chỉ **giữ nguyên văn** `263 Nguyễn Công Trứ, Phường Hoa Lư, Tỉnh Ninh Bình`, không thêm quận/huyện hay "TP. Ninh Bình".

## 3. Giao diện

1. **Màu:** chỉ lấy từ design token. Token khai báo ở đúng 2 nơi và hai nơi phải luôn khớp nhau: `@theme` trong `app/globals.css` (cho Tailwind) và `lib/theme.ts` (token cho antd `ConfigProvider`). Ngoài hai file này, **cấm viết mã màu hex hoặc rgb** trong code.
2. Màu chủ đạo: xanh lá (primary), vàng (accent), trắng (nền). **Cấm đặt chữ vàng trên nền trắng.** Màu vàng chỉ dùng làm nền đi với chữ tối, hoặc làm chi tiết trang trí.
3. Không dùng màu be/nâu của dự án cũ (`#EFE8DC`, `rgba(255,253,249,…)`), không dùng logo homestay `public/images/mainlogo-img1.jpg`.
4. Logo và ảnh chỉ lấy từ Drive của khách (link ở GD-03, GD-04 trong tài liệu yêu cầu). Không vẽ lại hay đổi màu logo. Ảnh minh họa không được trình bày như ảnh thật của phòng khám.
5. **Font** phải có subset `vietnamese`, nạp bằng `next/font` (`subsets: ['latin', 'vietnamese']`). **Cấm** Poppins và Lato. Không ghi đè `font-family` bằng Arial hay font hệ thống trong CSS.
6. **Thiết kế cho mobile trước.** Mỗi thay đổi giao diện phải kiểm tra ở 360px và ≥ 1280px. Không để xuất hiện thanh cuộn ngang.
7. Khả năng truy cập:
   - Tương phản chữ ≥ 4.5:1.
   - Chữ thân bài ≥ 16px, vì có nhóm khách 45–70 tuổi.
   - Vùng chạm ≥ 44×44px.
   - Input nào cũng có label. Ảnh nào cũng có `alt`. Dùng được bằng bàn phím.
8. Hiệu ứng nhẹ nhàng và phải tôn trọng `prefers-reduced-motion`. Hệ `data-reveal` trong `globals.css` **chưa có JS gắn class `.is-revealed`**. Chừng nào chưa viết hook IntersectionObserver cho nó thì không được dùng `data-reveal`, vì phần tử sẽ bị ẩn vĩnh viễn (opacity 0).

## 4. Chức năng và chuyển đổi

1. Mục tiêu duy nhất của site là **đặt lịch / nhận tư vấn**. Section mới nào cũng phải dẫn tới hành động đó hoặc giúp tăng niềm tin. Nếu không thì không làm.
2. Nút "Đặt lịch tư vấn" phải có ở: header, hero, sau phần dịch vụ, và thanh liên hệ nổi trên mobile. Nút Gọi và Zalo bấm được bằng 1 chạm.
3. Form đặt lịch làm **đúng đặc tả CN-03** trong tài liệu yêu cầu:
   - Kiểm tra dữ liệu ở cả client và **server** (Server Action). Server là chốt chặn cuối.
   - Số điện thoại: chuẩn hóa (bỏ khoảng trắng, dấu chấm, gạch ngang) rồi khớp `^(0|\+84)(3|5|7|8|9)\d{8}$`.
   - Có honeypot chống spam. Khóa nút khi đang gửi.
   - Có đủ các trạng thái: đang gửi / thành công / lỗi. Khi lỗi, đưa số hotline cho khách.
   - Thu tối thiểu dữ liệu cá nhân. Không bắt khách khai bệnh lý. Hiển thị dòng thông báo mục đích sử dụng dữ liệu.
   - Không hứa thời gian gọi lại cụ thể.
4. Chừng nào chưa chốt nơi nhận dữ liệu form (Q-09), Server Action chỉ kiểm tra dữ liệu, code phải có `TODO(booking-destination)`, và ghi chú gửi sale phải nói rõ form **chưa gửi dữ liệu đi đâu**. Không được làm form trông như đang hoạt động thật trong bản chính thức.
5. **Không làm** khi chưa có yêu cầu: giỏ hàng, thanh toán, tài khoản, blog, chatbot, đa ngôn ngữ, trang quản trị, bảng giá, đội ngũ bác sĩ, đánh giá khách hàng.

## 5. Kỹ thuật

**Stack:** Next.js 16.4 (App Router, `cacheComponents` và `partialPrefetching` đang bật), React 19.3, antd 6 + `@ant-design/nextjs-registry`, Tailwind CSS 4 (cấu hình trong CSS, không có `tailwind.config.js`), TypeScript strict. Trình quản lý gói: **npm**, vì repo có `package-lock.json`. Không dùng yarn hay pnpm.

1. **Mặc định là Server Component.** Chỉ thêm `'use client'` cho component lá cần tương tác (form, menu mobile, Drawer, carousel). **Không** đặt `'use client'` ở `page.tsx` hay `layout.tsx`.
2. Theo đúng mô hình Cache Components (`node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`):
   - Dữ liệu không cache thì bọc trong `<Suspense>`.
   - `params` và `searchParams` là Promise. Gõ kiểu bằng helper `PageProps<'/route'>` và `LayoutProps<'/route'>`.
3. Middleware đã đổi tên thành **`proxy.ts`** từ Next 16. Không tạo `middleware.ts`.
4. `next/image`: prop `priority` đã deprecated. Ảnh hero dùng `loading="eager"` hoặc `fetchPriority="high"`. Ảnh khác để lazy và có `sizes` hợp lý.
5. Metadata: dùng `export const metadata` hoặc `generateMetadata` trong Server Component. Root layout có `title.template`. Mọi giá trị lấy từ `lib/site-config.ts`.
6. antd:
   - Một component client `Providers` bọc `AntdRegistry` (truyền prop `layer` để khớp với `@layer theme, base, antd, components, utilities` trong `globals.css`) và `ConfigProvider` (`locale={viVN}`, `theme` lấy từ `lib/theme.ts`).
   - dayjs dùng locale `vi`.
   - Bố cục tĩnh dùng HTML ngữ nghĩa + Tailwind. antd chỉ dùng cho widget tương tác (Form, Select, DatePicker, Drawer, message).
7. Dữ liệu tập trung một chỗ:
   - `lib/site-config.ts`: tên, SĐT, Zalo, địa chỉ, Facebook, Google Maps, tọa độ.
   - `lib/services.ts`: 5 dịch vụ (slug, tên, mô tả, ảnh).
   - **Cấm gõ cứng** SĐT, địa chỉ hay link trong component.
8. JSON-LD (`@type: "Dentist"`) render bằng `<script type="application/ld+json">` và escape `<` theo `02-guides/json-ld.md`. Không đưa `openingHours`, `priceRange`, `aggregateRating` khi chưa có dữ liệu thật.
9. TypeScript strict. Không dùng `any`, không dùng `@ts-ignore`, không `eslint-disable` nếu không có lý do ghi rõ ở comment cùng dòng.
10. **Không thêm dependency** nếu chưa nêu lý do. Ưu tiên thứ đã có sẵn. Cần icon thì khai báo `@ant-design/icons` trong `package.json`, không import gói phụ thuộc gián tiếp. Cần thư viện validate thì có thể thêm `zod`.
11. Không commit `.env*`. Secret (API key, webhook) chỉ đọc ở server, không dùng tiền tố `NEXT_PUBLIC_`.

### Cấu trúc thư mục

```
app/
  layout.tsx          # Root layout: lang="vi", font, metadata mặc định, <Providers>
  page.tsx            # Trang chủ (Server Component), chỉ ghép các section
  globals.css         # Tailwind + @theme (design token)
  actions/booking.ts  # Server Action form đặt lịch ('use server')
components/
  layout/             # Header, Footer, MobileContactBar, Providers
  sections/           # HeroSection, WhyUsSection, ServicesSection, AudienceSection,
                      # ProcessSection, BookingSection, ContactSection
  ui/                 # Component nhỏ dùng lại nhiều nơi
lib/
  site-config.ts      # Thông tin doanh nghiệp (nguồn duy nhất)
  services.ts         # Dữ liệu 5 dịch vụ
  theme.ts            # Token antd (khớp với @theme trong globals.css)
  validation/         # Schema và hàm kiểm tra dữ liệu form dùng chung client và server
public/images/
  brand/              # Logo, favicon gốc
  services/           # Ảnh 5 dịch vụ
  clinic/             # Ảnh phòng khám
docs/
  YEU-CAU-DU-AN.md    # Tài liệu yêu cầu (nguồn thông tin gốc)
```

### Quy ước đặt tên

- File component đặt kiểu `PascalCase.tsx`, mỗi file một component chính.
- File trong `lib/` đặt kiểu `kebab-case.ts`.
- Route URL viết tiếng Việt không dấu, kebab-case, ví dụ `/dich-vu/cay-ghep-implant`.
- `id` anchor của section viết tiếng Việt không dấu, kebab-case, đúng như bảng ở mục 10 của tài liệu yêu cầu.

## 6. Quy trình làm việc

1. **Có thông tin mới từ sale hoặc khách:** cập nhật `docs/YEU-CAU-DU-AN.md` trước (sửa mục liên quan, cập nhật mục 13, thêm dòng vào lịch sử thay đổi), rồi mới sửa code.
2. **Tính năng hoặc section chưa có trong tài liệu yêu cầu:** hỏi lại trước khi làm. Nếu được đồng ý thì thêm vào tài liệu với nhãn [ĐỀ XUẤT].
3. **Trước khi báo xong một việc:**
   - Chạy `npm run lint` và `npm run build`. Cả hai phải sạch lỗi.
   - Kiểm tra giao diện ở 360px và desktop.
   - Báo lại các mã yêu cầu đã đụng tới (ví dụ CN-03, GD-01) và các thông tin [THIẾU] gặp phải.
4. **Trước khi chọn "Xong - chờ sale gửi" trên phiếu:** mọi ô trong mục 14 (Definition of Done) của tài liệu yêu cầu phải đã ✅. Dev điền đủ các ô vàng: Dev phụ trách, Trạng thái demo, Link demo.
5. Không tự ý sửa file quy tắc này. Chỉ sửa khi người dùng yêu cầu.

## 7. Hiện trạng repo cần dọn (rác từ dự án cũ)

Repo được tạo từ khung của một dự án homestay. Các mục dưới đây **phải xử lý** trước hoặc trong lúc dựng demo:

| File | Vấn đề | Cách xử lý |
|---|---|---|
| [app/layout.tsx](app/layout.tsx) | `title: "Booking Homestay"`, `description: "Generated by create next app"`, `lang="en"`, Geist chỉ nạp subset `latin` | Metadata theo KT-10, `lang="vi"`, font có subset `vietnamese` |
| [app/globals.css](app/globals.css) | `font-family: Arial` ghi đè font; `border-color: #EFE8DC` và `.glass-panel` màu be; biến dark mode; `data-reveal` chưa có JS | Xóa phần thừa, khai báo token theo GD-01, quyết định giữ hay bỏ `data-reveal` |
| [app/page.tsx](app/page.tsx) | Toàn trang để `'use client'`, nội dung giữ chỗ `h-500` | Viết lại thành Server Component ghép các section |
| [public/images/mainlogo-img1.jpg](public/images/mainlogo-img1.jpg) | Logo homestay | Xóa, thay bằng logo T-Smile trong `public/images/brand/` |
| [app/favicon.ico](app/favicon.ico) | Không phải của T-Smile | Thay bằng icon từ logo T-Smile |
| `public/*.svg` (next, vercel, file, globe, window) | Asset mẫu của create-next-app | Xóa nếu không dùng |
| [README.md](README.md) | README mẫu của create-next-app | Viết lại ngắn gọn: dự án gì, cách chạy, link tới `docs/` |
| `AntdRegistry` trong layout | Thiếu prop `layer` trong khi CSS đã khai báo `@layer antd` | Thêm `layer` (xem mục 5.6) |
