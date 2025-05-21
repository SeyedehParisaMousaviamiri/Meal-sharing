import MealsList from "../MealList/MealList";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="mb-6">
        <img src="/logo.png" alt="Logo" className="h-16 mb-4" />
        <nav>
          <Link to="/">Home</Link> | <Link to="/meals">Meals</Link>
        </nav>
      </header>

      <h1 className="text-2xl font-bold mb-6">Welcome to Our Meals App!</h1>
      <h2 className="text-xl mb-6 text-gray-600">
        Delicious homemade meals from local chefs
      </h2>
      <MealsList limit={3}/>

      <div className="mt-6">
        <Link to="/meals">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            See More Meals
          </button>
        </Link>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Meal Sharing App. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;