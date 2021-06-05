import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
// import Add from "@material-ui/icons/Add";
// import Close from "@material-ui/icons/Close";
// import Storefront from "@material-ui/icons/Storefront";
// import Search from "@material-ui/icons/Search";
// import Loyalty from "@material-ui/icons/Loyalty";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";

// firebase
// import { auth } from "../../../libraries/firebase/firebase";

class ProductInformationForm extends React.Component {

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
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    // backgroundColor: "green",
                    // // marginTop:10,
                    // // marginBottom: 10,
                }}
            >

                {/* original information */}
                <Grid
                    container
                    style={{
                        // display: "flex",
                        justifyContent: "center",
                        // alignContent: "center",
                        // backgroundColor: "green",

                    }}
                >

                    {/* original image */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            // alignContent: "center",
                            // backgroundColor: "red",

                        }}
                    >

                        <img
                            // src={this.state.post.image} 
                            // src={this.state.post != null ? this.state.post.media_url : this.state.productImage}
                            src = {this.props.productImage}
                            alt="image"
                            width="300px"
                            heigh="300px"
                        />

                        {/* upload photo */}
                        <input
                            style={{ margin: 10 }}
                            id="file_input"
                            type="file"
                            name="agregar foto"
                            // className="form-control p-1"
                            accept="image/png, image/jpeg"
                        />


                        <Typography
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
                            {/* Si contratas Livet, puedes agregar tu propia foto de perfil. Si es que no, te aparecerá esta foto por defecto */}
                            Esta imagen se actualizará una vez que crees o actualices el producto
                        </Typography>


                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            // alignContent: "center",
                            flexDirection: "column",
                            // backgroundColor: "yellow",

                        }}
                    >

                        {/* <Chip 
                                    label="Si quieres puedes copiar parte de este texto y pegarlo en alguno de los campos de tu producto" 
                                    // color="primary"
                                    // margin = "100"
                                    style = {{
                                        margin: 20,
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
                                // justifyContent: "center",
                                padding: 10,
                            }}
                        >
                            Si quieres puedes copiar parte de este texto y pegarlo en alguno de los campos de tu producto

                                </Typography> */}

                        {/* originla text */}
                        {/* <Typography align="center" variant="body2" component="p" gutterBottom> */}
                            {/* {this.state.post.text} */}
                            {/* {this.state.post != null ? this.state.post.caption : ""} */}
                            {/* {this.props.defaultIGCaption} */}
                        {/* </Typography> */}

                        {/* button to copy text */}
                        {/* <Button
                                    align="center"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        console.log(2ojsad);
                                    }}
                                >
                                    Copiar texto
                                </Button> */}

                    </Grid>

                </Grid>

                {/* informatino to fill */}
                <FormControl
                // style={{
                //     width: "50%",
                //     alignSelf: "center",
                // }}
                >

                    {/* title */}
                    {/* <Typography align="center" variant="h4" component="h4" gutterBottom>
                        Agregar información
                            </Typography> */}

                    {/* product name */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Nombre producto"
                        // type="Nombre producto"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ productName: e.target.value })}
                        onChange={this.props.changeProductName}
                        // value={this.state.productName}
                        value = {this.props.productName}
                    />

                    {/* product description */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Descripción del producto"
                        // type="Descripción"
                        multiline
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ productDescription: e.target.value })}
                        onChange = {this.props.changeProductDescription}

                        value={this.props.productDescription}
                    />

                    {/* product var 1 */}
                    {/* This can be different for each store (maybe the best is to create a "choose a variable first") */}
                    {/* <TextField
                                // id="standard-uncontrolled"
                                label="Tamaño del producto"
                                // type="Tamaño"
                                // defaultValue="Correo electrónico"
                                margin="normal"
                                onChange={(e) => this.setState({ productVar1: e.target.value })}
                                value={this.state.productVar1}
                            /> */}

                    {/* product price */}
                    <TextField
                        // id="standard-uncontrolled"
                        label="Precio del producto"
                        // type="Precio"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ productPrice: e.target.value })}
                        onChange={this.props.changeProductPrice}

                        // value={this.state.productDescription}
                        value={this.props.productPrice}
                        // value={this.state.productPrice}

                    />

                    {/* product extra information */}
                    {/* <TextField
                                // id="standard-uncontrolled"
                                label="Información extra del producto (como por ejemplo, condiciones del envío)"
                                multiline
                                // type="Información Extra"
                                // defaultValue="Correo electrónico"
                                margin="normal"
                                onChange={(e) => this.setState({ productExtraInformation: e.target.value })}
                                value={this.state.productExtraInformation}
                            /> */}

                    {/* activate / deactivate product */}
                    <Container
                        style = {{
                            display: "flex",
                            flexDirection: "row",
                            margin: 10,
                        }}
                    >
                        
                        <Typography
                            gutterBottom
                            variant="body2"
                            component="p"
                            // style={{
                            //     // margin: 50,
                            //     display: "flex",
                            //     flexWrap: "wrap",
                            //     backgroundColor: "rgba(173, 216, 230, 0.5)",
                            //     borderRadius: 50,
                            //     textAlign: "center",
                            //     justifyContent: "center",
                            //     padding: 10,
                            // }}
                        >
                            Visible en tienda
                        </Typography>

                        <Switch
                            checked={this.props.visible}
                            onChange={this.props.changeVisible}
                            // name="checkedA"
                            // inputProps={{ 'aria-label': 'secondary checkbox' }}
                            // label = "oaisjd"
                            // name="checkedB"
                            color="primary"
                        />
                    </Container>

                    {/* convert to post button */}
                    <Button
                        align="center"
                        variant="contained"
                        color="primary"
                        onClick={this.props.convert_to_product}

                    >
                        {/* Crear producto */}
                        {this.props.buttonText}
                    </Button>

                </FormControl>

            </Container>
        );

    }

}

export default ProductInformationForm;