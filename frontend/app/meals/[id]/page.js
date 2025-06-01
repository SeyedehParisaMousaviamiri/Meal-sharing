'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../components/Layout/Layout';
import './Mealdetails.css';

export default function MealDetailPage() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // Reservation form state
  const [reservationName, setReservationName] = useState('');
  const [reservationEmail, setReservationEmail] = useState('');
  const [reservationGuests, setReservationGuests] = useState(1);
  const [reservationLoading, setReservationLoading] = useState(false);

  // Fetch meal details
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/meals/${id}`);
        if (!res.ok) throw new Error('Meal not found');
        const data = await res.json();
        setMeal(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMeal();
  }, [id]);

  // Fetch reviews for the meal
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/reviews?meal_id=${id}`);
        if (!res.ok) throw new Error('Failed to load reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  // Submit new review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meal_id: id,
          name: reviewName,
          comment: reviewComment,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);
      setReviewName('');
      setReviewComment('');
    } catch (err) {
      alert(err.message);
    } finally {
      setReviewLoading(false);
    }
  };

  // Submit reservation
  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setReservationLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meal_id: id,
          name: reservationName,
          email: reservationEmail,
          guests: reservationGuests,
        }),
      });
      if (!res.ok) throw new Error('Failed to make reservation');
      alert('Reservation successful!');
      setReservationName('');
      setReservationEmail('');
      setReservationGuests(1);
    } catch (err) {
      alert(err.message);
    } finally {
      setReservationLoading(false);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!meal) return <p>Loading meal details...</p>;

  return (
    <Layout>
      <div className="meal-detail">
        <h2>{meal.title}</h2>
        
<img src={`/images/${meal.id}.jpg`} alt={meal.title} className="meal-image" />


        <p><strong>Description:</strong> {meal.description}</p>
<p><strong>Price:</strong> {meal.price} DKK</p>
<p><strong>Location:</strong> {meal.location || 'Not specified'}</p>
<p><strong>Available from:</strong> {meal.available_from?.split('T')[0] || 'N/A'}</p>
<p><strong>Date & Time:</strong> {meal.when ? new Date(meal.when).toLocaleString() : 'TBD'}</p>
<p><strong>Max Reservations:</strong> {meal.max_reservations}</p>
<p><strong>Created:</strong> {new Date(meal.created_date).toLocaleDateString()}</p>

        {/* Reviews Section */}
        <section>
          <h3>Reviews</h3>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          <ul>
            {reviews.map((r) => (
              <li key={r.id}>
                <strong>{r.name}</strong>: {r.comment}
              </li>
            ))}
          </ul>

          <form onSubmit={handleReviewSubmit}>
            <h4>Add a Review</h4>
            <input
              type="text"
              placeholder="Your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
            <br />
            <textarea
              placeholder="Your review"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
            />
            <br />
            <button type="submit" disabled={reviewLoading}>
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </section>

        {/* Reservation Section */}
        <section>
          <h3>Make a Reservation</h3>
          <form onSubmit={handleReservationSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={reservationName}
              onChange={(e) => setReservationName(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Your email"
              value={reservationEmail}
              onChange={(e) => setReservationEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="number"
              min="1"
              max={meal.max_reservations || 10}
              value={reservationGuests}
              onChange={(e) => setReservationGuests(Number(e.target.value))}
              required
            />
            <br />
            <button type="submit" disabled={reservationLoading}>
              {reservationLoading ? 'Booking...' : 'Reserve'}
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}