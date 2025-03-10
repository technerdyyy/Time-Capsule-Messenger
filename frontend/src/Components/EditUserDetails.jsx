import React, {useEffect, useState} from 'react'
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'

const EditUserDetails = ({onClose,user}) => {
  const [data, setData] = useState({
    _id: user?._id || "",  // Ensure _id is included
    name: user?.name || "",
    email: user?.email || "",
    token: user?.token || "",
  });   

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        _id: user._id,  // Make sure _id is set properly
        name: user.name,
        email: user.email,
        token: user.token,
      }));
    }
  }, [user]);
  

  const handleOnChange = (e)=>{
    const {name, value} = e.target 
   
    console.log("Updating field:", name, "Value:", value);

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log("Submitting data:", data);

    e.stopPropagation()
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`

      const response = await axios.post(URL,data)

      console.log('response',response) 

      toast.success(response.data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message)  
    } 
  }
  return ( 
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
      <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='text-sm'>Edit User Details</p>
        
       <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name">Name:</label>
          <input 
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handleOnChange} 
          className='w-full py-1 px-2 focus:outline-primary border-0.5'
          />
        </div>
         
         <Divider/>
        <div className='flex gap-2 w-fit ml-auto'>
          <button onClick={onClose} className='border-primary border text-primary px-4 py-1 hover:bg-purple-900 hover:text-white rounded'>Cancel</button>
          <button onClick={handleSubmit} className='border-primary bg-purple-900 text-white border px-4 py-1 hover:bg-purple-700 rounded'>Save</button>
        </div>
       </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
