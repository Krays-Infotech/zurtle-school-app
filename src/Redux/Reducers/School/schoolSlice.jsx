import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSchool: null,
  selectedTeacher: null,
  selectedStudent: null,
  selectedParent: null,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setSelectedSchool: (state, action) => {
      state.selectedSchool = action.payload;
    },
    setSelectedTeacher: (state, action) => {
      state.selectedTeacher = action.payload;
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    setSelectedParent: (state, action) => {
      state.selectedParent = action.payload;
    },
  },
});

export const {
  setSelectedSchool,
  setSelectedTeacher,
  setSelectedStudent,
  setSelectedParent,
} = schoolSlice.actions;

export default schoolSlice.reducer;
