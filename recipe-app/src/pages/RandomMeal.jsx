import { useState, useEffect } from 'react';

function RandomMeal() {
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  if (!meal) return <div>Loading...</div>;

  const ingredients = Object.keys(meal)
    .filter(key => key.startsWith('strIngredient') && meal[key])
    .map((key, index) => ({
      ingredient: meal[key],
      measure: meal[`strMeasure${index + 1}`]
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Random Recipe</h1>
          <button
            onClick={fetchRandomMeal}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Get Another Recipe
          </button>
        </div>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <p>{meal.strCategory}</p>
            <h2 className="text-xl font-semibold mt-4 mb-4">Area</h2>
            <p>{meal.strArea}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="whitespace-pre-line">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RandomMeal;