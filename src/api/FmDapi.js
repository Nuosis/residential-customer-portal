import { useState, useEffect } from 'react'
import axios from 'axios';

export default async function getFileMakerToken(database, userName, password) {

    // check token is set or is not stale

    // if needed obtain new token
    const url = 'https://server.selectjanitorial.com/fmi/data/vLatest/databases/clarityData/sessions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ',
    };

    try {
        const response = await axios.post(url, {}, { headers });
        const token = response.data.response.token;

        // set token into state
        // set tokenTS into state
        return token;
    } catch (error) {
        console.error('Error obtaining FileMaker token:', error);
        return null;
    }
}

