// actions/bonusSheetActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BonusSheetApi, BonusSheet } from "pages/api/Bonus";
import { toast } from "react-toastify";

export const fetchBonusSheets = createAsyncThunk(
  'bonusSheet/fetchBonusSheets',
  async (_, thunkAPI) => {
    try {
      const bonusSheetApi = new BonusSheetApi();
      const bonusSheets = await bonusSheetApi.getListOfBonusSheet();
      console.log('Bonus sheets:', bonusSheets); // add this
      if (!bonusSheets) {
        console.log('No bonus sheets returned'); // add this
      }
      return bonusSheets;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createBonusSheet = createAsyncThunk(
  "bonusSheets/create",
  async (bonusSheet: BonusSheet) => {
    try {
    const api = new BonusSheetApi();
    const newBonusSheet = await api.createBonusSheet(bonusSheet);
    toast.success("Bonus Added Successfully", { autoClose: 3000 });
    return newBonusSheet;
  } catch (error) {
    toast.error("Bonus Added Failed", { autoClose: 3000 });
    return error;
  }
}
);

export const updateBonusSheet = createAsyncThunk(
  "bonusSheets/update",
  async (bonusSheet: BonusSheet) => {
    try {
    const api = new BonusSheetApi();
    const updatedBonusSheet = await api.updateBonusSheet(bonusSheet);
    toast.success("Bonus Updated Successfully", { autoClose: 3000 });
    return updatedBonusSheet;
  } catch (error) {
    toast.error("Bonus Updated Failed", { autoClose: 3000 });
    return error;
  }
}
);

// bonusSheetActions.ts
export const deleteBonusSheet = createAsyncThunk(
  "bonusSheets/delete",
  async (bonusSheet: BonusSheet) => {
    try {
    const api = new BonusSheetApi();
    await api.deleteBonusSheet(bonusSheet);
    toast.success("Bonus Delete Successfully", { autoClose: 3000 });
    return api;
  } catch (error) {
    toast.error("Bonus Delete Failed", { autoClose: 3000 });
    return error;
  }
}
);
