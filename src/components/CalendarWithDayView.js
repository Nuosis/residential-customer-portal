import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import SideOverWithHeader from './SideOverWithHeader'

function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

function getMonthName(input) {
        let monthNumber;
        if (typeof input === 'string') {
            const date = new Date(input);
            if (isNaN(date.getTime())) {
                return 'Invalid date string';
            }
            monthNumber = date.getMonth() + 1; // Months are 0-based in Date objects
        } else if (typeof input === 'number') {
            monthNumber = input;
        } else {
            return 'Invalid input type';
        }
    
        const date = new Date();
        date.setMonth(monthNumber - 1);
    
        return date.toLocaleString('en-US', { month: 'long' });
    }

function daysArray(thisDate = new Date(), selectedDate) {
        // Validate if the passed value is a Date object
        if (!(thisDate instanceof Date)) {
            return "Invalid date";
        }
    
        const daysArray = [];
    
        // Get the first day of the month
        const firstDayOfMonth = new Date(thisDate.getFullYear(),thisDate.getMonth(), 1);
    
        // Get the day name of the first day of the month
        const firstDayName = firstDayOfMonth.toLocaleString('en-US', { weekday: 'long' });
    
        // Determine the Monday prior to the 1st of the month
        const mondayPrior = new Date(firstDayOfMonth);
        mondayPrior.setDate(firstDayOfMonth.getDate() - ((firstDayOfMonth.getDay() + 6) % 7));
    
        // Determine the next Sunday after the end of the month
        const lastDayOfMonth = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);
        const nextSunday = new Date(lastDayOfMonth);
        nextSunday.setDate(lastDayOfMonth.getDate() + (7 - lastDayOfMonth.getDay()));
    
        let currentDate = new Date(mondayPrior);
    
        while (currentDate <= nextSunday) {
            const isCurrentMonth = currentDate.getMonth() === thisDate.getMonth();
            const isToday = currentDate.toDateString() === new Date().toDateString();
                const isSelected = currentDate.toDateString() === new Date(selectedDate).toDateString();
        
        daysArray.push({
            date: formatDate(new Date(currentDate)), // Formatted date
            isCurrentMonth,
            isToday,
            isSelected
        });
    
        currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return daysArray;
    }

// init calendar dates based on today

const hours = Array.from({ length: 24 }, (_, index) => index); // Generate array of hours (0 to 23)
const TimeLabels = () => (
        <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
            {hours.map(hour => (
                <div key={hour}>{hour % 12 === 0 ? '12' : hour % 12} {hour >= 12 ? 'PM' : 'AM'}</div>
            ))}
        </div>
    );
    

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }

