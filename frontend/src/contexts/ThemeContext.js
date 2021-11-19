import { createTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import purple from '@material-ui/core/colors/purple';

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: purple
    },
    colors: {
        bgColor: '#3e3e3e',
        bgLightColor: '#888',
        mainAccentColor: '#fecc01',
    }
})

export default theme