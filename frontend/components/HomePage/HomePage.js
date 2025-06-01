// HomePage.js
import MealsList from "../MealList/MealList";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Import the new CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <nav className="nav">
          <Link to="/">Home</Link> | <Link to="/meals">Meals</Link>
        </nav>
      </header>

      <h1 className="main-title">Welcome to HackYourFutuer Meals App!</h1>
      <h2 className="sub-title">
        Delicious homemade meals from local chefs
      </h2>

      <MealsList limit={3} />

      <div className="see-more">
        <Link to="/meals">
          <button className="see-more-btn">
            See More Meals
          </button>
        </Link>
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Meal Sharing App. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
