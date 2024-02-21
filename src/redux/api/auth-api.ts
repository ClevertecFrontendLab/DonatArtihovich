import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_PATH} from '@utils/const/api'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PATH
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body: {email: string, password: string}) => {
                return {
                    url: 'auth/registration',
                    method: 'post',
                    body
                }
            }
        }),
        loginUser: builder.mutation({
            query: (body: {email: string, password: string}) => {
                return {
                    url: 'auth/login',
                    method: 'post',
                    credentials: 'include',
                    body
                }
            }
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi