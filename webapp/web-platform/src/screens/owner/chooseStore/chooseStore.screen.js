import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';
import Add from "@material-ui/icons/Add";
import Send from "@material-ui/icons/Send";

// import Schedule from '@material-ui/icons/Schedule';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// import MenuBar from "../generalComponents/menuBar.component";

// firebase
import {
    auth,
    fs,
} from "../../../libraries/firebase/firebase";



class ChooseStore extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
            stores: [],
        }

    }

    componentDidMount() {

        console.log("load choose store component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // redirect
                // this.props.history.push('/productsToSell');

                // get products from store
                fs.collection("stores").where("ownerId", "==", user.uid)
                    .get()
                    .then(snapshotquery => {

                        // get data from API
                        var stores = [];

                        // iterate over each item
                        snapshotquery.forEach(doc => {

                            // console.log(doc.data());
                            let store = doc.data();
                            store["id"] = doc.id;
                            stores.push(store);

                        });

                        // update state
                        this.setState({

                            // update stores
                            stores: stores,
                            loading: false,

                        });

                    })

            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
            }

            // this.setState({
            //     loading: false,
            // });

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

                        {/* logout */}
                        <Button align="center" variant="contained" color="primary"
                            onClick={() => {
                                // logout
                                auth.signOut().then(res => {

                                    alert("Has cerrado tu sesión");

                                }).catch(error => {

                                    console.log(error);

                                });
                            }}
                        >
                            <Close />
                            Cerrar sesión
                        </Button>

                        {/* title */}
                        <Typography align="center" variant="h3" component="h3" gutterBottom>
                            Tus tiendas creadas
                        </Typography>

                        {/* create new store */}
                        <Button
                            align="center"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // console.log('/productsToSell/' + store.id)
                                // this.props.history.push('/productsToSell/' + store.id)
                                // alert("go to create new store");
                                this.props.history.push('/createNewStoreForm')
                            }}
                        >
                            <Add/>
                            Crear nueva tienda
                        </Button>

                        {/* each store */}
                        {

                            // if user has stores
                            this.state.stores.length > 0 

                            ?

                                // stores list
                                <Container
                                    style = {{
                                        marginTop: 20,
                                    }}
                                >

                                    {
                                        this.state.stores.map((store) => {

                                            return (

                                                <Container
                                                    style = {{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                    }}
                                                >

                                                    {/* store name */}
                                                    <Typography 
                                                        align="center" 
                                                        variant="body2" 
                                                        component="p" 
                                                        gutterBottom 
                                                        // onClick = {() => alert("oaijsd")}
                                                    >
                                                        {store.name}
                                                    </Typography>
                                                    
                                                    {/* go to */}
                                                    <Button 
                                                        align="center" 
                                                        variant="contained" 
                                                        color="primary" 
                                                        onClick={() => {
                                                            // console.log('/productsToSell/' + store.id)
                                                            this.props.history.push('/productsToSell/' + store.id)
                                                            // this.props.history.push('/postsFromSocialNetworks/' + store.id)
                                                        }}
                                                    >
                                                        <Send />
                                                        Ver tienda
                                                    </Button>

                                                    {/* go to */}
                                                    <Button
                                                        align="center"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            // console.log('/productsToSell/' + store.id)
                                                            // alert("go to store");
                                                            this.props.history.push('/editStore/' + store.id, {store: store})
                                                            // this.props.history.push('/postsFromSocialNetworks/' + store.id)
                                                        }}
                                                    >
                                                        <Send />
                                                        Editar tienda
                                                    </Button>

                                                </Container>

                                            );
                                        })

                                    }

                                </Container>

                            :

                                <Typography 
                                    align="center" 
                                    variant="body1" 
                                    component="p" 
                                    gutterBottom 
                                    // onClick={() => alert("oaijsd")}
                                >
                                    No tienes tiendas creadas, ¡Comienza creando una!
                                </Typography>
                        }


                    </Container>

                :

                    <CircularProgress />

        );

    }

}

export default ChooseStore;