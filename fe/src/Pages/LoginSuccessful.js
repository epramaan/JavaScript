// import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useLocation } from "react-router-dom";
import AfterLoginHeader from '../Components/AfterLoginHeader';
import axios from 'axios';
import { URL } from '../config';



export const LoginSuccessful = () => {

  return (

    <div>
      <AfterLoginHeader />
      <div style={{ backgroundColor: '#E5E4E2' }} >
        <br />
        <h1
          style={{ textAlign: "center", fontWeight: 'bolder' }}>
          Logged in Successfully!
        </h1>


      </div>
    </div>
  )
}
