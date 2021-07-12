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

// logged user
var loggedUser = null;

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


class EditProduct extends React.Component {

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
            // productStock: null,
            productVisible: false,
            
            // productImage: "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
            // productExtraInformation: null,

            // category
            // select a created category
            selectedCategory: null,
            selectedCategoryIndex: 0,
            // productCategories: ["tortas", "kuchen"],
            productCategories: ["Agregar nueva categoría"],
            // create a new category
            newProductCategory: null,

            productCategories: ["Agregar nueva categoría"],

            // sale formats product
            // productSaleFormats: [newProductFormat],
            productSaleFormats: [{ "format": null, "price": null, "stock": null }]
            
            
        }

        this.editProduct = this.editProduct.bind(this);
        this.addOtherSaleFormat = this.addOtherSaleFormat.bind(this);
        this.removeSaleFormat = this.removeSaleFormat.bind(this);
        this.changeProductSaleFormat = this.changeProductSaleFormat.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

    };

    componentDidMount() {

        console.log("load edit product");

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

                            // update state
                            this.setState({
            
                                // previous page send this data
                                productName: this.props.location.state.product.name,
                                productDescription: this.props.location.state.product.description,
                                productPrice: this.props.location.state.product.price,
                                productImage: this.props.location.state.product.image,
                                productVisible: this.props.location.state.product.visible,
                                productStock: this.props.location.state.product.stock,
                                loading: false,

                                productCategories: categories,
                                // get category
                                // category is a string, and the store has the array with categories names
                                selectedCategoryIndex: this.props.location.state.product.category != null ? categories.indexOf(this.props.location.state.product.category) : 0,

                                productSaleFormats: this.props.location.state.product.saleFormats,

                            });
                        }
                    });
                    
            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
            }


        });

    }


    editProduct() {

        console.log(this.state.productStock);

        this.setState({
            loading: true,
        });


        // add new category condition
        const addNewCategoryCondition = this.state.selectedCategoryIndex == 0 & this.state.newProductCategory != null;

        // select a created category condition
        const selectCreatedCategory = this.state.selectedCategoryIndex != null & this.state.selectedCategoryIndex != 0;

        // validate sale format
        var validateSaleFormats = true;

        // validate if any data is null
        this.state.productSaleFormats.forEach(product => {
            if (product.format == null || product.price == null || product.stock == null) {
                validateSaleFormats = false;
            }
        });

        // check information isn't null
        if (this.state.productName != null & this.state.productDescription != null & validateSaleFormats & (addNewCategoryCondition || selectCreatedCategory)) {

            // take image
            const selectedFile = document.getElementById('file_input').files[0];

            // depending on value of image it return the default iamge url or the user uploaded image
            new Promise((resolve) => {

                // if there is user image
                if (selectedFile != null) {
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

                    console.log(newProduct);

                    // create store in DB 
                    fs.collection('stores').doc(this.props.match.params.store_id).collection("products")
                        .doc(this.props.location.state.product.id)
                        .update(
                            newProduct
                        )

                        // this is to redirect after updating product
                        // .then(ref_ => {

                        //     alert("El producto ha sido editado exitosamente");


                        //     this.setState({
                        //         loading: false,
                        //     });

                        //     // navigate to products to sell
                        //     // + store id
                        //     this.props.history.push("/productsToSell/" + this.props.match.params.store_id);

                        // })

                        // .catch(e => {

                        //     this.setState({
                        //         loading: false
                        //     });


                        //     alert("Tuvimos un error, inténtalo nuevamente porfavor");

                        // });

                        // this is to update store categories if user added a new category
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

                    console.log(e);

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
        productSaleFormats.push({ "format": null, "price": null, "stock": null });

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
    changeProductSaleFormat(e, idx, item) {

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


    deleteProduct() {

        // alert("remove");

        if (window.confirm("¿Estás seguro de que quieres eliminar este producto de forma permanente?")) {

            this.setState({
                loading: true,
            });
    
            fs.collection('stores').doc(this.props.match.params.store_id).collection("products")
                .doc(this.props.location.state.product.id)
                .delete()
    
            .then(() => {
                console.log("Document successfully deleted!");
    
                alert("Producto eliminado correctamente");
                
                // navigate to products to sell
                // + store id
                this.props.history.push("/productsToSell/" + this.props.match.params.store_id);
    
                this.setState({
                    loading: false,
                });
    
            }).catch((error) => {
                console.error("Error removing document: ", error);
    
                this.setState({
                    loading: false,
                });
    
            });
            
        }

    };

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
                        alignItems: "center",
                    }}
                >

                    {/* section title */}
                    <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Editar producto
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
                        defaultIGCaption={this.state.post != null ? this.state.post.caption : ""}
                        changeProductName={(e) => this.setState({ productName: e.target.value })}
                        productName={this.state.productName}
                        changeProductDescription={(e) => this.setState({ productDescription: e.target.value })}
                        productDescription={this.state.productDescription}
                        // changeProductPrice={(e) => this.setState({ productPrice: e.target.value })}
                        // productPrice={this.state.productPrice}
                        convert_to_product={this.editProduct}
                        buttonText="Editar producto"
                        visible={this.state.productVisible}
                        changeVisible={(e) => this.setState({ productVisible: !this.state.productVisible })}
                        // changeProductStock={(e) => this.setState({ productStock: e.target.value })}
                        // productStock={this.state.productStock}

                        // category
                        changeSelectedCategory={(e) => this.setState({ selectedCategoryIndex: e.target.value })}
                        selectedCategoryIndex={this.state.selectedCategoryIndex}
                        productCategories={this.state.productCategories}
                        changeNewProductCategory={(e) => this.setState({ newProductCategory: e.target.value })}
                        newProductCategory={this.state.newProductCategory}

                        // sales format
                        productSaleFormats={this.state.productSaleFormats}
                        addOtherSaleFormat={this.addOtherSaleFormat}
                        removeSaleFormat={e => this.removeSaleFormat(e)}
                        changeProductSaleFormat={(e, idx, item) => this.changeProductSaleFormat(e, idx, item)}

                    />

                    <Button
                        align="center"
                        variant="contained"
                        color = "secondary"
                        // width = "50%"
                        // style = {{
                        //     width: "10%",
                        //     alignSelf: "center",
                        // }}
                        onClick = {this.deleteProduct}
                    >
                        Eliminar producto
                    </Button>
                    {/* Here it was the origanl form component */}

                </Container>

                :

                <CircularProgress />

        );

    }

}

export default EditProduct;