import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage, Templates, Root, Boards, ErrorPage} from './pages/pagesUtil';

const App = () => {

const router = createBrowserRouter([
  { path: '/', 
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />},
      { path: 'templates', element: <Templates />},
      { path: 'boards', element: <Boards />},
      
    ]
  }
]);


  return (
    <RouterProvider router={router} />
  )
}

export default App
