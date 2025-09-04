// 3D tilt effect for bento nodes
document.addEventListener("DOMContentLoaded", function () {
  const bentoLinks = document.querySelectorAll(".bento-container > a");

  bentoLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.1s ease-out";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transition = "transform 0.5s ease-out";
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    link.addEventListener("mousemove", function (e) {
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
