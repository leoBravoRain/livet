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
import WhatsApp from "@material-ui/icons/WhatsApp";
import Facebook from "@material-ui/icons/Facebook";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
                    marginTop: 100,
                }}
            >


                {/* title */}
                <Typography
                    align="center" 
                    variant="body2"
                    component="p"
                    gutterBottom
                >
                    {/* Si quires saber mas de nuestra tienda, visita nuestras redes sociales */}
                    Sigueme en mis redes sociales
                </Typography>


                {/* social network links */}
                <Container
                    style = {{
                        display:"flex",
                        flexDirection: "center",
                        // backgroundColor: "red",
                        justifyContent: "center",
                    }}
                >

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

                    {/* go to whatsapp */}
                    {

                        this.props.displayToWhatsapp &&
                        
                        <Button
                        // align="center"
                        size="small"
                        color="primary"
                        // variant="contained"
                        onClick={this.props.goToWhatsapp}
                        >
                            <WhatsApp
                                color="primary"
                                />
                        </Button>
                    }

                    {/* go to facebook */}
                    {

                        this.props.displayToFacebook &&

                        <Button
                            // align="center"
                            size="small"
                            color="primary"
                            // variant="contained"
                            onClick={this.props.goToFacebook}
                        >
                            <Facebook
                                color="primary"
                            />
                        </Button>

                    }

                </Container>

                {/* livet */}
                {/* <Typography
                    align="center"
                    variant="body2"
                    component="p"
                    gutterBottom
                    >
                    Esta página fue creada usando Livet
                </Typography> */}

                <Divider
                    // light = {false}
                    variant="middle"
                    style={{
                        marginTop: 50,
                        // marginBottom: 20,
                        // color: "red"
                        // backgroundColor: "red",
                    }}
                />

                {/* go to Livet */}
                <Button
                    // align="center"
                    size="small"
                    color="primary"
                    // variant="outlined"
                    style = {{
                        // marginBottom: 30,
                    }}
                    onClick={() => {
                        window.open("https://www.livetnow.com/");
                    }}
                >

                    Crea tu tienda aquí

                </Button>


            </Container>
        );

    }

}

export default FooterStore;