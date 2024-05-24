import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null,
    fetchingData : true,
}

export const appSlice = createSlice(
    {
        name : 'app',
        initialState,
        reducers : {
            checkLogin : (state, actions) =>{   
                state.user = actions.payload
                state.fetchingData = false
            },
        }
    }
)

export const {checkLogin} = appSlice.actions
export default appSlice.reducer