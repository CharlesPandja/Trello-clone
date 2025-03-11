import { createSlice } from '@reduxjs/toolkit'

const initialState = { tableauSidebar: [], notification: null }

const modalSlice = createSlice({
    name: 'modalTableau',
    initialState,
    reducers: {
        // Receive payload informations about the status 
        showNotification(state, action){
            state.notification = action.payload;
        },

        // Replace the existing tableau
        replaceTableauToSidebar(state, action) {
            state.tableauSidebar = action.payload;
        },

        // Add a new tableau to the sidebar
        addTableauToSidebar(state, action) {
            state.tableauSidebar.push(action.payload);
        },

        // Update the title of an existing tableau in the sidebar
        updateTableauToSidebar(state, action) {
            const selectedTableau = state.tableauSidebar.find(tableau => tableau.idTableau === action.payload.idTableau)
            const updatedTableau = { ...selectedTableau, titre: action.payload.titre }
            state.tableauSidebar = state.tableauSidebar.map(tableau => tableau.idTableau === updatedTableau.idTableau ? updatedTableau : tableau)
        },

        // Remove an item(tableau) from the sidebar
        removeItemToSidebar(state, action) {
            state.tableauSidebar = state.tableauSidebar.filter(item => item.idTableau !== action.payload.idTableau);
        },

        // Add a new list to the selected tableau in the sidebar
        addListeToTableau(state, action) {
            const selectedTableau = state.tableauSidebar.find(tableau => tableau.idTableau === action.payload.idTableau)

            if (selectedTableau) {
                if (!selectedTableau.liste) {
                    selectedTableau.liste = [];
                }
                selectedTableau.liste.push(action.payload)
            }
        },

        // Update specific liste of a selected tableau
        updateListeOfTableau(state, action) {
            const selectedTableau = state.selectedTableau.find(tableau => tableau.idTableau === action.payload.idTableau)
            if (selectedTableau) {
                const selectedListe = selectedTableau.liste.find(liste => liste.idListe === action.payload.idListe)
                const updatedListe = { ...selectedListe, titreListe: action.payload.titreListe }
                const updatedSelectedTableau = selectedTableau.liste.map(liste => liste.idListe === updatedListe.idListe ? updatedListe : liste)
                state.tableauSidebar = state.tableauSidebar.map(tableau => tableau.idTableau === updatedSelectedTableau.idTableau ? updatedSelectedTableau : tableau)
            }
        },

        // Add a new card to a specific liste of a tableau
        addCardToListeOfTableau(state, action) {
            const selectedTableau = state.tableauSidebar.find(tableau => tableau.idTableau === action.payload.idTableau)
            const selectedListe = selectedTableau.liste.find(liste => liste.idListe === action.payload.idListe)
            if (!selectedListe.carte) return selectedListe.carte = [];
            selectedListe.carte.push({
                idCarte: action.payload.idCarte,
                titreCarte: action.payload.titreCarte
            })
        }
    }
})

const modalReducer = modalSlice.reducer

export const { replaceTableauToSidebar, addTableauToSidebar, updateTableauToSidebar, removeItemToSidebar, addListeToTableau, updateListeOfTableau, addCardToListeOfTableau, showNotification } = modalSlice.actions
export default modalReducer
