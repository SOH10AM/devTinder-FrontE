import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(status,action)=>{
            const newArray=status.filter((r)=>r._id!=action.payload);
            return newArray;
        }
    },
});

export const {addFeed,removeFeed}=feedSlice.actions;
export default feedSlice.reducer;