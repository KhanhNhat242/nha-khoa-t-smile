# Tài liệu yêu cầu: Website Nha khoa T-Smile Ninh Bình

| | |
|---|---|
| **Nguồn** | Phiếu Dev 50 – NHA KHOA T-Smile Ninh Bình (sale ghi, ngày giao hồ sơ 30/10/2026) |
| **Phiên bản** | 1.15, cập nhật ngày 02/11/2026 (tạo bản 1.0 cùng ngày) |
| **Vai trò** | Đây là **nguồn thông tin gốc (source of truth)** cho mọi việc trong repo. Code, nội dung và giao diện phải khớp với tài liệu này. Có thông tin mới thì cập nhật tài liệu này trước (xem mục 15), rồi mới sửa code. |

## Cách đọc nhãn

Mỗi yêu cầu được gắn một nhãn cho biết nó đến từ đâu:

| Nhãn | Ý nghĩa | Được phép làm gì |
|---|---|---|
| **[PHIẾU]** | Chép nguyên văn từ phiếu | Dùng trực tiếp. Không sửa ý. |
| **[SUY RA]** | Suy ra thẳng từ dữ liệu trong phiếu, không thêm sự kiện mới | Dùng được. |
| **[ĐỀ XUẤT]** | Đề xuất của dev, phiếu không yêu cầu | Dùng cho demo được, nhưng phải để sale/khách xác nhận. |
| **[THIẾU]** | Phiếu không có thông tin | **Không được bịa.** Bỏ qua, hoặc dùng câu trung tính không khẳng định sự kiện, rồi ghi vào mục 13. |

Mã yêu cầu: `ND-xx` nội dung, `GD-xx` giao diện, `CN-xx` chức năng, `KT-xx` kỹ thuật, `Q-xx` câu hỏi mở.

---

## 1. Thông tin quản lý phiếu (nội bộ, KHÔNG đưa lên website)

| Trường | Giá trị | Ghi chú |
|---|---|---|
| STT | 50 | |
| Ngày giao hồ sơ * | 30/10/2026 | |
| Sale phụ trách * | Mỹ Tuyền | |
| Mã DN (file sale) | DN0136 | |
| ✏ Dev phụ trách | *(trống, dev điền)* | Ô vàng |
| ✏ Trạng thái demo | *(trống, dev điền)* | Ô vàng |
| ✏ Link demo | *(trống, dev điền)* | Ô vàng |
| ✏ Trạng thái gửi sale | *(trống)* | Ô vàng, xem Q-11 |
| Ưu tiên (GĐ chọn) | *(trống)* | Giám đốc chọn |
| Hạn giao demo | *(trống)* | Phiếu nhắc: **"SALE GHI HẠN"** |
| Ngày gửi khách | *(trống)* | |
| Phản hồi của khách | *(trống)* | |

**Quy trình phiếu [PHIẾU]:** "Dev điền 3 ô vàng. Chọn *Xong - chờ sale gửi* thì phiếu này tự đóng."
Dev chỉ được chọn "Xong - chờ sale gửi" khi đã đạt **toàn bộ** tiêu chí ở mục 14.

---

## 2. Thông tin doanh nghiệp [PHIẾU]

| Trường | Giá trị (nguyên văn) | Hiển thị trên web? |
|---|---|---|
| Tên doanh nghiệp * | NHA KHOA T-Smile Ninh Bình | Có (dạng chuẩn ở ND-01) |
| Ngành | Nha khoa / Y tế / Phòng khám | Không (dùng cho SEO/schema) |
| Tỉnh / TP | Ninh bình | Viết đúng là "Ninh Bình" |
| Người liên hệ | Đinh Thị Thu Thuỷ | **KHÔNG** (thông tin nội bộ, xem Q-12) |
| SĐT / Zalo * | 0985329550 | Có |
| Hotline (trong nội dung sẵn có) | 0985 329 550 | Có (trùng số với SĐT/Zalo) |
| Địa chỉ (trong nội dung sẵn có) | 263 Nguyễn Công Trứ, Phường Hoa Lư, Tỉnh Ninh Bình | Có |
| Link Facebook Page | https://www.facebook.com/tsmilenb | Có |
| Link Google Maps | https://maps.app.goo.gl/g3n3QTC6dV2d64oz7 | Có (nút "Chỉ đường") |
| Website hiện tại | *(trống)*, khách chưa có website | |
| Khách đồng ý xem demo? * | *(trống, trường bắt buộc chưa điền)* | Xem Q-01 |

**Dữ liệu suy ra từ link Google Maps [SUY RA]** (link rút gọn chuyển hướng tới):
- Tên địa điểm trên Maps: **"Nha khoa T Smile"**
- Tọa độ: **20.2473248, 105.9850686**
- Place ID: `0x313671002e75afbf:0xf5e442142e574a08`

### ND-01: Tên thương hiệu chuẩn

Phiếu đang dùng 3 cách viết khác nhau: **"T-Smile"** (tên DN, tiêu đề phiếu), **"TSmile"** (nội dung sẵn có) và **"T Smile"** (Google Maps).

- **Quy ước tạm [ĐỀ XUẤT]:** tên ngắn **"Nha khoa T-Smile"**, tên đầy đủ **"Nha khoa T-Smile Ninh Bình"** (lấy theo trường bắt buộc "Tên doanh nghiệp").
- Khi có logo thật thì chốt lại theo cách viết trên logo (Q-08).
- Tên chỉ được khai báo **một lần** trong file cấu hình (xem KT-03). Không viết lẫn lộn các dạng khác.
- Khi trích nguyên văn nội dung sẵn có, đổi "TSmile" sang tên chuẩn, các chữ khác giữ nguyên.

### ND-02: Định dạng thông tin liên hệ [SUY RA]

| Thông tin | Hiển thị | Dùng trong code |
|---|---|---|
| Số điện thoại | `0985 329 550` | `href="tel:0985329550"`; schema: `+84985329550` |
| Zalo | "Chat Zalo" | `https://zalo.me/0985329550` |
| Facebook | "Facebook" / icon | `https://www.facebook.com/tsmilenb` |
| Địa chỉ | `263 Nguyễn Công Trứ, Phường Hoa Lư, Tỉnh Ninh Bình` | Giữ nguyên văn. Địa chỉ theo đơn vị hành chính mới (không có cấp quận/huyện), **không** tự thêm "TP. Ninh Bình" hay tên huyện cũ. |
| Chỉ đường | "Chỉ đường" | `https://maps.app.goo.gl/g3n3QTC6dV2d64oz7` |
| Bản đồ nhúng | iframe | `https://www.google.com/maps?q=20.2473248,105.9850686&z=17&output=embed` |

---

## 3. Mục tiêu website [PHIẾU]

> **Mục tiêu website \*:** Đặt lịch / nhận tư vấn

Hệ quả [SUY RA]: mọi quyết định thiết kế đều phải phục vụ **chuyển đổi thành lượt đặt lịch hoặc liên hệ tư vấn**:
- Nút **"Đặt lịch tư vấn"** luôn nằm trong tầm mắt: trên header, ngay màn hình đầu (hero), sau phần dịch vụ, và nổi cố định trên mobile.
- Gọi điện và Zalo phải bấm được ngay bằng 1 chạm trên điện thoại.
- Section nào không dẫn tới đặt lịch hoặc tạo niềm tin thì không cần có.

---

## 4. Dịch vụ chính [PHIẾU]

Phiếu ghi đúng 5 dịch vụ, giữ nguyên thứ tự này:

| # | Nguyên văn phiếu | Tên hiển thị chuẩn hóa [SUY RA] | Slug [ĐỀ XUẤT] | Mô tả ngắn [SUY RA từ mục 5 và 6] |
|---|---|---|---|---|
| 1 | PK RĂNG-HÀM -MẶT | Phòng khám Răng – Hàm – Mặt | `rang-ham-mat` | Khám và điều trị các vấn đề răng hàm mặt thường gặp như sâu răng, viêm nướu, nhổ răng khôn. |
| 2 | NHA KHOA THẨM MỸ | Nha khoa thẩm mỹ | `nha-khoa-tham-my` | Dành cho Quý khách quan tâm đến ngoại hình, mong muốn có nụ cười đẹp và tự tin. |
| 3 | NIỀNG RĂNG SỚM | Niềng răng sớm cho trẻ | `nieng-rang-som` | Niềng răng sớm cho trẻ 6–12 tuổi, giúp điều chỉnh hàm từ nhỏ. |
| 4 | CẤY GHÉP IMPLANT | Cấy ghép Implant | `cay-ghep-implant` | Phục hồi răng đã mất bằng cấy ghép Implant, giúp ăn nhai tốt hơn. |
| 5 | RĂNG SỨ CAO CẤP | Răng sứ cao cấp | `rang-su-cao-cap` | Giải pháp răng sứ thẩm mỹ cao cấp, được bác sĩ tư vấn kỹ trước khi thực hiện. |

