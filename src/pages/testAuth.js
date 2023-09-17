import React, { useState, useEffect } from 'react';
import useFileMakerCall from '@/api/useFmDapiCall';

const userName = 'Dev'; // Replace with your actual env variable name
const password = 'Na'; // Replace with your actual env variable name
const server = 'server.l.com'; // Replace with your server
const database = 'clarityData'; // Replace with your database

export default function TestAuth() {
    const [dapiTokens, setDapiTokens] = useState({});
    const [dapiTokensTS, setDapiTokensTS] = useState({});
    const [isTokenValid, setIsTokenValid] = useState(false);
    const { login } = useFileMakerCall({userName, password, server, database, call: "login", dapiTokens, setDapiTokens, dapiTokensTS, setDapiTokensTS, isTokenValid, setIsTokenValid });
    
    const handleSignIn = async () => {
        console.log('Call Result:', login);
        };
    
    return (
        <>
        <button 
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={handleSignIn}>
            Get Token
        </button>
        </>
        );
    }
