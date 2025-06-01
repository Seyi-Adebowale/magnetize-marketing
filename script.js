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

  // Navigation highlight based on pathname
  function highlightNavLinks() {
    const navLinks = document.querySelectorAll("#navlinks ul li a");
    navLinks.forEach((link) => {
      link.classList.remove("selected");
      if (
        link.innerHTML.includes("Home") &&
        (location.pathname === "/" || location.pathname.includes("index"))
      ) {
        link.classList.add("selected");
      } else if (
        link.innerHTML.includes("Career") &&
        location.pathname.includes("career")
      ) {
        link.classList.add("selected");
      } else if (
        link.innerHTML.includes("Services") &&
        location.pathname.includes("services")
      ) {
        link.classList.add("selected");
      }
    });
  }

  // Menu open/close
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

    // Improved: Hide menu and navigate after short delay
    const menuLinks = document.querySelectorAll("#navlinks a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetHref = link.getAttribute("href");

        window.hideMenu();

        setTimeout(() => {
          window.location.href = targetHref;
        }, 300); // Adjust delay to match your menu animation
      });
    });
  }

  // Counter animation on scroll using IntersectionObserver
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

  // Swiper init (if used)
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
