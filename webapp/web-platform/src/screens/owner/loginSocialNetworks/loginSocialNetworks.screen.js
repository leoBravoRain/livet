import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
// import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

// firebase
import { 
    auth,
    fs,
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
            loading: false,
        }

        this.on_submit = this.on_submit.bind(this);

    }

    componentDidMount() {

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

                    // console.log("authorization code");
                    // console.log(authCode);

                    // so far everythin is correct


                    // alert("Redirecting because user has authorization code");

                    // // redirect to post from specific store 
                    // // remove the hand-written store code, it should get the store id 
                    // this.props.history.push('/postsFromSocialNetworks/' + "v1pzqati4rdnZCn4ZpYu", {authCode: authCode});
                    
                    // const url = "https://api.instagram.com/oauth/access_token \ -F client_id=477247573594243 \ -F client_secret=c58240f5ee44ea61bbda754e985dccdb \ -F grant_type=authorization_code \ -F redirect_uri=https://localhost:3000/loginSocialNetworks \ -F code=" + authCode;
                    // if I run this with curl, it works correctly 
                    // curl -X POST url
                    // const url = "https://api.instagram.com/oauth/access_token -F client_id=477247573594243 -F client_secret=c58240f5ee44ea61bbda754e985dccdb -F grant_type=authorization_code -F redirect_uri=https://localhost:3000/loginSocialNetworks -F code=" + authCode;

                    // console.log(url);

                    // // get access token
                    // const requestOptions = {
                    //     method: 'POST',
                    //     // crossDomain: true,
                    //     // mode: 'cors',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         // "Access-Control-Allow-Origin": "*"

                    //     },
                    //     // body: JSON.stringify({ title: 'React POST Request Example' })
                    // };


                    // fetch(url, requestOptions)
                    // // fetch(url)
                    // .then(response => response.json())
                    // // .then(data => this.setState({ postId: data.id }));
                    // // .catch(er => {console.log(er)})
                    // .then(data => {
                    //     console.log(data);
                    //     console.log("DATA");
                    // })
                    // .catch(er => { console.log(er) })

                    const url = "http://localhost:5001/livet2/us-central1/getAPIToken?authCode="+authCode;

                    fetch(url)
                    .then(res =>res.json())
                    .then(data => {
                        console.log(data);
                        // console.log("DATA");

                        const posts = data.result.data;

                        console.log(posts);
                        // console.log(data.result.data);
                        // redirect to posts
                        // this.props.match.params.store_id
                        // this.props.history.push("/postsFromSocialNetworks/" + this.props.match.params.store_id);
                        alert("Change code store id");

                        // console.log("/postsFromSocialNetworks/" + localStorage.getItem('store_id'));

                        // this.props.history.push("/postsFromSocialNetworks/" + this.props.match.params.store_id, {posts: posts});
                        this.props.history.push("/postsFromSocialNetworks/" + localStorage.getItem('store_id') , { posts: posts });

                    })


                };

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

    // create store on DB
    createStore() {

        // define store
        const newStore = {
            "name": "Cami cooks",
            "instagramUrl": "https://www.instagram.com/camicooks_/",
            "profilePhoto": "https://instagram.fpuq3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/97950066_1170349686638961_3025539464844804096_n.jpg?tp=1&_nc_ht=instagram.fpuq3-1.fna.fbcdn.net&_nc_ohc=gWikcq9ctcIAX8OQDqp&edm=ABfd0MgBAAAA&ccb=7-4&oh=b94a4bc8d14313227db5ff3db3795d06&oe=60BDCE66&_nc_sid=7bff83",
            // owner store (user from DB)
            "ownerId": loggedUser.uid,
        };

        // create store in DB 
        fs.collection('stores')
            .add(
                newStore
            )
            .then(ref_ => {

                alert("Tu tienda ha sido creada exitosamente");

                this.setState({
                    loading: false
                });

                // navigate to post from social networks
                // + store id
                this.props.history.push("/postsFromSocialNetworks/" + ref_.id);

            })

            .catch(e => {

                this.setState({
                    loading: false
                });


                alert("Tuvimos un error, inténtalo nuevamente porfavor");

            });
            
    }
    // onsubmit form
    on_submit() {

        this.setState({
            loading: true,
        });


        // IG login

        // redirect to IG authorization
        window.location.replace('https://api.instagram.com/oauth/authorize?client_id=477247573594243&redirect_uri=https://localhost:3000/loginSocialNetworks&scope=user_profile,user_media&response_type=code');

        // // define store
        // const newStore = {
        //     "name": "Cami cooks",
        //     "instagramUrl": "https://www.instagram.com/camicooks_/",
        //     "profilePhoto": "https://instagram.fpuq3-1.fna.fbcdn.net/v/t51.2885-19/s320x320/97950066_1170349686638961_3025539464844804096_n.jpg?tp=1&_nc_ht=instagram.fpuq3-1.fna.fbcdn.net&_nc_ohc=gWikcq9ctcIAX8OQDqp&edm=ABfd0MgBAAAA&ccb=7-4&oh=b94a4bc8d14313227db5ff3db3795d06&oe=60BDCE66&_nc_sid=7bff83",
        //     // owner store (user from DB)
        //     "ownerId": loggedUser.uid,
        // };

        // // create store in DB 
        // fs.collection('stores')
        // .add(
        //     newStore
        // )
        // .then(ref_ => {

        //     alert("Tu tienda ha sido creada exitosamente");

        //     this.setState({ 
        //         loading: false 
        //     });

        //     // navigate to post from social networks
        //     // + store id
        //     this.props.history.push("/postsFromSocialNetworks/" + ref_.id);

        // })
    
        // .catch (e => {

        //     this.setState({ 
        //         loading: false 
        //     });


        //     alert("Tuvimos un error, inténtalo nuevamente porfavor");

        // });

    };

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

                                {/* sync with IG account */}
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Sincronizar con tu tienda de Instagram
                                </Typography>

                                <Typography align="center" variant="body2" component="p" gutterBottom>
                                    Para poder sincronizar tu cuenta de IG con tu propia página web, debes registrarte con la cuenta de IG de tu tienda
                                </Typography>

                                <Button align="center" variant="contained" color="primary"
                                    onClick={() => {

                                        this.on_submit();

                                        // this.props.history.push('/postsFromSocialNetworks');
                                        // alert("go to IG posts page");
                                    }}
                                >

                                    Sincronizar con tienda IG

                                </Button>

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

export default LoginSocialNetworks;