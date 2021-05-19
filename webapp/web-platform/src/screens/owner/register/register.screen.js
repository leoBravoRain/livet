import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";

// firebase
import { auth } from "../../../libraries/firebase/firebase";

class Register extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            email: "",
            password: "",
            loading: false,
        }

        this.on_submit = this.on_submit.bind(this);

    }

    componentDidMount() {
        console.log("load register component");
    };
    
    // onsubmit form
    on_submit() {

        this.setState({
            loading: true,
        });

        const email = this.state.email.trim();
        const password = this.state.password;

        // console.log(this);
        auth.createUserWithEmailAndPassword(email, password)

            .then(res => {

                // console.log("user logged!");
                alert("Te has registrado exitosamente");

                this.setState({
                    loading: false,
                });

                // go to social network login
                this.props.history.push('/loginSocialNetworks');

            })

            .catch(function (error) {

                // console.log(error);
                alert(error.message);

                this.setState({
                    loading: false,
                });

            });
    }

    render() {

        return (

            !this.state.loading

                ?

                <Container
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >

                    {/* information */}
                    <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Registro en Livet
                    </Typography>

                    <Typography align="center" variant="body2" component="p" gutterBottom>
                        Ingresa tu email  y una contraseña
                    </Typography>


                    {/* formulario para registro */}
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
                            Registrarme
                        </Button>

                    </FormControl>

                </Container>

            :

                <CircularProgress/>

                        
        );

    }

}

export default Register;