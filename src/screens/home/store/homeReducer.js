// exampleReducer.js
import { createSlice } from '@reduxjs/toolkit';

const homeReducer = createSlice({
    name: 'homeReducer',
    initialState: {
        data: null,
        profileData: null,
        profileGarden: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        setProfileGarden: (state, action) => {
            state.profileGarden = action.payload;
        },

    },
});

export const { setData,
    setProfileData,
    setProfileGarden,
} = homeReducer.actions;
export default homeReducer.reducer;
