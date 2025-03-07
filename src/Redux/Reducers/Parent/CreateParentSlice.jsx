import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const createParent = createAsyncThunk(
  "createParent",
  async (values, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.post(
        configuration.apis.createParent,
        values,
        { headers }
      );

      if (response?.status === 200) {
        const resultData = response.data;

        return resultData;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("Parent create Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const createParentInitalState = {
  parentDetails: {},
  loading: false,
  error: null,
};

const createParentSlice = createSlice({
  name: "createParentSlice",
  initialState: createParentInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createParent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.parentDetails = {};
      })
      .addCase(createParent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.parentDetails = action.payload;
      })
      .addCase(createParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.parentDetails = {};
      });
  },
});

export default createParentSlice.reducer;
