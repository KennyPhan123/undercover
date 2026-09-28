"use strict";
/* ============================================================
   GIÁN ĐIỆP · app quản trò
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const buzz = (ms = 12) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const ICON_TRASH = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>';
const ICON_GRIP  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>';

/* ---------- kho từ: xem js/words.js ----------
   TOPICS = [{ id, name, pairs: [["từ A", "từ B"], ...] }, ...]
   Mỗi chủ đề gồm các CẶP TỪ. Chế độ "gián điệp ẩn" chỉ bốc trong
   các cặp này nên 2 từ luôn có nhiều điểm chung (và không từ nào
   là con của từ kia). Chế độ "gián điệp biết" chỉ cần từ đơn →
   dùng mảng words (đã tự rút ra từ pairs trong words.js).      */

/* ---------- state ---------- */
const state = {
  players: [],          // [{id, name}] theo đúng thứ tự đưa máy
  minutes: 5,
  spies: 1,
  randomSpies: false,   // số gián điệp ngẫu nhiên — chỉ lộ khi kết thúc ván
  spiesInGame: 1,
  round: 1,
  roles: {},            // id -> 'spy' | 'civil'
  spyMode: {},          // id -> 'hidden' | 'known' — kiểu gián điệp của từng người
  modes: ["hidden"],    // chế độ đang chọn (1 phần tử, hoặc 2 khi có ≥2 gián điệp)
  words: { civil: "—", spy: "—" },
  alive: [],
  dealIndex: 0,
  peeked: {},
  remaining: 300000,
  running: false,
  endAt: 0,
  lastPair: "",
  pickedTopic: null
};
let tickId = null;
const TIME_MIN = 1, TIME_MAX = 60;      // phút — chỉnh bằng nút − / +

/* ---------- navigation ---------- */
function show(id) { $$(".screen").forEach(s => s.classList.toggle("active", s.id === id)); }

/* ---------- toast ---------- */
let toastTimer = null;
function toast(msg, actionLabel, onAction) {
  const box = $("#toast");
  box.innerHTML = "";
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = '<span></span>';
  el.firstChild.textContent = msg;
  if (actionLabel) {
    const b = document.createElement("button");
    b.textContent = actionLabel;
    b.onclick = () => { onAction && onAction(); closeToast(); };
    el.appendChild(b);
  }
  box.appendChild(el);
  requestAnimationFrame(() => el.classList.add("in"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(closeToast, 5200);
}
function closeToast() {
  const el = $(".toast");
  if (!el) return;
  el.classList.remove("in");
  setTimeout(() => el.remove(), 320);
}

/* ============================================================
   1. NGƯỜI CHƠI
   ============================================================ */
state.players = store.get("gd.players", []) || [];
state.minutes = store.get("gd.minutes", 5) || 5;
state.minutes = Math.min(TIME_MAX, Math.max(TIME_MIN, state.minutes));
state.spies = store.get("gd.spies", 1) || 1;
state.randomSpies = store.get("gd.randomSpies", false) === true;
/* chế độ chơi — chọn được 1 chế độ, hoặc CẢ HAI khi có ≥ 2 gián điệp */
const MODES = [
  { id: "hidden", name: "Gián điệp ẩn" },     // nhận từ khác, không biết mình là gián điệp
  { id: "known",  name: "Gián điệp biết" }    // biết vai + biết chủ đề, không nhận từ
];
(function initModes() {
  const saved = store.get("gd.modes", null);          // khoá mới: mảng
  const legacy = store.get("gd.mode", null);          // khoá cũ: 1 chuỗi
  let list = Array.isArray(saved) ? saved.filter(id => MODES.some(m => m.id === id)) : [];
  if (!list.length && MODES.some(m => m.id === legacy)) list = [legacy];
  if (!list.length) list = ["hidden"];
  state.modes = MODES.map(m => m.id).filter(id => list.indexOf(id) >= 0);   // giữ đúng thứ tự hiển thị
})();
/* ván này có dùng cặp từ không? (chế độ "biết" thuần tuý thì không) */
function usesPairs() { return state.modes.indexOf("hidden") >= 0; }
function isKnownMode() { return state.modes.length === 1 && state.modes[0] === "known"; }
function isMixedMode() { return state.modes.length > 1; }
/* được tích cả 2 chế độ chỉ khi chắc chắn có ≥ 2 gián điệp
   (ngẫu nhiên số gián điệp thì chưa biết trước → vẫn chỉ chọn 1) */
function canPickBothModes() { return !state.randomSpies && state.spies >= 2; }
function normalizeModes() {
  if (state.modes.length > 1 && !canPickBothModes()) {
    state.modes = state.modes.slice(0, 1);
    store.set("gd.modes", state.modes);
  }
}

/* chủ đề đang chọn (chọn được nhiều) — có đọc khoá cũ gd.topic để không mất cài đặt của bản trước */
(function initTopics() {
  const saved = store.get("gd.topics", null);
  const legacy = store.get("gd.topic", null);
  let ids = Array.isArray(saved) ? saved.filter(id => TOPICS.some(t => t.id === id)) : [];
  if (!ids.length && TOPICS.some(t => t.id === legacy)) ids = [legacy];
  if (!ids.length) ids = [TOPICS[0].id];
  state.topics = TOPICS.map(t => t.id).filter(id => ids.includes(id));   // giữ đúng thứ tự hiển thị
})();

function savePlayers() { store.set("gd.players", state.players); }

function renderPlayers() {
  const list = $("#playerList");
  list.innerHTML = "";
  state.players.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.id = p.id;
    row.innerHTML =
      '<div class="row-del">' +
        '<span class="dside left">' + ICON_TRASH + '<span>Xoá</span></span>' +
        '<span class="dside right"><span>Xoá</span>' + ICON_TRASH + '</span>' +
      '</div>' +
      '<div class="row-front">' +
        '<span class="idx">' + (i + 1) + '</span>' +
        '<span class="pname"></span>' +
        '<span class="handle">' + ICON_GRIP + '</span>' +
      '</div>';
    row.querySelector(".pname").textContent = p.name;
    list.appendChild(row);
  });
  $("#emptyHint").hidden = state.players.length > 0;
  const ok = state.players.length >= 3;
  $("#btnToSettings").disabled = !ok;
  $("#btnToSettings").textContent = ok ? "Tiếp tục" : "Cần ít nhất 3 người chơi";
  syncSpyLimit();
}

