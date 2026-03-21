// ============================================
// ПОРТФОЛИО ДЛЯ ТАНИ - ПОЛНЫЙ JS КОД
// ============================================

// Конфигурация категорий
const CONFIG = {
    categories: {
        'visits': {
            name: 'Визитки',
            folder: 'images/visits/',
            icon: 'fa-id-card',
            placeholder: '🪪',
            order: 1
        },
        'logos': {
            name: 'Логотипы',
            folder: 'images/logos/',
            icon: 'fa-pen-fancy',
            placeholder: '✏️',
            order: 2
        },
        'infographics': {
            name: 'Инфографика',
            folder: 'images/infographics/',
            icon: 'fa-chart-simple',
            placeholder: '📊',
            order: 3
        },
        'identity': {
            name: 'Айдентика',
            folder: 'images/identity/',
            icon: 'fa-brush',
            placeholder: '🎨',
            order: 4
        },
        'gift-certificates': {
            name: 'Подарочные сертификаты',
            folder: 'images/gift-certificates/',
            icon: 'fa-gift',
            placeholder: '🎁',
            order: 5
        },
        'illustrations': {
            name: 'Иллюстрации',
            folder: 'images/illustrations/',
            icon: 'fa-paintbrush-pencil',
            placeholder: '🖌️',
            order: 6
        },
        'postcards': {
            name: 'Открытки',
            folder: 'images/postcards/',
            icon: 'fa-envelope-open-text',
            placeholder: '💌',
            order: 7
        },
        'maccards': {
            name: 'Авторские мак-карты',
            folder: 'images/maccards/',
            icon: 'fa-mobile-screen-button',
            placeholder: '📱',
            order: 8
        },
        'invitations': {
            name: 'Приглашения',
            folder: 'images/invitations/',
            icon: 'fa-calendar-plus',
            placeholder: '💒',
            order: 9
        },
        'handmade': {
            name: 'Ручная работа',
            folder: 'images/handmade/',
            icon: 'fa-hand-sparkles',
            placeholder: '🖐️',
            order: 10
        },
        'social': {
            name: 'Для соц.сетей',
            folder: 'images/social/',
            icon: 'fa-hashtag',
            placeholder: '📲',
            order: 11
        },
        'guides': {
            name: 'Оформление гайдов',
            folder: 'images/guides/',
            icon: 'fa-book-open',
            placeholder: '📖',
            order: 12
        }
    }
};

// Хранилище всех работ
let allWorks = [];
let currentCategory = 'all';
let currentDisplayedWorks = [];

// ============================================
// ЗАГРУЗКА РАБОТ
// ============================================

async function loadWorks() {
    showLoading(true);
    
    try {
        const response = await fetch('images/manifest.json?t=' + Date.now());
        if (response.ok) {
            const manifest = await response.json();
            processManifest(manifest);
        } else {
            console.log('Манифест не найден, загружаю демо-данные');
            loadDemoData();
        }
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        loadDemoData();
    } finally {
        showLoading(false);
    }
}

function processManifest(manifest) {
    allWorks = [];
    
    for (const [category, files] of Object.entries(manifest)) {
        if (CONFIG.categories[category]) {
            files.forEach((filename, index) => {
                if (filename.startsWith('.')) return;
                
                allWorks.push({
                    id: `${category}-${index}`,
                    category: category,
                    title: generateTitle(category, filename),
                    image: `images/${category}/${filename}`,
                    icon: CONFIG.categories[category].icon,
                    placeholder: CONFIG.categories[category].placeholder,
                    filename: filename
                });
            });
        }
    }
    
    allWorks.sort((a, b) => a.title.localeCompare(b.title));
    displayWorks(currentCategory);
    updateCategoryCounts();
}

