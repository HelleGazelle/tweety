const axios = require('axios');
const URL = 'http://localhost:3001/';
const loadTweetsFromAccount = (twitterAcc: string) => {
    const url = `${URL}${twitterAcc}`;
    
    return new Promise<[]>((resolve, reject) => {
        axios.get(url)
        .then((response: any) => {
            if (response && response.status === 200) {
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