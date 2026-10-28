/* ============================================================
   KLARWERK — Скрипты v3
   Прелоадер · Шапка · Премиум-меню · Счётчики · Калькулятор
   Каталог поломок · Отзывы с подгрузкой · Reveal
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     БАЗА ПОЛОМОК
     ========================================================== */
  const BREAKDOWNS = {
    coffee: [
      { title: 'Не наливает кофе / слабый напор', price: 'от 4 500 ₽', article: 'Чаще всего забит заварочный блок или изношена помпа. Кофейная гуща и накипь со временем блокируют каналы. Чистим блок, проверяем давление помпы, при износе меняем. Профилактика — промывка таблетками раз в месяц.' },
      { title: 'Течёт вода снизу корпуса', price: 'от 5 500 ₽', article: 'Причина — треснувший бойлер, износ уплотнителей или засор дренажа. У Miele CM часто виноват клапан сброса давления. Разбираем, меняем уплотнители и бойлер при необходимости, проверяем герметичность под давлением.' },
      { title: 'Не нагревает воду / холодный кофе', price: 'от 4 800 ₽', article: 'Вышел из строя ТЭН или термодатчик бойлера. У премиум-моделей стоит двойной бойлер — один для кофе, второй для пара. Диагностируем оба, меняем неисправный узел. Проверяем работу термостата.' },
      { title: 'Ошибка на дисплее / не включается', price: 'от 5 000 ₽', article: 'Обычно сбой платы управления после скачка напряжения или износа конденсаторов. Диагностируем электронику, при лёгких случаях — перепрошивка, при серьёзных — замена модуля. Ставим оригинальный блок Miele.' },
      { title: 'Не работает капучинатор / пар', price: 'от 3 800 ₽', article: 'Засор трубок молока, износ парогенератора или клапана подачи пара. Разбираем узел, чистим ультразвуком, при износе меняем трубки и клапан. Профилактика — ежедневная промывка после вспенивания.' },
      { title: 'Шумит / гудит при работе', price: 'от 3 500 ₽', article: 'Износ помпы, кофемолки или подшипников двигателя. У Miele часто гудит кофемолка — из-за износа жернов. Меняем жернова, смазываем двигатель, при необходимости — помпа.' }
    ],
    dish: [
      { title: 'Ошибка F11 / не сливает воду', price: 'от 4 200 ₽', article: 'У Miele F11 — проблема с дренажной системой. Виновники: засор фильтра, износ сливной помпы или забитый обратный клапан. Чистим систему, меняем помпу при износе. Часто решается за один выезд.' },
      { title: 'Ошибка F24 / не набирает воду', price: 'от 4 000 ₽', article: 'Проблема с подачей воды. Причины — засор впускного клапана, износ аквасенсора или неисправность прессостата. Чистим или меняем клапан, проверяем датчик уровня воды.' },
      { title: 'Плохо моет посуду', price: 'от 3 500 ₽', article: 'Засорены форсунки коромысел, износ моющей помпы или сбой дозатора. Разбираем коромысла, чистим форсунки, проверяем давление помпы. У премиум-моделей есть система AutoDos — проверяем её отдельно.' },
      { title: 'Не сушит / остаётся вода на посуде', price: 'от 3 800 ₽', article: 'Износ ТЭНа сушки, неисправность вентилятора конденсации или засор воздуховода. Диагностируем систему сушки, чистим каналы, меняем деталь. У Miele сушка Zeolith — отдельная диагностика.' },
      { title: 'Течёт вода на пол', price: 'от 4 500 ₽', article: 'Износ уплотнителя дверцы, треснувший шланг или проблема с системой WaterProof. Проверяем герметичность, меняем уплотнители и шланги. У Miele есть датчик протечки — сбрасываем и проверяем систему.' },
      { title: 'Не открывается дверца после мойки', price: 'от 3 200 ₽', article: 'Сбой системы AutoOpen или износ замка. Проверяем механику замка, работу датчика открытия, исправность привода. Заменяем неисправный узел.' }
    ],
    wash: [
      { title: 'Не отжимает / не крутит барабан', price: 'от 4 500 ₽', article: 'Износ ремня, щёток двигателя или неисправность платы. Проверяем ремень, двигатель, датчик скорости. Заменяем изношенные детали. У Miele часто виноват модуль управления.' },
      { title: 'Шумит / стучит при отжиме', price: 'от 6 500 ₽', article: 'Износ подшипников барабана — классика. При долгом использовании подшипник разбивается, появляется гул. Меняем подшипник, сальник, проверяем ось барабана. Работа 3–4 часа.' },
      { title: 'Не сливает воду', price: 'от 3 800 ₽', article: 'Засор фильтра, износ сливной помпы или проблема с датчиком уровня. Чистим фильтр, проверяем помпу, меняем при износе. Часто клиент может сам почистить — подскажем по телефону.' },
      { title: 'Течёт вода', price: 'от 4 000 ₽', article: 'Износ уплотнителя люка, треснувший патрубок или проблема с дренажем. Проверяем все соединения, меняем уплотнители. У Miele система WaterControl — проверяем отдельно.' },
      { title: 'Ошибка на дисплее', price: 'от 4 500 ₽', article: 'Сбой электроники. Диагностируем плату, датчики, систему безопасности. При программной ошибке — сброс, при аппаратной — замена модуля. Оригинал Miele.' },
      { title: 'Не греет воду', price: 'от 4 200 ₽', article: 'Износ ТЭНа или неисправность термодатчика. У Miele ТЭН интегрирован с системой нагрева — проверяем весь узел. Меняем ТЭН и датчик при необходимости.' }
    ],
    dryer: [
      { title: 'Не сушит / долго сохнет', price: 'от 5 000 ₽', article: 'У сушильных машин с тепловым насосом — утечка фреона или износ компрессора. Проверяем контур, заправляем фреон, при износе меняем компрессор. У конденсационных — засор воздуховода.' },
      { title: 'Шумит / гудит', price: 'от 4 500 ₽', article: 'Износ подшипников барабана или роликов. Разбираем корпус, меняем подшипники, ролики, ремни. У Miele — своя система подвески барабана, требует квалификации.' },
      { title: 'Ошибка на дисплее', price: 'от 4 800 ₽', article: 'Диагностируем плату управления, датчики влажности, температуры. У Miele сенсоры PerfectDry — точная диагностика. При сбое меняем модуль или датчики.' },
      { title: 'Не запускается', price: 'от 4 200 ₽', article: 'Проверяем питание, кнопку старт, блокировку дверцы, плату. У премиум-моделей — система самодиагностики, считываем коды ошибок с дисплея.' }
    ],
    oven: [
      { title: 'Не греет / греет слабо', price: 'от 4 000 ₽', article: 'Вышел из строя ТЭН или термостат. У Gaggenau часто несколько ТЭНов — верх, низ, конвекция. Диагностируем каждый, меняем неисправный. Проверяем работу термодатчика.' },
      { title: 'Пиролиз не работает', price: 'от 5 500 ₽', article: 'Система пиролитической очистки — это отдельный нагрев до 500°C. При отказе — проверяем датчик температуры, ТЭН пиролиза, замок блокировки дверцы. У Miele PyroFit — своя диагностика.' },
      { title: 'Не работает конвекция', price: 'от 4 500 ₽', article: 'Износ вентилятора конвекции или двигателя. Разбираем заднюю стенку, диагностируем вентилятор, при износе меняем. Проверяем работу датчиков температуры.' },
      { title: 'Дверца не закрывается / не фиксируется', price: 'от 3 500 ₽', article: 'Износ петель, сломанный замок, растянутые пружины. Меняем петли или замок. У премиум-моделей — система мягкого закрытия SoftClose, требует оригинальных деталей.' },
      { title: 'Ошибка / не включается', price: 'от 4 800 ₽', article: 'Проблема с платой управления или модулем. У Miele и Gaggenau — сенсорные панели, часто виноват контроллер. Диагностируем, при сбое меняем плату.' }
    ],
    induction: [
      { title: 'Не включается / не реагирует на касания', price: 'от 5 000 ₽', article: 'Сбой сенсорной панели или платы управления. У Miele и Neff — ёмкостные сенсоры, чувствительны к влаге. Проверяем контроллер, при износе меняем модуль.' },
      { title: 'Не греет одна зона', price: 'от 4 800 ₽', article: 'Износ индукционной катушки или реле на плате. Диагностируем модуль, прозваниваем катушку. Меняем неисправный узел — катушку или плату.' },
      { title: 'Ошибка на дисплее', price: 'от 4 500 ₽', article: 'Диагностика электроники. У Neff TwistPad — проверим пульт управления, у Miele — сенсорную панель. При сбое — замена модуля или ремонт платы.' },
      { title: 'Выбивает пробки при включении', price: 'от 5 500 ₽', article: 'Пробой индуктора или короткое замыкание в плате. Диагностируем изоляцию, проверяем силовые ключи. Опасно эксплуатировать — вызывайте инженера.' }
    ],
    fridge: [
      { title: 'Не морозит / слабо морозит', price: 'от 5 500 ₽', article: 'Утечка фреона, износ компрессора или засор капилляра. У премиум-моделей Miele — двойной контур охлаждения. Диагностируем давление, ищем утечку, заправляем фреон.' },
      { title: 'Течёт вода внутри', price: 'от 4 500 ₽', article: 'Засор дренажа или проблема с системой No Frost. У Miele с PerfectFresh — отдельный дренаж для зоны свежести. Чистим, проверяем систему оттайки.' },
      { title: 'Шумит / гудит', price: 'от 4 800 ₽', article: 'Износ компрессора или вентилятора No Frost. Проверяем оба, при износе меняем. У Miele компрессоры с инверторным управлением — точная диагностика.' },
      { title: 'Намерзает лёд / снег', price: 'от 5 000 ₽', article: 'Сбой системы No Frost — неисправен ТЭН оттайки, таймер или датчик. Диагностируем, меняем неисправный узел. Профилактика — не ставить горячее, следить за уплотнителем.' },
      { title: 'Ошибка на дисплее', price: 'от 5 500 ₽', article: 'Электроника Miele с самодиагностикой. Считываем коды, диагностируем плату, датчики температуры, систему управления. Меняем неисправные модули.' }
    ],
    vacuum: [
      { title: 'Не включается', price: 'от 2 500 ₽', article: 'У Miele — проблема с кнопкой или платой. У Dyson — износ аккумулятора. Проверяем питание, батарею, кнопку. Меняем неисправный узел.' },
      { title: 'Потерял мощность / слабо сосёт', price: 'от 2 800 ₽', article: 'Засор фильтров, износ турбины или проблема с мотором. Чистим систему, проверяем щётки двигателя. У Dyson V — износ аккумулятора теряет мощность.' },
      { title: 'Аккумулятор быстро садится', price: 'от 3 500 ₽', article: 'Износ Li-Ion батареи — типично после 3–4 лет. Меняем на оригинальный аккумулятор. У Dyson V11/V15 — сменные батареи, у Miele — специализированные.' },
      { title: 'Шумит / вибрирует', price: 'от 2 800 ₽', article: 'Износ подшипников двигателя или турбины. Разбираем, проверяем вал, при износе меняем узел. Балансируем турбину.' }
    ],
    iron: [
      { title: 'Не подаёт пар', price: 'от 3 200 ₽', article: 'Засор парогенератора накипью или износ клапана. У Miele FashionMaster — двухрезервуарная система. Промываем, при износе меняем клапан или парогенератор.' },
      { title: 'Течёт вода', price: 'от 3 500 ₽', article: 'Износ уплотнителей, треснувший бойлер или засор системы. У Laurastar — проблема с профессиональным бойлером. Меняем уплотнители, проверяем корпус.' },
      { title: 'Не нагревается', price: 'от 3 800 ₽', article: 'Износ ТЭНа или термостата. Диагностируем нагрев, меняем неисправный узел. У премиум-станций — двойной контур нагрева.' },
      { title: 'Не работает подошва утюга', price: 'от 3 000 ₽', article: 'Окисление контактов, износ нагревателя или проблема с управлением. Диагностируем утюг отдельно от станции, меняем неисправный узел.' }
    ],
    micro: [
      { title: 'Не греет', price: 'от 3 500 ₽', article: 'Вышел из строя магнетрон — классика. Проверяем высоковольтный диод, конденсатор, магнетрон. Меняем неисправный узел на оригинал.' },
      { title: 'Искрит внутри', price: 'от 2 800 ₽', article: 'Прогорела слюдяная пластина или повреждено покрытие. Опасно использовать! Меняем пластину, при повреждении камеры — ремонт или замена.' },
      { title: 'Не включается / не крутит', price: 'от 3 000 ₽', article: 'Проверяем предохранители, плату управления, двигатель поддона. У Miele и Bosch — чувствительная электроника. Меняем предохранители или плату.' },
      { title: 'Не работает гриль', price: 'от 3 200 ₽', article: 'Износ ТЭНа гриля или сбой реле на плате. Диагностируем нагрев, при износе меняем ТЭН. Проверяем работу таймера и реле.' }
    ]
  };

  /* ==========================================================
     БАЗА ОТЗЫВОВ (Для главной страницы)
     ========================================================== */
  const REVIEWS = [
    { name: 'Ольга', area: 'Профи.ру · 20 октября 2026', device: 'Встроенный духовой шкаф', rating: 5, text: 'Приехал вовремя, быстро определил проблему и заранее оговорил сумму. Забрал неисправную часть, на следующий день вернулся и установил. Благодарю за работу.' },
    { name: 'Оксана Петровна', area: 'Профи.ру · 19 октября 2026', device: 'Пылесос Miele', rating: 5, text: 'Случай оказался непростым, но мастер довёл ремонт до результата. Пылесос работает, дали гарантию на год. Мастера рекомендую.' },
    { name: 'Юрий', area: 'Профи.ру · 18 октября 2026', device: 'Вытяжка', rating: 5, text: 'Очень быстро нашли причину сложной плавающей неисправности, которую не смогли устранить несколько предыдущих специалистов. Вежливо, аккуратно и с гарантией.' },
    { name: 'Василий', area: 'Профи.ру · 10 октября 2026', device: 'Пылесос', rating: 5, text: 'Мастер прибыл вовремя, провёл диагностику и выполнил ремонт платы. Рекомендую к сотрудничеству.' },
    { name: 'Ирина Г.', area: 'Профи.ру · 8 октября 2026', device: 'Кофемашина', rating: 5, text: 'Кофемашина перестала наливать кофе. Мастер быстро нашёл причину и всё исправил. Сейчас работает отлично, спасибо за ремонт!' },
    { name: 'Давид', area: 'Профи.ру · 29 сентября 2026', device: 'Вертикальный пылесос', rating: 5, text: 'Мастер быстро разобрался в причине и всё починил на месте. Сейчас пылесос работает как новый, спасибо!' },
    { name: 'Денис', area: 'Профи.ру · 28 сентября 2026', device: 'Микроволновая печь', rating: 5, text: 'Мастер оперативно выполнил ремонт на месте по приемлемой стоимости. Микроволновая печь полностью исправна, рекомендую.' },
    { name: 'Кира Я.', area: 'Профи.ру · 28 сентября 2026', device: 'Кофемашина', rating: 5, text: 'Кофемашина перестала включаться. Мастер быстро нашёл проблему, восстановил плату питания — и всё снова работает.' },
    { name: 'Иван', area: 'Профи.ру · 27 сентября 2026', device: 'Кофемашина', rating: 5, text: 'Быстро продиагностировал и сразу сделал ремонт на месте. Всё чётко, без навязывания дополнительных услуг. Отдельно порадовала гарантия на год.' },
    { name: 'Екатерина', area: 'Профи.ру · 23 сентября 2026', device: 'Плата кофемашины', rating: 5, text: 'Сразу определили проблему, забрали деталь для ремонта, и уже на следующий день всё было решено. Рекомендую к обращению.' },
    { name: 'Игорь', area: 'Профи.ру · 23 сентября 2026', device: 'Кофемашина', rating: 5, text: 'Кофемашину отремонтировали, все вопросы решили и дали необходимые консультации. Порадовала годовая гарантия.' },
    { name: 'Олег', area: 'Профи.ру · 29 августа 2026', device: 'Посудомоечная машина Miele', rating: 5, text: 'Мастер приехал со всем инструментом, быстро разобрался и отремонтировал плату питания. Работал спокойно и профессионально, мебель не повредил, грязи не оставил.' }
  ];

  /* ==========================================================
     1. ПРЕЛОАДЕР
     ========================================================== */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    const hide = () => setTimeout(() => preloader.classList.add('is-hidden'), 350);
    if (document.readyState === 'complete') hide();
    else {
      window.addEventListener('load', hide);
      setTimeout(hide, 2500);
    }
  }

  /* ==========================================================
     2. ШАПКА ПРИ СКРОЛЛЕ
     ========================================================== */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    let ticking = false;
    const update = () => {
      if (window.scrollY > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
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

  /* ==========================================================
     3. ПРЕМИУМ БУРГЕР-МЕНЮ
     ========================================================== */
  function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;

    const toggle = () => {
      const willOpen = !nav.classList.contains('is-open');
      burger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', willOpen);
      document.body.style.overflow = willOpen ? 'hidden' : '';
    };

    burger.addEventListener('click', toggle);

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) toggle();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) toggle();
    });
  }

  /* ==========================================================
     3.1 БЛОК КОНТАКТОВ В МОБИЛЬНОМ МЕНЮ
     ========================================================== */
  function initNavContacts() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    if (!nav.querySelector('.nav-contacts')) {
      const contacts = document.createElement('div');
      contacts.className = 'nav-contacts';
      contacts.innerHTML =
        '<div class="nav-contacts__label">Позвонить инженеру</div>' +
        '<a href="tel:+79868311588" class="nav-contacts__phone">+7 (986) 831-15-88</a>' +
        '<div class="nav-contacts__note">Ежедневно, с 8:00 до 22:00</div>' +
        '<a href="tel:+79868311588" class="nav-contacts__btn">Вызвать инженера</a>';
      nav.appendChild(contacts);
    }
  }

  /* ==========================================================
     4. СЧЁТЧИКИ (ИСПРАВЛЕНО: форматирование с пробелом)
     ========================================================== */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        
        const currentVal = Math.floor(eased * target);
        el.textContent = currentVal.toLocaleString('ru-RU') + suffix;
        
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString('ru-RU') + suffix;
        }
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = '1';
          animate(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => observer.observe(el));
  }

  /* ==========================================================
     5. ПЛАВНЫЙ СКРОЛЛ
     ========================================================== */
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

  /* ==========================================================
     6. КАЛЬКУЛЯТОР
     ========================================================== */
  function initCalculator() {
    const calcValue = document.getElementById('calcValue');
    if (!calcValue) return;
    const prices = {
      coffee:    { miele: 4500, neff: 3800, gaggenau: 5000, smeg: 3800, bosch: 3200, other: 3000 },
      dish:      { miele: 4200, neff: 3400, gaggenau: 4500, smeg: 3200, bosch: 3000, other: 2800 },
      wash:      { miele: 4500, neff: 3800, gaggenau: 4500, smeg: 3500, bosch: 3200, other: 3000 },
      oven:      { miele: 4200, neff: 3400, gaggenau: 4800, smeg: 3400, bosch: 3000, other: 2800 },
      induction: { miele: 4500, neff: 3800, gaggenau: 5200, smeg: 3800, bosch: 3400, other: 3000 },
      fridge:    { miele: 5500, neff: 4500, gaggenau: 6000, smeg: 4500, bosch: 4000, other: 3500 }
    };
    const state = { type: 'coffee', brand: 'miele' };
    const fmt = (n) => 'от ' + n.toLocaleString('ru-RU') + ' ₽';
    const update = () => {
      const price = (prices[state.type] && prices[state.type][state.brand]) || 3000;
      calcValue.style.opacity = '0';
      setTimeout(() => {
        calcValue.textContent = fmt(price);
        calcValue.style.opacity = '1';
      }, 150);
    };
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

  /* ==========================================================
     7. КАТАЛОГ ПОЛОМОК
     ========================================================== */
  function initBreakdowns() {
    const tabsWrap = document.getElementById('breakdownsTabs');
    const listWrap = document.getElementById('breakdownsList');
    if (!tabsWrap || !listWrap) return;

    const render = (type) => {
      const items = BREAKDOWNS[type] || [];
      listWrap.style.opacity = '0';
      setTimeout(() => {
        listWrap.innerHTML = items.map((item) => `
          <details class="breakdown">
            <summary class="breakdown__head">
              <span class="breakdown__title">${item.title}</span>
              <span class="breakdown__price">${item.price}</span>
              <span class="breakdown__arrow" aria-hidden="true">+</span>
            </summary>
            <div class="breakdown__body">
              <p class="breakdown__article">${item.article}</p>
              <a href="#contacts" class="breakdown__cta">Вызвать инженера по этой проблеме</a>
            </div>
          </details>
        `).join('');
        listWrap.style.opacity = '1';
      }, 150);
    };

    tabsWrap.querySelectorAll('.btab').forEach((tab) => {
      tab.addEventListener('click', () => {
        tabsWrap.querySelectorAll('.btab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        render(tab.dataset.type);
      });
    });

    const active = tabsWrap.querySelector('.btab.is-active');
    render(active ? active.dataset.type : 'coffee');
  }

  /* ==========================================================
     8. ОТЗЫВЫ С ПОДГРУЗКОЙ
     ========================================================== */
  function initReviews() {
    const list = document.getElementById('reviewsList');
    const moreBtn = document.getElementById('reviewsMore');
    if (!list) return;

    const INITIAL_COUNT = 6;
    const STEP = 6;
    let shown = INITIAL_COUNT;

    const starString = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

    const card = (r) => `
      <article class="review">
        <div class="review__head">
          <div class="review__avatar">${r.name.charAt(0)}</div>
          <div>
            <div class="review__name">${r.name}</div>
            <div class="review__meta">${r.area} · ${r.device}</div>
          </div>
        </div>
        <div class="review__stars ${r.rating < 5 ? 'review__stars--dim' : ''}">${starString(r.rating)}</div>
        <p class="review__text">${r.text}</p>
      </article>
    `;

    const renderChunk = (from, to) => {
      const chunk = REVIEWS.slice(from, to).map(card).join('');
      list.insertAdjacentHTML('beforeend', chunk);
      list.querySelectorAll('.review').forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          el.classList.add('reveal');
          requestAnimationFrame(() => el.classList.add('is-visible'));
        }
      });
    };

    list.innerHTML = REVIEWS.slice(0, INITIAL_COUNT).map(card).join('');

    if (moreBtn) {
      if (REVIEWS.length <= INITIAL_COUNT) moreBtn.style.display = 'none';
      moreBtn.addEventListener('click', () => {
        renderChunk(shown, shown + STEP);
        shown += STEP;
        if (shown >= REVIEWS.length) {
          moreBtn.style.display = 'none';
          const note = document.createElement('div');
          note.className = 'reviews__end';
          note.textContent = '— Это все отзывы —';
          moreBtn.parentNode.appendChild(note);
        }
      });
    }
  }

  /* ==========================================================
     9. REVEAL ПРИ СКРОЛЛЕ
     ========================================================== */
  function initReveal() {
    const elements = document.querySelectorAll(
      '.section__head, .bento__card, .feature, .step, .review, .faq__item, .calc, .contacts__inner, .engineer, .breakdowns'
    );
    if (!elements.length) return;
    elements.forEach((el) => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    elements.forEach((el) => observer.observe(el));
  }

  /* ==========================================================
     10. ПАРАЛЛАКС
     ========================================================== */
  function initParallax() {
    const glow = document.querySelector('.hero__glow');
    if (!glow) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        glow.style.transform = `translateY(${window.scrollY * 0.15}px)`;
        ticking = false;
      });
    }, { passive: true });
  }


  /* ==========================================================
     11. АТРИБУЦИЯ, АНТИФРОД И ЗАЩИЩЁННЫЕ ФОРМЫ
     ========================================================== */
  function safeStorageGet(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }

  function metrikaGoal(goal, params) {
    if (typeof window.ym === 'function') {
      window.ym(113586542, 'reachGoal', goal, params || {});
    }
  }

  /* ==========================================================
     КОНВЕРСИОННЫЙ HERO НА ВНУТРЕННИХ СТРАНИЦАХ
     ========================================================== */
  function initPageHeroEnhancement() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;

    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (page === 'privacy.html' || page === '404.html' || page === 'index.html') return;
    const coffeePages = new Set(['coffee-machines.html']);
    const laundryPages = new Set([
      'washing-machines.html', 'dishwashers.html', 'dryers.html',
      'ironing-stations.html', 'vacuum-cleaners.html'
    ]);
    const coldPages = new Set(['fridges.html']);
    const cookingPages = new Set(['ovens.html', 'induction.html', 'microwaves.html', 'hoods.html']);
    const brandPages = new Set(['miele.html', 'neff.html', 'gaggenau.html', 'smeg.html', 'bosch.html', 'siemens.html']);

    let image = '/assets/editorial/control-board-diagnostics.webp';
    let brands = ['Miele', 'Gaggenau', 'V-ZUG', 'ASKO', 'Sub-Zero'];

    if (coffeePages.has(page)) {
      image = '/assets/editorial/coffee-service-v2.webp';
      brands = ['Miele', 'Jura', 'Gaggenau', 'Smeg', 'Neff'];
    } else if (laundryPages.has(page)) {
      image = '/assets/editorial/laundry-service-v2.webp';
      brands = ['Miele', 'ASKO', 'V-ZUG', 'Neff', 'Bosch'];
    } else if (coldPages.has(page)) {
      image = '/assets/editorial/refrigeration-service-v2.webp';
      brands = ['Liebherr', 'Miele', 'Sub-Zero', 'Gaggenau', 'V-ZUG'];
    } else if (cookingPages.has(page)) {
      image = '/assets/editorial/induction-diagnostics.webp';
      brands = ['Miele', 'Gaggenau', 'Neff', 'Smeg', 'BORA'];
    } else if (brandPages.has(page)) {
      image = '/assets/editorial/control-board-diagnostics.webp';
      const title = (document.querySelector('.page-hero__title')?.textContent || '').toLowerCase();
      brands = ['Miele', 'Gaggenau', 'V-ZUG', 'ASKO', 'Sub-Zero'].filter((brand, index) =>
        index === 0 || !title.includes(brand.toLowerCase())
      );
    }

    hero.classList.add('page-hero--photo');
    hero.style.setProperty('--page-hero-image', `url("${image}")`);

    const inner = hero.querySelector('.page-hero__inner');
    const actions = hero.querySelector('.page-hero__actions');
    if (!inner || !actions || inner.querySelector('.page-hero__proof')) return;

    const brandRow = document.createElement('div');
    brandRow.className = 'page-hero__brands';
    brandRow.setAttribute('aria-label', 'Обслуживаемые премиальные бренды');
    brandRow.innerHTML = brands.map((brand) => `<span>${brand}</span>`).join('');

    const proof = document.createElement('div');
    proof.className = 'page-hero__proof';
    proof.innerHTML = `
      <span class="page-hero__proof-home"><strong>у вас дома</strong> при вас · без вывоза</span>
      <span><strong>от 90 минут</strong> выезд инженера</span>
      <span><strong>от 1 500 ₽</strong> диагностика</span>
      <span><strong>до 5 лет</strong> гарантия</span>
    `;

    actions.before(brandRow);
    actions.after(proof);
  }

  function initHomeServicePromise() {
    document.querySelectorAll('.contacts__form-lead').forEach((lead) => {
      if (lead.parentElement?.querySelector('.form-home-promise')) return;
      const promise = document.createElement('div');
      promise.className = 'form-home-promise';
      promise.innerHTML = '<strong>Ремонт на дому, при вас</strong><span>Без вывоза техники в мастерскую</span>';
      lead.after(promise);
    });
  }

  function buildSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'kw-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function initTrafficProtection() {
    const now = Date.now();
    let sessionId = safeStorageGet('kw_session_id', '');
    if (!sessionId) {
      sessionId = buildSessionId();
      safeStorageSet('kw_session_id', sessionId);
    }

    const query = new URLSearchParams(window.location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid'];
    const current = {};
    keys.forEach((key) => {
      const value = query.get(key);
      if (value) current[key] = value.slice(0, 300);
    });

    let attribution = safeStorageGet('kw_attribution', {});
    if (Object.keys(current).length) {
      attribution = {
        ...attribution,
        ...current,
        first_landing: attribution.first_landing || window.location.href,
        first_referrer: attribution.first_referrer || document.referrer,
        updated_at: now
      };
      safeStorageSet('kw_attribution', attribution);
    }

    let adVisits = safeStorageGet('kw_ad_visits', []);
    if (current.yclid) {
      adVisits = adVisits.filter((item) => now - item.time < 60 * 60 * 1000);
      adVisits.push({ time: now, yclid: current.yclid });
      safeStorageSet('kw_ad_visits', adVisits);
    }

    const distinctClicks = new Set(adVisits.map((item) => item.yclid)).size;
    const suspicious = adVisits.length >= 5 || distinctClicks >= 4;
    window.KLARWERK_TRAFFIC = {
      sessionId,
      attribution,
      suspicious,
      repeatVisits: adVisits.length,
      distinctClicks
    };

    if (typeof window.ym === 'function') {
      window.ym(113586542, 'params', {
        traffic_quality: {
          ad_visit: Boolean(attribution.yclid),
          suspected_repeat_click: suspicious,
          repeat_visits_60m: adVisits.length,
          distinct_yclid_60m: distinctClicks
        }
      });
    }
  }

  function initConversionTracking() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('tel:')) metrikaGoal('phone_click', { href });
        if (href.includes('t.me/klarwerk_spb')) metrikaGoal('telegram_click', { page: location.pathname });
        if (href.includes('instagram.com/klarwerk_spb')) metrikaGoal('instagram_click', { page: location.pathname });
      }

      const calcButton = event.target.closest('.calc__option, [data-group]');
      if (calcButton) metrikaGoal('calculator_interaction', { page: location.pathname });
    });
  }

  function initProtectedForms() {
    const forms = document.querySelectorAll('form[data-protected-form]');
    if (!forms.length) return;
    const pageOpenedAt = Date.now();

    forms.forEach((form) => {
      const phone = form.querySelector('input[name="phone"]');
      if (phone) {
        phone.addEventListener('input', () => {
          const digits = phone.value.replace(/\D/g, '').replace(/^8/, '7').slice(0, 11);
          if (!digits) return;
          let value = '+7';
          const body = digits.startsWith('7') ? digits.slice(1) : digits;
          if (body.length) value += ' (' + body.slice(0, 3);
          if (body.length >= 3) value += ') ' + body.slice(3, 6);
          if (body.length >= 6) value += '-' + body.slice(6, 8);
          if (body.length >= 8) value += '-' + body.slice(8, 10);
          phone.value = value;
        });
      }

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const status = form.querySelector('.form-status');
        const button = form.querySelector('button[type="submit"]');
        const originalText = button ? button.textContent : '';
        const setStatus = (message, type) => {
          if (!status) return;
          status.className = 'form-status' + (type ? ' form-status--' + type : '');
          status.innerHTML = message;
        };

        if (!form.checkValidity()) {
          form.reportValidity();
          setStatus('Проверьте обязательные поля.', 'error');
          return;
        }

        const honeypot = form.querySelector('input[name="_gotcha"]');
        if (honeypot && honeypot.value) {
          setStatus('Спасибо! Сообщение принято.', 'success');
          return;
        }

        if (Date.now() - pageOpenedAt < 2500) {
          setStatus('Подождите пару секунд и отправьте форму ещё раз.', 'error');
          return;
        }

        if (phone && phone.value.replace(/\D/g, '').length < 11) {
          phone.setCustomValidity('Введите полный номер телефона');
          phone.reportValidity();
          phone.setCustomValidity('');
          return;
        }

        const now = Date.now();
        let attempts = safeStorageGet('kw_form_attempts', []);
        attempts = attempts.filter((time) => now - time < 15 * 60 * 1000);
        if (attempts.length >= 3) {
          setStatus('Мы уже получили несколько обращений. Позвоните по <a href="tel:+79868311588">+7 (986) 831-15-88</a> или напишите в <a href="https://t.me/klarwerk_spb" target="_blank" rel="noopener">Telegram</a>.', 'error');
          return;
        }

        const data = new FormData(form);
        const subject = String(data.get('_subject') || 'form');
        const identity = String(data.get('phone') || data.get('name') || '');
        const message = String(data.get('message') || data.get('text') || '').slice(0, 160);
        const fingerprint = [subject, identity, message].join('|').toLowerCase();
        const last = safeStorageGet('kw_last_submission', {});
        if (last.fingerprint === fingerprint && now - last.time < 10 * 60 * 1000) {
          setStatus('Эта заявка уже отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
          return;
        }

        const traffic = window.KLARWERK_TRAFFIC || {};
        const attribution = traffic.attribution || {};
        Object.entries(attribution).forEach(([key, value]) => {
          if (value !== undefined && value !== null) data.set(key, String(value));
        });
        data.set('_page', window.location.href);
        data.set('_landing_page', attribution.first_landing || window.location.href);
        data.set('_referrer', attribution.first_referrer || document.referrer || 'direct');
        data.set('_session_id', traffic.sessionId || '');
        data.set('_traffic_quality', traffic.suspicious ? 'suspected_repeat_click' : 'normal');
        data.set('_page_time_seconds', String(Math.round((now - pageOpenedAt) / 1000)));

        if (button) {
          button.disabled = true;
          button.classList.add('is-loading');
          button.textContent = 'Отправляем…';
        }
        setStatus('Отправляем обращение…', '');

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' }
          });
          if (!response.ok) throw new Error('Form submit failed');

          attempts.push(now);
          safeStorageSet('kw_form_attempts', attempts);
          safeStorageSet('kw_last_submission', { fingerprint, time: now });
          form.reset();
          setStatus(form.classList.contains('review-form')
            ? 'Спасибо! Отзыв отправлен на модерацию.'
            : 'Спасибо! Заявка отправлена. Мы скоро вам позвоним.', 'success');
          metrikaGoal(form.classList.contains('review-form') ? 'review_success' : 'form_success', {
            page: location.pathname,
            traffic_quality: traffic.suspicious ? 'suspected_repeat_click' : 'normal'
          });
        } catch (_) {
          setStatus('Не удалось отправить форму. Позвоните по <a href="tel:+79868311588">+7 (986) 831-15-88</a> или напишите в <a href="https://t.me/klarwerk_spb" target="_blank" rel="noopener">Telegram</a>.', 'error');
          metrikaGoal('form_error', { page: location.pathname });
        } finally {
          if (button) {
            button.disabled = false;
            button.classList.remove('is-loading');
            button.textContent = originalText;
          }
        }
      });
    });
  }

  /* ==========================================================
     ИНИЦИАЛИЗАЦИЯ
     ========================================================== */
  function init() {
    initPageHeroEnhancement();
    initHomeServicePromise();
    initTrafficProtection();
    initConversionTracking();
    initProtectedForms();
    initPreloader();
    initHeaderScroll();
    initBurger();
    initNavContacts();
    initCounters();
    initSmoothScroll();
    initCalculator();
    initBreakdowns();
    initReviews();
    initReveal();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
