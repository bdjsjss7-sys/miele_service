/* ============================================================
   KLARWERK — Скрипты v2
   Прелоадер · Шапка · Меню · Счётчики · Калькулятор
   Каталог поломок · Отзывы с подгрузкой · Reveal
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     БАЗА ПОЛОМОК
     ========================================================== */
  const BREAKDOWNS = {
    coffee: [
      {
        title: 'Не наливает кофе / слабый напор',
        price: 'от 4 500 ₽',
        article: 'Чаще всего забит заварочный блок или изношена помпа. Кофейная гуща и накипь со временем блокируют каналы. Чистим блок, проверяем давление помпы, при износе меняем. Профилактика — промывка таблетками раз в месяц.',
      },
      {
        title: 'Течёт вода снизу корпуса',
        price: 'от 5 500 ₽',
        article: 'Причина — треснувший бойлер, износ уплотнителей или засор дренажа. У Miele CM часто виноват клапан сброса давления. Разбираем, меняем уплотнители и бойлер при необходимости, проверяем герметичность под давлением.',
      },
      {
        title: 'Не нагревает воду / холодный кофе',
        price: 'от 4 800 ₽',
        article: 'Вышел из строя ТЭН или термодатчик бойлера. У премиум-моделей стоит двойной бойлер — один для кофе, второй для пара. Диагностируем оба, меняем неисправный узел. Проверяем работу термостата.',
      },
      {
        title: 'Ошибка на дисплее / не включается',
        price: 'от 5 000 ₽',
        article: 'Обычно сбой платы управления после скачка напряжения или износа конденсаторов. Диагностируем электронику, при лёгких случаях — перепрошивка, при серьёзных — замена модуля. Ставим оригинальный блок Miele.',
      },
      {
        title: 'Не работает капучинатор / пар',
        price: 'от 3 800 ₽',
        article: 'Засор трубок молока, износ парогенератора или клапана подачи пара. Разбираем узел, чистим ультразвуком, при износе меняем трубки и клапан. Профилактика — ежедневная промывка после вспенивания.',
      },
      {
        title: 'Шумит / гудит при работе',
        price: 'от 3 500 ₽',
        article: 'Износ помпы, кофемолки или подшипников двигателя. У Miele часто гудит кофемолка — из-за износа жернов. Меняем жернова, смазываем двигатель, при необходимости — помпа.',
      },
    ],
    dish: [
      {
        title: 'Ошибка F11 / не сливает воду',
        price: 'от 4 200 ₽',
        article: 'У Miele F11 — проблема с дренажной системой. Виновники: засор фильтра, износ сливной помпы или забитый обратный клапан. Чистим систему, меняем помпу при износе. Часто решается за один выезд.',
      },
      {
        title: 'Ошибка F24 / не набирает воду',
        price: 'от 4 000 ₽',
        article: 'Проблема с подачей воды. Причины — засор впускного клапана, износ аквасенсора или неисправность прессостата. Чистим или меняем клапан, проверяем датчик уровня воды.',
      },
      {
        title: 'Плохо моет посуду',
        price: 'от 3 500 ₽',
        article: 'Засорены форсунки коромысел, износ моющей помпы или сбой дозатора. Разбираем коромысла, чистим форсунки, проверяем давление помпы. У премиум-моделей есть система AutoDos — проверяем её отдельно.',
      },
      {
        title: 'Не сушит / остаётся вода на посуде',
        price: 'от 3 800 ₽',
        article: 'Износ ТЭНа сушки, неисправность вентилятора конденсации или засор воздуховода. Диагностируем систему сушки, чистим каналы, меняем деталь. У Miele сушка Zeolith — отдельная диагностика.',
      },
      {
        title: 'Течёт вода на пол',
        price: 'от 4 500 ₽',
        article: 'Износ уплотнителя дверцы, треснувший шланг или проблема с системой WaterProof. Проверяем герметичность, меняем уплотнители и шланги. У Miele есть датчик протечки — сбрасываем и проверяем систему.',
      },
      {
        title: 'Не открывается дверца после мойки',
        price: 'от 3 200 ₽',
        article: 'Сбой системы AutoOpen или износ замка. Проверяем механику замка, работу датчика открытия, исправность привода. Заменяем неисправный узел.',
      },
    ],
    wash: [
      {
        title: 'Не отжимает / не крутит барабан',
        price: 'от 4 500 ₽',
        article: 'Износ ремня, щёток двигателя или неисправность платы. Проверяем ремень, двигатель, датчик скорости. Заменяем изношенные детали. У Miele часто виноват модуль управления.',
      },
      {
        title: 'Шумит / стучит при отжиме',
        price: 'от 6 500 ₽',
        article: 'Износ подшипников барабана — классика. При долгом использовании подшипник разбивается, появляется гул. Меняем подшипник, сальник, проверяем ось барабана. Работа 3–4 часа.',
      },
      {
        title: 'Не сливает воду',
        price: 'от 3 800 ₽',
        article: 'Засор фильтра, износ сливной помпы или проблема с датчиком уровня. Чистим фильтр, проверяем помпу, меняем при износе. Часто клиент может сам почистить — подскажем по телефону.',
      },
      {
        title: 'Течёт вода',
        price: 'от 4 000 ₽',
        article: 'Износ уплотнителя люка, треснувший патрубок или проблема с дренажем. Проверяем все соединения, меняем уплотнители. У Miele система WaterControl — проверяем отдельно.',
      },
      {
        title: 'Ошибка на дисплее',
        price: 'от 4 500 ₽',
        article: 'Сбой электроники. Диагностируем плату, датчики, систему безопасности. При программной ошибке — сброс, при аппаратной — замена модуля. Оригинал Miele.',
      },
      {
        title: 'Не греет воду',
        price: 'от 4 200 ₽',
        article: 'Износ ТЭНа или неисправность термодатчика. У Miele ТЭН интегрирован с системой нагрева — проверяем весь узел. Меняем ТЭН и датчик при необходимости.',
      },
    ],
    dryer: [
      {
        title: 'Не сушит / долго сохнет',
        price: 'от 5 000 ₽',
        article: 'У сушильных машин с тепловым насосом — утечка фреона или износ компрессора. Проверяем контур, заправляем фреон, при износе меняем компрессор. У конденсационных — засор воздуховода.',
      },
      {
        title: 'Шумит / гудит',
        price: 'от 4 500 ₽',
        article: 'Износ подшипников барабана или роликов. Разбираем корпус, меняем подшипники, ролики, ремни. У Miele — своя система подвески барабана, требует квалификации.',
      },
      {
        title: 'Ошибка на дисплее',
        price: 'от 4 800 ₽',
        article: 'Диагностируем плату управления, датчики влажности, температуры. У Miele сенсоры PerfectDry — точная диагностика. При сбое меняем модуль или датчики.',
      },
      {
        title: 'Не запускается',
        price: 'от 4 200 ₽',
        article: 'Проверяем питание, кнопку старт, блокировку дверцы, плату. У премиум-моделей — система самодиагностики, считываем коды ошибок с дисплея.',
      },
    ],
    oven: [
      {
        title: 'Не греет / греет слабо',
        price: 'от 4 000 ₽',
        article: 'Вышел из строя ТЭН или термостат. У Gaggenau часто несколько ТЭНов — верх, низ, конвекция. Диагностируем каждый, меняем неисправный. Проверяем работу термодатчика.',
      },
      {
        title: 'Пиролиз не работает',
        price: 'от 5 500 ₽',
        article: 'Система пиролитической очистки — это отдельный нагрев до 500°C. При отказе — проверяем датчик температуры, ТЭН пиролиза, замок блокировки дверцы. У Miele PyroFit — своя диагностика.',
      },
      {
        title: 'Не работает конвекция',
        price: 'от 4 500 ₽',
        article: 'Износ вентилятора конвекции или двигателя. Разбираем заднюю стенку, диагностируем вентилятор, при износе меняем. Проверяем работу датчиков температуры.',
      },
      {
        title: 'Дверца не закрывается / не фиксируется',
        price: 'от 3 500 ₽',
        article: 'Износ петель, сломанный замок, растянутые пружины. Меняем петли или замок. У премиум-моделей — система мягкого закрытия SoftClose, требует оригинальных деталей.',
      },
      {
        title: 'Ошибка / не включается',
        price: 'от 4 800 ₽',
        article: 'Проблема с платой управления или модулем. У Miele и Gaggenau — сенсорные панели, часто виноват контроллер. Диагностируем, при сбое меняем плату.',
      },
    ],
    induction: [
      {
        title: 'Не включается / не реагирует на касания',
        price: 'от 5 000 ₽',
        article: 'Сбой сенсорной панели или платы управления. У Miele и Neff — ёмкостные сенсоры, чувствительны к влаге. Проверяем контроллер, при износе меняем модуль.',
      },
      {
        title: 'Не греет одна зона',
        price: 'от 4 800 ₽',
        article: 'Износ индукционной катушки или реле на плате. Диагностируем модуль, прозваниваем катушку. Меняем неисправный узел — катушку или плату.',
      },
      {
        title: 'Ошибка на дисплее',
        price: 'от 4 500 ₽',
        article: 'Диагностика электроники. У Neff TwistPad — проверим пульт управления, у Miele — сенсорную панель. При сбое — замена модуля или ремонт платы.',
      },
      {
        title: 'Выбивает пробки при включении',
        price: 'от 5 500 ₽',
        article: 'Пробой индуктора или короткое замыкание в плате. Диагностируем изоляцию, проверяем силовые ключи. Опасно эксплуатировать — вызывайте инженера.',
      },
    ],
    fridge: [
      {
        title: 'Не морозит / слабо морозит',
        price: 'от 5 500 ₽',
        article: 'Утечка фреона, износ компрессора или засор капилляра. У премиум-моделей Miele — двойной контур охлаждения. Диагностируем давление, ищем утечку, заправляем фреон.',
      },
      {
        title: 'Течёт вода внутри',
        price: 'от 4 500 ₽',
        article: 'Засор дренажа или проблема с системой No Frost. У Miele с PerfectFresh — отдельный дренаж для зоны свежести. Чистим, проверяем систему оттайки.',
      },
      {
        title: 'Шумит / гудит',
        price: 'от 4 800 ₽',
        article: 'Износ компрессора или вентилятора No Frost. Проверяем оба, при износе меняем. У Miele компрессоры с инверторным управлением — точная диагностика.',
      },
      {
        title: 'Намерзает лёд / снег',
        price: 'от 5 000 ₽',
        article: 'Сбой системы No Frost — неисправен ТЭН оттайки, таймер или датчик. Диагностируем, меняем неисправный узел. Профилактика — не ставить горячее, следить за уплотнителем.',
      },
      {
        title: 'Ошибка на дисплее',
        price: 'от 5 500 ₽',
        article: 'Электроника Miele с самодиагностикой. Считываем коды, диагностируем плату, датчики температуры, систему управления. Меняем неисправные модули.',
      },
    ],
    vacuum: [
      {
        title: 'Не включается',
        price: 'от 2 500 ₽',
        article: 'У Miele — проблема с кнопкой или платой. У Dyson — износ аккумулятора. Проверяем питание, батарею, кнопку. Меняем неисправный узел.',
      },
      {
        title: 'Потерял мощность / слабо сосёт',
        price: 'от 2 800 ₽',
        article: 'Засор фильтров, износ турбины или проблема с мотором. Чистим систему, проверяем щётки двигателя. У Dyson V — износ аккумулятора теряет мощность.',
      },
      {
        title: 'Аккумулятор быстро садится',
        price: 'от 3 500 ₽',
        article: 'Износ Li-Ion батареи — типично после 3–4 лет. Меняем на оригинальный аккумулятор. У Dyson V11/V15 — сменные батареи, у Miele — специализированные.',
      },
      {
        title: 'Шумит / вибрирует',
        price: 'от 2 800 ₽',
        article: 'Износ подшипников двигателя или турбины. Разбираем, проверяем вал, при износе меняем узел. Балансируем турбину.',
      },
    ],
    iron: [
      {
        title: 'Не подаёт пар',
        price: 'от 3 200 ₽',
        article: 'Засор парогенератора накипью или износ клапана. У Miele FashionMaster — двухрезервуарная система. Промываем, при износе меняем клапан или парогенератор.',
      },
      {
        title: 'Течёт вода',
        price: 'от 3 500 ₽',
        article: 'Износ уплотнителей, треснувший бойлер или засор системы. У Laurastar — проблема с профессиональным бойлером. Меняем уплотнители, проверяем корпус.',
      },
      {
        title: 'Не нагревается',
        price: 'от 3 800 ₽',
        article: 'Износ ТЭНа или термостата. Диагностируем нагрев, меняем неисправный узел. У премиум-станций — двойной контур нагрева.',
      },
      {
        title: 'Не работает подошва утюга',
        price: 'от 3 000 ₽',
        article: 'Окисление контактов, износ нагревателя или проблема с управлением. Диагностируем утюг отдельно от станции, меняем неисправный узел.',
      },
    ],
    micro: [
      {
        title: 'Не греет',
        price: 'от 3 500 ₽',
        article: 'Вышел из строя магнетрон — классика. Проверяем высоковольтный диод, конденсатор, магнетрон. Меняем неисправный узел на оригинал.',
      },
      {
        title: 'Искрит внутри',
        price: 'от 2 800 ₽',
        article: 'Прогорела слюдяная пластина или повреждено покрытие. Опасно использовать! Меняем пластину, при повреждении камеры — ремонт или замена.',
      },
      {
        title: 'Не включается / не крутит',
        price: 'от 3 000 ₽',
        article: 'Проверяем предохранители, плату управления, двигатель поддона. У Miele и Bosch — чувствительная электроника. Меняем предохранители или плату.',
      },
      {
        title: 'Не работает гриль',
        price: 'от 3 200 ₽',
        article: 'Износ ТЭНа гриля или сбой реле на плате. Диагностируем нагрев, при износе меняем ТЭН. Проверяем работу таймера и реле.',
      },
    ],
  };

  /* ==========================================================
     БАЗА ОТЗЫВОВ (20 штук, 3 с 4 звёздами)
     ========================================================== */
  const REVIEWS = [
    { name: 'Анна К.', area: 'Приморский р-н', device: 'Кофемашина Miele', rating: 5, text: 'Инженер приехал через час после звонка. Разобрал, показал износ, починил. Всё аккуратно, чисто. Работает как новая.' },
    { name: 'Дмитрий В.', area: 'Центральный р-н', device: 'Посудомойка Miele', rating: 5, text: 'Ошибка F11. Официальный сервис просил 18 000 и ждать деталь две недели. Инженер KLARWERK починил за 6 500 в тот же день, оригинальной запчастью.' },
    { name: 'Екатерина М.', area: 'Петроградский р-н', device: 'Духовка Gaggenau', rating: 5, text: 'Долго искала нормальный сервис по Gaggenau. Здесь — единственные, кто реально разбирается. Всё объяснили, показали, гарантия 2 года. Рекомендую.' },
    { name: 'Игорь С.', area: 'Московский р-н', device: 'Стиральная Miele', rating: 5, text: 'Честные инженеры. Могли бы наговорить на замену подшипников, а поменяли помпу и всё. Сэкономили прилично.' },
    { name: 'Ольга Р.', area: 'Выборгский р-н', device: 'Винный шкаф Miele', rating: 5, text: 'Винный шкаф перестал держать температуру. Инженер приехал с инструментами, нашёл утечку, заправил. Работает идеально.' },
    { name: 'Сергей П.', area: 'Невский р-н', device: 'Индукционная панель Neff', rating: 5, text: 'Панель просто перестала включаться. Оказалось, модуль. Заменили за один визит, всё работает. Профессионалы своего дела.' },
    { name: 'Мария Т.', area: 'Калининский р-н', device: 'Сушильная Miele', rating: 5, text: 'Сушилка с тепловым насосом перестала сушить. Думала, всё — покупать новую. Инженер нашёл утечку фреона, заправил. Полёт нормальный, тьфу-тьфу.' },
    { name: 'Алексей Ж.', area: 'Красногвардейский р-н', device: 'Кофемашина Neff', rating: 5, text: 'Потекло снизу. Оказался бойлер. Заменили за 2 часа, поставили оригинал. Дали гарантию 3 года. Всё чисто, аккуратно.' },
    { name: 'Наталья Б.', area: 'Фрунзенский р-н', device: 'Посудомойка Smeg', rating: 5, text: 'Не сушила посуду. Оказалось, вентилятор сушки. Заменили быстро, объяснили причину. Теперь сушит даже лучше, чем было.' },
    { name: 'Владимир К.', area: 'Приморский р-н', device: 'Духовка Miele', rating: 5, text: 'Пиролиз перестал работать. Сервис по телефону развёл руками. Эти ребята приехали, разобрались, починили. Дорого, но качественно.' },
    { name: 'Ирина Л.', area: 'Адмиралтейский р-н', device: 'Пылесос Dyson', rating: 5, text: 'Аккумулятор сдох, оригинал дорого. Поменяли на новый, ещё и почистили турбину заодно. Работает как новый, рекомендую.' },
    { name: 'Павел Н.', area: 'Красносельский р-н', device: 'Стиральная Neff', rating: 5, text: 'Шумела при отжиме. Подшипник. Понимаю, что дорого, но починили за день. Разобрали, заменили, собрали. Ничего лишнего не наговорили.' },
    { name: 'Татьяна Г.', area: 'Петродворцовый р-н', device: 'Гладильная станция Miele', rating: 5, text: 'Пар перестал идти. Инженер приехал, почистил систему, объяснил, что надо использовать дистиллированную воду. Работает отлично.' },
    { name: 'Роман Ш.', area: 'Василеостровский р-н', device: 'Холодильник Liebherr', rating: 5, text: 'Не морозил нижний отсек. Утечка. Заправили, заменили клапан. Дали гарантию 2 года. Надеюсь, больше не придётся, но если что — только к ним.' },
    { name: 'Елена С.', area: 'Московский р-н', device: 'Микроволновка Bosch', rating: 5, text: 'Перестала греть. Магнетрон. В сервисе сказали — дешевле новую. Здесь починили, заменили магнетрон, всё работает. Спасибо.' },
    { name: 'Андрей Ф.', area: 'Невский р-н', device: 'Вытяжка Miele', rating: 5, text: 'Мотор загудел. Приехали, разобрали, оказалось — подшипник. Заменили, работает тихо. Почистили фильтры заодно, приятно.' },
    { name: 'Юлия Д.', area: 'Центральный р-н', device: 'Кофемашина Gaggenau', rating: 5, text: 'Ошибка. Думала, плату менять — дорого. Оказалось, сенсор. Заменили за копейки, объяснили, что дальше. Честные люди.' },
    { name: 'Максим А.', area: 'Выборгский р-н', device: 'Посудомойка Miele', rating: 4, text: 'Работой довольны, всё починили. Один момент — инженер опоздал на час, предупредил за 20 минут. В остальном претензий нет, рекомендую.' },
    { name: 'Светлана О.', area: 'Кировский р-н', device: 'Духовка Neff', rating: 4, text: 'Починили быстро и качественно. Но за запчастью пришлось ждать 6 дней — заказывали из Германии. Понимаю, что это норма для оригинала, но осадок остался.' },
    { name: 'Николай В.', area: 'Пушкинский р-н', device: 'Сушильная Bosch', rating: 4, text: 'Всё ок, но диагностика стоила дороже, чем я ожидал по телефону. Изначально назвали 1500, на месте — 2000. По ремонту — без нареканий, работает.' },
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
     3. БУРГЕР-МЕНЮ
     ========================================================== */
  function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;
    const toggle = () => {
      burger.classList.toggle('is-open');
      nav.classList.toggle('is-open');
      document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
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
     4. СЧЁТЧИКИ
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
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
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
      fridge:    { miele: 5500, neff: 4500, gaggenau: 6000, smeg: 4500, bosch: 4000, other: 3500 },
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
        listWrap.innerHTML = items.map((item, i) => `
          <details class="breakdown" ${i === 0 ? '' : ''}>
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

    // Первый рендер
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
      // Плавное появление новых карточек
      list.querySelectorAll('.review').forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          el.classList.add('reveal');
          requestAnimationFrame(() => el.classList.add('is-visible'));
        }
      });
    };

    // Первая партия
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
     ИНИЦИАЛИЗАЦИЯ
     ========================================================== */
  function init() {
    initPreloader();
    initHeaderScroll();
    initBurger();
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
