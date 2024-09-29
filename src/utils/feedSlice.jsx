import {  createSlice } from "@reduxjs/toolkit";


const feedSlice=createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state)=>{
            const newFeed=state.slice(1);
            return newFeed;
        },        
        clearFeed:()=>{
            return [];
        }
    }

})

export const {addFeed, removeFeed,clearFeed}=feedSlice.actions;
export default feedSlice.reducer