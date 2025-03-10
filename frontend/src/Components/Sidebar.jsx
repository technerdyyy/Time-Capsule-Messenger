import React, {useState} from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';

const Sidebar = () => {
  const user = useSelector(state => state?.user)
  const [editUserOpen,setEditUserOpen] = useState(false)
  return (
    <div className='w-full h-full'>
      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between text-slate-600'>
        <div>
         <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} title='chat'>
          <IoChatbubbleEllipses
            size={25} 
          />
         </NavLink>

         <div title='add friend' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
         <FaUserPlus
            size={25}
         />
         </div>
         </div>

         <div className='flex flex-col items-center'>
          <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
          <FaCircleUser 
          size={35} />
          </button>

          <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
         <span className='-ml-2'>
         <TbLogout2 size={25} />
         </span>
         </button>
         </div>
      </div>

      {/* edit user details */} 
      {
        editUserOpen && (
          <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>      
         )
      }
    </div>
  )
}

export default Sidebar;
