import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/api/projects");
    if (response.ok) {
      const projects = await response.json();
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
      state.projects.push(action.payload);
    },
    projectUpdated(state, action) {
      const existingProject = state.projects.find(
        (project) => project.id === action.payload.id
      );
      if (existingProject) {
        existingProject.title = action.payload.title;
        existingProject.due_date = action.payload.due_date;
        existingProject.notes = action.payload.notes;
        existingProject.completed = action.payload.completed;
      }
    },
    projectRemoved(state, action) {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload
      );
      state.projects.splice(index, 1);
    },
    addProjectError: (state, action) => {
      state.error = action.error.message;
    },
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
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

export const {
  projectAdded,
  projectUpdated,
  projectRemoved,
  clearProjectError,
  addProjectError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