- **ND-03:** Không thêm dịch vụ ngoài 5 mục trên (ví dụ tẩy trắng, nha chu, trám răng thẩm mỹ...) nếu khách chưa xác nhận.
- **ND-04:** Tiêu đề nội dung sẵn có nhấn mạnh 3 dịch vụ chủ lực: **Niềng răng, Cấy ghép Implant, Răng sứ thẩm mỹ**. Hero ưu tiên 3 dịch vụ này [SUY RA].
- Ghi chú: phiếu dùng cả "răng sứ cao cấp" (danh sách dịch vụ) và "răng sứ thẩm mỹ" (USP, tiêu đề). Tên dịch vụ dùng **"Răng sứ cao cấp"**, còn "răng sứ thẩm mỹ" được dùng trong câu văn.
- Thông tin chi tiết từng dịch vụ (quy trình riêng, thời gian, chi phí, vật liệu, bảo hành) là **[THIẾU]**. Không được bịa (Q-07).

---

## 5. Khách hàng mục tiêu [PHIẾU]

Nguyên văn phiếu:
1. Người lớn 25–55 tuổi cần khám và điều trị răng hàm mặt thông thường như sâu răng, viêm nướu, nhổ răng khôn
2. Người trẻ 20–35 tuổi quan tâm ngoại hình, muốn có nụ cười đẹp
3. Phụ huynh có con 6–12 tuổi muốn niềng răng sớm cho con để điều chỉnh hàm từ nhỏ
4. Người trung niên và cao tuổi 45–70 tuổi bị mất răng, cần cấy ghép Implant để ăn nhai tốt hơn.
5. Khách có thu nhập khá sẵn sàng chi cho răng sứ cao cấp và Implant

Ánh xạ nhóm khách sang dịch vụ [SUY RA]:

| Nhóm | Dịch vụ liên quan | Hệ quả cho nội dung và giao diện |
|---|---|---|
| 1. Người lớn 25–55 | Phòng khám Răng – Hàm – Mặt | Lời văn rõ ràng, thiết thực |
| 2. Người trẻ 20–35 | Nha khoa thẩm mỹ, Răng sứ cao cấp | Hình ảnh hiện đại, sáng sủa |
| 3. Phụ huynh có con 6–12 | Niềng răng sớm | Nhấn vào sự yên tâm và việc giải thích kỹ |
| 4. Trung niên, cao tuổi 45–70 | Cấy ghép Implant | **Chữ đủ lớn, độ tương phản cao, nút bấm to, số hotline nổi bật** |
| 5. Thu nhập khá | Răng sứ cao cấp, Implant | Giao diện chỉn chu, cao cấp, không rẻ tiền hay rối mắt |

- **ND-05:** Xưng hô [ĐỀ XUẤT]: phòng khám tự xưng **"Nha khoa T-Smile" / "chúng tôi"**, gọi người đọc là **"Quý khách"**. Hợp phong cách "Chuyên nghiệp" và nhóm khách 45–70 tuổi. Dùng thống nhất trên toàn site.

---

## 6. Điểm mạnh / khác biệt (USP) [PHIẾU]

Nguyên văn:
1. Bác sĩ Răng Hàm Mặt trực tiếp thăm khám, tư vấn và giải thích rõ từng bước
2. Dịch vụ đa dạng: răng sứ thẩm mỹ, cấy ghép Implant, niềng răng sớm cho trẻ
3. Tư vấn kỹ trước khi làm: kiểm tra khớp cắn, chụp phim, đánh giá xương, đưa phương án riêng cho từng người

**Cập nhật 02/11/2026 — người dùng cung cấp nội dung "Lý do khách hàng chọn T-Smile"** (nguyên văn, 4 ý):
1. Bác sĩ trực tiếp thăm khám, theo dõi và giải thích rõ ràng
2. Phòng khám sạch – vô khuẩn – trang thiết bị đầy đủ
3. Chi phí minh bạch, quy trình rõ ràng
4. Chăm sóc sau điều trị chu đáo

- **ND-06:** *(cập nhật 02/11/2026: section "Vì sao chọn" nay dùng đúng 4 ý ở trên, nguyên văn, theo chỉ đạo của người dùng; 3 USP của phiếu vẫn dùng cho Hero và Quy trình. Ý 2–4 chờ khách xác nhận, Q-19)* Bản cũ: Section "Vì sao chọn Nha khoa T-Smile" dùng đúng 3 USP này. Không thêm USP khác như "trang thiết bị hiện đại nhập khẩu", "bảo hành trọn đời", "không đau"... nếu khách chưa cung cấp.
- **ND-07:** Section "Quy trình thăm khám & tư vấn" [SUY RA từ USP 1 và 3]:
  1. Bác sĩ Răng Hàm Mặt trực tiếp thăm khám
  2. Kiểm tra khớp cắn, chụp phim, đánh giá xương
  3. Đưa phương án riêng cho từng người và giải thích rõ từng bước
  4. Thực hiện điều trị theo phương án đã thống nhất *(bước nối logic, khách chưa nêu, [ĐỀ XUẤT])*

---

## 7. Nội dung sẵn có [PHIẾU]

Nguyên văn (giữ cả emoji):

> 🦷 NHA KHOA TSMILE NIỀNG RĂNG, CẤY GHÉP IMPLANT & RĂNG SỨ THẨM MỸ
> Hãy đến với Nha Khoa TSmile – nơi kiến tạo nụ cười tự tin và bền vững cho hàng ngàn khách hàng.
> 📍 Địa chỉ: 263 Nguyễn Công Trứ, Phường Hoa Lư, Tỉnh Ninh Bình
> 📞 Hotline: 0985 329 550

Cách dùng:
- **ND-08 (Hero):** Tiêu đề lấy từ dòng 1: *"Nha khoa T-Smile – Niềng răng, Cấy ghép Implant & Răng sứ thẩm mỹ"*. Mô tả lấy từ dòng 2 (đổi tên thương hiệu theo ND-01).
- **ND-09:** "hàng ngàn khách hàng" là câu của khách. Được dùng đúng câu này, nhưng **không** đổi thành con số cụ thể (ví dụ "5.000+ khách hàng") và không làm bộ đếm số liệu.
- Giờ mở cửa, bảng giá, giới thiệu đội ngũ: phiếu **không có**, là [THIẾU] (Q-07).

---

## 8. Nhận diện thương hiệu và giao diện

### GD-01: Màu sắc [PHIẾU]

> **Màu chủ đạo / phong cách \*:** Xanh lá, Vàng, Trắng. Chuyên nghiệp.

Bảng màu **cập nhật 02/11/2026 theo chỉ đạo của người dùng** (xanh lá chủ đạo `#059669`, vàng nhấn `#F59E0B`, nền trắng, phản hồi thành công `#22C55E`). Các sắc đậm/nhạt cùng họ là [ĐỀ XUẤT] của dev để đạt tương phản KT-04:

| Token | Giá trị | Vai trò |
|---|---|---|
| `brand-green` (nhận diện) | `#059669` | Màu nhận diện: viền nhấn header, icon, khối trang trí, chữ cỡ lớn (≥ 24px đậm). **Không** dùng cho chữ thường hay nền nút có chữ: chữ trắng trên màu này chỉ đạt 3,77:1 |
| `brand-green-strong` | `#047857` | Nền nút đặt lịch, link, chữ xanh cỡ thường. Chữ trắng trên nền này 5,48:1 |
| `brand-green-dark` | `#065F46` | Hover nút, nền section đặt lịch, thẻ dịch vụ nổi bật, footer. Chữ trắng 7,68:1 |
| `brand-green-light` | `#ECFDF5` | Nền section xen kẽ |
| `brand-green-100` | `#D1FAE5` | Viền nhạt, nền icon. Chỉ trang trí |
| `brand-yellow` (nhấn) | `#F59E0B` | Huy hiệu, điểm nổi bật, nền nút phụ. **Chỉ làm nền đi với chữ `ink`** (6,83:1) hoặc trang trí/icon. Cấm làm màu chữ trên nền trắng (2,15:1) và trên nền xanh đậm (3,58:1) |
| `brand-yellow-light` | `#FEF3C7` | Nền nhạt cho badge, dải kêu gọi |
| `success` | `#22C55E` | Phản hồi thành công của form (icon, viền, nền nhạt). Không dùng làm màu chữ (2,28:1) |
| `ink` | `#1F2937` | Chữ thân bài |
| `ink-muted` | `#4B5563` | Chữ phụ (7,56:1 trên trắng) |
| `surface` | `#FFFFFF` | Nền chính |
| `line` | `#7C8C82` | Viền ô nhập liệu (≈ 3,5:1, đạt WCAG 1.4.11) |
| `danger` | `#B91C1C` | Chữ báo lỗi của form (≈ 6,5:1) |

