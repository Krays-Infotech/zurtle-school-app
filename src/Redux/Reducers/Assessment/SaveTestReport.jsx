import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const saveTestReport = createAsyncThunk(
  "saveTestReport",
  async (values, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.post(
        configuration.apis.saveAssessment,
        values
      );

      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  testReport: {},
  loading: false,
  error: null,
};

const saveTestSlice = createSlice({
  name: "saveTest",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveTestReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.testReport = {};
      })
      .addCase(saveTestReport.fulfilled, (state, action) => {
        state.loading = false;
        state.testReport = action.payload;
      })
      .addCase(saveTestReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saveTestSlice.reducer;
