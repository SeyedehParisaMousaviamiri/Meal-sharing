import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// GET all meals with query parameters
mealsRouter.get("/", async (req, res) => {
    try {
        let query = knex("Meal"); // <-- updated table name here

        // Filtering meals
        if (req.query.maxPrice) {
            query = query.where("price", "<=", parseFloat(req.query.maxPrice));
        }

        if (req.query.availableReservations) {
            const available = req.query.availableReservations === "true";
            query = query.whereExists(function () {
                this.select("*")
                    .from("reservations")
                    .whereRaw("reservations.meal_id = Meal.id") // also update table name here
                    .havingRaw("SUM(reservations.number_of_guests) < Meal.max_reservations");
            });
        }

        if (req.query.title) {
            query = query.where("title", "like", `%${req.query.title}%`);
        }

        if (req.query.dateAfter) {
            query = query.where("when", ">", new Date(req.query.dateAfter));
        }

        if (req.query.dateBefore) {
            query = query.where("when", "<", new Date(req.query.dateBefore));
        }

        // Sorting meals
        if (req.query.sortKey) {
            const validKeys = ["when", "max_reservations", "price"];
            if (validKeys.includes(req.query.sortKey)) {
                const direction = req.query.sortDir === "desc" ? "desc" : "asc";
                query = query.orderBy(req.query.sortKey, direction);
            }
        }

        // Limit results
        if (req.query.limit) {
            query = query.limit(parseInt(req.query.limit));
        }

        const meals = await query;
        res.status(200).json(meals);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching meals", error });
    }
});

// GET meal by ID
mealsRouter.get("/:id", async (req, res) => {
    try {
        const meal = await knex("Meal").where({ id: req.params.id }).first(); // update here
        if (!meal) {
            return res.status(404).json({ message: "Meal not found" });
        }
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meal", error });
    }
});

// POST a new meal
mealsRouter.post("/", async (req, res) => {
    try {
        const [id] = await knex("Meal").insert(req.body); // update here
        const newMeal = await knex("Meal").where({ id }).first(); // update here
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(400).json({ message: "Error adding meal", error });
    }
});

// PUT (update) meal by ID
mealsRouter.put("/:id", async (req, res) => {
    try {
        const updated = await knex("Meal").where({ id: req.params.id }).update(req.body); // update here
        if (!updated) {
            return res.status(404).json({ message: "Meal not found" });
        }
        const updatedMeal = await knex("Meal").where({ id: req.params.id }).first(); // update here
        res.status(200).json(updatedMeal);
    } catch (error) {
        res.status(400).json({ message: "Error updating meal", error });
    }
});

// DELETE meal by ID
mealsRouter.delete("/:id", async (req, res) => {
    try {
        const deleted = await knex("Meal").where({ id: req.params.id }).del(); // update here
        if (!deleted) {
            return res.status(404).json({ message: "Meal not found" });
        }
        res.status(200).json({ message: "Deleted meal" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting meal", error });
    }
});

export default mealsRouter;
