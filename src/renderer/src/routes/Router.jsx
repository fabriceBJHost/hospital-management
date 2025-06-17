import { createHashRouter } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import AuthLayout from '../layouts/AuthLayout'
import NotFound from '../components/NotFound'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import Users from '../components/Users'
import Patients from '../components/Patients'
import Doctors from '../components/Doctors'
import Appointment from '../components/Appointment'
import MedicalRecord from '../components/MedicalRecord'
import Prescription from '../components/Prescription'
import Setting from '../components/Setting'

/**
 * function who return all view
 */
const Router = createHashRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/patients',
        element: <Patients />
      },
      {
        path: '/doctor',
        element: <Doctors />
      },
      {
        path: '/appointment',
        element: <Appointment />
      },
      {
        path: '/medicalrecord',
        element: <MedicalRecord />
      },
      {
        path: '/prescription',
        element: <Prescription />
      },
      {
        path: '/setting',
        element: <Setting />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/*',
    element: <NotFound />
  }
])

export default Router