function addPlayer(name) {
  name = (name || "").trim().replace(/\s+/g, " ");
  if (!name) return;
  state.players.push({ id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: name });
  savePlayers();
  renderPlayers();
  const wrap = $("#listWrap");
  requestAnimationFrame(() => { wrap.scrollTop = wrap.scrollHeight; });
}

function removePlayer(id) {
  const i = state.players.findIndex(p => p.id === id);
  if (i < 0) return;
  const removed = state.players[i];
  const at = i;
  state.players.splice(i, 1);
  savePlayers();
  renderPlayers();
  toast('Đã xoá "' + removed.name + '"', "Hoàn tác", () => {
    state.players.splice(at, 0, removed);
    savePlayers(); renderPlayers();
  });
}

/* --- thêm tên --- */
const addRow = $("#addRow"), nameInput = $("#nameInput");
$("#btnAdd").onclick = () => {
  buzz(10);
  if (!addRow.hidden) { nameInput.focus(); return; }     // đang mở thì chỉ focus lại
  addRow.hidden = false;
  nameInput.value = "";
  nameInput.focus();
  setTimeout(() => nameInput.focus(), 60);
  setTimeout(() => { $("#listWrap").scrollTop = $("#listWrap").scrollHeight; }, 260);
};
function commitInput() {
  const v = nameInput.value.trim();
  if (!v) return;
  addPlayer(v);
  nameInput.value = "";
  buzz(12);
}
function closeAddRow() {
  commitInput();
  addRow.hidden = true;
  nameInput.blur();
}
/* dùng pointerdown: lúc đó list chưa dài ra nên nút chưa bị dịch chỗ */
$("#btnAddDone").addEventListener("pointerdown", e => { e.preventDefault(); closeAddRow(); });
$("#btnAddDone").addEventListener("click", () => { if (!addRow.hidden) closeAddRow(); });
nameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") { e.preventDefault(); commitInput(); }   // Enter: thêm tên, giữ ô nhập để gõ tiếp
});
/* chạm ra ngoài ô nhập → đóng */
$("#s-players").addEventListener("pointerdown", e => {
  if (addRow.hidden) return;
  if (e.target.closest("#addRow")) return;
  closeAddRow();
}, true);

/* --- vuốt phải để xoá + kéo để sắp xếp --- */
(function listGestures() {
  const list = $("#playerList");
  let sw = null, dg = null;

  list.addEventListener("pointerdown", e => {
    const row = e.target.closest(".row");
    if (!row) return;
    const handle = e.target.closest(".handle");
    if (handle) { startDrag(e, row, handle); return; }
    if (e.target.closest(".row-front")) {
      sw = { row, front: row.querySelector(".row-front"), x0: e.clientX, y0: e.clientY, active: false };
    }
  });

  function startDrag(e, row, handle) {
    const rows = $$(".row", list);
    const idx = rows.indexOf(row);
    if (idx < 0 || rows.length < 2) return;
    const step = (rows[1].offsetTop - rows[0].offsetTop) || (row.offsetHeight + 9);
    dg = { rows, idx, target: idx, y0: e.clientY, step, row };
    row.classList.add("dragging");
    row.style.transition = "none";
    try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    buzz(10);
  }

  window.addEventListener("pointermove", e => {
    if (sw) {
      const dx = e.clientX - sw.x0, dy = e.clientY - sw.y0;
      if (!sw.active) {
        if (Math.abs(dx) > 9 && Math.abs(dx) > Math.abs(dy) * 1.15) {
          sw.active = true;
          sw.front.style.transition = "none";
        } else if (Math.abs(dy) > 9) { sw = null; return; }
      }
      if (sw.active) {
        const d = Math.max(-999, Math.min(999, dx));
        sw.front.style.transform = "translateX(" + d + "px)";
        sw.row.classList.toggle("sw-right", d > 6);      // hiện chữ "Xoá" ở bên đang vuốt
        sw.row.classList.toggle("sw-left", d < -6);
      }
    } else if (dg) {
      const dy = e.clientY - dg.y0;
      const t = Math.max(0, Math.min(dg.rows.length - 1, dg.idx + Math.round(dy / dg.step)));
      dg.target = t;
      dg.row.style.transform = "translateY(" + dy + "px)";
      dg.rows.forEach((r, j) => {
        if (j === dg.idx) return;
        let shift = 0;
        if (dg.idx < t && j > dg.idx && j <= t) shift = -dg.step;
        else if (dg.idx > t && j < dg.idx && j >= t) shift = dg.step;
        r.style.transition = "transform .16s var(--ease)";
        r.style.transform = shift ? "translateY(" + shift + "px)" : "";
      });
    }
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    if (sw) {
      const width = sw.row.offsetWidth || 360;   // dự phòng khi chưa đo được layout
      const dx = parseFloat((sw.front.style.transform.match(/-?\d+(\.\d+)?/) || [0])[0]) || 0;
      if (sw.active && Math.abs(dx) > Math.min(120, width * 0.34)) {
        const id = sw.row.dataset.id;
        sw.front.style.transition = "transform .22s var(--ease)";
        sw.front.style.transform = "translateX(" + (dx > 0 ? 105 : -105) + "%)";
        setTimeout(() => removePlayer(id), 150);
      } else {
        sw.front.style.transition = "transform .26s var(--ease)";
        sw.front.style.transform = "";
      }
      sw.row.classList.remove("sw-right", "sw-left");
      sw = null;
      return;
    }
    if (dg) {
      const { rows, idx, target, row } = dg;
      rows.forEach(r => { r.style.transform = ""; r.style.transition = ""; });
      row.classList.remove("dragging");
      const d = dg; dg = null;
      if (d.target !== idx) {
        const moved = state.players.splice(idx, 1)[0];
        state.players.splice(target, 0, moved);
        savePlayers();
        renderPlayers();
        buzz(14);
      }
    }
  });
})();

