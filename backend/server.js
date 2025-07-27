const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Simple CRUD API",
    version: "1.0.0",
    description: "A simple CRUD API built with Express",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [__filename],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let items = [];
let nextId = 1;

const VALID_CREDENTIALS = {
  username: "admin",
  password: "123456",
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Accepts a username and password, validates them against a predefined set of credentials, and returns a success message or a 401 error if credentials are invalid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid username or password
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  if (
    username === VALID_CREDENTIALS.username &&
    password === VALID_CREDENTIALS.password
  ) {
    return res
      .status(200)
      .json({ message: "Login successful", user: { username } });
  }
  return res.status(401).json({ error: "Invalid username or password" });
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Returns a list of all items stored in memory.
 *     responses:
 *       200:
 *         description: Successful request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
app.get("/items", (req, res) => {
  return res.json(items);
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Creates a new item with the given name and assigns an auto-incrementing ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
app.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Item name required" });
  }
  const newItem = { id: nextId++, name };
  items.push(newItem);
  return res.status(201).json(newItem);
});

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     description: Updates the item with the given ID to the provided name.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Successful update
 *       404:
 *         description: Item not found
 */
app.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const itemIndex = items.findIndex((itm) => itm.id === parseInt(id, 10));
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  if (!name) {
    return res.status(400).json({ error: "Item name required" });
  }
  items[itemIndex].name = name;
  return res.json(items[itemIndex]);
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     description: Deletes the item with the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Deletion successful
 *       404:
 *         description: Item not found
 */
app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((itm) => itm.id === parseInt(id, 10));
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  const deletedItem = items.splice(itemIndex, 1);
  return res.json({ message: "Item deleted", item: deletedItem[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
