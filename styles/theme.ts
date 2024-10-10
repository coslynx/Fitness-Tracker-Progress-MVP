import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles/createTheme';

// Define a function that accepts a theme object (default or custom) and returns a custom theme object.
const createCustomTheme = (theme: ThemeOptions): ThemeOptions => {
  // Customize the theme object here. For example:
  return createTheme({
    ...theme, // Inherit default theme properties
    palette: {
      // Customize the color palette
      primary: {
        main: '#007bff', // Blue primary color
      },
      secondary: {
        main: '#673ab7', // Purple secondary color
      },
      error: {
        main: '#dc3545', // Red error color
      },
    },
    typography: {
      // Customize typography styles
      fontFamily: '"Inter", sans-serif', // Use Inter font
      fontSize: 16, // Default font size
      h1: {
        fontSize: '3rem', // Customize h1 font size
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem', // Customize h2 font size
        fontWeight: 600,
      },
    },
    // Customize other theme properties like spacing, shadows, breakpoints, etc.
    spacing: 8, // Default spacing value
    breakpoints: {
      // Define custom breakpoints
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
};

// Export the createCustomTheme function as the default export.
export default createCustomTheme;