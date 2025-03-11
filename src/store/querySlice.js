import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
    name: 'query',
    initialState: { query: '' },
    reducers: {
        updateQuery: (state, action) => {
            state.query = action.payload.query;
        }
    }
})

export const { updateQuery } = querySlice.actions;

const queryReducer = querySlice.reducer

export default queryReducer