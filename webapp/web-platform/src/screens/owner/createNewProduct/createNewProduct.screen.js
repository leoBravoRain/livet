import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
// import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';


import ProductInformationForm from "../generalComponents/productInformationForm.screen";

import firebase from "firebase";

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
import { 
    auth,
    fs,
    st,
} from "../../../libraries/firebase/firebase";


// // prototype post
// const posts = [

//     {
//         "text": "hello this is my first IG post",
//         "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
//     },

//     {
//         "text": "This is another IG post",
//         "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
//     },
// ];

// logged user
var loggedUser = null;

// structure new product format
// it is used multiple times
// const newProductFormat = { "format": null, "price": null };

class CreateNewProduct extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
            post: null,

            // product fields
            productName: null,
            productDescription: null,
            // this can be for example "size" or "units"
            // productVar1: null,
            // productPrice: null,
            // if product is visible in final eccommerce
            productVisible: true,
            // productStock: null,

            // category
            // select a created category
            selectedCategory: null,
            selectedCategoryIndex: 0,
            // productCategories: ["tortas", "kuchen"],
            productCategories: ["Agregar nueva categoría"],
            // create a new category
            newProductCategory: null,

            // sale formats product
            // productSaleFormats: [newProductFormat],
            productSaleFormats: [{ "format": null, "price": null, "stock": null}]

            // productImage: "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
            // productExtraInformation: null,
        }

        this.convert_to_product = this.convert_to_product.bind(this);
        this.addOtherSaleFormat = this.addOtherSaleFormat.bind(this);
        this.removeSaleFormat = this.removeSaleFormat.bind(this);
        this.changeProductSaleFormat = this.changeProductSaleFormat.bind(this);

    };

    componentDidMount() {

        console.log("load edit post to product component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // assign logged user to user var
                loggedUser = user;

                // // redirect
                // this.props.history.push('/productsToSell');

                
                // get store infromation (categories)
                // get products from store
                fs.collection("stores")
                .doc(this.props.match.params.store_id)
                .get()
                .then(doc => {
                    
                    if (doc.exists) {
                        
                        // console.log(doc.data());
                        
                        // add categories
                        var categories = this.state.productCategories;
                        // console.log(categories);
                        if (doc.data().categories != null) {
                            // console.log(doc.data().categories);
                            categories = categories.concat(doc.data().categories);
                        }

                        // console.log(categories);

                        // update state
                        this.setState({
        
                            // it's because it can come from IG data or from user manual data
                            post: this.props.location.state != null ? this.props.location.state.post : null,
        
                            productDescription: this.props.location.state != null ? this.props.location.state.post.caption : null,
                            // initial image
                            productImage: this.props.location.state != null ? this.props.location.state.post.media_url : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=",
        
                            loading: false,

                            productCategories: categories,
        
                            // add store categories
                            // productCategories: categories,
        
                        });
                    }


                })
                    
            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
            }

            this.setState({
                loading: false,
            });

        });

    }


    convert_to_product() {

        this.setState({
            loading: true,
        });

        // add new category condition
        const addNewCategoryCondition = this.state.selectedCategoryIndex == 0 & this.state.newProductCategory != null;

        // select a created category condition
        const selectCreatedCategory = this.state.selectedCategoryIndex != null & this.state.selectedCategoryIndex != 0;

        // console.log(addNewCategoryCondition);
        // console.log(selectCreatedCategory);
        // const validateStock = false;
        // const validatePrice = false;
        // const validateSaleFormat = false;
        var validateSaleFormats = true;

        // validate if any data is null
        this.state.productSaleFormats.forEach(product => {
            if(product.format == null || product.price == null || product.stock == null) {
                validateSaleFormats = false;
            }
        });


        // check information isn't null
        if (this.state.productName != null & this.state.productDescription != null & validateSaleFormats & (addNewCategoryCondition || selectCreatedCategory)) {

            // take image
            const selectedFile = document.getElementById('file_input').files[0];

            // console.log("go to save product")
            // depending on value of image it return the default iamge url or the user uploaded image
            new Promise((resolve) => {

                // if there is user image
                if (selectedFile != null) {

                    // console.log("CHANGE CODE 184 creare new product screen");
                    // resolve(this.state.productImage);
                    
                    // alert("image");
                    // resolve(
                    // Create a root reference
                    var storageRef = st.ref('stores/' + loggedUser.uid + "/" + this.props.match.params.store_id + "/products/" + selectedFile.name);

                    // store file in firebase store
                    storageRef.put(selectedFile).then(snapshot => {

                        // get url of fiile
                        // return snapshot.ref.getDownloadURL();
                        resolve(snapshot.ref.getDownloadURL());

                    })
                    // )
                }

                else {
                    // alert("no image");
                    resolve(this.state.productImage);
                }

            })

                // if it's ok
                .then(downloadURL => {

                    // console.log("hello");
                    // console.log(this.state.categories);
                    // console.log(this.state);
                    // console.log(addNewCategoryCondition ? this.state.newProductCategory : this.state.productCategories[this.state.selectedCategoryIndex]);
                    
                    // define store
                    const newProduct = {
                        "name": this.state.productName,
                        "description": this.state.productDescription,
                        // "var1": this.state.productVar1,
                        // "price": this.state.productPrice,
                        // "stock": this.state.productStock,
                        "saleFormats": this.state.productSaleFormats,
                        // "image": this.state.productImage,
                        "image": downloadURL,
                        "visible": this.state.productVisible,
                        "category": addNewCategoryCondition ? this.state.newProductCategory : this.state.productCategories[this.state.selectedCategoryIndex],
                        // "extraInformation": this.state.productExtraInformation,
                        "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
                    };
                    
                    // console.log(newProduct);

                    // create store in DB 
                    fs.collection('stores').doc(this.props.match.params.store_id).collection("products")
                        .add(
                            newProduct
                        )
                        .then(ref_ => {
                            
                            new Promise((resolve) => {
                                
                                // if new category created
                                if (addNewCategoryCondition) {
                                    // alert("create new category");
                                    // update store with new category
                                    fs.collection('stores')
                                        .doc(this.props.match.params.store_id)
                                        .update({
                                            "categories": firebase.firestore.FieldValue.arrayUnion(this.state.newProductCategory),
                                        })
                                        .then(ref_ => {
                                            // alert("category created");
                                            resolve(true);
                                        })
                                        .catch(e => {
                                            console.log(e);
                                            this.setState({
                                                loading: false
                                            });
                                            alert("Tuvimos un error, inténtalo nuevamente porfavor");
                                            // alert("error adding new category");
                                        })
                                    
                                }
                                
                                // not new category created
                                else {
                                    // alert("not new category");
                                    resolve(true);
                                };

                            })

                            // returning from possible creating a new category 
                            .then(() => {

                                alert("El producto ha sido agregado exitosamente");
            
                                this.setState({
                                    loading: false,
                                });
            
                                // navigate to products to sell
                                // + store id
                                this.props.history.push("/productsToSell/" + this.props.match.params.store_id);

                            })
                            .catch(e => {
                                console.log(e);
                                this.setState({
                                    loading: false
                                });
                                alert("Tuvimos un error, inténtalo nuevamente porfavor");
                                // alert("error trying to create new product");
                            });
        
                        })
        
                        .catch(e => {
        
                            this.setState({
                                loading: false
                            });
        
        
                            alert("Tuvimos un error, inténtalo nuevamente porfavor");
        
                        });

                })

                // error trying to upload photo
                .catch(e => {

                    this.setState({
                        loading: false
                    });


                    alert("Tuvimos un error, inténtalo nuevamente porfavor");

                });
                

        }

        // user must to fill data first
        else {
            alert("Debes agregar toda la información antes de continuar");
            this.setState({
                loading: false,
            });
        }
    }


    addOtherSaleFormat() {

        // get current
        var productSaleFormats = this.state.productSaleFormats;

        // console.log(productSaleFormats);

        // add element
        productSaleFormats.push({ "format": null, "price": null, "stock": null});

        // console.log(productSaleFormats);

        // update state
        this.setState({
            productSaleFormats: productSaleFormats,
        });
        
    }

    removeSaleFormat(idx) {

        // alert(idx);
        // get current
        var productSaleFormats = this.state.productSaleFormats;

        // add element
        productSaleFormats.splice(idx, 1);

        // update state
        this.setState({
            productSaleFormats: productSaleFormats,
        });

    };

    // change product sale format of specific product
    changeProductSaleFormat(e, idx, item){

        // alert(item);
        // console.log("Executed");
        // console.log(idx);
        // console.log(e.target.value);

        // get current
        var productSaleFormats = this.state.productSaleFormats;

        // console.log(productSaleFormats);

        // console.log(productSaleFormats[idx]);

        // update value
        productSaleFormats[idx][item] = e.target.value;
        // var item = productSaleFormats[idx];

        // item["format"] = e.target.value;
        // productSaleFormats[idx] = item;

        // console.log(item);
        // console.log(productSaleFormats);

        // update state
        this.setState({
            productSaleFormats: productSaleFormats,
        });
        
    }

    render() {

        return (

            !this.state.loading

                ?

                    <Container
                        // item xs={12} sm={12}
                        style={{
                            // backgroundColor: "yellow" 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >

                        {/* section title */}
                        <Typography align="center" variant="h4" component="h4" gutterBottom>
                            Crear nuevo producto
                        </Typography>

                        {/* <Chip
                            label="Acá debes agregar la información sobre el producto que venderás en tu tienda. La imagen será la misma que la del posteo."
                            // color="primary"
                            // margin = "100"
                            style={{
                                margin: 50,
                                backgroundColor: "rgba(173, 216, 230, 0.5)",
                            }}

                        /> */}

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
                            Acá debes agregar la información sobre el producto que venderás en tu tienda. La imagen será la misma que la del posteo.
                        </Typography> */}


                        {/* information */}
                        <ProductInformationForm 
                            productImage={this.state.post != null ? this.state.post.media_url : this.state.productImage}
                            defaultIGCaption = {this.state.post != null ? this.state.post.caption : ""}
                            changeProductName={(e) => this.setState({ productName: e.target.value })}
                            productName={this.state.productName}
                            changeProductDescription={(e) => this.setState({ productDescription: e.target.value })}
                            productDescription={this.state.productDescription}
                            // changeProductPrice={(e) => this.setState({ productPrice: e.target.value })}
                            // productPrice={this.state.productPrice}
                            convert_to_product={this.convert_to_product}
                            buttonText = "Crear producto"
                            visible = {this.state.productVisible}
                            changeVisible={(e) => this.setState({ productVisible: !this.state.productVisible })}
                            // changeProductStock={(e) => this.setState({ productStock: e.target.value })}
                            // productStock={this.state.productStock}
                            changeSelectedCategory={(e) => this.setState({ selectedCategoryIndex: e.target.value })}
                            selectedCategoryIndex={this.state.selectedCategoryIndex}
                            productCategories = {this.state.productCategories}
                            changeNewProductCategory={(e) => this.setState({ newProductCategory: e.target.value })}
                            newProductCategory={this.state.newProductCategory}
                            productSaleFormats={this.state.productSaleFormats}
                            addOtherSaleFormat={this.addOtherSaleFormat}
                            removeSaleFormat={e=>this.removeSaleFormat(e)}
                            changeProductSaleFormat={(e, idx, item) => this.changeProductSaleFormat(e, idx, item)}
                        />


                        {/* Here it was the origanl form component */}

                    </Container>

                :

                    <CircularProgress />

        );

    }

}

export default CreateNewProduct;