
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
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#4b6cb7] to-[#182848]">
      <div className="login-container bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-vpro-blue to-vpro-orange flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-white" fill="none">
              <rect x="2" y="12" width="6" height="6" rx="2" fill="#fff" fillOpacity="0.85"/>
              <rect x="9" y="6" width="6" height="12" rx="2" fill="#fff" fillOpacity="0.85"/>
              <rect x="16" y="2" width="6" height="16" rx="2" fill="#fff" fillOpacity="0.85"/>
            </svg>
          </div>
        </div>
        
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
