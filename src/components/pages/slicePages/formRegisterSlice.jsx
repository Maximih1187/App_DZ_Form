import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendingfetchForm = createAsyncThunk(
      "formRegisterSlice/fetchForm",
      async (regObj, { dispatch }) => {
            const response = await fetch("http://localhost:3001/users", {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(regObj)
            })
            //const data = await response.json();
            // dispatch(onRegistrSubmitForm(data));
      }
)

export const fetchDbFilter = createAsyncThunk(
      "formRegisterSlice/fetchDbFilter",
      async (_, { dispatch }) => {

            const response = await fetch('http://localhost:3001/users')
            // if (!response.ok) {
            //       throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            // }
            const data = await response.json()


            dispatch(onRegistrSubmitForm(data))


      }
)

const initialState = {
      stateSending: "",
      registerObj: [],
      stateAuthorization: [false,],
}

const formRegisterSlice = createSlice({
      name: "formRegisterSlice",
      initialState,
      reducers: {
            onRegistrSubmitForm: (state, action) => {
                  state.registerObj = action.payload.map((item) => {
                        return item.login + item.password
                  })
            },
            onToggleAuthorization: (state, action) => {
                  state.stateAuthorization = action.payload

            },

      },
      extraReducers: (builder) => {
            builder
                  .addCase(sendingfetchForm.fulfilled, (state) => {
                        state.stateSending = 'fulfilled'
                  })

      }
})


const { reducer, actions } = formRegisterSlice;

export default reducer;
export const { onRegistrSubmitForm, onToggleAuthorization } = actions;
