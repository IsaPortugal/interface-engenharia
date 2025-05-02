
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
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
    setIsLoading(true);
    
    // Simulate login process for preview
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo de volta ao sistema.",
      });
      navigate('/');
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process for preview
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso.",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {activeTab === 'login' ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-medium text-gray-900">Login.</h1>
              <p className="text-gray-600">Use your account credentials to login.</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    required
                    className="mt-1 border border-gray-300"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    required
                    className="mt-1 border border-gray-300"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">Remember me</Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : "Log in"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <button 
                onClick={() => setActiveTab('register')}
                className="text-sm text-blue-600 hover:underline"
              >
                Don't have an account? Register
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-medium text-gray-900">Register.</h1>
              <p className="text-gray-600">Create a new account.</p>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email</Label>
                  <Input 
                    id="register-email" 
                    name="email"
                    type="email" 
                    required
                    className="mt-1 border border-gray-300"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</Label>
                  <Input 
                    id="register-password" 
                    name="password"
                    type="password" 
                    required
                    className="mt-1 border border-gray-300"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm password</Label>
                  <Input 
                    id="confirm-password" 
                    name="confirmPassword"
                    type="password" 
                    required
                    className="mt-1 border border-gray-300"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : "Register"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <button 
                onClick={() => setActiveTab('login')}
                className="text-sm text-blue-600 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
