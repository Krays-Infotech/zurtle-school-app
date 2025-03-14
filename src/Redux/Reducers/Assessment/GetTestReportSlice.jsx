import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getTestReport = createAsyncThunk(
  "getTestReport",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("Fetching Reports");
      const response = await NetworkRequest.get(`${configuration.apis.getTestReport}/${userId}`);

      console.log("API Response:", response);

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch reports");
      }
    } catch (err) {
      console.error("Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const getTestReportInitalState = {
  getReports: {},
  loading: false,
  error: null,
};

const getTestReportSlice = createSlice({
  name: "getTestReport",
  initialState: getTestReportInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTestReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.getReports = {};
      })
      .addCase(getTestReport.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.getReports = action.payload;
      })
      .addCase(getTestReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.getReports = {};
      });
  },
});

export default getTestReportSlice.reducer;
