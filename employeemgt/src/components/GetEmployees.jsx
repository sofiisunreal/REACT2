import React, { use, useEffect, useState } from 'react'
import axios from 'axios'

const GetEmployees = () => {

  // state hooks
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  // editing hooks
  const [editingId, setEditingId] = useState(null)
  const [editFirstName, setEditFirstName] = useState("")
  const [editLastName, setEditLastName] = useState("")
  const [editEmail, setEditEmail] = useState("")

  // fetch employees
  const GetEmployees = async () => {
    setLoading("Loading Employees..")
    setError("")
    const response = await axios.get("https://sophieemp.alwaysdata.net/api/employees")
    setEmployees(response.data)
    setLoading("")
    console.log(response)

  }
  useEffect(() => {
    GetEmployees()
  }, [])

  // function to handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sophieemp.alwaysdata.net/api/employees/${id}`)
      setEmployees(
        employees.filter((emp) => emp.id !== id)
      )
    } catch (error) {
      console.log(error)
    }

  }
  // function to handle edit
  const startEdit = (emp) => {
    setEditingId(emp.id)
    setEditFirstName(emp.first_name)
    setEditLastName(emp.last_name)
    setEditEmail(emp.email)
  }

  const updateEmployee = async () => {
    const data = {
      first_name: editFirstName,
      last_name: editLastName,
      email: editEmail
    }
    const response = await axios.put(
      `https://sophieemp.alwaysdata.net/api/employees/${editingId}`,
      data
    )
    setEmployees(
      employees.map((emp) => emp.id === editingId ? response.data : emp)
    )
    setEditingId(null)
  }


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
            <tr className='mb-2'>
              <th>ID</th>
              <th>Full Names</th>
              <th>Email</th>
              <th>Department</th>
              <th className='text-center'>Action</th>
            </tr>

          </thead>
          <tbody className='divide-y divide-gray-100'>

            {employees.map((emp) => (
              <tr key={emp.id} className='hover:bg-gray50/50'>
                <td>#{emp.id}</td>
                <td>
                  {editingId === emp.id ? (
                    <>
                      <input
                        type="text"
                        value={editFirstName}
                        onChange={(e) => setEditFirstName(e.target.value)}
                        className="border rounded px-2 py-1 w-24 mr-2"
                      />
                      <input
                        type="text"
                        value={editLastName}
                        onChange={(e) => setEditLastName(e.target.value)}
                        className="border rounded px-2 py-1 w-24"
                      />
                    </>
                  ) : (
                    `${emp.first_name} ${emp.last_name}`
                  )}
                </td>
                <td>
                  {editingId === emp.id ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    emp.email
                  )}
                </td>
                <td>{emp.department.name}</td>
                <td className="text-center">
                  <td className="text-center">
                    <div className="inline-flex gap-2">
                      {editingId === emp.id ? (
                        <>
                          <button
                            onClick={updateEmployee}
                            className="rounded-lg bg-green-100 text-green-700 px-3 mt-2 mb-2 py-1 text-xs"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg bg-gray-100 px-3 mt-2 mb-2 py-1 text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(emp)}
                            className="rounded-lg bg-indigo-50 px-3 mt-2 mb-2 py-1 text-xs"
                          >
                            <i className="bi bi-pencil-square me-1"></i>
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="rounded-lg bg-red-50 text-red-600 mb-2 mt-2 px-3 py-1 text-xs"
                          >
                            <i className="bi bi-trash3 me-1"></i>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>                </td>
              </tr>
            ))}


          </tbody>

        </table>

      </div>

    </div>


  )
}

export default GetEmployees
