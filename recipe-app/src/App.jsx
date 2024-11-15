import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header.jsx';
import Home from './pages/Home.jsx';
import MealDetail from './pages/MealDetail.jsx';
import CategoryMeals from './pages/CategoryMeals.jsx';
import IngredientMeals from './pages/IngredientMeals.jsx';
import RandomMeal from './pages/RandomMeal.jsx';
import SearchResults from './pages/SearchResults.jsx';
import RecipesList from './pages/RecipesList.jsx';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/meal/:id" element={<MealDetail />} />
            <Route path="/category/:category" element={<CategoryMeals />} />
            <Route path="/ingredient/:ingredient" element={<IngredientMeals />} />
            <Route path="/random" element={<RandomMeal />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;