import { useState, useEffect } from 'react'
import SignIn from '@/components/SignIn'

export default function Home() {
  return (
    <div className="dark:bg-slate-800 mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SignIn/>
    </div>
  )
}