function generateTitle(category, filename) {
    let name = filename.replace(/\.[^/.]+$/, "");
    name = name.replace(/[-_]/g, ' ');
    
    if (/^\d+$/.test(name)) {
        const categoryNames = {
            'visits': 'Визитка',
            'logos': 'Логотип',
            'infographics': 'Инфографика',
            'identity': 'Брендинг',
            'gift-certificates': 'Подарочный сертификат',
            'illustrations': 'Иллюстрация',
            'postcards': 'Открытка',
            'maccards': 'Мак-карта',
            'invitations': 'Приглашение',
            'handmade': 'Работа ручной работы',
            'social': 'Пост для соцсетей',
            'guides': 'Гайд'
        };
        return `${categoryNames[category] || 'Работа'} №${name}`;
    }
    
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function loadDemoData() {
    allWorks = [
        { category: 'visits', title: 'Визитка для студии звукозаписи', image: null, icon: 'fa-id-card', placeholder: '🪪' },
        { category: 'visits', title: 'Визитка свадебного фотографа', image: null, icon: 'fa-id-card', placeholder: '🪪' },
        { category: 'logos', title: 'Логотип кофейни "Утро"', image: null, icon: 'fa-pen-fancy', placeholder: '✏️' },
        { category: 'logos', title: 'Логотип для бренда одежды', image: null, icon: 'fa-pen-fancy', placeholder: '✏️' },
        { category: 'infographics', title: 'Презентация IT-стартапа', image: null, icon: 'fa-chart-simple', placeholder: '📊' },
        { category: 'identity', title: 'Брендбук для городского кафе', image: null, icon: 'fa-brush', placeholder: '🎨' },
        { category: 'gift-certificates', title: 'Сертификат на мастер-класс', image: null, icon: 'fa-gift', placeholder: '🎁' },
        { category: 'illustrations', title: 'Портрет в стиле иллюстрация', image: null, icon: 'fa-paintbrush-pencil', placeholder: '🖌️' },
        { category: 'postcards', title: 'Новогодняя открытка', image: null, icon: 'fa-envelope-open-text', placeholder: '💌' },
        { category: 'maccards', title: 'Мак-карта "Кофе и выпечка"', image: null, icon: 'fa-mobile-screen-button', placeholder: '📱' },
        { category: 'invitations', title: 'Приглашение на свадьбу', image: null, icon: 'fa-calendar-plus', placeholder: '💒' },
        { category: 'handmade', title: 'Открытка ручной работы', image: null, icon: 'fa-hand-sparkles', placeholder: '🖐️' },
        { category: 'social', title: 'Пост в Instagram', image: null, icon: 'fa-hashtag', placeholder: '📲' },
        { category: 'guides', title: 'Гайд по фирменному стилю', image: null, icon: 'fa-book-open', placeholder: '📖' }
    ];
    
    displayWorks(currentCategory);
}

// ============================================
// ОТОБРАЖЕНИЕ КНОПОК-ТАБОВ
// ============================================

function renderTabs() {
    const tabsContainer = document.querySelector('.portfolio-tabs');
    if (!tabsContainer) return;
    
    const sortedCategories = Object.entries(CONFIG.categories).sort((a, b) => a[1].order - b[1].order);
    
    let html = '<button class="tab-btn active" data-tab="all">Всё (0)</button>';
    
    for (const [key, value] of sortedCategories) {
        html += `<button class="tab-btn" data-tab="${key}">${value.name} (0)</button>`;
    }
    
    tabsContainer.innerHTML = html;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayWorks(btn.dataset.tab);
        });
    });
}

// ============================================
// ОТОБРАЖЕНИЕ РАБОТ
// ============================================

function displayWorks(category) {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    currentCategory = category;
    gallery.innerHTML = '';
    
    currentDisplayedWorks = category === 'all' ? [...allWorks] : allWorks.filter(w => w.category === category);
    
    if (currentDisplayedWorks.length === 0) {
        gallery.innerHTML = `
            <div class="empty-gallery">
                <i class="fas fa-image"></i>
                <p>В этой категории пока нет работ</p>
                <small>Добавьте картинки в папку ${category} и обновите манифест</small>
            </div>
        `;
        return;
    }
    
    currentDisplayedWorks.forEach(work => {
        const item = createWorkItem(work);
        gallery.appendChild(item);
    });
}

function createWorkItem(work) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    if (work.image) {
        item.innerHTML = `
            <div class="gallery-img" style="background-image: url('${work.image}');">
                <div class="img-overlay">
                    <span>👁️ Просмотр</span>
                </div>
            </div>
            <div class="work-info">
                <span class="work-category">${CONFIG.categories[work.category].name}</span>
            </div>
        `;
        
        const imgDiv = item.querySelector('.gallery-img');
        imgDiv.addEventListener('click', () => openLightbox(work));
    } else {
        item.innerHTML = `
            <div class="gallery-img placeholder">
                <i class="fas ${work.icon}"></i>
                <span class="placeholder-emoji">${work.placeholder}</span>
            </div>
            <div class="work-info">
                <p class="work-title">${work.title}</p>
                <span class="work-category">${CONFIG.categories[work.category].name}</span>
            </div>
        `;
    }
    
    return item;
}

function updateCategoryCounts() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        const category = tab.dataset.tab;
        if (category === 'all') {
            tab.textContent = `Всё (${allWorks.length})`;
        } else if (CONFIG.categories[category]) {
            const count = allWorks.filter(w => w.category === category).length;
            tab.textContent = `${CONFIG.categories[category].name} (${count})`;
        }
    });
}

function showLoading(show) {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    if (show) {
        gallery.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Загрузка работ...</div>';
    }
}

// ============================================
// ЛАЙТБОКС
// ============================================

