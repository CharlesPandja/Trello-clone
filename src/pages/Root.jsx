import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOffBySizeScreen } from '../store/sidebarOnOff';
import { Outlet } from 'react-router-dom';
const Root = () => {

    const isOn = useSelector((state) => state.onOff.isOn)
    const dispatch = useDispatch()

    console.log(isOn)
    
    useEffect(() => {
        const handleOnOff = () => {
            dispatch(toggleOffBySizeScreen({screenWidth: window.innerWidth}))
        }

        window.addEventListener('resize', handleOnOff)

        return () => window.removeEventListener('resize', handleOnOff)
    }, [])

    return (
        <div className="overflow-hidden bg-zinc-800">
            <Navbar />
            <div className="flex">
                {!isOn && <Sidebar />}
                <Outlet />
            </div>
        </div>
    )
}

export default Root
