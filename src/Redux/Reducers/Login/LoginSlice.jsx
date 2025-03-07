import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const login = createAsyncThunk(
  "loginDetails",
  async (values, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.post(configuration.apis.login, values);

      if (response?.status === 200) {
        const resultData = response.data;

        localStorage.setItem("id", resultData.id);
        localStorage.setItem("name", resultData.name);
        localStorage.setItem("role", resultData.role);
        localStorage.setItem("token", resultData.token);

        return resultData;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("Login Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const loginDetailsInitalState = {
  loginDetails: {},
  loading: false,
  error: null,
};

const loginDetailsSlice = createSlice({
  name: "loginDetails",
  initialState: loginDetailsInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loginDetails = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.loginDetails = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginDetails = {};
      });
  },
});

export default loginDetailsSlice.reducer;
