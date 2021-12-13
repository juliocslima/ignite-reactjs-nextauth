import { useContext, useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from "../services/api";

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
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials) {
    await api.post('sessions', { 
      email, 
      password 
    }).then(response => {

      const { permissions, roles } = response.data;

      setUser({
        email, 
        permissions,
        roles,
      });
    }).catch(error => {
      console.log(error.message);
    });
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);