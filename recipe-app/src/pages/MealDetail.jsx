import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal:', error);
      }
    };

    fetchMeal();
  }, [id]);

  if (!meal) return (
    <div className="recipe-container py-12">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-amber-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-96 bg-amber-100 rounded-lg mb-8"></div>
          <div className="h-4 bg-amber-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    </div>
  );

  const ingredients = Object.keys(meal)
    .filter(key => key.startsWith('strIngredient') && meal[key])
    .map((key, index) => ({
      ingredient: meal[key],
      measure: meal[`strMeasure${index + 1}`]
    }));

  return (
    <div className="min-h-screen bg-recipe-pattern">
      <div className="recipe-container py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
          <h1 className="recipe-title">{meal.strMeal}</h1>
          
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-12"
          />
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="section-title">Ingredients</h2>
              <div className="ingredient-list">
                {ingredients.map((item, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="text-amber-800 font-semibold">{item.measure}</span>
                    <span className="text-gray-700">{item.ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="section-title">Details</h2>
              <div className="space-y-6">
                <div className="category-card">
                  <h3 className="font-playfair text-lg font-semibold text-amber-800 mb-2">Category</h3>
                  <p className="text-gray-700">{meal.strCategory}</p>
                </div>
                
                <div className="category-card">
                  <h3 className="font-playfair text-lg font-semibold text-amber-800 mb-2">Origin</h3>
                  <p className="text-gray-700">{meal.strArea}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-title">Instructions</h2>
            <div className="instructions bg-white p-8 rounded-xl shadow-sm border border-amber-100">
              {meal.strInstructions.split('\r\n').filter(Boolean).map((instruction, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {instruction}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetail;