# Các cặp từ — chế độ “Gián điệp ẩn”

> Danh sách này được sinh tự động từ `js/words.js`.
> Chạy `node tools/check-pairs.js --list` cũng in ra đúng như vậy.

Chế độ **Gián điệp ẩn** chỉ bốc trong các cặp dưới đây, nên hai từ luôn có nhiều điểm chung.

## Quy tắc chọn cặp

1. **Cùng loại** — hai từ cùng một nhóm (đồ ăn với đồ ăn, nghề với nghề, địa điểm với địa điểm…).
2. **Nhiều điểm chung** — giống nhau về hình dáng / công dụng / chất liệu / bối cảnh dùng / cách mua – ăn – đựng…
3. **Không từ nào là con của từ kia** — loại trừ quan hệ “cha – con”.
   Ví dụ cặp **SAI**: *Bàn chải ↔ Bàn chải đánh răng* (bàn chải đánh răng là một loại bàn chải).
   Hai từ phải ngang hàng nhau, không từ nào là kiểu/loại của từ kia.
4. **Không trùng nghĩa** — không phải hai cách gọi cùng một thứ.
5. **Cặp đối xứng** — cặp không quy định ai là gián điệp: khi chia từ, game random xem từ nào là của dân,
   từ nào là của gián điệp, nên cùng một cặp có thể xuất hiện theo cả hai chiều.

Tổng cộng: **6 chủ đề · 195 cặp · 390 từ**

## Cách kiểm tra

```bash
node tools/check-pairs.js          # kiểm tra cấu trúc + cảnh báo quan hệ cha–con
node tools/check-pairs.js --list   # in toàn bộ cặp
```

Bộ kiểm tra tự động bắt: từ dùng 2 lần trong cùng chủ đề, cặp trùng, cặp có từ giống hệt,
và **nghi là quan hệ cha–con** (một từ nằm ở đầu/cuôi từ kia).

## Đồ ăn & thức uống — 38 cặp

1. **Sữa chua ↔ Kem** — đều từ sữa, lạnh, ngọt, mềm, ăn bằng thìa, đựng ly/hộp, làm tráng miệng
2. **Bánh mì ↔ Bánh bao** — đều làm từ bột mì, ăn sáng, có nhân mặn, rẻ, bán nhiều ở đường phố
3. **Phở ↔ Hủ tiếu** — đều là sợi/bún trong nước dùng, nóng, món ăn sáng, ăn bằng đũa + thìa, có thịt
4. **Cơm ↔ Cháo** — đều từ gạo, nóng, món chính mỗi bữa, ăn bằng thìa, no bụng, dễ tiêu
5. **Bánh quy ↔ Kẹo** — đều là đồ ngọt ăn vặt, đóng gói sẵn, mua ở tạp hoá, hợp với trẻ em
6. **Xúc xích ↔ Lạp xưởng** — đều là xúc xích từ thịt heo, dạng ống, mặn, thái lát ra ăn, để được lâu
7. **Trứng gà ↔ Trứng vịt** — đều là trứng, hình bầu dục, luộc/chiên, mua theo chục, giàu protein
8. **Thịt bò ↔ Thịt heo** — đều là thịt, món mặn chính, mua ở chợ, xào/nấu/hấp, giàu đạm
9. **Rau muống ↔ Rau cải** — đều là rau lá xanh, luộc/xào, rẻ, mua ở chợ mỗi ngày, nhiều chất xơ
10. **Táo ↔ Cam** — đều là quả tròn, ăn tươi, có vỏ, vị ngọt chua, mua theo ký, giàu vitamin
11. **Chuối ↔ Xoài** — đều là quả nhiệt đới, vàng khi chín, ngọt, mùa hè, mọc nhiều ở Việt Nam
12. **Bia ↔ Rượu vang** — đều là đồ uống có cồn, đựng chai/ly, uống ở tiệc nhậu, lên men, chỉ người lớn
13. **Mì tôm ↔ Phở ăn liền** — đều là mì ăn liền, có gói gia vị, nấu khoảng 3 phút, rẻ, món của sinh viên
14. **Nước mắm ↔ Nước tương** — đều là nước chấm, mặn, đựng chai, dùng để chấm / ướp, màu nâu đậm
15. **Đường ↔ Muối** — đều trắng, hạt nhỏ, gia vị không thể thiếu, mua theo gói/hũ, tan trong nước
16. **Bơ ↔ Phô mai** — đều làm từ sữa, béo, thích hợp phết lên bánh mì, để ở tủ lạnh, món Âu
17. **Cánh gà ↔ Đùi gà** — đều là phần thịt gà, có xương, chiên/nướng, cầm tay ăn, được ưa thích
18. **Chả giò ↔ Gỏi cuốn** — đều cuốn bằng bánh tráng, nhân rau + thịt, làm khai vị, đặc trưng Việt Nam
19. **Rau câu ↔ Bánh flan** — đều là tráng miệng lạnh, ngọt, mềm/dẻo, đựng ly/bát, nhiều màu sắc
20. **Nước ngọt ↔ Nước ép trái cây** — đều là đồ uống lạnh, ngọt, đựng chai/ly, giải khát, bán ở cửa hàng
21. **Canh ↔ Súp** — đều ở dạng nước, nóng, ăn kèm cơm, dùng thìa, vị thanh nhẹ
22. **Bún ↔ Mì** — đều là sợi dài, luộc chín, ăn với nước dùng hoặc trộn, bát + đũa, rẻ, ăn mỗi ngày
23. **Bánh xèo ↔ Bánh khọt** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
24. **Bánh chưng ↔ Bánh tét** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
25. **Gà rán ↔ Hamburger** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
26. **Pizza ↔ Mì Ý** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
27. **Sữa tươi ↔ Sữa đậu nành** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
28. **Trà sữa ↔ Sinh tố** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
29. **Nước lọc ↔ Nước khoáng** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
30. **Bắp rang ↔ Khoai tây chiên** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
31. **Dưa hấu ↔ Dứa** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
32. **Dâu tây ↔ Nho** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
33. **Bánh kem ↔ Bánh cupcake** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
34. **Cà phê ↔ Trà** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
35. **Bánh tráng ↔ Bánh đa** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
36. **Khoai lang ↔ Khoai tây** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
37. **Mật ong ↔ Siro** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến
38. **Cá viên ↔ Bò viên** — đều là món/đồ uống quen thuộc, dễ gặp trong bữa ăn hoặc hàng quán; cùng nhóm ẩm thực và đều có cách chế biến, mua bán, thưởng thức phổ biến

