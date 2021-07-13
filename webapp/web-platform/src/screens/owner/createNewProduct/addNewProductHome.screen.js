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

import MenuBar from "../generalComponents/menuBar.component";

// firebase
import {
    auth,
    fs,
} from "../../../libraries/firebase/firebase";



class AddNewProductHome extends React.Component {

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

        console.log("load add new product home component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                this.setState({
                    loading: false,
                });

                // redirect
                // this.props.history.push('/productsToSell');

                // get products from store
                // fs.collection("stores").where("ownerId", "==", user.uid)
                //     .get()
                //     .then(snapshotquery => {

                //         // get data from API
                //         var stores = [];

                //         // iterate over each item
                //         snapshotquery.forEach(doc => {

                //             // console.log(doc.data());
                //             let store = doc.data();
                //             store["id"] = doc.id;
                //             stores.push(store);

                //         });

                //         // update state
                //         this.setState({

                //             // update stores
                //             stores: stores,
                //             loading: false,

                //         });

                //     })

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
                        alignItems: "center",
                    }}
                >

                    {/* menu */}
                    <MenuBar
                        goToSocialNetworkPosts={() => {
                            // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                            localStorage.setItem('store_id', this.props.match.params.store_id);

                            // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                            // this.props.history.push("/loginSocialNetworks/");
                            this.props.history.push("/addNewProductHome/" + this.props.match.params.store_id);

                        }}

                        goToProductsToSell={() => {
                            this.props.history.push("/productsToSell/" + this.props.match.params.store_id);
                        }}

                        goToChooseStore={() => {
                            this.props.history.push("/chooseStore");
                        }}

                        goToStore={() => {
                            // open store
                            window.open(window.location.origin + "/" + this.props.match.params.store_id);
                        }}

                        logout={() => {

                            // logout
                            auth.signOut().then(res => {

                                alert("Has cerrado tu sesión");

                            }).catch(error => {

                                console.log(error);

                            });

                        }}

                        goToSales={() => {
                            this.props.history.push("/sales/" + this.props.match.params.store_id);
                        }}

                        openNavMenu={this.state.openNavMenu}
                        onCloseNavMenu={() => this.setState({ openNavMenu: false })}
                        onClickOpenNavMenu={() => { this.setState({ openNavMenu: true }) }}
                    />
                    
                    {/* title */}
                    <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Agregar nuevo producto
                    </Typography>

                    {/* add from IG */}
                    <Button
                        align="center"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // console.log('/productsToSell/' + store.id)
                            // this.props.history.push('/productsToSell/' + store.id)
                            // alert("go to add new product from IG");
                            this.props.history.push("/loginSocialNetworks/");
                            // this.props.history.push('/createNewStoreForm')
                        }}
                    >
                        <Add />
                        Agregar desde mi Instagram
                    </Button>

                    <Button
                        align="center"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            // console.log('/productsToSell/' + store.id)
                            // this.props.history.push('/productsToSell/' + store.id)
                            // alert("go to add manual product");
                            this.props.history.push('/createNewProduct/' + this.props.match.params.store_id);
                        }}
                    >
                        <Add />
                        Agregar de forma manual
                    </Button>

                </Container>

                :

                <CircularProgress />

        );

    }

}

export default AddNewProductHome;