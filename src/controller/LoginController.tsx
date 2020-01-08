const axios = require('axios');
const URL = 'http://localhost:3001/users/login';

const requestLogin = (email: string, password: string) => {
    return new Promise<[]>((resolve, reject) => {
        axios.post(URL, {
            email: email,
            password: password
        })
        .then((response: any) => {
            
            if (response && response.status === 200) {
                resolve(response.data);
            }
            else {
                reject('Could not SignIn User.');
            }
        })
        .catch((error: any) => {
            reject(`Could not SignIn User: ${URL}. Error: ${error}`);
    })
    })
}

export default {
    requestLogin
}