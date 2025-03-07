import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const deleteParent = createAsyncThunk(
  "deleteParent",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.delete(
        `${configuration.apis.deleteParent}/${id}`,
        { headers }
      );

      if (response?.data?.status) {
        return response.data;
      } else {
        return rejectWithValue(response?.data?.message || "Failed to delete parent");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

const deleteParentInitialState = {
  remainingParent: null,
  loading: false,
  error: null,
};

const deleteParentSlice = createSlice({
  name: "deleteParentSlice",
  initialState: deleteParentInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteParent.pending, (state) => {
        state.loading = true;
        state.remainingParent = null;
        state.error = null;
      })
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.remainingParent = action.payload;
      })
      .addCase(deleteParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.remainingParent = null;
      });
  },
});

export default deleteParentSlice.reducer;
