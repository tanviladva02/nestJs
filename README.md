# NestJS Users Module Example

A sample NestJS application demonstrating:
- Modular architecture
- DTO (Data Transfer Object) validation
- Mongoose schemas
- Controllers & routing with query, params, and body handling
- Example aggregation pipeline in MongoDB

---

## 📂 Project Structure

```
src/
│   app.module.ts          # Root application module
│   main.ts                 # Application entry point
│
└───users/
    │   users.module.ts     # Users feature module
    │   users.service.ts    # Business logic for users
    │   users.controller.ts # Routes for users
    │
    ├───dto/
    │       create-user.dto.ts  # DTO for creating a user
    │
    └───schemas/
            users.schema.ts     # Mongoose schema for users
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
yarn install
# or
npm install
```

### 2. Set Environment Variables
Create a `.env` file in the root with:
```
MONGO_URI=mongodb://localhost:27017/nestjs_users
PORT=3000
```

### 3. Run the Application
```bash
yarn start:dev
# or
npm run start:dev
```

The app will be available at:
```
http://localhost:3000
```

---

## 📡 API Endpoints

### 1. Get all users
```
GET /users
```
Optional query params:
- `role` → Filter by role  
- `limit` → Limit results  

Example:
```
GET /users?role=admin&limit=5
```

---

### 2. Get a single user by ID
```
GET /users/:id
```
Example:
```
GET /users/64a9d2341b...
```

---

### 3. Create a new user
```
POST /users
```
**Body** (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

---

### 4. Aggregated User Stats
```
GET /users/stats
```
Example aggregation pipeline for grouping by role.

---

## 🛠 Technologies Used
- [NestJS](https://nestjs.com/) - Node.js framework
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Class Validator](https://github.com/typestack/class-validator) - DTO validation
- TypeScript

---

## 📜 License
MIT
