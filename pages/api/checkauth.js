import {Amplify, withSSRContext } from 'aws-amplify'
import config from "../../aws-exports.js"

// Amplify SSR configuration needs to be enabled within each API route
Amplify.configure({ ...config, ssr: true })



export default function handler(req, res) {

    let user = {};

    const { Auth } = withSSRContext({ req });

    Auth.currentAuthenticatedUser().then((res)=>{
        console.log(res);
        console.log("dummy log");
        user = res;

    }).catch((err)=>{
        console.log(err);
        console.log("in error section");
    });

    res.status(200).json(user)
  }