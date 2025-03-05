import { createSlice } from '@reduxjs/toolkit';

const listeSlice = createSlice({
    name: 'liste',
    initialState: { liste: [] },
    reducers: {
        addCart: (state, action) => {
        state.liste.push(action.payload)
        },
        removeCart: (state, action) => {
             state.liste.filter((liste) => liste.idListe !== action.payload.idListe)
        }
    }
})

export const { addCart, removeCart } = listeSlice.actions;
const listeSliceReducer = listeSlice.reducer
export default listeSliceReducer