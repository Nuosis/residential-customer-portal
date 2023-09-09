import { useState } from 'react'
import Header from '@/components/Header'
import Form2Columns from '@/components/Form2Columns'
import CalendarWithDayView from '@/components/CalendarWithDayView'
import { DataApi } from '@/myfmbutler/myfmapilibrary-for-js/DataApi'
// see https://github.com/myFMbutler/myFMApiLibrary-for-JS for methods

let options = {
  'apiUrl': process.env.REACT_APP_SERVER,
  'databaseName': process.env.REACT_APP_DATABASE_CD,
  'login': process.env.REACT_APP_USERNAME,
  'password': process.env.REACT_APP_PASSWORD,
};
let api = new DataApi(options);
console.log("api options", api)

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
