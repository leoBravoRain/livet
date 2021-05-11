import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

// firebase
import { auth } from "../../../libraries/firebase/firebase";

class LoginSocialNetworks extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            email: "",
            password: "",
        }

        this.on_submit = this.on_submit.bind(this);

    }

    componentDidMount() {

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // redirect
                this.props.history.push('/productsToSell');

            }

            else {

                // console.log("user no logged");

                this.props.history.push('/login');
            }

            this.setState({
                loading: false,
            });

        });

    }

    // onsubmit form
    on_submit() {

        this.setState({
            loading: true,
        });

        const email = this.state.email.trim();
        const password = this.state.password;

        // console.log(this);
        // auth.signInWithEmailAndPassword(email, password)

        //     .then(res => {

        //         console.log("user logged!");

        //         this.setState({
        //             loading: false,
        //         });

        //         this.props.history.push('/admin');

        //     })

        //     .catch((error) => {

        //         this.setState({
        //             loading: false,
        //         });

        //         console.log(error.code);

        //         alert(error.message);

        // });
    }

    render() {

        return (

            <Grid
                container
                spacing={3}
            >


                {
                    !this.state.loading

                        ?

                        <Grid item xs={12} sm={12}
                        // style={{ backgroundColor: "yellow" }}
                        >
                            <Paper
                                style={{
                                    padding: 20,
                                    margin: 10,
                                    alignContent: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                }}

                                elevation={3}
                            >

                                {/* sync with IG account */}
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Sincronizar con tu tienda de Instagram
                                </Typography>

                                <Typography align="center" variant="body2" component="p" gutterBottom>
                                    Para poder sincronizar tu cuenta de IG con tu propia página web, debes registrarte con la cuenta de IG de tu tienda
                                </Typography>

                                <Button align="center" variant="contained" color="primary"
                                    onClick={() => {
                                        this.props.history.push('/postsFromSocialNetworks');
                                        // alert("go to IG posts page");
                                    }}
                                >

                                    Sincronizar con tienda IG

                                </Button>

                            </Paper>

                        </Grid>

                        :

                        <CircularProgress />

                }
                {/* </Paper> */}
            </Grid>
        );

    }

}

export default LoginSocialNetworks;