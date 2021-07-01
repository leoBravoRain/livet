import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// // import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import ShoppingCart from "@material-ui/icons/ShoppingCart";

class StoreInformation extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

    }


    render() {

        return (

            <Container
                // style = {{
                //     backgroundColor: "yellow",
                // }}
            >

                <Grid
                    container
                    style={{
                        // margin: 20,
                        marginTop: 40,
                        // backgroundColor: "red",
                    }}
                    >

                    {/* profile photo */}
                    {/* title */}
                    <Grid
                        item
                        xs={12}
                        md={4}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            // alignContent: "center",
                            // backgroundColor: "red",
                            flexDirection: "row",
                        }}
                        >

                        {/* profile photo */}
                        <img
                            src={this.props.profilePhoto}
                            width="100px"
                            height="100px"
                        />

                        {/* title */}
                        <Container
                            style={{
                                // backgroundColor: "green",
                                // this is to justify hor and ver
                                justifyContent: "center",
                                textAlign: "left",
                                display: "flex",
                                flexDirection:"column",
                                // finish here: this is to justify hor and ver
                            }}
                        >

                            <Typography
                                // align="center" 
                                variant="h4"
                                component="h4"
                                gutterBottom
                                // style = {{
                                //     backgroundColor: "green",
                                // }}
                                
                                >
                                {this.props.name}
                            </Typography>
                        </Container>

                    </Grid>


                    {/* store description */}
                    {/* <Grid
                        item
                        xs={12}
                        md={4}
                        style={{
                            // backgroundColor: "yellow",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "left",
                        }}
                        > */}

                        {/* title */}
                        {/* <Typography 
                            // align="center" 
                            variant="h4" 
                            component="h4" 
                            gutterBottom
                        >
                            {this.props.name}
                        </Typography> */}

                        {/* description */}
                        {/* <Typography
                            display="inline"
                            // inline
                            // style={{ display: 'inline-block' }} 
                            // align="center"
                            variant="body2"
                            component="p"
                            gutterBottom
                            >
                            {this.props.description}
                        </Typography> */}

                    {/* </Grid> */}


                    {/* buttons */}
                    <Grid
                        item
                        xs={12}
                        md={4}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            // alignContent: "center",
                            // backgroundColor: "red",
                        }}
                        >

                        {/* go to home */}
                        <Button
                            // align="center"
                            size="small"
                            color="black"
                            // variant="contained"
                            onClick={this.props.goToHome}
                            >

                            Inicio

                        </Button>

                        {/* go to IG */}
                        {/* <Button
                            // align="center"
                            size="small"
                            color="primary"
                            // variant="contained"
                            onClick={this.props.goToInstagram}
                            >

                            Ir a mi Instagram

                        </Button> */}

                        {/* go to IG */}
                        {/* <Button
                            // align="center"
                            size="small"
                            color="primary"
                            // variant="contained"
                            onClick={this.props.goToShoppingCart}
                        >

                            Ir a carrito

                        </Button> */}

                    </Grid>

                    <Grid 
                        item
                        xs={12}
                        md={4}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            // alignContent: "center",
                            // backgroundColor: "red",
                        }}
                    >

                        <Button
                            // align="center"
                            size="small"
                            color="primary"
                            // variant="contained"
                            onClick={this.props.goToShoppingCart}
                        >

                            {/* Ir a carrito */}
                            <ShoppingCart/>                            

                        </Button>

                    </Grid>

                </Grid>

                <Divider
                    // light = {false}
                    variant="middle"
                    style={{
                        margin: 20,
                        marginBottom: 30,
                        // color: "red"
                        // backgroundColor: "red",
                    }}
                />

            </Container>
        );

    }

}

export default StoreInformation;