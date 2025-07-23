![Logo](https://github.com/artak-petrosyan/url_shortener_app/blob/main/url_shortener_frontend/public/logo_small.png?raw=true)
# URL Shortener Frontend

This project is a URL shortener frontend built with a [Next.js](https://nextjs.org) React framework, written in **TypeScript**.

## Table of Contents

  * [Features](#features)
  * [Technologies Used](#technologies-used)
  * [Getting Started](#getting-started)
  * [Usage](#usage)
  * [API Endpoints (Backend)](#api-endpoints-backend)
  * [Database Schema](#database-schema)

## Features

  * **Shorten URLs:** Browser-based graphic user interface to convert long URLs into concise, short links.


## Technologies Used
  * **Next.js:** A React framework for building fast web applications with server-side rendering (SSR) and static site generation (SSG) capabilities.
  * **React:** A JavaScript library for building user interfaces.
  * **TypeScript:** For type-safe frontend development.
  * **Tailwind CSS:** For styling.
  * **Fetch API:** For making HTTP requests to the backend
 

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

  * **Node.js:** [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
  * **npm**, **pnpm** or **yarn:** (Comes with Node.js, or install pnp or Yarn separately)
 
### Setup
1.  **Navigate to the frontend directory:**

    ```bash
    cd ../url_shortener_frontend
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    #or
    yarn install
    ```

3.  **Create a `.env` file:** in the `url_shortener_frontend` directory and add your backend service host:

    ```env
        BACKEND_HOST=http://localhost:3000
    ```

4.  **Start the frontend development server:**

    ```bash
    npm run dev
    # or
    pnpm run dev
    # or
    yarn dev
    ```

    The frontend will typically run on `http://localhost:3001`.

## Usage

1.  Open your web browser and navigate to `http://localhost:3001`.
2.  Enter a long URL into the provided input field.
3.  Click the "Shorten" button.
4.  The application will display the generated short URL.
5.  You can then copy and use this short URL. When accessed, it will redirect to the original long URL.
