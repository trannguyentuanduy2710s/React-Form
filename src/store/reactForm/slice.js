import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentList: [],
    studentEdit: undefined
}

const ReactFormSlice = createSlice({
    name: 'ReactForm',
    initialState,
    reducers: {
        addStudent: (state, actions) => {
            // console.log("payload: ", payload);
            state.studentList.push(actions.payload)
        },
        deleteStudent: (state, { payload }) => {
            // console.log("payload: ", payload);  ///payload chính là id                       
            state.studentList = state.studentList.filter(stu => stu.maSV !== payload)
        },
        editStudent: (state, { payload }) => {
            state.studentEdit = payload
        },
        updateStudent: (state, { payload }) => {
            // console.log("payload: ", payload);
            state.studentList = state.studentList.map((stu) => {
                if (stu.maSV === payload.maSV) {
                    return payload
                } else {
                    return stu
                }
            })

            state.studentEdit = undefined
        }
    }
})

export const { reducer: ReactFormReducer, actions: ReactFromActions } = ReactFormSlice