import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF3C00', // bright 8-bit red
      contrastText: '#FFF8DC', // off-white for contrast
    },
    secondary: {
      main: '#0044CC', // bold 8-bit blue
      contrastText: '#FFD700', // gold/yellow for contrast
    },
    background: {
      default: '#282828', // dark gray background, classic retro vibe
      paper: '#3A3A3A', // slightly lighter for paper components
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFD700',
    },
  },
  typography: {
    fontFamily: "'Press Start 2P', cursive",
    fontSize: 14, // base font size for body text and buttons
    h4: {
      fontSize: 16, // smaller titles
    },

    button: {
      fontSize: 14,
      textTransform: 'none', // keep buttons untransformed for retro feel
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 14,
          textTransform: 'none',
          color: '#FFD700', // default text color (yellow)
          '&:hover': {
            backgroundColor: '#38761d',
            color: '#FAEC54', // lighter yellow on hover
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 24,
        },
        h2: {
          fontSize: 22,
        },
        h3: {
          fontSize: 20,
        },
        h4: {
          fontSize: 18,
        },
        h5: {
          fontSize: 16,
        },
        h6: {
          fontSize: 14,
        },
        body1: {
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E2E2E', // dark grey background
          color: '#FFD700', // readable gold text
          '& fieldset': {
            borderColor: '#555', // subdued border
          },
          '&:hover fieldset': {
            borderColor: '#888', // lighten on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF3C00', // bright red on focus
          },
        },
        input: {
          color: '#FFD700', // input text color
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FFD700', // label color
          '&.Mui-focused': {
            color: '#FF3C00', // focused label color
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          //backgroundColor: '#121212', // dark background for all pages
          //0c343d
          backgroundColor: '#20124d',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#FF3C00', // primary main color for the arrow
        },
      },
    },
  },
});

export default theme;
