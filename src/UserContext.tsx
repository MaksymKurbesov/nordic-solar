import React, { createContext, useState, ReactNode } from "react";

// Определяем интерфейс для данных пользователя
interface User {
  id: string;
  name: string;
  email: string;
  // Добавьте любые другие поля, которые вам нужны
}

// Определяем интерфейс для контекста пользователя
export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Создаем контекст с типизацией
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Тип для провайдера
interface UserProviderProps {
  children: ReactNode;
}

// Создаем провайдер, который будет оборачивать компоненты и предоставлять доступ к контексту
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Объект значений, который будет предоставлен всем компонентам
  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
