import { useState, useEffect } from 'react';
import getFileMakerToken from '@/api/FmDapiAuth';
import axios from 'axios';

const TOKEN_VALIDITY_DURATION = 14 * 60 * 1000 + 55000;

async function callDapi(dapiToken, url, method, payload) {
    const headers = {
        'Authorization': `Bearer ${dapiToken}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios({
        method,
        url,
        headers,
        data: payload
        });

        if (response.status === 200) {
        return response.data;
        } else {
        throw new Error(`Failed: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
    };

export default function FileMakerCall({ server, database, userName, password, layout, recordID, call, callParams }) {
    const [dapiTokens, setDapiTokens] = useState({});
    const [dapiTokensTS, setDapiTokensTS] = useState({});
    const [dapiError, setDapiError] = useState(0);

    const uniqueKey = `${server}-${database}`;

    useEffect(() => {
        const currentToken = dapiTokens[uniqueKey];
        const currentTokenTimestamp = dapiTokensTS[uniqueKey];
            
        if (!currentToken || new Date() - new Date(currentTokenTimestamp) > TOKEN_VALIDITY_DURATION) {
            getFileMakerToken(server, database, userName, password)
            .then((token) => {
                setDapiTokens(prevTokens => ({ ...prevTokens, [uniqueKey]: token }));
                setDapiTokensTS(prevTimestamps => ({ ...prevTimestamps, [uniqueKey]: new Date() }));
            })
            .catch((error) => {
                setDapiError(error);
            });
        }
    }, [uniqueKey, call]);

    const generateCall = () => {
        let url, method, payload;

        if (call === "productInfo") {
        url = `https://${server}/fmi/data/vLatest/productInfo`;
        method = "GET";
        } else if (call === "find") {
        url = `https://${server}/fmi/data/vLatest/databases/${database}/layouts/${layout}/_find`;
        method = "POST";
        payload = {
            limit: callParams.limit,
            ...(callParams.query && { query: callParams.query })
        } 
        } else {
            setDapiError(501) //not implimented
        }

        return callDapi(dapiTokens[uniqueKey], url, method, payload);
    }

    return { generateCall, dapiError };
}
