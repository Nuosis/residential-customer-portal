import Image from 'next/image'
import { useState } from 'react'
import Calendar from '@/components/Calendar'
import Header from '@/components/Header'
import Form2Columns from '@/components/Form2Columns'
import SideOverWithHeader from '@/components/SideOverWithHeader'
import CalendarWithDayView from '@/components/CalendarWithDayView'

export default function Home() {
  return (
    <div className="mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header>
      </Header>
      <div className="mt-6" >
        <CalendarWithDayView/>
      </div>
      <div className="mt-6" >
        <Form2Columns>
        </Form2Columns>
      </div>
    </div>
  )
}
