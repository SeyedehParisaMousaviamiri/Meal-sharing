import { useState, useEffect } from "react";

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
        meals.map((meal) => (
          <div key={meal.id} className="meal-item mb-4 p-2 border rounded-lg">
            <p className="font-bold text-lg">{meal.title}</p>
            <p className="text-gray-700">{meal.description}</p>
            <p className="text-green-600 font-semibold">${meal.price.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MealsList;