# MTG Backend with SQLite and TypeORM

This is a backend project built using **Apollo Server**, **PostgreSQL**, and **TypeORM**. The application is designed to manage a Magic: The Gathering (MTG) card collection, providing endpoints for retrieving and managing card data.

## Features

- **Apollo Server**: A GraphQL server for Node.js.
- **GraphQL**: A query language for APIs and a runtime for fulfilling those queries with your existing data.
- **PostgreSQL**: A powerful, open-source relational database management system.
- **TypeORM**: A TypeScript ORM to manage database models and queries.

## Prerequisites

To run this project, you'll need to have the following installed:

- **Node.js**
- **npm** or **yarn**

## GraphQL API

The application now uses GraphQL for API requests. Below are some examples of queries and mutations you can perform:

### Queries

- **Retrieve all MTG cards**:
  ```graphql
  {
    cards {
      id
      name
      type
      ...
    }
  }
  ```

## Project Structure

```bash
MTG_Backend_sqlite_TypeOrm/
│
├── src/
│   ├── entities/
│   │   ├── Card.ts
│   │   └── CardImageUris.ts
│   ├── resolvers/
│   │   └── cardResolver.ts
│   ├── schema/
│   │   └── cardSchema.graphql
│   └── app.ts
│
├── .env.example
├── docker-compose.yaml
├── Dockerfile
├── package.json
└── README.md


- **Entities**: Defines the data models for the MTG cards and their associated image URIs Database Schema.
- **Resolvers**: Contains the GraphQL resolvers for handling queries and mutations.
- **App.ts**: The main entry point for the application, setting up the server and middleware.
- **Docker**: Configuration files for containerizing the application.
- **Environment Configuration**: Example file for setting up environment variables.

## Database

- **PostgreSQL** is used for the local development database.
- **TypeORM** handles database schema and queries.

## License

This project is licensed under the MIT License.
```

# Running the MTG Backend with Docker

This section provides instructions on how to run the MTG Backend project using Docker and Docker Compose.

## Prerequisites

Ensure you have the following installed on your machine:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Thomas-Nigon/MTG_Backend_sqlite_TypeOrm.git
   cd MTG_Backend_sqlite_TypeOrm
   ```

2. **Build and run the Docker containers**:

   Use Docker Compose to build and start the containers:

   ```bash
   docker compose up --build
   ```

   This command will build the Docker images and start the containers as defined in the `docker-compose.yaml` file.

3. **Access the application**:

   Once the containers are up and running, the backend server will be accessible at:

   ```
   http://localhost:4000
   ```

   The vizualizer will be accessible at:

   ```
   http://localhost:7001/vizualizer
   ```

4. **Stopping the containers**:

   To stop the running containers, use:

   ```bash
   docker compose down
   ```

   This will stop and remove the containers, but the data in your SQLite database will persist in the `./data` directory.

## Notes

- Ensure that the `docker-compose.yaml` file is correctly configured with the necessary services and volumes.
- The backend server is set to run in development mode using the `npm run start` command. Adjust this as needed for production environments.
