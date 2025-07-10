import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Landing from '../pages/Landing';

const AppRouter = () => (
   
  <Routes>
    <Route path="/login" element={        
        <MainLayout>
          <Login/>
        </MainLayout>
      } />
    <Route path="/register" element={    
        <MainLayout>
          <Register/>
        </MainLayout>
    } />
    <Route path="/forgot-password" element={
        <MainLayout>
          <ForgotPassword/>
        </MainLayout>
      } />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/" element={
        <MainLayout>
          <Landing/>
        </MainLayout>
      } />


    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard"
        element={
          <MainLayout>
            <Dashboard/>
        </MainLayout>
        }
      />
    </Route>
  </Routes>
);

export default AppRouter;
