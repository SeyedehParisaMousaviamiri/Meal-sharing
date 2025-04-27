"use client";

import { useState, useEffect, use } from "react";
import Meal from "./Meal"; // Assuming Meal is a component that displays individual meal details

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/api/routers/meal.js');
      const data = await response.json();
      setMeals(data);
    };

    fetchMeals();
  }, []);

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