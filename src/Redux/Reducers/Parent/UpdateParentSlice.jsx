import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const updateParent = createAsyncThunk(
    "updateParent",
    async ({ id, values }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
  
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
  
        const response = await NetworkRequest.put(
          `${configuration.apis.updateParent}?id=${id}`,
          values,
          { headers }
        );
  
        if (response?.status === 200) {
          return response.data;
        } else {
          return rejectWithValue(response.data);
        }
      } catch (err) {
        console.error("Parent update Error:", err);
        return rejectWithValue(err.response?.data || "An error occurred");
      }
    }
);

const updateParentInitalState = {
  parentDetails: {},
  loading: false,
  error: null,
};

const updateParentSlice = createSlice({
  name: "updateParentSlice",
  initialState: updateParentInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateParent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.parentDetails = {};
      })
      .addCase(updateParent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.parentDetails = action.payload;
      })
      .addCase(updateParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.parentDetails = {};
      });
  },
});

export default updateParentSlice.reducer;
