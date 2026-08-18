/**
 * NODUS CRM Integrator — app.js v6 LUXURY
 * Complete reactive calculator, client case modal lightbox, mobile navigation, copy utilities.
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. MOBILE MENU DRAWER
    // =========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks  = document.querySelectorAll('.mobile-nav-link, .mobile-btn');

    const closeDrawer = () => {
        if (!mobileDrawer) return;
        mobileDrawer.classList.remove('open');
        if (mobileToggle) {
            mobileToggle.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity   = '1';
                spans[2].style.transform = 'none';
            }
        }
    };

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileToggle.classList.toggle('active', isOpen);
            const spans = mobileToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                if (isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity   = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
                } else {
                    closeDrawer();
                }
            }
        });
        drawerLinks.forEach(l => l.addEventListener('click', closeDrawer));
        document.addEventListener('click', e => {
            if (mobileDrawer.classList.contains('open') &&
                !mobileDrawer.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                closeDrawer();
            }
        });
    }

    // =========================================================================
    // 2. SCROLL SPY & SCROLL TO TOP
    // =========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const activateNav = () => {
        const scrollY = window.scrollY + 120;
        let current = '';
        sections.forEach(s => { if (scrollY >= s.offsetTop) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
    };
    window.addEventListener('scroll', activateNav, { passive: true });
    activateNav();

    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // =========================================================================
    // 3. PRICING TABS SWITCHER
    // =========================================================================
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === target));
        });
    });

    // =========================================================================
    // 4. CLIENT CASES LIGHTBOX MODAL DATA & HANDLERS
    // =========================================================================
        const CLIENT_CASES = {
        underground_gym: {
            name: 'Underground Gym',
            industry: 'Спортивный клуб & Фитнес',
            logo: 'images/underground_gym.png',
            stack: ['AmoCRM', 'Wazzup', 'Binotel'],
            desc: 'Настроили воронки и этапы для отдела продления абонементов. Участвовали в разработке и интеграции с AmoCRM специализированной клиентской CRM (основное рабочее пространство менеджеров). Оптимизировали расходы на телефонию: перевели компанию с Sipuni на Binotel без потери качества связи.',
            results: [
                'Конверсия отдела продления абонементов выросла на +11%',
                'Ежемесячная экономия 300 000 ₸ на телефонии для большого штата продавцов',
                'Бесшовная связка внутренней клиентской CRM с AmoCRM'
            ]
        },
        igps_kz: {
            name: 'iGPS.KZ',
            industry: 'GPS-трекеры для лошадей — контроль табуна 24/7',
            logo: 'images/igps_kz.png',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'Разработали воронки и этапы для отдела продаж под специфику GPS-мониторинга лошадей и контроля табуна 24/7. Настроили бесшовную связку каналов связи прямо в Bitrix24.',
            results: [
                'Конверсия отдела продаж увеличилась на +18%',
                '100% фиксация всех входящих обращений от фермеров и хозяйств',
                'Быстрое выставление счетов и контроль повторных оплат'
            ]
        },
        tabyn_trans: {
            name: 'Tabyn Trans',
            industry: 'Международные грузоперевозки & Логистика',
            logo: 'images/tabyn_trans.png',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'По аналогии с iGPS разработали воронки и этапы для отдела продаж и логистики, объединили каналы связи и настроили прозрачный трекинг стадий нахождения груза.',
            results: [
                'Конверсия от заявки в поставку выросла на +21%',
                'Средний чек по сделкам вырос на +14%',
                'Полная прозрачность стадий доставки для заказчиков и менеджеров'
            ]
        },
        raithai_spa: {
            name: 'RaiThai Massage & Spa',
            industry: 'Премиум Массаж & SPA-салон',
            logo: 'images/raithai_spa.jpg',
            stack: ['AmoCRM', 'Wazzup', 'Sipuni'],
            desc: 'Клиент пришел после неудачного опыта с другим интегратором. Мы полностью переделали архитектуру воронки, восстановили и отладили связку мессенджеров Wazzup и телефонии Sipuni под реальные сценарии администраторов.',
            results: [
                'Полностью устранен хаос в записях и потерянных звонках',
                'Удобный конвейер записи гостей через WhatsApp и Instagram',
                'Надежная и понятная система для администраторов салона'
            ]
        },
        saq_clinic: {
            name: 'SAQ Esthetic Clinic',
            industry: 'Эстетическая косметология & Клиника',
            logo: 'images/saq_clinic.jpg',
            stack: ['AmoCRM', 'Wazzup', 'Sipuni'],
            desc: 'Выполнили полный бесшовный перенос клиники с одного портала AmoCRM на другой. Построили новую схему работы: воронка первичных консультаций и воронка повторных процедур, удобная и понятная для врачей и администраторов.',
            results: [
                'Конверсия от входящей заявки в успешный визит выросла на +24%',
                'Исключена потеря пациентов между курсами процедур',
                'Сквозная фиксация всех диалогов в WhatsApp и звонков'
            ]
        },
        chotam_show: {
            name: 'Cho Tam! Show',
            industry: 'Организация масштабных шоу и мероприятий',
            logo: 'images/chotam_show.jpg',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'Раньше все заявки велись хаотично только в личном WhatsApp, из-за чего возникали накладки. Мы перевели все коммуникации в Bitrix24, внедрили единую очередь лидов и автоматические уведомления.',
            results: [
                'Качество и скорость обратной связи улучшились на +25%',
                'Конверсия от заявки в успешную сделку выросла на +18%',
                'Полный порядок в бронированиях дат и смет мероприятий'
            ]
        },
        tengovka_karaoke: {
            name: 'Tengovka',
            industry: 'Караоке, баня, зона отдыха',
            logo: 'images/tengovka_karaoke.jpg',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'Объединили 3 разных направления (Караоке, Баня, Зона отдыха) в единую систему Bitrix24 для прозрачной аналитики, учета визитов и истории гостей. (Честный кейс: система успешно отработала 5 месяцев и оцифровала процессы, но из-за перебоев с загородным интернетом на локации заказчик временно перешел на офлайн-формат).',
            results: [
                'Оцифрована клиентская база всех 3 направлений комплекса',
                'Настроена сквозная сегментация гостей и учет визитов',
                'Протестированы все сценарии бронирования и подтверждения отдыха'
            ]
        },
        alucore_nutrition: {
            name: 'Alucore Nutrition',
            industry: 'Производство и запуск БАДов',
            logo: 'images/alucore_nutrition.jpg',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'Запуск продаж линейки БАДов под ключ: настроили Bitrix24, автоматические отчеты, авто-отправку заявок в службу доставки и отдельные Telegram-группы для оперативного поступления новых заказов и логистики. (Проект показал отличную техническую базу, несмотря на высокую текучку продажников на стороне заказчика).',
            results: [
                'Полная автоматизация конвейера: от заказа до отправки в доставку',
                'Мгновенные уведомления о новых заявках в Telegram-группы',
                'Автоматизированная отчетность по продажам за каждый день'
            ]
        },
        status_in_trade: {
            name: 'Status in Trade',
            industry: 'Производство и монтаж пластиковых окон',
            logo: 'images/status_in_trade.jpg',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'Ранее клиент работал с нами по направлению Stat Import. Позже было принято решение перевести и продажи пластиковых окон в единую централизованную систему Bitrix24 со связкой Wazzup.',
            results: [
                'Конверсия в успешную продажу окон выросла на +14%',
                'Единое окно для замерщиков, менеджеров и монтажных бригад',
                'Контроль повторных обращений и гарантийного обслуживания'
            ]
        },
        pve_academy: {
            name: 'PVE Киноакадемия',
            industry: 'Киноакадемия & Обучение',
            logo: 'images/pve_academy.jpg',
            stack: ['AmoCRM', 'Wazzup', 'Sipuni'],
            desc: 'Упростили структуру воронок, внедрили автоматические сообщения и напоминания студентам, настроили более точную аналитику рекламных каналов и эффективности менеджеров.',
            results: [
                'Рост общих продаж курсов на +13%',
                'Авто-дожим лидов в WhatsApp перед стартом учебных потоков',
                'Прозрачная аналитика окупаемости рекламного бюджета'
            ]
        },
        inflex: {
            name: 'InFLEX',
            industry: 'Платформа запуска стартапов на Kickstarter',
            logo: 'images/inflex.jpg',
            stack: ['Bitrix24', 'Wazzup'],
            desc: 'Внедрили максимальную автоматизацию сообщений и напоминаний, разработали интерактивную бриф-форму для клиентов и систему отслеживания стадий подготовки проектов к краудфандингу.',
            results: [
                'Потери и забывания клиентов сократились на 31%',
                'Прозрачный контроль каждого этапа подготовки проекта на Kickstarter',
                'Автоматический сбор брифов и файлов от стартаперов'
            ]
        },
        cittadella: {
            name: 'Мебельная фабрика Cittadella',
            industry: 'Мебельная фабрика & Шоурумы',
            logo: 'images/cittadella.jpg',
            stack: ['AmoCRM', 'Wazzup'],
            desc: 'Пришли после другого интегратора. Мы оптимизировали существующие воронки, добавили недостающие этапы допродаж и настроили цепочку взаимодействия между онлайн-заявками и шоурумами.',
            results: [
                'Доходимость от заявки до визита в шоурум выросла на +23%',
                'Конверсия из заявки в итоговую сделку выросла на +8%',
                'Четкая фиксация клиентов между менеджерами салонов'
            ]
        }
    };

    const clientModal    = document.getElementById('client-modal');
    const cmCloseBtn     = document.getElementById('client-modal-close-btn');
    const cmLogo         = document.getElementById('cm-logo');
    const cmTitle        = document.getElementById('cm-title');
    const cmIndustry     = document.getElementById('cm-industry');
    const cmStack        = document.getElementById('cm-stack');
    const cmDesc         = document.getElementById('cm-desc');
    const cmResults      = document.getElementById('cm-results');
    const cmCtaBtn       = document.getElementById('cm-cta-btn');

    document.querySelectorAll('[data-client-id]').forEach(card => {
        card.addEventListener('click', () => {
            const cid = card.getAttribute('data-client-id');
            const data = CLIENT_CASES[cid];
            if (!data || !clientModal) return;

            if (cmLogo) cmLogo.src = data.logo;
            if (cmTitle) cmTitle.textContent = data.name;
            if (cmIndustry) cmIndustry.textContent = data.industry;
            if (cmDesc) cmDesc.textContent = data.desc;

            if (cmStack) {
                cmStack.innerHTML = data.stack.map(s => {
                    let cls = 'amo';
                    if (s.toLowerCase().includes('bitrix')) cls = 'bitrix';
                    if (s.toLowerCase().includes('wazzup') || s.toLowerCase().includes('whatsapp')) cls = 'wazzup';
                    if (s.toLowerCase().includes('sipuni')) cls = 'sipuni';
                    if (s.toLowerCase().includes('binotel')) cls = 'binotel';
                    return `<span class="stack-badge ${cls}">${s}</span>`;
                }).join('');
            }

            if (cmResults) {
                cmResults.innerHTML = data.results.map(r => `<li>${r}</li>`).join('');
            }

            clientModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeClientModal = () => {
        if (!clientModal) return;
        clientModal.classList.remove('open');
        document.body.style.overflow = '';
    };

    cmCloseBtn && cmCloseBtn.addEventListener('click', closeClientModal);
    clientModal && clientModal.addEventListener('click', e => { if (e.target === clientModal) closeClientModal(); });

    if (cmCtaBtn) {
        cmCtaBtn.addEventListener('click', () => {
            closeClientModal();
            const calc = document.getElementById('calculator');
            if (calc) calc.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // =========================================================================
    // 5. REQUISITES MODAL & CLIPBOARD
    // =========================================================================
    const reqModal    = document.getElementById('requisites-modal');
    const openReqBtn  = document.getElementById('open-req-btn');
    const reqCloseBtn = document.getElementById('req-close-btn');
    if (openReqBtn && reqModal) {
        openReqBtn.addEventListener('click', () => { reqModal.classList.add('open'); document.body.style.overflow = 'hidden'; });
        const closeReq = () => { reqModal.classList.remove('open'); document.body.style.overflow = ''; };
        reqCloseBtn && reqCloseBtn.addEventListener('click', closeReq);
        reqModal.addEventListener('click', e => { if (e.target === reqModal) closeReq(); });
    }
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const el = document.getElementById(btn.getAttribute('data-target'));
            if (!el) return;
            navigator.clipboard.writeText(el.textContent.trim()).then(() => {
                const orig = btn.textContent;
                btn.textContent = 'Скопировано!';
                btn.style.cssText = 'background:#22c55e;border-color:#22c55e;color:#fff';
                setTimeout(() => { btn.textContent = orig; btn.style.cssText = ''; }, 2000);
            });
        });
    });

    // =========================================================================
    // 6. CALCULATOR V6 LOGIC
    // =========================================================================

    // Pricing dictionaries
            const AMO_PRICES = { basic: 5199, advanced: 9899, enterprise: 15099 };
    const AMO_TERMS = {
        6:  { billMonths: 6,  bonusText: '+1 мес в подарок', label: '6 мес' },
        9:  { billMonths: 8,  bonusText: '+1 мес в подарок', label: '9 мес' },
        12: { billMonths: 10, bonusText: '+2 мес в подарок', label: '12 мес (1 год)' }
    };
    const BX_PRICES = {
        basic:        { 1: 15080, 12: 144768 },
        standard:     { 1: 44080, 12: 423168 },
        professional: { 1: 88160, 12: 846336 }
    };
    const SP_PRICES  = { basic: 3200, advanced: 6400, pro: 9600 };
    const WZ_PRICES  = {
        wa:  { start: 6000, inbox: 12000, pro: 24000, max: 36000 },
        ig:  { inbox: 12000, max: 24000 },
        tg:  { start: 6000, inbox: 12000, pro: 24000, max: 36000 },
        vk:  { free: 0, max: 24000 }
    };
    const NODUS_PRICES = { none: 0, basic: 100000, standard: 250000, vip: 500000 };

    // Calculator State
    const state = {
        crm: 'amocrm', // 'amocrm' | 'bitrix24'
        amoPlan: 'basic',
        amoUsers: 5,
        amoTerm: 6,
        bxPlan: 'basic',
        bxTerm: 1,

        wzEnabled: true,
        wzTerm: 1,
        waCount: 0,
        waTier: 'pro',
        igCount: 0,
        igTier: 'inbox',
        tgCount: 0,
        tgTier: 'pro',
        vkCount: 0,
        vkTier: 'free',

        spEnabled: true,
        spPlan: 'basic',
        spUsers: 0,
        spTerm: 1,

        nodusPlan: 'standard',
        turboAddon: false,
        autoAddon: false,
        support: 'none'
    };

    let previousGrandTotal = 0;

    // Helper functions
    const fmt = n => Math.round(n).toLocaleString('ru-RU') + ' ₸';
    const getEl = id => document.getElementById(id);
    const setTxt = (id, val) => { const e = getEl(id); if (e) e.textContent = val; };
    const setDisplay = (id, show) => { const e = getEl(id); if (e) e.style.display = show ? '' : 'none'; };

    // ── Bind CRM System Tabs ──
    const btnAmo = getEl('btn-crm-amocrm');
    const btnBx  = getEl('btn-crm-bitrix24');
    const cfgAmo = getEl('cfg-amocrm');
    const cfgBx  = getEl('cfg-bitrix24');

    if (btnAmo && btnBx) {
        btnAmo.addEventListener('click', () => {
            btnAmo.classList.add('active');
            btnBx.classList.remove('active');
            cfgAmo && cfgAmo.classList.remove('hidden');
            cfgBx && cfgBx.classList.add('hidden');
            state.crm = 'amocrm';
            calculateEstimate();
        });

        btnBx.addEventListener('click', () => {
            btnBx.classList.add('active');
            btnAmo.classList.remove('active');
            cfgBx && cfgBx.classList.remove('hidden');
            cfgAmo && cfgAmo.classList.add('hidden');
            state.crm = 'bitrix24';
            calculateEstimate();
        });
    }

    // ── Bind AmoCRM Plan Cards ──
    document.querySelectorAll('[data-amo-plan]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-amo-plan]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.amoPlan = card.getAttribute('data-amo-plan');
            calculateEstimate();
        });
    });

    // ── Bind AmoCRM Users Slider & Direct Number Input ──
    const rngAmoUsers = getEl('rng-amo-users');
    const inpAmoUsers = getEl('inp-amo-users');
    if (rngAmoUsers && inpAmoUsers) {
        rngAmoUsers.addEventListener('input', e => {
            state.amoUsers = parseInt(e.target.value) || 1;
            inpAmoUsers.value = state.amoUsers;
            calculateEstimate();
        });

        inpAmoUsers.addEventListener('input', () => {
            let v = parseInt(inpAmoUsers.value);
            if (isNaN(v) || v < 1) v = 1;
            if (v > 500) v = 500;
            state.amoUsers = v;
            rngAmoUsers.value = Math.min(v, 100);
            calculateEstimate();
        });

        inpAmoUsers.addEventListener('blur', () => {
            let v = parseInt(inpAmoUsers.value);
            if (isNaN(v) || v < 1) v = 1;
            if (v > 500) v = 500;
            inpAmoUsers.value = v;
            state.amoUsers = v;
            rngAmoUsers.value = Math.min(v, 100);
            calculateEstimate();
        });
    }

    // ── Bind AmoCRM Term Pills ──
    document.querySelectorAll('[data-amo-term]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-amo-term]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.amoTerm = parseInt(btn.getAttribute('data-amo-term')) || 6;
            calculateEstimate();
        });
    });

    // ── Bind Bitrix24 Plan Cards ──
    document.querySelectorAll('[data-bx-plan]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-bx-plan]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.bxPlan = card.getAttribute('data-bx-plan');
            calculateEstimate();
        });
    });

    // ── Bind Bitrix24 Term Pills ──
    document.querySelectorAll('[data-bx-term]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-bx-term]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.bxTerm = parseInt(btn.getAttribute('data-bx-term')) || 1;
            calculateEstimate();
        });
    });

    // ── Bind Wazzup Toggle ──
    const chkWzToggle = getEl('chk-wz-toggle');
    const boxWzContent = getEl('box-wz-content');
    if (chkWzToggle) {
        chkWzToggle.addEventListener('change', () => {
            state.wzEnabled = chkWzToggle.checked;
            if (boxWzContent) boxWzContent.style.display = state.wzEnabled ? '' : 'none';
            calculateEstimate();
        });
    }

    // ── Bind Wazzup Dropdowns ──
    const selWaTier = getEl('sel-wz-wa-tier');
    const selIgTier = getEl('sel-wz-ig-tier');
    const selTgTier = getEl('sel-wz-tg-tier');
    const selVkTier = getEl('sel-wz-vk-tier');

    if (selWaTier) selWaTier.addEventListener('change', e => { state.waTier = e.target.value; calculateEstimate(); });
    if (selIgTier) selIgTier.addEventListener('change', e => { state.igTier = e.target.value; calculateEstimate(); });
    if (selTgTier) selTgTier.addEventListener('change', e => { state.tgTier = e.target.value; calculateEstimate(); });
    if (selVkTier) selVkTier.addEventListener('change', e => { state.vkTier = e.target.value; calculateEstimate(); });

    // ── Stepper helper with +/- clicks ──
    const bindStepper = (minusId, plusId, valId, getVal, setVal, min = 0, max = 500) => {
        const minus = getEl(minusId);
        const plus  = getEl(plusId);
        const el    = getEl(valId);
        if (!minus || !plus || !el) return;

        const updateDisplay = () => {
            const v = getVal();
            if (el.tagName === 'INPUT') el.value = v;
            else el.textContent = v;
            calculateEstimate();
        };

        minus.addEventListener('click', e => {
            e.preventDefault();
            const cur = getVal();
            if (cur > min) {
                setVal(cur - 1);
                updateDisplay();
            }
        });

        plus.addEventListener('click', e => {
            e.preventDefault();
            const cur = getVal();
            if (cur < max) {
                setVal(cur + 1);
                updateDisplay();
            }
        });
    };

    bindStepper('btn-wa-minus', 'btn-wa-plus', 'val-wa-count', () => state.waCount, v => state.waCount = v, 0, 30);
    bindStepper('btn-ig-minus', 'btn-ig-plus', 'val-ig-count', () => state.igCount, v => state.igCount = v, 0, 30);
    bindStepper('btn-tg-minus', 'btn-tg-plus', 'val-tg-count', () => state.tgCount, v => state.tgCount = v, 0, 30);
    bindStepper('btn-vk-minus', 'btn-vk-plus', 'val-vk-count', () => state.vkCount, v => state.vkCount = v, 0, 30);

    // ── Bind Wazzup Term Pills ──
    document.querySelectorAll('[data-wz-term]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-wz-term]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.wzTerm = parseInt(btn.getAttribute('data-wz-term')) || 1;
            calculateEstimate();
        });
    });

    // ── Bind Sipuni Toggle ──
    const chkSpToggle = getEl('chk-sp-toggle');
    const boxSpContent = getEl('box-sp-content');
    if (chkSpToggle) {
        chkSpToggle.addEventListener('change', () => {
            state.spEnabled = chkSpToggle.checked;
            if (boxSpContent) boxSpContent.style.display = state.spEnabled ? '' : 'none';
            calculateEstimate();
        });
    }

    // ── Bind Sipuni Plan Cards ──
    document.querySelectorAll('[data-sp-plan]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-sp-plan]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.spPlan = card.getAttribute('data-sp-plan');
            calculateEstimate();
        });
    });

    // ── Bind Sipuni Users Stepper ──
    bindStepper('btn-sp-minus', 'btn-sp-plus', 'val-sp-users', () => state.spUsers, v => state.spUsers = v, 0, 500);

    // ── Bind Sipuni Term Pills ──
    document.querySelectorAll('[data-sp-term]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-sp-term]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.spTerm = parseInt(btn.getAttribute('data-sp-term')) || 1;
            calculateEstimate();
        });
    });

    // ── Bind NODUS Plan Cards ──
    document.querySelectorAll('[data-nodus-plan]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-nodus-plan]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.nodusPlan = card.getAttribute('data-nodus-plan');
            calculateEstimate();
        });
    });

    // ── Bind Turbo Speed Addon Checkbox ──
    const chkTurboAddon = getEl('chk-turbo-addon');
    if (chkTurboAddon) {
        chkTurboAddon.addEventListener('change', () => {
            state.turboAddon = chkTurboAddon.checked;
            calculateEstimate();
        });
    }

    // ── Bind Automation Checkbox ──
    const chkAutoAddon = getEl('chk-auto-addon');
    if (chkAutoAddon) {
        chkAutoAddon.addEventListener('change', () => {
            state.autoAddon = chkAutoAddon.checked;
            calculateEstimate();
        });
    }

    // ── Bind Support Cards ──
    document.querySelectorAll('[data-support-val]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('[data-support-val]').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.support = card.getAttribute('data-support-val');
            calculateEstimate();
        });
    });

    // =========================================================================
    // 7. ESTIMATE CALCULATION & UI REACTION
    // =========================================================================
        function calculateEstimate() {
        // ── 1. CRM License Calculation ──
        let crmTotal = 0;
        let crmDiscount = 0;
        let crmLabel = '';

        if (state.crm === 'amocrm') {
            const planNames = { basic: 'Базовый', advanced: 'Расширенный', enterprise: 'Профессиональный' };
            const termInfo = AMO_TERMS[state.amoTerm] || { billMonths: state.amoTerm, bonusText: '', label: `${state.amoTerm} мес` };
            const monthlyPerUser = AMO_PRICES[state.amoPlan] || 5199;
            crmTotal = monthlyPerUser * termInfo.billMonths * state.amoUsers;
            crmLabel = `AmoCRM «${planNames[state.amoPlan]}» (${state.amoUsers} польз. · ${termInfo.label} · ${termInfo.bonusText})`;
        } else {
            const planNames = { basic: 'Базовый', standard: 'Стандартный', professional: 'Профессиональный' };
            const bxPlanObj = BX_PRICES[state.bxPlan] || BX_PRICES.basic;
            crmTotal = bxPlanObj[state.bxTerm] || bxPlanObj[1];
            if (state.bxTerm === 12) {
                const regularYearPrice = bxPlanObj[1] * 12;
                crmDiscount = regularYearPrice - crmTotal;
                crmLabel = `Bitrix24 «${planNames[state.bxPlan]}» (12 мес со скидкой)`;
            } else {
                crmLabel = `Bitrix24 «${planNames[state.bxPlan]}» (1 мес)`;
            }
        }

        setTxt('est-crm-name', crmLabel);
        setTxt('est-crm-price', fmt(crmTotal));
        setTxt('subtotal-crm', fmt(crmTotal));
        // Dynamic Bitrix card prices based on term
        const bxBasicEl = getEl('bx-price-basic');
        const bxStdEl   = getEl('bx-price-standard');
        const bxProEl   = getEl('bx-price-professional');
        if (bxBasicEl && bxStdEl && bxProEl) {
            if (state.bxTerm === 12) {
                bxBasicEl.innerHTML = '144 768 ₸ <span class="tier-unit">/ год</span>';
                bxStdEl.innerHTML   = '423 168 ₸ <span class="tier-unit">/ год</span>';
                bxProEl.innerHTML   = '846 336 ₸ <span class="tier-unit">/ год</span>';
            } else {
                bxBasicEl.innerHTML = '15 080 ₸ <span class="tier-unit">/ мес</span>';
                bxStdEl.innerHTML   = '44 080 ₸ <span class="tier-unit">/ мес</span>';
                bxProEl.innerHTML   = '88 160 ₸ <span class="tier-unit">/ мес</span>';
            }
        }

        // ── 2. Wazzup Calculation ──
        let wzTotal = 0;
        let wzDiscount = 0;
        const wzRows = [];

        if (state.wzEnabled) {
            const channels = [
                { key: 'wa', name: 'WhatsApp', count: state.waCount, tier: state.waTier },
                { key: 'ig', name: 'Instagram', count: state.igCount, tier: state.igTier },
                { key: 'tg', name: 'Telegram', count: state.tgCount, tier: state.tgTier },
                { key: 'vk', name: 'VK', count: state.vkCount, tier: state.vkTier }
            ];

            let monthlyWzTotal = 0;
            channels.forEach(ch => {
                if (ch.count > 0) {
                    const pricePerChan = (WZ_PRICES[ch.key] && WZ_PRICES[ch.key][ch.tier]) !== undefined ? WZ_PRICES[ch.key][ch.tier] : 24000;
                    const chanMonthly = pricePerChan * ch.count;
                    monthlyWzTotal += chanMonthly;
                    wzRows.push({
                        label: `${ch.name} ${ch.tier.toUpperCase()} (${ch.count} кан. · ${state.wzTerm} мес)`,
                        price: chanMonthly * state.wzTerm
                    });
                }
            });

            const rawWzTotal = monthlyWzTotal * state.wzTerm;
            if (state.wzTerm === 6)  wzDiscount = Math.floor(rawWzTotal * 0.10);
            if (state.wzTerm === 12) wzDiscount = Math.floor(rawWzTotal * 0.20);
            wzTotal = rawWzTotal - wzDiscount;
        }

        const estWzBlock = getEl('est-wz-block');
        const estWzList  = getEl('est-wz-list');
        if (estWzBlock && estWzList) {
            if (state.wzEnabled && wzRows.length > 0) {
                estWzBlock.style.display = '';
                estWzList.innerHTML = wzRows.map(r => `
                    <div class="estimate-row">
                        <span class="est-label">${r.label}</span>
                        <span class="est-value">${fmt(r.price)}</span>
                    </div>
                `).join('');
            } else if (state.wzEnabled) {
                estWzBlock.style.display = '';
                estWzList.innerHTML = `<div class="estimate-row"><span class="est-label" style="color:var(--color-text-dark)">Каналы не выбраны (0 ₸)</span><span class="est-value">0 ₸</span></div>`;
            } else {
                estWzBlock.style.display = 'none';
            }
        }
        setTxt('subtotal-wz', fmt(wzTotal));

        // ── 3. Sipuni Calculation ──
        let spTotal = 0;
        if (state.spEnabled) {
            const planNames = { basic: 'Базовая', advanced: 'Расширенная', pro: 'Профессиональная' };
            const bonusMap = { 1: '', 6: ' (+2 нед)', 12: ' (+2 мес)' };
            if (state.spUsers > 0) {
                const monthlyPerUser = SP_PRICES[state.spPlan] || 3200;
                spTotal = monthlyPerUser * state.spUsers * state.spTerm;
                setTxt('est-sp-name', `Sipuni «${planNames[state.spPlan]}» (${state.spUsers} польз. · ${state.spTerm} мес${bonusMap[state.spTerm] || ''})`);
                setTxt('est-sp-price', fmt(spTotal));
            } else {
                setTxt('est-sp-name', `Sipuni — пользователи не выбраны (0 ₸)`);
                setTxt('est-sp-price', '0 ₸');
            }
        }
        setDisplay('est-sp-block', state.spEnabled);
        setTxt('subtotal-sp', fmt(spTotal));

        // ── Discounts Row ──
        const totalDiscounts = crmDiscount + wzDiscount;
        setDisplay('est-discount-block', totalDiscounts > 0);
        setTxt('est-discount-val', '−' + fmt(totalDiscounts));

        // ── 4. NODUS Services Calculation ──
        const nodusPkgPrice = NODUS_PRICES[state.nodusPlan] !== undefined ? NODUS_PRICES[state.nodusPlan] : 250000;
        const nodusNames = { 
            none: 'Без внедрения (только лицензии)',
            basic: 'Пакет «Базовый старт» (сопровождение 7 дней в подарок)', 
            standard: 'Пакет «Оптимальный» (сопровождение 14 дней в подарок)', 
            vip: 'Пакет «VIP Корпоративный» (сопровождение 30 дней + персональный куратор)' 
        };
        setTxt('est-nodus-name', nodusNames[state.nodusPlan]);
        setTxt('est-nodus-price', fmt(nodusPkgPrice));

        const turboPrice = state.turboAddon ? 50000 : 0;
        setDisplay('est-turbo-row', state.turboAddon);

        const autoPrice = state.autoAddon ? 150000 : 0;
        setDisplay('est-auto-row', state.autoAddon);

        let supportPrice = 0;
        if (state.support === 'monthly') {
            supportPrice = 100000;
            setTxt('est-support-name', 'Абонентское сопровождение (1 мес)');
        } else if (state.support === 'package') {
            supportPrice = 100000;
            setTxt('est-support-name', 'Пакет «20 заявок» (на 90 дней)');
        }
        setDisplay('est-support-row', supportPrice > 0);
        setTxt('est-support-price', fmt(supportPrice));

        const servicesTotal = nodusPkgPrice + turboPrice + autoPrice + supportPrice;
        setTxt('subtotal-services', fmt(servicesTotal));

        const licensesTotal = crmTotal + wzTotal + spTotal;
        const grandTotal    = licensesTotal + servicesTotal;

        // Animate Grand Total Counter & Mobile Bar
        animateCounter(getEl('calc-grand-total'), previousGrandTotal, grandTotal, 400);
        setTxt('m-calc-total', fmt(grandTotal));
        previousGrandTotal = grandTotal;

        // Update hidden inputs in Modal Form
        const setFormVal = (id, v) => { const el = getEl(id); if (el) el.value = v; };
        setFormVal('form-crm', state.crm);
        setFormVal('form-crm-plan', state.crm === 'amocrm' ? state.amoPlan : state.bxPlan);
        setFormVal('form-users', state.crm === 'amocrm' ? state.amoUsers : 'portal');
        setFormVal('form-term', state.crm === 'amocrm' ? state.amoTerm : state.bxTerm);
        setFormVal('form-wazzup', state.wzEnabled);
        setFormVal('form-wazzup-plan', state.wzEnabled ? `WA:${state.waTier}x${state.waCount}, IG:${state.igTier}x${state.igCount}, TG:${state.tgTier}x${state.tgCount}, VK:${state.vkTier}x${state.vkCount}` : 'none');
        setFormVal('form-sipuni', state.spEnabled);
        setFormVal('form-sipuni-plan', state.spEnabled ? `${state.spPlan} (${state.spUsers} польз.)` : 'none');
        setFormVal('form-turbo', state.turboAddon);
        setFormVal('form-automation', state.autoAddon);
        setFormVal('form-support', state.support);
        setFormVal('form-services-total', servicesTotal);
        setFormVal('form-licenses-total', licensesTotal);
        setFormVal('form-total', grandTotal);
    }

    // Number counter animation
    function animateCounter(element, start, end, duration) {
        if (!element) return;
        if (start === end) {
            element.textContent = fmt(end);
            return;
        }
        let startTime = null;
        const step = ts => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(ease * (end - start) + start);
            element.textContent = fmt(current);
            if (progress < 1) requestAnimationFrame(step);
            else element.textContent = fmt(end);
        };
        requestAnimationFrame(step);
    }

    // Initial Run
    calculateEstimate();

    // =========================================================================
    // 8. EXTERNAL BUTTONS & PRESETS SYNC
    // =========================================================================
    // Click on Pricing Card buttons -> pre-select in calculator and scroll
    document.querySelectorAll('[data-select-pkg]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const pkg = btn.getAttribute('data-select-pkg');
            const targetCard = document.querySelector(`[data-nodus-plan="${pkg}"]`);
            if (targetCard) {
                document.querySelectorAll('[data-nodus-plan]').forEach(c => c.classList.remove('active'));
                targetCard.classList.add('active');
                state.nodusPlan = pkg;
                calculateEstimate();
            }
            const calc = getEl('calculator');
            if (calc) calc.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('[data-select-support]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const sup = btn.getAttribute('data-select-support');
            const targetCard = document.querySelector(`[data-support-val="${sup}"]`);
            if (targetCard) {
                document.querySelectorAll('[data-support-val]').forEach(c => c.classList.remove('active'));
                targetCard.classList.add('active');
                state.support = sup;
                calculateEstimate();
            }
            const calc = getEl('calculator');
            if (calc) calc.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mobile Bar Action Button
    const mCalcBar = getEl('mobile-calc-bar');
    const mCalcBtn = getEl('m-calc-action-btn');
    if (mCalcBtn) {
        mCalcBtn.addEventListener('click', () => {
            const leadModal = getEl('lead-modal');
            if (leadModal) {
                leadModal.classList.add('open');
                const leadForm = getEl('lead-form');
                const successMsg = getEl('success-message');
                leadForm && leadForm.classList.remove('hidden');
                successMsg && successMsg.classList.remove('visible');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Show/Hide Mobile Floating Bar on Scroll
    if (mCalcBar) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) {
                const calcSec = getEl('calculator');
                if (calcSec) {
                    const rect = calcSec.getBoundingClientRect();
                    // Visible when calculator is near or in viewport
                    const isNear = rect.top < window.innerHeight && rect.bottom > 100;
                    mCalcBar.classList.toggle('visible', isNear);
                }
            }
        }, { passive: true });
    }

    // =========================================================================
    // 9. LEAD MODAL INTERACTION
    // =========================================================================
    const leadModal        = getEl('lead-modal');
    const btnOpenLeadModal = getEl('btn-open-lead-modal');
    const modalCloseBtn    = getEl('modal-close-btn');
    const leadForm         = getEl('lead-form');
    const successMsg       = getEl('success-message');

    if (btnOpenLeadModal && leadModal) {
        btnOpenLeadModal.addEventListener('click', () => {
            leadModal.classList.add('open');
            leadForm && leadForm.classList.remove('hidden');
            successMsg && successMsg.classList.remove('visible');
            document.body.style.overflow = 'hidden';
        });

        const closeModal = () => {
            leadModal.classList.remove('open');
            document.body.style.overflow = '';
        };

        modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
        leadModal.addEventListener('click', e => { if (e.target === leadModal) closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    if (leadForm) {
        leadForm.addEventListener('submit', e => {
            e.preventDefault();
            const total = getEl('form-total')?.value || '0';
            console.log('📬 LEAD CAPTURED FROM NODUS', {
                name: getEl('lead-name')?.value,
                phone: getEl('lead-phone')?.value,
                company: getEl('lead-company')?.value,
                total: fmt(parseInt(total))
            });
            leadForm.classList.add('hidden');
            successMsg && successMsg.classList.add('visible');
        });
    }

    // =========================================================================
    // 12. THEME SWITCHER (DARK / LIGHT MODE)
    // =========================================================================
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    const updateThemeState = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nodus-theme', theme);
    };

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            updateThemeState(next);
        });
    });
});


