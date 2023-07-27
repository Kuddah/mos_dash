import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { BonusSheetApi, BonusSheet } from "pages/api/Bonus";
import { RootState } from "./store";
import {
  fetchBonusSheets,
  createBonusSheet,
  updateBonusSheet,
  deleteBonusSheet,
} from "./thunk";

interface BonusSheetState {
  items: BonusSheet[];
  isLoading: boolean;
  error: string | null;
}

export const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const bonusSheetSlice = createSlice({
  name: "bonusSheet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBonusSheets.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBonusSheets.fulfilled, (state, action: PayloadAction<BonusSheet[]>) => {
        console.log('Fulfilled case reached'); // add this
        console.log('Payload:', action.payload); 
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBonusSheets.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createBonusSheet.fulfilled, (state, action: PayloadAction<BonusSheet[]>) => {
        state.items.push(action.payload);
      })
      .addCase(
        updateBonusSheet.fulfilled,
        (state, action: PayloadAction<BonusSheet>) => {
          const index = state.items.findIndex(
            (bonusSheet) => bonusSheet.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(deleteBonusSheet.fulfilled, (state: any, action: PayloadAction<string>) => {
        state.items = state.items.filter(
          (bonusSheet) => bonusSheet._id !== action.payload
        );
      });
  },
});

export const selectBonusSheets = (state: RootState) => state.bonusSheet.items;
export default bonusSheetSlice.reducer;

