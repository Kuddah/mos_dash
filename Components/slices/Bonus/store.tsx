import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import bonusSheetReducer from './Reducer';
import { useDispatch as _useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    bonusSheet: bonusSheetReducer,
  },
  middleware: [thunk]
});
export function useDispatch() {
    return _useDispatch<AppDispatch>();
  }
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch | ThunkDispatch<RootState, unknown, Action<string>>

export default store;
