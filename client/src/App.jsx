import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />  
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/projects/:id' element={<Project />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
