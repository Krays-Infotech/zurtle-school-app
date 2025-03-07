import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkRequest from "../../../config/network";
import configuration from "../../../config/configuration";

export const updateTeacher = createAsyncThunk(
    "updateTeacher",
    async ({ id, values }, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token");
  
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
  
        const response = await NetworkRequest.put(
          `${configuration.apis.updateTeacher}?id=${id}`,
          values,
          { headers }
        );
  
        if (response?.status === 200) {
          return response.data;
        } else {
          return rejectWithValue(response.data);
        }
      } catch (err) {
        console.error("Teacher update Error:", err);
        return rejectWithValue(err.response?.data || "An error occurred");
      }
    }
);

const updateTeacherInitalState = {
  teacherDetails: {},
  loading: false,
  error: null,
};

const updateTeacherSlice = createSlice({
  name: "updateTeacherSlice",
  initialState: updateTeacherInitalState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.teacherDetails = {};
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.teacherDetails = action.payload;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.teacherDetails = {};
      });
  },
});

export default updateTeacherSlice.reducer;
