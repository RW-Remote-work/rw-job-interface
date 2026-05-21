# 1. 基础镜像
FROM node:18-alpine AS base

# 2. 依赖安装阶段
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 3. 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 接收环境变量区分环境
ARG SITE_TYPE=JOB
ARG APP_ENV=prod
ENV NEXT_PUBLIC_SITE_TYPE=${SITE_TYPE}
ENV NEXT_PUBLIC_APP_ENV=${APP_ENV}
ENV NODE_ENV=production

RUN npm install -g pnpm && pnpm build

# 4. 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# 【关键修改】将内部运行端口改为 3002
ENV PORT 3002

# 复制 Next.js standalone 输出
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 【关键修改】声明暴露 3002 端口
EXPOSE 3002

# 启动命令
CMD ["node", "server.js"]
