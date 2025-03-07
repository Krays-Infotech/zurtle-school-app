import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getStudentReport = createAsyncThunk(
  "getStudentReport",
  async ({ studentId }, { rejectWithValue }) => {
    try {
      console.log("Fetching student report...");

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User not authenticated");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await NetworkRequest.get(
        `${configuration.apis.getReportByStudent}/${studentId}`,
        { headers }
      );
      console.log("API Response:", response);

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch student report");
      }
    } catch (error) {
      console.error("Error in getStudentReport:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const getStudentReportInitialState = {
  studentDetails: [],
  loading: false,
  error: null,
};

const getStudentReportSlice = createSlice({
  name: "getStudentReportSlice",
  initialState: getStudentReportInitialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStudentReport.pending, (state) => {
        state.loading = true;
        state.studentDetails = [];
        state.error = null;
      })
      .addCase(getStudentReport.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDetails = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getStudentReport.rejected, (state, action) => {
        state.loading = false;
        state.studentDetails = [];
        state.error = action.payload;
      });
  },
});

export default getStudentReportSlice.reducer;
