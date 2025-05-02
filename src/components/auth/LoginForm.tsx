
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface LoginFormProps {
  onViewChange: () => void;
}

const LoginForm = ({ onViewChange }: LoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login process
    toast({
      title: "Login bem-sucedido",
      description: "Bem-vindo de volta ao sistema.",
    });
    
    // Redirect to dashboard after successful login
    navigate('/');
  };

  return (
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
          onClick={(e) => { e.preventDefault(); onViewChange(); }}
          style={{ color: 'var(--primary-color)', fontSize: '0.875rem' }}
        >
          Não tem uma conta? Cadastre-se
        </a>
      </div>
    </>
  );
};

export default LoginForm;
