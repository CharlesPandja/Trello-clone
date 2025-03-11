import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showNotification, replaceTableauToSidebar } from './store/modalSlice.js'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage, Templates, Boards, ErrorPage, BoardRoot, BoardDetails } from './pages/pagesUtil';
import LoadingIndicator from './components/UI/LoadingIndicator';


let statusShowed = true;
const App = () => {
  const dispatch = useDispatch()
  const tableaux = useSelector(state => state.modal.tableauSidebar)

  useEffect(() => {

    const fetchDatas = async () => {
      const response = await fetch('https://trullo-1b39b-default-rtdb.firebaseio.com/tableaux.json')
      if (!response.ok) {
        throw new Error('Failed to fetch datas')
      }

      const data = await response.json()
      if (data) {
        dispatch(replaceTableauToSidebar(data))
      }
    }

    if(statusShowed){
      statusShowed = false;
      return;
    }
    fetchDatas()
  }, [])

  useEffect(() => {

    const sendTableauDatas = async () => {
      dispatch(showNotification({
        status: 'pending',
        title: '',
        message: 'Envoi des données en cours...'
      }))
      const response = await fetch('https://trullo-1b39b-default-rtdb.firebaseio.com/tableaux.json', {
        method: 'PUT',
        body: JSON.stringify(tableaux)
      })

      if (!response.ok) {
        throw new Error('Failed to send datas')
      }

      dispatch(showNotification({
        status: 'success',
        title: 'Succès',
        message: 'Données soumises avec succès'
      }))
    }
    
    if(statusShowed){
      statusShowed = false;
      return;
    }

    sendTableauDatas().catch(error => {
      dispatch(showNotification({
        status: 'error',
        title: 'Erreur!',
        message: 'Impossible de stocker vos données'
      }))
    })

  }, [tableaux])

  const Root = lazy(() => import('./pages/Root.jsx'));

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Suspense fallback={<LoadingIndicator />}><Root /></Suspense>,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'templates', element: <Templates /> },
        {
          path: 'boards', element: <BoardRoot />,
          children: [
            { index: true, element: <Boards /> },
            { path: ':detailId', element: <BoardDetails /> },
          ]
        },

      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
