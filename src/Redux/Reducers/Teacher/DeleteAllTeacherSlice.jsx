import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const deleteAllTeacher = createAsyncThunk(
    "deleteAllTeacher",
    async ({ ids }, { rejectWithValue }) => {
        try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const response = await NetworkRequest.delete(
            configuration.apis.deleteAllTeacher,
            { headers, data: ids }
          );

        if (response?.data?.status) {
            return response.data;
        } else {
            return rejectWithValue(response?.data?.message || "Failed to delete selected teachers");
        }
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Server error");
        }
    }
);

const deleteAllTeacherInitialState = {
  remainingTeacher: null,
  loading: false,
  error: null,
};

const deleteAllTeacherSlice = createSlice({
  name: "deleteAllTeacherSlice",
  initialState: deleteAllTeacherInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllTeacher.pending, (state) => {
        state.loading = true;
        state.remainingTeacher = null;
        state.error = null;
      })
      .addCase(deleteAllTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.remainingTeacher = action.payload;
      })
      .addCase(deleteAllTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.remainingTeacher = null;
      });
  },
});

export default deleteAllTeacherSlice.reducer;
