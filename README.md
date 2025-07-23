![alt text](https://github.com/artak-petrosyan/url_shortener_app/blob/main/url_shortener_frontend/public/logo_small.png?raw=true)
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

## Docker Compose

Docker Compose allows you to run the entire application stack (backend, frontend, and database) with a single command.

### Prerequisites

  * **Docker Desktop:** [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) (Includes Docker Engine and Docker Compose)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/url_shortener_app.git
    cd url_shortener_app
    ```

2.  **Customize `.env` file**(optional).

        ```env
        # .env
        PORT=3000
        DB_HOST=db # Important: Use the service name 'db'
        DB_PORT=5432
        DB_USERNAME=your_username
        DB_PASSWORD=your_password
        DB_DATABASE=url_shortener_db
        BASE_URL="http://localhost:3001"
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

The PostgreSQL database will contain a table similar to the following:

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
url_shortener_app/
├── url_shortener_backend/
├── url_shortener_frontend/
├── docker-compose.yml
```

