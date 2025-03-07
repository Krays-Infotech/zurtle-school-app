import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const createStudent = createAsyncThunk(
  "createStudent",
  async (values, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.post(
        configuration.apis.createStudent,
        values,
        { headers }
      );

      if (response?.data?.status === 200) {
        const resultData = response.data;

        return resultData;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("Student create Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const createStudentInitalState = {
  studentDetails: {},
  loading: false,
  error: null,
};

const createStudentSlice = createSlice({
  name: "createStudentSlice",
  initialState: createStudentInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.studentDetails = {};
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentDetails = action.payload;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.studentDetails = {};
      });
  },
});

export default createStudentSlice.reducer;
