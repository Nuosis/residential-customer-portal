import Image from 'next/image'
import Calendar from '@/components/Calendar'
import Header from '@/components/Header'
import Form2Columns from '@/components/Form2Columns'

export default function Home() {
  return (
    <div className="mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header>
      </Header>
      <div className="mt-6" >
        <Calendar>
        </Calendar>
      </div>
      <div className="mt-6" >
        <Form2Columns>
        </Form2Columns>
      </div>
    </div>
  )
}
