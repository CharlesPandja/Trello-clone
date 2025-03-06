import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Boards = () => {
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar)
  console.table(tableauSidebar)

  return (
    <main className="w-3/4 min-h-screen bg-zinc-800 overflow-hidden text-stone-200">
      <div className="mt-30 ml-12">
        <h1 className="text-base uppercase mb-4 font-bold">Vos espaces de travail</h1>
        <div className="flex flex-wrap justify-left items-center gap-4 text-white font-semibold text-base">
          {tableauSidebar ? tableauSidebar.map(element => <Link to={element.titre}><div key={element.id} className={`${element.backgroundColor} px-2 py-2 rounded-sm w-50 h-25 cursor-pointer`}>
            <p>{element.titre}</p>
          </div></Link>) : <p>Aucune information disponible pour l'instant</p>}
        </div>
      </div>
    </main>
  )
}

export default Boards