## Phương tiện — 13 cặp

1. **Ô tô ↔ Xe máy** — đều chạy trên đường, có động cơ, có bánh, chở người, cần xăng và bằng lái
2. **Xe buýt ↔ Tàu điện ngầm** — đều là phương tiện công cộng, chở được đông người, chạy tuyến cố định, mua vé
3. **Xe tải ↔ Máy kéo** — đều là xe lớn chạy dầu, dùng để chở/kéo, chạy chậm, cần tài xế chuyên nghiệp
4. **Xe cứu thương ↔ Xe cứu hoả** — đều là xe khẩn cấp, có còi và đèn nháy, chạy gấp đến hiện trường, trắng/đỏ
5. **Xe lăn ↔ Nạng** — đều là dụng cụ hỗ trợ đi lại, dùng cho người bị thương/khuyết tật, khung kim loại, di chuyển chậm
6. **Xe ngựa ↔ Xe bò** — đều là xe kéo bằng súc vật, 4 bánh, không động cơ, chạy chậm, quen ở nông thôn
7. **Tàu ngầm ↔ Tàu khu trục** — đều là tàu chiến, sơn xám, mang vũ khí, có nhiều thủy thủ, hoạt động trên biển
8. **Thuyền buồm ↔ Ca nô** — đều là thuyền nhỏ đi trên sông/biển, chở ít người, cần áo phao, dùng để đi lại và giải trí
9. **Diều ↔ Máy bay giấy** — đều bay được, không động cơ, làm từ giấy, phải thả/cầm bằng tay, bay nhờ gió ở chỗ trống
10. **Xe cẩu ↔ Xe ủi** — đều là máy công trình, to và nặng, thường sơn vàng, chạy chậm, làm việc ở công trường
11. **Xe bán tải ↔ Xe SUV** — đều là phương tiện quen thuộc, dùng để di chuyển hoặc chở người/hàng; cần điều khiển theo tuyến/đường đi và thường gặp trong đời sống
12. **Xe điện ↔ Xe hybrid** — đều là phương tiện quen thuộc, dùng để di chuyển hoặc chở người/hàng; cần điều khiển theo tuyến/đường đi và thường gặp trong đời sống
13. **Xe trượt scooter ↔ Ván trượt** — đều là phương tiện quen thuộc, dùng để di chuyển hoặc chở người/hàng; cần điều khiển theo tuyến/đường đi và thường gặp trong đời sống

