import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import Home from "./screens/home.screen";
// import Login from "./screens/login.screen";

// Material ui
// import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Info from '@material-ui/icons/Info';
import Add from "@material-ui/icons/Add";
import MailOutline from "@material-ui/icons/MailOutline";

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./libraries/material-ui/theme"

// screens

// owner
import Login from "./screens/owner/login/login.screen";
import LoginSocialNetworks from "./screens/owner/loginSocialNetworks/loginSocialNetworks.screen";
import PostsFromSocialNetworks from "./screens/owner/postsFromSocialNetworks/postsFromSocialNetworks.screen";
import EditSNPostToProduct from "./screens/owner/editSNPostToProduct/editSNPostToProduct.screen";
import ProductsToSell from "./screens/owner/productsToSell/productsToSell.screen";
import Register from "./screens/owner/register/register.screen";
import ChooseStore from "./screens/owner/chooseStore/chooseStore.screen";
import CreateNewStore from "./screens/owner/createNewStore/createNewStore.screen";
import CreateNewStoreForm from "./screens/owner/createNewStore/createNewStoreForm.screen";

// customer
import ProductsCatalog from "./screens/customer/productsCatalog/productsCatalog.screen";
import ProductDetails from "./screens/customer/productDetails/productDetails.screen";
import SaleConfirmation from "./screens/customer/saleConfirmation/saleConfirmation.screen";
// import WorkshopDetails from "./screens/workshopDetails/workshopDetails.screen";

// import Login from "./screens/login/login.screen";
// import Register from "./screens/register/register.screen";
// import TeacherHome from "./screens/teacherHome/teacherHome.screen";
// import EditCourse from "./screens/editCourse/editCourse.screen";

// ifrebase
import { auth } from "./libraries/firebase/firebase";


// Component 
class App extends Component {


  // constructor
  constructor(props) {

    // constructur of parent
    super(props);

    this.on_logout = this.on_logout.bind(this);

  };


  // // logout from admin page
  on_logout() {

    // logout
    auth.signOut().then(res => {

      alert("Has cerrado tu sesión");

    }).catch(error => {

      console.log(error);

    });

  }

  // render method
  render() {

    return (

      <MuiThemeProvider theme={theme}>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        <Router>

          <AppBar position="static">

            <Toolbar>

              {/* to home */}
              <Link to="/" className="nav-link" style={{ "flex": 1, "color": "white", "textDecoration": "none" }}>

                <Typography gutterBottom variant="h4" component="h2">

                  Livet

                </Typography>

              </Link>


              {/* Link without "to" because text has the functino to close session */}
              <Link className="nav-link" style={{ textDecoration: "none" }}>

                <Typography gutterBottom variant="h6" component="h6" onClick={this.on_logout}>

                  Cerrar sesión

							</Typography>

              </Link>

            </Toolbar>

          </AppBar>

          {/* owner */}
          <Route path = "/login" exact component = {Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/loginSocialNetworks/" exact component={LoginSocialNetworks} />
          <Route path="/postsFromSocialNetworks/:store_id" exact component={PostsFromSocialNetworks} />
          <Route path="/editSNPostToProduct/:store_id" exact component={EditSNPostToProduct} />
          <Route path="/productsToSell/:store_id" exact component={ProductsToSell} />
          <Route path="/chooseStore" exact component={ChooseStore}/>
          <Route path="/createNewStore" exact component={CreateNewStore} />
          <Route path="/createNewStoreForm" exact component={CreateNewStoreForm} />
          
          {/* customer */}
          <Route path="/:store_id" exact component={ProductsCatalog} />
          <Route path="/productDetails/:store_id/:product_id" exact component={ProductDetails} />
          <Route path="/saleConfirmation/:store_id/:product_id" exact component={SaleConfirmation} />
          {/* <Route path="/" exact component={Home} />

          <Route path="/workshopDetails" exact component={WorkshopDetails} /> */}

        </Router>

      </MuiThemeProvider>

    );

  }

}

// exporting app
export default App;
