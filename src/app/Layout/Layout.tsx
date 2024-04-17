import { Header } from '@/widgets/Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
