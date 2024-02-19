const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jose = require('jose');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(cors('*'));
app.use(express.json());


var jweGlobal = "";



app.post('/linkURL', (request, response) => {

    console.log("in linkURL api");
    const clientId = ""; //your service ID 
    const scope = "openid";
    const stateIdUnprocessed = crypto.randomUUID();
    const stateId = stateIdUnprocessed.replace(/[^a-zA-Z0-9]/g, '');
    const redirectUri = ""; //your URL goes here (SSO success URL)
    const requestUri = "https://epstg.meripehchaan.gov.in/openid/jwt/processJwtAuthGrantRequest.do"; 
    const responseType = "code";
    const aesKey = ""; //your AES key goes here
    const nonceValueUnprocessed = crypto.randomUUID();
    const nonceValue = nonceValueUnprocessed.replace(/[^a-zA-Z0-9]/g, '');
    const base64url = require("base64url");
    const codeVerifierUnprocessed = crypto.randomBytes(24).toString('hex');
    const codeVerifier = codeVerifierUnprocessed.replace(/[^a-zA-Z0-9]/g, '');
    const base64Digest = crypto.createHash("sha256").update(codeVerifier).digest("base64");
    const codeChallenge = base64url.fromBase64(base64Digest);
    const codeChallengeMethod = "S256";
    const inputValue = clientId + aesKey + stateId + nonceValue + redirectUri + scope + codeChallenge;
    const apiHmac = crypto.createHmac('sha256', aesKey).update(inputValue).digest('base64');

    const link = "https://epstg.meripehchaan.gov.in/openid/jwt/processJwtAuthGrantRequest.do?&scope=" + scope + "&response_type=" + responseType + "&redirect_uri=" + redirectUri + "&state=" + stateId + "&code_challenge_method=" + codeChallengeMethod + "&nonce=" + nonceValue + "&client_id=" + clientId + "&code_challenge=" + codeChallenge + "&request_uri=" + requestUri + "&apiHmac=" + apiHmac + "";
    


    // console.log("Link = " + link);
    // console.log("stateId = " + stateId);
    // console.log("nonce = " + nonceValue);
    // console.log("codeChallenge = " + codeChallenge);
    // console.log("apiHmac = " + apiHmac);
    // console.log("inputValue = " + inputValue);
    // console.log("codeVerifier = " + codeVerifier);


    const data = [link, clientId, nonceValue, codeVerifier];


    response.send(data);

});

app.post('/JWT', async (request, response) => {
    const { authCode, stateId, nonce, codeVerifier, clientId } = request.body

    console.log("in JWT api");
    console.log("authCode => " + authCode);
    console.log("stateId => " + stateId);
    // console.log("nonce => " + nonce);
    const nonceProcessed = nonce.replace(/['"]+/g, '');
    // console.log("nonceProcessed => " + nonceProcessed);
    // console.log("codeVerifier => " + codeVerifier);
    const codeVerifierProcessed = codeVerifier.replace(/['"]+/g, '');
    // console.log("codeVerifierProcessed => " + codeVerifierProcessed);
    // console.log("clientId => " + clientId);
    const clientIdProcessed = clientId.replace(/['"]+/g, '');
    console.log("clientIdProcessed => " + clientIdProcessed);

    var axios = require('axios');
    var data = JSON.stringify({
        "code": [
            authCode
        ],
        "grant_type": [
            "authorization_code"
        ],
        "scope": [
            "openid"
        ],
        "redirect_uri": [
            "https://epstg.meripehchaan.gov.in/openid/jwt/processJwtTokenRequest.do"
        ],
        "request_uri": [
            "http://localhost:5050/JWT" // your backend API's controller URL, ,here backend server runs on port 5050
        ],
        "code_verifier": [
            codeVerifierProcessed
        ],
        "client_id": [
            clientIdProcessed
        ]
    });
    console.log("data to be sent => " + data);


    var config = {
        method: 'post',
        url: 'https://epstg.meripehchaan.gov.in/openid/jwt/processJwtTokenRequest.do',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'upid=55FCA86C177AFFC95D36768176345C31'
        },
        data: data
    };

    console.log("making call to request JWE");



    const returnedResult = await axios(config).catch(error => console.log(error));
    // console.log('returnedResult of axios call => ' + returnedResult);
    // console.log("returnedResult data part => " + returnedResult.data);
    jweGlobal = returnedResult.data;

    console.log("response for JWT => ", jweGlobal)


    const hashedNonceString = crypto.createHash('sha256').update(nonceProcessed).digest('base64url');

    const privateKey = await jose.importJWK(
        {
            kty: "oct",
            k: hashedNonceString,
        },
        "HS256"
    );


    const { plaintext, protectedHeader } = await jose.compactDecrypt(
        jweGlobal,
        privateKey
    );

    // console.log("protected header => " + protectedHeader);
    // console.log("plain text => " + new TextDecoder().decode(plaintext));

    const jws = new TextDecoder().decode(plaintext);

    const cert = fs.readFileSync('./epramaan_staging.crt'); 
    // console.log('certificate contents => ' + cert);

    const utf8Encode = new TextEncoder();
    const hashedKey = utf8Encode.encode(cert);


    const key = crypto.createPublicKey(cert).export({ type: 'pkcs1', format: 'pem' });
    // console.log('certificate key => ' + key)
    // console.log('certificate type => ' + typeof (key))



    let decode = jwt.verify(jws, key, { ignoreExpiration: 'true' })

    const name = JSON.stringify(decode.name)
    const sessionId = decode["session_id"]
    const sub = decode["sub"]

    console.log("userName => " + name)
    console.log("nameFromJSONObject => " + decode["name"]);
    console.log("sessionFromJSONObject => " + decode["session_id"]);
    console.log("subFromJSONObject => " + decode["sub"]);

    // const decodedData = {decode, name}; 
    const decodedData = { decode };



    response.send(decode);
    console.log("decodedData => " + JSON.stringify(decodedData));


});


app.post('/logout', async (request, response) => {
    //inputValue = clientId+sessionId+iss+logoutRequestId+sub+redirectUrl
    const requestData = request.body;
    const clientId = ""; //service ID
    const sessionId = requestData.sessionId; //get it from JWT
    const iss = "ePramaan";
    const logoutRequestIdUnprocessed = crypto.randomUUID();
    const logoutRequestId = logoutRequestIdUnprocessed.replace(/[^a-zA-Z0-9]/g, '');
    const redirectUrl = ""; //SSO logout success URL 
    const sub = requestData.sub; //get it from JWT
    const inputValue = clientId + sessionId + iss + logoutRequestId + sub + redirectUrl;
    const hmac = crypto.createHmac('sha256', logoutRequestId).update(inputValue).digest('base64');
    const customParameter = "";
    const data = {
        "clientId": clientId,
        "sessionId": sessionId,
        "hmac": hmac,
        "iss": iss,
        "logoutRequestId": logoutRequestId,
        "sub": sub,
        "redirectUrl": redirectUrl,
        "customParameter": customParameter
    }
    console.log("data => ", JSON.stringify(data));
    response.send(data);

});


app.listen(5050, () => console.log('Server started on the port no 5050'));

