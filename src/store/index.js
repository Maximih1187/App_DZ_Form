
import heroes from '../components/heroesList/heroesSlice';
import filter from '../components/heroesFilters/filterSlice'
import heroesAdd from '../components/heroesAddForm/heroesAddSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import aboutSlice from '../components/pages/slicePages/aboutSlice'
import formRegisterSlice from '../components/pages/slicePages/formRegisterSlice'


const stringMiddleware = () => (next) => (action) => {
      if (typeof action === "string") {
            return next({
                  type: action
            })
      }
      return next(action)
}

const store = configureStore({
      reducer: { heroes, filter, heroesAdd, aboutSlice, formRegisterSlice },
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
      devTools: process.env.NODE_ENV !== 'production'
})

export default store;
