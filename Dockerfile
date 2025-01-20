# 构建阶段
FROM node:20-alpine as build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建产物到nginx目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]

# 当你在 Dockerfile 中将构建后的产物（如 dist 文件夹）复制到 Nginx 的默认静态文件目录 /usr/share/nginx/html 时，Nginx 就会直接为静态资源提供服务（例如 HTML 文件、CSS 文件、JavaScript 文件、图片等）。
# Nginx 以非常高效的方式处理这些请求，通常响应速度比其他应用服务器（如 Node.js）更快。
# 高效的缓存管理：
# Nginx 可以通过配置缓存头信息（如 Cache-Control 和 Expires）来缓存静态资源，减少服务器负担。用户在首次访问时，资源会从 Nginx 服务器返回。之后，当资源未更改时，浏览器会从本地缓存中读取，避免再次请求 Nginx 服务器。