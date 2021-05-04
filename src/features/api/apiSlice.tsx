import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface CounterState {
  city: string;
  lat: number;
  lng: number;
}
const initialState: CounterState = {
  city: "東京",
  lat: 35.6761919,
  lng: 139.7690174,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLocationCity: (state, action) => {
      state.city = action.payload;
    },

    latLocation: (state, action) => {
        state.lat = action.payload;
    },
    lngLocation: (state, action) => {
        state.lng = action.payload;
    },
  },
});

export const { setLocationCity,latLocation,lngLocation } = locationSlice.actions;

export const selectCity = (state: RootState): string => state.location.city;
export const selectLat = (state: RootState): number => state.location.lat;
export const selectLng = (state: RootState): number => state.location.lng;

export default locationSlice.reducer;
