'use client';

import MealsList from '../components/MealList/MealList';
import Layout from '../components/Layout/Layout';
import { useRouter } from 'next/navigation';
import './Home.css';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="hero-section">
  <h1 className="main-title">Welcome to HackYourFuture Meal Sharing</h1>
  <p className="intro-text">
    Discover delicious meals prepared with love. Book your seat and enjoy
    a great dining experience!
  </p>
</div>
<div>
  {/* Meals list */}
  <MealsList
    limit={3}
    buttonText="See More Meals"
    onButtonClick={() => router.push('/meals')}
  />
</div>
    </Layout>
  );
}
