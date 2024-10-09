import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isRegistering) {
        // Sign up the user
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
      } else {
        // Log in the user
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
      }
      onLogin(userCredential.user);  // Call parent callback on successful login
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Authentication failed. Try again.');
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">
          {isRegistering ? 'Sign Up' : 'Log In'}
        </button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Auth;
