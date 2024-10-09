import React, { useState } from 'react';
import axios from 'axios';

const RecipeGenerator = () => {
  const [preference, setPreference] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetailsOption, setShowDetailsOption] = useState(false);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5001/generate-recipe', { preference });
      setRecommendation(response.data.recommendation);
      setShowDetailsOption(true);
    } catch (err) {
      setError('Failed to generate recipe');
      console.error('Error generating recipe:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const recipeName = recommendation.split('**')[1].split('**')[0]; // Extract recipe name from recommendation
      const response = await axios.post('http://localhost:5001/generate-recipe', { get_details: true, recipe_name: recipeName });
      setDetails(response.data.details);
    } catch (err) {
      setError('Failed to get recipe details');
      console.error('Error getting recipe details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI-Powered Recipe Generator</h2>
      {!recommendation && (
        <>
          <input
            type="text"
            style={{ width: '400px', height: '40px', fontSize: '16px' }}
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            placeholder="What kind of food are you in the mood for today?"
          />
          <button onClick={handleGenerateRecipe} disabled={loading || !preference}>
            {loading ? 'Generating...' : 'Generate Recipe'}
          </button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recommendation && (
        <div>
          <h3>Recommendation:</h3>
          <p>{recommendation}</p>
          {showDetailsOption && !details && (
            <div>
              <p>Would you like to see the ingredients and instructions?</p>
              <button onClick={handleGetDetails}>Yes</button>
              <button onClick={() => { setRecommendation(''); setShowDetailsOption(false); }}>No, start over</button>
              {loading && <p>Loading...</p>}
            </div>
          )}
          {details && (
            <div>
              <h3>Ingredients and Instructions:</h3>
              <p>{details}</p>
              <button onClick={() => {handleGenerateRecipe(); setDetails(''); setShowDetailsOption(false);}}>Generate another recipe</button>
            
              <button onClick={() => { setRecommendation(''); setDetails(''); setShowDetailsOption(false); }}>Start over</button>
              {loading && <p>Loading...</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;


