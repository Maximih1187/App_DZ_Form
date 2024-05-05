import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      filterHeroes: [],
      category: "all"
}

const filterSlice = createSlice({
      name: 'filter',
      initialState,
      reducers: {
            categoryFilter: (state, action) => { state.category = action.payload },
            heroesFilter: (state, action) => {
                  state.filterHeroes = action.payload.filter((item) => {
                        return item.element === state.category;
                  })
            },

      }
})

const { actions, reducer } = filterSlice;

export default reducer;
export const { heroesFilter, categoryFilter } = actions;
