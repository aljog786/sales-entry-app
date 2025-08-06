import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {
    vr_no: "",
    vr_date: new Date().toISOString().split("T")[0],
    ac_name: "",
    ac_amt: 0,
    status: "A",
  },
  detail: [
    {
      item_code: "",
      item_name: "",
      description: "",
      qty: 0,
      rate: 0,
      amount: 0,
    },
  ],
  itemMaster: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setHeader(state, action) {
      state.header = { ...state.header, ...action.payload };
    },
    setDetail(state, action) {
      state.detail = action.payload;
    },
    addRow(state) {
      state.detail.push({
        item_code: "",
        item_name: "",
        description: "",
        qty: 0,
        rate: 0,
        amount: 0,
      });
    },
    updateDetailField(state, action) {
      const { index, field, value } = action.payload

      // Immer lets us write "mutative" code here
      state.detail[index][field] = value

      // if you changed qty or rate, recalc amount:
      if (field === "qty" || field === "rate") {
        const row = state.detail[index]
        row.amount = (parseFloat(row.qty)||0) * (parseFloat(row.rate)||0)
      }
    },

    updateDetailItemName(state, action) {
      const { index, itemName } = action.payload
      state.detail[index].item_name = itemName
    },
    removeRow(state, action) {
      if (state.detail.length > 1) state.detail.splice(action.payload, 1);
    },
    setItemMaster(state, action) {
      state.itemMaster = action.payload;
    },
    resetAll(state) {
      state.header = initialState.header;
      state.detail = initialState.detail;
    },
  },
});

export const {
  setHeader,
  setDetail,
  addRow,
  updateDetailField,
  updateDetailItemName,
  removeRow,
  setItemMaster,
  resetAll,
} = salesSlice.actions;

export default salesSlice.reducer;
