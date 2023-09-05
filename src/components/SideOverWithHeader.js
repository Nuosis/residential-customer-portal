import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MyListbox from './Mylistbox'
import Slider from './Slider'

const cleanLength = [
    { id: 1, name: 'Recently (Less than 2 weeks)' },
    { id: 2, name: 'Not too long ago (within the last month)' },
    { id: 3, name: 'Its been a while (more than a month ago)' },
    ];
const houseSizes = [
    { id: 1, name: 'Small (less than four bathrooms+bedrooms)' },
    { id: 2, name: 'Average (less than six bathrooms+bedrooms)' },
    { id: 3, name: 'Large (More than six bathrooms+bedrooms)' },
    ];

export default function SideOverWithHeader({title, subtext, open, setOpen, hoursBooked, setHoursBooked}) {
    const [selectedHouseSize, setSelectedHouseSize] = useState(houseSizes[1]);
    const [selectedCleanLength, setSelectedCleanLength] = useState(cleanLength[0]);
    const input=houseSizes

    const handleSliderChange = (e) => {
        setHoursBooked(e);
    };

    const handleSelectionChange = (selectedHouseSizes, selectedCleanLength) => {
        const selectedCleanLengthID=selectedCleanLength
        const selectedHouseSizeID=selectedHouseSize.id
        
        if (selectedHouseSizeID===3) {
            //  x large house
            handleSliderChange(5)
            } else if (selectedHouseSizeID===1) {
                //  small house
                if (selectedCleanLengthID===1) {
                    //  recently cleaned
                    handleSliderChange(2)
                    } else if (selectedCleanLengthID===2) {
                        //  cleaned within last month
                        handleSliderChange(3)
                        } else {
                            //  cleaned > month
                            handleSliderChange(4)
                        }
                } else {
                    //  average house
                    if (selectedCleanLengthID===3) {
                        //  > 1 month
                        handleSliderChange(5)
                        } else if (selectedCleanLengthID===2) {
                            //  cleaned within last month
                            handleSliderChange(3.5)
                            } else {
                                //  cleaned recently
                                handleSliderChange(2)
                            }
                }

        }



    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="bg-gray-400 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            {title}
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-gray-600 text-indigo-200 hover:text-white focus:outline-none"
                                onClick={() => setOpen(false)}
                            >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            </div>
                        </div>
                        <div className="mt-1">
                            <p className="text-sm text-gray-300">
                            {subtext}
                            </p>
                        </div>
                        </div>
                        <div className="relative flex-1 px-4 py-6 sm:px-6">
                            {/* Your content */}
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Time Estimator</h2>
                            <MyListbox 
                                label="How large is your house?" 
                                input={houseSizes} 
                                setSelected={setSelectedHouseSize} 
                                selected={selectedHouseSize} 
                                onSelectionChange={() => handleSelectionChange(selectedHouseSize.id, selectedCleanLength.id)} 
                            />
                            <MyListbox 
                                label="How long since it was professionally cleaned?" 
                                input={cleanLength} 
                                setSelected={setSelectedCleanLength} 
                                selected={selectedCleanLength} 
                                onSelectionChange={() => handleSelectionChange(selectedHouseSize.id, selectedCleanLength.id)}
                            />

                            {/*console.log("SideOver.js", {hoursBooked})*/}
                            <Slider min={2} max={5} step={0.5} hoursBooked={hoursBooked} setHoursBooked={setHoursBooked} fluid={false} onSliderChange={handleSliderChange} question="Estimate of Time to Book" unit="hours"/>
                        </div>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
