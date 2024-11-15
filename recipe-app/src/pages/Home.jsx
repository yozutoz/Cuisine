import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MealCard from '../component/MealCard';

function Home() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch 6 random meals
        const mealsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const mealsData = await mealsResponse.json();
        setMeals(mealsData.meals.slice(0, 6));

        // Fetch categories
        const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.categories.slice(0, 6));

        // Fetch ingredients
        const ingredientsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const ingredientsData = await ingredientsResponse.json();
        setIngredients(ingredientsData.meals.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.idCategory}
              to={`/category/${category.strCategory}`}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h3 className="text-center font-medium">{category.strCategory}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Popular Ingredients</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ingredients.map((ingredient) => (
            <Link
              key={ingredient.idIngredient}
              to={`/ingredient/${ingredient.strIngredient}`}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-center font-medium">{ingredient.strIngredient}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;