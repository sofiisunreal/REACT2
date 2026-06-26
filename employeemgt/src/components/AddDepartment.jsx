import React,{useState} from 'react'
import axios from 'axios'

const AddDepartment = () => {
     // hook
     // usestate hook
     // const [variable,function=usestate("initial state")]
     const[name,setName]=useState("")
     // ui feedback hooks
     const[loading,setLoading]=useState("")
     const[success,setSuccess]=useState("")
     const[error,setError]=useState("")
     
     const handleSubmit=async (e)=>{
          e.preventDefault()
          setLoading("Creating department")
          setSuccess("")
          setError("")

          try {
               const data={
                    name:name
               }
               const response= await axios.post("https://sophieemp.alwaysdata.net/api/departments/",data)
               console.log(response)
               setLoading("")
               setSuccess(`Department ${response.data.name} created successfully`)
          } catch (error) {
               setLoading("")
               setError(error.response?.data?.name)
          }
     }
     return (
     <div className='flex min-h-[50vh] items-center justify-center bg-gray-200 p-4'>
          <form action="" onSubmit={handleSubmit}
          className='w-full max-w-md rounded-xl bg-white p-6 shadow border border-gray-100 space-y-4'>
               <div className='border-b border-gray-100 pb-2'>
                    <h2 className='text-xl font-bold text-gray-800'>Add Department</h2>
                    <p className='text-xs text-gray-400 mt-1'>Create a new department for employees</p>
               </div>
               {loading && <> <p className='text-sm text-indigo-500'>{loading}</p></>}
               {success && <> <p className='text-sm text-green-500'>{success}</p></>}
               {error && <> <p className='text-sm text-red-500'>{error}</p></>}
               <div className='space-y-1'>
                    <label htmlFor="" className='block text-xs font-semibold text-gray-600 uppercase tracking-wider'>Department Name</label>
                    <input type="text" placeholder='eg Operation, Procurement,HR' required className='w-full border border-gray-200 p-3 text-sm rounded-lg outline-none focus:border-indigo-500 focus:ring-indigo-500/10 transition' value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    />
               </div>
               <button type='submit' className='w-full border border-gray-200 p-3 text-sm rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition'>
                    Save Department
               </button>

          </form>

     </div>
     )
}

export default AddDepartment