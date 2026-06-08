# 🚀 Cloudflare Pages 部署指南

## 方法一：手动部署（推荐新手）

### 1. 登录 Cloudflare

访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并登录你的账户。

### 2. 创建新项目

1. 点击左侧菜单 **"Workers & Pages"**
2. 点击 **"Create application"**
3. 选择 **"Pages"** 选项卡
4. 点击 **"Connect to Git"**
5. 授权 GitHub 访问
6. 选择 `AA` 仓库
7. 在 **"Project name"** 中输入：`python-learning`
8. **"Build command"** 留空（纯静态文件）
9. **"Build output directory"** 输入：`/`
10. 点击 **"Save and Deploy"**

### 3. 完成！

部署完成后，你将获得一个 URL，例如：`https://python-learning.pages.dev`

---

## 方法二：使用 Wrangler CLI

### 1. 安装 Wrangler

```bash
npm install -g wrangler
```

### 2. 登录

```bash
wrangler login
```

这会打开浏览器进行授权。

### 3. 部署

```bash
wrangler pages deploy . --project-name=python-learning
```

---

## 方法三：GitHub Actions 自动部署（已配置）

项目已配置 GitHub Actions 工作流，但需要设置密钥：

### 1. 获取 Cloudflare API Token

1. 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 点击 **"Create Token"**
3. 选择 **"Custom token"** -> **"Get started"**
4. 配置：
   - **Token name**: `Cloudflare Pages Deploy`
   - **Account permissions**: 
     - `Account Settings`: Read
     - `Cloudflare Pages`: Edit
5. 点击 **"Create Token"**
6. **复制生成的 Token**

### 2. 获取 Cloudflare Account ID

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右侧边栏的 **"Overview"**
3. 滚动到 **"Account ID"** 部分
4. **复制 Account ID**

### 3. 配置 GitHub Secrets

1. 访问你的 GitHub 仓库：`https://github.com/jiahao-666671/AA`
2. 点击 **Settings** > **Secrets and variables** > **Actions**
3. 点击 **"New repository secret"**
4. 添加：
   - **Name**: `CLOUDFLARE_API_TOKEN`
   - **Secret**: 粘贴你的 API Token
5. 再次点击 **"New repository secret"**
6. 添加：
   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
   - **Secret**: 粘贴你的 Account ID

### 4. 触发部署

1. 访问 **Actions** 标签页
2. 点击 **"Deploy to Cloudflare Pages"** 工作流
3. 点击 **"Run workflow"**
4. 选择 `main` 分支
5. 点击 **"Run workflow"**

---

## 🎉 部署成功！

访问你的网站：`https://python-learning.pages.dev`

---

## 📝 注意事项

- 首次部署可能需要 1-2 分钟
- 之后的每次推送到 `main` 分支都会自动部署
- 如果网站没有立即可用，等待几分钟后刷新

---

## 🔧 自定义域名（可选）

如果你想使用自己的域名：

1. 在 Cloudflare Pages 项目设置中
2. 点击 **"Custom domains"**
3. 输入你的域名
4. 按照提示配置 DNS

---

## 🐛 故障排除

### 部署失败

检查 GitHub Actions 日志：
1. 访问仓库的 **Actions** 标签
2. 点击失败的 workflow run
3. 查看详细的错误信息

### 网站显示空白

确保：
- `index.html` 在根目录
- 所有资源路径正确（相对路径）
- 没有 404 错误

### Pyodide 加载失败

Pyodide 从 CDN 加载，确保网络可以访问：
- `https://cdn.jsdelivr.net/pyodide/v0.24.1/full/`

---

## 📚 更多资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [GitHub Actions 文档](https://docs.github.com/cn/actions)
- [Wrangler 文档](https://developers.cloudflare.com/workers/wrangler/)

---

**祝部署成功！🎊**
