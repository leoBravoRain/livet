import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

import StoreInformation from "../generalComponents/storeInformation/storeInformation.component";
import FooterStore from "../generalComponents/footerStore/footerStore.component";
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// // import Modal from '@material-ui/core/Modal';
// import PlayArrow from '@material-ui/icons/PlayArrow';
// // import Schedule from '@material-ui/icons/Schedule';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// firebase
import { fs } from "../../../libraries/firebase/firebase";


// // prototype post
// const product = {
//     "name": "Panqueques de queso crema",
//     "description": "Panqueques hechos con masa integral",
//     "var1": "10 unidades",
//     "price": 4500,
//     "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
//     "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar.",
//     "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
    
// };


class SaleConfirmation extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {

            loading: true,

            customerName: null,
            customerEmail: null,
            // customerAddress: null,
            customerRegion: null,
            customerCity: null,
            customerStreet: null,
            customerHouseNumber: null,
            customerPhone: null,

            // demo
            // customerName: "null",
            // customerEmail: "null",
            // // customerAddress: null,
            // customerRegion: "null",
            // customerCity: "null",
            // customerStreet: "null",
            // customerHouseNumber: "null",
            // customerPhone: "null",


            // store
            store: null,

        };

        this.confirm_sale = this.confirm_sale.bind(this);

    }

    componentDidMount() {

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
                    store["id"] = doc.id;
                    // console.log(store);

                    // getting total sales

                    // get cart
                    var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));

                    // list of produts string
                    var totalSales = 0.0;

                    // string with products, formats and units
                    productsArrayCart.forEach((product, idxProd) => {
                        // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                        product.formatIndexList.forEach((formatIndex, index) => {
                            // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                            totalSales += parseInt(product.unitsList[index]) * parseFloat(product.product.saleFormats[formatIndex].price);
                        });
                    });

                    // update state
                    this.setState({

                        // update products
                        store: store,
                        loading: false,

                        // total sales
                        totalSales: totalSales,

                    });
                }
            })

    }

    confirm_sale() {

        this.setState({
            loading: true,
        });


        // THIS CODE IS TO DEMO
        // redirect to payment
        // window.location.href = "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea";

        // alert("go to wsp");

        // // validate if cusomter data is filled
        if (this.state.customerName != null & this.state.customerEmail != null & this.state.customerRegion != null & this.state.customerCity != null & this.state.customerStreet != null & this.state.customerHouseNumber != null) {

            // get cart
            var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));

            // list of produts string
            var listProductsString = "";
            var totalSales = 0.0;

            // string with products, formats and units
            productsArrayCart.forEach((product, idxProd) => {
                // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                product.formatIndexList.forEach((formatIndex, index) => {
                    // totalSales += parseInt(product.units) * parseFloat(product.product.saleFormats[product.formatIndex].price);
                    totalSales += parseInt(product.unitsList[index]) * parseFloat(product.product.saleFormats[formatIndex].price);
                    // console.log(product.product.saleFormats[formatIndex].format + " : " + product.unitsList[index])
                    listProductsString = listProductsString + "\n-- " + product.product.name + " - " + product.product.saleFormats[formatIndex].format + " x " + product.unitsList[index];
                });
            });


            // user data
            const userData = `Mis datos. Nombre: ` + this.state.customerName + `, email: ` + this.state.customerEmail + `, celular: ` + this.state.customerPhone;
            const userAddress = `Mi dirección de envío es: ` + this.state.customerStreet + `, ` + this.state.customerHouseNumber.toString() + `, ` + this.state.customerCity + `, ` + this.state.customerRegion;
            // const userAddress = `Mi dirección de envío es: ` + this.state.customerStreet + `, ` + this.state.customerHouseNumber.toString();


            // go to Wsp
            const message = `!Hola!\n\nQuiero comprar los siguientes productos:\n\n` + listProductsString + `\n\nTotal: $` + totalSales.toString() + `.\n\n` + userData + `.\n\n` + userAddress + `.\n\n` + `¿Cómo debo realizarte el pago?`;
            // const message = userAddress;
            // const message = `!Hola! Quiero comprar los siguientes productos: ` + listProductsString + `. El total de la compra es de $` + totalSales.toString() + `. ` + userData + `. ` + userAddress + `. ¿Cómo debo realizarte el pago?`;

            // alert(message);
            // console.log(message);

            // // go to whatsapp
            // window.open("https://wa.me/" + store.whatsappNumber+ "?text=" + message);
            window.open("https://wa.me/+56937827142/?text=" + encodeURI(message));

            this.setState({
                loading: false,
            });

        }

        else {
            alert("Debes rellenar toda la información antes de continuar");
            this.setState({
                loading: false,
            });

        }

        // THIS IS THE REAL CODE
        // // validate if cusomter data is filled
        // if (this.state.customerName != null & this.state.customerEmail != null & this.state.customerAddress != null) {

        //     // get product data
        //     fs.collection("stores").doc(this.props.match.params.store_id).collection("products").doc(this.props.match.params.product_id)
        //     .get()
        //     .then(doc => {


        //         // if product exists
        //         // sale data needs the product data
        //         if(doc.exists) {

        //             // sale object
        //             const newSale = {
                        
        //                 productId: doc.id,
        //                 customerName: this.state.customerName,
        //                 customerEmail: this.state.customerEmail,
        //                 customerAddress: this.state.customerAddress,
                        
        //             };
            
        //             fs.collection('stores').doc(this.props.match.params.store_id).collection("sales")
        //                 .add(
        //                     newSale
        //                 )
        //                 .then(ref_ => {
            
        //                     // redirect to payment
        //                     window.location.href = doc.data().paymentUrl;
            
        //                 });
                    
        //         }
        //     })

        // }

        // // if user data is not complete
        // else {
        //     alert("Debes rellenar toda la información antes de seguir");

        //     this.setState({
        //         loading: false,
        //     });
        // };
        
    }


    render() {

        return (

            !this.state.loading

                ?

                <Container
                    style={{ 
                        // backgroundColor: "yellow" 
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",
                        // alignContent: "center",

                    }}
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
                        goToShoppingCart={() => {
                            // alert("go to cart");
                            this.props.history.push('/shoppingCart/' + this.props.match.params.store_id);
                        }}
                    />

                    {/* section title */}
                    <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Completa tus datos
                    </Typography>

                    {/* informatino to fill */}
                    <FormControl
                        style={{
                            // width: "50%",
                            // alignSelf: "center",
                        }}
                    >

                        {/* customer address */}
                        <Typography align="center" variant="h6" component="h6" gutterBottom>
                            Información personal
                        </Typography>

                        {/* customer name */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Nombre"
                            // type="Nombre"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerName: e.target.value })}
                            value={this.state.customerName}
                        />

                        {/* customer email */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Correo Electrónico"
                            // type="Correo Electrónico"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerEmail: e.target.value })}
                            value={this.state.customerEmail}
                        />

                        {/* customer phone mobiel */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Celular"
                            // type="Nombre"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerPhone: e.target.value })}
                            value={this.state.customerPhone}
                        />

                        {/* customer address */}
                        <Typography align="center" variant="h6" component="h6" gutterBottom>
                            Dirección de envío
                        </Typography>
                        
                        {/* region */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Región"
                            // type="Dirección"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerRegion: e.target.value })}
                            value={this.state.customerRegion}
                        />

                        {/* city */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Ciudad"
                            // type="Dirección"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerCity: e.target.value })}
                            value={this.state.customerCity}
                        />

                        {/* street */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Calle"
                            // type="Dirección"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerStreet: e.target.value })}
                            value={this.state.customerStreet}
                        />

                        {/* number */}
                        <TextField
                            variant="outlined"
                            required
                            // id="standard-uncontrolled"
                            label="Número"
                            // type="Dirección"
                            // defaultValue="Correo electrónico"
                            margin="normal"
                            onChange={(e) => this.setState({ customerHouseNumber: e.target.value })}
                            value={this.state.customerHouseNumber}
                        />





                        {/* <Typography align="center" variant="body2" component="p" gutterBottom>
                        
                            ***

                            Este proceso de compra es solo una demostración por lo que no corresponde a una venta real.

                            ​

                            Si seleccionas "Confirmar Compra" te redirigiremos hacia un botón de pago simulado, el cual solo sirve para que veas como sería el proceso de pago para tus clientes.


                            Este mensaje no aparecerá en tu página real. 

                            El método de pago se implementará de forma real cuando tengas tu propia página de e-commerce. 

                            ***

                        </Typography> */}

                        {/* total sales */}
                        <Container
                            style = {{
                                margin: 30,
                                // backgrousndColor: "yellow",
                                alignSelf:"center",
                            }}
                        >
                            <Typography align="center" variant="h6" component="h6" gutterBottom>
                                Total: $ {this.state.totalSales}
                            </Typography>
                        </Container>

                        {/* convert to post button */}
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
                                onClick={this.confirm_sale}
                                >
                                Finalizar compra
                            </Button>

                        </Container>

                    </FormControl>

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

export default SaleConfirmation;