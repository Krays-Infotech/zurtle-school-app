import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getCareerPathById = createAsyncThunk(
  "getCareerPathById",
  async (student_id, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.get(
        `${configuration.apis.careerPath}${student_id}`,
        data
      );

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch reports");
      }
    } catch (err) {
      console.error("Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const getCarrerPathInitalState = {
  studentCarrer: {},
  loading: false,
  error: null,
};

const getCareerPathByIdSlice = createSlice({
  name: "getCareerPathByIdSlice",
  initialState: getCarrerPathInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCareerPathById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCareerPathById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentCarrer = action.payload;
      })
      .addCase(getCareerPathById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getCareerPathByIdSlice.reducer;
