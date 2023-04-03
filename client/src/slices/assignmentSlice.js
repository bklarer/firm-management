import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAssignments = createAsyncThunk(
  "tasks/fetchAssignments",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/api/assignments");
    if (response.ok) {
      const assignments = await response.json();
      return assignments;
    } else {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }
  }
);

//check if waiting for promise

const initialState = {
  assignments: [],
  loading: false,
  error: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    assignmentAdded(state, action) {
      state.assignments.push(action.payload);
    },
    taskRemoved(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      state.tasks.splice(index, 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
        state.loading = false;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});


export const { assignmentAdded, assignmentRemoved } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
