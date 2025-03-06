import { createSlice } from '@reduxjs/toolkit'

const initialState = { tableauSidebar: [] }

const modalSlice = createSlice({
    name: 'modalTableau',
    initialState,
    reducers: {
        // Add a new tableau to the sidebar
        addTableauToSidebar(state, action) {
            state.tableauSidebar.push(action.payload);
        },

        // Remove an item(tableau) from the sidebar
        removeItemToSidebar(state, action) {
            state.tableauSidebar = state.tableauSidebar.filter(item => item.idTableau !== action.payload.idTableau);
        },

        // Add a new list to the selected tableau in the sidebar
        addListeToTableau(state, action) {
            const selectedTableau = state.tableauSidebar.find(tableau => tableau.idTableau === action.payload.idTableau)
            
            if (selectedTableau) {
                if(!selectedTableau.liste){
                    selectedTableau.liste = [];
                }
                selectedTableau.liste.push({
                    idListe : action.payload.idListe,
                    titreListe: action.payload.titreListe
                })
            }
        }
    }
})

const modalReducer = modalSlice.reducer

export const { openModal, closeModal, addTableauToSidebar, removeItemToSidebar, addListeToTableau } = modalSlice.actions
export default modalReducer
