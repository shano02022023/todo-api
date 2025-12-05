# Todo API (Node.js)

A backend API for the Todo App built with **Node.js**, supporting authentication and task management.

---

## Prerequisites

- **Node.js** >= 22
- **npm** >= 10
- **MySQL** or **MariaDB** database

---

## Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. **Choose a database and execute the migration script:**
```
database/migration.sql
```
This will create the necessary tables for the Todo App.

3. **Copy the environment file**
```
cp .env.example .env
```

4. **Update .env with your database credentials**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=todo_db
PORT=8080
JWT_SECRET=your_jwt_secret
````

5. **Configure CORS**

In src/config/cors.js, add your frontend host to allow cross-origin requests:

```js
const allowedOrigins = ["http://localhost:5173"];
```

install dependencies
```
npm install
```

run server
```
npm run dev
```