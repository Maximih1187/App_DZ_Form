
import heroes from '../components/heroesList/heroesSlice';
import filter from '../components/heroesFilters/filterSlice'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
      if (typeof action === "string") {
            return next({
                  type: action
            })
      }
      return next(action)
}

const store = configureStore({
      reducer: { heroes, filter },
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
      devTools: process.env.NODE_ENV !== 'production'
})

export default store;
