var isEn = document.documentElement.lang === "en";
var ui = isEn
  ? { play: "Play", pause: "Pause", light: "Light", dark: "Dark", toLight: "Switch to light theme", toDark: "Switch to dark theme" }
  : { play: "Lecture", pause: "Mettre en pause", light: "Clair", dark: "Sombre", toLight: "Passer au thème clair", toDark: "Passer au thème sombre" };
(function () {
  document.querySelectorAll("[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("pactulys-lang", a.getAttribute("data-lang")); } catch (e) {}
    });
  });
})();
(function () {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -10% 0px" });
  els.forEach(function (e) { io.observe(e); });
})();
(function () {
  var art = document.getElementById("hero-art"), btn = document.getElementById("story-btn");
  if (!art || !btn) return;
  var userPaused = false, inView = false;
  var sync = function () {
    art.classList.toggle("is-paused", userPaused || !inView);
    btn.textContent = userPaused ? ui.play : ui.pause;
    btn.setAttribute("aria-pressed", String(userPaused));
  };
  sync();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(art);
  } else { inView = true; sync(); }
  btn.addEventListener("click", function () { userPaused = !userPaused; sync(); });
})();
(function () {
  var root = document.documentElement, btn = document.getElementById("theme-btn");
  if (!btn) return;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  var cur = function () { return root.getAttribute("data-theme") || (mq.matches ? "dark" : "light"); };
  var metas = document.querySelectorAll('meta[name="theme-color"]');
  var sync = function () {
    var d = cur() === "dark";
    root.classList.toggle("is-dark", d);
    btn.querySelector(".theme-label").textContent = d ? ui.light : ui.dark;
    btn.setAttribute("aria-label", d ? ui.toLight : ui.toDark);
    metas.forEach(function (m) { m.setAttribute("content", d ? "#0f1a17" : "#f3ece0"); });
  };
  btn.addEventListener("click", function () {
    var next = cur() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("pactulys-theme", next); } catch (e) {}
    sync();
  });
  if (mq.addEventListener) mq.addEventListener("change", sync);
  sync();
})();
