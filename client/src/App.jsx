import { useState } from 'react'
import Header from './components/Header'
import Clients from './components/Clients'
import Projects from './components/Projects'
import AddClientModal from './components/AddClientModal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />  
      <div className="container">
        <AddClientModal />
        <Projects/>
        <Clients/>
      </div>
    </>
  )
}

export default App
