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