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
// import Schedule from '@material-ui/icons/Schedule';

// import Select from '@material-ui/core/Select';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Chip from '@material-ui/core/Chip';

// firebase
// import { auth } from "../../config/firebase";


// prototype post
const posts = [

    {
        "text": "hello this is my first IG post",
        "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
    },

    {
        "text": "This is another IG post",
        "image": "https://www.biggerbolderbaking.com/wp-content/uploads/2017/08/1C5A0056.jpg",
    },
];


class PostsFromSocialNetworks extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            posts: posts,
        }

    }

    componentDidMount() {

        console.log(this.state.posts);

        // this.setState({
        //     loading: true,
        // });

        // // check if user is logged
        // auth.onAuthStateChanged((user) => {

        //     if (user) {

        //         this.props.history.push('/');

        //     }

        //     else {

        //         // console.log("user no logged");

        //         // this.props.history.push('/PostsFromSocialNetworks/');
        //     }

        //     this.setState({
        //         loading: false,
        //     });

        // });

    }

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

                            {/* list of posts */}
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

                                {/* title */}
                                <Typography align="center" variant="h4" component="h4" gutterBottom>
                                    Posteos desde tu cuenta de Instagram
                                </Typography>

                                {/* each post */}
                                {
                                    this.state.posts.map((post) => {

                                        return(

                                            // each post structure
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        image={post.image}
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="300"

                                                    // title={workshop.name}
                                                    />

                                                    {/* contentn */}
                                                    <CardContent>

                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {post.text}
                                                        </Typography>

                                                    </CardContent>

                                                </CardActionArea>


                                                <CardActions>

                                                    <Button size="small" color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            // window.open("https://wa.me/" + workshop.teacherMobileNumber + "?text=Hola, quiero tomar una clase en tu curso de '" + workshop.title + "' que aparece en la plataforma online")
                                                            // this.setState({
                                                            //     toBuyModal: true,
                                                            // });

                                                            // alert("See details")
                                                            this.props.history.push('/editSNPostToProduct');
                                                        }}
                                                    >

                                                        <PlayArrow /> Ver

                                                    </Button>

                                                </CardActions>

                                            </Card>
                                            
                                        );
                                    })
                                }

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

export default PostsFromSocialNetworks;