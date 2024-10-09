import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const RecipeDisplay = ({ recipe, user }) => {
  if (!recipe) return null;

  const handleSaveRecipe = async () => {
    try {
      await addDoc(collection(db, 'users', user.uid, 'recipes'), {
        recipe: recipe,
        createdAt: new Date()
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      alert('Failed to save recipe.');
    }
  };

  return (
    <div>
      <h2>Generated Recipe</h2>
      <pre>{recipe}</pre>
      <button onClick={handleSaveRecipe}>Save Recipe</button>
    </div>
  );
};

export default RecipeDisplay;