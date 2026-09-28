#!/usr/bin/env node
/* ============================================================
   Kiểm tra kho từ của game Gián Điệp
   ------------------------------------------------------------
   Chạy:  node tools/check-pairs.js            (tóm tắt)
          node tools/check-pairs.js --list     (in ra toàn bộ cặp)

   Những gì được check:
     1. mỗi từ chỉ xuất hiện đúng 1 cặp trong cùng chủ đề
     2. 2 từ trong 1 cặp không được trùng nhau
     3. không có cặp bị lặp (kể cả đảo vị trí)
     4. cảnh báo quan hệ "cha – con": 1 từ là phần đầu của từ kia
        (VD "Bàn chải" ↔ "Bàn chải đánh răng" → SAI)
     5. cảnh báo từ xuất hiện ở 2 chủ đề khác nhau
     6. thống kê số cặp / số từ mỗi chủ đề
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "js", "words.js"), "utf8");
// chạy file words.js trong 1 scope sạch để lấy biến TOPICS
const TOPICS = new Function(src + "\n;return TOPICS;")();

const norm = s => s.trim().toLowerCase().replace(/\s+/g, " ");
const wordsOf = w => norm(w).split(" ");

let problems = 0, warns = 0;
const fail = m => { console.log("  ✗ " + m); problems++; };
const warn = m => { console.log("  ! " + m); warns++; };

console.log("KIỂM TRA KHO TỪ\n");

const globalUse = Object.create(null);

TOPICS.forEach(t => {
  console.log("· " + t.name + "  (" + t.id + ")");

  if (!Array.isArray(t.pairs) || !t.pairs.length) { fail("chủ đề không có cặp nào"); return; }

  const local = Object.create(null);   // word -> index cặp
  const seenPair = Object.create(null);

  t.pairs.forEach((p, i) => {
    const tag = "cặp #" + (i + 1);
    if (!Array.isArray(p) || p.length !== 2) { fail(tag + ": phải có đúng 2 từ"); return; }
    const [a, b] = p.map(x => String(x || "").trim());
    if (!a || !b) { fail(tag + ": có từ rỗng"); return; }
    if (norm(a) === norm(b)) fail(tag + ': 2 từ giống hệt nhau ("' + a + '")');

    // 2. mỗi từ chỉ 1 cặp / chủ đề
    [a, b].forEach(w => {
      if (local[w] !== undefined) fail(tag + ': từ "' + w + '" đã dùng ở ' + local[w]);
      else local[w] = tag;
      globalUse[w] = (globalUse[w] || []).concat(t.name);
    });

    // 3. cặp lặp
    const key = [norm(a), norm(b)].sort().join(" ~ ");
    if (seenPair[key] !== undefined) fail(tag + ": trùng cặp với " + seenPair[key]);
    else seenPair[key] = tag;

    // 4. quan hệ cha – con: 1 từ bắt đầu bằng từ kia (theo ranh giới từ)
    const wa = wordsOf(a), wb = wordsOf(b);
    const short = wa.length <= wb.length ? [a, b, wa, wb] : [b, a, wb, wa];
    const isPrefix = short[2].length < short[3].length &&
      short[2].every((w, k) => w === short[3][k]);
    const isSuffix = short[2].length < short[3].length &&
      short[2].every((w, k) => w === short[3][short[3].length - short[2].length + k]);
    if (isPrefix || isSuffix) {
      fail(tag + ': nghi là quan hệ cha–con ("' + short[0] + '" ⊂ "' + short[1] + '")');
    }
  });

  // 6. mảng words rút từ pairs phải khớp
  const derived = [];
  const s = Object.create(null);
  t.pairs.forEach(p => p.forEach(w => { if (!s[w]) { s[w] = 1; derived.push(w); } }));
  if (JSON.stringify(derived) !== JSON.stringify(t.words || [])) {
    fail("mảng words không khớp với pairs (hãy để words.js tự rút ra)");
  }

  console.log("    " + t.pairs.length + " cặp · " + (t.words || []).length + " từ");
});

// 5. từ nằm ở 2 chủ đề
console.log("\nKiểm tra chéo giữa các chủ đề:");
let cross = 0;
Object.keys(globalUse).forEach(w => {
  const topics = globalUse[w];
  if (topics.length > 1) { warn('từ "' + w + '" nằm ở: ' + topics.join(", ")); cross++; }
});
if (!cross) console.log("  ✓ không từ nào bị trùng giữa các chủ đề");

const totalPairs = TOPICS.reduce((a, t) => a + t.pairs.length, 0);
const totalWords = TOPICS.reduce((a, t) => a + t.words.length, 0);
console.log("\nTỔNG: " + TOPICS.length + " chủ đề · " + totalPairs + " cặp · " + totalWords + " từ");

if (process.argv.includes("--list")) {
  console.log("\n===== DANH SÁCH CẶP =====");
  TOPICS.forEach(t => {
    console.log("\n## " + t.name);
    t.pairs.forEach((p, i) => console.log("  " + String(i + 1).padStart(2) + ". " + p[0] + "  ↔  " + p[1]));
  });
}

console.log("\nKết quả: " + (problems ? problems + " LỖI" : "không có lỗi") +
            (warns ? " · " + warns + " cảnh báo" : "") + "\n");
process.exit(problems ? 1 : 0);