export default function CalendarWithDayView({cleaner, hoursBooked, setHoursBooked}) {
    const [open, setOpen] = useState(false);
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [displayDate, setDisplayDate] = useState(formatDate(new Date()));
    const [days, setDays] = useState(daysArray(new Date(displayDate), selectedDate));
    const utcSelectedDate = `${selectedDate}T00:00:00Z`;

    function handleMonthChange({direction}){
        
        const currentDisplayDate = new Date(displayDate);
        if (direction === 'increase') {
            currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
        } else {
            currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
        }
        currentDisplayDate.setDate(15);
        console.log(currentDisplayDate)
        
        const newDate = formatDate(currentDisplayDate);
        setDisplayDate(newDate);
        setDays(daysArray(new Date(newDate), selectedDate));
    };

    function changeSelectedDate(newSelectedDate) {
        setSelectedDate(newSelectedDate);
        const newDays = days.map(day => {
            if (day.date === newSelectedDate) {
                return { ...day, isSelected: true };
            } else if (day.isSelected) {
                return { ...day, isSelected: false };
            }
            return day;
            });
        setDays(newDays);
    };

    return (
        <div className="flex h-full flex-col">
            <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        {cleaner}`s Schedule
                    </h1>
                    {/*display day name*/}
                    <div className="mt-1 text-sm text-gray-500 sm:hidden">
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            onClick={() => handleMonthChange({ direction: 'decrease' })}
                            >
                            <span className="sr-only">Previous Day</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        {new Date(utcSelectedDate).toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC'  })}
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            onClick={() => handleMonthChange({ direction: 'increase' })}
                            >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 hidden sm:inline">
                        {console.log("header update",utcSelectedDate)}
                        {new Date(utcSelectedDate).toLocaleString('en-US', { weekday: 'long', timeZone: 'UTC' })}
                    </div>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none"
                >
                    Time Estimator
                </button>
                </div>
            </header>
            {<SideOverWithHeader title="Time Estimator" subtext="answer these questions to generate a suggested amount of hours to book" open={open} setOpen={setOpen} hoursBooked={hoursBooked} setHoursBooked={setHoursBooked}/>}
            <div className="isolate flex flex-auto overflow-hidden bg-white max-h-96">
                 {/* Calendar */}
                <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
                    <div className="flex items-center text-center text-gray-900">
                        <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        onClick={() => handleMonthChange({ direction: 'decrease' })}
                        >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        {/* set month and year*/}
                        <div className="flex-auto text-sm font-semibold">{getMonthName(displayDate)} {new Date(displayDate).getFullYear()}</div>
                        <button
                        type="button"
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        onClick={() => handleMonthChange({ direction: 'increase' })}
                        >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day, dayIdx) => (
                        <button
                            key={day.date}
                            type="button"
                            onClick={() => changeSelectedDate(day.date)}
                            className={classNames(
                            'py-1.5 hover:bg-gray-100 focus:z-10',
                            day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                            (day.isSelected || day.isToday) && 'font-semibold',
                            day.isSelected && 'text-white',
                            !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                            !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                            day.isToday && !day.isSelected && 'text-indigo-600',
                            dayIdx === 0 && 'rounded-tl-lg',
                            dayIdx === 6 && 'rounded-tr-lg',
                            dayIdx === days.length - 7 && 'rounded-bl-lg',
                            dayIdx === days.length - 1 && 'rounded-br-lg'
                            )}
                        >
                            <time
                            dateTime={day.date}
                            className={classNames(
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                day.isSelected && day.isToday && 'bg-indigo-600',
                                day.isSelected && !day.isToday && 'bg-gray-900'
                            )}
                            >
                            {day.date.split('-').pop().replace(/^0/, '')}
                            </time>
                        </button>
                        ))}
                    </div>
                </div>
                {/* Day View */}
                <div ref={container} className="flex flex-auto flex-col overflow-y-scroll">
                    <div ref={containerNav} className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"/>
                    <div className="flex w-full flex-auto">
                        {/* Side Banner */}
                        <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
                        {/* Day View */}
                        <div className="grid flex-auto grid-cols-1 grid-rows-1">
                            {/* Horizontal lines */}
                            <div
                                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                            >
                                <div ref={containerOffset} className="row-end-1 h-7"></div>
                                    <div>
                                        <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                            12AM
                                        </div>
                                    </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    1AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    2AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    3AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    4AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    5AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    6AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    7AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    8AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    9AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    10AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    11AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    12PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    1PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    2PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    3PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    4PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    5PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    6PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    7PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    8PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    9PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    10PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    11PM
                                </div>
                                </div>
                                <div />
                            </div>

                            {/* Events */}
                            <ol
                                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            >
                                <li className="relative mt-px flex" style={{ gridRow: '74 / span 12' }}>
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                                >
                                    <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                                    <p className="text-blue-500 group-hover:text-blue-700">
                                    <time dateTime="2022-01-22T06:00">6:00 AM</time>
                                    </p>
                                </a>
                                </li>
                                <li className="relative mt-px flex" style={{ gridRow: '92 / span 30' }}>
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                                >
                                    <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                                    <p className="order-1 text-pink-500 group-hover:text-pink-700">
                                    John F. Kennedy International Airport
                                    </p>
                                    <p className="text-pink-500 group-hover:text-pink-700">
                                    <time dateTime="2022-01-22T07:30">7:30 AM</time>
                                    </p>
                                </a>
                                </li>
                                <li className="relative mt-px flex" style={{ gridRow: '134 / span 18' }}>
                                <a
                                    href="#"
                                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
                                >
                                    <p className="order-1 font-semibold text-indigo-700">Sightseeing</p>
                                    <p className="order-1 text-indigo-500 group-hover:text-indigo-700">Eiffel Tower</p>
                                    <p className="text-indigo-500 group-hover:text-indigo-700">
                                    <time dateTime="2022-01-22T11:00">11:00 AM</time>
                                    </p>
                                </a>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
