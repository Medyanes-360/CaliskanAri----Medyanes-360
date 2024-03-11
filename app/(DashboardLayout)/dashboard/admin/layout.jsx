'use client'
import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import React, { useState } from 'react'

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background pb-4">
            <Sidebar/>

            <div className="flex flex-1 w-full flex-col h-full px-4 overflow-hidden gap-2">
                <Navbar/>

                <div className="flex flex-1 h-full overflow-auto px-2 pt-2 rounded-lg">
                    <div className="py-6 w-full pl-6 md:pl-0">
                    {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
