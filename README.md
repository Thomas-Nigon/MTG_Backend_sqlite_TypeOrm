
# MTG Backend with SQLite and TypeORM

This is a backend project built using **Express.js**, **SQLite**, and **TypeORM**. The application is designed to manage a Magic: The Gathering (MTG) card collection, providing endpoints for retrieving and managing card data.

## Features

- **Express.js**: A fast, minimalist web framework for Node.js.
- **SQLite**: A lightweight, serverless SQL database engine.
- **TypeORM**: A TypeScript ORM to manage database models and queries.
- **REST API**: Endpoints for creating, reading, updating, and deleting card information.
  
## Prerequisites

To run this project, you'll need to have the following installed:

- **Node.js** (version X.X.X or higher)
- **npm** or **yarn**

## Getting Started

1. **Clone the repository**:

    \`\`\`bash
    git clone https://github.com/Thomas-Nigon/MTG_Backend_sqlite_TypeOrm.git
    cd MTG_Backend_sqlite_TypeOrm
    \`\`\`

2. **Install dependencies**:

    Using npm:

    \`\`\`bash
    npm install
    \`\`\`

    Or using yarn:

    \`\`\`bash
    yarn install
    \`\`\`

3. **Set up SQLite database**:

    TypeORM will automatically generate and synchronize the database schema based on your models.

4. **Run the server**:

    \`\`\`bash
    npm start
    \`\`\`

    The server will start at \`http://localhost:3000\`.

## API Endpoints

| Method | Endpoint                  | Description                           |
|--------|----------------------------|---------------------------------------|
| GET    | \`/cards\`                 | Retrieves all MTG cards               |
| GET    | \`/cards/:id\`             | Retrieves a specific card by ID       |
| POST   | \`/cards\`                 | Adds a new card to the collection     |
| PUT    | \`/cards/:id\`             | Updates a card's information          |
| DELETE | \`/cards/:id\`             | Deletes a card from the collection    |

## Project Structure

\`\`\`bash
MTG_Backend_sqlite_TypeOrm/
│
├── src/
│   ├── entities/
│   │   ├── Card.ts
│   │   └── CardImageUris.ts
│   ├── routes/
│   │   └── cardRoutes.ts
│   ├── controllers/
│   │   └── cardController.ts
│   └── app.ts
│
├── .env.example
├── ormconfig.json
├── package.json
└── README.md
\`\`\`

- **Entities**: Defines the data models for the MTG cards and their associated image URIs.
- **Routes**: Contains the API routes for card-related actions.
- **Controllers**: Handles the logic behind each API endpoint.

## Database

- **SQLite** is used for the local development database.
- **TypeORM** handles database schema and queries.

## License

This project is licensed under the MIT License.
