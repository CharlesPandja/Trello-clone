import { createSlice } from '@reduxjs/toolkit'

const initialState = { modalIsVisible: false, tableauSidebar: [] }

const modalSlice = createSlice({
    name: 'modalTableau',
    initialState,
    reducers: {
        openModal(state) {
            state.modalIsVisible = true;
        },
        closeModal(state) {
            state.modalIsVisible = false;
        },
        addTableauToSidebar(state, action) {
            state.tableauSidebar.push(action.payload);
        },

        removeItemToSidebar(state, action) {
            state.tableauSidebar = state.tableauSidebar.filter(item => item.idTableau !== action.payload.idTableau);
        },
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
