import {React} from 'react'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { URL } from '../config';


// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
// import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./AfterLoginHeader.css" 
const styles = {
    title: {
        fontFamily:'Courier New',
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: 'white',
        marginLeft:'25px',
        marginRight:'30px',
        padding:'0',
    },
    login: {
        fontFamily:'Courier New',
        marginLeft:'0',
        marginRight:'-5',
        color:'white', 
        fontWeight:'bold',
        fontSize:'1.1em'
    },
    logout: {
        fontFamily:'Courier New',
        marginLeft:'0',
        marginRight:'-5',
        color:'white', 
        fontWeight:'bold',
        fontSize:'1.1em',
        backgroundColor:'#5C0632'
    },
    signup: {
        fontFamily:'Courier New',
        margin:'0',
        marginRight:'55px',
        color:'white', 
        fontWeight:'bold',
        fontSize:'1.1em',
    },
    logo: {
      marginLeft: '5px',
      width:'200px',
      height:'50px',
    },
    userlogo: {
        marginLeft: '0px',
        width:'30px',
        height:'30px',
        marginTop:'7px'
      },
    navbar: {
    backgroundColor:'#800000',
    position:'top',
    },

  }

  let dataToBeSent;
  var CryptoJS = require("crypto-js");


const AfterLoginHeader=()=> {
  const [logOutAPI, setLogOutAPI] = useState('');
  const SECRET_KEY = "100001141";
 var loginStatusEnc =  sessionStorage.getItem("loginStatus");
 const loginStatus = CryptoJS.AES.decrypt(loginStatusEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);

  if(loginStatus){
  var decodedData = JSON.parse(sessionStorage.getItem("decodedData"));
  // var name = decodedData.username;
  // console.log("Username => ", name);
}
    const navigate = useNavigate()
    const Logout = () => {
      
      const SECRET_KEY = "100001141";
      const sessionIdFromSessionStorageEnc = sessionStorage.getItem('sessionId');
      const sessionId = CryptoJS.AES.decrypt(sessionIdFromSessionStorageEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);

      const subFromSessionStorageEnc = sessionStorage.getItem('sub');
      const sub = CryptoJS.AES.decrypt(subFromSessionStorageEnc, SECRET_KEY).toString(CryptoJS.enc.Utf8);

     
      const body = {
        sessionId,
        sub
      }
      let data = "";
      const logoutAPI = async () => {
        const url = `${URL}/logout`;
        const response = await axios.post(url, body);
        data = response.data;
        setLogOutAPI(response.data);
        // sessionStorage.setItem("logoutAPIData",JSON.stringify(response.data));
        // dataToBeSent = JSON.stringify(sessionStorage.getItem("logoutAPIData"));
        dataToBeSent = data;

        console.log("data from logoutAPI => ", JSON.stringify(response.data));
        console.log("data type from logoutAPI => ", typeof(JSON.stringify(response.data)));

        // const url1 = 'http://localhost:8080/openid/jwt/processOIDCSLORequest.do';

        // Get the reference to the textarea element using its ID
       var textarea = document.getElementById("myInputArea");
      
        // Set the desired value for the textarea
        var valueToInsert = JSON.stringify(response.data);
      
        // Set the value property of the textarea
        textarea.value = valueToInsert;

        // alert(document.getElementById("myInputArea").value);

         document.getElementById("theForm").submit();
        // var bodyFormData = new FormData();
        // bodyFormData.append('data',JSON.stringify(response.data));
        // const url1 = "http://localhost:8080/openid/jwt/processOIDCSLORequest.do";
        // const responseFromLogoutAPI = await axios({
        //   method: 'post',
        //   url: 'http://localhost:8080/openid/jwt/processOIDCSLORequest.do',
        //   data: bodyFormData,
          // headers: { 'Content-Type': 'multipart/form-data' },
        // })
        //   .then(function (response) {
        //     //handle success
        //     console.log("Response from logout API User Portal => ", response);
        //   })
        //   .catch(function (response) {
        //     //handle error
        //     console.log("Error from logout API User Portal => ", response);
        //   });
          
        // const responseFromLogoutAPI = await  fetch(url1, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type" : "multipart/form-data"
        //   },
        //   body: bodyFormData
        // });

        // const body1 = JSON.stringify(response.data)
          
        // console.log("data to be sent to Logout API Meripehchaan => ", body1);

        // const response1 = await axios.post(url1, body1);
        // console.log("Final response from Meripehchaan logoutAPI => ", responseFromLogoutAPI);
         //sessionStorage.clear();
      }
      logoutAPI();

      
  
      toast.success('Logged Out Successfully')
         //navigate('/')
  
        //  if(sessionStorage.getItem("loginStatus")==="0"){
        //   sessionStorage.clear();
  
        //  }
    //sessionStorage.clear();

    // toast.success('Logged Out Successfully')
    //    navigate('/')
       const dataToBeSentToAPI = logOutAPI;
    }

    return (

    <header>

    <nav class="navbar navbar-expand-md navbar-light " style={styles.navbar}>
        <div class="container-fluid topcolor">
            <a href="/" class="navbar-brand">
           
            </a>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse" >
                <div class="navbar-nav" >
                    <a  href="/" class="nav-item nav-link active"style={styles.title}>Home</a>
                    <a href="/about" class="nav-item nav-link"style={styles.title}>About</a>
                    <a href="/resources" class="nav-item nav-link"style={styles.title}>Resources</a>
                    <a href="/downloads" class="nav-item nav-link"style={styles.title}>Downloads</a>
                    <a href="/FAQs" class="nav-item nav-link"style={styles.title}>FAQs</a>
                                     
                </div>

                <div>
                <form id ="theForm" method="post" action="http://localhost:8080/openid/jwt/processOIDCSLORequest.do" name="theForm1">
                {/* <texarea id ="myTextarea" name="data">{dataToBeSent}</texarea> */}
                
                    {/* <input type="hidden" name="data" value = {JSON.stringify(dataToBeSent)}/> */}
                    <input id ="myInputArea" type="hidden" name="data" value = ""/>

                </form>

                  </div>
                <div class="navbar-nav ms-auto">
                <a href="/">
            </a>           
            <div className="float-end">
            
              <div className="btn-group " role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  className="btn btn-primary border-0 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{backgroundColor:'#5C0632', fontFamily:'Courier New', fontWeight:'bold', fontSize:"1.1em",marginTop:'4.5px'}}
                  >Welcome 
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <li>
                    <button onClick={Logout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            </div>
        </div>
    </nav>
    
</header>
    );
  }
  export default AfterLoginHeader;