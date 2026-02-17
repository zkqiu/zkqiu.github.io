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

// 移动端下拉菜单点击处理
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('> a');
    if (link) {
        link.addEventListener('click', function(e) {
            // 如果是移动设备，切换下拉菜单显示
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
    
    // 确保下拉菜单内的链接可以正常跳转
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(dropdownLink => {
        dropdownLink.addEventListener('click', function(e) {
            // 移动端点击后关闭下拉菜单
            if (window.innerWidth <= 768) {
                dropdown.classList.remove('active');
            }
            // 不阻止默认行为，允许正常跳转
        });
    });
});

// 点击外部关闭下拉菜单
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }
});

// 导航栏高亮当前页面
function highlightCurrentPage() {
    // 获取当前页面文件名
    const currentPath = window.location.pathname;
    let currentFileName = currentPath.split('/').pop();
    
    // 如果当前文件名为空或者是根路径，则认为是 index.html
    if (!currentFileName || currentFileName === '' || currentPath.endsWith('/')) {
        currentFileName = 'index.html';
    }
    
    // 获取所有导航链接（不包括下拉菜单中的链接）
    const navLinks = document.querySelectorAll('nav > .nav-container > ul > li > a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 移除所有 active 类
        link.classList.remove('active');
        
        if (href) {
            // 提取链接的文件名部分（去掉锚点）
            const linkPath = href.split('#')[0];
            
            // 匹配当前页面
            if (linkPath === currentFileName) {
                link.classList.add('active');
            } 
            // 处理首页的锚点链接（在首页时，About Me 和 Contact 应该高亮）
            else if (!linkPath && currentFileName === 'index.html' && (href.startsWith('#about') || href.startsWith('#contact'))) {
                // 首页的锚点链接不高亮，只有页面链接高亮
            }
            // 处理指向首页的链接
            else if (linkPath === 'index.html' && currentFileName === 'index.html') {
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
