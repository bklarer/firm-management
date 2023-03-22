import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("/api/users");
    const users = await response.json();
    return users;
  });

 //check if waiting for promise

const initialState = {
    users: [],
    loading: false,
    error: null,
   };

   const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
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
  
  
//   export const {
//   } = usersSlice.actions;
  
  
  export default usersSlice.reducer;