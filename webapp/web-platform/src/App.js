import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

import { 
  BrowserRouter as Router, Route, Link,
  Switch,
  // Router,
  // Route,
  // Link
} from "react-router-dom";
// import { Switch } from "react-router";
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
import CreateNewProduct from "./screens/owner/createNewProduct/createNewProduct.screen";
import ProductsToSell from "./screens/owner/productsToSell/productsToSell.screen";
import Register from "./screens/owner/register/register.screen";
import ChooseStore from "./screens/owner/chooseStore/chooseStore.screen";
import CreateNewStore from "./screens/owner/createNewStore/createNewStore.screen";
import CreateNewStoreForm from "./screens/owner/createNewStore/createNewStoreForm.screen";
import Sales from "./screens/owner/sales/sales.screen";
import AddNewProductHome from "./screens/owner/createNewProduct/addNewProductHome.screen";
import EditProduct from "./screens/owner/editProduct/editProduct.screen";
import EditStore from "./screens/owner/editStore/editStore.screen";
// import SaleForm from "./screens/owner/sales/addNewSale.screen";

// customer
import ProductsCatalog from "./screens/customer/productsCatalog/productsCatalog.screen";
import ProductDetails from "./screens/customer/productDetails/productDetails.screen";
import SaleConfirmation from "./screens/customer/saleConfirmation/saleConfirmation.screen";
import ShoppingCart from "./screens/customer/shoppingCart/shoppingCart.screen";

// import WorkshopDetails from "./screens/workshopDetails/workshopDetails.screen";

// import Login from "./screens/login/login.screen";
// import Register from "./screens/register/register.screen";
// import TeacherHome from "./screens/teacherHome/teacherHome.screen";
// import EditCourse from "./screens/editCourse/editCourse.screen";

// ifrebase
import { auth } from "./libraries/firebase/firebase";
import AddNewSale from "./screens/owner/sales/addNewSale.screen";


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

          {/* <Switch> */}

            {/* <Route path="/:store_id" exact component={ProductsCatalog} />
            <Route path="/productDetails/:store_id/:product_id" exact component={ProductDetails} />
            <Route path="/saleConfirmation/:store_id/:product_id" exact component={SaleConfirmation} />

            <div> */}

              

              {/* owner */}
              <Route path = "/" exact component = {Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/loginSocialNetworks/" exact component={LoginSocialNetworks} />
              <Route path="/postsFromSocialNetworks/:store_id" exact component={PostsFromSocialNetworks} />
              <Route path="/createNewProduct/:store_id" exact component={CreateNewProduct} />
              <Route path="/productsToSell/:store_id" exact component={ProductsToSell} />
              <Route path="/chooseStore" exact component={ChooseStore}/>
              <Route path="/createNewStore" exact component={CreateNewStore} />
              <Route path="/createNewStoreForm" exact component={CreateNewStoreForm} />
              <Route path="/sales/:store_id" exact component={Sales} />
              <Route path="/addNewProductHome/:store_id" exact component={AddNewProductHome} />
              <Route path="/editProduct/:store_id/:product_id" exact component={EditProduct} />
              <Route path="/editStore/:store_id" exact component={EditStore} />
              <Route path="/addNewSaleManually/:store_id" exact component={AddNewSale} />

              {/* customer */}
              <Route path="/:store_id" exact component={ProductsCatalog} />
              <Route path="/productDetails/:store_id/:product_id" exact component={ProductDetails} />
              <Route path="/saleConfirmation/:store_id/:product_id" exact component={SaleConfirmation} />
              <Route path="/shoppingCart/:store_id" exact component={ShoppingCart}/>
              {/* <Route path="/" exact component={Home} />

              <Route path="/workshopDetails" exact component={WorkshopDetails} /> */}

            {/* </div>

          </Switch> */}

        </Router>

      </MuiThemeProvider>

    );

  }

}

// exporting app
export default App;
