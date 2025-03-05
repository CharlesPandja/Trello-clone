import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice.js';
import listeSliceReducer from './listeSlice.js';



const store = configureStore({ reducer: { modal : modalReducer, liste : listeSliceReducer } })

export default store