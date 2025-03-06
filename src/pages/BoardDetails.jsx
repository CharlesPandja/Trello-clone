import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addListeToTableau } from '../store/modalSlice.js';

const BoardDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [liste, setListe] = useState({
    idListe: null,
    titreListe: ''
  })

  const handleTitreListe = (e) => {
    setListe(prevState => ({ ...prevState, titreListe: e.target.value })
    )
  }
  console.log(liste)

  const params = useParams()
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar)
  const selectedTableau = tableauSidebar.find(element => element.titre === params.detailId)
  
  console.log(selectedTableau);

  function handleVisibilityCart() {
    setIsVisible(prevState => !prevState)
  }

  const dispatch = useDispatch()

  const handleSubmissionListe = () => {
    if (!selectedTableau) return;

    dispatch(addListeToTableau({
      idTableau: selectedTableau.idTableau,
      idListe: selectedTableau.liste ? selectedTableau.liste.length + 1 : 1,
      titreListe: liste.titreListe
    }));
    setListe({ idListe: null, titreListe: '' })
  }

  return (
    <main className={`${selectedTableau.backgroundColor} w-3/4 min-h-screen overflow-hidden`}>
      <div className="mt-12 text-white">
        <div className="pl-12 pt-5 w-full h-16 bg-zinc-800/60 font-bold mb-4">{params.detailId}</div>
        <div className="pl-12 flex flex-wrap gap-3 justify-left items-center">
          {selectedTableau.liste && selectedTableau.liste.map(liste => 

            <form key={liste.idListe} className="w-[250px] bg-neutral-900 p-2 rounded-lg text-stone-200">
              <input type="text" className="w-full px-3 font-semibold bg-transparent mb-3 text-base outline-none" defaultValue={liste.titreListe} />
              <button className="text-sm text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black">+ Ajouter une carte</button>
            </form>

          )}
          <div className="w-[250px] ml-12">
            {isVisible &&

              <form className="bg-neutral-900 p-2 rounded-lg text-stone-200">
                <input value={liste.titreListe} onChange={handleTitreListe} className="w-full text-sm bg-zinc-900 border-2 border-green-300 mb-1 outline-none h-9 px-3 rounded-sm mb-2" type="text" placeholder="Nom de la liste" />
                <button onClick={handleSubmissionListe} className="text-sm text-black rounded-sm cursor-pointer bg-blue-400 px-4 py-2 hover:bg-blue-300 mr-2" type="button">Ajouter une liste</button>
                <button onClick={handleVisibilityCart} className="text-sm text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black" type="button">Fermer</button>
              </form>}

            {!isVisible && <button onClick={handleVisibilityCart} className='w-full cursor-pointer font-semibold rounded-lg text-sm px-4 py-2 bg-stone-400/50 '>+ Ajouter une liste</button>}
          </div>
        </div>
      </div>
    </main>
  )
}

export default BoardDetails
