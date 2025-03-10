import { createSlice } from '@reduxjs/toolkit';

const isOnSlice = createSlice({
    name: 'onOff',
    initialState: { isOn: false },
    reducers: {
        toggleOnOff: (state) => {
            state.isOn = !state.isOn;
        },

        toggleOffBySizeScreen: (state, action) => {
            if(action.payload.screenWidth < 762){
                state.isOn = true;
            }
        }
    }
})


export const { toggleOnOff, toggleOffBySizeScreen } = isOnSlice.actions;
const isOnReducer = isOnSlice.reducer
export default isOnReducer