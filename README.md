# Muziqo
Muziqo is an open-source self-hosted music listening service. Users can upload songs and listen to them.

## Features:
- Muziqo can be used offline because it uses PWA and caches your favorite songs
- Reset password functionality via email
- You can visit other users' pages, watch their favorite songs and playlists
***
## Stack:
Frontend:
- TypeScript
- React
- Redux

Backend:
- Typescript
- Nest.js
- TypeORM
- PostgreSQL
***
## Setup
#### Backend
1. cd backend/
2. create .env file like in the example (you should also create database)
3. install dependencies (`yarn` or `npm i`)
4. build project (`yarn build` or `npm run build`)
5. start project (`yarn start:prod` or `node dist/main` or `npm run start:prod`)

You can use pm2 for daemonizing.

#### Frontend
1. cd frontend/
2. create .env file like in the example
3. install dependencies (`yarn` or `npm i`)
4. build project (`yarn build` or `npm run build`)

You can use nginx as a server. 
***
### License
Muziqo is [MIT licensed](./LICENSE).
