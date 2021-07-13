import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
// import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Modal from '@material-ui/core/Modal';
import PlayArrow from '@material-ui/icons/PlayArrow';
// import Chip from '@material-ui/core/Chip';
// import Schedule from '@material-ui/icons/Schedule';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// firebase
import { auth } from "../../../libraries/firebase/firebase";

import MenuBar from "../generalComponents/menuBar.component";


class PostsFromSocialNetworks extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            posts: [],
        }

    }

    componentDidMount() {

        console.log("load posts from sn component");

        this.setState({
            loading: true,
        });

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (user) {

                // // redirect
                // this.props.history.push('/productsToSell');

                // get posts from IG (filter by store id)

                // console.log(this.props.location);

                var posts = [];

                // validation if it contains posts from IG API
                // posts is stored in state variable and is it's sent from push history (url)  from previous webpage
                if (this.props.location.state != null) {
                    if(this.props.location.state.posts != null) {
                        posts = this.props.location.state.posts;
                        // alert("post from API");
                    }
                }

                // else{
                //     alert("No POST from API (from previous webpage)");
                // }

                // validate if it has authorization IG API code
                // if (this.props.location.state.authCode) {
                    
                //     alert("authorizatino code");

                //     // get access token
                //     const requestOptions = {
                //         method: 'POST',
                //             // crossDomain: true,
                //         mode: 'cors',
                //         headers: { 
                //             'Content-Type': 'application/json', 
                //             "Access-Control-Allow-Origin":  "*"
                            
                //         },
                //         // body: JSON.stringify({ title: 'React POST Request Example' })
                //     };

                //     const url = "https://api.instagram.com/oauth/access_token \ -F client_id=477247573594243 \ -F client_secret=c58240f5ee44ea61bbda754e985dccdb \ -F grant_type=authorization_code \ -F redirect_uri=https://localhost:3000/loginSocialNetworks \ -F code=" + this.props.location.state.authCode;

                //     fetch(url, requestOptions)
                //         .then(response => response.json())
                //         // .then(data => this.setState({ postId: data.id }));
                //         .then(data => {
                //             console.log(data);
                //             console.log("DATA");
                //         });

                // }
                // else{
                //     alert("no auth code");
                // }

                // update posts
                this.setState({
                    posts: posts,
                    loading: false,
                });


            }

            else {

                // console.log("user no logged");

                this.props.history.push('/');
            }

            this.setState({
                loading: false,
            });

        });

    }

    render() {

        return (

            <Container
                // container
                // spacing={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "red",
                    justifyContent: "center",
                }}
            >

                {/* menu */}
                <MenuBar
                    goToSocialNetworkPosts={() => {
                        // set store id as local varibale because IG API cannot receive the store id in the url (becaus it has to be exact url and it changes with the store ids)
                        localStorage.setItem('store_id', this.props.match.params.store_id);

                        // this.props.history.push("/loginSocialNetworks/" + this.props.match.params.store_id);
                        this.props.history.push("/loginSocialNetworks/");
                    }}

                    goToProductsToSell={() => {
                        this.props.history.push("/productsToSell/" + this.props.match.params.store_id);
                    }}

                    goToChooseStore={() => {
                        this.props.history.push("/chooseStore");
                    }}

                    goToStore={() => {
                        // open store
                        window.open(window.location.origin + "/" + this.props.match.params.store_id);
                    }}

                    logout={() => {

                        // logout
                        auth.signOut().then(res => {

                            alert("Has cerrado tu sesión");

                        }).catch(error => {

                            console.log(error);

                        });

                    }}
                />

                {/* products list */}
                <Container
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >

                    {/* title */}
                    <Typography 
                        align="center" 
                        variant="h4" 
                        component="h4" 
                        gutterBottom
                    >
                        Posteos desde tu cuenta de Instagram
                    </Typography>

                    {/* Information */}
                    {/* <Chip
                        label="Estos son los posteos que obtuvimos directamente desde tu cuenta de Instagram. Si alguno de ellos corresponde a un producto que deseas agregar a tu tienda, ¡seleccionalo!"
                        // color="primary"
                        // margin = "100"
                        style={{
                            margin: 50,
                            backgroundColor: "rgba(173, 216, 230, 0.5)",
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
                            justifyContent: "center",
                            // alignSelf: "center",
                            padding: 10,
                        }}
                        // align = "center"
                    >
                        Estos son los posteos que obtuvimos directamente desde tu cuenta de Instagram. Si alguno de ellos corresponde a un producto que deseas agregar a tu tienda, ¡seleccionalo!
                    </Typography> */}

                    {/* list of products */}
                    {
                        !this.state.loading

                            ?

                            <Grid
                                container
                                spacing={3}
                                style={{
                                    // padding: 20,
                                    // margin: 5,
                                    // alignContent: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                    // flexDirection: "column",
                                    // backgroundColor: "green",
                                }}

                            // elevation={3}
                            >

                                {/* each post */}
                                {
                                    this.state.posts.map((post) => {

                                        return (


                                            // each product structure
                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                            >

                                                <Card>
                                                    <CardActionArea
                                                        onClick={() => {
                                                            // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                            // this.setState({
                                                            //     toBuyModal: true,
                                                            // });

                                                            // alert("See details")
                                                            // this.props.history.push('/editProduct/' + this.props.match.params.store_id + "/" + product.id, { product: product });
                                                            this.props.history.push('/createNewProduct/' + this.props.match.params.store_id, { "post": post });
                                                        }}

                                                    >
                                                        <CardMedia
                                                            image={post.media_url}
                                                            component="img"
                                                            alt="Quizás esto es un video o un albúm de fotos. Por ahora solo podemos cargar imágenes únicas :("
                                                            height="200"

                                                        // title={workshop.name}
                                                        />

                                                        {/* contentn */}
                                                        <CardContent>

                                                            {/* product name */}
                                                            {/* <Typography gutterBottom variant="h5" component="h2"> */}
                                                            <Typography align="center" variant="body2" color="textSecondary" component="p">
                                                                {post.caption.substring(0, 80)} ...
                                                            </Typography>

                                                        </CardContent>

                                                    </CardActionArea>

                                                    <CardActions
                                                        style={{
                                                            // backgroundColor: "red",
                                                            justifyContent: "center",
                                                        }}
                                                    >

                                                        <Button
                                                            align="center"
                                                            size="small"
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={() => {
                                                                // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                                // this.setState({
                                                                //     toBuyModal: true,
                                                                // });

                                                                // alert("See details")
                                                                this.props.history.push('/createNewProduct/' + this.props.match.params.store_id, { "post": post });
                                                            }}
                                                        >

                                                            <PlayArrow /> Ver
    
                                                        </Button>

                                                    </CardActions>

                                                </Card>

                                            </Grid>

                                        );
                                    })
                                }

                            </Grid>


                            :

                            <CircularProgress />

                    }

                </Container>

            </Container>
        );

    }

}

export default PostsFromSocialNetworks;