import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTableauToSidebar, addListeToTableau, addCardToListeOfTableau, updateListeOfTableau } from '../store/modalSlice.js';
import CloseCartBtn from '../components/Carte/CloseCartBtn.jsx';
import AddCartBtn from '../components/Carte/AddCartBtn.jsx';
import LoadingIndicator from '../components/UI/LoadingIndicator.jsx';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const BoardDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleCarte, setIsVisibleCarte] = useState({});
  const [tableau, setTableau] = useState(null);
  const [listes, setListes] = useState([]);
  const [liste, setListe] = useState({ idListe: null, titreListe: '' });
  const [carte, setCarte] = useState({ idCarte: null, titreCarte: '' });

  const params = useParams();
  const dispatch = useDispatch();
  const tableauSidebar = useSelector(state => state.modal.tableauSidebar);

  const selectedTableau = useMemo(
    () => tableauSidebar.find(element => element.idTableau === Number(params.detailId)),
    [tableauSidebar, params.detailId]
  );

  useEffect(() => {
    if (selectedTableau) {
      setTableau(selectedTableau);
    }
  }, [selectedTableau]);

  useEffect(() => {
    if (selectedTableau && selectedTableau.liste) {
      setListes(selectedTableau.liste);
    }
  }, [selectedTableau]);

  const handleUpdateTableau = (e) => {
    const newTitle = e.target.value;
    setTableau(prev => ({ ...prev, titre: newTitle }));

    dispatch(updateTableauToSidebar({
      idTableau: selectedTableau.idTableau,
      titre: newTitle
    }));
  };

  const idListeIncremented = useMemo(() => {
    return tableauSidebar.reduce((acc, current) => acc + (current.liste?.length || 0), 0);
  }, [tableauSidebar]);

  const handleTitreListe = (e) => {
    setListe(prev => ({ ...prev, titreListe: e.target.value }));
  };

  const toggleVisibility = () => setIsVisible(prev => !prev);

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

  const handleChangeTitreListe = (e, index) => {
    const updatedListes = listes.map(liste => liste.idListe === index ? { ...liste, titreListe: e.target.value } : liste);

    dispatch(updateListeOfTableau({
      idTableau: selectedTableau.idTableau,
      idListe: index,
      titreListe: e.target.value
    }));

    setListes(updatedListes);
  };

  const handleVisibilityCarte = (idListe) => {
    setIsVisibleCarte(prev => ({ ...prev, [idListe]: !prev[idListe] }));
  };

  const handleTitreCarte = (e) => {
    setCarte(prev => ({ ...prev, titreCarte: e.target.value }));
  };

  const handleSubmissionCarte = (id) => {
    const selectedList = selectedTableau.liste.find(liste => liste.idListe === id);
    if (!selectedList || !carte.titreCarte.trim()) return;

    const idCarteIncremented = selectedList.carte.length;

    dispatch(addCardToListeOfTableau({
      idTableau: selectedTableau.idTableau,
      idListe: id,
      idCarte: idCarteIncremented,
      titreCarte: carte.titreCarte
    }));

    setCarte({ idCarte: null, titreCarte: '' });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedListes = Array.from(listes);
    const [removed] = reorderedListes.splice(result.source.index, 1);
    reorderedListes.splice(result.destination.index, 0, removed);

    setListes(reorderedListes);
  };

  if (!tableau) return <LoadingIndicator />;

  return (
    <main className={`${selectedTableau.backgroundColor} w-3/4 min-h-screen overflow-hidden`}>
      <div className="mt-12 text-white">
        <div className="pl-12 pt-5 h-16 bg-zinc-800/60 font-bold mb-4">
          <input type="text" className="bg-transparent w-full outline-none cursor-pointer" value={selectedTableau?.titre || ''} onChange={handleUpdateTableau} />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="listes" direction="horizontal">
          {(provided) => (
            <div className="pl-12 flex flex-wrap gap-3 items-start" {...provided.droppableProps} ref={provided.innerRef}>
              {listes.map(({ idListe, titreListe }, index) => (
                <Draggable key={idListe} draggableId={String(idListe)} index={index}>
                  {(provided) => (
                    <form key={idListe} className="w-[250px] bg-neutral-900 p-2 rounded-lg text-stone-200" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <input
                        type="text"
                        className="w-full px-3 cursor-pointer font-semibold bg-transparent mb-3 text-base outline-none"
                        value={titreListe || ''}
                        onChange={(e) => handleChangeTitreListe(e, idListe)}
                      />
                      {listes.find(liste => liste.idListe === idListe).carte.map(carte =>
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

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
                    className="w-full text-white cursor-pointer font-semibold rounded-lg text-sm px-4 py-2 bg-stone-400/50"
                  >
                    + Ajouter une liste
                  </button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main >
  );
};

export default BoardDetails;
