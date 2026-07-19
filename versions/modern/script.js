document.getElementById("year").textContent = new Date().getFullYear();

// Nav background on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Scroll-triggered reveals
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".reveal");

if (reduceMotion) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => io.observe(el));
}

// Ambient embers in the hero
const emberField = document.getElementById("embers");
if (emberField && !reduceMotion) {
  const count = 16;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.className = "ember-dot";
    const size = 3 + Math.random() * 4;
    dot.style.setProperty("--s", `${size}px`);
    dot.style.setProperty("--x", `${55 + Math.random() * 40}%`);
    dot.style.setProperty("--d", `${Math.random() * 7}s`);
    dot.style.setProperty("--drift", `${(Math.random() - 0.5) * 60}px`);
    dot.style.animationDuration = `${6 + Math.random() * 4}s`;
    emberField.appendChild(dot);
  }
}
