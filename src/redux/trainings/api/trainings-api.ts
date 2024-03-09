import { RootState } from "@redux/configure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_PATH } from "@utils/const/api";

export const trainingsApi = createApi({
    reducerPath: 'trainingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PATH,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token || localStorage.getItem('user')

            if(token) headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getTrainings: builder.query({   
            query: () => 'training'
        })
    })
})

export const {useGetTrainingsQuery} = trainingsApi; 