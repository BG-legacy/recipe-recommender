import React, { useState } from 'react';
import Auth from './components/Auth';
import RecipeGenerator from './components/RecipeGenerator';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <h1>AI-Powered Recipe Generator</h1>
      {!user ? (
        <Auth onLogin={setUser} />
      ) : (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <RecipeGenerator />
        </>
      )}
    </div>
  );
};

export default App;
