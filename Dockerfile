FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS dev

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./prisma prisma
COPY . .


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXTAUTH_SECRET=J23a5z4dZYMXkMZqztI9l98NZYd64uPj3q6iiLpveFc=
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ARG NEXT_PUBLIC_BASE_API_URL=12345
ENV NEXT_PUBLIC_BASE_API_URL=12345
ARG AUTH_SECRET=3vMxAN7jxPRaFylkVeJlaS38CWFbjvdyzr704v97gYs=
ENV AUTH_SECRET=3vMxAN7jxPRaFylkVeJlaS38CWFbjvdyzr704v97gYs=
ARG NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyBd0vAku9eywLaQkzxlE0iwFb8aSu9OEyI
ENV NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyBd0vAku9eywLaQkzxlE0iwFb8aSu9OEyI
ARG NEXT_PUBLIC_COUNTRY_NAME=https://countriesnow.space/api/v0.1/countries/states
ENV NEXT_PUBLIC_COUNTRY_NAME=https://countriesnow.space/api/v0.1/countries/states
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dgvoxqjr2
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dgvoxqjr2
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=weather
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=weather
ARG NEXT_PUBLIC_GET_COUNTRY_BY_GEO_CODE=https://maps.googleapis.com/maps/api/geocode/
ENV NEXT_PUBLIC_GET_COUNTRY_BY_GEO_CODE=https://maps.googleapis.com/maps/api/geocode/
ENV POSTGRES_PRISMA_URL=postgres://default:ykKJ1FCqPIS4@ep-small-frog-a4yyr88k-pooler.us-east-1.aws.neon.tech/verceldb?pgbouncer=true&connect_timeout=15&sslmode=require
ARG POSTGRES_PRISMA_URL=postgres://default:ykKJ1FCqPIS4@ep-small-frog-a4yyr88k-pooler.us-east-1.aws.neon.tech/verceldb?pgbouncer=true&connect_timeout=15&sslmode=require


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/prisma /app/prisma


USER nextjs


CMD ["node", "server.js"]