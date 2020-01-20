const axios = require('axios');
const URL = 'http://localhost:3001/users/register';

// send the data from registration form to backend and save in the db
const sendRegisterData = (email: string, password: string) => {
    
    return new Promise<[]>((resolve, reject) => {
        axios.post(URL, {
            email: email,
            password: password
        })
        .then((response: any) => {
            if (response && response.status === 201) {
                resolve(response.data);
            }
            else {
                reject('Could not register new User.');
            }
        })
        .catch((error: any) => {
            reject(`Could not register new User: ${URL}. Error: ${error}`);
    })
    })
}

export default {
    sendRegisterData
}