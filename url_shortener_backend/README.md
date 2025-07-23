<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
![Logo](https://github.com/artak-petrosyan/url_shortener_app/blob/main/url_shortener_frontend/public/logo_small.png?raw=true)
# URL Shortener Backend

This project is a URL shortener backend project built with a **NestJS** framework, **PostgreSQL** database, written in **TypeScript**.

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
  * **npm**, **pnpm** or **yarn:** (Comes with Node.js, or install pnp or Yarn separately)
  * **PostgreSQL:** [https://www.postgresql.org/download/](https://www.postgresql.org/download/) (Only needed if *not* using Docker Container for the DB)

### Backend Setup

1.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    #or
    yarn install
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
    BASE_URL:
    DB_HOST:
    DB_PORT:
    DB_USER:
    DB_PASSWORD:
    DB_NAME:
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
    pnpm run start:dev
    # or
    yarn start:dev
    ```

    The backend will typically run on `http://localhost:3000`.

## API Endpoints

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
        curl --location 'localhost:3000/shorten' \
        --header 'Content-Type: application/json' \
        --data '{
            "originalUrl": "https://example.com/very/long/url"
        }'
        ```
      * **Response:**
        ```json
        {
            "shortUrl": "http://localhost:3000/my-short-code",
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
