import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTableauToSidebar } from '../store/modalSlice.js';
import { backgroundColors } from './util/backgroundColors.js';

const ModalTableau = forwardRef(({}, ref) => {
    const [modalContent, setModalContent] = useState({
        id: null,
        titre: '',
        visibility: 'private',
    })

    const [color, setColor] = useState('bg-blue-500')

    const titreRef = useRef()
    const visibilityRef = useRef()

    const dialogRef = useRef()
    useImperativeHandle(ref, () => ({
        openDialog: () => dialogRef.current.showModal()
    }
    ))

    function handleCloseModal() {
        dialogRef.current.close()
    }

    const handleTitre = () => setModalContent(prevModal => ({ ...prevModal, titre: titreRef.current.value }))

    const handleVisibility = () => setModalContent(prevModal => ({ ...prevModal, visibility: visibilityRef.current.value }))

    const dispatch = useDispatch()
    function handleSendToStore() {
        dispatch(addTableauToSidebar({
            idTableau: modalContent.id === null ? 1 : modalContent.id + 1,
            titre: modalContent.titre,
            visibility: modalContent.visibility,
            backgroundColor: color
        }))
        setModalContent(prevState => ({ ...prevState, id: prevState.id + 1 }))
        setColor('bg-blue-500')
    }

    function handleColor(color){
        setColor(color)
    }

    const tableauSidebar = useSelector(state => state.modal.tableauSidebar)
    console.log(tableauSidebar)

    return (

        <dialog ref={dialogRef} className="absolute top-15 left-3/8 w-1/4 p-4 bg-zinc-800 text-stone-200 rounded-lg border-1 border-zinc-900">
            <div className="flex justify-between items-center mb-4">
                {/* <button className={`${isViewed ? 'bg-transparant mr-12' : 'bg-transparant font-medium hover:bg-stone-600 p-2 text-sm cursor-pointer rounded-lg'}`}>{isViewed ? '' : 'Retour'}</button> */}
                <h2 className="text-sm font-semibold">Créer un tableau</h2>
                <button onClick={handleCloseModal} className="bg-transparant font-medium hover:bg-stone-600 p-2 text-sm cursor-pointer rounded-lg">Fermer</button>
            </div>
            <div className="w-full px-10 mb-4">
                <div className={`${color} rounded-md w-full h-20`}></div>
            </div>
            <div className='mb-4'>
                <h3 className="text-xs font-semibold mb-2">Fond d'écran</h3>
                {/* Liste de fonds d'écrans */}
                <div className="flex flex-wrap gap-1">
                    {backgroundColors && backgroundColors.map(element => <div onClick={() => handleColor(element.color)} key={element.id} className={`rounded-md w-12 h-8 cursor-pointer ${element.color}`}></div>)}
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-xs font-semibold mb-2">Titre du tableau*</h3>
                <input type="text" ref={titreRef} value={modalContent.titre} onChange={handleTitre} className="w-full text-sm bg-zinc-900 border-1 border-red-400 mb-1 outline-none h-9 px-3 rounded-sm focus:border-2 focus:border-green-300" />
                <p className="text-sm mb-4">Le tableau doit avoir un titre</p>
            </div>
            <div className="mb-5">
                <h3 className="text-xs font-semibold mb-2">Visibilité</h3>
                <select ref={visibilityRef} onChange={handleVisibility} className="w-full bg-zinc-900 border-1 font-normal text-sm focus:border-2 rounded-sm focus:border-green-300 h-9 px-3">
                    <option value="private">
                        Privé
                    </option>
                    <option value="workspace">
                        Espace de travail
                    </option>
                    <option value="public">
                        Public
                    </option>
                </select>
            </div>
            <div className="mb-4">
                <button onClick={handleSendToStore} className="w-full bg-stone-600 text-sm font-semibold  p-2 mb-2 rounded-sm cursor-pointer">Créer</button>
                <button className="w-full bg-stone-600 text-sm font-semibold p-2 rounded-sm cursor-pointer">Commencer par un modèle</button>
            </div>
        </dialog >
    )
})

export default ModalTableau
