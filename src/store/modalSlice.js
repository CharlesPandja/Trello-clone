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
            state.tableauSidebar = state.tableauSidebar.filter(item => item.id !== action.payload.id);
        }
    }
})

const modalReducer = modalSlice.reducer

export const { openModal, closeModal, addTableauToSidebar, removeItemToSidebar } = modalSlice.actions
export default modalReducer
