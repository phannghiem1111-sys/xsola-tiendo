// Google Apps Script – lưu tiến độ Xsola vào Google Sheet.
// Dán toàn bộ file này vào Extensions > Apps Script của Google Sheet, rồi Deploy > Web app.
const SHEETS = ["progress", "tasks"];
const HEAD = ["id", "trang_thai", "ngay", "ghi_chu", "json", "cap_nhat"];

function sh_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.appendRow(HEAD); s.setFrozenRows(1); }
  return s;
}

function doGet() {
  const out = { progress: {}, tasks: {} };
  SHEETS.forEach(function (n) {
    const v = sh_(n).getDataRange().getValues();
    for (let i = 1; i < v.length; i++) {
      try { out[n][v[i][0]] = JSON.parse(v[i][4]); } catch (e) {}
    }
  });
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const m = JSON.parse(e.postData.contents);
    if (m.action !== "set" || SHEETS.indexOf(m.coll) < 0 || !m.id) throw new Error("bad request");
    const s = sh_(m.coll);
    const last = s.getLastRow();
    const ids = last > 0 ? s.getRange(1, 1, last, 1).getValues().map(function (r) { return String(r[0]); }) : [];
    const row = ids.indexOf(String(m.id)) + 1;
    const d = m.data || {};
    const vals = [m.id, d.s || (d.done ? "done" : ""), d.d || "", d.n || "", JSON.stringify(d), new Date()];
    if (row > 0) s.getRange(row, 1, 1, vals.length).setValues([vals]); else s.appendRow(vals);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
