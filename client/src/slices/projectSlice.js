import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async (_, { rejectWithValue }) => {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const projects = await response.json();
        console.log("projects", projects)
        return projects;
      } else {
        const error = await response.json();
        return rejectWithValue(error.errors);
      }
    }
  );


const initialState = {
    projects: [],
    loading: false,
    error: null,
  };

  const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
      projectAdded(state, action) {
        state.tasks.push(action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProjects.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
          state.tasks = action.payload;
          state.loading = false;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        });
    },
  });
  
  export const selectProjectById = (state, projectId) =>
    state.projects.projects.find((project) => project.id === projectId);
  
  export const { projectAdded } = projectsSlice.actions;
  
  export default projectsSlice.reducer;