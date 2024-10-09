// recipe-frontend/src/components/IngredientSearch.js

import { useState } from 'react';
import { fetchRecipeFromAI } from '../api/recipeApi';


const IngredientSearch = ({ onRecipesFetched }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const recipes = await fetchRecipeFromAI(query);
      onRecipesFetched(recipes);
    } catch (err) {
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter ingredients"
      />
      <button onClick={handleFetchRecipe} disabled={loading || !query}>
        {loading ? 'Loading...' : 'Generate Recipe'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default IngredientSearch;
