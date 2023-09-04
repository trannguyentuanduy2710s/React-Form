import { combineReducers } from "@reduxjs/toolkit";
import { ReactFormReducer } from "./reactForm/slice";


export const rootReducer = combineReducers({
    ReactFormStudent: ReactFormReducer
})