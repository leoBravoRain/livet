import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

// firebase
import { auth } from "../../../libraries/firebase/firebase";

class Login extends React.Component {

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

                // this.props.history.push('/login/');
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

        // // prototype
        // this.props.history.push('/loginSocialNetworks');

        // console.log(this);
        auth.signInWithEmailAndPassword(email, password)

            .then(res => {

                console.log("user logged!");

                this.setState({
                    loading: false,
                });

                // redirect
                this.props.history.push('/productsToSell');

            })

            .catch((error) => {

                this.setState({
                    loading: false,
                });

                // console.log(error.code);

                alert(error.message);

            });
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

                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Entrar a Livet
                                </Typography>

                                <Typography align="center" variant="body2" component="p" gutterBottom>
                                    Ingresa tu email y contraseña
                                </Typography>


                                <FormControl
                                    style={{
                                        width: "50%",
                                        alignSelf: "center",
                                    }}
                                >

                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Email"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        value={this.state.email}
                                    />

                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Contraseña"
                                        type="password"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                        value={this.state.password}
                                    />

                                    <Button align="center" variant="contained" color="primary" onClick={this.on_submit}>
                                        Entrar
                                    </Button>

                                </FormControl>

                                <Typography align="center" variant="body2" component="p" gutterBottom>
                                    Si no recuerdas tu contraseña, contactate con el administrador
                                </Typography>

                                {/* register area */}
                                <Container
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >

                                    {/* information */}
                                    <Typography align="center" variant="body2" component="p" gutterBottom>
                                        Si aún no estas registrado, inscribete aquí
                                    </Typography>

                                    {/* register button */}
                                    <Button align="center" variant="contained" color="primary"
                                        onClick={() => {
                                            this.props.history.push('/register');
                                            // alert("go to register");
                                        }}
                                    >
                                        Registrarme
                                    </Button>
                                </Container>

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

export default Login;