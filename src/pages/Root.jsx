import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
const Root = () => {
    return (
        <div className="overflow-hidden bg-zinc-800">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Root
