import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getPersonality = createAsyncThunk(
  "getPersonality",
  async (_, { rejectWithValue }) => {
    try {
      const response = await NetworkRequest.get(configuration.apis.assessment);

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

const getPersonalityInitialState = {
  personalityQuestions: {},
  loading: false,
  error: null,
};

const getPersonalitySlice = createSlice({
  name: "getPersonalitySlice",
  initialState: getPersonalityInitialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPersonality.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.personalityQuestions = {};
      })
      .addCase(getPersonality.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.personalityQuestions = action.payload;
      })
      .addCase(getPersonality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.personalityQuestions = {};
      });
  },
});

export default getPersonalitySlice.reducer;
