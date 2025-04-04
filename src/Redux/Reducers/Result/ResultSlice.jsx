import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getResult = createAsyncThunk(
  "getResult",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.get(
        `${configuration.apis.getResult}/${userId}`
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

const getResultInitalState = {
  resultDetails: {},
  loading: false,
  error: null,
};

const getResultSlice = createSlice({
  name: "getResultSlice",
  initialState: getResultInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resultDetails = action.payload;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getResultSlice.reducer;
