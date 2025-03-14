import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import configuration from "../../../config/configuration";
import NetworkToken from "../../../config/network";

export const createPayment = createAsyncThunk(
  "payment",
  async ({ values }: { values: {} }) => {
    try {
      const response = await NetworkToken.post(
        configuration.apis.payment,
        values,
      );
      if (response.status) {
        const resultData = response.data;
        return resultData;
      }
    } catch (err) {
      console.log(err);
    }
  },
);

const createPaymentInitialState = {
  paymentDetails: {},
  loading: false,
  error: null,
};

const createPaymentSlice = createSlice({
  name: "createPaymentSlice",
  initialState: createPaymentInitialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.paymentDetails = {};
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.paymentDetails = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.paymentDetails = {};
      });
  },
});

export default createPaymentSlice.reducer;
