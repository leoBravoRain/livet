import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

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

import StoreInformation from "../generalComponents/storeInformation/storeInformation.component";
import FooterStore from "../generalComponents/footerStore/footerStore.component";
// // prototype post
// const product = {
//     "name": "Panqueques de queso crema",
//     "description": "Panqueques hechos con masa integral",
//     "var1": "10 unidades",
//     "price": 4500,
//     "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
//     "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar."
// };


class ProductDetails extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
            product: null,
            store: null,
            units: 1,
            formatIndex: 0,
        }

        // this.convert_to_product = this.convert_to_product.bind(this);

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
                // store["id"] = doc.id;

                // get product information
                fs.collection("stores").doc(this.props.match.params.store_id).collection("products").doc(this.props.match.params.product_id).get()
                    .then(doc => {
        
                        // if store exists
                        if (doc.exists) {
        
                            // get store data
                            var product = doc.data();
                            product["id"] = doc.id;
        
                            // update state
                            this.setState({
        
                                // update products
                                product: product,
                                store: store,
                                loading: false,
                                units: product.saleFormats[this.state.formatIndex].stock != 0 ? 1 : 0,
        
                            });
        
                        }
        
                    })

            }
        })

    }

    // add product to cart
    addToShoppingCart() {

        // units is greater than zero
        if (this.state.units != 0){

            // validate stock
            if (this.state.units <= this.state.product.saleFormats[this.state.formatIndex].stock) {
    
                // get shpping cart
                var productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));
        
                // console.log(productsArrayCart);
                if (productsArrayCart == null) {
                    productsArrayCart = [];
                };
        
                // add new product
                productsArrayCart.push({
                    "product": this.state.product,
                    "formatIndex": this.state.formatIndex,
                    "units": this.state.units,
                });
        
                // save new array
                localStorage.setItem('productsArrayCart', JSON.stringify(productsArrayCart));
        
                // console.log(productsArrayCart);
        
                // console.log(localStorage);
                alert("Producto agregado al carrito de compra");
        
                // redirect
                this.props.history.push('/' + this.props.match.params.store_id);
    
            }
    
            else{
                alert("Sólo puedes ordenar " + this.state.product.saleFormats[this.state.formatIndex].stock + " unidades de este formato");
            };
        }
        
        else {
            alert("Debes elegir al menos una unidad de este producto");
        };

    }

    render() {

        return (

            !this.state.loading

            ?

                // this is to center content
                <Container>

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

                    {/* this is real container */}
                    <Grid
                        container
                        style={{
                            // padding: 20,
                            // margin: 5,
                            // alignContent: "center",
                            justifyContent: "center",
                            // display: "flex",
                            // flexDirection: "column",
                            // backgroundColor: "yellow",
                        }}
                    >



                        {/* pictures */}
                        <Grid
                            item
                            style={{
                                // padding: 20,
                                margin: 10,
                                // alignContent: "center",
                                // justifyContent: "center",
                                // display: "flex",
                                // flexDirection: "column",
                                // backgroundColor: "green",
                            }}
                        >

                            {/* original image */}
                            <img
                                src={this.state.product.image}
                                alt="image"
                                width="300px"
                                heigh="300px"
                                />
                        </Grid>




                        {/* general information */}
                        <Grid
                            item
                            style={{
                                // padding: 20,
                                margin: 10,
                                alignContent: "left",
                                justifyContent: "left",
                                display: "flex",
                                flexDirection: "column",
                                // backgroundColor: "red",
                            }}
                        >
                    
                            {/* name */}
                            <Typography 
                                // align="center" 
                                variant="h3" 
                                component="h3" 
                                gutterBottom
                            >
                                {this.state.product.name}
                            </Typography>

                            {/* description */}
                            <Typography 
                                // align="center" 
                                variant="body2" 
                                component="p" 
                                gutterBottom>
                                {this.state.product.description}
                            </Typography>

                            {/* extra information */}
                            {/* <Typography 
                            // align="center" 
                            variant="body2" component="p" gutterBottom>
                                {this.state.product.extraInformation}
                            </Typography> */}

                            {/* var 1 */}
                            {/* <Typography 
                                // align="center" 
                                variant="body2" component="p" gutterBottom>
                                {this.state.product.var1}
                            </Typography> */}


                            {/* sale formats */}
                            {/* it  has an array of options */}
                            <RadioGroup 
                                aria-label="gender" 
                                // name="gender1" 
                                value={this.state.formatIndex} 
                                onChange={(e) => {
                                    // console.log("before");
                                    // console.log(this.state.formatIndex);
                                    // console.log(e.target.value);

                                    this.setState({ 
                                        formatIndex: parseInt(e.target.value),
                                    });
                                    // ,() => {
                                    //     // console.log("after");
                                    //     // console.log(this.state.formatIndex);
                                    // })
                                }}
                            >
                                {
                                    this.state.product.saleFormats.map((saleFormat,idx)=> {
                                        return (
                                            <FormControlLabel 
                                                value={idx} 
                                                control={<Radio />} 
                                                label={saleFormat.format + " - $ " + saleFormat.price + (saleFormat.stock != 0 ? " (stock: " + saleFormat.stock + ")" : " (sin stock disponible)")} 
                                            />
                                        )
                                    })
                                }

                            </RadioGroup>

                            {/* select units */}
                            <TextField
                                // id="standard-uncontrolled"
                                label="Unidades"
                                type="number"
                                // defaultValue={1}
                                margin="normal"
                                onChange={(e) => this.setState({ units: e.target.value })}
                                // onChange={this.props.changeNewProductCategory}
                                value={this.state.units}
                                InputProps={{
                                    inputProps: {
                                        max: this.state.product.saleFormats[this.state.formatIndex].stock, 
                                        min: parseInt(this.state.product.saleFormats[this.state.formatIndex].stock) == 0 ? 0: 1,
                                    }
                                }}
                                // value={this.props.newProductCategory}
                            />

                            {/* to buy button */}
                            <Button 
                                align = "right"
                                size="small" 
                                color="primary"
                                variant="contained"
                                disabled={this.state.product.saleFormats[this.state.formatIndex].stock == 0}
                                onClick={() => {
                                    // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                    // this.setState({
                                    //     toBuyModal: true,
                                    // });

                                    // alert("Go to buy");
                                    // this.props.history.push('/saleConfirmation/' + this.props.match.params.store_id + "/" + this.props.match.params.product_id);
                                    this.addToShoppingCart();
                                    
                                }}
                            >

                                {/* Comprar */}
                                Agregar a carrito

                            </Button>

                        </Grid>

                    </Grid>

                    {/* footer */}
                    <FooterStore
                        goToInstagram={() => {
                            // alert("Go to home")
                            window.open(this.state.store.instagramUrl);
                        }}
                    />

                </Container>

            :

                <CircularProgress />
        );

    }

}

export default ProductDetails;