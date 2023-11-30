/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    imageUrl:{
      public_id:'',
      url:''
    }
  },
  reducers:{
      setTheImageDetails:(state,action)=>{
        state.imageUrl = action.payload
      }
  }
});

export const {
  setTheImageDetails
} = productSlice.actions;

export default productSlice.reducer;
