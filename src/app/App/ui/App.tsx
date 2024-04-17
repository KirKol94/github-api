import Layout from '@/app/Layout/Layout'
import { ErrorPage } from '@/pages/ErrorPage'
import { Home } from '@/pages/Home'
import { Team } from '@/pages/Team'
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
      {
        path: '/team',
        element: <Team />,
      },
    ],
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
