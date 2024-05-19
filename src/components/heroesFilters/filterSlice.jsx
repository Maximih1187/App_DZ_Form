import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
      category: "all",
      stateButtons: []
}

export const buttonFilterFetch = createAsyncThunk(
      'filter/buttonFilterFetch',
      async (url, rejectWithValue) => {
            try {
                  const response = await fetch("http://localhost:3001/filters")
                  if (!response.ok) {
                        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                  }
                  const data = await response.json()
                  return data;
            } catch (error) {
                  return rejectWithValue(error.massage)
            }
      }
);




const filterSlice = createSlice({
      name: 'filter',
      initialState,
      reducers: {
            categoryFilter: (state, action) => { state.category = action.payload },
      },
      extraReducers: (builder) => {
            builder
                  .addCase(buttonFilterFetch.fulfilled, (state, action) => {
                        state.stateButtons = action.payload
                  })
      }
});

const { actions, reducer } = filterSlice;

export default reducer;
export const { heroesFilter, categoryFilter } = actions;
