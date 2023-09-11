import { useState } from 'react'
import SignIn from '@/components/SignIn'

export default function Home({cleaner = "Niki", rate = 75}) {
  const [hoursBooked, setHoursBooked] = useState(2);
  return (
    <div className="dark:bg-slate-800 mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SignIn/>
    </div>
  )
}
