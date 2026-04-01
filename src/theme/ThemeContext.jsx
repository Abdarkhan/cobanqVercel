import React, { createContext, useMemo, useState, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { color } from 'framer-motion';

const baseTheme = {
  typography: {
      fontFamily: '"Inter","Arial",sans-serif',
    h1: {
      fontFamily: '"Inter","Arial",sans-serif',
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Inter","Arial",sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Inter","Arial",sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    main_header: {
      fontFamily: '"Inter","Arial",sans-serif',
      // fontSize: '48px',
      fontSize: { xs: "24px", sm:'34px', md: "48px" },
      fontWeight: 700,
      letterSpacing: '-0.02em',
      // '@media (max-width: 600px)': {
      //   fontSize: '1.75rem',
      // },
    },
    main_text: {
      fontFamily: '"Inter","Arial",sans-serif',
      // fontSize: '18px',
      fontSize: { xs: '14px', sm: '16px', md: '18px' },

      lineHeight: '1.6',
      color: '#4a5568',
      // '@media (max-width: 600px)': {
      //   fontSize: '1.75rem',
      // },
    },
    button: {
      fontSize: '0.9rem',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  palette: {
    Background: { main: '#ffffff', secondary: '#f5f7fa', navebg: '#000616' },
    primary: { main: '#053684' },
    secondary: { main: '#000616' },
    text: { main: '#ffffff', accent: '#053684', secondary: '#64748b', tertairy: '#0f172a' },
    gradient: "linear-gradient(135deg, #000616 0%, #053685 100%)",
  },
};

// Create the context
const ColorModeContext = createContext({
  toggleColorMode: () => { },
  mode: 'light',
});

// Custom provider component
export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  // Create theme dynamically based on mode
  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode, // 'light' or 'dark'
          ...(mode === 'dark' && {
            Background: { main: '#0a0e14', secondary: '#141a24', navebg: '#0d1424' },
            primary: { main: '#3b82f6' },
            secondary: { main: '#000616' },
            text: {
              main: '#ffffff',
              primary: '#ffffff',
              secondary: '#94a3b8',
              accent: '#7c9fd4',
              tertairy: '#f1f5f9',
            },
          }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Custom hook for easier access
export const useColorMode = () => useContext(ColorModeContext);