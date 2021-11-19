import { createTheme } from '@material-ui/core';
import { yellow, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: yellow,
        secondary: grey,
    },
    colors: {
        mainAccentColor: yellow['A700'],
    },
    bp: {
        width: '1200px',  
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    



})

export default theme