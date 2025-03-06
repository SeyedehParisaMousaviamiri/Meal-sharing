import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import { mealsRouter } from "./routers/meals.js";
import { reservationsRouter } from "./routers/reservations.js";

app.use(express.json()); // Middleware to parse JSON

app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter);

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// Get future meals
apiRouter.get("/future-meals", (req, res) => {
  res.json(meals.filter((meal) => new Date(meal.when) > new Date()));
});

// Get past meals
apiRouter.get("/past-meals", (req, res) => {
  res.json(meals.filter((meal) => new Date(meal.when) < new Date()));
});

// Get all meals (sorted by ID)
apiRouter.get("/all-meals", (req, res) => {
  res.json([...meals].sort((a, b) => a.id - b.id));
});

// Get first meal (by ID)
apiRouter.get("/first-meal", (req, res) => {
  res.json(meals.reduce((min, meal) => (meal.id < min.id ? meal : min)));
});

// Get last meal (by ID)
apiRouter.get("/last-meal", (req, res) => {
  res.json(meals.reduce((max, meal) => (meal.id > max.id ? meal : max)));
});


apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
