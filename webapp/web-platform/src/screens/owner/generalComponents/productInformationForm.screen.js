import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
// import Add from "@material-ui/icons/Add";
// import Close from "@material-ui/icons/Close";
// import Storefront from "@material-ui/icons/Storefront";
// import Search from "@material-ui/icons/Search";
// import Loyalty from "@material-ui/icons/Loyalty";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";

import Delete from '@material-ui/icons/Delete';

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
                    alignItems: "center",
                    // backgroundColor: "green",
                    // // marginTop:10,
                    // // marginBottom: 10,
                }}
            >

                {/* activate / deactivate product */}
                <Container
                    style={{
                        // backgroundColor: "red",
                        display: "flex",
                        flexDirection: "row",
                        margin: 20,
                        justifyContent: "center",
                    }}
                >

                    <Typography
                        gutterBottom
                        variant="body1"
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

               
               {/* image */}
                <Grid
                    container
                    // style={{
                    //     // display: "flex",
                    //     // justifyContent: "center",
                    //     // alignContent: "center",
                    //     // backgroundColor: "green",

                    // }}
                >

                    {/* image */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "red",

                        }}
                    >

                        <img
                            // src={this.state.post.image} 
                            // src={this.state.post != null ? this.state.post.media_url : this.state.productImage}
                            src={this.props.productImage}
                            alt="image"
                            width="300px"
                            heigh="300px"
                        />
                    </Grid>


                    <Grid
                        item
                        xs={12}
                        md={6}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "yellow",

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
                            Foto del producto
                        </Typography>
                        {/* upload photo */}
                        <input
                            style={{ margin: 10 }}
                            id="file_input"
                            type="file"
                            name="agregar foto"
                            // className="form-control p-1"
                            accept="image/png, image/jpeg"
                            onChange={this.props.changeProductImage}
                        />


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
                            Esta imagen se actualizará una vez que crees o actualices el producto
                        </Typography> */}


                    </Grid>

                </Grid>


                {/* informatino to fill */}
                <FormControl
                // style={{
                //     // width: "50%",
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
                        variant = "outlined"
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
                        variant="outlined"
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


                    {/* category */}
                    {/* select category */}
                    <Typography
                        align = "center"
                        gutterBottom
                        variant="h6"
                        component="h6"
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
                        Categoría del producto
                    </Typography>

                    {/* {
                        // greater than 1 because it is 1 elmeent by default (add new category)
                        this.props.productCategories != null && this.props.productCategories.length > 1 && */}

                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={this.props.selectedCategoryIndex}
                        onChange={this.props.changeSelectedCategory}
                    >
                        {
                            this.props.productCategories.map((category, idx) => {
                                return (
                                    <option value={idx}>{category}</option>
                                )
                            })
                        }
                    </Select>
                    {/* } */}

                    {/* Create new category */}
                    {
                        this.props.selectedCategoryIndex == 0 && 

                            <TextField
                                // id="standard-uncontrolled"
                                label="Nombre de nueva categoría"
                                variant="outlined"
                                // type="Nombre producto"
                                // defaultValue="Correo electrónico"
                                margin="normal"
                                // onChange={(e) => this.setState({ productName: e.target.value })}
                                onChange={this.props.changeNewProductCategory}
                                // value={this.state.productName}
                                value={this.props.newProductCategory}
                            />
                    }
                    

                    {/* sale formats */}
                    <Container
                        style = {{
                            // backgroundColor: "red",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent:"center",
                            alignItems: "center",
                        }}
                    >

                        <Typography
                            align="center"
                            gutterBottom
                            variant="h6"
                            component="h6"
                            // style={{
                            //     margin: 30,
                            //     // display: "flex",
                            //     // flexWrap: "wrap",
                            //     // backgroundColor: "rgba(173, 216, 230, 0.5)",
                            //     // borderRadius: 50,
                            //     // textAlign: "center",
                            //     // justifyContent: "center",
                            //     // padding: 10,
                            // }}
                        >
                            Formatos de venta
                        </Typography>

                        {/* lsit of formats */}
                        {
                            this.props.productSaleFormats.map((format, idx) => {
                            // for(var i = 0; )
                            // for (var i = 0; i < productSaleFormats.length; i++) {

                                return(
                                    <Grid
                                        container
                                        spacing = {3}
                                    >

                                        {/* product format */}
                                        <Grid
                                            item
                                            xs={12}
                                            md={3}
                                        >

                                            <TextField
                                                // id="standard-uncontrolled"
                                                label="Formato de venta"
                                                variant="outlined"
                                                // type="number"
                                                key = {idx}
                                                // defaultValue="Correo electrónico"
                                                margin="normal"
                                                // onChange={(e) => this.setState({ productPrice: e.target.value })}
                                                onChange={(e)=>this.props.changeProductSaleFormat(e, idx,"format")}
                                                // onChange={this.props.changeProductSaleFormat(e, idx)}
                                                
                                                // value={this.state.productDescription}
                                                value={this.props.productSaleFormats[idx].format}
                                                // value={this.state.productPrice}
                                                
                                                />

                                        </Grid>
                
                                        {/* product price */}
                                        <Grid
                                            item
                                            xs={12}
                                            md={3}
                                        >
                                            <TextField
                                                variant="outlined"
                                                // id="standard-uncontrolled"
                                                label="Precio del producto"
                                                type="number"
                                                // defaultValue="Correo electrónico"
                                                margin="normal"
                                                // onChange={(e) => this.setState({ productPrice: e.target.value })}
                                                // onChange={this.props.changeProductPrice}
                                                
                                                // // value={this.state.productDescription}
                                                // value={this.props.productPrice}
                                                onChange={(e) => this.props.changeProductSaleFormat(e, idx, "price")}
                                                value={this.props.productSaleFormats[idx].price}
                                                // value={this.state.productPrice}
                                                
                                                />
                                        </Grid>
                
                                        {/* stock */}
                                        <Grid
                                            item
                                            xs={12}
                                            md={3}
                                        >
                                            <TextField
                                                variant = "outlined"
                                                // id="standard-uncontrolled"
                                                label="Unidades en stock"
                                                // multiline
                                                type="number"
                                                // defaultValue="Correo electrónico"
                                                margin="normal"
                                                style = {{
                                                    backgroundColor: this.props.productSaleFormats[idx].stock != null && this.props.productSaleFormats[idx].stock == 0 ? "red": "white",
                                                }}
                                                // onChange={this.props.changeProductStock}
                                                // value={this.props.productStock}
                                                onChange={(e) => this.props.changeProductSaleFormat(e, idx, "stock")}
                                                value={this.props.productSaleFormats[idx].stock}

                                            />

                                        </Grid>

                                        {/* remove from formats */}
                                        <Grid
                                            item
                                            xs={12}
                                            md={3}
                                            style = {{
                                                // backgroundColor: "red",
                                                display: "flex",
                                                // justifyContent: "left",
                                                // alignItems: "left",
                                            }}
                                        >
                                            <Button
                                                align="center"
                                                // variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    // console.log("2ojsad");
                                                    // alert("add other");
                                                    this.props.removeSaleFormat(idx);

                                                }}
                                            >   
                                                <Delete />
                                                {/* Eliminar */}
                                            </Button>

                                        </Grid>

                                    </Grid>
                                )

                            })

                        }

                        {/* add other format */}
                        <Button
                            align="center"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                // console.log("2ojsad");
                                // alert("add other");
                                this.props.addOtherSaleFormat();
                            }}
                        >
                            Agregar formato de venta
                        </Button>

                    {/* sale formats */}
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