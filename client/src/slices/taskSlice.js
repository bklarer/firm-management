import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/api/tasks");
    if (response.ok) {
      const tasks = await response.json();
      console.log("tasks", tasks)
      return tasks;
    } else {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }
  }
);

//check if waiting for promise

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded(state, action) {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectTaskById = (state, taskId) =>
  state.tasks.tasks.find((task) => task.id === taskId);

export const { taskAdded } = tasksSlice.actions;

export default tasksSlice.reducer;
