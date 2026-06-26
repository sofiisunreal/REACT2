import React, { use, useEffect, useState } from 'react'
import axios from 'axios'

const GetEmployees = () => {

  // state hooks 
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  // fetch employees 
  const GetEmployees = async () => {
    setLoading("Loading Employees..")
    setError("")
    const response = await axios.get("https://sophieemp.alwaysdata.net/api/employees")
    setEmployees(response.data)
    console.log(response)

  }
  useEffect(() => {
    GetEmployees()
  }, [])

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Employees Directory</h1>
        <span className='text-xs font-semibold bg-indigo-600 px-3 py-2 border border-indigo-500 rounded-lg text-white'>Total: {employees.length}</span>
      </div>
        {/* status alerts  */}
        {loading && (<p className='text-sm text-indigo-500 flex-items-center gap-2'> <i className='bi bi-arrow-repeat animate-spin'> </i> {loading}</p>)}

        {error && (<p className='text-sm text-indigo-500 flex-items-center gap-2'> <i className='bi bi-exclamation-circle-fill'></i> {error}</p>)}
        
        <div className='overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-xs mt-3'>
          <table className='w-full text-left text-sm text-gray-600'>
            <thead className='bg-gray-100 text-xs text-gray-700 uppercase tracking-wider border-b border-gray-200'>
              <tr>
                <th>ID</th>
                <th>Full Names</th>
                <th>Email</th>
                <th>Department</th>
                <th>Action</th>
              </tr>

            </thead>
            <tbody className='divide-y divide-gray-100'>
              
                {employees.map((emp)=>(
                  <tr key={emp.id} className='hover:bg-gray50/50'>
                    <td>#{emp.id}</td>
                    <td>{emp.first_name} {emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department.name}</td>
                    <td className='flex items-center gap-1 justify-center'>
                      <button className='rounded-lg bg-indigo-50 px-50 px-3 py-1 text-xs'> <i className='bi bi-pencil-square'></i>
                      Edit</button>
                      <button className='rounded-lg bg-indigo-50 px-50 px-3 py-1 text-xs'> <i className='bi bi-trash3 text-red'></i>
                      Delete
                      </button>
                    </td>

                  </tr>
                ))}
              

            </tbody>

          </table>

        </div>

      </div>

   
  )
}

export default GetEmployees