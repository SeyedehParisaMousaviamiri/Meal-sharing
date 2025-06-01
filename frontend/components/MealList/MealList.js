'use client';

import { useState, useEffect } from 'react';
import Meal from '../Meal/Meal';
import './MealsList.css';

export default function MealsList({ limit, buttonText, onButtonClick }) {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let url = 'http://localhost:3001/api/meals';
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
        console.error('Error loading meals:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [limit]);

  if (loading) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p>Error loading meals: {error}</p>;
  }

  return (
    <div>
      <div className="meal-grid">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>

      {buttonText && onButtonClick && (
        <div className="see-more">
          <button className="see-more-btn" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
