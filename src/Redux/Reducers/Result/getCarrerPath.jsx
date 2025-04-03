import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getCarrerPath = createAsyncThunk(
  "getCarrerPath",
  async (data, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.get(
        configuration.apis.getCarrerPath,
        data
      );

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
  resultDetails: {},
  loading: false,
  error: null,
};

const getCarrerPathSlice = createSlice({
  name: "getCarrerPathSlice",
  initialState: getCarrerPathInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCarrerPath.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarrerPath.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resultDetails = action.payload;
      })
      .addCase(getCarrerPath.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getCarrerPathSlice.reducer;
