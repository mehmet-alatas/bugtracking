# React & Node.js CRUD Application

This project is a full-featured CRUD (Create, Read, Update, Delete) application with a React frontend and a Node.js (Express) backend. Users can log in and easily add, update, or delete items. The backend stores data in memory (not persistent).

## Project Structure

```
backend/    # Node.js + Express API
frontend/   # React application
```

## Installation & Usage

### 1. Clone the Repository

```bash
git clone <repo-url>
cd react_node_crud_app_redesigned_frontend 3
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### To Start the Backend:

```bash
npm start
# or
node server.js
```

- The server will run at `http://localhost:3001` by default.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### To Start the Frontend:

```bash
npm start
```

- The app will open at `http://localhost:3000` by default.

## User Login

- Default username: `admin`
- Default password: `123456`

## API Endpoints

- `POST   /login` : User login
- `GET    /items` : Get all items
- `POST   /items` : Add a new item
- `PUT    /items/:id` : Update an item
- `DELETE /items/:id` : Delete an item

## Notes

- This project is for educational/demo purposes only.
- Data is stored in memory on the backend and is not persistent.

## Contributing

Feel free to open pull requests or issues for suggestions and improvements.

---

For any questions or suggestions, please get in touch.
