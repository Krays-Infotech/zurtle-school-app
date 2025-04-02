import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../Redux/Reducers/School/schoolSlice";
import loginReducer from "../Redux/Reducers/Login/LoginSlice";
import saveAssessmentReducer from "../Redux/Reducers/Assessment/SaveTestReport";
import saveBasicDetailsReducer from "../Redux/Reducers/Login/saveBasic";
import saveUserIdsReducer from "../Redux/Reducers/Login/saveUser";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    loginDetails: loginReducer,
    saveAssessment: saveAssessmentReducer,
    saveBasics: saveBasicDetailsReducer,
    saveUserIds: saveUserIdsReducer,
  },
});

export default store;