function openLightbox(work) {
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
                <button class="lightbox-prev">❮</button>
                <button class="lightbox-next">❯</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
        lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);
        
        document.addEventListener('keydown', handleLightboxKey);
    }
    
    const currentIndex = currentDisplayedWorks.findIndex(w => w.id === work.id);
    
    lightbox.querySelector('.lightbox-image').src = work.image;
    lightbox.querySelector('.lightbox-caption').textContent = work.title;
    lightbox.classList.add('active');
    lightbox.dataset.currentIndex = currentIndex;
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) lightbox.classList.remove('active');
}

function showPrevImage() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    
    if (currentIndex > 0 && currentDisplayedWorks[currentIndex - 1]) {
        const prevWork = currentDisplayedWorks[currentIndex - 1];
        lightbox.querySelector('.lightbox-image').src = prevWork.image;
        lightbox.querySelector('.lightbox-caption').textContent = prevWork.title;
        lightbox.dataset.currentIndex = currentIndex - 1;
    }
}

function showNextImage() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    
    if (currentIndex < currentDisplayedWorks.length - 1 && currentDisplayedWorks[currentIndex + 1]) {
        const nextWork = currentDisplayedWorks[currentIndex + 1];
        lightbox.querySelector('.lightbox-image').src = nextWork.image;
        lightbox.querySelector('.lightbox-caption').textContent = nextWork.title;
        lightbox.dataset.currentIndex = currentIndex + 1;
    }
}

function handleLightboxKey(e) {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPrevImage();
    else if (e.key === 'ArrowRight') showNextImage();
}

// ============================================
// ФОРМА ОТПРАВКИ В GOOGLE ТАБЛИЦУ
// ============================================

function formatPhoneOnInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length === 0) {
        input.value = '';
        return;
    }
    
    if (value.length <= 1) {
        input.value = '+7';
    } else if (value.length <= 4) {
        input.value = `+7 (${value.slice(1)}`;
    } else if (value.length <= 7) {
        input.value = `+7 (${value.slice(1, 4)}) ${value.slice(4)}`;
    } else if (value.length <= 9) {
        input.value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7)}`;
    } else {
        input.value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneOnInput(this);
        });
        
        phoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7';
            }
        });
        
        phoneInput.addEventListener('blur', function() {
            const digits = this.value.replace(/\D/g, '');
            if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
                // корректный номер
            } else if (digits.length === 10) {
                this.value = '+7' + digits;
            } else if (digits.length > 0 && digits.length < 10) {
                this.style.borderColor = '#e5989e';
                setTimeout(() => this.style.borderColor = '', 2000);
            }
        });
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx-dLB_CazMcAdALbHYirLjeNi0hdhlkGIj12a8tmo5_9M6H0pOA_nenF6wcuf34MLEBw/exec';
        
        const name = document.getElementById('name').value.trim();
        let phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        const rawPhone = phone.replace(/\D/g, '');
        
        if (!name) {
            document.getElementById('form-status').innerHTML = '❌ Пожалуйста, укажите имя.';
            return;
        }
        
        if (!rawPhone || rawPhone.length < 10) {
            document.getElementById('form-status').innerHTML = '❌ Пожалуйста, введите корректный номер телефона.';
            return;
        }
        
        let formattedPhone = rawPhone;
        if (formattedPhone.length === 11 && formattedPhone.startsWith('8')) {
            formattedPhone = '7' + formattedPhone.slice(1);
        }
        if (formattedPhone.length === 10) {
            formattedPhone = '7' + formattedPhone;
        }
        if (formattedPhone.length === 11 && formattedPhone.startsWith('7')) {
            formattedPhone = '+' + formattedPhone;
        }
        
        const statusDiv = document.getElementById('form-status');
        statusDiv.innerHTML = '⏳ Отправка...';
        
        const formData = {
            name: name,
            phone: formattedPhone,
            message: message,
            timestamp: new Date().toISOString(),
            secret: 'Tanya2024SecureKey!@#'
        };
        
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            statusDiv.innerHTML = '✅ Заявка отправлена! Таня свяжется с вами в ближайшее время.';
            form.reset();
            if (phoneInput) phoneInput.value = '+7';
            
        } catch (error) {
            console.error('Ошибка:', error);
            statusDiv.innerHTML = '❌ Ошибка отправки. Попробуйте позже или напишите в Telegram: @Tiana_Flowers_Bot';
        }
    });
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    initContactForm();
    loadWorks();
    initBackToTop(); // Добавляем инициализацию кнопки
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '' || href === '#/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
});

// ============================================
// КНОПКА "НАВЕРХ"
// ============================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Показываем кнопку после прокрутки 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Прокрутка наверх при клике
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Добавь вызов функции в DOMContentLoaded
// Найди в конце файла document.addEventListener('DOMContentLoaded', ...) 
// и добавь туда initBackToTop();