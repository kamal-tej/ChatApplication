import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Connections from './pages/Connections'
import Chat from './pages/Chat'
import {createBrowserRouter, RouterProvider, useParams} from 'react-router-dom'
import { use } from 'react'

function App() {
  const {id} = useParams();
  console.log(id);
  const router = createBrowserRouter([{
    path: '/', element: <Connections/>
  },{
    path: '/chat/:id', element: <Chat/>
  }])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
