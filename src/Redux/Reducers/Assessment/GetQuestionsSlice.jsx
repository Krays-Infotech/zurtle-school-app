import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getQuestions = createAsyncThunk(
  "getQuestions",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching questions...");
      const response = await NetworkRequest.get(configuration.apis.getQuestions);

      console.log("API Response:", response);

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch questions");
      }
    } catch (err) {
      console.error("Get Questions Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const getQuestionsInitalState = {
  getQuestions: {},
  loading: false,
  error: null,
};

const getQuestionsSlice = createSlice({
  name: "getQuestions",
  initialState: getQuestionsInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.getQuestions = {};
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.getQuestions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.getQuestions = {};
      });
  },
});

export default getQuestionsSlice.reducer;
