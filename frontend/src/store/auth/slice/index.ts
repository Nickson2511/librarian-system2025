import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | Record<string, string[]> | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

// Register Admin
export const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (
    {
      email,
      password,
      first_name,
      last_name,
    }: { email: string; password: string; first_name: string; last_name: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/accounts/register/',
        {
          email,
          password,
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: 'Token 1d39ebc5ddf3157424f1258feaf22210a90a8807',
          },
        }
      );

      return response.data.token;
    } catch (err) {
      const error = err as AxiosError<Record<string, string[]>>;
      return thunkAPI.rejectWithValue(error.response?.data || { message: ['Registration failed.'] });
    }
  }
);

// Login Admin

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        email,
        password,
      });

      return response.data.token;
    } catch (err) {
      const error = err as AxiosError<Record<string, string[]>>;
      // Ensure the returned error is always a consistent record
      const errorData = error.response?.data || { message: ['Invalid email or password'] };
      return thunkAPI.rejectWithValue(errorData);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Record<string, string[]> | string;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;




















