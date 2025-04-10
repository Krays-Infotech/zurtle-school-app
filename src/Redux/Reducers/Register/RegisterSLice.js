import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await NetworkRequest.post(
        configuration.apis.register,
        data
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
  registeredDetails: {},
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.basicDetails = {};
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredDetails = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
