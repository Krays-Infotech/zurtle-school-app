import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const deleteTeacher = createAsyncThunk(
  "deleteTeacher",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.delete(
        `${configuration.apis.deleteTeacher}/${id}`,
        { headers }
      );

      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message || "Failed to delete teacher");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

const deleteTeacherInitialState = {
  remainingTeacher: null,
  loading: false,
  error: null,
};

const deleteTeacherSlice = createSlice({
  name: "deleteTeacherSlice",
  initialState: deleteTeacherInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.remainingTeacher = null;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.remainingTeacher = action.payload;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.remainingTeacher = null;
      });
  },
});

export default deleteTeacherSlice.reducer;
