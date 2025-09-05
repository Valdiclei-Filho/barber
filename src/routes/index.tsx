import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

// Dashboard Pages
import DashboardPage from '../pages/dashboard/DashboardPage';
import BookingsPage from '../pages/bookings/BookingsPage';
import ClientsPage from '../pages/clients/ClientsPage';
import BarbersPage from '../pages/barbers/BarbersPage';
import ServicesPage from '../pages/services/ServicesPage';
import ProductsPage from '../pages/products/ProductsPage';
import PaymentsPage from '../pages/payments/PaymentsPage';
import ReportsPage from '../pages/reports/ReportsPage';
import ProfilePage from '../pages/profile/ProfilePage';

// Components
import PrivateRoute from './PrivateRoute';
import { ROUTES } from '../utils/constants';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="barbers" element={<BarbersPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </Router>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px'
          }
        }}
      />
    </>
  );
};

export default AppRoutes;