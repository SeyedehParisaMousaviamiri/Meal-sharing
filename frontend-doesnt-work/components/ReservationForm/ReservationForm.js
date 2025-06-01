import { useState } from 'react';

export default function ReservationForm({ mealId }) {
  const [formData, setFormData] = useState({ name: '', email: '', phonenumber: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, meal_id: mealId }),
      });

      if (!res.ok) throw new Error('Reservation failed');
      alert('Reservation successful!');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phonenumber" placeholder="Phone Number" onChange={handleChange} required />
      <button type="submit">Book Seat</button>
    </form>
  );
}
