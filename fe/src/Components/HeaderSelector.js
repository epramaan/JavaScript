import AfterLoginHeader from "./AfterLoginHeader"
import Header from "./Header"
var CryptoJS = require("crypto-js");



const HeaderSelector = () =>{
    var loginStatusEnc = sessionStorage.getItem('loginStatus');
    const SECRET_KEY = "100001141";
    if(loginStatusEnc){
        var loginStatus = CryptoJS.AES.decrypt(loginStatusEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
    // console.log("loginStatus => ", loginStatus)
    //const loginStatus = sessionStorage.getItem('loginStatus');
	if(loginStatus == "true")
    return <AfterLoginHeader />
	else
    return <Header />
  }

  export default HeaderSelector