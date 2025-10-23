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
