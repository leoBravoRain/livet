import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
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


// const shoppingCart = [
//     {
//         "product": {
//             "category": "Perros",
//             "saleFormats": [
//                 {
//                     "price": "19990",
//                     "stock": "10",
//                     "format": "Pequeño"
//                 },
//                 {
//                     "price": "29999",
//                     "format": "Mediano",
//                     "stock": "23"
//                 }
//             ],
//             "description": "El mejor perrito de la vida",
//             "image": "https://firebasestorage.googleapis.com/v0/b/livet2.appspot.com/o/stores%2Fc5ucsOlH6LbW9My3ZyxkDmjZra82%2FkIkfrV3nRGwAblBYnvgZ%2Fproducts%2FIMG_20190305_153649.jpg?alt=media&token=e9e8f385-0c18-4ef5-b6b7-7594a6c8956c",
//             "name": "Perrito",
//             "visible": true,
//             "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
//             "id": "0Ppnn0iyigN6CKUBulcc"
//         },
//         "formatIndexList": [
//             0
//         ],
//         "unitsList": [
//             1
//         ]
//     },
//     {
//         "product": {
//             "category": "Perros",
//             "saleFormats": [
//                 {
//                     "format": "123",
//                     "stock": "2",
//                     "price": "123123"
//                 },
//                 {
//                     "price": "1231",
//                     "format": "123",
//                     "stock": "12312"
//                 },
//                 {
//                     "stock": "123",
//                     "format": "123",
//                     "price": "123"
//                 }
//             ],
//             "name": "Perritos",
//             "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
//             "visible": true,
//             "image": "https://firebasestorage.googleapis.com/v0/b/livet2.appspot.com/o/stores%2Fc5ucsOlH6LbW9My3ZyxkDmjZra82%2FkIkfrV3nRGwAblBYnvgZ%2Fproducts%2FIMG-20190307-WA0008.jpeg?alt=media&token=a1645d00-1b0d-4d56-b789-05d4a35feaef",
//             "description": "2 perritos",
//             "id": "p9ctFiIP2edBiEiE8atc"
//         },
//         "formatIndexList": [
//             2
//         ],
//         "unitsList": [
//             1
//         ]
//     }
// ];

const sale1 = {
    "date": "20-02-2021",
    "totalSale": 20000,
    "shoppingCart":
    [

        // 1 product
        {
            "product": {
                "category": "Perros",
                "saleFormats": [
                    {
                        "price": "19990",
                        "stock": "10",
                        "format": "Pequeño"
                    },
                    {
                        "price": "29999",
                        "format": "Mediano",
                        "stock": "23"
                    }
                ],
                "description": "El mejor perrito de la vida",
                "image": "https://firebasestorage.googleapis.com/v0/b/livet2.appspot.com/o/stores%2Fc5ucsOlH6LbW9My3ZyxkDmjZra82%2FkIkfrV3nRGwAblBYnvgZ%2Fproducts%2FIMG_20190305_153649.jpg?alt=media&token=e9e8f385-0c18-4ef5-b6b7-7594a6c8956c",
                "name": "Perro 1",
                "visible": true,
                "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
                "id": "0Ppnn0iyigN6CKUBulcc"
            },
            "formatIndexList": [
                0
            ],
            "unitsList": [
                10
            ]
        },

        // 2 product
        {
            "product": {
                "category": "Perros",
                "saleFormats": [
                    {
                        "format": "123",
                        "stock": "2",
                        "price": "123123"
                    },
                    {
                        "price": "1231",
                        "format": "123",
                        "stock": "12312"
                    },
                    {
                        "stock": "123",
                        "format": "123",
                        "price": "123"
                    }
                ],
                "name": "Perro 2",
                "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
                "visible": true,
                "image": "https://firebasestorage.googleapis.com/v0/b/livet2.appspot.com/o/stores%2Fc5ucsOlH6LbW9My3ZyxkDmjZra82%2FkIkfrV3nRGwAblBYnvgZ%2Fproducts%2FIMG-20190307-WA0008.jpeg?alt=media&token=a1645d00-1b0d-4d56-b789-05d4a35feaef",
                "description": "2 perritos",
                "id": "p9ctFiIP2edBiEiE8atc"
            },
            "formatIndexList": [
                2
            ],
            "unitsList": [
                1
            ]
        }
    ]
}

const sale2 = {
    "date": "30-02-2021",
    "totalSale": 19000,
    "shoppingCart":
    [
        {
            "product": {
                "category": "Perros",
                "saleFormats": [
                    {
                        "price": "19990",
                        "stock": "10",
                        "format": "Pequeño"
                    },
                    {
                        "price": "29999",
                        "format": "Mediano",
                        "stock": "23"
                    }
                ],
                "description": "El mejor perrito de la vida",
                "image": "https://firebasestorage.googleapis.com/v0/b/livet2.appspot.com/o/stores%2Fc5ucsOlH6LbW9My3ZyxkDmjZra82%2FkIkfrV3nRGwAblBYnvgZ%2Fproducts%2FIMG_20190305_153649.jpg?alt=media&token=e9e8f385-0c18-4ef5-b6b7-7594a6c8956c",
                "name": "Gato 1",
                "visible": true,
                "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
                "id": "0Ppnn0iyigN6CKUBulcc"
            },
            "formatIndexList": [
                0
            ],
            "unitsList": [
                1
            ]
        },
    ]
}

