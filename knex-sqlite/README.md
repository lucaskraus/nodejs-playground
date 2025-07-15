# 🚀 Knex + SQLite + Fastify Playground

---

## 🧩 Core Concepts

- **Fastify**: Ultra-fast Node.js web framework for building APIs.
- **Knex.js**: SQL query builder for migrations and database access.
- **SQLite**: Lightweight, file-based relational database.
- **TypeScript**: Type safety across the codebase.
- **Zod**: Runtime schema validation for request data.
- **Session Management**: Cookie-based sessions for user isolation.
- **Migrations**: Version-controlled schema changes.

---

## 📦 Tech Stack

- **Backend**: Fastify, TypeScript
- **Database**: SQLite (via Knex.js)
- **Validation**: Zod
- **Session**: @fastify/cookie

---

## 🗄️ Database Schema

The main table is `transactions`:

| Column     | Type           | Description             |
| ---------- | -------------- | ----------------------- |
| id         | UUID (PK)      | Unique transaction ID   |
| title      | TEXT           | Transaction title       |
| amount     | DECIMAL(10, 2) | Transaction amount      |
| type       | ENUM           | 'credit' or 'debit'     |
| created_at | TIMESTAMP      | Creation timestamp      |
| session_id | UUID           | User session identifier |

---

## 🔑 API Endpoints

All endpoints are prefixed with `/transactions`.

### `GET /transactions`

- **Description:** List all transactions for the current session.
- **Auth:** Requires session cookie.

### `GET /transactions/:id`

- **Description:** Get a specific transaction by ID.
- **Auth:** Requires session cookie.

### `GET /transactions/summary`

- **Description:** Get the sum of all transaction amounts for the session.
- **Auth:** Requires session cookie.

### `POST /transactions`

- **Description:** Create a new transaction. Sets a session cookie if not present.
- **Body:**
  ```json
  {
    "title": "string",
    "amount": 100.0
  }
  ```
- **Response:**
  ```json
  {
    "id": "uuid",
    "message": "Transaction created successfully"
  }
  ```

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd knex-sqlite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file:

```env
DATABASE_URL=./db/db.sqlite
```

### 4. Run migrations

```bash
npm run knex -- migrate:latest
```

### 5. Start the server

```bash
npm run dev
```

Server runs on [http://localhost:3000](http://localhost:3000)

---

## 🧪 Development Scripts

- `npm run dev` — Start server in watch mode
- `npm run knex -- <command>` — Run Knex CLI (e.g., migrations)

---

## 🙌 Acknowledgements

- [Fastify](https://www.fastify.io/)
- [Knex.js](https://knexjs.org/)
- [SQLite](https://www.sqlite.org/)
- [Zod](https://zod.dev/)
- [TypeScript](https://www.typescriptlang.org/)
