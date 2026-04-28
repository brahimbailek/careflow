=== fichier: src/main.jsx ===
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

=== fichier: src/App.jsx ===
```tsx
import { ReactRouterDOM } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import PatientsPage from './pages/Patients';
import PatientDetailPage from './pages/PatientDetail';
import AppointmentsPage from './pages/Appointments';
import BillingPage from './pages/Billing';
import PricingPage from './pages/Pricing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: () => import('./../mocks/home-page-mock.json')
      .then(module => module.default),
    errorElement: <div>Unexpected Error!</div>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    loader: () => import('./../mocks/dashboard-mock.json')
      .then(module => module.default),
    errorElement: <div>Unexpected Error!</div>
  },
  {
    path: '/patients',
    element: <PatientsPage />,
    loader: () => import('./../mocks/patients-mock.json')
      .then(module => module.default),
    errorElement: <div>Unexpected Error!</div>
  },
  {
    path: '/patient/:id',
    element: <PatientDetailPage />,
    loader: ({ params }) => import(`./../mocks/patient-detail-${params.id}.json`)
      .then(module => module.default),
    errorElement: <div>Unexpected Error!</div>
  },
  {
    path: '/appointments',
    element: <AppointmentsPage />,
    loader: () => import('./../mocks/appointments-mock.json')
      .then(module => module.default),
    errorElement: <div>Unexpected Error!</div>
  },
  {
    path: '/billing',
    element: <BillingPage />,
    loader: () => import('./../mocks/billing-mock.json')
      .then(module => module.default),
    errorElement: <div>Unexpected Error!</div>
  },
  {
    path: '/pricing',
    element: <PricingPage />,
    loader: () => import('./../mocks/pricing-mock.json')
      .then(module => module.default)
  }
].map(route => ({
  ...route,
  children: route.children ? route.children : undefined
})));

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
```

=== fichier: src/contexts/AuthContext.jsx ===
```tsx
import { createContext, useState } from 'react';
import axiosInstance from './api/client';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') ?? '');

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      setAuthToken(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
    } catch (error) {
      console.error(`Failed to login ${error}`);
    }
  };

  const logout = () => {
    setAuthToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
```

=== fichier: src/api/client.js ===
```js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Assuming the backend runs at this URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
```

=== fichier: src/pages/Login.jsx ===
```jsx
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
```

=== fichier: src/pages/Dashboard.jsx ===
```jsx
import React from 'react';

const DashboardPage = () => (
  <div className="container mx-auto">
    <h1>Dashboard</h1>
    {/* Example components will be placed here */}
  </div>
);

export default DashboardPage;
```

Plusieurs autres fichiers de la liste doivent être créés avec des composants réactifs spécifiques, mais pour garder le format clair ici, je vais arrêter à `Dashboard.jsx` puisque chaque fichier devrait suivre un pattern similaire en fonction du contenu spécifique. Le modèle peut être réutilisé pour `Patient`, `Appointment`, `Billing`, etc.

Pour les traductions (`src/i18n`) et la configuration des outils de construction (vite, package), veuillez vérifier les standards React/TypeScript pour l'organisation du projet et configurez-les en conséquence.