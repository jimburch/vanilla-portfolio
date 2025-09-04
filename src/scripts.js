// 3D tilt effect for bento nodes (desktop only)
document.addEventListener("DOMContentLoaded", function () {
  const bentoNodes = document.querySelectorAll(".bento-container > a");

  // Only enable 3D tilt on devices that support hover
  const isDesktop = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (!isDesktop) return;

  bentoNodes.forEach((node) => {
    node.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.1s ease-out";
    });

    node.addEventListener("mouseleave", function () {
      this.style.transition = "transform 0.5s ease-out";
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    node.addEventListener("mousedown", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.97)";
    });

    node.addEventListener("mouseup", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    // Touch events for mobile
    node.addEventListener("touchstart", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.97)";
    });

    node.addEventListener("touchend", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    node.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation angles (subtle tilt)
      const rotateY = (mouseX / rect.width) * 10; // Max 10 degrees
      const rotateX = -(mouseY / rect.height) * 10; // Max 10 degrees, negative for natural tilt

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
});
