// 语言切换功能
const translations = {
    zh: 'zh-CN',
    en: 'en'
};

// 获取保存的语言偏好，默认为英语
let currentLang = localStorage.getItem('language') || 'en';

// 切换语言函数
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // 更新HTML lang属性
    document.documentElement.lang = translations[lang];
    
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    document.querySelectorAll('img[data-alt-zh][data-alt-en]').forEach(img => {
        img.alt = img.getAttribute(`data-alt-${lang}`) || '';
    });

    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 初始化语言
switchLanguage(currentLang);

// 绑定语言切换按钮事件
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// 平滑滚动（仅处理当前页面的锚点）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // 如果是跨页面链接（包含 .html），不阻止默认行为
        if (href.includes('.html')) {
            return;
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 处理页面加载时的锚点定位
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});

// 导航栏高亮当前页面
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    let currentFileName = currentPath.split('/').pop();

    if (!currentFileName || currentFileName === '' || currentPath.endsWith('/')) {
        currentFileName = 'index.html';
    }

    const navLinks = document.querySelectorAll('nav > .nav-container > ul > li > a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        if (href) {
            const linkPath = href.split('#')[0];
            if (linkPath === currentFileName) {
                link.classList.add('active');
            }
        }
    });
}

// 页面加载时高亮当前页面
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightCurrentPage);
} else {
    highlightCurrentPage();
}
