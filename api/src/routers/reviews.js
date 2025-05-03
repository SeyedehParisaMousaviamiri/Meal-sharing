import express from "express";
/* const knex = require("../database_client.js"); */

export const reviewsRouter = express.Router();

// GET all reviews
reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await knex("reviews").select("*");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET reviews for a specific meal
reviewsRouter.get("/meals/:meal_id/reviews", async (req, res) => {
  try {
    const mealId = req.params.meal_id;
    const reviews = await knex("reviews").where("meal_id", mealId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a review by ID
reviewsRouter.get("/:id", async (req, res) => {
  try {
    const review = await knex("reviews").where("id", req.params.id).first();
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new review
reviewsRouter.post("/", async (req, res) => {
  try {
    const [id] = await knex("reviews").insert(req.body);
    const newReview = await knex("reviews").where("id", id).first();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a review
reviewsRouter.put("/:id", async (req, res) => {
  try {
    const updated = await knex("reviews").where("id", req.params.id).update(req.body);
    if (!updated) return res.status(404).json({ message: "Review not found" });
    const updatedReview = await knex("reviews").where("id", req.params.id).first();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a review
reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("reviews").where("id", req.params.id).del();
    if (!deleted) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


