import React, { useState } from 'react';
import SidebarBtn from './SidebarBtn';
import { bagIcon, tableauxIcon, modelesIcon, homeIcon, workIcon, uneIcon, membersIcon, parametersIcon } from '../assets/imagesUtil.js';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemToSidebar } from '../store/modalSlice.js';
import { NavLink, Link } from 'react-router-dom';
const Sidebar = () => {
    const [isVisibleWorkspace, setIsVisibleWorkspace] = useState(false);
    const [isVisibleTableau, setIsVisibleTableau] = useState(false);
    const dispatch = useDispatch()

    const handleVisibilityWorkspace = () => {
        setIsVisibleWorkspace(prevState => !prevState);
    }

    const handleVisibilityTableau = () => {
        setIsVisibleTableau(prevState => !prevState);
    }

    const tableauSidebar = useSelector(state => state.modal.tableauSidebar)

    function handleRemoveItem(itemId) {
        dispatch(removeItemToSidebar({ id: itemId }));
    }


    const menuSidebar = [
        { id: 0, icon: bagIcon, name: 'Commencer' },
        { id: 1, icon: tableauxIcon, name: 'Tableaux' },
        { id: 2, icon: uneIcon, name: 'A la une' },
        { id: 3, icon: membersIcon, name: 'Membres' },
        { id: 4, icon: parametersIcon, name: 'Paramètres' },
    ]


    return (
        <aside className="w-1/4 min-h-screen bg-zinc-800 pl-15 py-8 pr-8 border-r-1 border-r-stone-200/20">
            <div className="mt-20 border-b-1 border-b-stone-200/20">
                <SidebarBtn onSelect={handleVisibilityTableau} source={tableauxIcon} name="array icon" ><NavLink to='/boards'>Tableaux</NavLink></SidebarBtn>

                {tableauSidebar && isVisibleTableau && tableauSidebar.map((element) =>
                    <div key={element.id} className="mb-1 flex justify-between items-center text-stone-200 p-2 gap-3 w-full text-sm font-medium hover:bg-stone-600 rounded-md">
                        <div className="flex justify-center items-center gap-2">
                            <div className={`${element.backgroundColor} rounded-xs w-8 h-6`} ></div>
                            <Link to={`/boards/${element.titre}`}>{element.titre}</Link>
                        </div>
                        <button onClick={() => handleRemoveItem(element.id)} className="bg-zinc-800 px-2 py-1 rounded-sm cursor-pointer">-</button>
                    </div>)}


                <SidebarBtn source={modelesIcon} name="modele icon">Modèles</SidebarBtn>
                <SidebarBtn source={homeIcon} name="array icon">Accueil</SidebarBtn>
            </div>
            <div className="mt-4">
                <p className="text-xs font-semibold text-stone-200 mb-3">Espace de travail</p>
                <SidebarBtn onSelect={handleVisibilityWorkspace} source={workIcon} name="array icon">Espace de travail Trullo</SidebarBtn>
                {isVisibleWorkspace && menuSidebar && menuSidebar.map(element => <SidebarBtn key={element.id} paddingL="10" source={element.icon} name={element.name}>{element.name}</SidebarBtn>)
                }
            </div>
        </aside>
    )
}

export default Sidebar
