import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const paymentStatus = createAsyncThunk(
  "paymentStatus",
  async ({ user_id, session_id, payment_status }, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.post(
        configuration.apis.paymentStatus,
        {
          user_id,
          session_id,
          payment_status,
        }
      );

      if (response?.status) {
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

const paymentStatusInitalState = {
  paymentDetails: {},
  loading: false,
  error: null,
};

const paymentStatusSlice = createSlice({
  name: "paymentStatusSlice",
  initialState: paymentStatusInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(paymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentDetails = {};
      })
      .addCase(paymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.paymentDetails = action.payload;
      })
      .addCase(paymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.paymentDetails = {};
      });
  },
});

export default paymentStatusSlice.reducer;
