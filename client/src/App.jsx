import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />  
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
