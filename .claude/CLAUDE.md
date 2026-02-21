# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Jekyll 的个人静态网站，部署在 GitHub Pages 上。网站支持中英双语切换，包含个人主页、博客和项目展示页面。

## 技术栈

- **框架**: Jekyll (主题：jekyll-theme-cayman)
- **语言**: HTML5, CSS3, Vanilla JavaScript
- **部署**: GitHub Actions (deploy-pages.yml)
- **国际化**: 自定义 data 属性实现中英双语切换

## 项目结构

```
├── index.html          # 个人主页（关于我、简历、教育背景、技能、联系方式）
├── blog.html           # 博客列表页
├── projects.html       # 项目展示页
├── blog/               # 博客文章目录
│   └── openclaw-setup-guide.html
├── css/
│   └── style.css       # 全局样式
├── js/
│   └── main.js         # 语言切换、平滑滚动、导航高亮
├── assets/             # 静态资源（profile.jpg, resume.pdf）
├── _config.yml         # Jekyll 配置
└── .github/workflows/
    └── deploy-pages.yml # CI/CD 部署流程
```

## 开发指南

### 本地预览

由于是纯静态站点，可直接使用任意 HTTP 服务器预览：

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server -p 8000
```

### 部署流程

推送到 master 分支会自动触发 GitHub Actions 部署：

1. 创建新分支进行开发
2. 完成后 PR 到 master 或直接 push 到 master
3. GitHub Actions 自动构建并部署到 GitHub Pages

### 添加博客文章

1. 在 `blog/` 目录下创建新的 HTML 文件
2. 复用 `blog/openclaw-setup-guide.html` 的模板结构
3. 在 `blog.html` 中添加文章链接

### 国际化规范

所有多语文本使用 `data-zh` 和 `data-en` 属性：

```html
<p data-zh="中文内容" data-en="English content"></p>
```

图片 alt 属性使用 `data-alt-zh` 和 `data-alt-en`。

## 开发原则

- 严禁在代码中硬编码敏感信息（API keys、tokens 等）
- 使用 localStorage 保存用户语言偏好
- 保持样式统一，复用 CSS 变量（见 `style.css` :root）

## Git 规范

- 绝对不能在 main/master 分支上直接开发
- 使用功能分支开发，完成后再合并
