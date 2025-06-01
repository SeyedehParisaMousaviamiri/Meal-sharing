'use client';

import Link from 'next/link';
import React from 'react';

const Meal = ({ meal }) => {
  return (
    <Link href={`/meals/${meal.id}`} className="block">
      <div className="meal-item bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden">
        {meal.image && (
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{meal.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
          <p className="text-sm"><strong>Price:</strong> {meal.price ? Number(meal.price).toFixed(2) : 'N/A'} DKK</p>
          <p className="text-sm"><strong>Location:</strong> {meal.location || 'Unknown'}</p>
        </div>
      </div>
    </Link>
  );
};

export default Meal;

