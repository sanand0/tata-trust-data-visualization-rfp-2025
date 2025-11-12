// Process Page Interactive Features
// Human-AI Collaboration Story - Interactive Elements

// Reading Progress Bar
function updateReadingProgress() {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("reading-progress").style.width = scrolled + "%";
}

// Fade-in Animation on Scroll
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    // Element is in viewport
    if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
      element.classList.add("visible");
    }
  });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offset = 80; // Account for fixed navbar
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Navbar Active State
function updateNavbarActive() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

// Animate Numbers on Scroll
function animateNumbers() {
  const metrics = document.querySelectorAll(".success-metric-value, .hero-meta-value");

  metrics.forEach((metric) => {
    const rect = metric.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !metric.classList.contains("animated")) {
      metric.classList.add("animated");

      const text = metric.textContent.trim();
      const hasPercent = text.includes("%");
      const hasPlus = text.includes("+");
      const hasTilde = text.includes("~");

      // Extract the number
      const number = parseInt(text.replace(/[^0-9]/g, ""));

      if (!isNaN(number) && number > 0) {
        let current = 0;
        const increment = number / 30; // 30 frames
        const duration = 1000; // 1 second
        const frameRate = duration / 30;

        const timer = setInterval(() => {
          current += increment;

          if (current >= number) {
            current = number;
            clearInterval(timer);
          }

          let displayText = Math.floor(current).toString();

          if (hasTilde) displayText = "~" + displayText;
          if (hasPlus) displayText += "+";
          if (hasPercent) displayText += "%";

          metric.textContent = displayText;
        }, frameRate);
      }
    }
  });
}

// Highlight Code Blocks
function highlightCodeBlocks() {
  const codeBlocks = document.querySelectorAll("pre code");

  codeBlocks.forEach((block) => {
    // Add copy button
    const button = document.createElement("button");
    button.className = "btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2";
    button.innerHTML = '<i class="bi bi-clipboard"></i>';
    button.style.fontSize = "0.875rem";

    block.parentElement.style.position = "relative";
    block.parentElement.appendChild(button);

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(block.textContent);
      button.innerHTML = '<i class="bi bi-check-lg"></i>';
      setTimeout(() => {
        button.innerHTML = '<i class="bi bi-clipboard"></i>';
      }, 2000);
    });
  });
}

// Add Interactive Tool Badges
function initToolBadges() {
  const toolBadges = document.querySelectorAll(".tool-badge");

  toolBadges.forEach((badge) => {
    badge.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.2s ease";
    });

    badge.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1)";
    });
  });
}

// Timeline Segment Interactions
function initTimelineInteractions() {
  const segments = document.querySelectorAll(".timeline-viz-segment");
  const steps = document.querySelectorAll(".process-step");

  segments.forEach((segment, index) => {
    segment.addEventListener("mouseenter", function() {
      this.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
      this.style.cursor = "pointer";

      // Highlight corresponding process step
      if (steps[index]) {
        steps[index].style.borderLeftColor = "var(--tata-red)";
        steps[index].style.transition = "border-left-color 0.3s ease";
      }
    });

    segment.addEventListener("mouseleave", function() {
      this.style.backgroundColor = "transparent";

      // Reset process step highlight
      if (steps[index]) {
        steps[index].style.borderLeftColor = "var(--tata-teal)";
      }
    });

    segment.addEventListener("click", function() {
      if (steps[index]) {
        steps[index].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

// Back to Top Button
function initBackToTop() {
  // Create button
  const button = document.createElement("button");
  button.className = "btn btn-primary rounded-circle position-fixed";
  button.style.cssText =
    "bottom: 2rem; right: 2rem; width: 50px; height: 50px; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;";
  button.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(button);

  // Show/hide button based on scroll
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = "1";
    } else {
      button.style.opacity = "0";
    }
  });

  // Scroll to top on click
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Share Functionality
function initShareButton() {
  const shareData = {
    title: "From RFP to Response: A Human-AI Collaboration Story",
    text: "How AI agents helped respond to Tata Trusts' RFP in 7 days - A comprehensive tutorial",
    url: window.location.href,
  };

  // Add share button to conclusion section if Web Share API is available
  if (navigator.share) {
    const conclusionSection = document.querySelector('section[style*="gradient"]');
    if (conclusionSection) {
      const buttonContainer = conclusionSection.querySelector(".d-flex.gap-3");
      if (buttonContainer) {
        const shareButton = document.createElement("button");
        shareButton.className = "btn-secondary-custom";
        shareButton.style.cssText = "color: white; border-color: white;";
        shareButton.innerHTML = '<i class="bi bi-share-fill me-2"></i>Share This Story';

        shareButton.addEventListener("click", async () => {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log("Error sharing:", err);
          }
        });

        buttonContainer.appendChild(shareButton);
      }
    }
  }
}

// Print Styles
function initPrintButton() {
  // Add print button to navbar
  const navbar = document.querySelector(".navbar-nav");
  if (navbar) {
    const printItem = document.createElement("li");
    printItem.className = "nav-item";
    printItem.innerHTML = '<a class="nav-link" href="#" id="print-btn"><i class="bi bi-printer"></i></a>';
    navbar.appendChild(printItem);

    document.getElementById("print-btn").addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  }
}

// Keyboard Navigation
function initKeyboardNav() {
  document.addEventListener("keydown", (e) => {
    // Press 'h' to go to home
    if (e.key === "h" && !e.ctrlKey && !e.metaKey) {
      const homeLink = document.querySelector('a[href="../index.html"]');
      if (homeLink) homeLink.click();
    }

    // Press 't' to scroll to top
    if (e.key === "t" && !e.ctrlKey && !e.metaKey) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Press 'b' to scroll to bottom
    if (e.key === "b" && !e.ctrlKey && !e.metaKey) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  });
}

// Initialize All Features
document.addEventListener("DOMContentLoaded", () => {
  // Core functionality
  initSmoothScroll();
  highlightCodeBlocks();
  initToolBadges();
  initTimelineInteractions();
  initBackToTop();
  initShareButton();
  initPrintButton();
  initKeyboardNav();

  // Initial animations
  handleScrollAnimations();
  updateNavbarActive();
  animateNumbers();

  // Scroll event listeners
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    updateReadingProgress();

    // Debounce expensive operations
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      handleScrollAnimations();
      updateNavbarActive();
      animateNumbers();
    }, 100);
  });

  // Console Easter Egg
  console.log("%c🤖 Curious about the code?", "font-size: 20px; font-weight: bold; color: #17a2b8;");
  console.log("%cThis page was built using AI agents!", "font-size: 14px; color: #6c757d;");
  console.log(
    "%cCheck out the process at: https://github.com/sanand0/tata-trust-data-visualization-rfp-2025",
    "font-size: 12px; color: #d0362d;",
  );
});

// Performance monitoring (optional)
if ("PerformanceObserver" in window) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) {
        console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
      }
    }
  });
  observer.observe({ entryTypes: ["measure", "navigation"] });
}