## Đồ vật — 46 cặp

1. **Bàn chải đánh răng ↔ Kem đánh răng** — đều là đồ đánh răng, để trong nhà tắm, dùng cùng nhau, mùi bạc hà, mỗi sáng và tối
2. **Cái bàn ↔ Cái ghế** — đều là đồ nội thất, 4 chân, làm bằng gỗ/kim loại, đặt trong phòng, thường mua cùng nhau
3. **Cái gối ↔ Cái chăn** — đều là đồ trên giường, bằng vải mềm, dùng khi ngủ, giặt cùng lúc, để trong phòng ngủ
4. **Tủ lạnh ↔ Máy giặt** — đều là đồ điện gia dụng lớn, màu trắng, để bếp/chỗ giặt, tốn điện, đắt và bền, chạy kêu
5. **Cái nồi ↔ Cái chảo** — đều là đồ nấu ăn, đặt trên bếp, bằng kim loại, có quai cầm, nóng khi dùng, rửa sau nấu
6. **Đôi đũa ↔ Cái thìa** — đều là đồ dùng khi ăn, cất trong ngăn bếp, cầm bằng tay, rửa sau bữa ăn, mua theo bộ
7. **Con dao ↔ Cây kéo** — đều là đồ cắt, lưỡi sắc, bằng kim loại, có cầm, cất trong ngăn kéo, dễ gây nguy hiểm
8. **Đèn pin ↔ Cây nến** — đều dùng để phát sáng, cầm được trên tay, hữu ích lúc mất điện, cất trong ngăn kéo
9. **Cái gương ↔ Cái lược** — đều là đồ chăm sóc ngoại hình, để nhà tắm/bàn trang điểm, dùng hằng ngày
10. **Cái ba lô ↔ Cái túi xách** — đều là túi đựng đồ, đeo được trên người, có quai, bằng vải/da, dùng khi ra ngoài
11. **Cái ví ↔ Chìa khoá** — đều nhỏ gọn, bỏ túi/ba lô mỗi ngày, cần mang theo khi ra khỏi nhà, hay bị đánh rơi
12. **Tai nghe ↔ Cái loa** — đều là thiết bị phát nhạc, có dây hoặc bluetooth, chỉnh được âm lượng, dùng với điện thoại
13. **Điện thoại ↔ Máy tính bảng** — đều là đồ điện tử cá nhân, có màn hình cảm ứng, cài app/lướt mạng, có camera, sạc mỗi ngày
14. **Cái pin ↔ Sạc dự phòng** — đều trữ điện, dùng để sạc thiết bị, hình chữ nhật, có cổng sạc, ghi số mAh
15. **Lịch treo tường ↔ Tranh treo tường** — đều treo trên tường để trang trí, làm từ giấy/khung, đặt ở phòng khách, thay theo mùa
16. **Bình hoa ↔ Chậu cây** — đều dùng để chứa cây, đặt trên bàn/sàn, bằng sứ/nhựa, phải tưới nước, trang trí nhà cửa
17. **Thảm trải sàn ↔ Chiếc chiếu** — đều trải trên sàn để nằm/ngồi, bằng vải/cói, phải giặt/lau, để phòng khách
18. **Cái giường ↔ Cái võng** — đều dùng để nằm nghỉ, đặt trong nhà, có khung gỗ, mang lại cảm giác thư giãn
19. **Tủ quần áo ↔ Kệ giày** — đều là đồ nội thất để đựng đồ đạc, làm bằng gỗ, có nhiều ngăn, đặt phòng ngủ/cửa ra vào
20. **Bánh xà phòng ↔ Dầu gội đầu** — đều là đồ tắm, để trong nhà tắm, dạng bánh/chai, có mùi thơm, tạo bọt, vệ sinh cá nhân
21. **Bồn rửa ↔ Bồn cầu** — đều là thiết bị trong nhà vệ sinh, bằng sứ trắng, có nước chảy, gắn ống nước, dùng mỗi ngày
22. **Máy sấy tóc ↔ Bàn là** — đều là đồ điện gia dụng nhỏ, phát nóng, có dây điện, dùng cho tóc/quần áo, cất trong tủ
23. **Máy hút bụi ↔ Cây chổi** — đều là đồ dọn dẹp, dùng cho sàn nhà, cầm tay di chuyển, hút/quét bụi rác, cất trong tủ
24. **Thước kẻ ↔ Cây compa** — đều là đồ dùng học tập, cất trong hộp bút, bằng nhựa/kim loại, dùng để đo và vẽ
25. **Bút bi ↔ Bút chì** — đều là đồ viết, cầm bằng tay, cất trong hộp bút, để lại vệt trên giấy, rẻ, dùng ở trường
26. **Quả bóng ↔ Búp bê** — đều là đồ chơi của trẻ em, chơi ở nhà/sân, nhiều màu sắc, thường được tặng làm quà
27. **Máy ảnh ↔ Máy quay phim** — đều là máy quay hình, có ống kính và màn hình, giá đắt, dùng ở sự kiện, cần thẻ nhớ
28. **Khẩu trang ↔ Găng tay** — đều là đồ bảo hộ, dùng một lần, đeo lên mặt/tay, cần trong mùa dịch, mua ở hiệu thuốc
29. **Nón bảo hiểm ↔ Áo mưa** — đều là đồ che mưa/đội đầu, nhiều màu sắc, dùng khi đi xe máy, mang theo khi ra khỏi nhà
30. **Đàn ghi-ta ↔ Sáo trúc** — đều là nhạc cụ, cầm trên tay, phát ra giai điệu, dễ học, hay được dạy cho trẻ em
31. **Bình nước ↔ Cái ly** — đều là đồ đựng nước uống, bằng thủy tinh/nhựa, đặt trên bàn, phải rửa, dùng để rót
32. **Ổ cắm điện ↔ Công tắc điện** — đều là đồ điện gắn trên tường, bằng nhựa trắng, điều khiển dòng điện, có ở mỗi phòng
33. **Tivi ↔ Máy chiếu** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
34. **Laptop ↔ Máy tính bàn** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
35. **Bàn phím ↔ Chuột máy tính** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
36. **Đồng hồ đeo tay ↔ Đồng hồ báo thức** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
37. **Kính mắt ↔ Kính râm** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
38. **Cốc ↔ Bát** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
39. **Nồi cơm điện ↔ Ấm siêu tốc** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
40. **Tủ sách ↔ Kệ tivi** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
41. **Bóng đèn ↔ Đèn ngủ** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
42. **Khăn mặt ↔ Khăn tắm** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
43. **Máy in ↔ Máy photocopy** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
44. **Nồi chiên không dầu ↔ Lò vi sóng** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
45. **Bàn học ↔ Bàn làm việc** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày
46. **Bình giữ nhiệt ↔ Bình thủy** — đều là vật dụng quen thuộc trong gia đình/trường học; có công dụng thực tế, thường được cất giữ và sử dụng hằng ngày