const sales = [
    sale1,
    sale2,
];

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
            totalSalesStore: 0,
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
                // const sales = [
                //     {
                //         "date": "10-07-2021",
                //         "productName": "Product demo 1",
                //         "units": 1,
                //         "priceUnit": 1000,
                //         "totalSale": 1000,
                //     },
                //     {
                //         "date": "11-07-2021",
                //         "productName": "Product demo 2",
                //         "units": 2,
                //         "priceUnit": 6000,
                //         "totalSale": 12000,
                //     }
                // ];
                var totalSalesStore = 0.0;
                sales.forEach(sale => {
                    totalSalesStore += sale.totalSale;
                });

                // const sales = shoppingCart;

                // var totalSales = 0.0;

                // // if there is any product
                // if (sales != null && sales.length > 0) {

                //     // console.log(sales);

                //     // get total sale
                //     sales.forEach(product => {
                //         // console.log(product);
                //         // iterate through formats
                //         product.formatIndexList.forEach((formatIndex, index) => {
                //             // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                //             totalSales += parseInt(product.unitsList[index]) * parseFloat(product.product.saleFormats[formatIndex].price);
                //         });
                //     });

                //     // console.log(totalSales);

                // }

                // // no products on cart
                // else {
                //     // alert("no products on cart");
                //     sales = [];
                //     totalSales = 0;
                // };


                // update state
                this.setState({

                    // update products
                    // products: products,
                    sales: sales,
                    totalSalesStore: totalSalesStore,
                    // totalSales: totalSales,
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
                    // alignItems: "center",
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
                        alignItems: "center",
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

                    {/* option buttons */}
                    <Container
                        style = {{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >

                        {/* add new sale manually */}
                        <Button
                            // variant = "outlined"
                            align="center" 
                            // variant="contained" 
                            color="primary"
                            // width = "10%"
                            onClick={() => {
                                // alert("go to add new sale");
                                // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                                // localStorage.setItem('store_id', this.props.match.params.store_id);
                                
                                // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                                // this.props.history.push("/addNewSaleManually/" + this.props.match.params.store_id);
                                alert("Esta opción estará disponible en el plan pagado de Livet");
                            }}
                            >
                            {/* <Add /> */}
                            Agregar venta manual
                        </Button>

                        {/* download as csv */}
                        <Button
                            // variant = "outlined"
                            align="center"
                            // variant="contained" 
                            color="primary"
                            // width = "10%"
                            onClick={() => {
                                // alert("go to add new sale");
                                // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                                // localStorage.setItem('store_id', this.props.match.params.store_id);
                                
                                // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                                // this.props.history.push("/addNewSaleManually/" + this.props.match.params.store_id);
                                alert("Esta opción estará disponible en el plan pagado de Livet");
                            }}
                            >
                            {/* <Add /> */}
                            Descargar como archivo Excel
                        </Button>

                    </Container>

                    {/* general infroamtion */}
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
                        Estas son ventas ficticias para que sepas como se verían las ventas que generas por nuestra plataforma
                    </Typography> */}

                    {/* list of sales */}
                    {/* <TableContainer>
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
                                    </TableCell>
                                    <TableCell align="right" style = {{fontWeight: "bold"}}>Total</TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="right"> </TableCell>
                                    <TableCell align="right" style={{ fontWeight: "bold" }}>{this.state.totalSales}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer> */}
                    {
                        this.state.sales != null

                            &&

                            this.state.sales.length > 0

                            ?


                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">Número de pedido</TableCell>
                                            <TableCell align="right">Fecha</TableCell>
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
                                            // this.state.sales.map((product, idxProduct) => (

                                            // this.state.sales.map((sale, idxSale) => {
                                            this.state.sales.map((sale, idxSale) => (

                                                        sale.shoppingCart.map((product, idxProduct) => (

                                                            // console.log(product);

                                                            product.formatIndexList.map((formatIndex, idxFormat) => {
                                                                
                                                                // console.log(formatIndex);

                                                                // console.log(product.product.name);

                                                                return (
                                                                    <TableRow>
                                                                        <TableCell align="right">{idxProduct != 0 ? "" : idxSale + 1}</TableCell>
                                                                        <TableCell align="right">{idxProduct != 0 ? "" : sale.date}</TableCell>
                                                                        <TableCell align="right">{product.product.name}</TableCell>
                                                                        <TableCell align="right">{product.product.saleFormats[formatIndex].format}</TableCell>
                                                                        <TableCell align="right">{product.unitsList[idxFormat]}</TableCell>
                                                                        <TableCell align="right">{product.product.saleFormats[formatIndex].price}</TableCell>
                                                                        <TableCell align="right">{product.unitsList[idxFormat] * product.product.saleFormats[formatIndex].price}</TableCell>

                                                                    </TableRow>
                                                                )

                                                            })

                                                        ))
                                                        
                                                        // }

                                                    // </TableRow>

                                                // )
                                            // })
                                            ))

                                        }

                                        <TableRow style={{ fontWeight: "bold" }} >
                                            <TableCell align="right"> </TableCell>
                                            <TableCell align="right"> </TableCell>
                                            <TableCell align="right"> </TableCell>
                                            <TableCell align="right"> </TableCell>
                                            <TableCell align="right"> </TableCell>
                                            <TableCell align="right" style={{ fontWeight: "bold", fontSize: "25px" }}> Total </TableCell>
                                            <TableCell align="right" style={{ fontWeight: "bold" }}>{this.state.totalSalesStore}</TableCell>
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
                                style={{
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

            </Container>
        );

    }

}

export default Sales;