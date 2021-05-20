import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// // import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Instagram from '@material-ui/icons/Instagram';
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';
// import Divider from '@material-ui/core/Divider';

class FooterStore extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

    }


    render() {

        return (

            <Container
                style = {{
                    // backgroundColor: "yellow",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginTop: 50,
                }}
            >


                {/* title */}
                <Typography
                    align="center" 
                    variant="body2"
                    component="p"
                    gutterBottom
                >
                    Si quires saber mas de nuestra tienda, visita nuestras redes sociales
                </Typography>


                {/* go to IG */}
                <Button
                    // align="center"
                    size="small"
                    color="primary"
                    // variant="contained"
                    onClick={this.props.goToInstagram}
                >

                    <Instagram 
                        color = "primary"
                    />

                </Button>

                {/* livet */}
                <Typography
                    align="center"
                    variant="body2"
                    component="p"
                    gutterBottom
                >
                    Esta página fue creada usando Livet
                </Typography>

                {/* go to Livet */}
                <Button
                    // align="center"
                    size="small"
                    color="primary"
                    // variant="outlined"
                    onClick={() => {
                        window.open("https://www.livetnow.com/");
                    }}
                >

                    Visitar Livet

                </Button>


            </Container>
        );

    }

}

export default FooterStore;