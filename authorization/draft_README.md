# Quotes App Server & OPAL Cedar Server

> ⚠️ The local database with Docker (e.g. a shell script) hasn't been checked on Linux and Windows machines.

## Overview

This guide is for setting up the server side of a Quotes application. Our Quotes app allows predefined users to create, view, update, and delete quotes. It's designed to be connected to a React frontend, which provides a user interface for these actions.

## Architecture of Server

- **Server Runtime**: Deno - A modern runtime for JavaScript and TypeScript.
- **Framework**: Oak - A middleware framework for Deno's HTTP server, similar to Express.js in Node.js.
- **Database**: PostgreSQL - A powerful, open-source object-relational database system.
- **Containerization**: Docker - To run the PostgreSQL database in an isolated environment.
- **Endpoints**:
  - GET `/quotes`: Fetch all quotes.
  - POST `/quotes`: Create a new quote.
  - PUT `/quotes/:id`: Update an existing quote.
  - DELETE `/quotes/:id`: Delete a quote.
  - [in progress]

## Set Up Environment

- **Deno**: A modern JavaScript/TypeScript runtime. [Install Deno](https://deno.land/#installation)
- **Docker**: Used to run the PostgreSQL database. [Install Docker](https://docs.docker.com/get-docker/)
- Set up the **environment variables** for connecting to the database:
  1. Duplicate the `.env.example` file in the project root.
  2. Rename the duplicate to `.env`.
  3. Edit the `.env` file, updating values as needed for your server and Docker's database configurations.
  - **Note**: The `.env` file should not be committed to version control for security reasons.
  - **Note**: Docker image will automatically create and populate `quotes` and `creators` tables when the Docker container is first created. This setup provides a convenient starting point, but note that this data is not persistent. Stopping and removing the Docker container (`docker-compose down`) will erase the data, which will be reinitialized upon restarting (`docker-compose up`).

## Run Project

1. **Clone the Project**: Clone or download the project to your local machine.
2. **Start the Database**:
   - Navigate to the `server` directory.
   - Run `docker-compose -p example-quote-app-database up` to start the PostgreSQL database in Docker.
3. Our server is using a HTTPS connection to connect securely to OPAL (it requires a secure connection to receive database data), means the server runs on `https://localhost` instead of `http://localhost`. We need to generate a self signed certificate on our machine to be trusted by the browser when running the frontend. Steps:
   - Install `mkcert` following this guide https://web.dev/articles/how-to-use-local-https
   - Open a terminal on the `server` directory and run `mkcert localhost`, it generates two files.
4. **Run the Server**:
   - Open a new terminal window.
   - Navigate to the project directory.
   - Start server running `deno task start`.
