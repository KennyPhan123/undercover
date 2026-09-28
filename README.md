# Gián Điệp · app quản trò

Trước đây toàn bộ game nằm gọn trong một file `gian-diep(1).html`. Giờ code được tách ra
theo từng phần để dễ sửa, nhất là phần **kho từ**:

```
index.html          bố cục các màn hình
css/style.css       giao diện
js/words.js         KHO TỪ — mỗi chủ đề gồm các CẶP TỪ
js/app.js           toàn bộ logic game
docs/cac-cap-tu.md  danh sách đầy đủ các cặp từ + lý do chọn
tools/check-pairs.js  script kiểm tra kho từ (không cần cài gì)
```

Cách chạy: mở `index.html` trực tiếp bằng trình duyệt, hoặc

```bash
python3 -m http.server 8080
# rồi mở http://localhost:8080
```

File gốc `gian-diep(1).html` vẫn được giữ nguyên làm bản sao lưu.

---

## Hai tính năng đã sửa

### 1. Chế độ “Gián điệp ẩn” giờ bốc theo CẶP TỪ có nhiều điểm chung

Trước: game bốc 2 từ ngẫu nhiên trong chủ đề → 2 từ hoàn toàn không liên quan
(VD “Điện thoại” và “Nông dân”).

Giờ: mỗi chủ đề trong `js/words.js` là một danh sách **cặp**, game chỉ bốc trong các
cặp đó. Mỗi cặp được chọn theo 5 quy tắc:

1. **Cùng loại** — đồ ăn với đồ ăn, nghề với nghề, địa điểm với địa điểm…
2. **Nhiều điểm chung** — giống nhau về hình dáng / công dụng / chất liệu / bối cảnh dùng.
   Ví dụ: *Sữa chua ↔ Kem*, *Máy bay ↔ Tên lửa*, *Bác sĩ ↔ Y tá*, *Sân bay ↔ Nhà ga*.
3. **Không từ nào là con của từ kia** — cặp *Bàn chải ↔ Bàn chải đánh răng* là **sai**,
   vì bàn chải đánh răng là một *loại* bàn chải. Hai từ phải ngang hàng nhau.
4. **Không trùng nghĩa.**
5. **Cặp đối xứng** — cặp không quy định ai là gián điệp. Khi chia từ, game random xem từ
   nào là của dân, từ nào là của gián điệp, nên cùng một cặp có thể xuất hiện theo cả hai
   chiều ở các ván khác nhau.

Hiện có **6 chủ đề · 195 cặp · 390 từ**. Xem toàn bộ cặp và lý do chọn ở
[`docs/cac-cap-tu.md`](docs/cac-cap-tu.md).

Bộ nhớ “cặp đã chơi” cũng hoạt động theo cặp: chơi hết các cặp của một chủ đề mới quay lại.

### 2. Chọn chế độ theo số gián điệp

| Số gián điệp | Có thể chọn |
|---|---|
| 1 | 1 trong 2 chế độ: **Gián điệp ẩn** hoặc **Gián điệp biết** |
| ≥ 2 | **Cả 2 chế độ cùng lúc** |

Khi chọn cả 2 (chỉ được khi đã đặt ≥ 2 gián điệp), game tự chia ngẫu nhiên các gián điệp
thành hai bên, **mỗi bên ít nhất 1 người**:

- *gián điệp ẩn* — nhận từ (từ kia của cặp), không biết mình là gián điệp;
- *gián điệp biết* — thấy chữ “GIÁN ĐIỆP” + chủ đề, phải tự nghĩ một từ chung.

Màn kết thúc sẽ ghi rõ ai là “Gián điệp ẩn”, ai là “Gián điệp biết”, và ô từ của gián điệp
được đổi nhãn thành “Từ của gián điệp ẩn”.

Nếu bật **Ngẫu nhiên** số gián điệp thì chưa biết trước sẽ có mấy gián điệp nên vẫn chỉ
chọn 1 chế độ. Tương tự, nếu xoá bớt người chơi xuống mức chỉ còn 1 gián điệp thì chế độ
thừa được bỏ tự động.

---

## Kiểm tra kho từ

```bash
node tools/check-pairs.js          # tóm tắt + báo lỗi
node tools/check-pairs.js --list   # in ra toàn bộ cặp
```

Script báo lỗi khi: một từ bị dùng 2 lần trong cùng chủ đề, cặp bị trùng, 2 từ trong cặp
giống hệt, và **nghi là quan hệ cha–con** (một từ nằm ở đầu hoặc cuối từ kia — đúng kiểu
“bàn chải” / “bàn chải đánh răng”). Script cũng cảnh báo nếu một từ xuất hiện ở 2 chủ đề.
