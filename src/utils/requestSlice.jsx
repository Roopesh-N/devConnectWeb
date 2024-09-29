import { createSlice } from "@reduxjs/toolkit";


const requestSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload;
        },
        removeRequests:(state,action)=>{
            let newReqList=state.filter((req)=>req._id!=action.payload); 
            return newReqList
        },
        clearRequests:(state,action)=>{
            return null;
        }
    }
})

export const {addRequests,removeRequests, clearRequests}=requestSlice.actions;
export  default requestSlice.reducer;