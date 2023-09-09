import { useState } from 'react'
import Header from '@/components/Header'
import Form2Columns from '@/components/Form2Columns'
import CalendarWithDayView from '@/components/CalendarWithDayView'
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
//console.log("dAPI Auth Result",client);

const result = await client.list({ layout: "dapiOrganization" });
console.log("dAPI Result",result);

export default function Home({cleaner = "Niki", rate = 75}) {
  const [hoursBooked, setHoursBooked] = useState(2);
  
  return (
    <div className="mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header/>
      <div className="mt-6" >
        {/*console.log("Index.js", {hoursBooked})*/}
        <CalendarWithDayView cleaner={cleaner} hoursBooked={hoursBooked} setHoursBooked={setHoursBooked}/>
      </div>
      <div className="mt-6" >
        <Form2Columns cleaner={cleaner} rate={rate} hoursBooked={hoursBooked} setHoursBooked={setHoursBooked}/>
      </div>
    </div>
  )
}
