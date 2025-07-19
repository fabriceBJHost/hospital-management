import { Outlet, Navigate, useNavigation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStateContext } from '../context/AuthContext'
import Preload from '../components/Preload'

const DefaultLayout = () => {
  const { token } = useStateContext()
  const navigation = useNavigation()

  if (!token) {
    return <Navigate to={'/'} />
  }
  return (
    <>
      {navigation.state === 'loading' && <Preload />}
      <Navigation childrens={<Outlet />} />
    </>
  )
}

export default DefaultLayout
