import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";
import axios from "axios";

export const generateCarrer = createAsyncThunk(
  "generateCarrer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://engine.expolarity.ai/api/careers/generate",
        data
      );
      // NetworkRequest.get(
      //   configuration.apis.careerPath,
      //   data
      // );

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

const getCarrerPathInitalState = {
  carrerDetails: {},
  loading: false,
  error: null,
};

const generateCarrerPathSlice = createSlice({
  name: "generateCarrerPathSlice",
  initialState: getCarrerPathInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(generateCarrer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCarrer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.carrerDetails = action.payload;
      })
      .addCase(generateCarrer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default generateCarrerPathSlice.reducer;
