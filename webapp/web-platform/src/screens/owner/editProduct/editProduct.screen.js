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
            productPrice: null,
            // productImage: "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
            // productExtraInformation: null,
        }

        this.editProduct = this.editProduct.bind(this);

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

                console.log(this.props.location.state.product);
                this.setState({

                    // previous page send this data
                    productName: this.props.location.state.product.name,
                    productDescription: this.props.location.state.product.description,
                    productPrice: this.props.location.state.product.price,
                    productImage: this.props.location.state.product.image,


                    loading: false,
                });
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


    editProduct() {

        // NEWWWWWWWWWW
        this.setState({
            loading: true,
        });

        // check information isn't null
        if (this.state.productName != null & this.state.productDescription != null & this.state.productPrice != null) {

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
                        "price": this.state.productPrice,
                        // "image": this.state.productImage,
                        "image": downloadURL,
                        // "extraInformation": this.state.productExtraInformation,
                        "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
                    };

                    // create store in DB 
                    fs.collection('stores').doc(this.props.match.params.store_id).collection("products")
                        .doc(this.props.location.state.product.id)
                        .update(
                            newProduct
                        )
                        .then(ref_ => {

                            alert("El producto ha sido editado exitosamente");


                            this.setState({
                                loading: false,
                            });

                            // navigate to products to sell
                            // + store id
                            this.props.history.push("/productsToSell/" + this.props.match.params.store_id);

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
                        changeProductPrice={(e) => this.setState({ productPrice: e.target.value })}
                        productPrice={this.state.productPrice}
                        convert_to_product={this.editProduct}
                        buttonText="Editar producto"
                    />


                    {/* Here it was the origanl form component */}

                </Container>

                :

                <CircularProgress />

        );

    }

}

export default EditProduct;