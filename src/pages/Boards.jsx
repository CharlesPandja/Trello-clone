import React from 'react';
import { useSelector } from 'react-redux';

const Boards = () => {
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar)
  console.log(tableauSidebar)

  return (
    <main className="w-3/4 min-h-screen bg-zinc-800 overflow-hidden text-stone-200">
      <div className="mt-30 ml-12">
        <h1 className="text-base uppercase mb-4 font-bold">Vos espaces de travail</h1>
        <div className="flex flex-wrap justify-center items-center gap-3 text-white font-bold text-base">
          {tableauSidebar ? tableauSidebar.map(element => <div key={element.id} className={`${element.color} rounded-sm w-30 h-20`}>
            <p>{element.name}</p>
          </div>) : <p>Aucune information disponible pour l'instant</p>}
        </div>
      </div>
    </main>
  )
}

export default Boards
