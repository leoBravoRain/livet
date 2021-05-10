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
const posts = [

    {
        "text": "hello this is my first IG post",
        "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
    },

    {
        "text": "This is another IG post",
        "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
    },
];


class EditSNPostToProduct extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            post: posts[0],

            // product fields
            productName: null,
            productDescription: null,
            // this can be for example "size" or "units"
            productVar1: null,
            productPrice: null,
            productImage: null,
            productExtraInformation: null,
        }

        this.convert_to_product = this.convert_to_product.bind(this);

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


    convert_to_product() {

        this.setState({
            loading: true,
        });

        // alert("convert to product");

        // prototype
        this.props.history.push('/productsToSell');

        // console.log(this);
        // auth.signInWithEmailAndPassword(email, password)

        //     .then(res => {

        //         console.log("user logged!");

        //         this.setState({
        //             loading: false,
        //         });

        //         this.props.history.push('/admin');

        //     })

        //     .catch((error) => {

        //         this.setState({
        //             loading: false,
        //         });

        //         console.log(error.code);

        //         alert(error.message);

        // });
    }


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

                            {/* list of posts */}
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

                                {/* section title */}
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Editar post para convertir en producto
                                </Typography>

                                {/* information */}

                                {/* original information */}
                                <Container>

                                    {/* original image */}
                                    <img 
                                        src={this.state.post.image} 
                                        alt="image" 
                                        width = "300px"
                                        heigh = "300px"
                                    />

                                    {/* originla text */}
                                    <Typography align="center" variant="body2" component="p" gutterBottom>
                                        {this.state.post.text}
                                    </Typography>

                                </Container>

                                {/* informatino to fill */}
                                <FormControl
                                    // style={{
                                    //     width: "50%",
                                    //     alignSelf: "center",
                                    // }}
                                >

                                    {/* product name */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Nombre producto"
                                        type="Nombre producto"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ productName: e.target.value })}
                                        value={this.state.productName}
                                    />

                                    {/* product description */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Descripción del producto"
                                        type="Descripción"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ productDescription: e.target.value })}
                                        value={this.state.productDescription}
                                    />

                                    {/* product var 1 */}
                                    {/* This can be different for each store (maybe the best is to create a "choose a variable first") */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Tamaño del producto"
                                        type="Tamaño"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ productVar1: e.target.value })}
                                        value={this.state.productVar1}
                                    />

                                    {/* product price */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Precio del producto"
                                        type="Precio"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ productPrice: e.target.value })}
                                        value={this.state.productPrice}
                                    />

                                    {/* product extra information */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Información extra del producto (como por ejemplo, condiciones del envío)"
                                        type="Información Extra"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ productExtraInformation: e.target.value })}
                                        value={this.state.productExtraInformation}
                                    />

                                    {/* convert to post button */}
                                    <Button 
                                        align="center" 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={this.convert_to_product}
                                    >
                                        Convertir a producto
                                    </Button>

                                </FormControl>

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

export default EditSNPostToProduct;