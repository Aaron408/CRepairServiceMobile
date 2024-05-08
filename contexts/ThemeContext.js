import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const ThemeContext = createContext();

// Hook personalizado para usar el contexto
export const useTheme = () => useContext(ThemeContext);

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Estado del tema

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light')); // Cambiar entre temas light y dark
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
