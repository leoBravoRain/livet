import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from '@material-ui/core/Grid';

// firebase
import { 
    auth,
    // fs,
} from "../../../libraries/firebase/firebase";


// logged user
var loggedUser = null;

class LoginSocialNetworks extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: true,
        }

        this.on_submit = this.on_submit.bind(this);

    }

    componentDidMount() {

        console.log("load login with sn component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // assign logged user to user var
                loggedUser = user;

                // // redirect
                // this.props.history.push('/productsToSell');

                // IG Login API
                // console.log(this.props.location);
                // get authorization code
                const authCode = this.props.location.search.replace("?code=","");

                // console.log("AUTH CODE: " + authCode);

                // console.log(authCode);

                if (authCode) {

                    const domain = "https://us-central1-livet2.cloudfunctions.net/getAPIToken";
                    // const domain = "http://localhost:5001/livet2/us-central1/getAPIToken";
                    const url = domain + "?authCode=" + authCode + "&requestType=posts";

                    fetch(url)
                    .then(res =>res.json())
                    .then(data => {
                        // console.log(data);
                        // console.log("DATA");

                        const posts = data.result.data;

                        // console.log(posts);
                        // console.log(data.result.data);
                        // redirect to posts
                        // this.props.match.params.store_id
                        // this.props.history.push("/postsFromSocialNetworks/" + this.props.match.params.store_id);
                        // alert("Change code store id");

                        // this.setState({
                        //     loading: false,
                        // });

                        // console.log("/postsFromSocialNetworks/" + localStorage.getItem('store_id'));

                        // this.props.history.push("/postsFromSocialNetworks/" + this.props.match.params.store_id, {posts: posts});
                        this.props.history.push("/postsFromSocialNetworks/" + localStorage.getItem('store_id') , { posts: posts });

                    })


                }

                // no auth code
                else {
                    this.setState({
                        loading: false,
                    });
                }

            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
            }

            // this.setState({
            //     loading: false,
            // });

        });

    }

    // onsubmit form
    on_submit() {

        this.setState({
            loading: true,
        });


        // IG login

        // redirect to IG authorization
        const urlRedirect = "https://livet2.web.app/loginSocialNetworks";
        // const urlRedirect = "https://localhost:3000/loginSocialNetworks/";
        window.location.replace('https://api.instagram.com/oauth/authorize?client_id=477247573594243&redirect_uri=' + urlRedirect + '&scope=user_profile,user_media&response_type=code');

    };

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
                        }}
                    >

                        {/* sync with IG account */}
                        <Typography align="center" variant="h4" component="h4" gutterBottom>
                            Sincronizar con tu tienda de Instagram
                        </Typography>

                        <Typography align="center" variant="body2" component="p" gutterBottom>
                            Para poder obtener los posteos de tu cuenta de Instagram, debes autorizar el uso de datos directamente en Instagram
                        </Typography>

                        <Button align="center" variant="contained" color="primary"
                            onClick={() => {

                                this.on_submit();

                                // this.props.history.push('/postsFromSocialNetworks');
                                // alert("go to IG posts page");
                            }}
                        >

                            Sincronizar con mi tienda de Instagram

                        </Button>

                    </Container>

                :

                    <CircularProgress />

        );

    }

}

export default LoginSocialNetworks;