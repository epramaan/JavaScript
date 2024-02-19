import HeaderSelector from "../Components/HeaderSelector";
import { useLocation } from "react-router-dom";
import { URL } from '../config';
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
var CryptoJS = require("crypto-js");



const styles = {
    heading: {
        fontWeight: "bold",
        fontSize: '20px',
        padding: '10px',
        marginLeft: '15px'

    },

    content: {
        fontSize: '15px',
        marginLeft: '20px'
    }


}




const AnyPage = () => {

var decodedData;
    const navigate = useNavigate();
    const search = useLocation().search;
  
   
    const jwtAPI = async () => {
        let count = 1;
       
        const authCode = new URLSearchParams(search).get('code');
        const stateId = new URLSearchParams(search).get('state');
        console.log("in AnyPage api at fe");
        console.log("authCode => " + authCode);
        console.log("stateId => " + stateId);
        const SECRET_KEY = "100001141";
        const nonceEnc = sessionStorage.getItem('nonceValue')
        const nonce = CryptoJS.AES.decrypt(nonceEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
        const codeVerifierEnc = sessionStorage.getItem('codeVerifier')
        const codeVerifier = CryptoJS.AES.decrypt(codeVerifierEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
        const clientIdEnc = sessionStorage.getItem('clientId')
        const clientId = CryptoJS.AES.decrypt(clientIdEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    
    
    
        const body = {
            authCode,
            stateId,
            nonce,
            codeVerifier,
            clientId
        }





        const url = `${URL}/JWT`;
        const response = await axios.post(url, body);

        decodedData = response.data;
        decodedData = JSON.stringify(response.data);
        decodedData = JSON.parse(decodedData);
        console.log("decodedData => ", decodedData);
        const userName = decodedData.username;
        console.log("userName => ", userName);
        


       
        if(userName!=null){
            var loginStatus = "true";
      var loginStatusEnc = CryptoJS.AES.encrypt(loginStatus, SECRET_KEY).toString();
      sessionStorage.setItem('loginStatus', loginStatusEnc);

        }

        // console.log("Type of data => ",typeof(decodedData));
        console.log("name => ",decodedData.name);
        console.log("sub => ",decodedData.sub);
        console.log("session_id => ",decodedData.session_id);

        console.log(decodedData);
        // console.log("Type of decoded data => ",typeof(decodedData));

        console.log("username =>",JSON.stringify(decodedData.username));
        console.log("username without stringify =>",decodedData.username);
        console.log("typeof username without stringify =>",typeof(decodedData.username));



        // sessionStorage.setItem('decodedData', decodedData);
        // sessionStorage.setItem('Name', decodedData.name);
        const sessionIdPlain = decodedData.session_id;
        const sessionId = CryptoJS.AES.encrypt(sessionIdPlain, SECRET_KEY).toString();

        sessionStorage.setItem('sessionId', sessionId);
        const subPlain = decodedData.sub;
        const sub = CryptoJS.AES.encrypt(subPlain, SECRET_KEY).toString();
        sessionStorage.setItem('sub', sub);
        
        navigate('/');

    };




    // console.log('count value = ' + count)

    // useEffect(() => {
    //     // const Redirect = () => {
    //     //     sessionStorage.setItem('loginStatus', true);
    //     // };
    //     // Redirect();
    // }, []);

    useEffect(() => {
        jwtAPI();
    }, [])


    return (
        <div>
            <HeaderSelector />


            <div style={{ backgroundColor: '#E5E4E2' }} >
                <br />
                <h1
                    style={{ textAlign: "center", fontWeight: 'bolder' }}>
                    Login Successful
                </h1>
                <div> Data : {decodedData}</div>

            </div>
        </div>


    );
}

export default AnyPage