## Nghề nghiệp — 36 cặp

1. **Bác sĩ ↔ Y tá** — đều làm ở bệnh viện, mặc áo trắng, chăm sóc bệnh nhân, có kiến thức y khoa, làm theo ca
2. **Nha sĩ ↔ Dược sĩ** — đều là nghề y, mặc áo blouse trắng, làm ở cơ sở y tế, tư vấn cho bệnh nhân, phải học nhiều năm
3. **Giáo viên ↔ Huấn luyện viên** — đều là nghề dạy dỗ, có học trò, soạn bài trước khi dạy, làm ở trường/sân tập, cần nói rõ
4. **Cảnh sát ↔ Lính cứu hoả** — đều mặc đồng phục, là lực lượng phục vụ công, ứng cứu sự cố, làm ở trạm, cần dũng cảm
5. **Bộ đội ↔ Bảo vệ** — đều mặc đồng phục, nhiệm vụ canh gác bảo vệ, làm theo ca ở chốt/trại, cần kỷ luật và thể lực
6. **Phi công ↔ Tiếp viên hàng không** — đều là người làm trên máy bay, đi nhiều nơi, mặc đồng phục, làm việc ở sân bay
7. **Tài xế xe buýt ↔ Thuyền trưởng** — đều lái phương tiện chở khách, ngồi ở ghế lái, chạy theo tuyến, mặc đồng phục, chịu trách nhiệm an toàn
8. **Ca sĩ ↔ Vũ công** — đều là nghệ sĩ biểu diễn, đứng trên sân khấu, giải trí cho khán giả, tập luyện mỗi ngày, cần thể lực
9. **Diễn viên ↔ Người mẫu** — đều xuất hiện trước ống kính, làm việc với đạo diễn/nhiếp ảnh gia, ngoại hình quan trọng, thuộc showbiz
10. **Phóng viên ↔ Bình luận viên** — đều là nghề truyền thông, nói trên truyền hình, phải nghiên cứu trước khi làm, đi hiện trường, có deadline
11. **Nhà văn ↔ Biên kịch** — đều là nghề viết, làm việc với ngôn từ, chủ yếu làm ở nhà, cần sáng tạo, được ghi tên tác phẩm
12. **Kỹ sư ↔ Kiến trúc sư** — đều là nghề kỹ thuật, vẽ bản vẽ, đội mũ bảo hiểm khi ra công trường, làm việc văn phòng, cần học cao
13. **Lập trình viên ↔ Chuyên gia bảo mật** — đều là nghề máy tính, làm việc văn phòng trước màn hình, cần tư duy logic, thu nhập cao
14. **Kế toán ↔ Nhân viên ngân hàng** — đều làm việc với số liệu/tiền bạc, ngồi bàn giấy máy tính, xử lý chứng từ, mặc trang phục trang trọng
15. **Đầu bếp ↔ Thợ làm bánh** — đều là nghề bếp, nấu ra đồ ăn, mặc đồng phục trắng, dậy sớm, làm việc trong bếp nóng, theo công thức
16. **Pha chế ↔ Phục vụ bàn** — đều là nhân viên quán, phục vụ khách hàng, đứng cả ngày, mặc tạp dề, bận nhất giờ cao điểm
17. **Thợ cắt tóc ↔ Thợ trang điểm** — đều là nghề làm đẹp, làm ở tiệm/salon, phục vụ từng khách một, dùng kéo/cọ, cần khéo tay
18. **Thợ xây ↔ Thợ mộc** — đều là công nhân xây dựng, đội mũ bảo hiểm, làm ở công trường, lao động tay chân, dùng dụng cụ cầm tay
19. **Thợ điện ↔ Thợ sửa ống nước** — đều là nghề sửa chữa, được gọi đến tận nhà, mang theo hộp dụng cụ, sửa dây điện/ống nước, làm bẩn tay
20. **Thợ may ↔ Nhà thiết kế** — đều là nghề làm quần áo, làm việc với vải vóc, đo kích cỡ, tạo ra sản phẩm mặc được, dùng kéo/máy may
21. **Nông dân ↔ Người đánh cá** — đều sản xuất lương thực, làm việc ngoài trời, phụ thuộc thời tiết, dậy sớm, lao động nặng nhọc
22. **Người chăn cừu ↔ Người nuôi ong** — đều chăm sóc vật nuôi ở nông thôn, làm việc ngoài trời, đội mũ, tiếp xúc với động vật, bán sản phẩm
23. **Cầu thủ bóng đá ↔ Vận động viên bơi lội** — đều là vận động viên, tập luyện mỗi ngày, đi thi đấu, mặc đồng phục đội, cần thể lực cao
24. **Võ sĩ ↔ Trọng tài** — đều là nghề trong thể thao đối kháng, làm việc trên sân đấu, mặc đồ riêng, nắm rõ luật, cần thể lực
25. **Ảo thuật gia ↔ Chú hề** — đều là nghệ sĩ biểu diễn, diễn cho đám đông/trẻ em, mặc trang phục sặc sỡ, thường làm ở tiệc, mang lại tiếng cười
26. **Nhiếp ảnh gia ↔ Người quay phim** — đều là nghề máy quay, mang theo thiết bị nặng, làm việc ở sự kiện, biết dựng/hậu kỳ, tính chất tự do
27. **Thợ sửa xe ↔ Thợ sửa điện thoại** — đều là kỹ thuật viên sửa chữa, làm ở cửa hàng, sửa thiết bị bằng dụng cụ, chẩn đoán lỗi, tiếp khách
28. **Nhân viên tổng đài ↔ Lễ tân** — đều là nghề tiếp xúc khách hàng, ngồi tại bàn làm việc, nghe điện/gặp gỡ khách, nói nhiều cả ngày
29. **Thợ hàn ↔ Thợ cơ khí** — đều là nghề gia công kim loại, làm ở xưởng/nhà máy, tiếp xúc tia lửa và máy móc, cần đồ bảo hộ
30. **Công nhân nhà máy ↔ Nhân viên kho** — đều là công nhân công nghiệp, mặc đồng phục, làm theo ca, làm ở nhà máy/kho, công việc lặp lại
31. **Người giúp việc ↔ Nhân viên vệ sinh** — đều là nghề dọn dẹp, làm ở nhà/toà nhà, mặc tạp dề, dùng chổi/cây lau, tính công theo giờ
32. **Người đưa thư ↔ Nhân viên giao hàng** — đều đi giao đồ đến từng nhà, mang túi/ba lô, chạy quanh phố, chạy tuyến mỗi ngày, giao thư/bưu kiện
33. **Người bán vé ↔ Thu ngân** — đều làm việc ở quầy, xử lý tiền mặt, ngồi tại quầy giao dịch, phục vụ hàng người xếp hàng
34. **Người dẫn chương trình ↔ Hướng dẫn viên du lịch** — đều là nghề nói trước đám đông, dùng micro, vừa thông tin vừa giải trí, đi nhiều nơi, cần ứng biến
35. **Thợ làm tóc ↔ Thợ làm móng** — đều là nghề phổ biến, cần kỹ năng chuyên môn và phục vụ một nhu cầu cụ thể của cộng đồng; thường làm việc với người hoặc thiết bị
36. **Thủ môn ↔ Hậu vệ** — đều là nghề phổ biến, cần kỹ năng chuyên môn và phục vụ một nhu cầu cụ thể của cộng đồng; thường làm việc với người hoặc thiết bị

