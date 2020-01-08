const axios = require('axios');
const URL = 'http://localhost:3001/tweets/';

const loadTweetsFromAccount = (twitterAcc: string, jwt: string) => {
    const url = `${URL}${twitterAcc}`;

    let requestHeaders = {
        headers: {
            Authorization: "Bearer " + jwt
        }
    }
    
    return new Promise<[]>((resolve, reject) => {
        axios.get(url, requestHeaders)
        .then((response: any) => {
            if (response && response.status === 200) {
                console.log(response.data);
                resolve(response.data);
            }
            else {
                reject('Tweets could not be fetched.');
            }
        })
        .catch((error: any) => {
            reject(`Could not fetch tweets from the URL: ${url}. Error: ${error}`);
    })
    })
}

export default {
    loadTweetsFromAccount
}