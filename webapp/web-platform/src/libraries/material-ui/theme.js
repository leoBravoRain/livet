// import { createMuiTheme } from 'material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
// import indigo from 'material-ui/colors/indigo';
// import pink from 'material-ui/colors/pink';
// import red from 'material-ui/colors/red';
// import purple from '@material-ui/core/colors/purple';
// import red from '@material-ui/core/colors/red';

// const primary = red[500]; // #F44336
// const primary = "#2a9d8f";
const primary = "#4361EE";

// const accent = purple['A200']; // #E040FB
// const accent = "#e76f51";
const accent = "#66FBD1";
// const accent = purple.A200; // #E040FB (alternative method)

export default createMuiTheme({
    // typography: {
    //     // title1: {
    //     //     fontSize: 30,
    //     //     fontWeight: 50, // semibold
    //     // },
    //     // subtitle1: {
    //     //     fontSize: 30,
    //     //     fontWeight: 10, // semibold
    //     // },
    //     // body1: {
    //     //     fontSize: 25,
    //     //     fontWeight: 5, // light
    //     // },
    //     // body2: {
    //     //     fontSize: 20,
    //     //     fontWeight: 1, // light
    //     // },
    //     // button: {
    //     //     fontStyle: 'italic',
    //     // },
    // },
    // MuiCircularProgress:{
    //     colorPrimary: {
    //         color: "black"
    //     },

    // },
    overrides: {
        // MuiCircularProgress: {
        //     // colorPrimary: {
        //     // },
        //     root: {
        //         color: "black",
        //         size: 2,
        //         justifySelf: "center",
        //         alignSelf: "center",
        //     },

        // },
        MuiButton: {
            root: {
                margin: "10px",
                padding: "10px"
            }
        }
    },

    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: accent
        } // Indigo is probably a good match with pink
    }
});

// import {cyan500, deepPurple500} from 'material-ui/colors';
// // import getMuiTheme from 'material-ui/styles/getMuiTheme'; 
// import { getMuiTheme } from 'material-ui/styles';

// export default theme = getMuiTheme({
//   palette: {
//     textColor: cyan500
//   },
//   appBar: {
//     height: 50
//   }
// });

// export default theme;