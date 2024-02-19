import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate, Redirect } from 'react-router'
import {URL} from '../config';
import Header from '../Components/Header'
import { v4 as uuidv4 } from 'uuid';
import pkceChallenge from 'pkce-challenge'
var CryptoJS = require("crypto-js");
const styles={
    div:{
        backgroundColor:'#E5E4E2',
        width:'100%',
        height:'100%'
    }
}

let finalLink;
const Login = () => {
  
  function LinkURL() {
  
    const url = `${URL}/linkURL`;
    axios.post(url).then((response) => {
      
      const data = response.data;
   
      sessionStorage.clear();
     const SECRET_KEY = "100001141" //use random string to use it as secret key to encrypt data kept in sessionStorage
      const link = CryptoJS.AES.encrypt(JSON.stringify(data[0]), SECRET_KEY).toString();
      sessionStorage.setItem('link', link);
  


      const clientId = CryptoJS.AES.encrypt(JSON.stringify(data[1]), SECRET_KEY).toString();
      
      sessionStorage.setItem('clientId',clientId);
      const nonceValue = CryptoJS.AES.encrypt(JSON.stringify(data[2]), SECRET_KEY).toString();

      sessionStorage.setItem('nonceValue', nonceValue);

      const codeVerifier = CryptoJS.AES.encrypt(JSON.stringify(data[3]), SECRET_KEY).toString();

      sessionStorage.setItem('codeVerifier', codeVerifier);
     
      
      finalLink = data[0];
      console.log("finalLink => " +finalLink)
      window.location.replace(finalLink);

    });

  }

 
  return (
    <div className='row d-flex' style={{"width":'100%',"height":'100%',backgroundColor:'#E5E4E2'}}>
        <Header/>
      

      <div className='row d-flex'>
        {/* <div className="col"></div> */}
        <div className='row d-flex' style={{marginLeft:'350px',width:'500px', height:'545px',backgroundColor:'#E5E4E2'}}>
        <h1 style={{marginTop:'100px'}}>Login</h1>
          <div className="form" style={{marginTop:'25px'}}>
            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Email address
              </label>
              <input
                // onChange={(e) => {
                //   setEmail(e.target.value)
                // }}
                type="text"
                className="form-control"
              />
              {/* <input
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type="text"
                className="form-control"
              /> */}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="label-control">
                Password
              </label>
               <input
                // onChange={(e) => {
                //   setPassword(e.target.value)
                // }}
                type="password"
                className="form-control"
              />
              {/* <input
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type="password"
                className="form-control"
              /> */}
            </div>

            <div>
              <button className="btn btn-primary" style={{marginTop:'20px', width:'500px',backgroundColor:'#5C0632'}}>
                SignIn
              </button>
                <button  className="btn btn-primary" style={{marginTop:'20px', width:'500px',backgroundColor:'#5C0632'}}>
                SignUp
              </button>
              <button onClick={LinkURL} className="btn btn-primary" style={{marginTop:'20px', width:'500px',backgroundColor:'#5C0632'}}>
                Login using e-Pramaan 
              </button>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}
 

export default Login;