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
    taskUpdated(state, action) {
      const existingTask = state.tasks.find(
        (task) => task.id === action.payload.id
      )
      if (existingTask) {
        existingTask.title = action.payload.title;
        existingTask.notes = action.payload.notes;
        existingTask.due_date = action.payload.due_date;
        existingTask.completed = action.payload.completed;
        existingTask.project_id = action.payload.project_id;
      }
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

export const selectTasksByProject = (state, projectId) =>
  state.tasks.tasks.filter((task) => task.project_id === projectId);

export const { taskAdded, taskUpdated, taskRemoved } = tasksSlice.actions;

export default tasksSlice.reducer;
