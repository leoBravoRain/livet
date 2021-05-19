import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

// firebase
// import { auth } from "../../../libraries/firebase/firebase";

class MenuBar extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

    }

    render() {

        return (

            <Container
                // container
                // spacing={3}
                style = {{
                    display: "flex",
                    justifyContent: "center",
                    // backgroundColor: "green",
                    marginTop:10,
                    marginBottom: 10,
                }}
            >

                {/* choose store */}
                <Button align="center" variant="contained" color="primary"
                    onClick={this.props.goToChooseStore}
                >
                    Escoger tienda
                </Button>

                {/* social network posts */}
                <Button align="center" variant="contained" color="primary"
                    onClick={this.props.goToSocialNetworkPosts}
                >
                    Posteos de IG
                </Button>


                {/* products to sell */}
                <Button align="center" variant="contained" color="primary"
                    onClick={this.props.goToProductsToSell}
                >
                    Productos en la tienda
                </Button>

                {/* go to store */}
                <Button align="center" variant="contained" color="primary"
                    onClick={this.props.goToStore}
                >
                    Ir a la tienda
                </Button>


            </Container>
        );

    }

}

export default MenuBar;