- Màu xanh dương `#1E40AF` mặc định của phong cách Trust & Authority **không dùng**, thay bằng xanh lá cho đúng nhận diện.
- Tỉ lệ dùng màu [ĐỀ XUẤT]: khoảng 60% trắng, 30% xanh lá, 10% vàng.
- Bảng màu mặc định của Tailwind đã được tắt (`--color-*: initial`), nên trong code chỉ gọi được đúng các token ở bảng trên.
- **Chữ vàng trên nền trắng là cấm** vì tương phản quá thấp. Màu vàng chỉ làm nền (đi với chữ tối) hoặc chi tiết trang trí.
- Không dùng màu ngoài bảng này. Riêng màu be/nâu `#EFE8DC`, `rgba(255,253,249,…)` là **rác của dự án cũ** và phải xóa.

### GD-08: Bộ phong cách giao diện (người dùng chỉ định 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

Ba lớp: **Soft UI Evolution** cho hình ảnh tổng thể, **Trust & Authority** cho bố cục, **Accessible & Ethical** làm nền tiêu chuẩn; kết hợp **Flat Design**.
- Flat + Soft UI: màu phẳng, không gradient, không họa tiết chấm/lá, không làm mờ (blur). Bóng đổ mềm nhiều lớp rất nhẹ. Bo góc: thẻ 16px, nút/ô nhập 12px. Chuyển động 200–300ms, phản hồi bấm 80ms.
- Trust & Authority: hero nêu rõ uy tín (dòng 3 điểm tin cậy lấy từ USP), thanh thông tin trên cùng (địa chỉ, hotline, Facebook), rồi tới phần chứng minh (USP), giải pháp (dịch vụ, quy trình) và lời kêu gọi rõ ràng. **Không** dùng logo đối tác, chứng nhận, con số thống kê vì phiếu không có (Q-07).
- Ngắt dòng (người dùng yêu cầu 02/11/2026): không để một chữ đứng một mình ở dòng cuối. Tiêu đề dùng `text-wrap: balance` (các dòng dài gần bằng nhau), đoạn văn và mục danh sách dùng `text-wrap: pretty`; khai báo chung trong `globals.css` cho cả trang.
- Accessible & Ethical: chữ ≥ 16px, tương phản ≥ 4,5:1 (mục tiêu 7:1 cho chữ chính), vòng focus 3px, vùng chạm ≥ 44px, tôn trọng `prefers-reduced-motion`.
- *(Đã thay bằng GD-10)* Bento Box Grid cho 5 dịch vụ: 3 thẻ gọn ở hàng trên, 2 thẻ lớn nền xanh đậm cho **Cấy ghép Implant** và **Răng sứ cao cấp** ở hàng dưới. Giữ đúng thứ tự 1→5.
- Micro-interactions cho form: hiệu ứng nhấn nút, dấu kiểm xanh `#22C55E` khi ô hợp lệ, trạng thái đang gửi, thành công (dấu kiểm hiện dần), lỗi (khung rung nhẹ).
- Form theo hướng chuyển đổi: một nút CTA chính duy nhất, ô nhập cao 48px. Mẫu "Conversion-Optimized" đã được thay bằng "funnel-3-step-conversion" trong bộ dữ liệu thiết kế; mẫu này là thứ tự section (vấn đề → giải pháp → hành động), trang hiện tại đã theo thứ tự đó (Phù hợp với ai → Dịch vụ, Quy trình → Đặt lịch), nên form vẫn giữ **một bước** để ít bước nhất cho khách.

### GD-09: Bố cục "tài liệu phòng khám" (người dùng yêu cầu bỏ cảm giác rẻ tiền / giống AI, 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

- Bỏ khuôn lặp "tiêu đề căn giữa + lưới thẻ icon bằng nhau". Tiêu đề section canh trái trên lưới 12 cột: tiêu đề bên trái, đoạn mở đầu canh đáy bên phải. Không dùng nhãn nhỏ phía trên tiêu đề (người dùng tự bỏ).
- Nội dung dạng danh sách xếp thành hàng ngăn bằng đường kẻ mảnh thay cho hộp thẻ có viền (USP, nhóm khách hàng, thông tin liên hệ). Số thứ tự chỉ còn ở Quy trình ("Bước 1–4"), nơi thứ tự có ý nghĩa.
- Hero: chữ bên trái, ảnh phòng điều trị tràn mép phải; dải 3 điểm tin cậy ở đáy. Bỏ huy hiệu, nét gạch chân vẽ tay và thẻ ảnh nổi. Ảnh mẫu hàm sứ chuyển sang section "Vì sao chọn".
- Bỏ đường sóng chuyển section; các section nối nhau bằng mép thẳng và nền xen kẽ.
- Dải "Chưa rõ nên chọn dịch vụ nào?" và danh sách 3 cam kết ở section Đặt lịch: người dùng đã tự bỏ. Nút "Đặt lịch tư vấn" sau phần dịch vụ (mục 3) vẫn có trên từng thẻ dịch vụ.


### GD-10: Section Dịch vụ dạng chồng thẻ cuộn (người dùng yêu cầu 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

Thay cho bố cục Bento ở GD-08.
- Desktop (≥ 1024px): chia 2 cột. Cột trái cố định khi cuộn: tiêu đề, mô tả và danh sách tên 5 dịch vụ (đánh dấu dịch vụ đang hiển thị, bấm để chuyển tới). Cột phải: 5 thẻ xếp chồng lệch nhau như bộ bài. Khi cuộn trong phạm vi section, thẻ trên cùng trượt xuống rời đi, thẻ kế tiếp lên thay. Thứ tự 1→5 giữ nguyên.
- Thẻ: ảnh phủ toàn thẻ, tên dịch vụ, mô tả và nút "Đặt lịch tư vấn" nằm đè lên phần dưới ảnh. Lớp nền xanh đậm mờ dần dưới chữ để chữ trắng đạt tương phản (ngoại lệ có chủ đích với quy ước "không gradient" của GD-08).
- Mobile/tablet và khi người dùng bật giảm chuyển động: các thẻ xếp dọc bình thường, không có hiệu ứng cuộn.
- Bàn phím: thẻ không ở trên cùng bị loại khỏi thứ tự tab; người dùng chuyển thẻ bằng danh sách dịch vụ ở cột trái.

### GD-11: Section "Phù hợp với ai" dạng carousel lõm (người dùng yêu cầu 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

- Chia 2 phần trên/dưới. Phần trên: 5 nhóm khách (mục 5) là các thẻ đặt trên mặt trong một vòng cung bao quanh người xem (kiểu "Concave Carousel"); thẻ đang chọn nằm chính diện. Phần dưới: khối "Góc nhận biết nhanh" về răng khôn trải hết chiều ngang.
- Không dùng component Concave Carousel của React Bits Pro (trả phí, cần license và registry shadcn; dự án không dùng shadcn, quy tắc 5.10 hạn chế thêm dependency). Dev tự viết bằng CSS 3D, không thêm thư viện.
- Điều khiển: nút trước/sau, phím mũi tên, vuốt/kéo, bấm thẻ bên cạnh, hoặc tab bàn phím vào link trong thẻ. Có vùng thông báo cho trình đọc màn hình. Thứ tự DOM giữ 1→5.
- **Cập nhật 02/11/2026 (người dùng yêu cầu):** mỗi thẻ dùng 1 ảnh trong `public/images/audience/1–5` làm ảnh nền, chữ đè lên ảnh với lớp nền xanh đậm mờ dần để đủ tương phản. Khi cuộn trang trong phạm vi section, carousel tự xoay ngang lần lượt qua 5 thẻ (vùng cuộn dính, mọi kích thước màn hình); nút/chấm/phím/kéo chuyển trang bằng cách cuộn tới đúng vị trí. Bật giảm chuyển động thì chỉ điều khiển thủ công.
- Ảnh nền do người dùng cung cấp: (1) hình minh họa AI bác sĩ khám răng, có watermark AI ở góc (bị lớp chữ che); (2) hình minh họa AI người phụ nữ soi gương, có in chữ "T SMILE"/"TSMILE" sai cách viết chuẩn (dòng chữ ở đáy bị lớp chữ che); (3) ảnh thật bé trai niềng răng, thấy rõ mặt (Q-17); (4) ảnh thật ca cấy ghép, đáy ảnh lộ hộp vật liệu (bị lớp chữ che); (5) ảnh phòng điều trị (trùng ảnh hero). Alt của ảnh AI ghi là "hình minh họa".