/* ============================================================
   2. CÀI ĐẶT
   ============================================================ */
function maxSpies() { return Math.max(1, Math.floor((state.players.length - 1) / 2)); }
function spyPoolMax() { return Math.min(3, maxSpies()); }     // trần cho chế độ ngẫu nhiên
function resolveSpies() {
  return state.randomSpies ? 1 + Math.floor(Math.random() * spyPoolMax()) : state.spies;
}
function syncSpyLimit() {
  const mx = maxSpies();
  /* chỉ kẹp khi đã đủ người để chơi (≥3). Khi đang thêm dần tên hoặc
     danh sách rỗng thì giữ nguyên số đã lưu, khỏi bị ghi đè oan. */
  if (state.players.length >= 3) {
    if (state.spies > mx) { state.spies = mx; store.set("gd.spies", mx); }
    if (state.spies < 1) { state.spies = 1; store.set("gd.spies", 1); }
  }
  normalizeModes();                       // hết điều kiện ≥2 gián điệp → bỏ chế độ thừa
  const minus = $("#spyMinus"), plus = $("#spyPlus"), val = $("#spyVal");
  if (!val) return;
  val.textContent = state.randomSpies ? "?" : state.spies;
  minus.disabled = state.randomSpies || state.spies <= 1;
  plus.disabled = state.randomSpies || state.spies >= mx;
}

