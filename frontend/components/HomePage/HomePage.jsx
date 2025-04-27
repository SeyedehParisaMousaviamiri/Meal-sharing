import MealsList from "../MealsList/MealsList";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="text-2xl font-bold mb-6">Welcome to Our Meals App!</h1>
      <MealsList />
    </div>
  );
};

export default HomePage;