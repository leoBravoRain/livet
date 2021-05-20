import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
// import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Modal from '@material-ui/core/Modal';
import PlayArrow from '@material-ui/icons/PlayArrow';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Search from '@material-ui/icons/Search';
// import Select from '@material-ui/core/Select';

import StoreInformation from "../generalComponents/storeInformation/storeInformation.component";
import FooterStore from "../generalComponents/footerStore/footerStore.component";

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

            !this.state.loading

                ?

                // data to display

                <Container 
                    // style = {{
                    //     margin: 10,
                    // }}
                >




                    {/* store information */}
                    <StoreInformation
                        profilePhoto={this.state.store.profilePhoto}
                        name={this.state.store.name}
                        description={this.state.store.description}
                        goToHome={() => {
                            // alert("Go to home")
                            this.props.history.push('/' + this.props.match.params.store_id);
                        }}
                        goToInstagram={() => {
                            // alert("Go to home")
                            window.open(this.state.store.instagramUrl);
                        }}
                    />





                    {/* catalog of products */}
                    <Container>

                            {/* title */}
                            <Typography 
                                gutterBottom 
                                variant="h2" 
                                component="h2"
                                style = {{
                                    // marginTop: 20,
                                    fontSize: 30,
                                    marginBottom: 30,
                                }}
                            >
                                Mira nuestros productos
                            </Typography>

                        {/* list of products */}
                            <Grid
                                container
                                spacing = {3}
                                style={{
                                    // padding: 20,
                                    // margin: 5,
                                    // alignContent: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    // flexDirection: "column",
                                    // backgroundColor: "green",
                                }}

                                // elevation={3}
                            >
                            {/* each post */}
                            {
                                this.state.products.map((product) => {

                                    return (

                                        // each product structure
                                        <Grid
                                            item
                                            xs = {12}
                                            md = {4}
                                            // style = {{
                                            //     elevation: 0,
                                            // }}
                                        >

                                            <Card
                                                // style={{
                                                //     backgroundColor: "red",
                                                //     // borderRadius: 10,
                                                // }}
                                            >
                                                <CardActionArea
                                                >
                                                    <CardMedia
                                                        image={product.image}
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="200"

                                                    // title={workshop.name}
                                                    />

                                                    {/* contentn */}
                                                    <CardContent>

                                                        {/* product name */}
                                                        <Typography gutterBottom variant="h6" component="h6">
                                                            {product.name}
                                                        </Typography>

                                                        {/* description */}
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {product.description}
                                                        </Typography>

                                                        <Container
                                                            style = {{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "center",
                                                                // alignContent: "center"
                                                            }}
                                                        >

                                                            {/* size */}
                                                            <Container
                                                                style={{
                                                                    display: "flex",
                                                                    flex: 1,
                                                                    flexDirection: "row",
                                                                    // backgroundColor: "red",
                                                                    textAlign: "center",
                                                                    justifyContent: "center",
                                                                    alignContent: "center",
                                                                }}
                                                            >

                                                                <Search fontSize="small" />

                                                                <Typography 
                                                                    // style = {{flex:1}}
                                                                    gutterBottom 
                                                                    variant="subtitle2" 
                                                                    component="p"
                                                                    align="center" 
                                                                >
                                                                    {product.var1}
                                                                </Typography>

                                                            </Container>

                                                            {/* price */}
                                                            <Container
                                                                style={{
                                                                    display: "flex",
                                                                    flex: 1,
                                                                    flexDirection: "row",
                                                                    // backgroundColor: "red",
                                                                    textAlign: "center",
                                                                    justifyContent: "center",
                                                                    alignContent: "center",
                                                                }}
                                                            >

                                                                <AttachMoney fontSize="small" />

                                                                <Typography
                                                                    align="center" 
                                                                    gutterBottom
                                                                    variant="subtitle2"
                                                                    component="p"
                                                                >
                                                                    {product.price}
                                                                </Typography>
                                                            </Container>

                                                        </Container>

                                                    </CardContent>

                                                </CardActionArea>


                                                <CardActions
                                                    style = {{
                                                        // display: "flex",
                                                        justifyContent: "center",
                                                        // backgroundColor: "red",
                                                    }}
                                                >

                                                    <Button 
                                                        align="center" 
                                                        size="small" 
                                                        color="primary"
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

                                                        Ver detalles

                                                    </Button>

                                                </CardActions>

                                            </Card>

                                        </Grid>

                                    );
                                })
                            }

                        </Grid>

                    </Container>

                    {/* footer */}
                    <FooterStore 
                        goToInstagram={() => {
                            // alert("Go to home")
                            window.open(this.state.store.instagramUrl);
                        }}
                    />

                </Container>

                :

                // loading data
                <CircularProgress />

        );

    }

}

export default ProductsCatalog;