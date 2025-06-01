// pages/meals.js
import Layout from '../components/Layout/Layout.js';
import MealsList from '../components/MealList/MealList.js';

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3001/api/meals");
        if (!response.ok) throw new Error("Failed to fetch meals");

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, []);

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Meals</h1>
      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="meals-list">
          {meals.map((meal) => (
            <Meal key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
