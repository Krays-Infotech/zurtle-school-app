import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.delete(
        `${configuration.apis.deleteStudent}/${id}`,
        { headers }
      );

      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message || "Failed to delete student");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

const deleteStudentInitialState = {
  remainingStudent: null,
  loading: false,
  error: null,
};

const deleteStudentSlice = createSlice({
  name: "deleteStudentSlice",
  initialState: deleteStudentInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.remainingStudent = null;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.remainingStudent = action.payload;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.remainingStudent = null;
      });
  },
});

export default deleteStudentSlice.reducer;
