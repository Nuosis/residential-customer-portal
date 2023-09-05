import React, { useState } from 'react';

function Slider({ min, max, step, fluid, hoursBooked, setHoursBooked, question, unit }) {

    const handleChange = (e) => {
        const newValue = parseFloat(e.target.value);
        setHoursBooked(newValue); // update the parent component state
    };

    return (
        <div className="space-y-4">
        <label className="mt-4 block text-sm font-medium leading-6 text-gray-900">
            {question}
        </label>
        <div className="flex items-center space-x-4">
            <input
            type="range"
            min={min}
            max={max}
            step={fluid ? "any" : step}
            value={hoursBooked}
            onChange={handleChange}
            className="flex-grow h-1.5 bg-gray-300 rounded-md focus:ring-indigo-600"
            />
            <span className="text-xs text-gray-900">
            {`${hoursBooked}${unit ? ` ${unit}` : ''}`}
            </span>
        </div>
        </div>
    );
}

export default Slider;
