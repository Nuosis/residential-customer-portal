import Image from 'next/image'
import { useState } from 'react'
import Header from '@/components/Header'
import Form2Columns from '@/components/Form2Columns'
import CalendarWithDayView from '@/components/CalendarWithDayView'
import {Client} from 'fm-data-api-client';

const client = new Client('https://server.selectjanitorial.com', 'Dev', 'NatureNeedsNurture', 'clarityData');
const layout = client.layout('dapiOrganization');
console.log(layout);
const record = await layout.get(25);
console.log(record);

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