function renderSettings() {
  $("#timeVal").textContent = state.minutes + " phút";
  $("#timeMinus").disabled = state.minutes <= TIME_MIN;
  $("#timePlus").disabled = state.minutes >= TIME_MAX;

  const mbox = $("#modeChips");
  mbox.innerHTML = "";
  const both = canPickBothModes();          // ≥2 gián điệp → tích được cả 2 ô
  MODES.forEach(m => {
    const b = document.createElement("button");
    b.className = "chip" + (state.modes.indexOf(m.id) >= 0 ? " on" : "");
    b.textContent = m.name;
    b.setAttribute("aria-pressed", state.modes.indexOf(m.id) >= 0 ? "true" : "false");
    b.onclick = () => {
      buzz(10);
      if (both) {
        /* nhiều chế độ: bật/tắt từng ô, luôn giữ ít nhất 1 */
        if (state.modes.indexOf(m.id) >= 0) {
          if (state.modes.length === 1) { toast("Phải chọn ít nhất 1 chế độ"); return; }
          state.modes = state.modes.filter(x => x !== m.id);
        } else {
          state.modes = MODES.map(x => x.id).filter(id => state.modes.indexOf(id) >= 0 || id === m.id);
        }
      } else {
        /* 1 gián điệp (hoặc ngẫu nhiên): chỉ chọn 1 */
        if (state.modes.length === 1 && state.modes[0] === m.id) return;
        state.modes = [m.id];
      }
      store.set("gd.modes", state.modes);
      renderSettings();
    };
    mbox.appendChild(b);
  });
  renderModeHint();

  const sbox = $("#spyModeChips");
  sbox.innerHTML = "";
  (function () {
    const b = document.createElement("button");
    b.className = "chip" + (state.randomSpies ? " on" : "");
    b.textContent = "Ngẫu nhiên";
    b.onclick = () => {
      state.randomSpies = !state.randomSpies;
      store.set("gd.randomSpies", state.randomSpies);
      buzz(10);
      renderSettings();
    };
    sbox.appendChild(b);
  })();

  const tbox = $("#topicChips");
  tbox.innerHTML = "";
  TOPICS.forEach(t => {
    const on = state.topics.indexOf(t.id) >= 0;
    const b = document.createElement("button");
    b.className = "chip" + (on ? " on" : "");
    b.textContent = t.name;
    b.onclick = () => {
      buzz(10);
      if (on) {
        if (state.topics.length === 1) { toast("Chọn ít nhất 1 chủ đề"); return; }
        state.topics = state.topics.filter(x => x !== t.id);
      } else {
        state.topics = TOPICS.map(x => x.id).filter(id => state.topics.indexOf(id) >= 0 || id === t.id);
      }
      store.set("gd.topics", state.topics);
      renderSettings();
    };
    tbox.appendChild(b);
  });

  syncSpyLimit();

}
/* dòng giải thích bên dưới 2 ô chọn chế độ */
function renderModeHint() {
  const el = $("#modeHint");
  if (!el) return;
  let txt;
  if (canPickBothModes()) {
    txt = state.modes.length > 1
      ? "Đang dùng cả 2 chế độ: game tự chia ngẫu nhiên, mỗi bên ít nhất 1 gián điệp ẩn và 1 gián điệp biết."
      : "Có " + state.spies + " gián điệp — chọn thêm chế độ còn lại để ván này có cả gián điệp ẩn lẫn gián điệp biết.";
  } else if (state.randomSpies) {
    txt = "Số gián điệp đang để ngẫu nhiên nên chưa biết trước — chỉ chọn 1 chế độ.";
  } else {
    txt = "Chỉ có 1 gián điệp nên chọn 1 trong 2 chế độ. Từ 2 gián điệp trở lên mới chọn được cả 2.";
  }
  el.textContent = txt;
}
$("#spyMinus").onclick = () => { if (state.randomSpies) return; state.spies = Math.max(1, state.spies - 1); store.set("gd.spies", state.spies); buzz(10); renderSettings(); };
$("#spyPlus").onclick  = () => { if (state.randomSpies) return; state.spies = Math.min(maxSpies(), state.spies + 1); store.set("gd.spies", state.spies); buzz(10); renderSettings(); };
$("#timeMinus").onclick = () => { state.minutes = Math.max(TIME_MIN, state.minutes - 1); store.set("gd.minutes", state.minutes); buzz(10); renderSettings(); };
$("#timePlus").onclick  = () => { state.minutes = Math.min(TIME_MAX, state.minutes + 1); store.set("gd.minutes", state.minutes); buzz(10); renderSettings(); };
$("#btnShowWords").onclick = () => {
  buzz(10);
  const box = $("#wordListEl"), pool = selectedTopics();
  const sig = pool.map(t => t.id + ":" + t.words.length).join("|");
  if (box.dataset.sig !== sig) {
    box.innerHTML = "";
    pool.forEach(t => {
      if (pool.length > 1) {
        const h = document.createElement("div");
        h.className = "gtitle";
        h.textContent = t.name;
        box.appendChild(h);
      }
      t.words.forEach(w => { const el = document.createElement("span"); el.textContent = w; box.appendChild(el); });
    });
    box.dataset.sig = sig;
  }
  const words = pool.reduce((a, t) => a + t.words.length, 0);
  const used = pool.reduce((a, t) => a + memoryUsed(t), 0);
  const all = pool.reduce((a, t) => a + memoryTotal(t), 0);
  $("#wordsTitle").textContent = pool.length === 1
    ? pool[0].name + " · " + pool[0].words.length + " từ"
    : pool.length + " chủ đề · " + words + " từ";
  $("#wordsSub").textContent = used + " / " + all + (isKnownMode() ? " từ đã chơi" : " cặp từ đã chơi");
  $("#ovWords").classList.add("open");
};
$("#btnCloseWords").onclick = () => $("#ovWords").classList.remove("open");
$("#ovWords").addEventListener("click", e => { if (e.target.id === "ovWords") $("#ovWords").classList.remove("open"); });

$("#btnToSettings").onclick = () => { renderSettings(); show("s-settings"); };
$("#btnBackPlayers").onclick = () => show("s-players");
$("#btnStartDeal").onclick = () => { buzz(12); startDeal(); };

/* ============================================================
   3. CHIA TỪ
   ============================================================ */
function selectedTopics() { return TOPICS.filter(t => state.topics.indexOf(t.id) >= 0); }

/* ---------- bộ nhớ từ đã chơi: giữ trọn 1 vòng, dùng hết kho mới quay lại từ đầu ---------- */
function seenAll() {
  const v = store.get("gd.seen", {});
  return (v && typeof v === "object" && !Array.isArray(v)) ? v : {};
}
function seenFor(t) {
  const all = seenAll();
  const sig = t.pairs.length + ":" + t.words.length;      // đổi kho từ → quên hồ sơ cũ
  let rec = all[t.id];
  if (!rec || rec.sig !== sig || !Array.isArray(rec.pairs)) {
    rec = { sig: sig, pairs: [], singles: [] };
  }
  if (!Array.isArray(rec.singles)) rec.singles = [];      // hồ sơ của bản cũ
  all[t.id] = rec;
  store.set("gd.seen", all);
  return rec;
}
/* chế độ ẩn (hoặc cả 2): nhớ CẶP từ · chế độ biết thuần tuý: chỉ cần nhớ từ đơn */
function memoryUsed(t) {
  const rec = seenFor(t);
  return usesPairs() ? rec.pairs.length : rec.singles.length;
}
function memoryTotal(t) {
  return usesPairs() ? t.pairs.length : t.words.length;
}
function remember(t, key) {
  const all = seenAll();
  const rec = seenFor(t);
  const list = usesPairs() ? rec.pairs : rec.singles;
  if (list.indexOf(key) < 0) list.push(key);
  if (list.length >= memoryTotal(t)) {         // đã dùng hết kho của chủ đề → mở vòng mới
    if (usesPairs()) rec.pairs = [key]; else rec.singles = [key];
  }
  all[t.id] = rec;
  store.set("gd.seen", all);
}

