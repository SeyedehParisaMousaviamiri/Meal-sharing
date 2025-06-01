'use client';

import Layout from '../../components/Layout/Layout';
import MealsList from '../../components/MealList/MealList';

export default function MealsPage() {
  return (
    <Layout>
      <div className="meals-page">
        <h1>All Meals</h1>
        <MealsList />
      </div>
    </Layout>
  );
}