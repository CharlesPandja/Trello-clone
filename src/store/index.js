import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice.js';



const store = configureStore({ reducer: { modal : modalReducer } })

export default store