## Địa điểm — 28 cặp

1. **Sân bay ↔ Nhà ga** — đều là trung tâm giao thông lớn, có toà nhà ga, bảng giờ tàu/bay, bán vé, đông người, có taxi bên ngoài
2. **Bệnh viện ↔ Phòng khám** — đều là nơi khám chữa bệnh, sơn trắng, có mùi thuốc, phòng chờ, bác sĩ và bệnh nhân
3. **Siêu thị ↔ Chợ** — đều là nơi mua đồ ăn/đồ dùng, có quầy/gian hàng, đông người, có giá tiền, thu ngân, đi mỗi ngày
4. **Rạp chiếu phim ↔ Nhà hát** — đều là nơi giải trí, có sân khấu/màn hình, ghế ngồi xếp hàng, bán vé, bên trong tối, có suất diễn
5. **Quán cà phê ↔ Quán trà sữa** — đều là quán đồ uống, bàn ghế nhỏ, có menu, chỗ tụ tập bạn bè, có nhân viên phục vụ, ở trong phố
6. **Nhà hàng ↔ Quán nhậu** — đều là nơi ăn uống bên ngoài, có bàn ghế và menu, có nhân viên phục vụ, tính tiền sau ăn, tụ tập nhóm
7. **Ngân hàng ↔ Bưu điện** — đều là văn phòng dịch vụ công, người đến xếp hàng, làm việc tại quầy, có nhân viên, giấy tờ thủ tục
8. **Tiệm cắt tóc ↔ Tiệm giặt ủi** — đều là tiệm dịch vụ nhỏ, phục vụ từng khách, khách ngồi chờ, trò chuyện, nằm trên phố, đến là làm liền
9. **Cửa hàng điện thoại ↔ Cửa hàng giày** — đều là cửa hàng bán lẻ, có kệ trưng bày, có nhân viên bán hàng, nằm trên phố mua sắm
10. **Sân vận động ↔ Nhà thi đấu** — đều là nơi tổ chức thể thao, đón đông khán giả, có trận đấu/sự kiện, bán vé, có khán đài, đèn sáng
11. **Hồ bơi ↔ Bãi biển** — đều là nơi bơi, có nước, đông vào mùa hè, mang khăn, đông người, có cứu hộ, mặc đồ bơi
12. **Công viên ↔ Khu vui chơi** — đều là nơi giải trí ngoài trời, có trẻ em, gia đình đi cuối tuần, không gian xanh, giá rẻ/miễn phí
13. **Rừng ↔ Núi** — đều là nơi thiên nhiên, đi bộ leo trèo, không khí trong lành, xa thành phố, có cây/đá, cắm trại được
14. **Hang động ↔ Thác nước** — đều là cảnh quan thiên nhiên, điểm du lịch, nằm trong vùng núi, có khách tham quan, liên quan nước/đá
15. **Chùa ↔ Nhà thờ** — đều là nơi thờ tự tôn giáo, yên lặng, có hương/nến, người đến cầu nguyện, kiến trúc đặc trưng
16. **Khu cắm trại ↔ Khu nghỉ dưỡng** — đều là nơi nghỉ ngơi, ở qua đêm, có lều/phòng, gần thiên nhiên, đi theo gia đình/nhóm
17. **Bến tàu ↔ Bến xe** — đều là bến giao thông, có sân đợi và bán vé, chỗ chờ, tàu/xe ra vào, đông người
18. **Nhà máy ↔ Nhà kho** — đều là toà nhà công nghiệp lớn, có công nhân, máy móc/thùng hàng, nằm ngoài thành phố, xe tải ra vào
19. **Nông trại ↔ Vườn trái cây** — đều là đất canh tác, cây trồng mọc thành hàng, nông dân làm việc, ngoài thành phố, hái/tham quan được
20. **Bãi đỗ xe ↔ Trạm xăng** — đều là nơi liên quan đến xe hơi, mặt đường bê tông, xe ra vào liên tục, phải trả tiền, có nhân viên
21. **Đồn cảnh sát ↔ Trạm cứu hoả** — đều là trạm khẩn cấp, người mặc đồng phục, xe đậu bên ngoài, nhận cuộc gọi, nằm trong khu dân
22. **Khách sạn ↔ Nhà trọ** — đều là nơi ở tạm thời, có phòng, trả tiền theo đêm, thuê, có giường và chìa khoá
23. **Phòng tập thể hình ↔ Sân bóng** — đều là nơi tập thể thao, có dụng cụ, người đến tập đều đặn, đổ mồ hôi, có chỗ thay đồ
24. **Tiệm sách ↔ Tiệm hoa** — đều là tiệm nhỏ, có mùi dễ chịu, khách ngắm/chọn, mua làm quà, yên lặng, nằm trên phố
25. **Toà án ↔ Nhà tù** — đều là nơi gắn với tội phạm, có người canh gác, phòng giam, không khí nghiêm trang, liên quan công lý
26. **Con sông ↔ Cái hồ** — đều là vùng nước tự nhiên, nước ngọt, có thuyền/câu cá, nằm gần khu dân, bơi/ngắm cảnh được
27. **Trường mầm non ↔ Trường tiểu học** — đều là địa điểm công cộng quen thuộc, mọi người có thể đến để sử dụng dịch vụ hoặc tham gia hoạt động
28. **Cửa hàng tiện lợi ↔ Siêu thị mini** — đều là địa điểm công cộng quen thuộc, mọi người có thể đến để sử dụng dịch vụ hoặc tham gia hoạt động

