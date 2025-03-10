import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice.js';
import isOnReducer from './sidebarOnOff.js';


const store = configureStore({ reducer: { modal : modalReducer, onOff: isOnReducer } })

export default store