import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/api/users");
    if (response.ok) {
      const users = await response.json();
      return users;
    } else {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }
  }
);

//reject with value

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userUpdated(state, action) {
      const loggedInUser = state.users.find(
        (user) => user.id === action.payload.id
      );
      if (loggedInUser) {
        loggedInUser.first_name = action.payload.first_name;
        loggedInUser.last_name = action.payload.last_name;
        loggedInUser.username = action.payload.username;
        loggedInUser.email = action.payload.email;
      }
    },
    userRemoved(state, action) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload
      );
      state.users.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export const { userUpdated, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;
