import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null,
    messages : [],
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
            setMessages : (state, actions) =>{
                state.messages = actions.payload
            }
        }
    }
)

export const {checkLogin, setMessages} = appSlice.actions
export default appSlice.reducer