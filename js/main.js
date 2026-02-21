// ==================== 组件加载系统 ====================
// 组件 HTML 字符串（避免 file:// 协议下 fetch 的 CORS 限制）
const components = {
    header: `<header>
    <div class="container">
        <h1 data-zh="邱志康" data-en="Zhikang (Allen) Qiu">zkqiu</h1>
        <p data-zh="AI 科学家、写作者与探索者 | 探索知识，追求卓越" data-en="AI Scientist & Writer | Exploring Knowledge, Pursuing Excellence"></p>
    </div>
</header>`,

    nav: `<nav>
    <div class="container nav-container">
        <ul>
            <li><a href="{ROOT}index.html#about" data-zh="关于我" data-en="About Me"></a></li>
            <li><a href="{ROOT}blog.html" data-zh="博客" data-en="Blog"></a></li>
            <li><a href="{ROOT}projects.html" data-zh="项目" data-en="Projects"></a></li>
            <li><a href="{ROOT}life.html" data-zh="生活" data-en="Life"></a></li>
            <li><a href="{ROOT}reading.html" data-zh="阅读" data-en="Reading"></a></li>
        </ul>
        <div class="lang-switcher">
            <button class="lang-btn" data-lang="zh">中文</button>
            <button class="lang-btn active" data-lang="en">English</button>
        </div>
    </div>
</nav>`,

    footer: `<footer>
    <div class="container">
        <p data-zh="© 2025 邱志康。All rights reserved." data-en="© 2025 Zhikang (Allen) Qiu. All rights reserved.">&copy; 2025 zkqiu. All rights reserved.</p>
    </div>
</footer>`
};

// 自动检测当前文件路径，计算组件相对路径
function getComponentRoot() {
    const path = window.location.pathname;
    const href = window.location.href;
    // 检查 URL 是否包含 /blog/ 或 /life/ 子目录
    if (href.includes('/blog/') || href.includes('/life/')) {
        return '../';
    }
    // 兼容 file:// 协议下的 Windows 路径
    if (path.includes('C:/Files/Code/Allen/zkqiu.github.io/blog/') ||
        path.includes('C:/Files/Code/Allen/zkqiu.github.io/life/')) {
        return '../';
    }
    return '';
}

// 动态加载公共组件
function loadComponents() {
    const root = getComponentRoot();

    // 加载 header
    const headerEl = document.querySelector('header[data-component="header"]');
    if (headerEl) {
        headerEl.outerHTML = components.header;
    }

    // 加载 nav
    const navEl = document.querySelector('nav[data-component="nav"]');
    if (navEl) {
        const navHtml = components.nav.replace(/{ROOT}/g, root);
        navEl.outerHTML = navHtml;
    }

    // 加载 footer
    const footerEl = document.querySelector('footer[data-component="footer"]');
    if (footerEl) {
        footerEl.outerHTML = components.footer;
    }

    // 组件加载完成后重新初始化语言切换
    initLanguage();
    // 高亮当前页面
    highlightCurrentPage();
}

// ==================== 语言切换功能 ====================
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

    // 更新 HTML lang 属性
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

// 初始化语言（供组件加载完成后调用）
function initLanguage() {
    switchLanguage(currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

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

// 页面加载完成后加载公共组件
window.addEventListener('DOMContentLoaded', () => {
    loadComponents();
});
