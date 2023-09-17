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

export default function useFileMakerCall({ userName, password, database, server, call, callParams, layout, recordID, dapiTokens, setDapiTokens, dapiTokensTS, setDapiTokensTS, isTokenValid, setIsTokenValid  }) {
    
    const [dapiError, setDapiError] = useState(null);
    const uniqueKey = server+database;

    useEffect(() => {
        const currentToken = dapiTokens[uniqueKey];
        const currentTokenTimestamp = dapiTokensTS[uniqueKey];
            
        if (!currentToken || new Date() - new Date(currentTokenTimestamp) > TOKEN_VALIDITY_DURATION) {
        getFileMakerToken(server, database, userName, password)
        .then((token) => {
            setDapiTokens(prevTokens => ({ ...prevTokens, [uniqueKey]: token }));
            setDapiTokensTS(prevTimestamps => ({ ...prevTimestamps, [uniqueKey]: new Date() }));
            setIsTokenValid(true);
        })
        .catch((error) => {
            setDapiError(error);
        });
        };
        setIsTokenValid(true);
    }, [uniqueKey]);

    const makeApiCall = () => {
        let url, method, payload;
        if (call === "login") {
            return (dapiTokens)
        } else if (call === "productInfo") {
            url = `https://${server}/fmi/data/vLatest/productInfo`;
            method = "GET";
        }  else if (call === "find") {
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
    };
    let result;
    if (isTokenValid) {
        result = makeApiCall();
    }
    return { result, dapiError };      
}
