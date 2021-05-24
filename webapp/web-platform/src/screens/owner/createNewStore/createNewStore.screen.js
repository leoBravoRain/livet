import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

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
} from "../../../libraries/firebase/firebase";




class CreateNewStore extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
        }

        // // this.convert_to_product = this.convert_to_product.bind(this);

    };

    componentDidMount() {

        console.log("load create new store component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // // redirect
                // this.props.history.push('/productsToSell');
                this.setState({
                    // post: this.props.location.state.post,
                    // // initial image
                    // productImage: this.props.location.state.post.media_url,
                    loading: false,
                });
            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
                
                this.setState({
                    loading: false,
                });
            }


        });

    }


    // convert_to_product() {

    //     this.setState({
    //         loading: true,
    //     });

    //     // define store
    //     const newProduct = {
    //         "name": this.state.productName,
    //         "description": this.state.productDescription,
    //         "var1": this.state.productVar1,
    //         "price": this.state.productPrice,
    //         "image": this.state.productImage,
    //         "extraInformation": this.state.productExtraInformation,
    //         "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
    //     };

    //     // create store in DB 
    //     fs.collection('stores').doc(this.props.match.params.store_id).collection("products")
    //         .add(
    //             newProduct
    //         )
    //         .then(ref_ => {

    //             alert("El producto ha sido agregado exitosamente");

    //             this.setState({
    //                 loading: false,
    //             });

    //             // navigate to products to sell
    //             // + store id
    //             this.props.history.push("/productsToSell/" + this.props.match.params.store_id);

    //         })

    //         .catch(e => {

    //             this.setState({
    //                 loading: false
    //             });


    //             alert("Tuvimos un error, inténtalo nuevamente porfavor");

    //         });
    // }


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

                        {/* title */}
                        <Typography align="center" variant="h4" component="h4" gutterBottom>
                            Crear nueva tienda
                        </Typography>

                        {/* information */}
                        <Typography align="center" variant="body2" component="p" gutterBottom>
                            Esta plataforma obtiene tus posteos de Instagram y con estos tú puedes elegir cuales de ellos corresponderán a productos a vender en tu tienda.
                        </Typography>
                        <Typography align="center" variant="body2" component="p" gutterBottom>
                            El primer paso es sincronizar tu cuenta de tienda de Instagram, para poder obtener los posteos
                        </Typography>
                        

                        {/* go to link with IG account */}
                        <Button
                            align="center"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // console.log('/productsToSell/' + store.id)
                                // this.props.history.push('/productsToSell/' + store.id)
                                // alert("go to synchornize with IG account");
                                // this.props.history.push('/createNewStore')

                                // go to IG authorization 
                                const redirect_to = "https://livet2.web.app/createNewStoreForm";
                                // const redirect_to = "https://localhost:3000/createNewStoreForm";
                                window.location.replace('https://api.instagram.com/oauth/authorize?client_id=477247573594243&redirect_uri=' + redirect_to + '&scope=user_profile,user_media&response_type=code');
                            }}
                        >
                            Sincronizar mi cuenta de Instagram
                        </Button>

                    </Container>

                :

                <CircularProgress />

        );

    }

}

export default CreateNewStore;