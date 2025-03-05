import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage, Templates, Root, Boards, ErrorPage, BoardRoot, BoardDetails} from './pages/pagesUtil';

const App = () => {

const router = createBrowserRouter([
  { path: '/', 
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />},
      { path: 'templates', element: <Templates />},
      { path: 'boards', element: <BoardRoot />,
        children: [
          {index: true, element: <Boards />},
          {path: ':detailId', element: <BoardDetails />},
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
