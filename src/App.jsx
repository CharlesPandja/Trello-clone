import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage, Templates, Boards, ErrorPage, BoardRoot, BoardDetails } from './pages/pagesUtil';
import LoadingIndicator from './components/UI/LoadingIndicator';

const App = () => {
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
