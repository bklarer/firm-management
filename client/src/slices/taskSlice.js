import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", () => {
  return fetch("/api/tasks")
    .then((response) => response.json())
    .then((tasks) => {
        return (tasks)
    });
});

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
  
  
//   export const {
//   } = tasksSlice.actions;
  
  
  export default tasksSlice.reducer;