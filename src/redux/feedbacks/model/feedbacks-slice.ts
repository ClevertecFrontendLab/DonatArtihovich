import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FeedbackType } from "../types";

export type FeedbacksState = {
    feedbacks: FeedbackType[] | null;
}

const initialState: FeedbacksState = {
    feedbacks: null
}

export const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        setFeedbacks: (state, action: PayloadAction<FeedbackType[]>) => {
            state.feedbacks = action.payload
        }
    }
})

export const {setFeedbacks} = feedbacksSlice.actions