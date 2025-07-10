import React from 'react';
import AppRouter from './router';
import { AuthProvider } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;
