import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route,Routes, BrowserRouter as Router, Link } from 'react-router-dom'
import AddDepartment from './components/AddDepartment'
import GetEmployees from './components/GetEmployees'
import AddEmployees from './components/AddEmployees'
import GetDepartment from './components/GetDepartment'


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <header className='bg-slate-900 shadow-sm border-b border-slate-800 p-4'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-xl font-bold tracking-tight text-white'><span className='text-indigo-400 font-extrabold'>Employee</span></h1>
        <nav className='flex items-center gap-2 text-xs'>
          <Link to={"/"} className='flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 hover:bg-slate-700'><i className='bi bi-people-fill'></i>Employees</Link>
        <Link to={"/addemployee"} className='flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 hover:bg-slate-700'><i className='bi bi-person-plus-fill'></i>Add Employees</Link>   
        <Link to={"/getdepartment"} className='flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 hover:bg-slate-700'><i className='bi bi-building'></i>Department</Link>  

        <Link to={"/adddepartment"} className='flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-100 hover:bg-slate-700'><i className='bi bi-building-add'></i>Add Department</Link>
        </nav>
      </div>
  </header>

      <Routes>
        <Route path='/' element={<GetEmployees/>}/>
        <Route path='/addemployee' element={<AddEmployees/>}/>
        <Route path='/getdepartment' element={<GetDepartment/>}/>
        <Route path="/adddepartment" element={<AddDepartment/>}/>
      </Routes>
    </Router>
  )
}

export default App
