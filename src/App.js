import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: ':username',
            element: <Resume />
        }
    ])

    return <RouterProvider router={router} />
}
