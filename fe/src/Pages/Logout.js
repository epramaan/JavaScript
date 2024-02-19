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

let decodedData;



const Logout = () => {


    let count = 1;
    const navigate = useNavigate();
    const search = useLocation().search;
    const logoutResponse = new URLSearchParams(search).get('LogoutResponse');
    console.log("on Logout page");
    console.log("LogoutResponse => " + logoutResponse);
    sessionStorage.setItem('logoutResponse', logoutResponse);
    var decoded = atob(logoutResponse);
    console.log("Type of decoded => ", typeof(decoded));
    var json = JSON.parse(decoded);
    console.log("Type of json => ", typeof(json));
    console.log("json => ", json);
    console.log("LogoutStatus => ", json.logoutStatus);
    var logOutStatusFromEPramaan = json.logoutStatus;
    console.log(" typeof LogoutStatus => ", typeof(logOutStatusFromEPramaan));

    if(logOutStatusFromEPramaan){
        var loginStatusEnc = sessionStorage.getItem('loginStatus');
        const SECRET_KEY = "100001141";
        var loginStatus = CryptoJS.AES.decrypt(loginStatusEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        console.log("status of login from logout page => ", loginStatus);
        console.log("typeof of login from logout page => ", typeof(loginStatus));
        var newLoginStatusPlain = "false";
        var newloginStatus = CryptoJS.AES.encrypt(newLoginStatusPlain, SECRET_KEY).toString();
        
        sessionStorage.setItem('loginStatus', newloginStatus);
        

        window.location.href = '/';

    }
    


    return (
        <div>
            <HeaderSelector />


            <div style={{ backgroundColor: '#E5E4E2' }} >
                <br />
                <h1
                    style={{ textAlign: "center", fontWeight: 'bolder' }}>
                    On Logout Page
                </h1>
            

                

            </div>
        </div>


    );
}

export default Logout