### GD-02: Phong cách "Chuyên nghiệp" [PHIẾU, diễn giải SUY RA]
- Bố cục sạch, nhiều khoảng trắng, căn lưới rõ ràng, phân cấp chữ rõ ràng.
- Hiệu ứng nhẹ: fade/slide ngắn, tôn trọng `prefers-reduced-motion`. Không dùng hiệu ứng lòe loẹt, nhấp nháy hay chạy chữ.
- Hình ảnh thật của phòng khám được ưu tiên hơn ảnh minh họa.

### GD-03: Logo [PHIẾU]
- Nguồn: https://drive.google.com/drive/folders/1yVNGQCj7xbtrTBMhaYdZ0qn6lIcML_gx?usp=drive_link
  *(chuỗi ID được chép từ PDF. Nếu link lỗi, kiểm tra lại các ký tự dễ nhầm như `l`/`I` trong `qn6lIcML` bằng cách copy từ sheet gốc.)*
- Chỉ dùng logo khách gửi. Không vẽ lại, không đổi màu, không kéo méo tỉ lệ.
- ⚠ File `public/images/mainlogo-img1.jpg` đang có trong repo là **logo homestay** (cây thông, ngôi nhà) của dự án khác, **không phải** logo T-Smile. Cấm dùng, phải thay.
- **Cập nhật 02/11/2026:** đã có logo do người dùng đưa vào repo (file gốc `main-logo.jpg`, 1024×1024, nền xanh đen, chữ vàng "T-SMILE / NHA KHOA CAO CẤP / 263 NGUYỄN CÔNG TRỨ"). Cách dùng trên web, không vẽ lại và không đổi màu:
  - `public/images/brand/logo-t-smile.jpg`: cắt bớt 80px viền ngoài để bỏ dấu watermark hình ngôi sao ở góc phải dưới. Nội dung logo giữ nguyên. Dùng ở footer.
  - `public/images/brand/logo-mark.jpg`: cắt riêng biểu tượng chiếc răng. Dùng ở header (cạnh tên "Nha khoa T-Smile" viết bằng chữ HTML), làm favicon (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) và ảnh OG (`app/opengraph-image.jpg`).
  - Logo có dấu watermark của công cụ tạo ảnh AI. Cần xin khách file logo gốc chất lượng cao, tốt nhất là file vector (Q-14).

### GD-12: Hero ảnh nền tràn màn hình (người dùng yêu cầu 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

- Thay bố cục hero ở GD-09: ảnh phòng điều trị `hero-banner.jpg` phủ kín section (cao đúng một màn hình trừ header), lớp phủ xanh đậm chuyển dần từ mép trái sang trong suốt, và đậm hơn ở đáy.
- Tiêu đề, mô tả, nút "Đặt lịch tư vấn" (nút trắng bo tròn) và link hotline nằm góc dưới bên trái, chữ trắng.
- Thẻ nổi góc dưới bên phải (từ 768px trở lên): hàng 3 biểu tượng và 3 điểm tin cậy lấy từ USP 1 và 3 [SUY RA]. **Không** dùng con số khách hàng hay ảnh đại diện khách như mẫu tham khảo (ND-09, Q-07).
- Ngoại lệ so với GD-08 (chỉ riêng hero): cho phép lớp phủ gradient và nền thẻ mờ (backdrop blur), vì chữ trắng cần lớp nền đậm trên ảnh để đủ tương phản. Phần nền ngay sau chữ phải giữ ≥ 4,5:1.
- Tiêu đề hero có hiệu ứng "chữ nổi" (người dùng yêu cầu theo mẫu Rising Ink của React Bits Pro; bản Pro trả phí nên tự viết, không thêm thư viện): chữ nằm yên trên trang, các chữ gần con trỏ chuột / ngón tay nhấc lên theo chiều 3D và đổ bóng, rời con trỏ thì hạ xuống từ từ. Trình đọc màn hình đọc nguyên câu tiêu đề; bật giảm chuyển động (`prefers-reduced-motion`) thì không có hiệu ứng.

### GD-13: Section "Vì sao chọn" dạng giới thiệu 2 cột (người dùng yêu cầu 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

- Nền trắng (xen kẽ với section Dịch vụ nền xanh nhạt ngay bên dưới). Cột trái: tiêu đề, câu mở đầu, lưới 2×2 ngăn bằng vạch vàng mảnh phía trên mỗi ô. Cột phải: ảnh `about-us.jpg` bo góc, cao bằng cột chữ (desktop).
- Mẫu tham khảo dùng con số thống kê ("50+ năm", "100+ dự án"…). Phiếu **không có** số liệu (Q-07), nên 4 ô là 4 lý do người dùng cung cấp (ND-06, cập nhật 02/11/2026), mỗi ô có dấu kiểm; nút "Đặt lịch tư vấn" và hotline chuyển xuống dưới lưới.
- Không dùng nhãn nhỏ phía trên tiêu đề (giữ theo GD-09).
- Ảnh `about-us.jpg` có chữ in sẵn "NHA KHOA TSMILE" (sai cách viết tên, mục 2.1) và dấu watermark góc dưới phải, nên chỉ hiển thị phần giữa ảnh (mẫu hàm sứ trên bàn đá), cắt bỏ dòng chữ và watermark (Q-18).

### GD-14: Section Quy trình dạng thanh tiến trình 4 bước (người dùng yêu cầu 02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

- Desktop (≥ 1024px): hàng trên là thanh tiến trình — 4 vòng tròn biểu tượng nối bằng một thanh ngang, tên bước nằm dưới vòng tròn. Hàng dưới là 4 thẻ nội dung tương ứng trong một khung nền nhạt.
- Rê chuột (hoặc focus bàn phím, chạm trên màn hình cảm ứng) vào bước N: thanh màu xanh chạy từ bước 1 tới bước N; các bước trước N hiện dấu kiểm, bước N nổi bật (vòng tròn xanh đậm, thẻ viền xanh), các bước sau ở trạng thái chờ (vòng tròn xám, thẻ viền nét đứt). Khi chưa rê chuột (và khi rời chuột khỏi khối), không bước nào active: cả 4 bước ở trạng thái chờ, thanh trống.
- Chữ trong thẻ ở trạng thái chờ vẫn giữ tương phản ≥ 4,5:1 (chỉ đổi viền và nền, không làm mờ chữ).
- Thẻ bước 2 có ảnh nhỏ phim CT (`clinic/chup-phim-ct.jpg`); thẻ bước 4 có nút "Đặt lịch tư vấn". Bỏ ảnh lớn và chú thích ảnh cũ.
- Dưới 1024px: ẩn thanh tiến trình, các thẻ xếp 1–2 cột, mỗi thẻ có số bước và biểu tượng riêng.
- `prefers-reduced-motion`: đổi trạng thái tức thì, không chạy thanh.

### GD-15: Hiệu ứng hiện khi cuộn cho mọi section (người dùng yêu cầu 02/11/2026, dùng bộ CSS người dùng cung cấp) [ĐỀ XUẤT, người dùng duyệt]

