"use client";
import React from "react";

const Meal = ({ meal }) => {
  return (
    <div className="meal-item p-4 border rounded-lg shadow hover:shadow-lg transition">
      <img
        src={meal.image}
        alt={meal.title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="font-bold text-xl mb-2">{meal.title}</h2>
      <p className="text-gray-600 mb-2">{meal.description}</p>
      <p className="text-green-600 font-semibold text-lg">${meal.price.toFixed(2)}</p>
    </div>
  );
};

export default Meal;