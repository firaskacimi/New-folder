import { useState } from 'react';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

interface AuthState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: any | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  });

  const login = async (data: LoginData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        email: data.email,
        firstName: 'John',
        lastName: 'Doe',
      };
      
      setAuthState({
        isLoading: false,
        error: null,
        isAuthenticated: true,
        user: mockUser,
      });
      
      // Store in localStorage (in real app, use secure storage)
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = 'Email ou mot de passe incorrect';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { success: false, error: errorMessage };
    }
  };

  const register = async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockUser = {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      
      setAuthState({
        isLoading: false,
        error: null,
        isAuthenticated: true,
        user: mockUser,
      });
      
      // Store in localStorage (in real app, use secure storage)
      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true, user: mockUser };
    } catch (error) {
      const errorMessage = 'Une erreur est survenue lors de l\'inscription';
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setAuthState({
      isLoading: false,
      error: null,
      isAuthenticated: false,
      user: null,
    });
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          isLoading: false,
          error: null,
          isAuthenticated: true,
          user,
        });
        return true;
      } catch (error) {
        logout();
        return false;
      }
    }
    return false;
  };

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  };
};