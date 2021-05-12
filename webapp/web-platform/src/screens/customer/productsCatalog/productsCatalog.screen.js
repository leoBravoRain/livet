import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Modal from '@material-ui/core/Modal';
import PlayArrow from '@material-ui/icons/PlayArrow';
// import Schedule from '@material-ui/icons/Schedule';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// firebase
import { fs } from "../../../libraries/firebase/firebase";

// // store information prototype
// const store = {
//     "name":"Cami cooks",
//     "instagramUrl": "https://www.instagram.com/camicooks_/",
//     "profilePhoto": "https://instagram.fpuq3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/97950066_1170349686638961_3025539464844804096_n.jpg?tp=1&_nc_ht=instagram.fpuq3-1.fna.fbcdn.net&_nc_ohc=gWikcq9ctcIAX8OQDqp&edm=ABfd0MgBAAAA&ccb=7-4&oh=b94a4bc8d14313227db5ff3db3795d06&oe=60BDCE66&_nc_sid=7bff83",
// }

// // prototype post
// const products = [

//     {
//         "name": "Panqueques de queso crema",
//         "description": "Panqueques hechos con masa integral",
//         "var1": "10 unidades",
//         "price": 4500,
//         "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
//         "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar."
//     },

//     {
//         "name": "Torta de manjar",
//         "productDescription": "Torta hecha con masa integral",
//         "var1": "18 cm",
//         "price": 9500,
//         "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
//         "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar."
//     },
// ];


class ProductsCatalog extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
            products: [],
            store: null,
        }

    }

    componentDidMount() {

        this.setState({
            loading: true,
        });

        // get store data
        fs.collection("stores").doc(this.props.match.params.store_id).get()
        .then(doc => {

            // if store exists
            if(doc.exists) {
                
                // get store data
                var store = doc.data();
                store["id"] = doc.id;
                // console.log(store);

                // get store products
                fs.collection("stores").doc(this.props.match.params.store_id).collection("products").get()
                    .then(snapshotquery => {

                        // // get data from API
                        var products = [];

                        // iterate over each item
                        snapshotquery.forEach(doc => {

                            // console.log(doc.data());
                            let product = doc.data();
                            product["id"] = doc.id;
                            products.push(product);

                        });

                        // update state
                        this.setState({

                            // update products
                            products: products,
                            store: store,
                            loading: false,

                        });
                    });
            }
        })

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

                        <Grid 
                            item 
                            xs={12} 
                            sm={12}
                        // style={{ backgroundColor: "yellow" }}
                        >

                            {/* store information */}
                            <Container>

                                {/* profile photo */}
                                <img
                                    src={this.state.store.profilePhoto}
                                    width="100px"
                                    height="100px"
                                />  

                                {/* title */}
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    {this.state.store.name}
                                </Typography>

                                {/* IG link */}
                                <Typography align="center" variant="h6" component="h6" gutterBottom>
                                    <a href={this.state.store.instagramUrl}> Instagram </a>
                                </Typography>

                            </Container>

                            {/* list of products */}
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

                                
                                {/* each post */}
                                {
                                    this.state.products.map((product) => {

                                        return (

                                            // each product structure
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        image={product.image}
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="300"

                                                    // title={workshop.name}
                                                    />

                                                    {/* contentn */}
                                                    <CardContent>

                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {product.name}
                                                        </Typography>

                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {product.description}
                                                        </Typography>

                                                    </CardContent>

                                                </CardActionArea>


                                                <CardActions>

                                                    <Button size="small" color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                            // this.setState({
                                                            //     toBuyModal: true,
                                                            // });

                                                            // alert("See details")
                                                            this.props.history.push('/productDetails/' + this.state.store.id + "/" + product.id);
                                                        }}
                                                    >

                                                        <PlayArrow /> Ver detalles

                                                    </Button>

                                                </CardActions>

                                            </Card>

                                        );
                                    })
                                }

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

export default ProductsCatalog;