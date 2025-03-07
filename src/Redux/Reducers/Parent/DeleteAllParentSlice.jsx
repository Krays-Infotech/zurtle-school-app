import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const deleteAllParent = createAsyncThunk(
    "deleteAllParent",
    async ({ ids }, { rejectWithValue }) => {
        try {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const response = await NetworkRequest.delete(
            configuration.apis.deleteAllParent,
            { headers, data: ids }
          );

        if (response?.data?.status) {
            return response.data;
        } else {
            return rejectWithValue(response?.data?.message || "Failed to delete selected parents");
        }
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Server error");
        }
    }
);

const deleteAllParentInitialState = {
  remainingParent: null,
  loading: false,
  error: null,
};

const deleteAllParentSlice = createSlice({
  name: "deleteAllParentSlice",
  initialState: deleteAllParentInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllParent.pending, (state) => {
        state.loading = true;
        state.remainingParent = null;
        state.error = null;
      })
      .addCase(deleteAllParent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.remainingParent = action.payload;
      })
      .addCase(deleteAllParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.remainingParent = null;
      });
  },
});

export default deleteAllParentSlice.reducer;
