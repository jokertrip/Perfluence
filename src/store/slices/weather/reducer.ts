import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WeatherModel } from '@/src/interfaces/models'
import { fetchAllData } from '@/src/store/slices/weather/actions'

const REDUX_ACCOUNT_NAME = 'weather'

const initialState: WeatherModel = {
  fetching: false,
  error: false,
  data: [],
}

const weatherSlice = createSlice({
  name: REDUX_ACCOUNT_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<WeatherModel>) => {
    builder.addCase(fetchAllData.pending, state => {
      state.fetching = true
      state.error = false
    })
    builder.addCase(fetchAllData.fulfilled, (state, action: PayloadAction<any>) => {
      state.fetching = false
      state.data = action.payload ? action.payload : []
    })
    builder.addCase(fetchAllData.rejected, state => {
      state.fetching = false
      state.error = true
    })
  },
})

export default weatherSlice.reducer
