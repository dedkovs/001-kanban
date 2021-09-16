// import { useState } from "react";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import {
  // changeColumn,
  // changeState,
  setColumns,
} from "./redux/slices/app";
// import { useSelector } from "react-redux";

const App = () => {
  // const [test, setTest] = useState(false);
  const data = useAppSelector((state) => state.app);

  // const state1 = useSelector((state) => state.app);

  // console.log("state1: ", state1);

  // const columns = useAppSelector((state) => state.app.columns);
  const dispatch = useAppDispatch();
  // console.log(data);
  const onDragEnd = (result) => {
    // console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = data.columns[source.droppableId];
    // console.log("column: ", column);
    const newTaskIds = Array.from(column.taskIds);
    // console.log("newTaskIds: ", newTaskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    // console.log("newTaskIds: ", newTaskIds);

    const newColumn = { ...column, taskIds: newTaskIds };
    // console.log("newColumn: ", newColumn);

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };

    // const newColumns = {
    //   "column-1": {
    //     id: "column-1",
    //     title: "To do",
    //     taskIds: ["task-2", "task-1", "task-3", "task-4"],
    //   },
    // };

    // console.log("newState: ", newState);
    // console.log("columns: ", columns);

    // dispatch(changeState(newState));
    dispatch(setColumns(newState.columns));
    // setTest(true);

    // console.log(data);
    // setTimeout(() => {
    // console.log("data after dnd: ", data);
    // console.log("data.columns[newColumn.id]: ", data.columns[newColumn.id]);
    // }, 1000);
  };

  console.log("data: ", data);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ padding: 20, display: "inline-flex" }}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          // console.log("column: ", column);
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          // console.log("tasks: ", tasks);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default App;
