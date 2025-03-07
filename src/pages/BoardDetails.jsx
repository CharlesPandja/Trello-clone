import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addListeToTableau } from '../store/modalSlice.js';

const BoardDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [liste, setListe] = useState({ idListe: null, titreListe: '' });

  const params = useParams();
  const dispatch = useDispatch();
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar);

  // Memoize selected tableau to avoid unnecessary re-renders
  const selectedTableau = useMemo(
    () => tableauSidebar.find(element => element.idTableau === Number(params.detailId)), 
    [tableauSidebar, params.detailId]
  );

  // Handle idListe incrementation for avoiding clashes in different tableaux
  const tableauWithListes = tableauSidebar.filter(element => element.liste.length > 0)
  const idListeIncremented = tableauWithListes.reduce((acc, current) => acc + current.liste.length, 0)
  console.log(idListeIncremented)

  // Handle input change for list title
  const handleTitreListe = (e) => {
    setListe(prev => ({ ...prev, titreListe: e.target.value }));
  };

  // Toggle visibility of the add-list form
  const toggleVisibility = () => setIsVisible(prev => !prev);

  // Dispatch action to add a new list
  const handleSubmissionListe = () => {
    if (!selectedTableau || !liste.titreListe.trim()) return;

    dispatch(addListeToTableau({
      idTableau: selectedTableau.idTableau,
      idListe: idListeIncremented,
      titreListe: liste.titreListe
    }));

    setListe({ idListe: null, titreListe: '' });
  };

  return (
    <main className={`${selectedTableau.backgroundColor} w-3/4 min-h-screen overflow-hidden`}>
      <div className="mt-12 text-white">
        {/* Board Title */}
        <div className="pl-12 pt-5 w-full h-16 bg-zinc-800/60 font-bold mb-4">
          {selectedTableau.titre}
        </div>

        {/* Lists & Add List Section */}
        <div className="pl-12 flex flex-wrap gap-3 items-start">
          {/* Render Existing Lists */}
          {selectedTableau.liste?.map(({ idListe, titreListe }) => (
            <form key={idListe} className="w-[250px] bg-neutral-900 p-2 rounded-lg text-stone-200">
              <input 
                type="text" 
                className="w-full px-3 font-semibold bg-transparent mb-3 text-base outline-none" 
                defaultValue={titreListe} 
              />
              <button className="text-sm text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black" type="button">
                + Ajouter une carte
              </button>
            </form>
          ))}

          {/* Add New List */}
          <div className="w-[250px]">
            {isVisible ? (
              <form className="bg-neutral-900 p-2 rounded-lg text-stone-200">
                <input 
                  value={liste.titreListe} 
                  onChange={handleTitreListe} 
                  className="w-full text-sm bg-zinc-900 border-2 border-green-300 outline-none h-9 px-3 rounded-sm mb-2" 
                  type="text" 
                  placeholder="Nom de la liste" 
                />
                <button 
                  onClick={handleSubmissionListe} 
                  className="text-sm text-black rounded-sm cursor-pointer bg-blue-400 px-4 py-2 hover:bg-blue-300 mr-2" 
                  type="button"
                >
                  Ajouter une liste
                </button>
                <button 
                  onClick={toggleVisibility} 
                  className="text-sm text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black" 
                  type="button"
                >
                  Fermer
                </button>
              </form>
            ) : (
              <button 
                onClick={toggleVisibility} 
                className="w-full cursor-pointer font-semibold rounded-lg text-sm px-4 py-2 bg-stone-400/50"
              >
                + Ajouter une liste
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoardDetails;
