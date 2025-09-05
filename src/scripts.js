document.addEventListener("DOMContentLoaded", function () {
  // Fun console log
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
  const isDesktop = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (!isDesktop) return;

  // Track which node is currently being hovered
  let activeNode = null;

  // Function to reset all nodes except the active one
  function resetInactiveNodes() {
    bentoNodes.forEach((node) => {
      if (node !== activeNode && node.tiltState) {
        node.tiltState.settings.scale = 1;
        node.style.transform = `perspective(${node.tiltState.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

        if (node.tiltState.settings.glare && node.glareElement) {
          node.glareElement.style.transform =
            "rotate(180deg) translate(-50%, -50%)";
          node.glareElement.style.opacity = "0";
        }
      }
    });
  }

  // different tilt values for different node sizes
  function getMaxTiltForNode(node) {
    const classList = node.classList;

    if (classList.contains("bento-4x4")) {
      return 25;
    } else if (
      classList.contains("bento-2x4") ||
      classList.contains("bento-4x2")
    ) {
      return 25;
    } else if (classList.contains("bento-2x2")) {
      return 35;
    }
    return 10;
  }

  bentoNodes.forEach((node) => {
    node.tiltState = {
      ticking: false,
      mousePositions: { x: 0, y: 0 },
      settings: {
        maxTilt: getMaxTiltForNode(node),
        perspective: 1000,
        speed: 400,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale: 1.05,
        reset: true,
        glare: true,
        maxGlare: 0.3,
      },
    };

    function prepareGlare() {
      if (!this.tiltState.settings.glare) return;

      const glareWrapper = document.createElement("div");
      glareWrapper.className = "js-tilt-glare";

      const glareElement = document.createElement("div");
      glareElement.className = "js-tilt-glare-inner";
      glareWrapper.appendChild(glareElement);

      this.appendChild(glareWrapper);

      this.glareElementWrapper = glareWrapper;
      this.glareElement = glareElement;

      const stretch = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "pointer-events": "none",
        "border-radius": "inherit",
      };

      Object.assign(glareWrapper.style, stretch);

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;

      Object.assign(glareElement.style, {
        position: "absolute",
        top: "50%",
        left: "50%",
        "background-image":
          "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
        width: `${size}px`,
        height: `${size}px`,
        transform: "rotate(180deg) translate(-50%, -50%)",
        "transform-origin": "0% 0%",
        opacity: "0",
        "border-radius": "50%",
      });
    }

    const requestTick = function () {
      if (this.tiltState.ticking) return;
      requestAnimationFrame(updateTransforms.bind(this));
      this.tiltState.ticking = true;
    };

    const updateTransforms = function () {
      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = this.tiltState.mousePositions.x - centerX;
      const mouseY = this.tiltState.mousePositions.y - centerY;

      const rotateY = (mouseX / rect.width) * this.tiltState.settings.maxTilt;
      const rotateX = -(mouseY / rect.height) * this.tiltState.settings.maxTilt;

      const angle = Math.atan2(mouseX, -mouseY) * (180 / Math.PI);
      const percentageY =
        (this.tiltState.mousePositions.y - rect.top) / rect.height;
      const glareOpacity = percentageY * this.tiltState.settings.maxGlare;

      this.style.transform = `perspective(${this.tiltState.settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.tiltState.settings.scale}, ${this.tiltState.settings.scale}, ${this.tiltState.settings.scale})`;

      if (this.tiltState.settings.glare && this.glareElement) {
        this.glareElement.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`;
        this.glareElement.style.opacity = glareOpacity;
      }

      this.tiltState.ticking = false;
    };

    const setTransition = function () {
      if (this.tiltTimeout !== undefined) clearTimeout(this.tiltTimeout);
      this.style.transition = `${this.tiltState.settings.speed}ms ${this.tiltState.settings.easing}`;

      if (this.tiltState.settings.glare && this.glareElement) {
        this.glareElement.style.transition = `opacity ${this.tiltState.settings.speed}ms ${this.tiltState.settings.easing}`;
      }

      this.tiltTimeout = setTimeout(() => {
        this.style.transition = "";
        if (this.tiltState.settings.glare && this.glareElement) {
          this.glareElement.style.transition = "";
        }
      }, this.tiltState.settings.speed);
    };

    node.addEventListener("mouseenter", function () {
      // Set this as the active node and reset all others
      activeNode = this;
      resetInactiveNodes();

      this.tiltState.ticking = false;
      this.style.willChange = "transform";
      setTransition.call(this);

      this.tiltState.settings.scale = 1.05;
    });

    node.addEventListener("mouseleave", function () {
      setTransition.call(this);

      this.tiltState.settings.scale = 1;
      this.style.transform = `perspective(${this.tiltState.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

      if (this.tiltState.settings.glare && this.glareElement) {
        this.glareElement.style.transform =
          "rotate(180deg) translate(-50%, -50%)";
        this.glareElement.style.opacity = "0";
      }

      // Clear active node if this was it
      if (activeNode === this) {
        activeNode = null;
      }
    });

    node.addEventListener("mousemove", function (e) {
      this.tiltState.mousePositions.x = e.clientX;
      this.tiltState.mousePositions.y = e.clientY;
      requestTick.call(this);
    });

    node.addEventListener("mousedown", function () {
      this.style.transform = `perspective(${this.tiltState.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(0.97, 0.97, 0.97)`;
    });

    node.addEventListener("mouseup", function () {
      this.style.transform = `perspective(${this.tiltState.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(${this.tiltState.settings.scale}, ${this.tiltState.settings.scale}, ${this.tiltState.settings.scale})`;
    });

    node.addEventListener("touchstart", function () {
      this.style.transform = `perspective(${this.tiltState.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(0.97, 0.97, 0.97)`;
    });

    node.addEventListener("touchend", function () {
      this.style.transform = `perspective(${this.tiltState.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(${this.tiltState.settings.scale}, ${this.tiltState.settings.scale}, ${this.tiltState.settings.scale})`;
    });

    prepareGlare.call(node);
  });

  // resets node tilt
  const bentoContainer = document.querySelector(".bento-container");
  if (bentoContainer) {
    bentoContainer.addEventListener("mousemove", function () {
      resetInactiveNodes();
    });
  }

  // Modal close functionality
  const modals = document.querySelectorAll(".modal");
  const modalContents = document.querySelectorAll(".modal-content");

  function closeModal() {
    setTimeout(() => {
      window.location.hash = "";
    }, 50);
  }

  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const visibleModal = document.querySelector(".modal:target");
      if (visibleModal) {
        closeModal();
      }
    }
  });
});
