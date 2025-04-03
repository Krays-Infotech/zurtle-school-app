import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../Redux/Reducers/School/schoolSlice";
import loginReducer from "../Redux/Reducers/Login/LoginSlice";
import saveAssessmentReducer from "../Redux/Reducers/Assessment/SaveTestReport";
import saveBasicDetailsReducer from "../Redux/Reducers/Login/saveBasic";
import saveUserIdsReducer from "../Redux/Reducers/Login/saveUser";
import getResultReducer from "../Redux/Reducers/Result/ResultSlice";
import getCarrerPathReducer from "../Redux/Reducers/Result/getCarrerPath";
import GetQuestionsReducer from "../Redux/Reducers/Assessment/GetQuestionsSlice";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    loginDetails: loginReducer,
    getQuestions: GetQuestionsReducer,
    saveAssessment: saveAssessmentReducer,
    saveBasics: saveBasicDetailsReducer,
    saveUserIds: saveUserIdsReducer,
    getResult: getResultReducer,
    getCarrerPath: getCarrerPathReducer,
  },
});

export default store;
