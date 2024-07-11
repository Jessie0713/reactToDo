import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      light: '#68c6c8',
      main: '#28aeb1',
      dark: '#1d7f7f',
    },
    secondary: {
      light: '#fdea8e',
      main: '#FDEA8E',
      other: '#cccccc',
    },
    success: {
      main: '#68C6C8',
    },
    info: {
      light: '#cccccc',
      main: '#666666',
    },
    error: {
      light: '#db807c',
      main: '#CC4A44',
    },
  },
  typography: {
    // letterSpacing: '10px',
    // fontFamily: "'Noto Sans JP', sans-serif",
    h2: {
      fontSize: '28px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '18px',
      fontWeight: 'bolder',
    },
    h4: {
      fontSize: '16px',
    },
    h5: {
      fontSize: '14px',
    },
    h6: {
      fontSize: '12px',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '0.02rem',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          margin: '0px',
          padding: '0px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          margin: '0px',
          padding: '5px',
          '&:last-child': {
            paddingBottom: 0,
          },
          overflow: 'unset',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: '10px',
          margin: '0px',
          padding: '15px',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#d32f2f',
        },
      },
    },
  },
})

export default theme
