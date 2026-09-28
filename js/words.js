/* ============================================================
   GIÁN ĐIỆP · kho từ
   ------------------------------------------------------------
   Mỗi chủ đề gồm các CẶP TỪ (pairs). Chế độ "Gián điệp ẩn"
   chỉ bốc trong các cặp này, nên 2 từ luôn có nhiều điểm chung.

   Quy tắc chọn cặp (mỗi cặp đều phải thỏa mãn):
     1. Cùng loại: 2 từ cùng một nhóm (đồ ăn ↔ đồ ăn, nghề ↔ nghề,
        địa điểm ↔ địa điểm, phương tiện ↔ phương tiện...).
     2. Nhiều điểm chung: giống nhau về hình dáng / công dụng /
        chất liệu / bối cảnh dùng / cách ăn-đựng-mua...
     3. KHÔNG được là từ con của nhau (loại trừ quan hệ
        "cha – con"). VD cặp SAI: "Bàn chải" ↔ "Bàn chải đánh răng"
        (bàn chải đánh răng là một loại bàn chải). Hai từ phải
        ngang hàng nhau, không từ nào là kiểu/loại của từ kia.
     4. Không trùng nghĩa (không phải 2 cách gọi cùng một thứ).
     5. Không phải cặp "vật – bộ phận/phụ kiện của nó" lệch hẳn
        cấp độ (VD "Điện thoại" ↔ "Màn hình điện thoại").

   Cặp nào cũng đối xứng: khi chia từ, game random xem từ nào là
   từ của dân, từ nào là từ của gián điệp — không cặp nào "cố định"
   bên nào làm gián điệp.

   Chế độ "Gián điệp biết" chỉ cần từ đơn → mảng `words` được tự
   động rút ra từ các cặp bên dưới.
   ============================================================ */

