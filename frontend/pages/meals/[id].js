import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReservationForm from '../../components/ReservationForm';
import ReviewForm from '../../components/ReviewForm';

export default function MealDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/meals/${id}`)
        .then(res => res.json())
        .then(data => setMeal(data));
    }
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  const hasAvailableReservations = meal.max_reservations > meal.total_reservations;

  return (
    <div>
      <h1>{meal.title}</h1>
      <p>{meal.description}</p>

      {hasAvailableReservations ? (
        <ReservationForm mealId={id} />
      ) : (
        <p>No reservations available.</p>
      )}

      <ReviewForm mealId={id} />
    </div>
  );
}
