import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// // import Modal from '@material-ui/core/Modal';
// // import PlayArrow from '@material-ui/icons/PlayArrow';
import Add from '@material-ui/icons/Add';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// import MenuBar from "../../generalComponents/menuBar.component";

// firebase
// import {
//     auth,
//     fs,
// } from "../../../libraries/firebase/firebase";


class ShoppingCart extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            products: [],
            totalSales: null,
        }
        this.removeItemFromCart = this.removeItemFromCart.bind(this);

    }

    componentDidMount() {

        // console.log("load product to sell component");

        this.setState({
            loading: true,
        });

        // get shopping cart products
        var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));

        // if there is any product
        if (productsArrayCart != null & productsArrayCart.length > 0) {

            // get total sale
            var totalSales = 0.0;
            productsArrayCart.forEach(product => {
                totalSales += parseFloat(product.product.price);
            });

            // update
            this.setState({
                sales: productsArrayCart,
                loading:false,
                totalSales: totalSales,
            });
        };

    }

    // remove from cart
    removeItemFromCart(idx) {
        
        this.setState({
            loading: true,
        });

        
        // get shopping cart products
        var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));
        
        console.log(productsArrayCart);

        // remove item
        // if there is any product
        if (productsArrayCart != null & productsArrayCart.length > 0) {

            // remove item
            productsArrayCart.splice(idx, 1);

            // get new total sale
            var totalSales = 0.0;
            productsArrayCart.forEach(product => {
                totalSales += parseFloat(product.product.price);
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
                        Tu carrito de compra
                    </Typography>

                    {/* list of products */}
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Producto</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.sales != null &&

                                    this.state.sales.map((row, idx) => (
                                        <TableRow>
                                            <TableCell align="right">{row.product.name}</TableCell>
                                            <TableCell align="right">{row.units}</TableCell>
                                            <TableCell align="right">{row.product.price}</TableCell>
                                            <TableCell align="right">{row.units * row.product.price}</TableCell>

                                            {/* remove from cart */}
                                            <TableCell align="right">
                                                <Button
                                                    onClick={() => this.removeItemFromCart(idx)}
                                                >

                                                    Eliminar
                                                </Button>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                }

                                <TableRow style={{ fontWeight: "bold" }} >
                                    <TableCell align="right" style={{ fontWeight: "bold" }}>Total</TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="right" style={{ fontWeight: "bold" }}>{this.state.totalSales}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>


                </Container>

            </Container>
        );

    }

}

export default ShoppingCart;