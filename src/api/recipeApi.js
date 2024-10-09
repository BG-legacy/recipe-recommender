// recipe-frontend/src/api/recipeApi.js

import axios from 'axios';

// API to fetch recipe from the backend
export const fetchRecipeFromAI = async (ingredients) => {
  try {
    const response = await axios.get('http://localhost:5001/generate-recipe', {
      params: { ingredients }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe from AI:', error);
    throw new Error('Failed to fetch recipe');
  }
};
