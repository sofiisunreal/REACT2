import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

const AddEmployees = () => {
    // form state 
    const [first_name,setFirstName]=useState("")
    const[last_name,setLastName]=useState("")
    const[email,setEmail]=useState("")
    const[department,setDepartment]=useState("")

    const[departments,setDepartments]=useState([]) //empty array

    // extra ui states
    const[loading,setLoading]=useState("")
    const[error,setError]=useState("")
    const[success,setSuccess]=useState("")

    // fetch departments from backend server 
    const fetchDepartments=async()=>{
    try {
        const response= await axios.get("https://sophieemp.alwaysdata.net/api/departments/")
        console.log(response)
        setDepartments(response.data)
    } catch (error) {
    
}
    }
    // useEffect hook to prevent the multiple rebdering of the component each the state changes
    useEffect(()=>{
        fetchDepartments()
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading("Saving Employee...")
        setSuccess("")
        setError("")

        try {
            const data={
                first_name,
                last_name,
                email,
                department_id:department
            }
            const response= await axios.post("https://sophieemp.alwaysdata.net/api/employees",data)
            console.log(response)
            setLoading("")
            setSuccess(`Employee ${response.data.first_name} created successfully`)
            setFirstName("")
            setLastName("")
            setEmail("")
            setDepartment("")
        } catch (error) {
            setLoading("")
            setError(error.messahe)
        }
    }

  return (
    <div className='flex min-h-[70vh] items-center justify-center bg-gray-50 p-4'>
        <form action="" onSubmit={handleSubmit} className='w-full rounded-xl bg-white p-6 shadow border border-gray-100 space-y-4'>
            <div className='border-b border-gray-100 pb-2'>
                <h2 className='text-xl font-bold text-gray-800'>Add Employee</h2>
                <p className='text-xs text-gray-400 mt-1'>Register a new employee and assign them a department</p>
            </div>
        {/* status alerts */}
            {loading && (<p className='text-sm text-indigo-500 flex-items-center gap-2'> <i className='bi bi-arrow-repeat animate-spin'> </i> {loading}</p>)}

            {success && (<p className='text-sm text-indigo-500 flex-items-center gap-2'> <i className='bi bi-check-circle-fill'></i> {success}</p>)}            
            
            {error && (<p className='text-sm text-indigo-500 flex-items-center gap-2'> <i className='bi bi-exclamation-circle-fill'></i> {error}</p>)}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <label htmlFor="" className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>First Name</label>
                <input type="text" placeholder='enter your first name' className='w-full border border-gray-200 p-2 text-sm rounded-lg outline-none focus:border-indigo-500'required value={first_name} onChange={(e)=>setFirstName(e.target.value)} />

                <label htmlFor="" className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Last Name</label>
                <input type="text" placeholder='enter your last name' className='w-full border border-gray-200 p-2 text-sm rounded-lg outline-none focus:border-indigo-500'required value={last_name} onChange={(e)=>setLastName(e.target.value)} />

                <label htmlFor="" className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Email</label>
                <input type="text" placeholder='enter your email' className='w-full border border-gray-200 p-2 text-sm rounded-lg outline-none focus:border-indigo-500'required value={email} onChange={(e)=>setEmail(e.target.value)} />

                <label htmlFor="" className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Department</label>
                <select name="" id=""
                className='w-full border border-gray-200 p-2 text-sm rounded-lg outline-none focus:border-indigo-500' value={department} onChange={(e)=>setDepartment(e.target.value)}>
                     
                    <option value="">Select Department</option>
                    {departments.map((dept)=>(
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                </select>

                <button type='submit' className='w-60 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 shadow'>
                    Save Employee
                </button>
                
            </div>

        </form>
    </div>
  )
}

export default AddEmployees