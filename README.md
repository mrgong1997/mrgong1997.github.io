# Chasing Light

一份私人摄影作品集 · 追逐光的人。

基于 **Vite + React + TypeScript + MUI + Framer Motion** 构建，采用毛玻璃视觉语言，
提供瀑布流 / 时间线两种浏览模式与完整的 EXIF 展示。

## 功能

- 首页 Hero + 精选作品（读取 `tags` 中含 `featured` 的照片）
- 作品集页：瀑布流 / 时间线切换、分类筛选
- 灯箱大图：EXIF 信息栏、键盘左右切换、ESC 关闭、"查看原图"
- 关于页：拍摄理念、从 EXIF 自动汇总的常用器材
- 联系页：邮箱 / 社交平台
- 响应式：4 / 3 / 2 / 1 列自适应
- 毛玻璃风格 + 深色渐变背景 + 柔和动效

## 目录结构

```
chasing_light/
  public/
    photos/                   # 原图（支持子目录）
      thumbnails/             # 自动生成压缩图
  scripts/
    compress-photos.js        # sharp 压缩脚本
    sync-photos.js            # exifr + 配置增量合并
  src/
    config/photos.ts          # 自动生成（保留手动 alt/tags）
    pages/                    # Home / Gallery / About / Contact / NotFound
    components/
      layout/                 # Navbar / Footer / PageTransition
      home/                   # Hero / Intro / FeaturedWorks
      gallery/                # Masonry / Timeline / Lightbox / ExifBar / ...
      ui/                     # GlassCard / AutoImage / BackgroundAurora
    hooks/ utils/ theme/ types/
```

## 本地开发

```bash
npm install
npm run dev
```

默认端口 `5173`，访问 <http://localhost:5173>。

## 照片流水线

1. 把原图放入 `public/photos/`（支持任意子目录，子目录名会作为 tag）
2. 执行

   ```bash
   npm run photos
   ```

   内部分两步：`photos:compress` 压缩到 `thumbnails/`，`photos:sync` 提取 EXIF 并写入 `src/config/photos.ts`
3. 按需在 `src/config/photos.ts` 中编辑 `alt` 与 `tags`（再次运行 `npm run photos` 不会覆盖）
4. 给想放在首页的作品加上 `'featured'` 标签

压缩参数可在 `scripts/compress-photos.js` 顶部修改：

- `LONG_EDGE = 1200`：长边像素
- `JPEG_QUALITY = 82`

## 构建与部署

```bash
npm run build       # 产物 dist/
npm run preview     # 本地预览 dist/
```

可部署到任意静态站点：Vercel / Netlify / Cloudflare Pages / GitHub Pages / 自建 Nginx。
部署时请将 `public/photos/` 与构建产物一起上传（或将照片托管到 CDN/对象存储并在
`photos.ts` 中替换为完整 URL）。

### 路由配置（重要）

本项目使用 `BrowserRouter`，请把刷新 / 非 `/` 路径回退到 `index.html`：

- **Vercel**：默认已支持。
- **Netlify**：根目录添加 `public/_redirects`：

  ```
  /*  /index.html  200
  ```

- **Nginx**：

  ```
  location / {
    try_files $uri /index.html;
  }
  ```

- **GitHub Pages**：仓库已内置 `public/404.html` + `index.html` 中的还原脚本
  （基于 [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages) 方案），
  无需额外配置。

### GitHub Pages 部署

仓库已配置两套部署方式，任选其一：

#### 方式 A：GitHub Actions（推荐，推 `main` 自动部署）

1. 在 GitHub 创建仓库 `<你的用户名>.github.io`（例如 `mrgong1997.github.io`）
2. 本地：

   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
   git push -u origin main
   ```

3. 打开 GitHub 仓库 → **Settings → Pages → Build and deployment**，
   将 **Source** 设为 **GitHub Actions**
4. 每次推送到 `main` 都会自动走 `.github/workflows/deploy.yml` 构建并发布

#### 方式 B：本地手动部署（`gh-pages` 分支）

```bash
npm run deploy
```

该命令会执行 `npm run build`，把 `dist/` 推到远端 `gh-pages` 分支。

首次使用需要在 GitHub 仓库 **Settings → Pages → Source** 选择 `gh-pages` 分支 `/ (root)`。

> 若使用自定义域名，在 `public/` 下新增 `CNAME` 文件（内容为域名），并在 GitHub Pages 设置中填入同一域名。

#### 关于 `base` 路径

本站作为 **用户主页** 部署在根路径 `/`，`vite.config.ts` 里无需设置 `base`。
如果改为 **项目页**（部署到 `https://<user>.github.io/<repo>/`），需：

1. `vite.config.ts` 加 `base: '/<repo>/'`
2. `public/404.html` 把 `pathSegmentsToKeep` 改成 `1`

## 视觉设计

- 主色：`#E8B96B`（追光暖金）
- 点缀：`#8EA4C9`（冷月蓝）
- 背景：`#0A0A0F → #141424 → #1C1B2E` 渐变
- 卡片：`backdrop-filter: blur(20px)` + 半透明白边框
- 字体：`Cormorant Garamond`（标题）+ `Inter` + `Noto Sans SC`（正文）

## 许可

照片版权归摄影者所有；代码部分 MIT。
