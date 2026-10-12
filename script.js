
/* =========================================
   YOUR GIRL, NEHA — PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // Find the theme toggle button.
  const themeButton = document.querySelector(
    "#theme-toggle, #themeToggle, .theme-toggle, [data-theme-toggle]"
  );

  // Find the menu button.
  const menuButton = document.querySelector(
    "#menu-toggle, #menuToggle, .menu-toggle, [data-menu-toggle]"
  );

  // Find the navigation menu.
  const navigation = document.querySelector(
    "#site-nav, #main-nav, #nav-menu, .site-nav, .main-nav, [data-site-nav]"
  );

  // ---------- Light and dark theme ----------

  function applyTheme(theme) {
    const isDark = theme === "dark";

    html.setAttribute("data-theme", isDark ? "dark" : "light");

    if (themeButton) {
      themeButton.textContent = isDark ? "☀️" : "🌙";
      themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      themeButton.setAttribute("title", isDark ? "Light mode" : "Dark mode");
      themeButton.setAttribute("aria-pressed", String(isDark));
    }

    try {
      localStorage.setItem("neha-portfolio-theme", isDark ? "dark" : "light");
    } catch (error) {
      // The theme still works if browser storage is unavailable.
    }
  }

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("neha-portfolio-theme");
  } catch (error) {
    // Continue with the default theme.
  }

  const initialTheme =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "dark";

  applyTheme(initialTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const currentTheme = html.getAttribute("data-theme") || "dark";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  // ---------- Hamburger navigation ----------

  function setMenuOpen(open) {
    if (!navigation || !menuButton) return;

    navigation.classList.toggle("open", open);
    navigation.classList.toggle("is-open", open);

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen =
        navigation.classList.contains("open") ||
        navigation.classList.contains("is-open");

      setMenuOpen(!isOpen);
    });

    // Close the menu after selecting a navigation link.
    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    // Close the menu using the Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });

    // Close the mobile menu if the screen becomes wider.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        setMenuOpen(false);
      }
    });
  }

  // ---------- Current year in footer ----------

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});