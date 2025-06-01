"use client";

import { useState, useEffect } from "react";
import Meal from "../Meal/Meal"; // Make sure this path is correct

const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let url = "http://localhost:3001/api/meals";
        if (limit) {
          url += `?limit=${limit}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch meals: ${response.statusText}`);
        }

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        console.error("Error loading meals:", err);
        setError(err.message);
      }
    };

    fetchMeals();
  }, [limit]);

  if (error) {
    return <p className="text-red-600">Error loading meals: {error}</p>;
  }

  return (
    <div className="meals-list p-4">
      {meals.length === 0 ? (
        <p>Loading meals...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;
