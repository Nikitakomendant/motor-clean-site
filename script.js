(function () {
  "use strict";

  // ===== Графік роботи на сьогодні =====
  var hours = [
    { day: "Понеділок", hours: "09:00–20:00" },
    { day: "Вівторок", hours: "09:00–20:00" },
    { day: "Середа", hours: "09:00–20:00" },
    { day: "Четвер", hours: "09:00–20:00" },
    { day: "П'ятниця", hours: "09:00–20:00" },
    { day: "Субота", hours: "10:00–18:00" },
    { day: "Неділя", hours: "10:00–18:00" },
  ];

  var todayEl = document.getElementById("today-hours");
  if (todayEl) {
    var day = new Date().getDay();
    var index = day === 0 ? 6 : day - 1;
    todayEl.textContent = "Сьогодні: " + hours[index].hours;
  }

  // ===== Рік у футері =====
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ===== Зірки рейтингу =====
  document.querySelectorAll(".stars[data-rating]").forEach(function (el) {
    var rating = parseFloat(el.getAttribute("data-rating")) || 0;
    var filled = Math.round(rating);
    var html = "";
    for (var i = 0; i < 5; i++) {
      html +=
        '<svg viewBox="0 0 24 24" fill="' +
        (i < filled ? "currentColor" : "none") +
        '" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    }
    el.innerHTML = html;
  });

  // ===== Мобільне меню =====
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    function setMenuOpen(open) {
      toggle.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setMenuOpen(!menu.classList.contains("is-open"));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
  }

  // ===== Анімація при скролі =====
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in-view");
    });
  }
})();
