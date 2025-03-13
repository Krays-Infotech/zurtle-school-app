import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const storeQuestionResponse = createAsyncThunk(
  "questions/store",
  async (values, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.post(configuration.apis.storeQuestion, values);

      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("storeQuestionResponse Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  storeDetails: {},
  loading: false,
  error: null,
};

const storeDetailsSlice = createSlice({
  name: "questionStore",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(storeQuestionResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.storeDetails = {};
      })
      .addCase(storeQuestionResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.storeDetails = action.payload;
      })
      .addCase(storeQuestionResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storeDetailsSlice.reducer;