const TOPICS = [
  /* ---------------- Đồ ăn & thức uống ---------------- */
  {
    id: "do-an",
    name: "Đồ ăn & thức uống",
    pairs: [
      ["Sữa chua", "Kem"],
      ["Bánh mì", "Bánh bao"],
      ["Phở", "Hủ tiếu"],
      ["Cơm", "Cháo"],
      ["Bánh quy", "Kẹo"],
      ["Xúc xích", "Lạp xưởng"],
      ["Trứng gà", "Trứng vịt"],
      ["Thịt bò", "Thịt heo"],
      ["Rau muống", "Rau cải"],
      ["Táo", "Cam"],
      ["Chuối", "Xoài"],
      ["Bia", "Rượu vang"],
      ["Mì tôm", "Phở ăn liền"],
      ["Nước mắm", "Nước tương"],
      ["Đường", "Muối"],
      ["Bơ", "Phô mai"],
      ["Cánh gà", "Đùi gà"],
      ["Chả giò", "Gỏi cuốn"],
      ["Rau câu", "Bánh flan"],
      ["Nước ngọt", "Nước ép trái cây"],
      ["Canh", "Súp"],
      ["Bún", "Mì"],
      ["Bánh xèo", "Bánh khọt"],
      ["Bánh chưng", "Bánh tét"],
      ["Gà rán", "Hamburger"],
      ["Pizza", "Mì Ý"],
      ["Sữa tươi", "Sữa đậu nành"],
      ["Trà sữa", "Sinh tố"],
      ["Nước lọc", "Nước khoáng"],
      ["Bắp rang", "Khoai tây chiên"],
      ["Dưa hấu", "Dứa"],
      ["Dâu tây", "Nho"],
      ["Bánh kem", "Bánh cupcake"],
      ["Cà phê", "Trà"],
      ["Bánh tráng", "Bánh đa"],
      ["Khoai lang", "Khoai tây"],
      ["Mật ong", "Siro"],
      ["Cá viên", "Bò viên"]
    ]
  },

  /* ---------------- Phương tiện ---------------- */
  {
    id: "phuong-tien",
    name: "Phương tiện",
    pairs: [
      ["Ô tô", "Xe máy"],
      ["Xe buýt", "Tàu điện ngầm"],
      ["Xe tải", "Máy kéo"],
      ["Xe cứu thương", "Xe cứu hoả"],
      ["Xe lăn", "Nạng"],
      ["Xe ngựa", "Xe bò"],
      ["Tàu ngầm", "Tàu khu trục"],
      ["Thuyền buồm", "Ca nô"],
      ["Diều", "Máy bay giấy"],
      ["Xe cẩu", "Xe ủi"],
      ["Xe bán tải", "Xe SUV"],
      ["Xe điện", "Xe hybrid"],
      ["Xe trượt scooter", "Ván trượt"]
    ]
  },

  /* ---------------- Đồ vật ---------------- */
  {
    id: "do-vat",
    name: "Đồ vật",
    pairs: [
      ["Bàn chải đánh răng", "Kem đánh răng"],
      ["Cái bàn", "Cái ghế"],
      ["Cái gối", "Cái chăn"],
      ["Tủ lạnh", "Máy giặt"],
      ["Cái nồi", "Cái chảo"],
      ["Đôi đũa", "Cái thìa"],
      ["Con dao", "Cây kéo"],
      ["Đèn pin", "Cây nến"],
      ["Cái gương", "Cái lược"],
      ["Cái ba lô", "Cái túi xách"],
      ["Cái ví", "Chìa khoá"],
      ["Tai nghe", "Cái loa"],
      ["Điện thoại", "Máy tính bảng"],
      ["Cái pin", "Sạc dự phòng"],
      ["Lịch treo tường", "Tranh treo tường"],
      ["Bình hoa", "Chậu cây"],
      ["Thảm trải sàn", "Chiếc chiếu"],
      ["Cái giường", "Cái võng"],
      ["Tủ quần áo", "Kệ giày"],
      ["Bánh xà phòng", "Dầu gội đầu"],
      ["Bồn rửa", "Bồn cầu"],
      ["Máy sấy tóc", "Bàn là"],
      ["Máy hút bụi", "Cây chổi"],
      ["Thước kẻ", "Cây compa"],
      ["Bút bi", "Bút chì"],
      ["Quả bóng", "Búp bê"],
      ["Máy ảnh", "Máy quay phim"],
      ["Khẩu trang", "Găng tay"],
      ["Nón bảo hiểm", "Áo mưa"],
      ["Đàn ghi-ta", "Sáo trúc"],
      ["Bình nước", "Cái ly"],
      ["Ổ cắm điện", "Công tắc điện"],
      ["Tivi", "Máy chiếu"],
      ["Laptop", "Máy tính bàn"],
      ["Bàn phím", "Chuột máy tính"],
      ["Đồng hồ đeo tay", "Đồng hồ báo thức"],
      ["Kính mắt", "Kính râm"],
      ["Cốc", "Bát"],
      ["Nồi cơm điện", "Ấm siêu tốc"],
      ["Tủ sách", "Kệ tivi"],
      ["Bóng đèn", "Đèn ngủ"],
      ["Khăn mặt", "Khăn tắm"],
      ["Máy in", "Máy photocopy"],
      ["Nồi chiên không dầu", "Lò vi sóng"],
      ["Bàn học", "Bàn làm việc"],
      ["Bình giữ nhiệt", "Bình thủy"]
    ]
  },

  /* ---------------- Nghề nghiệp ---------------- */
  {
    id: "nghe-nghiep",
    name: "Nghề nghiệp",
    pairs: [
      ["Bác sĩ", "Y tá"],
      ["Nha sĩ", "Dược sĩ"],
      ["Giáo viên", "Huấn luyện viên"],
      ["Cảnh sát", "Lính cứu hoả"],
      ["Bộ đội", "Bảo vệ"],
      ["Phi công", "Tiếp viên hàng không"],
      ["Tài xế xe buýt", "Thuyền trưởng"],
      ["Ca sĩ", "Vũ công"],
      ["Diễn viên", "Người mẫu"],
      ["Phóng viên", "Bình luận viên"],
      ["Nhà văn", "Biên kịch"],
      ["Kỹ sư", "Kiến trúc sư"],
      ["Lập trình viên", "Chuyên gia bảo mật"],
      ["Kế toán", "Nhân viên ngân hàng"],
      ["Đầu bếp", "Thợ làm bánh"],
      ["Pha chế", "Phục vụ bàn"],
      ["Thợ cắt tóc", "Thợ trang điểm"],
      ["Thợ xây", "Thợ mộc"],
      ["Thợ điện", "Thợ sửa ống nước"],
      ["Thợ may", "Nhà thiết kế"],
      ["Nông dân", "Người đánh cá"],
      ["Người chăn cừu", "Người nuôi ong"],
      ["Cầu thủ bóng đá", "Vận động viên bơi lội"],
      ["Võ sĩ", "Trọng tài"],
      ["Ảo thuật gia", "Chú hề"],
      ["Nhiếp ảnh gia", "Người quay phim"],
      ["Thợ sửa xe", "Thợ sửa điện thoại"],
      ["Nhân viên tổng đài", "Lễ tân"],
      ["Thợ hàn", "Thợ cơ khí"],
      ["Công nhân nhà máy", "Nhân viên kho"],
      ["Người giúp việc", "Nhân viên vệ sinh"],
      ["Người đưa thư", "Nhân viên giao hàng"],
      ["Người bán vé", "Thu ngân"],
      ["Người dẫn chương trình", "Hướng dẫn viên du lịch"],
      ["Thợ làm tóc", "Thợ làm móng"],
      ["Thủ môn", "Hậu vệ"],
    ]
  },

  /* ---------------- Địa điểm ---------------- */
  {
    id: "dia-diem",
    name: "Địa điểm",
    pairs: [
      ["Sân bay", "Nhà ga"],
      ["Bệnh viện", "Phòng khám"],
      ["Siêu thị", "Chợ"],
      ["Rạp chiếu phim", "Nhà hát"],
      ["Quán cà phê", "Quán trà sữa"],
      ["Nhà hàng", "Quán nhậu"],
      ["Ngân hàng", "Bưu điện"],
      ["Tiệm cắt tóc", "Tiệm giặt ủi"],
      ["Cửa hàng điện thoại", "Cửa hàng giày"],
      ["Sân vận động", "Nhà thi đấu"],
      ["Hồ bơi", "Bãi biển"],
      ["Công viên", "Khu vui chơi"],
      ["Rừng", "Núi"],
      ["Hang động", "Thác nước"],
      ["Chùa", "Nhà thờ"],
      ["Khu cắm trại", "Khu nghỉ dưỡng"],
      ["Bến tàu", "Bến xe"],
      ["Nhà máy", "Nhà kho"],
      ["Nông trại", "Vườn trái cây"],
      ["Bãi đỗ xe", "Trạm xăng"],
      ["Đồn cảnh sát", "Trạm cứu hoả"],
      ["Khách sạn", "Nhà trọ"],
      ["Phòng tập thể hình", "Sân bóng"],
      ["Tiệm sách", "Tiệm hoa"],
      ["Toà án", "Nhà tù"],
      ["Con sông", "Cái hồ"],
      ["Trường mầm non", "Trường tiểu học"],
      ["Cửa hàng tiện lợi", "Siêu thị mini"],
    ]
  },

  /* ---------------- Động vật ---------------- */
  {
    id: "dong-vat",
    name: "Động vật",
    pairs: [
      ["Chó", "Mèo"],
      ["Hổ", "Sư tử"],
      ["Voi", "Tê giác"],
      ["Hà mã", "Cá sấu"],
      ["Ngựa", "Lạc đà"],
      ["Cáo", "Sói"],
      ["Khỉ", "Gấu"],
      ["Cá heo", "Cá voi"],
      ["Tôm", "Cua"],
      ["Gà", "Vịt"],
      ["Đại bàng", "Cú mèo"],
      ["Bướm", "Ong"],
      ["Muỗi", "Ruồi"],
      ["Rắn", "Thằn lằn"],
      ["Ếch", "Rùa"],
      ["Nai", "Hươu cao cổ"],
      ["Thỏ", "Chuột"],
      ["Sóc", "Hamster"],
      ["Kangaroo", "Koala"],
      ["Chim công", "Vẹt"],
      ["Cá mập", "Cá ngừ"],
      ["Bạch tuộc", "Con mực"],
      ["Sao biển", "Sứa"],
      ["Heo", "Cừu"],
      ["Trâu", "Bò"],
      ["Cá vàng", "Cá chép"],
      ["Cá hồi", "Cá thu"],
      ["Chim bồ câu", "Chim sẻ"],
      ["Hải cẩu", "Chim cánh cụt"],
      ["Kiến", "Mối"],
      ["Nhện", "Con gián"],
      ["Ve sầu", "Dế mèn"],
      ["Con lười", "Gấu trúc"],
      ["Cá rô", "Cá lóc"],
    ]
  }
];

/* ---------- rút mảng từ đơn (dùng cho chế độ "gián điệp biết") ---------- */
TOPICS.forEach(function (t) {
  const seen = Object.create(null);
  t.words = [];
  t.pairs.forEach(function (p) {
    p.forEach(function (w) {
      if (!seen[w]) { seen[w] = 1; t.words.push(w); }
    });
  });
});
