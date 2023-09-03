import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import MyListbox from './Mylistbox'
import Slider from './Slider'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Form2Columns(hoursBooked) {

    return (
        <div className="space-y-10 md:divide-x md:divide-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 gap-x-0 gap-y-8 md:grid-cols-2">
                <div className="px-4 sm:px-0">
                </div>

                <form className=" md:col-span-1">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                                Hours Selected $hours
                                </label>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Special Requests and Instructions
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <label>
                            $250.00 plus GST
                        </label>
                        <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Book It!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}