- Kiểu hiệu ứng khai báo bằng `data-reveal`: để trống (chỉ hiện dần), `up`, `left`, `right`, `flip`, `grow-x`, `grow-c`, `blur`; ảnh trong khối có class `reveal-zoom` thì phóng to rồi lắng về đúng cỡ. Hiện trong 1s; độ trễ so le bằng `--reveal-delay`.
- **Chạy lại mỗi lần cuộn tới:** khối cuộn vào màn hình (lên hoặc xuống) thì hiện; ra **hẳn** khỏi màn hình thì ẩn lại (ẩn nhanh 0,35s) để lần sau cuộn tới lại chạy.
- Phân bổ: Hero (đoạn mô tả và nút; **không** áp cho tiêu đề và ảnh nền vì là phần tử LCP), Vì sao chọn (tiêu đề từ trái, 4 ô trượt lên so le, ảnh từ phải + phóng nhẹ), Dịch vụ (tiêu đề từ trái, chồng thẻ trượt lên), Phù hợp với ai (hiện dần — không dùng transform/blur vì làm hỏng carousel 3D), Quy trình (tiêu đề mờ nét → rõ, khối bước trượt lên), Đặt lịch (cột trái từ trái, form từ phải), Liên hệ (tiêu đề trượt lên, thông tin từ trái, bản đồ từ phải).
- Chống thanh cuộn ngang khi phần tử trượt từ hai bên: `main` có `overflow-x: clip` (không ảnh hưởng phần dính `sticky`).
- Không có JavaScript hoặc bật giảm chuyển động: mọi khối hiện ngay, không hiệu ứng. Không dùng các class `deco-float`, `lightbox-fade` trong bộ CSS gốc vì trang không có hoạ tiết bồng bềnh hay bộ sưu tập ảnh.

### GD-04: Ảnh và tư liệu [PHIẾU]
- Nguồn: https://drive.google.com/drive/folders/1dpfSpcmbee_e0mMXOoXe2QLemSDSHp4n?usp=drive_link
- Chỉ dùng ảnh khách cung cấp. Nếu buộc phải dùng ảnh minh họa cho demo thì ảnh phải có giấy phép miễn phí, phải ghi nguồn vào mục 13, và **không** được trình bày như thể đó là bác sĩ, bệnh nhân hay cơ sở thật của T-Smile.
- Không dùng ảnh "trước/sau" khi khách chưa cung cấp.
- **Cập nhật 02/11/2026:** người dùng đã đưa 38 ảnh và 2 video của khách vào repo. Ảnh gốc được chuyển từ `public/images/library/` sang `assets/library/` để **không bị public khi deploy**, vì có ảnh lộ thông tin bệnh nhân. Ảnh đang dùng trên web (cắt từ ảnh gốc, bỏ chữ/banner chèn sẵn, giữ nguyên màu):

| File trên web | Ảnh gốc (`assets/library/`) | Dùng ở |
|---|---|---|
| `hero-banner.jpg` | Người dùng đưa vào 02/11/2026 (cùng phòng điều trị với `598254122_…`, bản lớn 1276×956) | Hero, ảnh nền (GD-12) |
| `about-us.jpg` | Người dùng đưa vào (440×590, có chữ "NHA KHOA TSMILE" và watermark, nghi ảnh tạo bằng AI) | Section Vì sao chọn (GD-13), chỉ hiện phần giữa ảnh |
| `clinic/phong-dieu-tri.jpg` | `598254122_…` (phòng điều trị, ghế nha, màn hình X-quang) | Ảnh OG |
| `clinic/mau-ham-rang-su.jpg` | `597696843_…` (mẫu hàm sứ trên bàn đá; bỏ dòng chữ phía trên) | Hero (thẻ ảnh nổi) |
| `clinic/chup-phim-ct.jpg` | `585341266_…` (màn hình phim CT, khách chụp phim; bỏ khung chữ trên và dưới) | Section Quy trình |
| `services/rang-ham-mat.jpg` | `586033401_…` (phim X-quang toàn hàm) | Dịch vụ 1 |
| `services/nha-khoa-tham-my.jpg` | `Niềng răng/646101572_…` (dãy răng sứ trên mẫu hàm) | Dịch vụ 2 |
| `services/nieng-rang-som.jpg` | `Niềng răng/597387672_…` (phim phân tích sọ nghiêng; bỏ nhãn chữ) | Dịch vụ 3 |
| `services/cay-ghep-implant.jpg` | `CẤY GHÉP IMPLANT/645324274_…` (hình minh họa trụ Implant; bỏ banner "IMPLANT NGAY!") | Dịch vụ 4 |
| `services/rang-su-cao-cap.jpg` | `Niềng răng/649818499_…` (mẫu răng sứ cầm trên tay) | Dịch vụ 5 |

- Ảnh **không dùng** và lý do:
  - Phim X-quang có in họ tên, ngày sinh bệnh nhân (`nhổ răng/839725192_…`, `nhổ răng/840765138_…`, `nhổ răng/801786117_…`): lộ thông tin bệnh nhân.
  - Ảnh có tên và ảnh bác sĩ (`596464679_…`, `586715932_…`): mục 10 cấm section đội ngũ bác sĩ khi chưa có xác nhận; tên trên ảnh trùng tên người liên hệ (Q-12).
  - Ảnh trước/sau (`làm sạch cao răng/*`, `răng sứ/646566280_…`): GD-04.
  - Ảnh chụp cận trong miệng, banh miệng, ảnh trẻ em (`Niềng răng/644230233_…`, `644969031_…`, `645424180_…`, `645597674_…`, `605860382_…`), ảnh phẫu thuật có lộ nhãn hiệu vật liệu (`CẤY GHÉP IMPLANT/812697581_…`, `864951584_…`): dễ gây e ngại và quảng bá thương hiệu vật liệu chưa được xác nhận.
  - Infographic có số liệu chưa kiểm chứng ("90% chúng ta đang hiểu lầm", "35% người sinh ra…"): chỉ lấy ý phân loại răng khôn, bỏ con số (xem GD-07).
- Chất lượng ảnh: mọi ảnh khách gửi chỉ rộng tối đa 590px (ảnh tải lại từ Facebook). Trên màn hình lớn hoặc màn hình độ phân giải cao, ảnh sẽ hơi mờ. Cần xin ảnh gốc (Q-15).
- Ảnh trang trí do dev tạo bằng code (SVG/CSS: họa tiết lá, chấm, hình răng minh họa) không phải ảnh chụp, nên không bị trình bày như ảnh thật của phòng khám.

### GD-07: Bố cục chi tiết theo bản mô tả giao diện của người dùng (02/11/2026) [ĐỀ XUẤT, người dùng duyệt]

> Phần phong cách hình ảnh (màu, họa tiết, bóng đổ, bố cục thẻ dịch vụ) đã được thay bằng GD-08. Khoảng cách, thứ tự và nền xen kẽ của các section vẫn giữ theo mục này.

- **Khoảng cách:** padding dọc section `py-14` (mobile) / `lg:py-24`; tiêu đề cách nội dung `mb-8` / `lg:mb-14`; khoảng cách giữa các thẻ `gap-5` / `lg:gap-8`; padding trong thẻ `p-6` / `lg:p-8`; đoạn mở đầu rộng tối đa `max-w-2xl`.
- **Nền xen kẽ:** Hero (xanh lá nhạt pha trắng) → Vì sao chọn (trắng) → Dịch vụ (xanh lá nhạt) → Phù hợp với ai (trắng) → Quy trình (xanh lá nhạt) → Đặt lịch (xanh lá đậm) → Liên hệ (trắng) → Footer (xanh lá đậm).
- **Hero:** cao vừa một màn hình trên desktop. Chữ 55% bên trái, cụm ảnh 45% bên phải (ảnh phòng điều trị + thẻ ảnh mẫu hàm sứ nổi). Badge nền vàng chữ tối.
- **Dịch vụ:** lưới 6 cột trên desktop. 3 thẻ đầu mỗi thẻ 2 cột, 2 thẻ cuối mỗi thẻ 3 cột, giữ đúng thứ tự mục 4. Bấm "Đặt lịch tư vấn" trên thẻ thì cuộn tới form và chọn sẵn dịch vụ đó.
- **Phù hợp với ai:** 5 nhóm khách (mục 5), mỗi nhóm gắn link tới dịch vụ liên quan. Bên cạnh là khối **"Góc nhận biết nhanh: răng khôn của Quý khách thuộc kiểu nào?"**, lấy ý từ ảnh khách đăng (`585378209_…`) gồm 4 kiểu: mọc nằm ngang, mọc lấp ló, mọc ngầm, mọc thẳng. Đã bỏ con số "90%" và lời văn kiểu mạng xã hội. Cần khách xác nhận nội dung.
- **Quy trình:** *(cập nhật theo GD-14)* thanh tiến trình 4 bước + 4 thẻ trên desktop, thẻ xếp cột trên mobile; ảnh phim CT nằm trong thẻ bước 2.
- **Hiệu ứng:** hiện dần và trượt nhẹ lên khi cuộn (`data-reveal`, có hook IntersectionObserver), thẻ nổi nhẹ khi rê chuột. Tắt toàn bộ khi người dùng bật `prefers-reduced-motion`.
- **Khác với bản mô tả ở 2 chỗ để giữ đúng quy tắc nội dung:** tiêu đề USP 2 dùng "Dịch vụ đa dạng" thay cho "Dịch vụ chuyên sâu, đa dạng" vì phiếu không nói "chuyên sâu"; badge hero dùng icon SVG chiếc răng thay emoji 🦷 để hiển thị giống nhau trên mọi máy.

