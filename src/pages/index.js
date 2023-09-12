import { useState, useEffect } from 'react'
import SignIn from '@/components/SignIn'
import getFileMakerToken from '@/api/fmDapi';

export default function Home({cleaner = "Niki", rate = 75}) {
  const [dapiToken, setDapiToken] = useState();
  const [dapiTokenTS, setDapiTokenTS] = useState();

  useEffect(() => {
    // init fmDapi
    getFileMakerToken()
      .then((token) => {
        console.log('Obtained token:', token);
        setDapiToken(token);
        setDapiTokenTS(new Date());
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []); // Empty dependency array means this useEffect runs once when the component mounts.

  return (
    <div className="dark:bg-slate-800 mt-2 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SignIn/>
    </div>
  )
}
