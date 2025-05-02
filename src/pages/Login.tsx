
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import '../aspnet-login-styles.css';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'Login' | 'Register'>('Login');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login process
    toast({
      title: "Login bem-sucedido",
      description: "Bem-vindo de volta ao sistema.",
    });
    navigate('/');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate registration process
    toast({
      title: "Cadastro realizado",
      description: "Sua conta foi criada com sucesso.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="login-container">
        {currentView === 'Login' ? (
          <>
            <div className="login-header">
              <h1 className="login-title">Login.</h1>
              <p className="login-subtitle">Use suas credenciais para acessar o sistema.</p>
            </div>
            
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="form-input"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="d-flex justify-between">
                  <label className="form-label" htmlFor="password">Senha</label>
                  <Link to="/forgot-password" className="forgot-password">Esqueceu a senha?</Link>
                </div>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  className="form-input"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                />
                <label htmlFor="rememberMe">Lembrar de mim</label>
              </div>
              
              <button type="submit" className="btn">Entrar</button>
            </form>
            
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentView('Register'); }}
                style={{ color: 'var(--primary-color)', fontSize: '0.875rem' }}
              >
                Não tem uma conta? Cadastre-se
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="login-header">
              <h1 className="login-title">Register.</h1>
              <p className="login-subtitle">Crie uma nova conta.</p>
            </div>
            
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="register-email">Email</label>
                <input 
                  type="email" 
                  id="register-email"
                  name="email"
                  className="form-input"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="register-password">Senha</label>
                <input 
                  type="password" 
                  id="register-password"
                  name="password"
                  className="form-input"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password">Confirmar senha</label>
                <input 
                  type="password" 
                  id="confirm-password"
                  name="confirmPassword"
                  className="form-input"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <button type="submit" className="btn">Cadastrar</button>
            </form>
            
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentView('Login'); }}
                style={{ color: 'var(--primary-color)', fontSize: '0.875rem' }}
              >
                Já tem uma conta? Faça login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
