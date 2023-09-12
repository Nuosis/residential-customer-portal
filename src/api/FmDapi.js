import { useState, useEffect } from 'react'
import axios from 'axios';

export default async function getFileMakerToken() {
    const url = 'https://server.selectjanitorial.com/fmi/data/vLatest/databases/clarityData/sessions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic RGV2Ok5hdHVyZU5lZWRzTnVydHVyZQ==',
    };

    try {
        const response = await axios.post(url, {}, { headers });
        const token = response.data.response.token;
        return token;
    } catch (error) {
        console.error('Error obtaining FileMaker token:', error);
        return null;
    }
}

