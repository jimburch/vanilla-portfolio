// 3D tilt effect for bento nodes (desktop only)
document.addEventListener("DOMContentLoaded", function () {
  // Hidden message for curious developers! 🕵️‍♂️
  console.log(
    "\n\n%cAha! You pressed cmd+option+j (or something) and found my hidden message!\n\n%cUsually tech companies will put their jobs link here but\n\n%cI\n%cam\n%cnot\n%ca\n%ctech\n%ccompany\n\n%cI am simply Jim, so all I have for you is...hello 👋",
    "color: #ff6b6b; font-weight: bold; font-size: 18px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
    "color: #4ecdc4; font-style: italic; font-size: 14px;",
    "color: #ff9ff3; font-weight: bold; font-size: 16px; text-decoration: underline;",
    "color: #54a0ff; font-weight: bold; font-size: 16px; text-decoration: underline;",
    "color: #5f27cd; font-weight: bold; font-size: 16px; text-decoration: underline;",
    "color: #00d2d3; font-weight: bold; font-size: 16px; text-decoration: underline;",
    "color: #ff9f43; font-weight: bold; font-size: 16px; text-decoration: underline;",
    "color: #ee5a24; font-weight: bold; font-size: 16px; text-decoration: underline;",
    "color: #2ed573; font-weight: bold; font-size: 20px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);"
  );

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
