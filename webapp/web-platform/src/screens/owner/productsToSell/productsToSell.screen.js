import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import { IconButton } from '@material-ui/core';


// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// import Drawer from '@material-ui/core/Drawer';
// import MenuItem from "@material-ui/core/MenuItem";

// import Modal from '@material-ui/core/Modal';
// import PlayArrow from '@material-ui/icons/PlayArrow';
import Add from '@material-ui/icons/Add';
import AttachMoney from '@material-ui/icons/AttachMoney';
// import MenuIcon from '@material-ui/icons/Menu';

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


class ProductsToSell extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            products: [],

            // nav bar
            openNavMenu: false,
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

                // redirect
                // this.props.history.push('/productsToSell');
                
                // get products from store
                fs.collection("stores").doc(this.props.match.params.store_id).collection("products")
                .get()
                .then(snapshotquery => {

                    // // get data from API
                    var products = [];

                    // iterate over each item
                    snapshotquery.forEach(doc => {

                        // console.log(doc.data());
                        let product = doc.data();
                        product["id"] = doc.id;
                        products.push(product);

                        // get minimum price
                        var prices = [];
                        product.saleFormats.forEach(saleFormat => {
                            // console.log(saleFormat);
                            prices.push(parseFloat(saleFormat.price));
                        })
                        // console.log(prices);
                        // console.log(prices.sort())
                        product["minPrice"] = prices.sort()[prices.length - 1];

                    });

                    
                    // update state
                    this.setState({

                        // update products
                        products: products,
                        loading: false,

                    });

                })

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
                style = {{
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                
                {/* <Drawer 
                    variant="temporary"
                    width={200} 
                    openSecondary={true} 
                    open={this.state.openNavMenu} 
                    onClose = {() => this.setState({openNavMenu: false})}
                >
                    <MenuItem onClick={() => alert("hello")}>Menu Item</MenuItem>
                </Drawer>

                <Container
                    style={{
                        alignSelf: "right",
                        // left: 
                        backgroundColor: "red",
                    }}
                >
                    <IconButton
                        onClick = {() => {this.setState({openNavMenu: true})}}
                        // align = "left"
                        style = {{
                            alignSelf: "right",
                            // left: 
                            backgroundColor: "yellow",
                        }}
                    >

                        <MenuIcon />

                    </IconButton>

                </Container> */}

                {/* menu */}
                <MenuBar
                    goToSocialNetworkPosts = {() => {
                        // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                        localStorage.setItem('store_id', this.props.match.params.store_id);

                        // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                        // this.props.history.push("/loginSocialNetworks/");
                        this.props.history.push("/addNewProductHome/" + this.props.match.params.store_id);

                    }}

                    goToProductsToSell={() => {
                        this.props.history.push("/productsToSell/" + this.props.match.params.store_id);
                    }}

                    goToChooseStore = {() => {
                        this.props.history.push("/chooseStore");
                    }}

                    goToStore = {() => {
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

                    goToSales = {() => {
                        this.props.history.push("/sales/" + this.props.match.params.store_id);
                    }}

                    openNavMenu = {this.state.openNavMenu}
                    onCloseNavMenu={() => this.setState({ openNavMenu: false })}
                    onClickOpenNavMenu={() => { this.setState({ openNavMenu: true }) }}
                />

                {/* products list */}
                <Container
                    style = {{
                        justifyContent: "center",
                        display:"flex",
                        flexDirection: "column",
                    }}
                >

                    {/* title */}
                    <Typography align="center" variant="h4" component="h4" gutterBottom
                        // margin={20}
                    >
                        Productos a la venta en tu página
                    </Typography>

                    {/* Information */}
                    {/* <Container
                        // label="Estos son todos los productos que estan disponibles en tu página y que un cliente puede comprar"
                        // color="primary"
                        // margin = "100"
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

                    > */}
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
                        Estos son todos los productos que estan disponibles en tu página y que un cliente puede comprar
                    </Typography> */}

                    {/* </Container> */}

                    {/* list of products */}
                    {
                        !this.state.loading

                            ?

                                <Grid
                                    container
                                    spacing={3}
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

                                        // check if there are posts
                                        this.state.products.length > 0 

                                        ?

                                            this.state.products.map((product) => {

                                                return (

                                                    
                                                    // each product structure
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={4}
                                                    >

                                                        <Card
                                                            // style={{
                                                            //     backgroundColor: "red",
                                                            //     // borderRadius: 10,
                                                            // }}
                                                            // onClick={() => {
                                                            //     // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                            //     // this.setState({
                                                            //     //     toBuyModal: true,
                                                            //     // });

                                                            //     // alert("See details")
                                                            //     this.props.history.push('/editProduct/' + this.props.match.params.store_id + "/" + product.id, { product: product });
                                                            // }}
                                                        >
                                                            <CardActionArea

                                                                onClick={() => {
                                                                    // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                                    // this.setState({
                                                                    //     toBuyModal: true,
                                                                    // });

                                                                    // alert("See details")
                                                                    this.props.history.push('/editProduct/' + this.props.match.params.store_id + "/" + product.id, { product: product });
                                                                }}

                                                            >
                                                                <CardMedia
                                                                    image={product.image}
                                                                    component="img"
                                                                    alt="Imágen del producto"
                                                                    height="200"

                                                                // title={workshop.name}
                                                                />

                                                                {/* contentn */}
                                                                <CardContent>

                                                                    {/* product name */}
                                                                    <Typography
                                                                        align="center"
                                                                        gutterBottom
                                                                        variant="h6"
                                                                        component="h6">
                                                                        {product.name}
                                                                    </Typography>

                                                                    {/* description */}
                                                                    <Typography align="center" variant="body2" color="textSecondary" component="p">
                                                                        {product.description.length < 80 ? product.description : product.description.substring(0, 80) + "..."}
                                                                    </Typography>

                                                                    {/* price */}
                                                                    <Container
                                                                        style={{
                                                                            display: "flex",
                                                                            // flex: 1,
                                                                            flexDirection: "row",
                                                                            // backgroundColor: "red",
                                                                            textAlign: "center",
                                                                            justifyContent: "center",
                                                                            alignContent: "center",
                                                                            marginTop: 15,
                                                                        }}
                                                                    >

                                                                        <AttachMoney fontSize="small" />

                                                                        <Typography
                                                                            align="center"
                                                                            gutterBottom
                                                                            variant="body1"
                                                                            component="p"
                                                                        >
                                                                            {product.minPrice.toLocaleString()}
                                                                        </Typography>
                                                                    </Container>


                                                                </CardContent>

                                                            </CardActionArea>

                                                            <CardActions
                                                                style = {{
                                                                    // backgroundColor: "red",
                                                                    justifyContent:"center",
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

                                                                        // alert("Go to edit")
                                                                        this.props.history.push('/editProduct/' + this.props.match.params.store_id + "/" + product.id, { product: product});
                                                                    }}
                                                                >

                                                                    {/* <PlayArrow />  */}
                                                                    {/* Ver detalles */}
                                                                    Editar
            
                                                                </Button>

                                                            </CardActions>

                                                        </Card>

                                                    </Grid>

                                                );
                                            })

                                        :

                                            <Container
                                                style = {{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    margin: 50,
                                                }}
                                            >

                                                <Typography 
                                                    align = "center"
                                                    gutterBottom variant="body2" component="p">
                                                    Aún no has agregado productos a tu tienda ¡Comienza a agregar productos!
                                                </Typography>
                                            
                                                {/* go to post from SN */}
                                                <Button
                                                    variant = "contained"
                                                    color = "primary"
                                                    onClick={() => {

                                                        // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                                                        localStorage.setItem('store_id', this.props.match.params.store_id);

                                                        // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                                                        // this.props.history.push("/loginSocialNetworks/");
                                                        this.props.history.push("/addNewProductHome/" + this.props.match.params.store_id);

                                                    }}
                                                >
                                                    <Add/>
                                                    Agregar productos
                                                </Button>
                                            </Container>
                                    }

                                </Grid>


                            :

                            <CircularProgress />

                    }
                
                </Container>
                
            </Container>
        );

    }

}

export default ProductsToSell;