### GD-05: Font chữ
- Font bắt buộc có subset `vietnamese`. Ví dụ dùng được: Be Vietnam Pro, Inter, Montserrat, Nunito, Lexend, Manrope, Roboto, Open Sans.
- **Cấm** Poppins và Lato vì không có subset tiếng Việt, dấu sẽ bị lệch font.
- Hiện trạng lỗi: layout chỉ nạp Geist với `subsets: ['latin']`, và `globals.css` lại ghi đè `font-family: Arial`. Cả hai phải sửa.

### GD-06: Ngôn ngữ [PHIẾU]
> **Ngôn ngữ:** Tiếng Việt

- Chỉ làm tiếng Việt, không làm đa ngôn ngữ. Thẻ `<html lang="vi">`.
- Toàn bộ chữ trên giao diện phải có dấu đầy đủ (kể cả label, placeholder, thông báo lỗi, `alt`, metadata).
- antd dùng locale `vi_VN`, dayjs dùng locale `vi`. Ngày hiển thị dạng `DD/MM/YYYY`.

---

## 9. Chức năng

> **Chức năng cần có [PHIẾU]:** Trang, Giới thiệu dịch vụ, đặt lịch tư vấn

Chữ "Trang" trong phiếu không rõ nghĩa: có thể là "Trang chủ" bị cắt, hoặc một trang landing (Q-06). Tài liệu này tạm hiểu là **Trang chủ / landing page**.

| Mã | Chức năng | Nguồn | Bắt buộc cho demo |
|---|---|---|---|
| CN-01 | Trang chủ (landing page) | [PHIẾU] "Trang" | ✅ |
| CN-02 | Giới thiệu 5 dịch vụ | [PHIẾU] | ✅ |
| CN-03 | Form đặt lịch tư vấn | [PHIẾU] | ✅ |
| CN-04 | Nút gọi hotline (`tel:`) | [SUY RA] mục tiêu "nhận tư vấn" + có SĐT | ✅ |
| CN-05 | Nút chat Zalo | [SUY RA] phiếu ghi "SĐT / Zalo" | ✅ |
| CN-06 | Bản đồ nhúng + nút "Chỉ đường" | [SUY RA] có link Google Maps; phòng khám địa phương | ✅ |
| CN-07 | Link Facebook Page | [SUY RA] có link FB | ✅ |
| CN-08 | Thanh liên hệ nổi trên mobile (Gọi, Zalo, Đặt lịch) | [ĐỀ XUẤT] | ✅ |
| CN-09 | Trang chi tiết từng dịch vụ `/dich-vu/[slug]` | [ĐỀ XUẤT] | ❌ (giai đoạn 2) |
| CN-10 | Gửi dữ liệu form về kênh thật (email, Sheet, Zalo OA...) | [THIẾU], xem Q-09 | ❌ (chờ chốt) |

**Không làm** nếu chưa có yêu cầu: giỏ hàng, thanh toán online, tài khoản người dùng, blog/tin tức, chat bot, đa ngôn ngữ, đăng nhập quản trị.

### CN-03: Đặc tả form "Đặt lịch tư vấn"

| Trường | Bắt buộc | Kiểu | Ràng buộc |
|---|---|---|---|
| Họ và tên | Có | text | 2–60 ký tự, sau khi bỏ khoảng trắng đầu/cuối |
| Số điện thoại | Có | tel | Số di động VN: bỏ khoảng trắng, dấu chấm, gạch ngang rồi khớp `^(0\|\+84)(3\|5\|7\|8\|9)\d{8}$` |
| Dịch vụ quan tâm | Không | select | 5 dịch vụ ở mục 4 + "Chưa rõ, cần bác sĩ tư vấn". Mặc định chọn sẵn nếu người dùng bấm từ thẻ dịch vụ. |
| Ngày mong muốn | Không | date | Không được trước hôm nay; hiển thị `DD/MM/YYYY` |
| Ghi chú | Không | textarea | Tối đa 500 ký tự |
| *(honeypot)* | — | hidden | Chống spam. Có giá trị thì server bỏ qua yêu cầu. |

- **Không** có ô khung giờ cho tới khi biết giờ mở cửa (Q-07).
- Kiểm tra dữ liệu ở **cả client lẫn server** (Server Action). Server là chốt chặn cuối.
- Thu tối thiểu dữ liệu cá nhân. Không bắt khách mô tả bệnh lý. Dưới nút gửi có dòng: *"Thông tin của Quý khách chỉ được dùng để liên hệ tư vấn và xác nhận lịch hẹn."*
- Khi gửi: khóa nút và hiện trạng thái đang gửi để không gửi trùng.
- Gửi thành công: *"Cảm ơn Quý khách! Nha khoa T-Smile sẽ liên hệ lại để xác nhận lịch hẹn."* **Không** hứa thời gian cụ thể ("trong 5 phút"...) vì phiếu không có thông tin này.
- Gửi lỗi: báo lỗi rõ ràng và đưa số hotline để khách gọi trực tiếp.
- Giai đoạn demo: chừng nào chưa chốt Q-09, Server Action chỉ kiểm tra dữ liệu và trả kết quả. Code phải đánh dấu `TODO(booking-destination)`, và ghi chú gửi sale phải nói rõ form demo **chưa gửi dữ liệu đi đâu**.

---

## 10. Cấu trúc trang (demo)

### Sitemap [ĐỀ XUẤT]
- `/`: Trang chủ dạng landing, gồm các section bên dưới, menu cuộn tới từng section qua anchor.
- Giai đoạn 2 (sau khi khách duyệt): `/dich-vu/[slug]` cho 5 dịch vụ.

### Thứ tự section trên trang chủ

| # | Section | `id` anchor | Nội dung | Nguồn |
|---|---|---|---|---|
| 1 | Header (dính trên cùng) | — | Logo, menu (Giới thiệu, Dịch vụ, Quy trình, Liên hệ), hotline, nút "Đặt lịch tư vấn". Trên mobile: nút menu mở Drawer + nút gọi. Drawer phủ **toàn chiều ngang** màn hình và **khóa cuộn trang** khi đang mở (người dùng yêu cầu 02/11/2026). | [SUY RA] |
| 2 | Hero | `trang-chu` | ND-08, nút "Đặt lịch tư vấn" và "Gọi 0985 329 550", ảnh phòng khám | [PHIẾU] |
| 3 | Vì sao chọn T-Smile | `gioi-thieu` | 4 lý do người dùng cung cấp (ND-06, cập nhật 02/11/2026) | Người dùng cung cấp, chờ khách xác nhận (Q-19) |
| 4 | Dịch vụ | `dich-vu` | 5 thẻ dịch vụ (mục 4), mỗi thẻ có nút "Đặt lịch tư vấn" chọn sẵn dịch vụ | [PHIẾU] |
| 5 | Phù hợp với ai | `khach-hang` | 4–5 nhóm khách (mục 5) gắn với dịch vụ, kèm khối "Góc nhận biết nhanh" về răng khôn (GD-07) | [PHIẾU] + [ĐỀ XUẤT] |
| 6 | Quy trình thăm khám & tư vấn | `quy-trinh` | ND-07 | [SUY RA] |
| 7 | Đặt lịch tư vấn | `dat-lich` | Form CN-03 + hotline, Zalo bên cạnh | [PHIẾU] |
| 8 | Liên hệ & bản đồ | `lien-he` | Địa chỉ, hotline, Zalo, Facebook, bản đồ nhúng, nút "Chỉ đường" | [PHIẾU] |
| 9 | Footer | — | Logo, tên đầy đủ, địa chỉ, hotline, Facebook, `© 2026 Nha khoa T-Smile Ninh Bình` | [SUY RA] |
| — | Thanh liên hệ nổi (mobile) | — | Gọi, Zalo, Đặt lịch | [ĐỀ XUẤT] |

