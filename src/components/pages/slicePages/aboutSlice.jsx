import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const _apiKey = "4ca4e0f7a1c0e3bdc1240a5027d68f5f";
// const _apiBase = "https://gateway.marvel.com:443/v1/public/";

export const fetchChars = createAsyncThunk(
      'aboutSlice/fetchChars',
      async function (url, { rejectWithValue }) {

            try {
                  const response = await fetch(url)

                  if (!response.ok) {
                        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                  }
                  const data = await response.json()
                        .then(res => res.data.results)

                  return data;
            } catch (error) {
                  throw (rejectWithValue(error.massage))
            }
      }
);

export const fetchChar = createAsyncThunk(
      'aboutSlice/fetchChar',
      async function (id, rejectWithValue) {
            try {
                  const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=4ca4e0f7a1c0e3bdc1240a5027d68f5f`)

                  if (!response.ok) {
                        throw new Error(`Could not fetch ${id}, status: ${response.status}`);
                  }
                  const data = await response.json()
                        .then(res => res.data.results)

                  return data;
            } catch (error) {
                  throw (rejectWithValue(error.massage))
            }
      }
)

const serviceChars = (chars) => chars.map(char => {
      return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            // homepage: char.urls[0].url,
            // wiki: char.urls[1].url,
            // comics: char.comics.items,

      };
})

const initialState = {
      chars: [],
      charImg: [],
      status: '',
      statusChar: '',
      error: null,
      shoppingCart: [],

}
// const slice = ({
//       name: "",
//       initialState,
//       reducer: {},
//       extraReducers: (builder) => {
//             builder
//                   .addCase(name.fulfilled, ()=>{

//                   })
//                   .addCase(name.fulfilled, ()=>{

//                   })
//                   .addCase(name.fulfilled, ()=>{

//                   })

//       }
// })

const aboutSlice = createSlice({
      name: 'aboutSlice',
      initialState,
      reducers: {
            // getIdDescription: (state, action) => {
            //       state.idDescr = [...state.idDescr, action.payload]

            //&& (!state.shoppingCart.includes(el))
            // },
            getDescriptions: (state, action,) => {
                  state.charImg = action.payload

            },
            addShoppingCart: (state, action) => {
                  state.chars.map((el) => {
                        //console.log(!state.shoppingCart.includes());
                        if (el.id === action.payload) {
                              state.shoppingCart.push(el)
                        }
                  })
            },
            deleteShoppingCart: (state, action) => {
                  state.shoppingCart = state.shoppingCart.filter((item) => item.id !== action.payload)

            },
            deleteChars: (state, action) => {

                  state.chars = state.chars.filter((item) =>
                        item.id !== action.payload)
            },

            addChardAfterDeleteChars: (state, action) => { //Добавляет в Chars из Карточного массива
                  state.shoppingCart.map((item) => {
                        if (item.id === action.payload) {
                              state.chars.push(item)
                        }
                  })

            },


      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchChars.pending, (state) => {
                        state.status = "Loading"
                  })
                  .addCase(fetchChars.fulfilled, (state, action) => {
                        state.status = "fulfilled";
                        state.chars = serviceChars(action.payload)
                  })
                  .addCase(fetchChars.rejected, (state, action) => {
                        state.status = 'error';
                        state.error = action.payload
                  })
                  .addCase(fetchChar.pending, (state) => {
                        state.statusChar = "loading"
                  })
                  .addCase(fetchChar.fulfilled, (state, action) => {
                        state.statusChar = "fulfilled";
                        state.charImg = serviceChars(action.payload)
                  })
                  .addCase(fetchChar.rejected, (state, action) => {
                        state.statusChar = 'Error';
                        state.error = action.payload
                  })
            // .addCase(fetchShoppingCart.fulfilled, (state, action) => {
            //       state.statusChar = "fulfilled";
            //       //state.shoppingCart.push(serviceChars(action.payload))
            // })
      }

})





const { actions, reducer } = aboutSlice;
export default reducer;
export const {
      getIdDescription,
      getDescriptions,
      addShoppingCart,
      deleteShoppingCart,
      deleteStateDisabl,
      deleteChars,
      addChardAfterDeleteChars } = actions;
