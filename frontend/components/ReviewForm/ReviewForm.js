import { useState } from 'react';

export default function ReviewForm({ mealId }) {
  const [formData, setFormData] = useState({ title: '', description: '', stars: 5 });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, meal_id: mealId }),
      });

      if (!res.ok) throw new Error('Review submission failed');
      alert('Review submitted!');
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Review Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Your review" onChange={handleChange} required />
      <input type="number" name="stars" min="1" max="5" value={formData.stars} onChange={handleChange} />
      <button type="submit">Submit Review</button>
    </form>
  );
}
