import express from "express";
import knex from "../database_client.js";

export const reservationsRouter = express.Router();

// GET all reservations
reservationsRouter.get("/", async (req, res) => {
    try {
        const reservations = await knex("reservations").select("*");
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservations", error });
    }
});

// GET reservation by ID
reservationsRouter.get("/:id", async (req, res) => {
    try {
        const reservation = await knex("reservations").where({ id: req.params.id }).first();
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservation", error });
    }
});

// POST a new reservation
reservationsRouter.post("/", async (req, res) => {
    try {
        const [id] = await knex("reservations").insert(req.body);
        const newReservation = await knex("reservations").where({ id }).first();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: "Error adding reservation", error });
    }
});

// PUT (update) reservation by ID
reservationsRouter.put("/:id", async (req, res) => {
    try {
        const updated = await knex("reservations").where({ id: req.params.id }).update(req.body);
        if (!updated) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        const updatedReservation = await knex("reservations").where({ id: req.params.id }).first();
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({ message: "Error updating reservation", error });
    }
});

// DELETE reservation by ID
reservationsRouter.delete("/:id", async (req, res) => {
    try {
        const deleted = await knex("reservations").where({ id: req.params.id }).del();
        if (!deleted) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Deleted reservation" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting reservation", error });
    }
});
