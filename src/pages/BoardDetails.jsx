import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BoardDetails = () => {
  const [isVisible, setIsVisible] = useState(false)
  const params = useParams()
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar)
  const selectedTableau = tableauSidebar.find(element => element.titre === params.detailId)
  console.log(selectedTableau);

  function handleVisibilityCart() {
    setIsVisible(prevState => !prevState)
  }

  return (
    <main className={`${selectedTableau.backgroundColor} w-3/4 min-h-screen overflow-hidden`}>
      <div className="mt-12 text-white">
        <div className="pl-12 pt-5 w-full h-16 bg-zinc-800/60 font-bold mb-4">{params.detailId}</div>
        <div className="w-[250px] ml-12">
          {isVisible && <form className="bg-black p-2 rounded-lg text-stone-200">
            <input className="w-full text-sm bg-zinc-900 border-2 border-green-300 mb-1 outline-none h-9 px-3 rounded-sm mb-2" type="text" placeholder="Nom de la liste" />
            <button className="text-xs text-black rounded-sm cursor-pointer bg-blue-400 px-4 py-2 hover:bg-blue-300 mr-2" type="button">Ajouter une liste</button>
            <button onClick={handleVisibilityCart} className="text-xs text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black" type="button">Fermer</button>
          </form>}
          {!isVisible && <button onClick={handleVisibilityCart} className='w-full cursor-pointer font-semibold rounded-lg text-sm px-4 py-2 bg-stone-400/50 '>+ Ajouter une liste</button>}
        </div>
      </div>
    </main>
  )
}

export default BoardDetails
