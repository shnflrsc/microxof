# Setup
1. Install Docker Desktop
2. Create new folder
3. Create `compose.yaml` inside the folder
```yaml
services:
  web:
    image: ghcr.io/shnflrsc/microxof:latest
    container_name: microxof-web
    restart: always
    ports:
      - "3000:3000"
    command: sh -c "bunx drizzle-kit push --force && bun build/index.js"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - ORIGIN=http://localhost:3000
    depends_on:
      db:
        condition: service_started
  db:
    image: postgres:17.10-alpine
    container_name: postgres_db
    restart: always
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=mysecretpassword
      - POSTGRES_DB=local
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -h 127.0.0.1 -U root -d local"]
      interval: 5s
      timeout: 5s
      retries: 6

volumes:
  postgres_data:
```
4. Open a terminal inside the folder with the `compose.yaml` file, and run:
```bash
docker compose up -d
```
