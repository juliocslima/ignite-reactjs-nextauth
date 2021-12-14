import { useContext, useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import Router from 'next/router';
import { api } from "../services/api";
import { setCookie, parseCookies } from 'nookies'

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user?: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if(token) {
      api.get('/me').then(response => {
        if(response) {
          const { email, permissions, roles } = response?.data;

          setUser({
            email, 
            permissions,
            roles,
          });
  
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } 
      }).catch(error => {
        console.log(error.message)
      });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    await api.post('sessions', { 
      email, 
      password 
    }).then(response => {
      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        email, 
        permissions,
        roles,
      });

      Router.push('/dashboard');
    }).catch(error => {
      console.log(error.message);
    });
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);