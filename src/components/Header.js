import React, { useState } from 'react';
import SideOverWithHeader from './SideOverWithHeader';

export default function Header() {
        return (
        <div className="mt-10 mb-10 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Schedule Your Cleaner
            </h2>
            </div>
        </div>
        )
    }