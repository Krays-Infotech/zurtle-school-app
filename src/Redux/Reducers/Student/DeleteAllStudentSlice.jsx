import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const deleteAllStudent = createAsyncThunk(
    "deleteAllStudent",
    async ({ ids }, { rejectWithValue }) => {
        try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const response = await NetworkRequest.delete(
            configuration.apis.deleteAllStudent,
            { headers, data: ids }
          );

        if (response?.data?.status) {
            return response.data;
        } else {
            return rejectWithValue(response?.data?.message || "Failed to delete selected students");
        }
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Server error");
        }
    }
);

const deleteAllStudentInitialState = {
  remainingStudent: null,
  loading: false,
  error: null,
};

const deleteAllStudentSlice = createSlice({
  name: "deleteAllStudentSlice",
  initialState: deleteAllStudentInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllStudent.pending, (state) => {
        state.loading = true;
        state.remainingStudent = null;
        state.error = null;
      })
      .addCase(deleteAllStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.remainingStudent = action.payload;
      })
      .addCase(deleteAllStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.remainingStudent = null;
      });
  },
});

export default deleteAllStudentSlice.reducer;
