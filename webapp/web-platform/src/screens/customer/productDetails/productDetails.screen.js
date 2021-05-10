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
import Grid from '@material-ui/core/Grid';

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
// import { auth } from "../../config/firebase";


// prototype post
const product = {
    "name": "Panqueques de queso crema",
    "description": "Panqueques hechos con masa integral",
    "var1": "10 unidades",
    "price": 4500,
    "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
    "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar."
};


class ProductDetails extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            product: product,
        }

        // this.convert_to_product = this.convert_to_product.bind(this);

    }

    componentDidMount() {

        // console.log(this.state.posts);

        // this.setState({
        //     loading: true,
        // });

        // // check if user is logged
        // auth.onAuthStateChanged((user) => {

        //     if (user) {

        //         this.props.history.push('/');

        //     }

        //     else {

        //         // console.log("user no logged");

        //         // this.props.history.push('/EditSNPostToProduct/');
        //     }

        //     this.setState({
        //         loading: false,
        //     });

        // });

    }


    // convert_to_product() {

    //     this.setState({
    //         loading: true,
    //     });

    //     // alert("convert to product");

    //     // prototype
    //     this.props.history.push('/productsToSell');

    //     // console.log(this);
    //     // auth.signInWithEmailAndPassword(email, password)

    //     //     .then(res => {

    //     //         console.log("user logged!");

    //     //         this.setState({
    //     //             loading: false,
    //     //         });

    //     //         this.props.history.push('/admin');

    //     //     })

    //     //     .catch((error) => {

    //     //         this.setState({
    //     //             loading: false,
    //     //         });

    //     //         console.log(error.code);

    //     //         alert(error.message);

    //     // });
    // }


    render() {

        return (

            <Grid
                container
                spacing={3}
            >


                {
                    !this.state.loading

                        ?

                        <Grid item xs={12} sm={12}
                        // style={{ backgroundColor: "yellow" }}
                        >

                            <Paper
                                style={{
                                    padding: 20,
                                    margin: 10,
                                    alignContent: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                }}

                                elevation={3}
                            >

                                {/* information */}

                                {/* original information */}
                                <Container>

                                    {/* original image */}
                                    <img
                                        src={this.state.product.image}
                                        alt="image"
                                        width="300px"
                                        heigh="300px"
                                    />

                                    {/* name */}
                                    <Typography align="center" variant="h2" component="h2" gutterBottom>
                                        {this.state.product.name}
                                    </Typography>

                                    {/* description */}
                                    <Typography align="center" variant="body2" component="p" gutterBottom>
                                        {this.state.product.description}
                                    </Typography>

                                    {/* extra information */}
                                    <Typography align="center" variant="body2" component="p" gutterBottom>
                                        {this.state.product.extraInformation}
                                    </Typography>

                                    {/* var 1 */}
                                    <Typography align="center" variant="body2" component="p" gutterBottom>
                                        {this.state.product.var1}
                                    </Typography>

                                    {/* price */}
                                    <Typography align="center" variant="body2" component="p" gutterBottom>
                                        $ {this.state.product.price.toLocaleString()}
                                    </Typography>

                                    {/* to buy button */}
                                    <Button 
                                        size="small" 
                                        color="primary"
                                        variant="contained"
                                        onClick={() => {
                                            // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                            // this.setState({
                                            //     toBuyModal: true,
                                            // });

                                            // alert("Go to buy");
                                            this.props.history.push('/saleConfirmation');
                                        }}
                                    >

                                        Comprar

                                    </Button>

                                </Container>

                            </Paper>

                        </Grid>

                        :

                        <CircularProgress />

                }
                {/* </Paper> */}
            </Grid>
        );

    }

}

export default ProductDetails;