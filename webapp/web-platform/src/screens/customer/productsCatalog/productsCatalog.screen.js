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
// import PlayArrow from '@material-ui/icons/PlayArrow';
import AttachMoney from '@material-ui/icons/AttachMoney';
// import Search from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';

import SearchBar from "material-ui-search-bar";

// import InputBase from '@material-ui/core/InputBase';

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

            // to save initial because current filtering in search box create a new array and update products list
            initialProducts: [],

            store: null,

            // value to search in search bar
            searchBarValue: null,

            // to filter by category
            categories: null,
            filterCategoryIndex: 0,

            // products on shopping cart
            productsOnCart: 0,
        };

        this.filterProduct = this.filterProduct.bind(this);
        this.filterProductByCategory = this.filterProductByCategory.bind(this);

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
                fs.collection("stores").doc(this.props.match.params.store_id).collection("products")
                
                    // filter by visible products
                    .where("visible", "==", true)
                    .get()
                    .then(snapshotquery => {

                        // // get data from API
                        var products = [];

                        // categories to filter
                        var categories = ["Todos"];

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

                            // add category
                            if (!categories.includes(product.category)){
                                categories.push(product.category);
                            }

                        });

                        // console.log(categories);

                        // get if there is products on shopping cart
                        const productsArrayCart = JSON.parse(localStorage.getItem('productsArrayCart'));
                        var productsOnCart = 0;
                        productsArrayCart.forEach(prod => {
                            productsOnCart += prod.formatIndexList.length
                        });

                        // const productsOnCart = productsArrayCart != null && productsArrayCart.length > 0 ? productsArrayCart.length : 0;

                        // console.log(productsOnCart);

                        // update state
                        this.setState({

                            // update products
                            products: products,
                            initialProducts: products,
                            store: store,
                            loading: false,
                            categories: categories,

                            // products on shopping cart
                            productsOnCart: productsOnCart,

                        });
                    });
            }
        })

    }


    filterProduct() {

        if (this.state.searchBarValue != null) {

            this.setState({loading: true});
    
            var newFilteredProducts = [];
            const searchValue = this.state.searchBarValue.toLowerCase();
    
            // basic implementation (search for a product with same name or description). I guess it is fast with few products
            this.state.initialProducts.forEach(product => {
            // this.state.filteredProducts.forEach(product => {
                // filtering by name or description
                if (product.name.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)){
                    newFilteredProducts.push(product);
                };
            });
    
            // update state
            this.setState({
                products: newFilteredProducts,
                loading: false,
            });
        }
        
    };

    // this is using the category filter
    filterProductByCategory(categoryIndex) {
        // alert("filter by category")
        // console.log(categoryIndex);

        this.setState({ loading: true });

        // new filtered products
        var newFilteredProducts = [];
        const searchValue = this.state.categories[categoryIndex];

        // basic implementation (search for a product with same name or description). I guess it is fast with few products
        if (categoryIndex != 0) {

            // filter by initial products
            this.state.initialProducts.forEach(product => {
            // this.state.filteredProducts.forEach(product => {

                // filtering by category
                if (product.category.toLowerCase().includes(searchValue)) {
                    newFilteredProducts.push(product);
                };
            });
            
            
        }

        // this is all products
        else {
            // alert("all products");
            newFilteredProducts = this.state.initialProducts;
        }

        // update state
        this.setState({
            products: newFilteredProducts,
            loading: false,
            filterCategoryIndex: categoryIndex,
        });
    };

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
                            this.props.history.push('/store/' + this.props.match.params.store_id);
                        }}
                        goToInstagram={() => {
                            // alert("Go to home")
                            window.open(this.state.store.instagramUrl);
                        }}
                        goToShoppingCart = {() => {
                            // alert("go to cart");
                            this.props.history.push('/shoppingCart/' + this.props.match.params.store_id);
                        }}
                        productsOnCart={this.state.productsOnCart}
                    />


                    {/* search bar and filter */}
                    <Grid
                        container
                        style = {{
                            display: "flex",
                            flexDirection: "column",
                            // justifyContent: "center",
                            // alignContent: "center",
                            // backgroundColor: "yellow",
                            width: "100%",
                        }}
                    >

                        {/* search bar */}
                        <Grid
                            item
                            xs = {12}
                            md = {6}
                            style = {{
                                // backgroundColor: "red",
                                display:"flex",
                                flexDirection:"row",
                                // justifyContent:"center",
                                alignSelf: "center",
                                width: "100%",
                            }}
                        >

                            <Grid
                                container
                            >
                                <Grid
                                    item 
                                    xs = {12}
                                    md = {8}
                                    // style={{
                                    //     backgroundColor: "red",
                                    // }}
                                >

                                    <SearchBar
                                        value={this.state.searchBarValue}
                                        onChange={(newValue) => this.setState({ searchBarValue: newValue })}
                                        onRequestSearch={() => {
                                            // doSomethingWith(this.state.value)
                                            // alert(this.state.searchBarValue);
                                            this.filterProduct();
                                        }}
                                        placeholder = "Buscar producto"
                                        style = {{
                                            marginTop: 30,
                                            marginBottom: 30,
                                            width: "100%",
                                        }}
                                        onCancelSearch = {() => {
                                            this.setState({
                                                products: this.state.initialProducts,
                                            })
                                        }}
                                        />
                                </Grid>

                                {/* button because it does not work on mobiel when press enter */}
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    style = {{
                                        display: "flex",
                                        // backgroundColor: "yellow",
                                        justifyContent: "center",
                                        // alignContent: "center",
                                    }}
                                >
                                
                                    <Button
                                        // align="center"
                                        size="small"
                                        // color="primary"
                                        color = "black"
                                        // variant="contained"
                                        onClick={() => {
                                            // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                            // this.setState({
                                                //     toBuyModal: true,
                                                // });
                                                
                                                // alert("See details")
                                                // this.props.history.push('/productDetails/' + this.state.store.id + "/" + product.id);
                                                this.filterProduct();
                                            }}
                                            >

                                        Buscar

                                    </Button>

                                </Grid>
                        
                            </Grid>
                        </Grid>

                        {/* filter by categories */}
                        {
                            this.state.categories != null & this.state.categories.length > 0 &&
                            
                            <Grid
                                item
                                xs={12}
                                md={6}
                                style={{
                                    // backgroundColor: "green",
                                    justifyContent: "left",
                                    // alignContent: "center",
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: 20,
                                }}
                            >

                                <Typography
                                    gutterBottom
                                    variant="body1"
                                    component="p"
                                    style={{
                                        // marginTop: 20,
                                        // fontSize: 30,
                                        // flex: 1,
                                        // marginBottom: 30,
                                    }}
                                >
                                    Categoría / 
                                </Typography>

                                <Select
                                    style = {{
                                        // backgroundColor: "green",
                                        // alignSelf: "center",
                                        // flex: 1,
                                        // height:"40%",
                                        marginLeft: 10,
                                        // top: 0,
                                    }}
                                    // align= "center"
                                    // labelId="demo-simple-select-label"
                                    // id="demo-simple-select"
                                    value={this.state.filterCategoryIndex}
                                    onChange={(e)=> {this.filterProductByCategory(e.target.value)}}
                                >
                                    {
                                        this.state.categories.map((category, idx) => {
                                            return (
                                                <option style = {{marginTop: 10,}}value = {idx}>
                                                    {category}
                                                </option>
                                            )
                                        })
                                    }
                                </Select>

                            </Grid>
                        }

                    </Grid>


                    {/* catalog of products */}
                    <Container
                        style = {{
                            marginTop: 15,
                        }}
                    >

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
                                                onClick={() => {
                                                    // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                    // this.setState({
                                                    //     toBuyModal: true,
                                                    // });

                                                    // alert("See details")
                                                    this.props.history.push('/productDetails/' + this.state.store.id + "/" + product.id);
                                                }}
                                            >
                                                <CardActionArea
                                                >
                                                    <CardMedia
                                                        image={product.image}
                                                        component="img"
                                                        alt="Foto de producto"
                                                        height="200"

                                                    // title={workshop.name}
                                                    />

                                                    {/* contentn */}
                                                    <CardContent>

                                                        {/* product name */}
                                                        <Typography 
                                                            align = "center"
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
                                                                {product.minPrice.toLocaleString("es-SP")}
                                                            </Typography>
                                                        </Container>

                                                        {/* </Container> */}

                                                    </CardContent>

                                                </CardActionArea>


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

                        // display whatsapp
                        displayToWhatsapp={this.state.store.whatsappNumber != null}
                        goToWhatsapp = {() => {
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

                // loading data
                <CircularProgress />

        );

    }

}

export default ProductsCatalog;