import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VariableService } from "../services/VariableService";
import { IVariable } from "../types/Variable";

export interface IVariableState {
  value: Array<IVariable>;
  status: "idle" | "loading" | "failed";
}

const initialState: IVariableState = {
  value: [],
  status: "idle",
};

export const retrieveVariablesAsync = createAsyncThunk(
  "variables/retrieve",
  async () => {
    const variableService = new VariableService();
    const res = await variableService.getAllVariables();
    return res;
  }
);

export const variableSlice = createSlice({
  name: "variable",
  initialState,
  reducers: {
    retrieveVariables: (state) => {
      return { value: state.value, status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveVariablesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(retrieveVariablesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(retrieveVariablesAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default variableSlice;
