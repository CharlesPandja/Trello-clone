import React, { useRef } from 'react';
import taskIcon from '../assets/taskIcon.png';
import timeIcon from '../assets/timeIcon.png';
import notifBackground from '../assets/bgNotification.jpg';
import linkIcon from '../assets/linkIcon.png';
import ModalTableau from '../components/ModalTableau.jsx';
import { openModal, closeModal } from '../store/modalSlice.js'
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
  const lastViewed = []
  const taskChecklist = [];

  const modalRef = useRef()


  const dispatch = useDispatch()
  const modalIsVisible = useSelector(state => state.modal.modalIsVisible)

  function handleModalTableau() {
    dispatch(openModal())
    // show modal using the exported function within the modal component with help of useImperativeHandle() methods
    if (modalRef.current) {
      modalRef.current.openDialog()
    }
  }


  return (
    <main className="w-3/4 min-h-screen bg-zinc-800 overflow-hidden text-stone-200">
      <div className="flex justify-center items-center gap-6 w-full mt-30 ml-12">
        <section className="w-1/2 mr-12">
          {taskChecklist.length === 0 &&
            <div>
              <div className='flex justify-left items-center gap-2 mb-4'>
                <img className="w-3" src={taskIcon} alt="task icon" />
                <h2 className="text-xs font-semibold">Vos tâches</h2>
              </div>
              <p className="text-sm text-center mb-4">Lorsque vous serez ajouté à une tâche de checklist, celle-ci s'affichera ici.</p>
              <div className="flex flex-col justify-center items-center rounded-sm border-1 border-black/40">
                <img className="mb-4" src={notifBackground} alt="Trullo background notification" />
                <p className="text-base text-center font-semibold mb-4">Restez sur la bonne voie et à jour</p>
                <p className="text-sm text-center mb-4 px-6">Lorsque vous serez ajouté à une tâche de checklist, celle-ci s'affichera ici.</p>
              </div>
            </div>}
        </section>
        <section className="w-1/2">
          <div className='mb-8 mr-20'>
            <div className='flex justify-left items-center gap-2 mb-4'>
              <img className="w-3" src={timeIcon} alt="task icon" />
              <h2 className="text-xs font-semibold">Récemment consultés</h2>
            </div>
            {lastViewed.length === 0 &&
              <div>
                <p className="text-sm mb-4">Aucun événement récent</p>
              </div>}
            <div className='mb-4'>
              <h2 className="text-xs font-semibold mt-20 mb-4">Liens</h2>
              <div onClick={handleModalTableau} className="flex justify-left items-center gap-3 bg-transparant text-stone-200 text-sm p-3 rounded-md cursor-pointer hover:bg-stone-600">
                <img className="w-4" src={linkIcon} alt="Trullo link icon" />
                <p>Créer un tableau</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ModalTableau isViewed={modalIsVisible} ref={modalRef} />
    </main>
  )
}

export default HomePage

