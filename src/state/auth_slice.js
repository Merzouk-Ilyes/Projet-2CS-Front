import { createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'isLogged',
  initialState: { isLogged: false },
  reducers: {
    setLogin(state, action) {
        state.isLogged = action.payload;
      },
  
  },
})

export const actions = authSlice.actions;
export default authSlice.reducer