import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF3C00', // 8-bit red
      contrastText: '#FFF8DC', // off-white
    },
    secondary: {
      main: '#00E0FF', // neon cyan
      contrastText: '#1A1A1A', // dark contrast
    },
    background: {
      default: '#1A1A1A', // deep CRT-style black
      paper: '#2B2B2B', // slightly lifted surface
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#FFD700', // gold
    },
  },
  typography: {
    fontFamily: '\'Press Start 2P\', cursive',
    fontSize: 14,
    h4: {
      fontSize: 16,
    },
    button: {
      fontSize: 14,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          fontSize: 12,
          textTransform: 'none',
          color: '#FFD700',
          '&:hover': {
            backgroundColor: '#444400',
            color: '#FAEC54',
          },
        },
        containedPrimary: {
          backgroundColor: '#FF3C00',
          color: '#FFF8DC',
          '&:hover': {
            backgroundColor: '#CC2F00',
          },
        },
        containedSecondary: {
          backgroundColor: '#00E0FF',
          color: '#1A1A1A',
          '&:hover': {
            backgroundColor: '#00BFE0',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: { fontSize: 24 },
        h2: { fontSize: 22 },
        h3: { fontSize: 20 },
        h4: { fontSize: 18 },
        h5: { fontSize: 16 },
        h6: { fontSize: 14 },
        body1: { fontSize: 14 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E2E2E',
          color: '#FFD700',
          fontSize: 12,
          '& fieldset': {
            borderColor: '#555',
          },
          '&:hover fieldset': {
            borderColor: '#888',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF3C00',
          },
        },
        input: {
          color: '#FFD700',
          fontSize: 12,
          padding: '10px 12px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#FFD700',
          fontSize: '12px',
          '&.Mui-focused': {
            color: '#FF3C00',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1A1A1A',
        },
        a: {
          color: '#00E0FF', // neon cyan
          textDecoration: 'none',
        },
        'a:visited': {
          color: '#FF00AA', // retro magenta
        },
        'a:hover': {
          color: '#FFFF66', // glowing yellow
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          // paddingTop: '6px',
          // paddingBottom: '6px',
          color: '#FFD700',
          '&.Mui-selected': {
            backgroundColor: '#444400', // retro olive highlight
            color: '#FAEC54', // bright yellow
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#666600', // brighter on hover
            color: '#FFFF66',
          },
        },
        icon: {
          color: '#FF3C00',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '12px', // reduce font in dropdown items
          paddingTop: '6px',
          paddingBottom: '6px',
        },
      },
    },
  },
});

export default theme;
