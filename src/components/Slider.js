import React from "react";

function Slider({ min, max, step, fluid, question }) {
    const [value, setValue] = React.useState(min);

        return (
            <div className="relative mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">{question}</label>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={fluid ? "any" : step}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-1.5 mt-2 bg-gray-300 rounded-md focus:ring-indigo-600"
                />
                <div className="text-gray-900">{value}</div>
            </div>
        );
}

export default Slider;
