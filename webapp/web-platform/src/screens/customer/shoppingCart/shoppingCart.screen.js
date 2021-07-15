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
// import Grid from '@material-ui/core/Grid';

// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// // import Modal from '@material-ui/core/Modal';
// // import PlayArrow from '@material-ui/icons/PlayArrow';
import Delete from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import StoreInformation from "../generalComponents/storeInformation/storeInformation.component";
import FooterStore from "../generalComponents/footerStore/footerStore.component";

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// import MenuBar from "../../generalComponents/menuBar.component";

// firebase
import {
    // auth,
    fs,
} from "../../../libraries/firebase/firebase";


class ShoppingCart extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
            products: [],
            totalSales: 0,
            store: null,

            // products on shopping cart
            productsOnCart: 0,

        }
        this.removeItemFromCart = this.removeItemFromCart.bind(this);

    }

    componentDidMount() {

        // console.log("load product to sell component");

        this.setState({
            loading: true,
        });


        // get store data
        fs.collection("stores").doc(this.props.match.params.store_id).get()
            .then(doc => {
                // if store exists
                if (doc.exists) {

                    // get store data
                    var store = doc.data();

                    // get shopping cart products
                    var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));
                    
                    var productsOnCart = 0;

                    var totalSales = 0.0;

                    // if there is any product
                    if (productsArrayCart != null && productsArrayCart.length > 0) {
                        
                        // console.log(productsArrayCart);

                        // get total sale
                        productsArrayCart.forEach(product => {

                            // update products on cart
                            // format list leght is the number of products
                            productsOnCart += product.formatIndexList.length

                            // console.log(product);
                            // iterate through formats
                            product.formatIndexList.forEach((formatIndex, index) => {
                                // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                                totalSales += parseInt(product.unitsList[index]) * parseFloat(product.product.saleFormats[formatIndex].price);
                            });
                        });

                        // console.log(totalSales);
                        
                        // // get if there is products on shopping cart
                        // var productsOnCart = 0;
                        // productsArrayCart.forEach(prod => {
                        //     productsOnCart += prod.formatIndexList.length
                        // });
                        
                    }

                    // no products on cart
                    else{
                        // alert("no products on cart");
                        productsArrayCart = [];
                        totalSales = 0;
                    };




                    // update
                    this.setState({
                        sales: productsArrayCart,
                        loading:false,
                        totalSales: totalSales,
                        store: store,

                        // products on shopping cart
                        productsOnCart: productsOnCart,

                    }, 
                        // () => console.log(this.state.sales)
                    );
                }

            });


    }

    // remove from cart
    // removeItemFromCart(idx) {
    removeItemFromCart(idxProduct, formatIndex, idxFormat) {
        
        this.setState({
            loading: true,
        });

        
        // get shopping cart products
        var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));
        
        // console.log(productsArrayCart);

        // remove item
        // if there is any product
        if (productsArrayCart != null & productsArrayCart.length > 0) {

            // check if there is no format
            if (productsArrayCart[idxProduct]["formatIndexList"].length == 1) {

                // remove product from cart
                productsArrayCart.splice(idxProduct, 1);

            }

            else {
                
                // remove format from list
                productsArrayCart[idxProduct]["formatIndexList"].splice(idxFormat, 1);
    
                // remove units from list
                productsArrayCart[idxProduct]["unitsList"].splice(idxFormat, 1);

            }

            // remove item
            // productsArrayCart.splice(idx, 1);

            // get new total sale
            var totalSales = 0.0;
            productsArrayCart.forEach(product => {
                // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                product.formatIndexList.forEach((formatIndex, index) => {
                    // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                    totalSales += parseInt(product.unitsList[index]) * parseFloat(product.product.saleFormats[formatIndex].price);
                });
            });

            // update state
            this.setState({
                sales: productsArrayCart,
                loading: false,
                totalSales: totalSales,
            });

            // update in local storage
            localStorage.setItem('productsArrayCart', JSON.stringify(productsArrayCart));

        }


    }
    
    render() {

        return (

            !this.state.loading

                ?

                <Container
                    // container
                    // spacing={3}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        // backgroundColor: "red",
                        justifyContent: "center",
                    }}
                >


                    {/* store information */}
                    <StoreInformation
                        profilePhoto={this.state.store.profilePhoto}
                        name={this.state.store.name}
                        description={this.state.store.description}
                        goToHome={() => {
                            // alert("Go to home")
                            this.props.history.push('/store/' + this.props.match.params.store_id);
                        }}
                        goToInstagram={() => {
                            // alert("Go to home")
                            window.open(this.state.store.instagramUrl);
                        }}
                        goToShoppingCart={() => {
                            // alert("go to cart");
                            this.props.history.push('/shoppingCart/' + this.props.match.params.store_id);
                        }}
                        productsOnCart={this.state.productsOnCart}

                    />



                    {/* products list */}
                    <Container
                        style={{
                            justifyContent: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >

                        {/* title */}
                        <Typography align="center" variant="h4" component="h4" gutterBottom>
                            Tu carrito de compras
                        </Typography>

                        {/* list of products */}
                        {
                            this.state.sales != null

                            &&

                            this.state.sales.length > 0

                            ?


                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Producto</TableCell>
                                                <TableCell align="right">Formato</TableCell>
                                                <TableCell align="right">Cantidad</TableCell>
                                                <TableCell align="right">Precio</TableCell>
                                                <TableCell align="right">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                        {
                                            // this is because product is an array with each element being [product object, array of format index, array of units]
                                            this.state.sales.map((product, idxProduct) => (

                                                product.formatIndexList.map((formatIndex, idxFormat) => {

                                                    return(
                                                        <TableRow>
                                                            <TableCell align="right">{product.product.name}</TableCell>
                                                            <TableCell align="right">{product.product.saleFormats[formatIndex].format}</TableCell>
                                                            <TableCell align="right">{product.unitsList[idxFormat]}</TableCell>
                                                            <TableCell align="right">{parseInt(product.product.saleFormats[formatIndex].price).toLocaleString("nl-NL")}</TableCell>
                                                            <TableCell align="right">{parseInt(product.unitsList[idxFormat] * product.product.saleFormats[formatIndex].price).toLocaleString("nl-NL")}</TableCell>

                                                            {/* remove from cart */}
                                                            <TableCell align="right">
                                                                <Button
                                                                    onClick={() => this.removeItemFromCart(idxProduct, formatIndex, idxFormat)}
                                                                >

                                                                    <Delete />
                                                                    {/* Eliminar */}
                                                                </Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    );
                                                })
                                            ))

                                        }

                                            <TableRow style={{ fontWeight: "bold" }} >
                                                <TableCell align="right"> </TableCell>
                                                <TableCell align="right"> </TableCell>
                                                <TableCell align="right"> </TableCell>
                                                <TableCell align="right" style={{ fontWeight: "bold", fontSize: "25px" }}> Total </TableCell>
                                                <TableCell align="right" style={{ fontWeight: "bold" }}>{parseInt(this.state.totalSales).toLocaleString("nl-NL")}</TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            :

                                <Typography 
                                    align="center" 
                                    variant="body1" 
                                    component="p" 
                                    gutterBottom
                                    style = {{
                                        // backgroundColor: "red",
                                        borderRadius: 10,
                                        margin: 20,
                                        fontSize: 20,
                                    }}
                                >
                                    Aun no has agregado nada al carrito
                                </Typography>
                        }

                    </Container>

                    {/* button to go to buy */}
                    <Container
                        style = {{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >

                        <Button
                            align="center"
                            variant="contained"
                            color="primary"
                            // size = "small"
                            disabled = {!this.state.sales.length>0}
                            onClick={() => {
                                this.props.history.push('/saleConfirmation/' + this.props.match.params.store_id);
                                // alert("go to pay");
                            }}
                            >
                            Confirmar compra
                        </Button>
                    </Container>

                    
                    {/* footer */}
                    <FooterStore
                        goToInstagram={() => {
                            // alert("Go to home")
                            window.open(this.state.store.instagramUrl);
                        }}

                        // display whatsapp
                        displayToWhatsapp={this.state.store.whatsappNumber != null}
                        goToWhatsapp={() => {
                            window.open("https://wa.me/" + this.state.store.whatsappNumber);
                        }}

                        // display facebook
                        displayToFacebook={this.state.store.facebookUrl != null}
                        goToFacebook={() => {
                            window.open(this.state.store.facebookUrl);
                        }}
                    />

                </Container>

            :

                <CircularProgress />


        );

    }

}

export default ShoppingCart;