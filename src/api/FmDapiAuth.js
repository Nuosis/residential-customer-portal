import axios from 'axios';

const base64Encode = function(username,password){
    const combined = username + ":" + password;
    return btoa(combined);
} 

export default async function getFileMakerToken(server, database, userName, password) {

    const base64Value = base64Encode(userName, password);
    

    const url = 'https://'+server+'/fmi/data/vLatest/databases/'+database+'/sessions';
    console.log(url);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64Value,
    };

    try {
        const response = await axios.post(url, {}, { headers });
        console.log('call response:',response);
        const token = response.data.response.token;
        return token;
    } catch (error) {
        console.error('FMDapiAuth ERROR:', error);
        throw error; // Throw the error back to be caught by the calling function
    }
}

