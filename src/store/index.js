import {configureStore} from "@reduxjs/toolkit";
import homeReducer from "../screens/home/store/homeReducer";

const store = configureStore({
  reducer: {
    homeReducer: homeReducer,
    // Diğer reducer'ları buraya ekleyin
  },
});

export default store;
