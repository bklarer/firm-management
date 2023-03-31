import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const headers = {
  "content-type": "application/json",
  Accept: "application/json",
};

export const registerUser = createAsyncThunk(
  `login/signup`,
  async (data, { rejectWithValue }) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }

    const user = await response.json();
    return user;
  }
);

export const userLogin = createAsyncThunk(
  `login/login`,
  async (data, { rejectWithValue }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }

    const user = await response.json();
    return user;
  }
);

export const checkLogin = createAsyncThunk(
  `login/check`,
  async (_, { rejectWithValue }) => {
    const response = await fetch("/api/me");

    if (response.ok) {
      const user = await response.json();
      console.log("Logged in user", user)
      return user;
    } else {
      const error = await response.json();
      return rejectWithValue(error.errors);
    }
  }
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
    logout(state) {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
    clearUserError(state){
      state.error = null;
    },
    loginUpdated(state, action) {
      const loggedInUser = state.userInfo
      if (loggedInUser) {
        loggedInUser.first_name = action.payload.first_name
        loggedInUser.last_name = action.payload.last_name
        loggedInUser.username = action.payload.username
        loggedInUser.email = action.payload.email
      }
    }
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

export const { logout, loginUpdated } = loginSlice.actions;

export default loginSlice.reducer;
