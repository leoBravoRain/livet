import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
// import Add from "@material-ui/icons/Add";
// import Close from "@material-ui/icons/Close";
// import Storefront from "@material-ui/icons/Storefront";
// import Search from "@material-ui/icons/Search";
// import Loyalty from "@material-ui/icons/Loyalty";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";

// firebase
// import { auth } from "../../../libraries/firebase/firebase";

class SaleForm extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

    }

    render() {

        return (

            <Container
                // container
                // Grid
                // spacing={3}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    // backgroundColor: "green",
                    // // marginTop:10,
                    // // marginBottom: 10,
                }}
            >


                {/* informatino to fill */}
                <FormControl
                // style={{
                //     width: "50%",
                //     alignSelf: "center",
                // }}
                >

                    {/* title */}
                    {/* <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Agregar información
                            </Typography> */}

                    {/* product name */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Fecha de venta"
                        // type="Nombre producto"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ productName: e.target.value })}
                        // onChange={this.props.changeSaleDate}
                        // // value={this.state.productName}
                        // value={this.props.sale}
                    />

                    {/* product description */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Producto"
                        // type="Descripción"
                        // multiline
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ productDescription: e.target.value })}
                        // onChange={this.props.changeProductDescription}

                        // value={this.props.productDescription}
                    />

                    {/* product var 1 */}
                    {/* This can be different for each store (maybe the best is to create a "choose a variable first") */}
                    {/* <TextField
                                // id="standard-uncontrolled"
                                label="Tamaño del producto"
                                // type="Tamaño"
                                // defaultValue="Correo electrónico"
                                margin="normal"
                                onChange={(e) => this.setState({ productVar1: e.target.value })}
                                value={this.state.productVar1}
                            /> */}

                    {/* product price */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Cantidad de producto"
                        type="number"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ productPrice: e.target.value })}
                        // onChange={this.props.changeProductPrice}

                        // // value={this.state.productDescription}
                        // value={this.props.productPrice}
                    // value={this.state.productPrice}

                    />

                    {/* stock */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Precio producto"
                        // multiline
                        type="number"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={this.props.changeProductStock}
                        // value={this.props.productStock}
                    />

                    {/* stock */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Total venta"
                        // multiline
                        type="number"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                    // onChange={this.props.changeProductStock}
                    // value={this.props.productStock}
                    />


                    {/* convert to post button */}
                    <Button
                        align="center"
                        variant="contained"
                        color="primary"
                        onClick={this.props.addSaleManually}

                    >
                        {/* Crear producto */}
                        {/* {this.props.buttonText} */}
                        Agregar venta manual
                    </Button>

                </FormControl>

            </Container>
        );

    }

}

export default SaleForm;