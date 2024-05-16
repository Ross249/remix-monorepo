# Remix Fullstack Starter Template

## Includes

1. tailwindcss for styling
2. drizzle orm
3. monorepo by pnpm workspace
4. hono
5. zod
6. neon

## Usage

```
pnpm install
```

move to packages folder and create a shared folder for reserve env file

```
cd packages && mkdir shared
```

fill variables in the env file

```
DATABASE_URL='your database url'
SERVER_PORT=
```

start client or server

```
cd packages/client && pnpm run dev
cd packages/server && pnpm run dev
```

## ToDos

- [ ] docker deploy
- [ ] decent file paths for shared files and start project
- [ ] tsconfig and eslint hierarchy
- [ ] examples error handlers
