// exampleReducer.js
import { createSlice } from '@reduxjs/toolkit';

const homeReducer = createSlice({
    name: 'homeReducer',
    initialState: {
        data: null,
        isDarkMode: false,
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
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },

    },
});

export const { setData,
    setProfileData,
    setProfileGarden,
    setDarkMode
} = homeReducer.actions;
export default homeReducer.reducer;
