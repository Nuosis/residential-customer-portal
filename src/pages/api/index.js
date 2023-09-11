import { useState } from 'react'
import { DataApi } from "@proofgeist/fmdapi";
//import { fileTokenStore } from "@proofgeist/fmdapi/dist/tokenStore/file"; (BREAKS)
//see methods at "https://github.com/proofgeist/fmdapi"
//review modification to next.config.js

console.log('userName',process.env.FM_USERNAME);
console.log('password',process.env.FM_PASSWORD);
console.log('db',process.env.FM_DATABASE);
console.log('server',process.env.FM_SERVER);

const client = DataApi({
    auth: {
        username: "Dev",
        password: "NatureNeedsNurture",
    },
    db: "clarityData",
    server: "https://server.selectjanitorial.com",
});
console.log("dAPI Auth Result",client);

//const result = await client.list({ layout: "dapiOrganization" });
//console.log("dAPI Result",result);