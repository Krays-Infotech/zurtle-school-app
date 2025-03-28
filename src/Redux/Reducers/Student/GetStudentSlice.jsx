import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const getStudent = createAsyncThunk(
  "getStudent",
  async (userId, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.get(
        `${configuration.apis.getStudent}/${userId}`,
        { headers }
      );

      if (response?.status) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch details");
      }
    } catch (err) {
      console.error("Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const getStudentInitalState = {
  studentDetails: {},
  loading: false,
  error: null,
};

const getStudentSlice = createSlice({
  name: "getStudent",
  initialState: getStudentInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.studentDetails = {};
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentDetails = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.studentDetails = {};
      });
  },
});

export default getStudentSlice.reducer;