## Động vật — 34 cặp

1. **Chó ↔ Mèo** — đều là thú cưng phổ biến, 4 chân, có lông, sống trong nhà, ăn thịt, được con người yêu quý
2. **Hổ ↔ Sư tử** — đều là họ mèo lớn, lông có hoa văn, gầm được, săn mồi, sống hoang dã/sở thú, nguy hiểm
3. **Voi ↔ Tê giác** — đều to lớn, da dày, có ngà/sừng, sống ở châu Phi, đang nguy cấp, hay thấy ở sở thú, ăn cây cỏ
4. **Hà mã ↔ Cá sấu** — đều là động vật lớn sống gần nước, ở sông, nguy hiểm, thấy ở sở thú, hàm/răng to
5. **Ngựa ↔ Lạc đà** — đều có móng guốc, được cưỡi/chở hàng, sống đồng cỏ/sa mạc, chạy nhanh, đã thuần hoá
6. **Cáo ↔ Sói** — đều là chó hoang, ngoại hình hao hao giống, xảo quyệt, săn mồi ban đêm, sống trong rừng
7. **Khỉ ↔ Gấu** — đều sống trong rừng, leo cây giỏi, ăn quả, tay khoẻ, thấy ở sở thú, có lông
8. **Cá heo ↔ Cá voi** — đều là thú biển, thông minh, bơi theo đàn, thở bằng phổi, sống ở đại dương, thân to
9. **Tôm ↔ Cua** — đều là hải sản, có vỏ cứng, đánh bắt bằng lưới, sống ở biển, luộc lên ăn, bán ở chợ
10. **Gà ↔ Vịt** — đều là gia cầm, nuôi ở trại, đẻ trứng, làm thịt, đi bằng 2 chân, sống ở sân chuồng
11. **Đại bàng ↔ Cú mèo** — đều là chim săn mồi, bay cao, bắt động vật nhỏ, móng và mỏ sắc, làm tổ trên cao
12. **Bướm ↔ Ong** — đều là côn trùng, bay được, hay đến hoa, thấy ở vườn, mang phấn hoa, thân nhỏ nhiều màu
13. **Muỗi ↔ Ruồi** — đều là côn trùng bay nhỏ, vo ve, truyền bệnh, làm phiền vào mùa hè, bị đập
14. **Rắn ↔ Thằn lằn** — đều là bò sát, di chuyển trên mặt đất, có vảy, máu lạnh, một số có độc, trốn cỏ/đá
15. **Ếch ↔ Rùa** — đều sống gần nước, hay thấy ở ao/hồ, di chuyển chậm, ăn côn trùng, phổ biến ở Việt Nam
16. **Nai ↔ Hươu cao cổ** — đều là động vật móng guốc hoang dã, gặm cỏ, chạy nhanh, sống thảo nguyên/sở thú, bị thú dữ săn
17. **Thỏ ↔ Chuột** — đều là thú nhỏ, có lông, di chuyển nhanh, gặm nhắm, sống ở đồng/nhà, là mồi của thú khác
18. **Sóc ↔ Hamster** — đều là gặm nhấm nhỏ, má phồng đựng hạt, ăn hạt/củ, sống ở chuồng/cây, nuôi làm thú cảnh
19. **Kangaroo ↔ Koala** — đều là động vật đặc trưng Úc, có túi, hay thấy ở sở thú, dễ thương, lông nâu xám
20. **Chim công ↔ Vẹt** — đều là chim sắc màu, sống vùng nhiệt đới, thấy ở sở thú, lông đẹp, kêu to, nuôi trong chuồng
21. **Cá mập ↔ Cá ngừ** — đều là cá biển to, bơi nhanh, sống ngoài khơi, bị con người đánh bắt, có vây
22. **Bạch tuộc ↔ Con mực** — đều là động vật chân đầu, có xúc tu, sống ở biển, biết phun mực, thông minh, ăn được
23. **Sao biển ↔ Sứa** — đều là sinh vật biển, không xương, hình dáng lạ, trôi/bơi chậm, hay thấy ở thủy cung
24. **Heo ↔ Cừu** — đều là vật nuôi trang trại, nuôi lấy thịt, ở chuồng, ăn thức ăn/cỏ, đã thuần hoá lâu đời
25. **Trâu ↔ Bò** — đều là bò nhà, có sừng, kéo cày, gặm cỏ đồng ruộng, cho sữa, gắn với làng quê Việt Nam
26. **Cá vàng ↔ Cá chép** — đều là cá nước ngọt nhỏ, sống ao/hồ/bể, màu cam hoặc bạc, nuôi cảnh hoặc làm thịt
27. **Cá hồi ↔ Cá thu** — đều là cá ăn được, thân bạc, sống ở biển, nướng/hấp, bán ở chợ siêu thị
28. **Chim bồ câu ↔ Chim sẻ** — đều là chim thành phố nhỏ, bay theo bầy, đậu dây điện/mái nhà, lông nâu xám, ăn hạt
29. **Hải cẩu ↔ Chim cánh cụt** — đều sống vùng lạnh, bơi giỏi, hay thấy ở sở thú có nước lạnh, màu đen trắng, ăn cá
30. **Kiến ↔ Mối** — đều là côn trùng xã hội nhỏ, sống thành đàn, làm tổ, dưới đất/trong gỗ, phá hoại nhà cửa
31. **Nhện ↔ Con gián** — đều là động vật nhỏ trong nhà, trốn góc tối, di chuyển nhanh, nhiều chân, bị mọi người ghét
32. **Ve sầu ↔ Dế mèn** — đều là côn trùng mùa hè, hay thấy trên cây/đồng, kêu to, nhảy/bay được, gắn với miền quê
33. **Con lười ↔ Gấu trúc** — đều leo cây chậm rãi, ăn lá/tre, hay thấy ở sở thú, dễ thương, đang bị đe doạ
34. **Cá rô ↔ Cá lóc** — đều là động vật quen thuộc, có đặc điểm nhận diện riêng; thường được biết đến qua đời sống, sách/phim hoặc sở thú