**Section cấm làm khi chưa có dữ liệu thật từ khách:** Bảng giá, Đội ngũ bác sĩ (tên, ảnh, bằng cấp), Cảm nhận khách hàng/đánh giá, Ảnh trước/sau, Giờ mở cửa, Khuyến mãi, Chứng nhận/giấy phép, Con số thành tích.

---

## 11. SEO và hiển thị khi chia sẻ

- **KT-10:** Metadata mặc định [ĐỀ XUẤT]:
  - `title.default`: `Nha khoa T-Smile Ninh Bình – Niềng răng, Cấy ghép Implant & Răng sứ thẩm mỹ`
  - `title.template`: `%s | Nha khoa T-Smile Ninh Bình`
  - `description`: `Nha khoa T-Smile tại 263 Nguyễn Công Trứ, Phường Hoa Lư, Ninh Bình. Bác sĩ Răng Hàm Mặt trực tiếp thăm khám, tư vấn niềng răng sớm, cấy ghép Implant, răng sứ cao cấp. Hotline 0985 329 550.`
  - Open Graph: `locale: 'vi_VN'`, `siteName`, ảnh OG 1200×630 có logo và màu thương hiệu.
- **KT-11:** JSON-LD `@type: "Dentist"` gồm name, address (streetAddress "263 Nguyễn Công Trứ", addressLocality "Phường Hoa Lư", addressRegion "Ninh Bình", addressCountry "VN"), telephone `+84985329550`, geo (20.2473248, 105.9850686), sameAs [Facebook]. **Không** đưa `openingHours`, `priceRange` hay `aggregateRating` vào khi chưa có dữ liệu thật. Escape `<` khi `JSON.stringify` theo hướng dẫn trong docs Next.js (`02-guides/json-ld.md`).
- **KT-12:** `metadataBase`, `sitemap.ts`, `robots.ts`: làm khi đã có domain (Q-10).
- Favicon và icon: thay bằng logo T-Smile (file `app/favicon.ico` hiện tại không phải của T-Smile).

---

## 12. Yêu cầu phi chức năng

| Mã | Yêu cầu |
|---|---|
| KT-01 | **Ưu tiên mobile**, kiểm tra ở các bề rộng 360, 390, 768, 1024, 1280, 1440 px. Không có thanh cuộn ngang. |
| KT-02 | Hiệu năng [ĐỀ XUẤT]: Lighthouse trên mobile đạt Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90. LCP < 2,5s. |
| KT-03 | Toàn bộ thông tin doanh nghiệp (tên, SĐT, địa chỉ, link) nằm trong **một file cấu hình duy nhất**, component chỉ import, không gõ cứng. |
| KT-04 | Khả năng truy cập: tương phản ≥ 4.5:1 cho chữ thường; chữ thân bài ≥ 16px; vùng chạm ≥ 44×44px; mọi ảnh có `alt` tiếng Việt; form có label; dùng được bằng bàn phím. |
| KT-05 | Trình duyệt hỗ trợ: Chrome/Edge/Safari/Firefox 2 phiên bản gần nhất, Safari iOS 16+, Chrome Android, trình duyệt trong app Zalo và Facebook. |
| KT-06 | Ảnh dùng `next/image`, có kích thước hoặc `sizes` hợp lý. Chỉ ảnh hero được tải sớm (`loading="eager"` hoặc `fetchPriority="high"`); prop `priority` đã deprecated từ Next 16. |
| KT-07 | Iframe bản đồ dùng `loading="lazy"` và có `title`. |
| KT-08 | Link Demo phải mở được mà không cần đăng nhập. |
| KT-09 | Không có lỗi trong console, không có cảnh báo hydration. |

---

## 13. Thông tin còn thiếu / mâu thuẫn (câu hỏi cho sale)

| Mã | Câu hỏi | Ảnh hưởng | Trạng thái |
|---|---|---|---|
| Q-01 | Trường bắt buộc **"Khách đồng ý xem demo?"** đang trống | Có nên làm demo hay không | ⏳ Chờ sale |
| Q-02 | **Hạn giao demo** chưa có (phiếu nhắc "SALE GHI HẠN") | Lên kế hoạch | ⏳ Chờ sale |
| Q-03 | **Ưu tiên (GĐ chọn)** chưa có | Thứ tự làm | ⏳ Chờ GĐ |
| Q-04 | "Lưu ý / điều cần tránh" để trống | Có thể có điều khách không thích | ⏳ Chờ sale |
| Q-05 | "Website tham khảo khách thích" để trống | Định hướng giao diện | ⏳ Chờ sale |
| Q-06 | Chữ "Trang" trong mục Chức năng nghĩa là gì? | Phạm vi (landing hay nhiều trang) | ⏳ Đang tạm hiểu là landing |
| Q-07 | Giờ mở cửa, bảng giá, đội ngũ bác sĩ, số năm hoạt động, giấy phép hoạt động, chi tiết từng dịch vụ | Section bổ sung, ô khung giờ trong form, schema | ⏳ Chờ khách |
| Q-08 | Cách viết tên chuẩn: T-Smile / TSmile / T Smile? | ND-01 | ✅ Logo ghi "T-SMILE" (02/11/2026), giữ "Nha khoa T-Smile" |
| Q-09 | Dữ liệu form đặt lịch gửi về đâu? (email, Google Sheet, Zalo, Telegram...) | CN-10 | ⏳ Chờ sale/khách |
| Q-10 | Domain và hosting cho bản chính thức | KT-12 | ⏳ |
| Q-11 | Phiếu ghi "Dev điền 3 ô vàng" nhưng có 4 ô vàng. Ô "Trạng thái gửi sale" do ai điền? | Quy trình | ⏳ |
| Q-12 | Có hiển thị tên người liên hệ (Đinh Thị Thu Thuỷ) trên web không? Mặc định: **không** | Quyền riêng tư | Mặc định: không |
| Q-13 | Link Drive logo và ảnh có mở được không (quyền truy cập)? | GD-03, GD-04 | ✅ Người dùng đã đưa logo và ảnh vào repo (02/11/2026) |
| Q-14 | Xin khách file logo gốc chất lượng cao (vector/PNG nền trong). File hiện có là ảnh JPG 1024px, có watermark của công cụ tạo ảnh AI | GD-03, favicon, OG | ⏳ Chờ sale |
| Q-15 | Xin khách ảnh gốc độ phân giải cao (ảnh hiện có rộng tối đa 590px, tải lại từ Facebook), nhất là ảnh phòng khám | GD-04, chất lượng hero | ⏳ Chờ sale |
| Q-17 | Ảnh `audience/3` là ảnh thật một bé trai thấy rõ mặt (và yếm in tên). Khách đã có đồng ý của phụ huynh để dùng làm quảng cáo chưa? Nếu chưa, phải thay ảnh trước khi công khai | GD-11, quyền riêng tư | ⏳ Chờ sale |
| Q-18 | Ảnh `audience/1`, `audience/2`, `about-us.jpg` là ảnh tạo bằng AI (có watermark, chữ "T SMILE" sai cách viết). Khách có đồng ý dùng ảnh AI không, hay cung cấp ảnh thật? | GD-04, GD-11 | ⏳ Chờ sale |
| Q-19 | Section "Vì sao chọn" dùng 4 ý "Lý do khách hàng chọn T-Smile" do người dùng cung cấp 02/11/2026. Ý 2–4 ("phòng khám sạch – vô khuẩn – trang thiết bị đầy đủ", "chi phí minh bạch", "chăm sóc sau điều trị chu đáo") không có trong phiếu: khách đã xác nhận và chịu trách nhiệm nội dung này chưa? | ND-06, mục 1 quy tắc | ⏳ Chờ sale |
| Q-16 | Khách có đồng ý đưa khối "Góc nhận biết nhanh" về răng khôn (lấy ý từ bài đăng của khách) lên website không? | GD-07 | ⏳ Chờ sale |

**Danh sách nội dung tạm và placeholder đang có trong code:** *(dev cập nhật mỗi khi thêm hoặc gỡ)*

