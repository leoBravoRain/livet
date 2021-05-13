// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const axios = require('axios')
var querystring = require('querystring');


// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.getAPIToken = functions.https.onRequest(async (req, res) => {
    
    console.log("start get API token function 1");

    // GET ACCESS TOKEN
    const authCode = req.query.authCode;

    const url = "https://api.instagram.com/oauth/access_token";

    // do post request
    axios
    .post(url, 
        querystring.stringify({
            client_id: '477247573594243',
            client_secret: "c58240f5ee44ea61bbda754e985dccdb",
            grant_type: "authorization_code",
            redirect_uri: "https://localhost:3000/loginSocialNetworks",
            code: authCode,
        })
    )

    .then(response => {
        // console.log("hello from access token");

        console.log(response);

        // DO REQUEST
        // get IG Posts
        // const token = "IGQVJXUmxZAQkZAHc0xfcUtURnlvcEtYVjh3OFZAaR2tuMlM3VTdLWlhxa2Y1YjktY2c2dkJxRjBFeHF0cGpnT2JkT3JKYUY2S2ltajM1UHd5QktGckRhUGRnd0NOMy1oY241NWM0NHNQYy1NNy1RRkd1NTlqVEpCR2JrWnZAR";
        const token = response.data.access_token;
        const url = "https://graph.instagram.com/me/media?fields=media_url,caption&access_token=" + token;
    
        axios
            .get(url)
            .then(response => {
                // console.log("hello from axios");
                // console.log(response.data);
                res.json({ result: response.data });
            })


    })
    .catch(error => {
        console.log("error from backend at access token section");
        console.error(error);
    })


    // res.json({ result: "Hello Leo 1!" });

});