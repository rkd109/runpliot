FROM node:20-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable \
  && corepack prepare pnpm@9.15.4 --activate

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json

FROM base AS dependencies

RUN pnpm install --frozen-lockfile

FROM base AS production-dependencies

RUN pnpm install --frozen-lockfile --prod --filter @runpilot/api...

FROM dependencies AS development

COPY apps/api apps/api
COPY packages/shared packages/shared

EXPOSE 3001

CMD ["pnpm", "--filter", "@runpilot/api", "start:dev"]

FROM dependencies AS build

COPY apps/api apps/api
COPY packages/shared packages/shared

RUN pnpm --filter @runpilot/api build

FROM build AS migration

CMD ["pnpm", "--filter", "@runpilot/api", "db:migrate:deploy"]

FROM node:20-bookworm-slim AS production

ENV NODE_ENV="production"
ENV PORT="3001"

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates openssl \
  && rm -rf /var/lib/apt/lists/* \
  && groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs runpilot

WORKDIR /workspace

COPY --from=production-dependencies --chown=runpilot:nodejs /workspace/node_modules node_modules
COPY --from=production-dependencies --chown=runpilot:nodejs /workspace/apps/api/node_modules apps/api/node_modules
COPY --from=build --chown=runpilot:nodejs /workspace/apps/api/dist apps/api/dist
COPY --from=build --chown=runpilot:nodejs /workspace/apps/api/generated apps/api/generated
COPY --from=build --chown=runpilot:nodejs /workspace/apps/api/package.json apps/api/package.json
COPY --from=build --chown=runpilot:nodejs /workspace/packages/shared/dist packages/shared/dist
COPY --from=build --chown=runpilot:nodejs /workspace/packages/shared/package.json packages/shared/package.json

USER runpilot

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3001) + '/health').then((response) => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1));"

CMD ["node", "apps/api/dist/main.js"]
