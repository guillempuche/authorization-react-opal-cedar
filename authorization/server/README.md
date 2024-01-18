# Quotes App Server

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

## Set Up Environment

- **Deno**: A modern JavaScript/TypeScript runtime. [Install Deno](https://deno.land/#installation)
- **Docker**: Used to run the PostgreSQL database. [Install Docker](https://docs.docker.com/get-docker/)
- Set up the **environment variables** for connecting to the database:
  1. Duplicate the `.env.example` file in the project root.
  2. Rename the duplicate to `.env`.
  3. Edit the `.env` file, updating values as needed for your server and Docker's database configurations.
  - **Note**: The `.env` file should not be committed to version control for security reasons.
  - **Note**: Docker image will automatically create and populate `quotes` and `creators` tables when the Docker container is first created. This setup provides a convenient starting point, but note that this data is not persistent. Stopping and removing the Docker container (`docker-compose down`) will erase the data, which will be reinitialized upon restarting (`docker-compose up`).
- Server needs a HTTPS connection to connect to OPAL, means server runs on `https://localhost` instead of `http://localhost`. You need to generate a self signed certificate on your machine to be truested by your browser when running React. Steps:
   - Install `mkcert` following this guide https://web.dev/articles/how-to-use-local-https
   - Open the root if this repo in a terminal and run `mkcert localhost`. Copy both certificates in two places: `server` and `frontend` folders.

## Run Project

1. **Clone the Project**: Clone or download the project to your local machine.
2. **Start the Database**:
   - Navigate to the project directory.
   - Run `docker-compose -p quote-database up` to start the PostgreSQL database in Docker.
   - We're using [PostgreSQL with Deno](https://deno.land/x/postgres).
3. **Run the Server**:
   - Open a new terminal window.
   - Navigate to the project directory.
   - Start server running `deno task start`.

## Extra: Testing Endpoints with Postman

Setting Up Postman:

- **Download Postman**: If you don’t have Postman, download it from [here](https://www.postman.com/downloads/).
- **Open Postman**: Launch the application.

Testing an endpoint:

1. **Select the HTTP Method**: Click on the dropdown that says 'GET' and select the method you need (GET, POST, PUT, DELETE).
2. **Enter the URL**: Enter the endpoint URL. For example, to get all quotes, use `http://localhost:8000/quotes`.
3. **Send a Request**:
   - For GET requests, simply click 'Send'.
   - For POST/PUT requests, go to 'Body', select 'raw', and enter the JSON data for your quote. Then click 'Send'.
4. **View the Response**: The response will be displayed in the lower section of Postman.
