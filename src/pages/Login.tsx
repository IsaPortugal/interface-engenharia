
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: '',
    registration: '', // CREA/CAU registration number
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Success toast
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
    
    // Simulate registration process
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md p-4">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Gerenciamento de Obras</h1>
          <p className="text-gray-600 mt-2">Plataforma para engenheiros e arquitetos</p>
        </div>
        
        <Card className="w-full glass-card">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Acesso ao Sistema</CardTitle>
            <CardDescription className="text-center">
              Faça login ou cadastre-se para acessar o painel
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="seu@email.com"
                          className="pl-9" 
                          value={loginData.email}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="password" 
                          name="password"
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          className="pl-9 pr-9" 
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full blue-gradient-3 hover:opacity-90 transition-opacity"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Entrando...
                        </>
                      ) : "Entrar"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="name" 
                          name="name"
                          placeholder="João Silva"
                          className="pl-9" 
                          value={registerData.name}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="register-email" 
                          name="email"
                          type="email" 
                          placeholder="seu@email.com"
                          className="pl-9" 
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profissão</Label>
                      <Input 
                        id="profession" 
                        name="profession"
                        placeholder="Engenheiro Civil" 
                        value={registerData.profession}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registration">Número de Registro (CREA/CAU)</Label>
                      <Input 
                        id="registration" 
                        name="registration"
                        placeholder="123456/D" 
                        value={registerData.registration}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="register-password" 
                            name="password"
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="pl-9" 
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="confirm-password" 
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="pl-9" 
                            value={registerData.confirmPassword}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        type="button"
                        className="text-sm text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <span className="flex items-center">
                            <EyeOff className="h-4 w-4 mr-1" /> Ocultar senhas
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" /> Mostrar senhas
                          </span>
                        )}
                      </button>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-opacity"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cadastrando...
                        </>
                      ) : "Criar Conta"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col items-center text-center text-sm text-gray-600">
            <p>Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
