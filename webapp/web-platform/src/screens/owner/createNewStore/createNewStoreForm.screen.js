import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
// import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

import StoreInformationForm from "../generalComponents/storeInformationForm.component";


// firebase
import {
    auth,
    fs,
    st,
} from "../../../libraries/firebase/firebase";

import MenuBar from "../generalComponents/menuBar.component";

// logged user
var loggedUser = null;

class CreateNewStoreForm extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,

            // store information
            name: null,
            description: null,
            instagramUrl: null,
            profilePhoto: "data:image/png;base64,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",
            whatsappNumber: null,

            // this must to be in this way, because in product details it analyzeis if length >0
            aditionalInformationToDisplayToCustomer: "",

            // bank data
            addBankAccountData: false,
            bankName: null,
            accountType: null,
            bankAccountNumber: null,
            bankOwnerAccount: null,
            bankRutOwner: null,
            bankAccountEmail: null,

        };

        this.createStore = this.createStore.bind(this);

    }

    componentDidMount() {

        console.log("load create new store form component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // assign logged user to user var
                loggedUser = user;

                // loading false
                this.setState({
                    // name: data.result.username,
                    loading: false,
                });


            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
            }

        //     // this.setState({
        //     //     loading: false,
        //     // });

        });

    }

    // create store on DB
    createStore() {

        this.setState({
            loading: true,
        });

        // check information isn't null
        if (this.state.name != null & this.state.instagramUrl != null & this.state.description != null) {
            
            // take image
            const selectedFile = document.getElementById('file_input').files[0];
            
            // crate store id
            // this is to get the store name in the url
            const storeId = this.state.name.replace(/\s/g, "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

            // console.log(storeId);
            // alert(storeId);
            
            // check if ID exists
            fs.collection('stores')
                .doc(storeId)
                .get()
                .then(doc_ => {

                    // check if doc with same ID exists
                    if (doc_.exists) {

                        // message to user
                        alert("Ya existe una tienda con el mismo nombre, intenta otro nombre");
                        this.setState({
                            loading: false,
                        });
                    }

                    // if ID does not exists
                    else {

                        // alert("create new store");
                        
                        // depending on value of image it return the default iamge url or the user uploaded image
                        new Promise ((resolve) => {
            
                            // if there is user image
                            if (selectedFile != null) {
                                // alert("image");
                                // resolve(
                                    // Create a root reference
                                    var storageRef = st.ref('stores/' + loggedUser.uid + "/profileStore/" + selectedFile.name);
            
                                    // store file in firebase store
                                    storageRef.put(selectedFile).then(snapshot => {
            
                                        // get url of fiile
                                        // return snapshot.ref.getDownloadURL();
                                        resolve(snapshot.ref.getDownloadURL());
            
                                    })
                                // )
                            }
                
                            else{
                                // alert("no image");
            
                                // default image
                                resolve("data:image/png;base64,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")
                            }
            
                        })
            
                            // if it's ok
                            .then(downloadURL => {
            
                                // console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            
                                console.log(downloadURL);
                                
                                // define store
                                var newStore = {
                                    "name": this.state.name,
                                    "instagramUrl": this.state.instagramUrl,
                                    "whatsappNumber": this.state.whatsappNumber,
                                    "description": this.state.description,
                                    // "profilePhoto": this.state.profilePhoto,
                                    // "profilePhoto": "data:image/png;base64,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",
                                    "profilePhoto": downloadURL,
                                    // owner store (user from DB)
                                    "ownerId": loggedUser.uid,
                                    "aditionalInformationToDisplayToCustomer": this.state.aditionalInformationToDisplayToCustomer,
            
                                    // bank data
                                    "addBankAccountData": this.state.addBankAccountData,
                                };
            
                                // if add bank account
                                if (this.state.addBankAccountData){
            
                                    // bankAccountEmail
            
                                    newStore["bankName"] = this.state.bankName;
                                    newStore["accountType"] = this.state.accountType;
                                    newStore["bankAccountNumber"] = this.state.bankAccountNumber;
                                    newStore["bankOwnerAccount"] = this.state.bankOwnerAccount;
                                    newStore["bankRutOwner"] = this.state.bankRutOwner;
                                    newStore["bankAccountEmail"] = this.state.bankAccountEmail;
                                    
                                };
            
                                
                                // console.log("create new store" + newStore);
                                // create store in DB 
            
                                fs.collection('stores')
            
                                    // automatic ID
                                    // .add(
                                    //     newStore
                                    // )
            
                                    // custom ID
                                    .doc(storeId) // store name
                                    .set(newStore)
                                    .then(ref_ => {
                                        
                                        // console.log()
                                        // console.log(ref_)
            
                                        alert("Tu tienda ha sido creada exitosamente");
                    
                                        this.setState({
                                            loading: false
                                        });
                    
                                        // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                                        // localStorage.setItem('store_id', ref_.id);
                                        localStorage.setItem('store_id', storeId);
                    
                                        // navigate to post from social networks
                                        // + store id
                                        // this.props.history.push("/postsFromSocialNetworks/" + ref_.id);
                                        // this.props.history.push("/productsToSell/" + ref_.id);
                                        // this.props.history.push("/loginSocialNetworks/");
                                        // this.props.history.push("/addNewProductHome/" + ref_.id);
                                        this.props.history.push("/addNewProductHome/" + storeId);
                                        
                    
                                    })
                    
                                    .catch(e => {
                                        
                                        console.log("error trying to create new store")
                                        console.log(e);
            
                                        this.setState({
                                            loading: false
                                        });
                    
                    
                                        alert("Tuvimos un error, inténtalo nuevamente porfavor");
                    
                                    });
            
                            })
            
                            // error trying to upload photo
                            .catch(e => {
            
                                console.log("error trygin to upkload photo");
                                console.log(e);
            
                                this.setState({
                                    loading: false
                                });
            
            
                                alert("Tuvimos un error, inténtalo nuevamente porfavor");
            
                            });
                        
                    }
                    
                });


        }

        else {
            alert("Debes agregar toda la información antes de continuar");
            this.setState({
                loading: false,
            });
        }

    }
   

    render() {

        return (

            !this.state.loading

                ?

                    <Container
                        // item xs={12} sm={12}
                        style={{
                            // backgroundColor: "yellow" 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            // marginTop: 
                        }}
                    >

                        {/* menu */}
                        {/* <MenuBar
                            goToSocialNetworkPosts={() => {
                                // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                                localStorage.setItem('store_id', this.props.match.params.store_id);

                                // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                                // this.props.history.push("/loginSocialNetworks/");
                                this.props.history.push("/addNewProductHome/" + this.props.match.params.store_id);

                            }}

                            goToProductsToSell={() => {
                                this.props.history.push("/productsToSell/" + this.props.match.params.store_id);
                            }}

                            goToChooseStore={() => {
                                this.props.history.push("/chooseStore");
                            }}

                            goToStore={() => {
                                // open store
                                window.open(window.location.origin + "/store/" + this.props.match.params.store_id);
                            }}

                            logout={() => {

                                // logout
                                auth.signOut().then(res => {

                                    alert("Has cerrado tu sesión");

                                }).catch(error => {

                                    console.log(error);

                                });

                            }}

                            goToSales={() => {
                                this.props.history.push("/sales/" + this.props.match.params.store_id);
                            }}

                            openNavMenu={this.state.openNavMenu}
                            onCloseNavMenu={() => this.setState({ openNavMenu: false })}
                            onClickOpenNavMenu={() => { this.setState({ openNavMenu: true }) }}
                        /> */}

                        <Container
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // alignContent: "center",
                                alignItems: "center",

                                backgroundColor: "rgba(66, 135, 245,0.1)",
                                margin: 40,
                                padding: 15,
                                borderRadius: 20,
                            }}
                        >
                            {/* <Typography align="center" variant="h5" component="h5" gutterBottom
                            // backgroundColor = "primary"
                            // style = {{
                            //     backgroundColor: "rgba(66, 135, 245,0.1)",
                            //     margin: 40,
                            //     padding: 15,
                            //     borderRadius: 20,
                            // }}
                            >
                                🎊 Bienvenid@ a Livet 🎊
                                        </Typography> */}

                            <Typography align="center" variant="body2" component="p" gutterBottom
                            >
                                Ingresa toda la información sobre tu tienda 🤓
                            </Typography>

                        </Container>

                        {/* sync with IG account */}
                        <Typography align="center" variant="h4" component="h4" gutterBottom>
                            Crear tienda
                        </Typography>

                        {/* information */}
                        {/* <Typography align="center" variant="body2" component="p" gutterBottom>
                            ¡Ahora tu cuenta ya está sincronizada!
                        </Typography> */}

                        <Typography align="center" variant="body2" component="p" gutterBottom>
                            {/* Para poder crear la página, agrega la siguiente información general sobre tu tienda, la cual podrá ser vista por cualquier cliente que llegue a tu página */}
                            Agrega la información general sobre tu tienda, la cual podrá ser
                            vista por cualquier cliente que llegue a tu página.
                        </Typography>

                        {/* form */}
                        <StoreInformationForm
                            // storeImage={"data:image/png;base64,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"}
                            storeImage = {this.state.profilePhoto}
                            changeStoreName={(e) => this.setState({ name: e.target.value })}
                            storeName={this.state.name}
                            changeStoreDescription={(e) => this.setState({ description: e.target.value })}
                            storeDescription={this.state.description}
                            changeStoreInstagramUrl={(e) => this.setState({ instagramUrl: e.target.value })}
                            storeInstagramUrl={this.state.instagramUrl}
                            buttonAction={this.createStore}
                            buttonText="Crear tienda"
                            whatsappNumber={this.state.whatsappNumber}
                            changeWhatsappNumber={(e) => this.setState({ whatsappNumber: e.target.value})}
                            changeAditionAlInformationToDisplayToCustomer={(e) => this.setState({ aditionalInformationToDisplayToCustomer: e.target.value })}
                            aditionalInformationToDisplayToCustomer={this.state.aditionalInformationToDisplayToCustomer}
                            changeProfileImage={e => { 
                                this.setState({ profilePhoto: URL.createObjectURL(e.target.files[0]) }) 
                                // console.log("hlelo");
                                // alert("ioasd");
                            }}

                        // bankName
                        // accountType
                        // bankAccountNumber
                        // bankOwnerAccount
                        // bankRutOwner
                        // bankAccountEmail

                            // bank data
                            changeAddAccountData={(e) => this.setState({ addBankAccountData: !this.state.addBankAccountData })}
                            addBankAccountData={this.state.addBankAccountData}
                            changeBankName={(e) => this.setState({ bankName: e.target.value })}
                            bankName={this.state.bankName}
                            changeAccountType={(e) => this.setState({ accountType: e.target.value })}
                            accountType={this.state.accountType}
                            changeBankAccountNumber={(e) => this.setState({ bankAccountNumber: e.target.value })}
                            bankAccountNumber={this.state.bankAccountNumber}
                            changeBankOwnerAccount={(e) => this.setState({ bankOwnerAccount: e.target.value })}
                            bankOwnerAccount={this.state.bankOwnerAccount}
                            changeBankRutOwner={(e) => this.setState({ bankRutOwner: e.target.value })}
                            bankRutOwner={this.state.bankRutOwner}
                            changeBankAccountEmail={(e) => this.setState({ bankAccountEmail: e.target.value })}
                            bankAccountEmail={this.state.bankAccountEmail}
                        />

                    </Container>

                :

                    <CircularProgress />

        );

    }

}

export default CreateNewStoreForm;