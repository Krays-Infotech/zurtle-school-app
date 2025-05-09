import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../Redux/Reducers/School/schoolSlice";
import loginReducer from "../Redux/Reducers/Login/LoginSlice";
import saveAssessmentReducer from "../Redux/Reducers/Assessment/SaveTestReport";
import saveBasicDetailsReducer from "../Redux/Reducers/Login/saveBasic";
import saveUserIdsReducer from "../Redux/Reducers/Login/saveUser";
import getResultReducer from "../Redux/Reducers/Result/ResultSlice";
import genarateCarrerPathReducer from "../Redux/Reducers/Result/generateCareer";
import GetQuestionsReducer from "../Redux/Reducers/Assessment/GetQuestionsSlice";
import getCareerPathByIdReducer from "../Redux/Reducers/Result/getCareerPathById";
import registerReducer from "../Redux/Reducers/Register/RegisterSLice";
import paymentReducer from "../Redux/Reducers/Payment/createPaymentSlice";

export const store = configureStore({
  reducer: {
    school: schoolReducer,
    loginDetails: loginReducer,
    getQuestions: GetQuestionsReducer,
    saveAssessment: saveAssessmentReducer,
    saveBasics: saveBasicDetailsReducer,
    saveUserIds: saveUserIdsReducer,
    getResult: getResultReducer,
    genarateCarrer: genarateCarrerPathReducer,
    getCareerPath: getCareerPathByIdReducer,
    registerUser: registerReducer,
    createPayment: paymentReducer,
  },
});

export default store;
