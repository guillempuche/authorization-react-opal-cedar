# Comprehensive Guide for Fullstack: React, API Server, Database & Authorization with Cedar

This guide covers the setup and testing for the Quotes App, focusing on three key areas: the frontend, the server (API and database), and the authorization server. It is tailored to manage quotes and ensure secure and authorized access, suitable for integration with a React frontend.

The purpose of authorization in applications can be summarized by the following key points:

1. **Decision-Making Process**: Authorization determines whether a user's request to perform an action is permissible under the set policies.

2. **Policy Evaluation**: It involves evaluating each incoming request against a set of predefined policies, typically written in a specific authorization language like Cedar.

3. **Preceded by Authentication**: Authentication, which verifies the user's identity, is a necessary precursor to authorization. It involves methods like usernames, passwords, or multi-factor authentication (MFA).

4. **Scalable**: Authorization in applications involves analyzing requests ("Can this user perform this action?"), with engines like Cedar evaluating these against policies to allow or deny actions. This process controls access and ensures adherence to policies, defining who can do what and under what conditions, while enabling consistent policy enforcement across systems.

## Architecture

### Frontend

- **React App**: A web application built with React.js for managing and visualizing quotes, users, and policies.

### API Server and Database

- **API Server**: [Deno](https://deno.land/) - A modern JavaScript/TypeScript runtime with Oak.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - A robust object-relational database system.
- **Containerization**: [Docker](https://docs.docker.com/get-docker/) - Docker runs the database.

### Authorization Server

- **OPAL Server** - Manages communication, updates, and policy distribution.
- **OPAL Client** - Installed alongside the Deno server, receives policy updates.
- **Policy Engine** [Cedar](https://docs.cedarpolicy.com/) - A general-purpose policy engine for policy enforcement.
- **Containerization**: [Docker](https://docs.docker.com/get-docker/) - Docker runs the server, client and policy engine.

### Diagrams

![Diagram](authorization-diagram-1.png)

![Diagram with more details](authorization-diagram-2.png)

_Images from [docs.opal.ac](https://docs.opal.ac/overview/architecture) by [Permit.io](https://www.permit.io/)_

## Setup

### Prerequisites

- Install [Deno](https://deno.land/#installation).
- Install [Docker](https://docs.docker.com/get-docker/).
- Basic knowledge of CLI, clients, servers, and Docker.
- It has been tested on macOS, not on Linux or Windows. The shell scripts could be a problem.

### Environment Variables

- Duplicate and customize `example.env` in both `server` and `authorization` directories.

## Running the Project

1. **Clone** this template.
2. **Start the Database**: In the `server` directory, run `docker-compose -p example-quote-app-database up`.
3. **HTTPS Setup**: Use `mkcert` to generate certificates for secure connections in the root folder. I created them with `localhost` name running `mkcert localhost`. Place them in both `server` and `frontend` root directories, you can copy-paste.
4. **Start the Server**: In the `server` directory, run `deno task start`.
5. **Start the Authorization Server**: In the `authorization` directory, run `docker-compose -p example-quote-app-policy up`.
6. _TODO: instructions for frontend_

## ToDo

- Connect data (quotes and users) via server to authorization server
- Finish frontend

## Resources

- For comprehensive explanations and tutorials on OPAL, OPA, and Cedar, visit [docs.opal.ac](https://docs.opal.ac/) (made by [Permit.io](https://www.permit.io/)).
- Understand the architecture and user/admin flows at [docs.opal.ac/overview/architecture](https://docs.opal.ac/overview/architecture).
- Learn more about Cedar at [cedarpolicy.com](https://www.cedarpolicy.com/).
- Access a list of API endpoints for your local Cedar Client at [github.com/permitio/cedar-agent#api-endpoints](https://github.com/permitio/cedar-agent#api-endpoints).
- Explore the Cedar Agent repository on GitHub at [github.com/permitio/cedar-agent](https://github.com/permitio/cedar-agent).
- Experiment with Cedar in the playground at [cedarpolicy.com/en/playground](https://www.cedarpolicy.com/en/playground).
- Find a tutorial for OPAL and Cedar integration at [github.com/permitio/opal-cedar](https://github.com/permitio/opal-cedar).
