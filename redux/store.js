import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";


export default configureStore({
    reducer:{
       product:productSlice 
    }
})