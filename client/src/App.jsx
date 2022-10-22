import { useState } from 'react'
import Header from './components/Header'
import Clients from './components/Clients'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />  
      <div className="container">
        <Clients/>
      </div>
    </>
  )
}

export default App
