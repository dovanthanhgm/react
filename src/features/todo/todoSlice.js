import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos } from '../../services/todoService';

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, thunkAPI) => {
    try {
      let data = await fetchTodos();
      console.log(data);
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    ttdd: {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.ttdd = action.payload;
        console.log('extra');
      });
  },
});

export const todoSelector = (state) => state.todos.ttdd