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
// import Grid from '@material-ui/core/Grid';

// import Add from "@material-ui/icons/Add";
// import Close from "@material-ui/icons/Close";
// import Storefront from "@material-ui/icons/Storefront";
// import Search from "@material-ui/icons/Search";
// import Loyalty from "@material-ui/icons/Loyalty";
// import MonetizationOn from "@material-ui/icons/MonetizationOn";

// firebase
// import { auth } from "../../../libraries/firebase/firebase";

class StoreInformationForm extends React.Component {

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

                {/* informatino to fill */}
                <FormControl
                    // style={{
                    //     width: "100%",
                    //     alignSelf: "center",
                    // }}
                >

                    {/* name */}
                    <TextField
                        // variant = "oultined"
                        variant="outlined"
                        // id="standard-uncontrolled"
                        label="Nombre de la tienda"
                        // type="Nombre"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ name: e.target.value })}
                        onChange={this.props.changeStoreName}
                        // value={this.state.name}
                        value={this.props.storeName}
                    />

                    {/* description */}
                    <TextField
                        variant="outlined"
                        // id="standard-uncontrolled"
                        label="Descripción de la tienda"
                        helperText="Puedes pegar la descripción de la bio de tu tienda de Instagram"
                        multiline
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ description: e.target.value })}
                        onChange={this.props.changeStoreDescription}
                        value = {this.props.storeDescription}
                        // value={this.state.description}
                    />


                    {/* aditional information */}
                    <TextField
                        variant="outlined"
                        // id="standard-uncontrolled"
                        label="Información adicional que quieras mostrar en cada producto (por ejemplo, condiciones de envío)"
                        // type="Tamaño"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ instagramUrl: e.target.value })}
                        onChange={this.props.changeAditionAlInformationToDisplayToCustomer}
                        // value={this.state.instagramUrl}
                        value={this.props.aditionalInformationToDisplayToCustomer}
                    />

                    {/* instagram url */}
                    <TextField
                        variant="outlined"
                        // id="standard-uncontrolled"
                        label="Link de tu tienda de Instagram"
                        // type="Tamaño"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        // onChange={(e) => this.setState({ instagramUrl: e.target.value })}
                        onChange={this.props.changeStoreInstagramUrl}
                        // value={this.state.instagramUrl}
                        value={this.props.storeInstagramUrl}
                    />

                    {/* whatsapp */}
                    <TextField
                        variant="outlined"
                        // id="standard-uncontrolled"
                        label="Número de Whatsapp (ejemlpo: +56987654231)"
                        // type="Precio"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        onChange={this.props.changeWhatsappNumber}
                        value={this.props.whatsappNumber}
                    />

                    {/* facebook link */}
                    {/* <TextField
                        variant="outlined"
                        // id="standard-uncontrolled"
                        label="Link de tu tienda en Facebook"
                        // type="Precio"
                        // defaultValue="Correo electrónico"
                        margin="normal"
                        onChange={this.props.changeWhatsappNumber}
                        value={this.props.whatsappNumber}
                    /> */}


                    {/* profile photo */}
                    <Container
                        style={{
                            display: "flex",
                            flex: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            margin: 10,
                        }}
                    >

                        <Typography
                            gutterBottom
                            variant="body2"
                            component="p"
                            style={{
                                margin: 20,
                                // margin: 50,
                                // display: "flex",
                                // flexWrap: "wrap",
                                // backgroundColor: "rgba(173, 216, 230, 0.5)",
                                // borderRadius: 50,
                                // textAlign: "center",
                                // justifyContent: "center",
                                // padding: 10,
                                // fontWeight: "bold",
                            }}
                        >
                            Sube el logo de tu tienda
                        </Typography>

                        <img
                            // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA+VBMVEX///9AWWvW4Ov/cFjnTjqwtrw3UmV7i5fZ4+41UGOntcL4Z1CQnaf/bFM+V2qisb/P2uVNZXbM1N7/m4riwMLi6fFofYzrTjjmRi/hTzysoqa0kJA5WWz/aU/2v7ibpa3/vLH/5OD/eGHY2+T/opOmrrX50s2rUk3IUEMyWm3/y8Pfx8r3iHj/7uv/fGbosa/b0tn/q53zlIjtopv2iXr/7On6f2z/k4HwmZChj5PSSjqKkpvpX026TUSZUlFDY3VoVmB1VVyJVFdOWGbGUERdV2NKWGfsdWbvjYJygo70sKjtc2PWXU9tVl/Cys/szs7PsbN/VVq1Uko4BVGeAAAGhklEQVR4nO2ca1vaShSFGeAk2CbRoCcDbbxSLtpirVrbUrV4L1rt5f//mBOIVpDMnh0YFM+z1meyst6Zyd6TOG0mA0EQBEEQBEEQBEEQBEEQBEEQBEGPqpV5lZb+Veun8qpB/SQ8lpRXrZgE3HCVeptVa0F92YAWCI+36ss2zAGuruUUct8R4bILqsseiCLMvnNVl62tmgJsbipv4r4vTJiw8F59882mIcJPynvk1rYmPodbygWUcz+ZAfygBnS3qWxmCLPbxP0/mABcWVRHcxeoRWqGsLCgJswtrowPWCP8c3uVR5jDyiZxqVsbF3B1jSB0d8gpNERY2KEijFtQm+pa3bWnmqExwqglUhnejVdQ54mHMOfu0slMEWZ3KcTF+XEAP1CAmmZojpBoiT3EMQrqBumsaYYG55BoiV2Nvn2r0bncz5pgxgizn+mhzo1YUD+qN2sxId0MDRKSLbGbZPPjSITEZq0nTTM0OYeVPdpgtO3bG7LK6JuhSUKyJXa1+CY9ILVZiwl1dcYgYXZLQzjC9k1TRnVvhqYJibfEuzwpCyq5WYsHTdcMjRIW3muXVLrtW3NPB6hvhmbnUNMSu4h7abZvn3QjxmiGZgm1LTFaVSkKKr1Ziwk5qUwSalpiD5G9fVvRm7n6ZmiYsKJ/cHLuCg9Qs1mLvS71dcYsYeFST8jcvunLaFeMOmOWMLvFMGIVVPqd985J92Y4AUL6LfEuGON9+A1nBjnN0DShviX2ELXbN0YZjbTGqTOm57CibYld6QqqdrPWk/uZNYUFNiHPTt8Se+HI7Vst95KlX0WWfvHcXv6a47jNMe3WqIK6VMpzVH71D0uvJctOvubZvSqz7EpLj0jIcsvnQQhCEIIQhM+KsGaW8AuT8ItZQqrjr7JatGx95UX6yotU5tq1ePGoN6jmPsdDHnR4kYIGy64R8Ow6Byy7ffIFapezTOWhz0pU/VZnRap/q7L8/EOOXWmXAmSWmna4zEnkhEcswqPQ4dgth21OOLLQRMuU8eTIhrBsTqSOJxhPjmwJj7XqbUtwVn1Z85a/rZ9EeRwKv6pPVBUiZKwreRgKwbHzRXistytt04CZVe0kRmMuhMeYxI4lxIl2EmXrRAiLMYm2F92XsSa036J2dJMof0djzpjE5ehXjFHvrohI2gc7msLI7rfOrrSjA8w0r2gT+aeXyNNW+KA75kKcauxOBc+u07ML/2jsrhh/vFjNUyaycSLiTJo2bceA4Rm5sGTrLIztNMv+a2wnTshiI8lu/1cbUm0iy7eJokxkib9LJKIST9hFjUdwRsz5a3dWJuwk84+IS8pMsvw3USQC0bn/VXikzCTLR+nt2mq7PN0K+1TbTy438vSsL5EnlCvLFqI/k2JlyUb/eAnKzuuzO1M82qX9FIdOmrulYReZPxQDiaL6UE0KVA28gZ+F5/WEhS9l/XxEu8OERSZLu+kOuG1clAYgo4gHgyPey+TbQ6GqAyN+G+r6IC8f2l0P24kkO3/Yrv3QrlS6SH8wqvZ9vxRRxsq36u1wKFGPsdPfyqrLneFA3Uziut7KS3lvdy1Udv2QKruwfW8Xpdz/PtqpqGbtcvvi6kfjoH7cPk/kiwfeD2xnOZJjB76XFCgOdX59XD9oNLp214Sd1283vBzu7dpdux9XF9uXtfEOYDrr66EyT5zJ86yePCXfbapwvSvaTvTbUX49O2cstltCi4rzxLJACEIQPrlACEIQPr1ACEIQPr1ACEIQPr1ACEKS0LJmUslSfnPx9FaqiydI6Pn2bDo5gWqofEd/dSf5q9vkCL2gWEirrJMc0p7jXH2T+OF0YoSeX2QdXH5wjNlOsgqyvDPQN486h5YzAmAUMmkaXjCtEsdnYoQz3FiDmvOHrfw57vjMPgvCoUn0+IQvZkAIQhCCEIQgBCEIQQhCEIIQhCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBCEIQQhCEIIQhCAE4f+U0JodibA47DSthF4w0gnahBOi00oovNlCasZCMeGo9tQSCmEX59Kp+CLpLPoUE1qen1KJ/2Ziignj//EjhRQm00xoRCAEIQhBCEIQghCEIAQhCEEIQhCCEIQgBOHjEAoRsJXwue5ZEI71PfJZEI4lI4TVhOU/NZqpGiAsTvUcFg0QZjrTi2gFJgAzFX9aES2/YoQwUwms6VRgCDDSjWNPn5wbY3wQBEEQBEEQBEEQBEEQBEEQBEEQxNF/BsW0MNU+fa0AAAAASUVORK5CYII="
                            src={this.props.storeImage}
                            width="100px"
                            height="100px"
                        />

                        {/* upload photo */}
                        <input
                            style={{ margin: 10 }}
                            id="file_input"
                            type="file"
                            name="agregar foto"
                            // hint =" ioasjd"
                            // className="form-control p-1"
                            accept="image/png, image/jpeg"
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
                            Tu imagen se actualizará una vez que crees o actualices tu tienda
                        </Typography> */}

                    </Container>


                    {/* create store */}
                    <Button
                        align="center"
                        variant="contained"
                        color="primary"
                        // width = "50%"
                        // onClick={this.createStore}
                        onClick = {this.props.buttonAction}
                    >
                        {/* Crear tienda */}
                        {this.props.buttonText}
                    </Button>

                </FormControl>

            </Container>
        );

    }

}

export default StoreInformationForm;