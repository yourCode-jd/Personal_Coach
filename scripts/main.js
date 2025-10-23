// Navigation drawer logic (unchanged)
const navToggle = document.getElementById("nav-toggle");
const navDrawer = document.getElementById("nav-drawer");
const navOverlay = document.getElementById("nav-overlay");
const navLinks = document.querySelectorAll(".gsap-nav-link");
let isOpen = false;

gsap.set(navDrawer, { y: "-100vh" });

function openDrawer() {
  navOverlay.classList.remove("hidden");
  navDrawer.classList.remove("translate-x-full");
  navDrawer.classList.add("translate-x-0");
  gsap.to(navDrawer, { y: 0, duration: 0.22, ease: "power2.out" });

  // Navigation links: fade in, slide up, and scale up for a pop effect
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
      delay: 0.1,
    }
  );
  isOpen = true;
}

function closeDrawer() {
  gsap.to(navDrawer, {
    y: "-100vh",
    duration: 0.22,
    ease: "power2.in",
    onComplete: () => {
      navDrawer.classList.remove("translate-x-0");
      navDrawer.classList.add("translate-x-full");
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
