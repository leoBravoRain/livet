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
    "extraInformation": "•Pedidos con al menos 2 días de anticipación \n •Entrega Concón gratis. •Entrega Reñaca, Jardín del Mar, plan Viña $1.000. •Entrega otros sectores $1000 + cobro extra dependiendo del lugar.",
    "paymentUrl": "https://app.payku.cl/botonpago/index?idboton=14257&verif=0f7014ea",
    
};


class SaleConfirmation extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            product: product,

        }

        this.confirm_sale = this.confirm_sale.bind(this);

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

        //         // this.props.history.push('/SaleConfirmation/');
        //     }

        //     this.setState({
        //         loading: false,
        //     });

        // });

    }


    confirm_sale() {

        // this.setState({
        //     loading: true,
        // });

        // alert("go to payku");

        // prototype
        window.location.href = this.state.product.paymentUrl;

        // this.props.history.push('/productsToSell');

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
                                    Confirmar la compra
                                </Typography>

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
                                        label="Nombre"
                                        type="Nombre"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ customerName: e.target.value })}
                                        value={this.state.customerName}
                                    />

                                    {/* customer address */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Dirección para enviarte el producto"
                                        type="Dirección"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ customerAddress: e.target.value })}
                                        value={this.state.customerAddress}
                                    />

                                    {/* customer email */}
                                    <TextField
                                        // id="standard-uncontrolled"
                                        label="Correo Electrónico"
                                        type="Correo Electrónico"
                                        // defaultValue="Correo electrónico"
                                        margin="normal"
                                        onChange={(e) => this.setState({ customerEmail: e.target.value })}
                                        value={this.state.customerEmail}
                                    />

                                    {/* convert to post button */}
                                    <Button
                                        align="center"
                                        variant="contained"
                                        color="primary"
                                        onClick={this.confirm_sale}
                                    >
                                        Ir a pagar
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

export default SaleConfirmation;