import React from 'react';
import { useState, useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSubmitLoading, setLoginSubmitLoading] = useState(false);
  
  const { login } = useAuthContext();

  useEffect(() => {
    document.title = 'CareFlow - Login';
  }, []);
   
  const handleLoginSubmit = async(event) => {
    event.preventDefault();
    
    setLoginSubmitLoading(true);

    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <form onSubmit={handleLoginSubmit} className='p-8 rounded-lg border overflow-hidden'>
        <h2 className="text-xl font-bold">Sign In to CareFlow</h2>
        <br />

        <label htmlFor="email" className="text-sm">Email:</label>
        <input 
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className='rounded-lg border p-2'
        />

        <br />
        
        <label htmlFor="password" className="text-sm">Password:</label>
        <input 
          type="password"
          id="password"
          minLength={8}
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
          placeholder="your_password"
          required
          className='rounded-lg border p-2 my-1'
        />

        <button 
          type="submit"
          disabled={isLoginSubmitLoading} 
          className='w-full bg-blue-500 text-white px-4 py-2 rounded-md'>Sign in</button>
      </form>

    </div>
  );
};

export default LoginPage;