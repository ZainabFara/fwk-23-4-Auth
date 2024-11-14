# Auth Server

## Description

This project is an authentication server built with Node.js and Express that handles user login and registration. The server uses token-based authentication, ensuring secure login, and integrates monitoring with Prometheus and Grafana.

## Features

- **User Authentication:** Token-based authentication using `accessToken`, `refreshToken`, and `csrfToken`.
- **Security:** `accessToken` stored in `httpOnly` cookies with CSRF protection.
- **Monitoring:** Integrated Prometheus metrics to track user actions, such as login attempts.

## Prerequisites

To run this project, you need:

- [Node.js](https://nodejs.org/) installed.
- [Docker and Docker Compose](https://www.docker.com/) installed.

## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/ZainabFara/fwk-23-4-Auth.git
   cd fwk-23-4-Auth
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Build the Docker Compose services**

```bash
   docker-compose build
```

4. **Run the Docker Compose services**

```bash
   docker-compose up -d
```

5. **Verify installation: Check that the services are running**

Check that the services are running and accessible at the following endpoints:

- **Auth Server**: [http://localhost:3002](http://localhost:3002)
- **Prometheus**: [http://localhost:9090](http://localhost:9090)
- **Grafana**: [http://localhost:3005](http://localhost:3005)

## Usage

### API Endpoints

- **POST /login**: Logs in a user and generates access and refresh tokens.
- **POST /register**: Registers a new user.
- **GET /metrics**: Retrieves metrics in Prometheus format.
- **GET /health**: Check service status

### Authentication

The server uses `accessToken`, `refreshToken`, and `csrfToken` for secure authentication:

- `accessToken` is stored in `httpOnly` cookies for secure session validation.
- `csrfToken` is used to prevent CSRF attacks.

## Metrics

The auth server is configured with Prometheus to monitor application health and usage data, including:

- **login_counter**: Tracks the total number of total logins.

## Logging

Logging is managed by **Winston** with the following configuration:

- Logs are written to both the console and the `log/combine.log` file.
- Each log entry includes a timestamp and is stored in JSON format for consistency and structure.

## Monitoring and Observability

This project is integrated with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for monitoring and observability:

- Health checks and operational status of the auth server.
- Resource usage metrics such as CPU and memory usage, monitored via the Docker Exporter.

## Development and Testing

To test the API, you can use [Insomnia](https://insomnia.rest/) or any other API client.

For local development:

1. Run the server locally with the command:

```bash
   npm start
```
