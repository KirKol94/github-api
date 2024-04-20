import Layout from '@/app/Layout/Layout'
import { ErrorPage } from '@/pages/ErrorPage'
import { Home } from '@/pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
