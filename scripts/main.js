document.addEventListener("DOMContentLoaded", () => {
  // ===== Navigation drawer =====
  const navToggle = document.getElementById("nav-toggle");
  const navDrawer = document.getElementById("nav-drawer");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  let isOpen = false;

  function openDrawer() {
    navOverlay.classList.remove("hidden");
    gsap.to(navDrawer, { y: 0, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      navLinks,
      { opacity: 0, y: 40, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.12,
        ease: "back.out(1.7)",
      }
    );
    isOpen = true;
  }

  function closeDrawer() {
    gsap.to(navDrawer, {
      y: "-100vh",
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        navOverlay.classList.add("hidden");
        navLinks.forEach((link) => {
          link.style.opacity = "";
          link.style.transform = "";
        });
      },
    });
    isOpen = false;
  }

  navToggle.addEventListener("click", () => {
    if (!isOpen) openDrawer();
    else closeDrawer();
  });
  navOverlay.addEventListener("click", closeDrawer);

  // ===== Split-title animation =====
  const titles = document.querySelectorAll(".split-title");
  const text = document.querySelectorAll(".split-title");

  titles.forEach((title, index) => {
    const text = title.textContent.trim();
    title.textContent = "";

    const chars = Array.from(text);
    chars.forEach((ch) => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.className = "char";
      title.appendChild(span);
    });

    gsap.fromTo(
      title.querySelectorAll(".char"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.6,
        delay: index * 0.5,
      }
    );
  });
});

// ===== Slick Slider Initialization =====
$(".workout-slider").slick({
  centerMode: true,
  centerPadding: "550px" /* show side previews */,
  slidesToShow: 1,
  arrows: true,
  dots: false,
  infinite: true,
  speed: 600,
  responsive: [
    {
      breakpoint: 1024,
      slidesToShow: 1,
      settings: {
        centerPadding: "550px",
      },
    },
    {
      breakpoint: 768,
      slidesToShow: 1,
      settings: {
        centerPadding: "550px",
      },
    },
    {
      breakpoint: 480,
      slidesToShow: 1,
      settings: {
        centerMode: false,
        centerPadding: "550px",
      },
    },
  ],
});

// ======== compare slide ==========

// Before/After compare slider control (clean, updates only CSS var)
(function () {
  const wrap = document.querySelector(".compare-wrap");
  if (!wrap) return;
  const range = wrap.querySelector(".compare-range");
  const handle = wrap.querySelector(".compare-handle");

  // clamp helper
  const clamp = (v, a = 0, b = 100) => Math.min(b, Math.max(a, v));

  function setPercent(p) {
    p = clamp(p);
    wrap.style.setProperty("--compare-percent", p + "%");
    if (range) range.value = Math.round(p);
  }

  if (range) range.addEventListener("input", (e) => setPercent(e.target.value));

  wrap.addEventListener("click", (e) => {
    const rect = wrap.getBoundingClientRect();
    const p = ((e.clientX - rect.left) / rect.width) * 100;
    setPercent(p);
  });

  let dragging = false;
  handle.style.touchAction = "none";
  handle.addEventListener("pointerdown", (e) => {
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const rect = wrap.getBoundingClientRect();
    const p = ((e.clientX - rect.left) / rect.width) * 100;
    setPercent(p);
  });
  window.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    try {
      handle.releasePointerCapture(e.pointerId);
    } catch {}
  });

  setPercent(range ? range.value : 50);
})();
try {
  if (typeof BeerSlider !== "undefined") {
    const el = document.getElementById("beer-slider");
    if (el)
      new BeerSlider(el, { start: parseInt(el.dataset.beerStart || 50, 10) });
  }
} catch (err) {}

// ===== Blog Section =====

$(".blog-slider").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  arrows: true,
  dots: false,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
});
