import express from "express";
import knex from "../database_client.js";

export const reservationsRouter = express.Router();

// GET all reservations
reservationsRouter.get("/", (req, res) => {
    try {
        const reservations = knex("reservations").select("*");
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservations", error });
    }
});

// GET reservation by ID
reservationsRouter.get("/:id",  (req, res) => {
    try {
        const reservation = knex("reservations").where({ id: req.params.id }).first();
        if (!reservation) {
         res.status(404).json({ message: "Reservation not found" });
         return
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservation", error });
    }
});

// POST a new reservation
reservationsRouter.post("/", (req, res) => {
    try {
        const [id] = knex("reservations").insert(req.body);
        const newReservation = knex("reservations").where({ id }).first();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: "Error adding reservation", error });
    }
});

// PUT (update) reservation by ID
reservationsRouter.put("/:id", (req, res) => {
    try {
        const updated = knex("reservations").where({ id: req.params.id }).update(req.body);
        if (!updated) {
            res.status(404).json({ message: "Reservation not found" });
            return
        }
        const updatedReservation = knex("reservations").where({ id: req.params.id }).first();
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({ message: "Error updating reservation", error });
    }
});

// DELETE reservation by ID
reservationsRouter.delete("/:id", (req, res) => {
    try {
        const deleted = knex("reservations").where({ id: req.params.id }).del();
        if (!deleted) {
         res.status(404).json({ message: "Reservation not found" });
         return
        }
        res.status(200).json({ message: "Deleted reservation" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting reservation", error });
    }
});