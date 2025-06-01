import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";
import { mealsRouter } from "./routers/meal.js";
import { reservationsRouter } from "./routers/reservation.js";
import { reviewsRouter } from "./routers/reviews.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter);


app.use(cors());
app.use(bodyParser.json());
app.use("/api/reviews", reviewsRouter)
const apiRouter = express.Router();

const meals = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
    price: 12.99,
    image: "",
    when: "2023-10-01T12:00:00Z"
  },
  {
    id: 2,
    title: "Margherita Pizza",
    description: "Traditional pizza with fresh tomatoes, mozzarella cheese, and basil.",
    price: 10.99,
    image: "",
    when: "2023-10-02T18:00:00Z"
  },
  {
    id: 3,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    price: 8.99,
    image: "",
    when: "2023-10-03T13:00:00Z"
  }
]

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

export default app;