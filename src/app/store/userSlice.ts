import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../types/user';
import { userService } from '../services/userService';


// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchRandomUser = createAsyncThunk(
  'users/fetchRandomUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.fetchRandomUser();
      return response.results[0];
    } catch (error) {
      return rejectWithValue('Failed to fetch random user');
    }
  }
);

export const fetchMultipleUsers = createAsyncThunk(
  'users/fetchMultipleUsers',
  async (count: number, { rejectWithValue }) => {
    try {
      const response = await userService.fetchMultipleUsers(count);
      return response.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch multiple users');
    }
  }
);

export const fetchUsersByNationality = createAsyncThunk(
  'users/fetchUsersByNationality',
  async (
    { nationality, count }: { nationality: string; count: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.fetchUsersByNationality(
        nationality,
        count
      );
      return response.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch users by nationality');
    }
  }
);
// User slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.login.uuid !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch random user
      .addCase(fetchRandomUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = [action.payload];
      })
      .addCase(fetchRandomUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch multiple users
      .addCase(fetchMultipleUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMultipleUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchMultipleUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch users by nationality
      .addCase(fetchUsersByNationality.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersByNationality.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersByNationality.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsers, clearError, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;