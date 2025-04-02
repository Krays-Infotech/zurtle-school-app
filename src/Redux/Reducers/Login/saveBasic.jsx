import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

import axios from "axios";

export const saveBasicDetails = createAsyncThunk(
  "saveBasicDetails",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await NetworkRequest.put(
        `${configuration.apis.saveBasics}/${data.userId}`,
        data.basicDetails
      );

      if (response?.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      return rejectWithValue(err.response?.data || "Something went wrong!");
    }
  }
);

const initialState = {
  basicDetails: {},
  loading: false,
  error: null,
};

const saveBasicDetailsSlice = createSlice({
  name: "saveBasicDetailsSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveBasicDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.basicDetails = {};
      })
      .addCase(saveBasicDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.basicDetails = action.payload;
      })
      .addCase(saveBasicDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saveBasicDetailsSlice.reducer;
