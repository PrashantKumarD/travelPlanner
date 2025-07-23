import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/index.jsx'
import MyTrips from './my-trips/index.jsx'

// Layout component that includes Header
function Layout() {
  return (
    <div className="bg-gradient-to-br from-[#f0f4ff] via-[#f8f0ff] to-[#fef6fb] min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: "create-trip",
        element: <CreateTrip />
      },
      {
        path: 'view-trip/:tripId',
        element: <Viewtrip />
      },
      {
        path: 'my-trips',
        element: <MyTrips />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router}/>
      <Toaster/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
