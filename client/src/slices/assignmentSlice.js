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
      if (!state.assignments.find((assignment) => assignment.id === action.payload.id)) {
        state.assignments.push(action.payload);
      }
    },
    assignmentRemoved(state, action) {
      const index = state.assignments.findIndex(
        (assignment) => assignment.id === action.payload
      )
      state.assignments.splice(index, 1);
    },
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

export const selectAssignmensByTaskId = (state, taskId) => {
  return state.assignments.assignments.filter(
    (assignment) => assignment.task_id === taskId
  );
}

export const { assignmentAdded, assignmentRemoved } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
