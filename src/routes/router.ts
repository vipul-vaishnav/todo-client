import App from '@/App'

import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [{ index: true, Component: Home }]
  },
  {
    path: '*',
    Component: NotFound
  }
])
