import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getAllParent = createAsyncThunk(
  "getAllParent",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching parents...");

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("User not authenticated");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await NetworkRequest.get(configuration.apis.getAllParent, { headers });
      console.log("API Response:", response);

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch parents");
      }
    } catch (error) {
      console.error("Error in getAllParent:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const getAllParentInitialState = {
  parentDetails: [],
  loading: false,
  error: null,
};

const getAllParentSlice = createSlice({
  name: "getAllParentSlice",
  initialState: getAllParentInitialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllParent.pending, (state) => {
        state.loading = true;
        state.parentDetails = [];
        state.error = null;
      })
      .addCase(getAllParent.fulfilled, (state, action) => {
        state.loading = false;
        state.parentDetails = action.payload?.data || [];
        state.error = null;
      })
      .addCase(getAllParent.rejected, (state, action) => {
        state.loading = false;
        state.parentDetails = [];
        state.error = action.payload;
      });
  },
});

export default getAllParentSlice.reducer;