function pickWords() {
  const pool = selectedTopics();
  const t = pool[Math.floor(Math.random() * pool.length)];        // random 1 chủ đề trong số đã chọn
  const list = t.words, n = list.length;
  const rec = seenFor(t);

  if (!usesPairs()) {
    /* gián điệp biết vai: chỉ dân nhận từ → bốc 1 từ */
    let idx = 0, wkey = "";
    for (let k = 0; k < 600; k++) {
      idx = Math.floor(Math.random() * n);
      wkey = "w" + idx;
      if (wkey === state.lastPair) continue;              // không lặp từ của ván liền trước
      if (rec.singles.indexOf(wkey) >= 0) continue;       // ưu tiên từ chưa chơi
      break;
    }
    state.words = { civil: list[idx], spy: "" };
    state.pickedTopic = t;
    state.lastPair = wkey;
    remember(t, wkey);
    return;
  }

  /* chế độ ẩn: bốc 1 CẶP từ có nhiều điểm chung (xem js/words.js) */
  const pairs = t.pairs, m = pairs.length;
  let pi = 0, key = "";
  for (let k = 0; k < 600; k++) {
    pi = Math.floor(Math.random() * m);
    key = t.id + ":p" + pi;                               // key mang mã chủ đề → không lẫn với chủ đề khác
    if (key === state.lastPair) continue;                 // không lặp lại cặp vừa chơi
    if (rec.pairs.indexOf(key) >= 0) continue;            // ưu tiên cặp chưa từng gặp
    break;
  }
  const a = pairs[pi][0], b = pairs[pi][1];
  /* cặp không quy định ai là gián điệp: random xem từ nào của dân, từ nào của gián điệp */
  const swap = Math.random() < 0.5;
  state.words = { civil: swap ? b : a, spy: swap ? a : b };
  state.pickedTopic = t;
  state.lastPair = key;
  remember(t, key);
}

