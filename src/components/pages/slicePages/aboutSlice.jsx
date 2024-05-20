import { createAsyncThunk, createSlice, getState } from "@reduxjs/toolkit";
import { useLinkClickHandler } from "react-router-dom";
// const _apiKey = "4ca4e0f7a1c0e3bdc1240a5027d68f5f";
// const _apiBase = "https://gateway.marvel.com:443/v1/public/";

export const fetchChars = createAsyncThunk(
      'aboutSlice/fetchChars',

      async function (url, rejectWithValue) {


            try {

                  const response = await fetch(url)
                  console.log(response);
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
// export const fetchShoppingCart = createAsyncThunk(
//       'aboutSlice/fetchShoppingCart',
//       async function (id) {

//             const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=4ca4e0f7a1c0e3bdc1240a5027d68f5f`)

//             if (!response.ok) {
//                   throw new Error(`Could not fetch ${id}, status: ${response.status}`);
//             }
//             const data = await response.json()
//                   .then(res => res.data.results)

//             return data;

//       }
// )






//.thumbnail.path + "." + res.data.results[0].thumbnail.extension
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
      char: [],
      status: '',
      statusChar: '',
      error: null,
      idDescr: '',
      shoppingCart: [],
}

const aboutSlice = createSlice({
      name: 'aboutSlice',
      initialState,
      reducers: {
            getIdDescription: (state, action) => {
                  state.idDescr = [...state.idDescr, action.payload]


            },
            getDescriptions: (state, action) => {
                  state.char = action.payload

            },
            getShoppingCart: (state, action) => {
                  state.shoppingCart = [...state.shoppingCart, action.payload]

            }
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
                        state.status = 'Error';
                        state.error = action.payload
                  })
                  .addCase(fetchChar.pending, (state) => {
                        state.statusChar = "Loading"
                  })
                  .addCase(fetchChar.fulfilled, (state, action) => {
                        state.statusChar = "fulfilled";
                        state.char = serviceChars(action.payload)
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
export const { getIdDescription, getDescriptions, getShoppingCart } = actions;
