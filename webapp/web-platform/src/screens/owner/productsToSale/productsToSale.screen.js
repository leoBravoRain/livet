import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Modal from '@material-ui/core/Modal';
import PlayArrow from '@material-ui/icons/PlayArrow';
// import Schedule from '@material-ui/icons/Schedule';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// firebase
import { auth } from "../../../libraries/firebase/firebase";


// prototype post
const products = [

    {
        "name": "Panqueques de queso crema",
        "description": "Panqueques hechos con masa integral",
        "var1": "10 unidades",
        "price": 4500,
        "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
        "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar."
    },

    {
        "name": "Torta de manjar",
        "productDescription": "Torta hecha con masa integral",
        "var1": "18 cm",
        "price": 9500,
        "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
        "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar."
    },
];


class ProductsToSell extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            products: products,
        }

    }

    componentDidMount() {

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // redirect
                // this.props.history.push('/productsToSell');

            }

            else {

                // console.log("user no logged");

                this.props.history.push('/login');
            }

            this.setState({
                loading: false,
            });

        });

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

                            {/* list of products */}
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

                                {/* title */}
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Productos a la venta en tu página
                                </Typography>

                                {/* each post */}
                                {
                                    this.state.products.map((product) => {

                                        return (

                                            // each product structure
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        image={product.image}
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="300"

                                                    // title={workshop.name}
                                                    />

                                                    {/* contentn */}
                                                    <CardContent>

                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {product.name}
                                                        </Typography>

                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {product.description}
                                                        </Typography>

                                                    </CardContent>

                                                </CardActionArea>


                                                {/* <CardActions>

                                                    <Button size="small" color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                            // this.setState({
                                                            //     toBuyModal: true,
                                                            // });

                                                            // alert("See details")
                                                            this.props.history.push('/editSNPostToProduct');
                                                        }}
                                                    >

                                                        <PlayArrow /> Ver

                                                    </Button>

                                                </CardActions> */}

                                            </Card>

                                        );
                                    })
                                }

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

export default ProductsToSell;