function buildRoles() {
  const ids = state.players.map(p => p.id);
  const shuffled = ids.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  state.roles = {};
  ids.forEach(id => { state.roles[id] = "civil"; });
  state.spiesInGame = resolveSpies();                 // chế độ ngẫu nhiên: chốt số gián điệp ở đây
  state.spyMode = {};

  const spies = shuffled.slice(0, state.spiesInGame);
  /* kiểu gián điệp của từng người.
     - chọn 1 chế độ → mọi gián điệp cùng kiểu đó
     - chọn cả 2 (chỉ khi ≥2 gián điệp) → chia ngẫu nhiên, mỗi bên ít nhất 1 người */
  let kinds = state.modes.slice();
  if (kinds.length > 1 && spies.length < 2) {
    kinds = [kinds[Math.floor(Math.random() * kinds.length)]];   // dự phòng: lỡ chỉ có 1 gián điệp
  }
  const order = [];
  if (kinds.length === 2) {
    order.push(kinds[0], kinds[1]);                              // mỗi bên ít nhất 1 người
    while (order.length < spies.length) {
      order.push(kinds[Math.floor(Math.random() * kinds.length)]);
    }
    for (let i = order.length - 1; i > 0; i--) {                 // trộn lại cho khỏi đoán được
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  } else {
    for (let i = 0; i < spies.length; i++) order.push(kinds[0]);
  }
  spies.forEach((id, i) => { state.roles[id] = "spy"; state.spyMode[id] = order[i]; });
  state.alive = ids.slice();
}

function startDeal() {
  pickWords();
  buildRoles();
  state.round = 1;
  state.dealIndex = 0;
  state.peeked = {};
  state.remaining = state.minutes * 60000;
  show("s-deal");
  renderDeal();
}

let dealReveal = { big: "", spy: false, topic: "", note: "" }, clearWordTimer = null;

/* chế độ "biết": gián điệp thấy vai của mình + chủ đề + phải nghĩ ra 1 từ chung */
function revealFor(p) {
  const isSpy = state.roles[p.id] === "spy";
  if (isSpy && state.spyMode[p.id] === "known") {
    let note = "Nghĩ 1 từ chung nhất để không bị bắt";
    if (state.spiesInGame > 1) note += " · có thể còn gián điệp khác";
    return {
      big: "GIÁN ĐIỆP", spy: true,
      topic: "Chủ đề: " + (state.pickedTopic ? state.pickedTopic.name : ""),
      note: note
    };
  }
  return { big: state.words[isSpy ? "spy" : "civil"], spy: false, topic: "", note: "" };
}
function renderDeal() {
  const p = state.players[state.dealIndex];
  if (!p) return;
  $("#dealProgress").textContent = (state.dealIndex + 1) + " / " + state.players.length;
  $("#cardName").textContent = p.name;
  dealReveal = revealFor(p);
  clearTimeout(clearWordTimer);
  clearPanel();                       // nội dung không nằm trong DOM khi chưa lật thẻ
  const card = $("#dealCard");
  card.style.transition = "none";
  card.style.transform = "translateY(0)";
  setReveal(0);
  const last = state.dealIndex === state.players.length - 1;
  const btn = $("#btnNextPlayer");
  btn.textContent = last ? "Bắt đầu chơi" : "Người tiếp theo";
  btn.disabled = !state.peeked[p.id];
}

/* --- reveal : kéo thẻ lên --- */
const stageEl = $("#stage"), cardEl = $("#dealCard"), panelEl = $("#wordPanel"), wordEl = $("#panelWord");
const topicEl = $("#panelTopic"), noteEl = $("#panelNote");
function clearPanel() {
  wordEl.textContent = "";
  wordEl.classList.remove("spy");
  topicEl.textContent = ""; topicEl.hidden = true;
  noteEl.textContent = ""; noteEl.hidden = true;
}
function setReveal(p) {
  if (p > 0.02 && wordEl.textContent !== dealReveal.big) {
    wordEl.textContent = dealReveal.big;
    wordEl.classList.toggle("spy", dealReveal.spy);
    topicEl.textContent = dealReveal.topic; topicEl.hidden = !dealReveal.topic;
    noteEl.textContent = dealReveal.note; noteEl.hidden = !dealReveal.note;
  }
  panelEl.style.opacity = String(Math.min(1, p * 1.5));
  panelEl.style.transform = "scale(" + (0.93 + 0.07 * Math.min(1, p * 1.7)) + ")";
}
(function cardDrag() {
  const stage = stageEl, card = cardEl;
  let d = null;

  card.addEventListener("pointerdown", e => {
    if (!$("#s-deal").classList.contains("active")) return;   // chỉ nhận khi đang ở màn chia từ
    const p = state.players[state.dealIndex];
    if (!p) return;
    clearTimeout(clearWordTimer);
    d = { y0: e.clientY, H: stage.offsetHeight, max: 0 };
    card.style.transition = "none";
    card.style.cursor = "grabbing";
    try { card.setPointerCapture(e.pointerId); } catch (err) {}
  });

  card.addEventListener("pointermove", e => {
    if (!d || !$("#s-deal").classList.contains("active")) return;
    let dy = e.clientY - d.y0;
    if (dy > 0) dy = dy * 0.18;
    dy = Math.max(-d.H, Math.min(0, dy));
    d.max = Math.max(d.max, -dy);
    card.style.transform = "translateY(" + dy + "px)";
    setReveal(Math.min(1, -dy / (d.H * 0.72)));
  });

  function release() {
    if (!d) return;
    const p = state.players[state.dealIndex];
    const revealed = d.max > d.H * 0.42;
    d = null;
    card.style.cursor = "grab";
    card.style.transition = "transform .58s cubic-bezier(.2,1.28,.36,1)";
    card.style.transform = "translateY(0)";
    setReveal(0);
    clearTimeout(clearWordTimer);
    clearWordTimer = setTimeout(clearPanel, 620);   // xoá khỏi DOM sau khi thẻ đóng
    if (revealed && p && !state.peeked[p.id]) {
      state.peeked[p.id] = true;
      $("#btnNextPlayer").disabled = false;
      buzz(18);
    }
  }
  card.addEventListener("pointerup", release);
  card.addEventListener("pointercancel", release);
})();

$("#btnNextPlayer").onclick = () => {
  const last = state.dealIndex === state.players.length - 1;
  if (last) { startGame(); return; }
  state.dealIndex++;
  buzz(10);
  renderDeal();
};

/* ============================================================
   4. CHƠI + TIMER
   ============================================================ */
const CIRC = 2 * Math.PI * 118;
$("#ringFg").style.strokeDasharray = CIRC;

function fmt(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}
function renderTimer() {
  const total = state.minutes * 60000;
  $("#timerText").textContent = fmt(state.remaining);
  $("#timerText").classList.toggle("low", state.remaining <= 30000);
  $("#ringFg").style.strokeDashoffset = String(CIRC * (1 - Math.max(0, Math.min(1, state.remaining / total))));
  $("#timerLabel").textContent = state.running ? "Thảo luận" : "Tạm dừng";
}
function renderGame() {
  $("#gameRound").textContent = "Lượt " + state.round;
  $("#gameAlive").textContent = "Còn " + state.alive.length + " người";
  const row = $("#gameRoster");
  row.innerHTML = "";
  state.players.forEach(p => {                       // full danh sách; bị loại thì mờ + hiện vai đã lộ
    const out = state.alive.indexOf(p.id) < 0;
    const spy = state.roles[p.id] === "spy";
    const c = document.createElement("span");
    c.className = "pchip" + (out ? " out" : "");
    const sn = document.createElement("span"); sn.className = "pn"; sn.textContent = p.name;
    c.appendChild(sn);
    if (out) {
      const rl = document.createElement("span");
      rl.className = "prole" + (spy ? " spy" : "");
      rl.textContent = spy ? "Gián điệp" : "Dân";
      c.appendChild(rl);
    }
    row.appendChild(c);
  });
  renderTimer();
}

function startTimer() {
  state.endAt = Date.now() + state.remaining;
  state.running = true;
  clearInterval(tickId);
  tickId = setInterval(tick, 200);
  renderTimer();
}
function stopTimer() {
  if (state.running) state.remaining = Math.max(0, state.endAt - Date.now());
  state.running = false;
  clearInterval(tickId); tickId = null;
  renderTimer();
}
function tick() {
  state.remaining = Math.max(0, state.endAt - Date.now());
  renderTimer();
  if (state.remaining <= 0) { stopTimer(); timeUp(); }
}

function startGame() {
  state.round = 1;
  state.alive = state.players.map(p => p.id);
  state.remaining = state.minutes * 60000;
  show("s-game");
  renderGame();
  startTimer();
}

function timeUp() {
  state.timeUp = true;
  buzz([40, 80, 40]);
  openPause(true);
}

/* --- overlay pause --- */
function openPause(isTimeUp) {
  state.timeUp = !!isTimeUp;
  $("#pauseTitle").textContent = isTimeUp ? "Hết giờ!" : "Đang tạm dừng";
  $("#btnResume").textContent = isTimeUp ? "Cộng thêm 1 phút" : "Tiếp tục";
  $("#ovPause").classList.add("open");
}
function closePause() { $("#ovPause").classList.remove("open"); }

$("#btnPause").onclick = () => { stopTimer(); buzz(12); openPause(false); };
$("#btnResume").onclick = () => {
  closePause();
  if (state.timeUp || state.remaining <= 0) { state.remaining = 60000; state.timeUp = false; }
  startTimer();
};
$("#btnGoVote").onclick = () => { closePause(); state.timeUp = false; openVote(); };
$("#btnQuitGame").onclick = () => {
  closePause();
  finish(state.alive.some(id => state.roles[id] === "spy") ? "spy" : "civil");
};

/* ============================================================
   5. VOTE
   ============================================================ */
let votes = {};      // id -> số phiếu
let voteOrder = [];  // thứ tự đã chạm
let voteLocked = false;

function openVote() {
  stopTimer();
  votes = {}; voteOrder = []; voteLocked = false;
  state.alive.forEach(id => { votes[id] = 0; });
  renderVote();
  show("s-vote");
}
function totalVotes() { return Object.values(votes).reduce((a, b) => a + b, 0); }
function renderVote() {
  const box = $("#voteList");
  const n = state.alive.length;
  const tot = totalVotes();
  const max = Math.max(0, ...Object.values(votes));
  box.innerHTML = "";
  state.alive.forEach(id => {
    const p = state.players.find(x => x.id === id);
    if (!p) return;
    const r = document.createElement("div");
    r.className = "vrow" + (votes[id] > 0 ? " hasvotes" : "") + (max > 0 && votes[id] === max ? " lead" : "");
    r.innerHTML = '<span class="vname"></span><span class="vcount' + (votes[id] ? " on" : "") + '">' + votes[id] + '</span>' +
                  '<i class="vbars" style="transform:scaleX(' + (n ? votes[id] / n : 0) + ')"></i>';
    r.querySelector(".vname").textContent = p.name;
    r.onclick = () => addVote(id);
    box.appendChild(r);
  });
  $("#voteProgress").textContent = tot + " / " + n + " phiếu";
  $("#voteBar").style.width = (n ? (tot / n) * 100 : 0) + "%";
  $("#btnUndoVote").disabled = voteOrder.length === 0 || voteLocked;
  $("#btnClearVote").disabled = voteOrder.length === 0 || voteLocked;
}
function addVote(id) {
  if (voteLocked) return;
  if (totalVotes() >= state.alive.length) return;
  votes[id]++; voteOrder.push(id);
  buzz(9);
  renderVote();
  if (totalVotes() >= state.alive.length) {
    voteLocked = true;
    renderVote();
    setTimeout(evaluateVote, 480);
  }
}
$("#btnUndoVote").onclick = () => {
  if (voteLocked) return;
  const id = voteOrder.pop();
  if (id) { votes[id] = Math.max(0, votes[id] - 1); buzz(9); renderVote(); }
};
$("#btnClearVote").onclick = () => {
  if (voteLocked) return;
  voteOrder = []; state.alive.forEach(id => { votes[id] = 0; }); buzz(9); renderVote();
};

function evaluateVote() {
  const max = Math.max(...state.alive.map(id => votes[id]));
  const leaders = state.alive.filter(id => votes[id] === max);
  if (leaders.length === 1) { eliminate(leaders[0], max); return; }
  openResult({                                  // hoà phiếu: không loại ai
    title: "Hoà phiếu",
    text: leaders.map(id => nameOf(id)).join(", ") + " — " + max + " phiếu mỗi người.",
    acts: [
      { label: "Tiếp tục chơi", cls: "primary", fn: () => { closeResult(); resumeAfterVote(); } },
      { label: "Vote lại", cls: "", fn: () => { closeResult(); resetVoteCounts(); renderVote(); } }
    ]
  });
}

/* hoà phiếu → quay lại ván, đồng hồ chạy tiếp từ chỗ đã dừng */
function resumeAfterVote() {
  if (state.remaining <= 0) { state.remaining = 60000; state.timeUp = false; }  // đã hết giờ thì cộng thêm 1 phút
  show("s-game");
  renderGame();
  startTimer();
  buzz(12);
}

function resetVoteCounts() {
  votes = {}; voteOrder = []; voteLocked = false;
  state.alive.forEach(id => { votes[id] = 0; });
}
function nameOf(id) { const p = state.players.find(x => x.id === id); return p ? p.name : "?"; }

function eliminate(id, count) {
  const wasSpy = state.roles[id] === "spy";
  state.alive = state.alive.filter(x => x !== id);
  const spiesLeft = state.alive.filter(x => state.roles[x] === "spy").length;
  const civilsLeft = state.alive.length - spiesLeft;

  if (wasSpy && spiesLeft === 0) {
    openVerdict(true, nameOf(id), [
      { label: "Xem kết quả", cls: "primary", fn: () => { closeVerdict(); finish("civil"); } }
    ]);
    return;
  }
  /* luật: gián điệp thắng khi số gián điệp còn sống ≥ số dân còn sống */
  if (spiesLeft >= civilsLeft) {
    openVerdict(wasSpy, nameOf(id), [
      { label: "Xem kết quả", cls: "primary", fn: () => { closeVerdict(); finish("spy"); } }
    ]);
    return;
  }
  openVerdict(wasSpy, nameOf(id), [
    { label: "Vòng tiếp theo", cls: "primary", fn: () => { closeVerdict(); nextRound(); } }
  ]);
}
function nextRound() {
  state.round++;
  state.remaining = state.minutes * 60000;
  show("s-game");
  renderGame();
  startTimer();
}

/* ---------- result overlay ---------- */
function openResult(o) {
  $("#resTitle").textContent = o.title;
  $("#resText").textContent = o.text;
  const box = $("#resActs");
  box.innerHTML = "";
  o.acts.forEach(a => {
    const b = document.createElement("button");
    b.className = "btn " + (a.cls || "");
    b.textContent = a.label;
    b.onclick = a.fn;
    box.appendChild(b);
  });
  $("#ovResult").classList.add("open");
}
function closeResult() { $("#ovResult").classList.remove("open"); }

/* vote thành công: màn hình to giữa màn, xanh = bắt đúng gián điệp, đỏ = bắt nhầm (không dùng emoji) */
const ICON_OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4.6 12.7l5 5L19.4 6.6"/></svg>';
const ICON_BAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8"/></svg>';
function openVerdict(isSpy, name, acts) {
  const ov = $("#ovVerdict");
  ov.classList.toggle("ok", !!isSpy);
  ov.classList.toggle("bad", !isSpy);
  $("#vIcon").innerHTML = isSpy ? ICON_OK : ICON_BAD;
  $("#vWord").textContent = isSpy ? "LÀ GIÁN ĐIỆP" : "KHÔNG PHẢI GIÁN ĐIỆP";
  $("#vName").textContent = name;
  const box = $("#vActs");
  box.innerHTML = "";
  acts.forEach(a => {
    const b = document.createElement("button");
    b.className = "btn " + (a.cls || "");
    b.textContent = a.label;
    b.onclick = a.fn;
    box.appendChild(b);
  });
  ov.classList.add("open");
}
function closeVerdict() { $("#ovVerdict").classList.remove("open"); }

/* ============================================================
   6. KẾT THÚC
   ============================================================ */
function finish(winner) {
  stopTimer();
  state.winner = winner;                           // không công bố trên màn hình, chỉ lưu để kiểm thử
  show("s-end");
  const rev = $("#spyReveal");                     // chỉ chế độ ngẫu nhiên mới có dòng này
  rev.hidden = !state.randomSpies;
  rev.textContent = (state.spiesInGame || state.spies) + " gián điệp";
  $("#endCivil").textContent = state.words.civil;
  $("#endSpy").textContent = state.words.spy;
  $("#cardCivil").classList.remove("shown");      // từ bị ẩn, chạm vào mới hiện
  $("#cardSpy").classList.remove("shown");
  const known = !usesPairs();                   // chế độ "biết" thuần tuý: gián điệp không có từ để lộ
  $("#cardSpy").hidden = known;
  $("#wordGrid").classList.toggle("single", known);
  /* chế độ cả 2: từ kia chỉ là của gián điệp ẩn, gián điệp biết tự nghĩ từ riêng */
  $("#endSpyLabel").textContent = isMixedMode() ? "Từ của gián điệp ẩn" : "Từ của gián điệp";

  const box = $("#endList");
  box.innerHTML = "";
  state.players.forEach(p => {
    const spy = state.roles[p.id] === "spy";
    const out = state.alive.indexOf(p.id) < 0;
    const r = document.createElement("div");       // bị loại thì mờ cả card, không ghi chữ gì thêm
    r.className = "rrow" + (out ? " out" : "");
    let tag = spy ? "Gián điệp" : "Dân";
    if (isMixedMode()) {
      tag = spy ? (state.spyMode[p.id] === "known" ? "Gián điệp biết" : "Gián điệp ẩn") : "Dân";
    }
    r.innerHTML = '<span class="n"></span><span class="tag ' + (spy ? "spy" : "civ") + '">' + tag + '</span>';
    r.querySelector(".n").textContent = p.name;
    box.appendChild(r);
  });
  buzz(winner === "spy" ? [30, 60, 30] : 25);
}

$("#btnPlayAgain").onclick = () => { buzz(12); startDeal(); };
$("#btnHome").onclick = () => { renderPlayers(); show("s-players"); };

/* ---------- màn kết thúc: chạm vào ô từ mới hiện ---------- */
["#cardCivil", "#cardSpy"].forEach(sel => {
  $(sel).addEventListener("click", () => {
    buzz(10);
    $(sel).classList.toggle("shown");
  });
});

/* ---------- init ---------- */
if (location.hash === "#debug") window.__gd = state;   /* hook kiểm thử, bình thường không lộ gì */
renderPlayers();
renderSettings();
document.addEventListener("gesturestart", e => e.preventDefault());
document.addEventListener("dblclick", e => e.preventDefault(), { passive: false });
document.addEventListener("visibilitychange", () => {
  if (document.hidden && state.running) { stopTimer(); if ($("#s-game").classList.contains("active")) openPause(false); }
});
