import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';



const heroesArapter = createEntityAdapter();

const initialState = heroesArapter.getInitialState({
      heroesLoadingStatus: 'idle',
});

export const fetchHeroes = createAsyncThunk(
      'heroes/fetchHeroes',
      () => {
            const { request } = useHttp();
            return request("http://localhost:3001/heroes")
      }
);

const heroesSlice = createSlice({
      name: 'heroes',
      initialState,
      reducers: {
            // heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
            // heroesFetched: (state, action) => {
            //       state.heroesLoadingStatus = 'idle';
            //       state.heroes = action.payload
            // },
            // heroesFetchingError: state => { state.heroesLoadingStatus = 'error' },
      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
                  .addCase(fetchHeroes.fulfilled, (state, action) => {
                        state.heroesLoadingStatus = 'idle';
                        heroesArapter.setAll(state, action.payload)
                  })
                  .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
                  .addDefaultCase(() => { })
      }
});

const { actions, reducer } = heroesSlice;

export const { selectAll } = heroesArapter.getSelectors(state => state.heroes);

export const {
      heroesFetching,
      heroesFetched,
      heroesFetchingError,
} = actions;

export default reducer;
