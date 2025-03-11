import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice.js';
import isOnReducer from './sidebarOnOff.js';
import queryReducer from './querySlice.js';


const store = configureStore({ reducer: { modal : modalReducer, onOff: isOnReducer, query: queryReducer } })

export default store