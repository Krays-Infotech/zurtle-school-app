import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getAllStudent = createAsyncThunk(
  "getAllStudent",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching students...");

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User not authenticated");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await NetworkRequest.get(configuration.apis.getAllStudent, { headers });
      console.log("API Response:", response);

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error in getAllStudent:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const getAllStudentInitialState = {
  studentDetails: [],
  loading: false,
  error: null,
};

const getAllStudentSlice = createSlice({
  name: "getAllStudentSlice",
  initialState: getAllStudentInitialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllStudent.pending, (state) => {
        state.loading = true;
        state.studentDetails = [];
        state.error = null;
      })
      .addCase(getAllStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getAllStudent.rejected, (state, action) => {
        state.loading = false;
        state.studentDetails = [];
        state.error = action.payload;
      });
  },
});

export default getAllStudentSlice.reducer;
