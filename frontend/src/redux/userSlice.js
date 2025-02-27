import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id:"",
 name : "",
 email : "",
 token:"",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action)=>{
        state.id = action.payload._id
        state.name = action.payload.name
        state.email = action.payload.email
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    logout : (state,action)=>{
        state.id = ""
        state.name = ""
        state.email = ""

    }
   
  },
})


export const { setUser, setToken , logout } = userSlice.actions

export default userSlice.reducer