Mọi mục dưới đây được đánh dấu `TODO(content)` trong code và cần sale/khách xác nhận:
- `components/sections/WhyUsSection.tsx`: câu mở đầu section [ĐỀ XUẤT, SUY RA từ USP 1 và 3]; 4 lý do chờ khách xác nhận (Q-19).
- `components/sections/ServicesSection.tsx`: tiêu đề, câu mở đầu và dải kêu gọi "Chưa rõ nên chọn dịch vụ nào?" [ĐỀ XUẤT].
- `components/sections/AudienceSection.tsx`: tiêu đề, câu mở đầu; nhãn nhóm 5 "Quý khách có yêu cầu cao" (viết lại từ "Khách có thu nhập khá"); toàn bộ khối "Góc nhận biết nhanh" về răng khôn (Q-16).
- `components/sections/ProcessSection.tsx`: câu mở đầu; bước 4 [ĐỀ XUẤT theo ND-07].
- `components/sections/BookingSection.tsx`: lời mời đặt lịch bên trái form [ĐỀ XUẤT].
- `components/sections/ContactSection.tsx`: câu mở đầu section [ĐỀ XUẤT].
- `components/sections/HeroSection.tsx`: dòng 3 điểm tin cậy (Trust & Authority) lấy ý từ USP 1 và 3 [SUY RA].
- `components/layout/Header.tsx`: thanh thông tin trên cùng (địa chỉ, hotline, Facebook) [ĐỀ XUẤT, GD-08].
- `app/actions/booking.ts`: form chưa gửi dữ liệu đi đâu, có `TODO(booking-destination)` (Q-09). Sau khi gửi, giao diện hiện rõ dòng "bản demo, thông tin chưa được gửi tới phòng khám".

---

## 14. Tiêu chí nghiệm thu demo (Definition of Done)

Chỉ chọn trạng thái **"Xong - chờ sale gửi"** khi tất cả các mục dưới đây đã ✅:

**Dọn dự án cũ**
- [x] Không còn dấu vết dự án cũ. Lệnh sau phải không trả kết quả nào:
  `grep -rniE "homestay|create next app|EFE8DC|mainlogo-img1" app components lib`
- [x] `<html lang="vi">`; font có subset `vietnamese`; dấu tiếng Việt hiển thị đúng (ư ơ ạ ễ ỹ ặ).
- [x] Logo, favicon, ảnh OG là của T-Smile. *(Dùng logo khách gửi; nên thay bằng file gốc chất lượng cao, xem Q-14.)*

**Nội dung**
- [x] 5 dịch vụ đúng tên và đúng thứ tự (mục 4). 3 USP đúng (mục 6).
- [x] Thông tin liên hệ khớp 100% với phiếu: `0985 329 550`, `263 Nguyễn Công Trứ, Phường Hoa Lư, Tỉnh Ninh Bình`, Facebook, Google Maps.
- [x] Không có thông tin bịa (giá, bác sĩ, đánh giá, con số, giờ mở cửa). Mọi nội dung tạm đã ghi vào mục 13.
- [x] Không lộ thông tin nội bộ (STT, mã DN, tên sale, tên người liên hệ).

**Chức năng**
- [ ] Nút gọi, Zalo, Facebook, "Chỉ đường" chạy đúng trên điện thoại thật.
- [x] Form: kiểm tra dữ liệu ở client và server, hiện trạng thái đang gửi / thành công / lỗi, không gửi trùng.
- [x] Nút "Đặt lịch tư vấn" xuất hiện ở header, hero, phần dịch vụ, và thanh nổi trên mobile.

**Kỹ thuật**
- [x] `npm run lint` và `npm run build` không lỗi.
- [ ] Không thanh cuộn ngang ở 360px; không lỗi console hay hydration.
- [ ] Lighthouse mobile đạt ngưỡng KT-02.
- [ ] Đã deploy, link demo mở được ở chế độ ẩn danh.

**Bàn giao**
- [ ] Đã điền phiếu: Dev phụ trách, Trạng thái demo, Link demo.
- [ ] Ghi chú gửi sale gồm: các câu hỏi Q còn mở, các nội dung tạm, và trạng thái form (đã gửi dữ liệu thật hay chưa).

---

## 15. Quy trình cập nhật tài liệu này

1. Có thông tin mới từ sale/khách: sửa đúng mục liên quan, đổi nhãn sang [PHIẾU] (hoặc ghi "Khách xác nhận dd/mm/yyyy"), cập nhật trạng thái trong mục 13.
2. Ghi một dòng vào **Lịch sử thay đổi** bên dưới.
3. Xong hai bước trên mới sửa code cho khớp.

## Lịch sử thay đổi

| Ngày | Phiên bản | Nội dung | Người sửa |
|---|---|---|---|
| 02/11/2026 | 1.0 | Tạo tài liệu từ Phiếu Dev 50 | — |
| 02/11/2026 | 1.15 | Mục 10: menu mobile (Drawer) rộng toàn màn hình, khóa cuộn trang khi mở. | Dev (Claude Code) |
| 02/11/2026 | 1.14 | GD-08: quy tắc ngắt dòng, không để một chữ đứng một mình ở dòng cuối. | Dev (Claude Code) |
| 02/11/2026 | 1.13 | Section 6 và ND-06: section Vì sao chọn dùng 4 lý do người dùng cung cấp. Cập nhật GD-13. Thêm Q-19. | Dev (Claude Code) |
| 02/11/2026 | 1.12 | Thêm GD-15: hiệu ứng hiện khi cuộn (nhiều kiểu) cho mọi section, chạy lại mỗi lần cuộn tới. | Dev (Claude Code) |
| 02/11/2026 | 1.11 | GD-14: mặc định không bước nào active, chỉ active khi rê chuột. | Dev (Claude Code) |
| 02/11/2026 | 1.10 | Thêm GD-14: section Quy trình dạng thanh tiến trình 4 bước, rê chuột vào bước nào thì thanh chạy tới bước đó. | Dev (Claude Code) |
| 02/11/2026 | 1.9 | Thêm GD-13: section Vì sao chọn dạng 2 cột (chữ + lưới 2×2 bên trái, ảnh about-us bên phải). Q-18 thêm ảnh about-us. | Dev (Claude Code) |
| 02/11/2026 | 1.8 | GD-12: thêm hiệu ứng chữ nổi (Rising Ink) cho tiêu đề hero. | Dev (Claude Code) |
| 02/11/2026 | 1.7 | Thêm GD-12: hero dùng ảnh nền tràn màn hình, chữ góc dưới trái, thẻ nổi 3 điểm tin cậy góc dưới phải. | Dev (Claude Code) |
| 02/11/2026 | 1.6 | GD-11: thêm ảnh nền cho 5 thẻ nhóm khách, carousel tự xoay theo cuộn trang. Thêm Q-17, Q-18. | Dev (Claude Code) |
| 02/11/2026 | 1.5 | Thêm GD-11: section Phù hợp với ai dạng carousel lõm (tự viết, không dùng React Bits Pro), khối răng khôn chuyển xuống dưới. | Dev (Claude Code) |
| 02/11/2026 | 1.4 | Thêm GD-10: section Dịch vụ dạng chồng thẻ cuộn, chữ đè lên ảnh, thay cho Bento. | Dev (Claude Code) |
| 02/11/2026 | 1.3 | Thêm GD-09: đổi bố cục sang kiểu tài liệu phòng khám (tiêu đề lệch trái, hàng có đường kẻ thay thẻ, hero ảnh tràn mép, bỏ đường sóng). | Dev (Claude Code) |
| 02/11/2026 | 1.2 | Đổi bảng màu theo chỉ đạo người dùng (GD-01), thêm GD-08 (Soft UI Evolution, Trust & Authority, Accessible & Ethical, Flat Design, Bento, Micro-interactions). Ghi rõ ràng buộc tương phản của `#059669` và `#F59E0B`. | Dev (Claude Code) |
| 02/11/2026 | 1.1 | Áp dụng bản mô tả giao diện chi tiết của người dùng (GD-07). Thêm token `brand-green-100`, `brand-yellow-light`, `line`, `danger` (GD-01). Ghi nhận logo và ảnh khách gửi, danh sách ảnh dùng/không dùng (GD-03, GD-04). Đóng Q-08, Q-13. Thêm Q-14, Q-15, Q-16. Ghi danh sách nội dung tạm (mục 13). | Dev (Claude Code) |
