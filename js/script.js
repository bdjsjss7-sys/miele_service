/* ============================================================
   KLARWERK — Скрипты
   Прелоадер · Шапка · Меню · Счётчики · Калькулятор · Reveal
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. ПРЕЛОАДЕР
     ---------------------------------------------------------- */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hide = () => {
      setTimeout(() => preloader.classList.add('is-hidden'), 350);
    };

    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
      // Страховка: если load не сработал за 2.5 сек — скрываем
      setTimeout(hide, 2500);
    }
  }

  /* ----------------------------------------------------------
     2. ШАПКА ПРИ СКРОЛЛЕ
     ---------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    const update = () => {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ----------------------------------------------------------
     3. БУРГЕР-МЕНЮ
     ---------------------------------------------------------- */
  function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    const toggle = () => {
      burger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
      // Блокируем скролл при открытом меню
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggle);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) toggle();
      });
    });

    // Закрытие по Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) toggle();
    });
  }

  /* ----------------------------------------------------------
     4. АНИМИРОВАННЫЕ СЧЁТЧИКИ
     ---------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = '1';
            animate(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     5. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
     ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ----------------------------------------------------------
     6. КАЛЬКУЛЯТОР
     ---------------------------------------------------------- */
  function initCalculator() {
    const calcValue = document.getElementById('calcValue');
    if (!calcValue) return;

    // Матрица цен: тип × бренд (в рублях)
    const prices = {
      coffee: {
        miele: 4500, neff: 3800, gaggenau: 5000,
        smeg: 3800, bosch: 3200, other: 3000,
      },
      dish: {
        miele: 4200, neff: 3400, gaggenau: 4500,
        smeg: 3200, bosch: 3000, other: 2800,
      },
      wash: {
        miele: 4500, neff: 3800, gaggenau: 4500,
        smeg: 3500, bosch: 3200, other: 3000,
      },
      oven: {
        miele: 4200, neff: 3400, gaggenau: 4800,
        smeg: 3400, bosch: 3000, other: 2800,
      },
      induction: {
        miele: 4500, neff: 3800, gaggenau: 5200,
        smeg: 3800, bosch: 3400, other: 3000,
      },
      fridge: {
        miele: 5500, neff: 4500, gaggenau: 6000,
        smeg: 4500, bosch: 4000, other: 3500,
      },
    };

    const state = {
      type: 'coffee',
      brand: 'miele',
    };

    const formatPrice = (n) => {
      return 'от ' + n.toLocaleString('ru-RU') + ' ₽';
    };

    const update = () => {
      const price = prices[state.type]?.[state.brand] || 3000;
      calcValue.style.opacity = '0';
      setTimeout(() => {
        calcValue.textContent = formatPrice(price);
        calcValue.style.opacity = '1';
      }, 150);
    };

    // Обработка кликов по чипам
    document.querySelectorAll('.calc__options').forEach((group) => {
      const groupName = group.dataset.group;

      group.querySelectorAll('.chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          group.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
          chip.classList.add('is-active');
          state[groupName] = chip.dataset.value;
          update();
        });
      });
    });
  }

  /* ----------------------------------------------------------
     7. REVEAL ПРИ СКРОЛЛЕ
     ---------------------------------------------------------- */
  function initReveal() {
    const elements = document.querySelectorAll(
      '.section__head, .bento__card, .feature, .step, .review, .faq__item, .calc, .contacts__inner'
    );
    if (!elements.length) return;

    elements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ----------------------------------------------------------
     8. ФОРМА (заглушка до подключения Firebase/Formspree)
     ---------------------------------------------------------- */
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Уже обрабатывается inline onsubmit в HTML,
    // здесь оставим место для будущей интеграции с Formspree/Firebase.
    // Пока ничего не делаем — форма показывает alert.
  }

  /* ----------------------------------------------------------
     9. ПАРАЛЛАКС ГЛОУ В HERO (лёгкий)
     ---------------------------------------------------------- */
  function initParallax() {
    const glow = document.querySelector('.hero__glow');
    if (!glow) return;

    // Отключаем на мобилке и при reduced-motion
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        glow.style.transform = `translateY(${y * 0.15}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     ИНИЦИАЛИЗАЦИЯ
     ---------------------------------------------------------- */
  function init() {
    initPreloader();
    initHeaderScroll();
    initBurger();
    initCounters();
    initSmoothScroll();
    initCalculator();
    initReveal();
    initForm();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

