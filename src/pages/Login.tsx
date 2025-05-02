
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import '../aspnet-login-styles.css';

const Login = () => {
  const [currentView, setCurrentView] = useState<'Login' | 'Register'>('Login');
  
  const toggleView = () => {
    setCurrentView(currentView === 'Login' ? 'Register' : 'Login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="login-container">
        {currentView === 'Login' ? (
          <LoginForm onViewChange={toggleView} />
        ) : (
          <RegisterForm onViewChange={toggleView} />
        )}
      </div>
    </div>
  );
};

export default Login;
