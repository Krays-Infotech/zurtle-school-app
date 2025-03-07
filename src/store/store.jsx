import { configureStore } from "@reduxjs/toolkit";

import schoolReducer from "../Redux/Reducers/School/schoolSlice";
import loginReducer from "../Redux/Reducers/Login/LoginSlice";
import createTeacherReducer from "../Redux/Reducers/Teacher/CreateTeacherSlice";
import updateTeacherReducer from "../Redux/Reducers/Teacher/UpdateTeacherSlice";
import deleteTeacherReducer from "../Redux/Reducers/Teacher/DeleteTeacherSlice";
import deleteAllTeacherReducer from "../Redux/Reducers/Teacher/DeleteAllTeacherSlice";
import getAllTeacherReducer from "../Redux/Reducers/Teacher/GetAllTeacherSlice";
import createParentReducer from "../Redux/Reducers/Parent/CreateParentSlice";
import updateParentReducer from "../Redux/Reducers/Parent/UpdateParentSlice";
import deleteParentReducer from "../Redux/Reducers/Parent/DeleteParentSlice";
import deleteAllParentReducer from "../Redux/Reducers/Parent/DeleteAllParentSlice";
import getAllParentReducer from "../Redux/Reducers/Parent/GetAllParentSlice";
import createStudentReducer from "../Redux/Reducers/Student/CreateStudentSlice";
import updateStudentReducer from "../Redux/Reducers/Student/UpdateStudentSlice";
import deleteStudentReducer from "../Redux/Reducers/Student/DeleteStudentSlice";
import deleteAllStudentReducer from "../Redux/Reducers/Student/DeleteAllStudentSlice";
import getAllStudentReducer from "../Redux/Reducers/Student/GetAllStudentSlice";
import getStudentReportReducer from "../Redux/Reducers/StudentReport/GetStudentReportSlice";

export const store = configureStore({
  reducer: {
	  school: schoolReducer,
    loginDetails: loginReducer,
    createTeacher: createTeacherReducer,
    updateTeacher: updateTeacherReducer,
    deleteTeacher: deleteTeacherReducer,
    deleteAllTeacher: deleteAllTeacherReducer,
    getAllTeacher: getAllTeacherReducer,
    createParent: createParentReducer,
    updateParent: updateParentReducer,
    deleteParent: deleteParentReducer,
    deleteAllParent: deleteAllParentReducer,
    getAllParent: getAllParentReducer,
    createStudent: createStudentReducer,
    updateStudent: updateStudentReducer,
    deleteStudent: deleteStudentReducer,
    deleteAllStudent: deleteAllStudentReducer,
    getAllStudent: getAllStudentReducer,
    getStudentReport: getStudentReportReducer,
  },
});

export default store;
