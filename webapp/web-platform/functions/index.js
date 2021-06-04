// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const axios = require('axios')
var querystring = require('querystring');

var cors = require('cors')({ origin: "*"})

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.getAPIToken = functions.https.onRequest(async (req, res) => {
    
    cors(req, res, () => {

        console.log("hello");
        
        console.log("start get API token function 1");

        // GET ACCESS TOKEN
        const authCode = req.query.authCode;

        // request to do
        // posts: get user posts
        // userInformation: get user information
        const requestType = req.query.requestType;

        const url = "https://api.instagram.com/oauth/access_token";

        // redirect in authorization API
        var redirect_uri = "";
        // information request to IG API
        var urlRequest = "";

        if (requestType === "posts") {

            // redirect in authorization API
            // redirect_uri = "https://livet2.web.app/loginSocialNetworks";
            redirect_uri = "https://localhost:3000/loginSocialNetworks/";
            console.error("change url because it is pointing to localhost")

            // // information request to IG API
            // urlRequest = "https://graph.instagram.com/me/media?fields=media_url,caption&access_token=" + token;
        } 
        else if (requestType === "userInformation") {

            // redirect in authorization API
            redirect_uri = "https://livet2.web.app/createNewStoreForm";

            // // infromation request to IG API
            // urlRequest = "https://graph.instagram.com/me?fields=id,username&access_token=" + token;
        }

        // do post request
        axios
        .post(url, 
            querystring.stringify({
                client_id: '477247573594243',
                client_secret: "c58240f5ee44ea61bbda754e985dccdb",
                grant_type: "authorization_code",
                // redirect_uri: "https://localhost:3000/loginSocialNetworks",
                redirect_uri: redirect_uri,
                code: authCode,
            })
        )

        .then(response => {
            // console.log("hello from access token");

            // console.log(response);

            // DO REQUEST

            // get IG Posts
            // const token = "IGQVJXUmxZAQkZAHc0xfcUtURnlvcEtYVjh3OFZAaR2tuMlM3VTdLWlhxa2Y1YjktY2c2dkJxRjBFeHF0cGpnT2JkT3JKYUY2S2ltajM1UHd5QktGckRhUGRnd0NOMy1oY241NWM0NHNQYy1NNy1RRkd1NTlqVEpCR2JrWnZAR";
            const token = response.data.access_token;

            // // url to do request
            var url = "";

            // define url based on request type
            if (requestType === "posts") {
                urlRequest = "https://graph.instagram.com/me/media?fields=media_url,caption&access_token=" + token;
            }
            else if (requestType === "userInformation") {
                urlRequest = "https://graph.instagram.com/me?fields=id,username&access_token=" + token;
            }

            // do request
            axios
                .get(urlRequest)
                .then(response => {
                    res.json({ result: response.data });

                    return null;
                })

                .catch(e => {
                    console.log(e);
                })

            return null;


        })
        .catch(error => {
            console.log("error from backend at access token section");
            console.error(error);
        })


        // res.json({ result: "Hello Leo 1!" });

    });

});