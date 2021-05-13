// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const axios = require('axios')

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.getAPIToken = functions.https.onRequest(async (req, res) => {
    
    console.log("hi 1");

    // GET ACCESS TOKEN
    const authCode = req.query.authCode;

    // console.log(authCode);

    // const url = "https://api.instagram.com/oauth/access_token -F client_id=477247573594243 -F client_secret=c58240f5ee44ea61bbda754e985dccdb -F grant_type=authorization_code -F redirect_uri=https://localhost:3000/loginSocialNetworks -F code=" + authCode;
    // const url = 'https://jsonplaceholder.typicode.com/posts';

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
    
    // });

    
    // axios
    //     .post(url)
    //     .then(res => {
    //         // console.log(`statusCode: ${res.statusCode}`)
    //         console.log(res);
    //         console.log("HELLO from post");
    //     })
    //     .catch(error => {
    //         console.error(error)
    //         // console.log("error from backend")
    //     })

    // DO REQUEST
    // get IG Posts
    const token = "IGQVJXUmxZAQkZAHc0xfcUtURnlvcEtYVjh3OFZAaR2tuMlM3VTdLWlhxa2Y1YjktY2c2dkJxRjBFeHF0cGpnT2JkT3JKYUY2S2ltajM1UHd5QktGckRhUGRnd0NOMy1oY241NWM0NHNQYy1NNy1RRkd1NTlqVEpCR2JrWnZAR";
    const url = "https://graph.instagram.com/me/media?fields=media_url,caption&access_token=" + token;

    axios
        .get(url)
        .then(response => {
            console.log("hello from axios");
            console.log(response.data);
            // response.json()
            // console.log(response);
            res.json({ result: response.data });
        })
        // .then(data => this.setState({ postId: data.id }));
        // .catch(er => {console.log(er)})
        // .then(data => {
        //     console.log(data);
        //     // console.log("DATA");


        //     // Send back a message that we've successfully written the message
        //     res.json({ result: "Hello Leo 1!" });
        // });

    // fetch(url)
    // // fetch(url)
    // .then(response => response.json())
    // // .then(data => this.setState({ postId: data.id }));
    // // .catch(er => {console.log(er)})
    // .then(data => {
    //     console.log(data);
    //     // console.log("DATA");


    //     // Send back a message that we've successfully written the message
    //     res.json({ result: "Hello Leo 1!" });
    // });

});