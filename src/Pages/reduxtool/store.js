import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";


export const store=configureStore({
    reducer:{
        usersReducer,  
        
    }
});
// export default store;