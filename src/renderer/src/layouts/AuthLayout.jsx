import { Navigate, Outlet, useNavigation } from 'react-router-dom'
import AuthNavigation from '../components/AuthNavigation'
import { useStateContext } from '../context/AuthContext'
import Preload from '../components/Preload'

const AuthLayout = () => {
  const { token } = useStateContext()
  const navigation = useNavigation()

  // If token is present, redirect to home
  if (token) {
    return <Navigate to={'/dashboard'} /> // Prevent rendering the layout
  }

  return (
    <>
      {navigation.state === 'loading' && <Preload />}
      <AuthNavigation />
      <Outlet />
    </>
  )
}

export default AuthLayout
