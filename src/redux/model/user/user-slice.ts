import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
    email: string | null,
    password: string | null,
    token: string | null
}

const initialState: IUserState = {
    email: null,
    password: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserToken: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token
        },
        setUserEmail: (state, action: PayloadAction<{email: string}>) => {
            state.email = action.payload.email
            console.log('payload: ', action.payload.email)
        },
        setUserPassword: (state, action: PayloadAction<{password: string}>) => {
            state.password = action.payload.password
        }
    }
})

export const { setUserToken, setUserEmail, setUserPassword } = userSlice.actions