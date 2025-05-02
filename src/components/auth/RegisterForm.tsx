
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface RegisterFormProps {
  onViewChange: () => void;
}

const RegisterForm = ({ onViewChange }: RegisterFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registerData, setRegisterData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
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
    
    // Redirect to dashboard after successful registration
    navigate('/');
  };

  return (
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
          onClick={(e) => { e.preventDefault(); onViewChange(); }}
          style={{ color: 'var(--primary-color)', fontSize: '0.875rem' }}
        >
          Já tem uma conta? Faça login
        </a>
      </div>
    </>
  );
};

export default RegisterForm;
