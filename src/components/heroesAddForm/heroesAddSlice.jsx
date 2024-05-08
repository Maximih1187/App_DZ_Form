import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
      res: {},
      statusAddHeroes: '',
}

export const heroesAddFetches = createAsyncThunk(
      'heroesAdd/heroesAddFetches',
      async (res) => {
            fetch("http://localhost:3001/heroes", {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(res)
            })
      }

)

const heroesAddSlise = createSlice({
      name: 'heroesAdd',
      initialState,
      reducers: {
            heroesAddFetch: (state, action) => { state.res = action.payload }
      },
      // extraReducers: (builder) => {
      //       builder
      //             .addCase(heroesAddFetches.rejected, state => { state.statusAddHeroes = 'ok' })
      // }
})


const { actions, reducer } = heroesAddSlise;
export default reducer;
export const { heroesAddFetch } = actions;
