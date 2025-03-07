import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const createTeacher = createAsyncThunk(
  "createTeacher",
  async (values, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await NetworkRequest.post(
        configuration.apis.createTeacher,
        values,
        { headers }
      );

      if (response?.status === 200) {
        const resultData = response.data;

        return resultData;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (err) {
      console.error("Teacher create Error:", err);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

const createTeacherInitalState = {
  teacherDetails: {},
  loading: false,
  error: null,
};

const createTeacherSlice = createSlice({
  name: "createTeacherSlice",
  initialState: createTeacherInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.teacherDetails = {};
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.teacherDetails = action.payload;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.teacherDetails = {};
      });
  },
});

export default createTeacherSlice.reducer;
