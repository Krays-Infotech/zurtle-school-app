import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const saveUserIds = createAsyncThunk(
  "saveUserIds",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      const response = await NetworkRequest.put(
        `${configuration.apis.saveIds}/${data.reqId}`,
        { user_id: data.userId }
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
  savedUsers: {},
  loading: false,
  error: null,
};

const saveUserIdsSlice = createSlice({
  name: "saveUserIdsSlice",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveUserIds.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.savedUsers = {};
      })
      .addCase(saveUserIds.fulfilled, (state, action) => {
        state.loading = false;
        state.savedUsers = action.payload;
      })
      .addCase(saveUserIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default saveUserIdsSlice.reducer;
