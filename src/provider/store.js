import { configureStore } from '@reduxjs/toolkit'
import commentSlice from './commentSlice'

export const store = configureStore({
  reducer: {
    comments:commentSlice
  },
})