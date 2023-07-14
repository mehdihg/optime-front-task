import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const initialState = {
  comments: [],
  currentPage: 1,
  itemsPerPage: 4,
  items:[]
}
export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
      getComments: (state,action) => {
        state.comments = action.payload
      },
      addComment:(state,action)=>{
        state.items.push(action.payload)
      },

      removeComment:(state,action)=>{
        state.items=state.items.filter(item=>item.id !==action.payload)
      },
      editComment:(state,action)=>{
        
            let idx = state.items.find((item) => item.id == action.payload.id);
            
            idx.body=action.payload.body
            idx.createdAt=Date.now()

      
       
      },   
       loadMoreItems: (state, action) => {
       
        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const newItems = state.comments.slice(startIndex, endIndex);
        state.items = [...state.items,...newItems];
        state.currentPage += 1;
      },
      
    },
    

    

  })
export const { getComments,addComment,removeComment, editComment,replyComment,loadMoreItems  } = commentSlice.actions

export default commentSlice.reducer