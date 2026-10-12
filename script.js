
/* ========================================
   1. SELECT HTML ELEMENTS
======================================== */

const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const navigation = document.getElementById("navigation");


/* ========================================
   2. DARK / LIGHT THEME TOGGLE
======================================== */

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
});


/* ========================================
   3. OPEN THE SIDE MENU
======================================== */

function openMenu() {
  navigation.classList.add("is-open");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");

  document.body.classList.add("menu-open");

  menuClose.focus();
}

menuToggle.addEventListener("click", function () {
  if (navigation.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }
});


/* ========================================
   4. CLOSE THE SIDE MENU
======================================== */

function closeMenu() {
  navigation.classList.remove("is-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  document.body.classList.remove("menu-open");
}

menuClose.addEventListener("click", closeMenu);


/* ========================================
   5. CLOSE MENU AFTER CLICKING A LINK
======================================== */

const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    closeMenu();
  });
});


/* ========================================
   6. CLOSE MENU WITH ESCAPE KEY
======================================== */

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    navigation.classList.contains("is-open")
  ) {
    closeMenu();
    menuToggle.focus();
  }
});
