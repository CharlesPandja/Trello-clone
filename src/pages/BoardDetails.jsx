import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTableauToSidebar, addListeToTableau, updateListeOfTableau, addCardToListeOfTableau } from '../store/modalSlice.js';
import CloseCartBtn from '../components/Carte/CloseCartBtn.jsx';
import AddCartBtn from '../components/Carte/AddCartBtn.jsx';

const BoardDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCarte, setIsVisibleCarte] = useState({});
  const [tableau, setTableau] = useState({});
  const [liste, setListe] = useState({ idListe: null, titreListe: '' });
  const [carte, setCarte] = useState({ idCarte: null, titreCarte: '' })

  const params = useParams();
  const dispatch = useDispatch();
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar);

  // Memoize selected tableau to avoid unnecessary re-renders
  const selectedTableau = useMemo(
    () => tableauSidebar.find(element => element.idTableau === Number(params.detailId)),
    [tableauSidebar, params.detailId]
  );

  useEffect(() => setTableau(selectedTableau), [selectedTableau])

  console.table(selectedTableau)

  // Handle idListe incrementation for avoiding clashes in different tableaux
  const tableauWithListes = useMemo(() => tableauSidebar.filter(element => element?.liste.length > 0), [tableauSidebar])
  const idListeIncremented = useMemo(() => tableauWithListes.reduce((acc, current) => acc + current.liste.length, 0), [tableauWithListes])

  // Handle input change for list title
  // const handleTitreListe = (e) => setListe(prev => ({ ...prev, titreListe: e.target.value }));


  // Toggle visibility of the add-list form
  const toggleVisibility = () => setIsVisible(prev => !prev);

  // Dispatch action to add a new list
  const handleSubmissionListe = () => {
    if (!selectedTableau || !liste.titreListe.trim()) return;

    dispatch(addListeToTableau({
      idTableau: selectedTableau.idTableau,
      idListe: idListeIncremented,
      titreListe: liste.titreListe,
      carte: []
    }));

    setListe({ idListe: null, titreListe: '' });
  };

  // const handleChangeTitreListe = (e, idListe) => {

  //   dispatch(updateListeOfTableau({
  //     idTableau: selectedTableau.idTableau,
  //     idListe: idListe,
  //     titreListe: e.target.value
  //   }))
  // }

  const handleVisibilityCarte = (idListe) => setIsVisibleCarte(prev => ({ ...prev, [idListe]: !prev[idListe] }));

  const handleTitreCarte = (e) => setCarte(prev => ({ ...prev, titreCarte: e.target.value }))

  const handleUpdateTableau = (e) => setTableau(prev => ({ ...prev, titre: e.target.value }))


  // Dispatch action to add a new carte in a list
  const handleSubmissionCarte = (id) => {
    const selectedListes = selectedTableau.liste.filter(liste => liste.carte.length > 0)
    console.table(selectedListes)
    const idCarteIncremented = selectedListes.reduce((acc, curr) => acc + curr.carte.length, 0)
    if (!selectedListes || !carte.titreCarte.trim()) return;

    dispatch(addCardToListeOfTableau({
      idTableau: selectedTableau.idTableau,
      idListe: id,
      idCarte: idCarteIncremented,
      titreCarte: carte.titreCarte
    }))

    setCarte(prev => ({ ...prev, idCarte: prev.idCarte + 1, titreCarte: '' }))
  }

  return (
    <main className={`${selectedTableau.backgroundColor} w-3/4 min-h-screen overflow-hidden`}>
      <div className="mt-12 text-white">
        {/* Board Title */}
        <div className="pl-12 pt-5 w-full h-16 bg-zinc-800/60 font-bold mb-4">
          <input type="text" className="bg-transparent outline-none cursor-pointer" value={selectedTableau.titre} onChange={handleUpdateTableau} />
        </div>

        {/* Lists & Add List Section */}
        <div className="pl-12 flex flex-wrap gap-3 items-start">
          {/* Render Existing Lists */}
          {selectedTableau.liste?.map(({ idListe, titreListe }) => (
            <form key={idListe} className="w-[250px] bg-neutral-900 p-2 rounded-lg text-stone-200">
              {/* List title */}
              <input
                type="text"
                className="w-full px-3 cursor-pointer font-semibold bg-transparent mb-3 text-base outline-none"
                value={titreListe}
                // onChange={(e) => handleChangeTitreListe(idListe, e)}
              />
              {selectedTableau.liste.find(liste => liste.idListe === idListe).carte.map(carte =>
                <div key={carte.idCarte} className="w-full p-2 bg-stone-600 mb-2 rounded-lg">
                  {carte.titreCarte}
                </div>
              )}
              {isVisibleCarte[idListe] &&
                <div>
                  <textarea value={carte.titreCarte} onChange={handleTitreCarte} placeholder="Saisissez un titre ou copiez un lien" className="w-full text-sm border-2 border-green-300 outline-none h-16 px-3 rounded-sm mb-2" />
                  <button
                    onClick={() => handleSubmissionCarte(idListe)}
                    className="text-sm text-black rounded-sm bg-blue-400 px-4 py-2 hover:bg-blue-300 mr-2"
                    type="button"
                  >
                    Ajouter une carte
                  </button>
                  <CloseCartBtn onClose={() => handleVisibilityCarte(idListe)}>Fermer</CloseCartBtn>
                </div>
              }
              {!isVisibleCarte[idListe] && <button onClick={() => handleVisibilityCarte(idListe)} className="text-sm text-white rounded-sm cursor-pointer px-4 py-2 hover:bg-stone-200 hover:text-black" type="button">
                + Ajouter une carte
              </button>}
            </form>
          ))}

          {/* Add New List */}
          <div className="w-[250px]">
            {isVisible ? (
              <form className="bg-neutral-900 p-2 rounded-lg text-stone-200">
                <input
                  value={liste.titreListe}
                  onChange={handleTitreListe}
                  className="w-full text-sm bg-zinc-900 cursor-pointer border-2 border-green-300 outline-none h-9 px-3 rounded-sm mb-2"
                  type="text"
                  placeholder="Nom de la liste"
                />
                <AddCartBtn
                  onAdd={handleSubmissionListe}
                >
                  Ajouter une liste
                </AddCartBtn>
                <CloseCartBtn
                  onClose={toggleVisibility}
                >
                  Fermer
                </CloseCartBtn>
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
