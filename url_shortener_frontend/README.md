![Logo](https://github.com/artak-petrosyan/url_shortener_app/blob/main/url_shortener_frontend/public/logo_small.png?raw=true)
# URL Shortener Backend

This project is a URL shortener backend application built with a **NestJS** backend, **PostgreSQL** database, written in **TypeScript**.

## Table of Contents

  * [Features](#features)
  * [Technologies Used](#technologies-used)
  * [Getting Started](#getting-started)
  * [Usage](#usage)
  * [API Endpoints (Backend)](#api-endpoints-backend)
  * [Database Schema](#database-schema)

## Features

  * **Shorten URLs:** Convert long URLs into concise, short links.
  * **Redirects:** Automatically redirect to the original URL when a short link is accessed.

## Technologies Used

  * **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
  * **TypeScript:** Superset of JavaScript that adds static typing.
  * **PostgreSQL:** Powerful, open-source object-relational database system.
  * **TypeORM:** ORM for interacting with the PostgreSQL database.
  * **dotenv:** For managing environment variables.
 

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Node.js:** [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
  * **npm** or **pnpm:** (Comes with Node.js, or install pnpm separately)
  * **PostgreSQL:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/) (Only needed if *not* using Docker Container for the DB)

### Backend Setup

1.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Create a `.env` file:** in the `url_shortener_backend` directory and add your PostgreSQL database credentials and other configurations:

    ```env
    APP_PORT=3000
    APP_NAME='Url Shortener'
    BASE_URL='http://localhost:3000'
    SHORT_URL_LENGTH=7
    DB_TYPE=postgres
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=url_shortener_db
    DB_SYNC=true
    ```

    **Note:** Make sure to replace `your_username`, `your_password`, and `url_shortener_db` with your actual PostgreSQL credentials and database name.

    Mandatory environment variables:

    ```env
    BASE_URL
    DB_HOST:
    DB_PORT
    DB_USER
    DB_PASSWORD
    DB_NAME
    ```

4.  **Create the PostgreSQL database:**
    You can create the database using a PostgreSQL client (e.g., `psql`, pgAdmin) or a command-line tool.

    ```bash
    psql -U your_username -c "CREATE DATABASE url_shortener_db;"
    ```

5.  **TypeORM sync:**

    The ORM will sync the schema automatically on startup (depending on configuration, `DB_SYNC`).

6.  **Start the backend server:**

    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```

    The backend will typically run on `http://localhost:3000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Create a `.env.local` file:** in the `frontend` directory:

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
    ```

    This variable should point to your running backend API.

4.  **Start the frontend development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The frontend will typically run on `http://localhost:3001`.

## Usage

1.  Open your web browser and navigate to `http://localhost:3001`.
2.  Enter a long URL into the provided input field.
3.  (Optional) Enter a custom short code if desired.
4.  Click the "Shorten" button.
5.  The application will display the generated short URL.
6.  You can then copy and use this short URL. When accessed, it will redirect to the original long URL.

## API Endpoints (Backend)

The backend provides the following RESTful API endpoints:

  * **`POST /shorten`**:

      * **Description:** Creates a new short URL.
      * **Request Body:**
        ```json
        {
            "longUrl": "https://example.com/very/long/url",
            "customCode": "my-short-code" // Optional
        }
        ```
      * **Response:**
        ```json
        {
            "shortUrl": "http://localhost:3001/my-short-code",
            "longUrl": "https://example.com/very/long/url",
            "id": "uuid-of-short-link"
        }
        ```

  * **`GET /:code`**:

      * **Description:** Redirects to the original long URL associated with the given short code.
      * **Parameters:** `code` (the short code, e.g., `abcde`).

## Database Schema

The PostgreSQL database will typically contain a table similar to the following:

### `short_urls` Table

| Column Name | Data Type | Constraints | Description              |
| :---------- | :-------- | :---------- | :----------------------- |
| `id`        | UUID      | PRIMARY KEY | Unique identifier        |
| `long_url`  | TEXT      | NOT NULL    | The original long URL    |
| `short_code`| VARCHAR(255)| UNIQUE, NOT NULL| The generated short code |
| `clicks`    | INT       | DEFAULT 0   | Number of times the short link has been clicked |
| `created_at`| TIMESTAMP | DEFAULT NOW() | Timestamp of creation |

## Project Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   ├── short-url/
│   │   │   ├── short-url.module.ts
│   │   │   ├── short-url.controller.ts
│   │   │   ├── short-url.service.ts
│   │   │   └── entities/short-url.entity.ts
│   │   └── database/
│   │       └── typeorm.config.ts
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md (Backend specific README)
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx
│   │   │   └── [shortCode].tsx
│   │   ├── components/
│   │   │   └── UrlShortenerForm.tsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── api/
│   │       └── shortener.ts
│   ├── .env.local.example
│   ├── next.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md (Frontend specific README)
├── .gitignore
├── docker-compose.yml
├── README.md
```

## Docker Compose

Docker Compose allows you to run the entire application stack (backend, frontend, and database) with a single command.

### Prerequisites

  * **Docker Desktop:** [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) (Includes Docker Engine and Docker Compose)

### Setup

1.  **Ensure you are in the root directory** of the project (`url-shortener/`).

2.  **Create `.env` files** for your backend and frontend as described in their respective setup sections.

      * For the backend's `.env`, update the `DB_HOST` to `db` (the service name for the PostgreSQL container):

        ```env
        # backend/.env
        PORT=3000
        DB_HOST=db # Important: Use the service name 'db'
        DB_PORT=5432
        DB_USERNAME=your_username
        DB_PASSWORD=your_password
        DB_DATABASE=url_shortener_db
        BASE_URL="http://localhost:3001"
        ```

      * For the frontend's `.env.local`, ensure `NEXT_PUBLIC_API_BASE_URL` points to the host machine's port 3000:

        ```env
        # frontend/.env.local
        NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
        ```

3.  **Create a `docker-compose.yml` file** in the root directory (`url-shortener/`) with the following content:

    ```yaml
    version: '3.8'

    services:
      db:
        image: postgres:13
        container_name: url_shortener_db
        restart: always
        environment:
          POSTGRES_USER: ${DB_USERNAME:-your_username}
          POSTGRES_PASSWORD: ${DB_PASSWORD:-your_password}
          POSTGRES_DB: ${DB_DATABASE:-url_shortener_db}
        volumes:
          - postgres_data:/var/lib/postgresql/data
        ports:
          - "5432:5432" # Optional: Expose DB port to host for external tools

      backend:
        build:
          context: ./backend
          dockerfile: Dockerfile
        container_name: url_shortener_backend
        restart: always
        env_file:
          - ./backend/.env
        ports:
          - "3000:3000"
        depends_on:
          - db
        # If you need to run migrations after DB is up
        # entrypoint: ["/bin/sh", "-c", "npm run typeorm migration:run && npm run start:dev"]
        # Or remove entrypoint and run migrations manually first: docker-compose run backend npm run typeorm migration:run

      frontend:
        build:
          context: ./frontend
          dockerfile: Dockerfile
        container_name: url_shortener_frontend
        restart: always
        env_file:
          - ./frontend/.env.local
        ports:
          - "3001:3001"
        depends_on:
          - backend

    volumes:
      postgres_data:
    ```

4.  **Create `Dockerfile`s** for your backend and frontend in their respective directories:

    **`backend/Dockerfile`:**

    ```dockerfile
    # Use an official Node.js runtime as the base image
    FROM node:20-alpine

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and yarn.lock (or package-lock.json)
    COPY package*.json ./

    # Install dependencies
    RUN npm install --frozen-lockfile

    # Copy the rest of the application code
    COPY . .

    # Build the NestJS application
    RUN npm run build

    # Expose the port the app runs on
    EXPOSE 3000

    # Command to run the application
    CMD ["node", "dist/main"]
    ```

    **`frontend/Dockerfile`:**

    ```dockerfile
    # Use an official Node.js runtime as the base image
    FROM node:20-alpine AS builder

    # Set the working directory
    WORKDIR /app

    # Copy package.json and yarn.lock (or package-lock.json)
    COPY package*.json ./

    # Install dependencies
    RUN npm install --frozen-lockfile

    # Copy the rest of the application code
    COPY . .

    # Build the Next.js application
    RUN npm run build

    # Stage 2: Production-ready image
    FROM node:20-alpine
    WORKDIR /app

    # Copy built Next.js app from builder stage
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/public ./public

    # Expose the port Next.js runs on
    EXPOSE 3001

    # Command to run the Next.js application
    CMD ["npm", "start"]
    ```

### Build and Run

1.  **Navigate to the root directory** of the project in your terminal (`url-shortener/`).

2.  **Build and start all services:**

    ```bash
    docker-compose up --build
    ```

    This command will:

      * Build the Docker images for your backend and frontend (if they don't exist or have changed).
      * Create and start the `db`, `backend`, and `frontend` containers.
      * Link the containers and expose the necessary ports.

3.  **Run database migrations (if required by your ORM):**
    After the `db` and `backend` containers are up for the first time, you might need to run migrations. Open a new terminal and run:

    ```bash
    docker-compose exec backend npm run typeorm migration:run
    ```

    This connects to the running `backend` container and executes the migration command.

### Accessing Services

Once all services are running:

  * **Frontend:** Access the application in your browser at `http://localhost:3001`.
  * **Backend API:** The backend API will be accessible at `http://localhost:3000`.

### Stopping Services

To stop all running services and remove their containers, networks, and volumes:

```bash
docker-compose down -v
```

The `-v` flag will also remove the `postgres_data` volume, effectively deleting your database data. If you want to preserve your data for future runs, omit `-v`.

## Contributing

Contributions are welcome\! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
