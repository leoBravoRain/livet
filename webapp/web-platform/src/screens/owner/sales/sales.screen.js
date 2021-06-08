import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
// import { Button } from "@material-ui/core";
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
// import Add from '@material-ui/icons/Add';

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

import MenuBar from "../generalComponents/menuBar.component";

// firebase
import {
    auth,
    fs,
} from "../../../libraries/firebase/firebase";


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


class Sales extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            products: [],
            sales: null,
        }

    }

    componentDidMount() {

        console.log("load product to sell component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // demo sales
                const sales = [
                    {
                        "date": "10-07-2021",
                        "productName": "Product demo 1",
                        "units": 1,
                        "priceUnit": 1000,
                        "totalSale": 1000,
                    },
                    {
                        "date": "11-07-2021",
                        "productName": "Product demo 2",
                        "units": 2,
                        "priceUnit": 6000,
                        "totalSale": 12000,
                    }
                ];


                var totalSales = 0;
                sales.forEach(sale => {
                    totalSales += sale.totalSale;
                });

                // update state
                this.setState({

                    // update products
                    // products: products,
                    sales: sales,
                    totalSales: totalSales,
                    loading: false,

                });

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

                {/* menu */}
                <MenuBar
                    goToSocialNetworkPosts={() => {
                        // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                        localStorage.setItem('store_id', this.props.match.params.store_id);

                        // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                        this.props.history.push("/loginSocialNetworks/");
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
                        Ventas de tu tienda
                    </Typography>

                    {/* infromation */}
                    {/* <Typography
                        gutterBottom
                        variant="body2"
                        component="p"
                        // align = "center"
                        style={{
                            // margin: 50,
                            display: "flex",
                            flexWrap: "wrap",
                            backgroundColor: "rgba(173, 216, 230, 0.5)",
                            borderRadius: 50,
                            textAlign: "center",
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        Estas son las ventas que has tenido en tu tienda
                    </Typography> */}

                    {/* more inforation */}
                    {/* <Typography
                        gutterBottom
                        variant="body2"
                        component="p"
                        style={{
                            // margin: 50,
                            display: "flex",
                            flexWrap: "wrap",
                            backgroundColor: "rgba(173, 216, 230, 0.5)",
                            borderRadius: 50,
                            textAlign: "center",
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        Por el momento, por cada venta que generes, te enviaremos un email con los datos del cliente y del pago.

                        Además te enviaremos una planilla ordenada con todas las ventas generadas hasta el momento por mes
                    </Typography> */}

                    {/* <Typography
                        gutterBottom
                        variant="body2"
                        component="p"
                        // align = "center"
                        style={{
                            // margin: 50,
                            display: "flex",
                            flexWrap: "wrap",
                            backgroundColor: "rgba(173, 216, 230, 0.5)",
                            borderRadius: 50,
                            textAlign: "center",
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        Por cada venta generada, te enviaremos el pago a tu cuenta bancaria registrada en esta plataforma dentro de las próximas 12 horas
                    </Typography> */}   

                    <Typography
                        gutterBottom
                        variant="body2"
                        component="p"
                        // align = "center"
                        style={{
                            // margin: 50,
                            display: "flex",
                            flexWrap: "wrap",
                            backgroundColor: "rgba(173, 216, 230, 0.5)",
                            borderRadius: 50,
                            textAlign: "center",
                            justifyContent: "center",
                            padding: 10,
                        }}
                    >
                        Estas son ventas ficticias para que sepas como se verían las ventas que generas por nuestra plataforma
                    </Typography>

                    {/* list of sales */}
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell align="right">Producto</TableCell>
                                    <TableCell align="right">Cantidad</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.sales != null && 

                                        this.state.sales.map((row) => (
                                            <TableRow key={row.date}>
                                                <TableCell component="th" scope="row">
                                                    {row.date}
                                                </TableCell>
                                                <TableCell align="right">{row.productName}</TableCell>
                                                <TableCell align="right">{row.units}</TableCell>
                                                <TableCell align="right">{row.priceUnit}</TableCell>
                                                <TableCell align="right">{row.totalSale}</TableCell>
                                            </TableRow>
                                        ))
                                }

                                <TableRow style = {{fontWeight: "bold"}} >
                                    <TableCell component="th" scope="row">
                                        {/* {row.date} */}
                                    </TableCell>
                                    <TableCell align="right" style = {{fontWeight: "bold"}}>Total</TableCell>
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

export default Sales;