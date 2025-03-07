import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getAllTeacher = createAsyncThunk(
  "getAllTeacher",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching teachers...");

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User not authenticated");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await NetworkRequest.get(configuration.apis.getAllTeacher, { headers });
      console.log("API Response:", response);

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch teachers");
      }
    } catch (error) {
      console.error("Error in getAllTeacher:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const getAllTeacherInitialState = {
  teacherDetails: [],
  loading: false,
  error: null,
};

const getAllTeacherSlice = createSlice({
  name: "getAllTeacherSlice",
  initialState: getAllTeacherInitialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllTeacher.pending, (state) => {
        state.loading = true;
        state.teacherDetails = [];
        state.error = null;
      })
      .addCase(getAllTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherDetails = action.payload?.data || []; // Adjust based on API response
        state.error = null;
      })
      .addCase(getAllTeacher.rejected, (state, action) => {
        state.loading = false;
        state.teacherDetails = [];
        state.error = action.payload;
      });
  },
});

export default getAllTeacherSlice.reducer;
