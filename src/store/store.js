import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../Redux/Reducers/School/schoolSlice";
import loginReducer from "../Redux/Reducers/Login/LoginSlice";


export const store = configureStore({
  reducer: {
    school: schoolReducer,
    loginDetails: loginReducer,
    
  },
});

export default store;
