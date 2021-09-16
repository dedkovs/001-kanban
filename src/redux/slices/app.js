import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Whatch show" },
    "task-3": { id: "task-3", content: "Charge the phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    // "column-2": {
    //   id: "column-2",
    //   title: "Done",
    //   taskIds: ["task-1", "task-2", "task-3", "task-4"],
    // },
  },
  columnOrder: ["column-1"],
};

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeColumn: (state, action) => {
      let newColumn = action.payload;
      console.log("new column: ", newColumn);
      // let columns = { ...state.columns, [newColumn.id]: { ...newColumn } };
      state.columns["column-1"] = newColumn;
      // return state;
      // console.log("columns from reducer: ", columns);
      // console.log("from reducer: ", action.payload);
      // return { ...state, columns };
    },
    changeState: (state, action) => {
      console.log("from reducer: ", action.payload);
      state = action.payload;
      // return action.payload;
    },
  },
});

export const { changeColumn, changeState } = app.actions;
export default app.reducer;
