import {Amplify, withSSRContext ,Auth} from 'aws-amplify'
import { useState } from 'react'
import { useEffect } from 'react';
import config from "../aws-exports.js"

// Amplify SSR configuration needs to be enabled within each API route
Amplify.configure({ ...config, ssr: true })


export default function checkUser() {
  //const { Auth } = withSSRContext({ req })
  const [state,setState] = useState("Loading...");

  useEffect(()=>{

        Auth.currentAuthenticatedUser().then((user)=>{
            console.log(user);
            setState(user.username);

        }).catch((err)=>{
            console.log(err);
        });



  },[]);

  return (
    <div>
        <h1>The current user is {state}</h1>
    </div>
  )


  
}