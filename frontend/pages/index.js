import MealsList from '../components/MealsList';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to Meal Sharing</h1>
      <h2>Discover and reserve meals shared by locals</h2>
      <MealsList showOnlySome={true} />
      <Link href="/meals">
        <button>See More Meals</button>
      </Link>
    </Layout>
  );
}