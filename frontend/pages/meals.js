import MealsList from '../components/MealsList';
import Layout from '../components/Layout';

export default function MealsPage() {
  return (
    <Layout>
      <h1>All Meals</h1>
      <MealsList />
    </Layout>
  );
}