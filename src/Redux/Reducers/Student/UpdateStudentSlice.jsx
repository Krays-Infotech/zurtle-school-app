import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const updateStudent = createAsyncThunk(
    "updateStudent",
    async ({ id, values }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
  
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
  
        const response = await NetworkRequest.put(
          `${configuration.apis.updateStudent}?id=${id}`,
          values,
          { headers }
        );
  
        if (response?.status === 200) {
          return response.data;
        } else {
          return rejectWithValue(response.data);
        }
      } catch (err) {
        console.error("Student update Error:", err);
        return rejectWithValue(err.response?.data || "An error occurred");
      }
    }
);

const updateStudentInitalState = {
  studentDetails: {},
  loading: false,
  error: null,
};

const updateStudentSlice = createSlice({
  name: "updateStudentSlice",
  initialState: updateStudentInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.studentDetails = {};
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentDetails = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.studentDetails = {};
      });
  },
});

export default updateStudentSlice.reducer;
