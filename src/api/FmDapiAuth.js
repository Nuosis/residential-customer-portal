import axios from 'axios';

const base64Encode = function(username,password){
    const combined = username + ":" + password;
    return btoa(combined);
} 

export default async function getFileMakerToken(server, database, userName, password) {

    const base64Value = base64Encode(userName, password);
    console.log(base64Value);

    const url = 'https://'+server+'.com/fmi/data/vLatest/databases/'+database+'/sessions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64Value,
    };

    try {
        const response = await axios.post(url, {}, { headers });
        const token = response.data.response.token;
        return token;
    } catch (error) {
        console.error('Error obtaining FileMaker token:', error);
        return error;
    }
}

