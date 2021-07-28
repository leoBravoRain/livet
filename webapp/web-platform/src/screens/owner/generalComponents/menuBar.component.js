import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { 
    Button,
    IconButton,
} from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Storefront from "@material-ui/icons/Storefront";
import Search from "@material-ui/icons/Search";
import Loyalty from "@material-ui/icons/Loyalty";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import WhatsApp from "@material-ui/icons/WhatsApp";

import Drawer from '@material-ui/core/Drawer';
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';

// firebase
// import { auth } from "../../../libraries/firebase/firebase";

class MenuBar extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

    }

    render() {

        return (

            
            <Container
                // container
                // Grid
                // spacing={3}
                style = {{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    // backgroundColor: "green",
                    // // marginTop:10,
                    // // marginBottom: 10,
                }}
            >

                <Drawer
                    variant="temporary"
                    width={200}
                    openSecondary={true}
                    open={this.props.openNavMenu}
                    onClose={this.props.onCloseNavMenu}
                >
                    
                    <MenuItem onClick={this.props.goToChooseStore}> 
                        <Search style = {{marginRight: 10}}/> 
                        Mis tiendas
                    </MenuItem>

                    <MenuItem onClick={this.props.goToSocialNetworkPosts}>
                        <Add style={{ marginRight: 10 }}/>  
                        Agregar producto
                    </MenuItem>

                    <MenuItem onClick={this.props.goToProductsToSell}>
                        <Loyalty style={{ marginRight: 10 }}/>
                        Productos
                    </MenuItem>

                    <MenuItem onClick={this.props.goToSales}>
                        <MonetizationOn style={{ marginRight: 10 }}/>
                        Ventas
                    </MenuItem>

                    <MenuItem onClick={this.props.goToStore}>
                        <Storefront style={{ marginRight: 10 }}/>
                        Ir a la tienda
                    </MenuItem>


                    <MenuItem onClick={() => {
                        const message = "¡Hola! Necesito ayuda con Livet";

                        // go to wstp
                        window.open("https://wa.me/" + "+56937827142" + "/?text=" + encodeURI(message));
                    }}>

                        <WhatsApp style={{ marginRight: 10 }} />
                        Hablar con Livet ahora
                    </MenuItem>


                    <MenuItem onClick={this.props.logout}>
                        <Close style={{ marginRight: 10 }}/>
                        Cerrar sesión
                    </MenuItem>


                </Drawer>

                <Container
                    style={{
                        alignSelf: "right",
                        margin: 20,
                        // left: 
                        // backgroundColor: "red",
                    }}
                >
                    <IconButton
                        onClick={this.props.onClickOpenNavMenu}
                        // align = "left"
                        style={{
                            alignSelf: "right",
                            // left: 
                            // backgroundColor: "yellow",
                        }}
                    >
                        {/* Menu     */}

                        <MenuIcon />

                    </IconButton>

                </Container>

                {/* <Grid
                    item
                    xs={12}
                    md={4}
                > */}

                    {/* choose store */}
                    {/* <Button align="center" variant="contained" color="primary"
                        onClick={this.props.goToChooseStore}
                        >
                        <Search/>
                        Tiendas
                    </Button> */}

                    {/* social network posts */}
                    {/* <Button align="center" variant="contained" color="primary"
                        onClick={this.props.goToSocialNetworkPosts}
                    >
                        <Add /> 
                        Agregar producto
                    </Button> */}

                {/* </Grid> */}

                {/* <Grid
                    item
                    xs={12}
                    md={4}
                > */}

                    {/* products to sell */}
                    {/* <Button align="center" variant="contained" color="primary"
                        onClick={this.props.goToProductsToSell}
                    >
                        <Loyalty/>
                        Productos
                    </Button> */}

                    {/* sales */}
                    {/* <Button align="center" variant="contained" color="primary"
                        onClick={this.props.goToSales}
                    >
                        <MonetizationOn />
                        Ventas
                    </Button> */}

                    {/* go to store */}
                    {/* <Button align="center" variant="contained" color="primary"
                        onClick={this.props.goToStore}
                    >
                        <Storefront/>
                        Ir a la tienda
                    </Button> */}
{/* 
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={4}
                > */}

                    {/* logout */}
                    {/* <Button align="center" variant="contained" color="primary"
                        onClick={this.props.logout}
                        >
                        <Close/>
                        Cerrar sesión
                    </Button> */}

                {/* </Grid> */}

            </Container>
        );

    }

}

export default MenuBar;