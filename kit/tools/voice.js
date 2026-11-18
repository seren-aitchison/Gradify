// The device's own voice (Web Speech), as promises: speak a line and wait for it to finish, pause, stop.
// Used by the explainer videos, chant podcasts and audio questions. No voice on this device: lines are shown and
// timed by their length instead, so everything still plays.
const synth = () => (typeof window !== "undefined" ? window.speechSynthesis : null);
export const canSpeak = () => Boolean(synth());
let voiceName = "";
try { voiceName = localStorage.getItem("gradify.voice") || ""; } catch { /* fine */ }
export const voices = () => (synth()?.getVoices() || []).filter((v) => /^en/i.test(v.lang));
export function setVoice(name) { voiceName = name; try { localStorage.setItem("gradify.voice", name); } catch { /* fine */ } }
export const voiceName_ = () => voiceName;

/** A <select> of the device's English voices, kept up to date as they load. */
export function voicePicker(sel) {
  const fill = () => { sel.innerHTML = `<option value="">Your device's voice</option>${voices().map((v) => `<option ${v.name === voiceName ? "selected" : ""}>${v.name.replace(/[<>&"]/g, "")}</option>`).join("")}`; };
  fill(); if (synth()) synth().addEventListener?.("voiceschanged", fill);
  sel.addEventListener("change", () => setVoice(sel.value));
}

let token = 0;
/** Say `text`. Resolves when it's been said (or would have been), or when stop() is called. */
export function speak(text, { rate = 1, pitch = 1 } = {}) {
  const my = token, s = synth(), ms = Math.max(1200, String(text).split(/\s+/).length * 380 / rate);
  if (!s) return new Promise((ok) => setTimeout(ok, ms));
  return new Promise((ok) => {
    const u = new SpeechSynthesisUtterance(String(text));
    const v = voices().find((x) => x.name === voiceName); if (v) u.voice = v;
    u.rate = rate; u.pitch = pitch; u.lang = v?.lang || "en-GB";
    // some browsers never fire end: a generous timer finishes the line anyway
    const t = setTimeout(done, ms * 2.5 + 2000);
    function done() { clearTimeout(t); ok(my === token); }
    u.onend = done; u.onerror = done;
    s.speak(u);
  });
}
/** Wait, unless stopped first. */
export const wait = (ms) => { const my = token; return new Promise((ok) => setTimeout(() => ok(my === token), ms)); };
/** Stop everything that's speaking or waiting: their promises resolve false. */
export function stop() { token++; synth()?.cancel(); }
export const pause = () => synth()?.pause();
export const resume = () => synth()?.resume();
