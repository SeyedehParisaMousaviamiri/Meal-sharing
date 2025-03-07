import express from "express";
import knex from "../database_client.js"; 

export const mealsRouter = express.Router();

// GET all meals
mealsRouter.get("/", (req, res) => {
    try {
        const meals = knex("meals").select("*");
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meals", error });
    }
});

// GET meal by ID
mealsRouter.get("/:id", (req, res) => {
    try {
        const meal = knex("meals").where({ id: req.params.id }).first();
        if (!meal) {
          res.status(404).json({ message: "Meal not found" });
          return
        }
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({ message: "Error fetching meal", error });
    }
});

// POST a new meal
mealsRouter.post("/", (req, res) => {
    try {
        const [id] = knex("meals").insert(req.body);
        const newMeal = knex("meals").where({ id }).first();
        res.status(201).json(newMeal);
    } catch (error) {
        res.status(400).json({ message: "Error adding meal", error });
    }
});

// PUT (update) meal by ID
mealsRouter.put("/:id", (req, res) => {
    try {
        const updated = knex("meals").where({ id: req.params.id }).update(req.body);
        if (!updated) {
            res.status(404).json({ message: "Meal not found" });
            return
        }
        const updatedMeal = knex("meals").where({ id: req.params.id }).first();
        res.status(200).json(updatedMeal);
    } catch (error) {
        res.status(400).json({ message: "Error updating meal", error });
    }
});

// DELETE meal by ID
mealsRouter.delete("/:id", (req, res) => {
    try {
        const deleted = knex("meals").where({ id: req.params.id }).del();
        if (!deleted) {
            res.status(404).json({ message: "Meal not found" });
            return
        }
        res.status(200).json({ message: "Deleted meal" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting meal", error });
    }
});