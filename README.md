![Logo](https://github.com/artak-petrosyan/url_shortener_app/blob/main/url_shortener_frontend/public/logo_small.png?raw=true)
# URL Shortener Application

This project is a full-stack URL shortener application built with a **NestJS** backend, **PostgreSQL** database, and a **Next.js** frontend. Both the backend and frontend are written in **TypeScript**.

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

### Backend

  * **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
  * **TypeScript:** Superset of JavaScript that adds static typing.
  * **PostgreSQL:** Powerful, open-source object-relational database system.
  * **TypeORM:** ORM for interacting with the PostgreSQL database.
  * **dotenv:** For managing environment variables.
 
### Frontend

  * **Next.js:** A React framework for building fast web applications with server-side rendering (SSR) and static site generation (SSG) capabilities.
  * **React:** A JavaScript library for building user interfaces.
  * **TypeScript:** For type-safe frontend development.
  * **Tailwind CSS:** For styling.
  * **Fetch API:** For making HTTP requests to the backend.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Docker Compose

Docker Compose allows you to run the entire application stack (backend, frontend, and database) with a single command.

#### Prerequisites

  * **Docker Desktop:** [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) (Includes Docker Engine and Docker Compose)

#### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/artak-petrosyan/url_shortener_app.git
    cd url_shortener_app
    ```

2.  **Customize `.env` file**(optional).

        ```env
        # .env
        IMAGE_TAG=latest
        APP_PREFIX=url_shortener
        POSTGRES_HOST=posthgres_db
        POSTGRES_DB=shorturl_db
        POSTGRES_PORT=5437
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=postgres
        BACKEND_PORT=3009
        BACKEND_APP_PORT=3000
        FRONTEND_PORT=3017
        FRONTEND_APP_PORT=3000
        ```

#### Build and Run

1.  **Navigate to the root directory** of the project in your terminal (`url-shortener/`).

2.  **Build and start all services:**

    ```bash
    docker-compose up --build
    ```

    This command will:

      * Build the Docker images for your backend and frontend (if they don't exist or have changed).
      * Create and start the `db`, `backend`, and `frontend` containers.
      * Link the containers and expose the necessary ports.


#### Accessing Services

Once all services are running:

  * **Frontend:** Access the application in your browser at `http://localhost:3017`.
  * **Backend API:** The backend API will be accessible at `http://localhost:3009`.

  **Note:** Make sure to replace the port if it has changed in the `.env` file (`FRONTEND_PORT`, `BACKEND_PORT` accordingly).

#### Stopping Services

To stop all running services and remove their containers, networks, and volumes:

```bash
docker-compose down -v
```

The `-v` flag will also remove the `postgres_data` volume, effectively deleting your database data. If you want to preserve your data for future runs, omit `-v`.


## API Endpoints (Backend)

The backend provides the following RESTful API endpoints:

  * **`POST /shorten`**:

      * **Description:** Creates a new short URL.
      * **Request Body:**
        ```json
        {
            "onoriginalUrlgUrl": "https://example.com/very/long/url",
        }
        ```
        ```cURL
        curl --location 'localhost:3005/shorten' \
        --header 'Content-Type: application/json' \
        --data '{
            "originalUrl": "https://example.com/very/long/url"
        }'
        ```
      * **Response:**
        ```json
        {
            "shortUrl": "http://localhost:3005/my-short-code",
        }
        ```

  * **`GET /:code`**:

      * **Description:** Redirects to the original long URL associated with the given short code.
      * **Parameters:** `code` (the short code, e.g., `abcde`).

## Database Schema

The PostgreSQL database will contain:

### `url` Table

| Column Name | Data Type | Constraints | Description              |
| :---------- | :-------- | :---------- | :----------------------- |
| `id`        | INTEGER      | PRIMARY KEY | Unique identifier        |
| `original`  | CHARACTER VARYING      | UNIQUE, NOT NULL, INDEX   | The original long URL    |
| `short`| CHARACTER VARYING      | UNIQUE, NOT NULL, INDEX   | The generated short code |
| `createdAt`| TIMESTAMP | DEFAULT NOW() | Timestamp of creation |
| `createdAt`| TIMESTAMP | DEFAULT NOW() | Timestamp of update |

## Project Structure

```
url_shortener_app/
├── url_shortener_backend/
├── url_shortener_frontend/
├── docker-compose.yml
```

