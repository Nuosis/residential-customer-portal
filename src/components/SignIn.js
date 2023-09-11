import React, { useState } from 'react';
import Image from 'next/image';

export default function Header({cleaner}) {
        return (
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                {/*logo and header text*/}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            className="mx-auto"
                            src="https://server.selectjanitorial.com/clarity/YGlNHe3c.png"
                            alt="Clarity Busienss Solutions"
                            width={200} // your desired width
                            height={200} // your desired height
                        />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-800 dark:text-white">
                        Sign into your account
                    </h2>
                </div>
                {/*login*/}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6  text-slate-800 dark:text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5  text-slate-800 dark:text-white shadow-sm ring-1 ring-inset dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
            
                        <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6  text-slate-800 dark:text-white">
                            Password
                            </label>
                            <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                Forgot password?
                            </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5  text-slate-800 dark:text-white shadow-sm ring-1 ring-inset dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>
            
                        <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Sign in
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }