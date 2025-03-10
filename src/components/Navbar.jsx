import React, { useState, useRef, useEffect } from 'react';
import menuImg from '../assets/menuLogo.png';
import notifImg from '../assets/notifIcon.png';
import helpImg from '../assets/helpIcon.png';
import { NavLink } from 'react-router-dom';
import ModalTableau from './ModalTableau';
import { toggleOnOff } from '../store/sidebarOnOff';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const style = "w-auto h-10 px-2 flex justify-center items-center rounded-sm cursor-pointer hover:bg-stone-600";
    const styleText = "text-sm font-semibold text-stone-200";

    const modalRef = useRef()

    const isOn = useSelector(state => state.onOff.isOn)
    const dispatch = useDispatch()
    const handleModalView = () => {
        if (modalRef.current) {
            modalRef.current.openDialog()
        }
    }

    const handleVisibilitySidebar = () => {
        dispatch(toggleOnOff());
    }

    useEffect(() => {
        const handleShowMenuItems = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleShowMenuItems)
        return () => window.removeEventListener('resize', handleShowMenuItems)

    }, [])

    return (
        <>
            <ModalTableau ref={modalRef} />

            <header className="fixed top-0 left-0 w-screen flex justify-between items-center bg-zinc-800 px-3 py-2 border-b-1 border-b-stone-200/20">
                <div className="flex justify-center items-center gap-2">
                    <div className={style}>
                        <img onClick={handleVisibilitySidebar} className="max-w-5" src={menuImg} alt="menu image" />
                    </div>
                    <div className={style}>
                        <h1 className="text-xl font-semibold text-stone-200"><NavLink to='/' >Trullo</NavLink></h1>
                    </div>
                    <div className={style}>
                        <p className={styleText}><NavLink to='/boards' >Espace de travail</NavLink></p>
                    </div>
                    {screenWidth > 762 &&
                        <><div className={style}>
                            <p className={styleText}>Récent</p>
                        </div>
                            <div className={style}>
                                <p className={styleText}>Favoris</p>
                            </div>
                            <div className={style}>
                                <p className={styleText}>Plus</p>
                            </div>
                        </>}
                    <button onClick={handleModalView} className="w-10 h-10 text-black/80 bg-blue-400 text-3xl rounded-sm cursor-pointer hover:bg-blue-300">+</button>
                </div>
                <div className="flex justify-center items-center gap-2">
                    {screenWidth > 762 &&
                        <div className="flex justify-center items-center gap-6">
                            <input className="w-full h-10 px-2 rounded-sm text-stone-200 text-sm border-1 border-stone-200 focus:border-green-300 outline-none" type="text" placeholder='Rechercher' />
                        </div>
                    }
                    <div className={style}>
                        <img className="max-w-5" src={notifImg} alt="menu image" />
                    </div>
                    <div className={style}>
                        <img className="max-w-5" src={helpImg} alt="menu image" />
                    </div>
                    <div className={style}>
                        <p className={`${styleText} bg-indigo-950 rounded-full px-2 py-1`}>ID</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
