import { Amplify,withSSRContext } from 'aws-amplify';
import Cors from 'cors';
import { getPost } from '../../src/graphql/queries';
import awsExports from '../../aws-exports';
Amplify.configure({ ...awsExports, ssr: true });

const corsConfig = {
    "origin": "https://main.d3mecxrojhc6ov.amplifyapp.com/",
    "methods": "GET,HEAD",
    "preflightContinue": true,
    "optionsSuccessStatus": 204
    };
const cors = Cors(corsConfig);

function runMiddleware(req, res, fn) {
return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
    if (result instanceof Error) {
        return reject(result)
    }

    return resolve(result)
    })
})
}

export default async function handler(req, res) {
    let result = {"Hello":"World"};
    const { API } = withSSRContext({ req });
    const data = await API.graphql({
        query: getPost,
        variables:{ id: req.query["id"]},
        authMode: 'AMAZON_COGNITO_USER_POOLS'
    }); 

    result = data.data.getPost;

    await runMiddleware(req, res, cors);
    //console.log(data);
    //res.headers = {'Content-Type':'application/json'};
    res.status(200).json(result);
}


