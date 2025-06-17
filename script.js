document.addEventListener("DOMContentLoaded", function () {
  let pathSegments = location.pathname.split("/").filter((seg) => seg.length > 0);
  let basePath = "";
  if (pathSegments.length > 1) {
    basePath = "../".repeat(pathSegments.length - 1);
  }

  // Load Header
  const headerContainers = document.querySelectorAll(".header-container");
  headerContainers.forEach((container) => {
    fetch(basePath + "header.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        highlightNavLinks();
        initializeMenu();
        setupDropdownToggle();

        const header = document.querySelector("header");
        if (header) {
          window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
              header.classList.add("scrolled");
            } else {
              header.classList.remove("scrolled");
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error loading header:", error);
      });
  });

  // Load Footer
  const footerContainers = document.querySelectorAll(".footer-container");
  footerContainers.forEach((container) => {
    fetch(basePath + "footer.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  });

  // Highlight current page link
  function highlightNavLinks() {
    const navLinks = document.querySelectorAll("#navlinks ul li a");
    const currentPath = location.pathname;

    navLinks.forEach((link) => {
      link.classList.remove("selected");

      const linkPath = new URL(link.href).pathname;

      // Home
      if (
        (currentPath === "/" && linkPath === "/index.html") ||
        (currentPath === "/index.html" && linkPath === "/index.html") ||
        (currentPath === "/" && linkPath === "/")
      ) {
        link.classList.add("selected");
      }

      // About
      if (currentPath === "/about.html" && linkPath === "/about.html") {
        link.classList.add("selected");
      }

      // Blog (for blog homepage and article pages)
      if (
        (currentPath === "/blog.html" && linkPath === "/blog.html") ||
        (currentPath.startsWith("/articles/") && linkPath === "/blog.html")
      ) {
        link.classList.add("selected");
      }

      // Resources
      if (currentPath === "/resources.html" && linkPath === "/resources.html") {
        link.classList.add("selected");
      }

      if (currentPath === "/portfolio.html" && linkPath === "/portfolio.html") {
        link.classList.add("selected");
      }

      // Contact Us
      if (currentPath === "/contact.html" && linkPath === "/contact.html") {
        link.classList.add("selected");
      }
    });

    // Handle Services dropdown separately
    if (currentPath.startsWith("/services/")) {
      const servicesDropdown = document.querySelector(".dropdown > .dropdown-toggle");
      if (servicesDropdown) {
        servicesDropdown.classList.add("selected");
      }
    }
  }



  // Show/hide mobile nav menu
  function initializeMenu() {
    const navLinks = document.querySelector("#navlinks");
    if (!navLinks) return;

    window.showMenu = function () {
      navLinks.style.right = "0";
    };

    window.hideMenu = function () {
      navLinks.style.right = "-800px";
    };

    const showMenuButton = document.querySelector(".show-menu-btn");
    const hideMenuButton = document.querySelector(".hide-menu-btn");

    if (showMenuButton && hideMenuButton) {
      showMenuButton.addEventListener("click", window.showMenu);
      hideMenuButton.addEventListener("click", window.hideMenu);
    }

    // Link click closes menu (unless it's dropdown-toggle)
    const menuLinks = document.querySelectorAll("#navlinks a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const isDropdownToggle = link.classList.contains("dropdown-toggle");
        if (isDropdownToggle) return;

        e.preventDefault();
        const targetHref = link.getAttribute("href");

        window.hideMenu();

        setTimeout(() => {
          window.location.href = targetHref;
        }, 300);
      });
    });
  }

  // Setup mobile dropdown toggle
  function setupDropdownToggle() {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();

        const parentLi = toggle.closest(".dropdown");

        // Close other dropdowns
        document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
          if (dropdown !== parentLi) {
            dropdown.classList.remove("open");
          }
        });

        // Toggle current
        parentLi.classList.toggle("open");
      });
    });

    // Optional: close dropdown on clicking any item
    document.querySelectorAll(".dropdown-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
          dropdown.classList.remove("open");
        });
        window.hideMenu?.(); // close mobile nav
      });
    });
  }

  // Counter animation
  const counters = document.querySelectorAll(".counter");
  const options = {
    root: null,
    threshold: 0.3,
  };

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = Math.ceil(target / 100);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));

  // Swiper setup
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
  });
});
