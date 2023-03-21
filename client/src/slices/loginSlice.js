import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const registerUser = createAsyncThunk(
    `user/signup`,
    async (data, { rejectWithValue }) =>
      await fetch("/api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          return response.json().then((user) => {
            return user;
          });
        } else {
          return response.json().then((error) => {
            return rejectWithValue(error.errors);
          });
        }
      })
  );
  
  export const userLogin = createAsyncThunk(
    `user/login`,
    async (data, { rejectWithValue }) =>
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          return response.json().then((user) => {
            console.log(user)
            return user;
          });
        } else {
          return response.json().then((error) => {
            return rejectWithValue(error.errors);
          });
        }
      })
  );
  
  export const checkLogin = createAsyncThunk(
    `user/check`,
    async () =>
      await fetch("/api/me").then((response) => {
        if (response.ok) {
          return response.json().then((user) => {
            return user;
          });
        }
      })
  );

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
  };
  
  const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      logout: (state) => {
        state.loading = false;
        state.userInfo = null;
        state.error = null;
      },
      clearUserError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(userLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.userInfo = payload;
          state.error = null;
        })
        .addCase(userLogin.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.userInfo = payload;
          state.error = null;
        })
        .addCase(registerUser.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        })
        .addCase(checkLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(checkLogin.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.userInfo = payload;
        })
        .addCase(checkLogin.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        });
    },
  });

  export const {
    logout
  } = loginSlice.actions;

  export default loginSlice.reducer;