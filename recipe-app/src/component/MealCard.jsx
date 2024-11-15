import { Link } from 'react-router-dom';

function MealCard({ meal }) {
  return (
    <Link to={`/meal/${meal.idMeal}`} className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="card-content">
        <h3 className="card-title">{meal.strMeal}</h3>
        <p className="card-category">{meal.strCategory}</p>
      </div>
    </Link>
  );
}

export default MealCard;