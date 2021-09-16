import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable, Droppable } from "react-beautiful-dnd";
import React from "react";

const useStyles = makeStyles({
  column: {
    minWidth: 275,
    maxWidth: 300,
    marginRight: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(1.5)",
  },
  title: {},
  pos: {
    marginBottom: 12,
  },
  cardsContainer: {
    display: "inline-flex",
  },
  tasksList: {},
  tasksListContainer: {
    marginTop: 20,
  },
  taskCard: {
    marginBottom: 20,
  },
});

const Column1 = ({ provided, innerRef, children }) => {
  const classes = useStyles();
  return (
    <div
      {...provided.droppableProps}
      ref={innerRef}
      className={classes.tasksListContainer}
    >
      {children}
    </div>
  );
};

const Task1 = ({ provided, innerRef, task }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.taskCard}
      // key={task.id}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
    >
      <CardContent>{task.content}</CardContent>
    </Card>
  );
};

const Column = ({ column, tasks }) => {
  const classes = useStyles();
  return (
    <Card className={classes.column}>
      <CardContent style={{ padding: 20, paddingBottom: 0 }}>
        <Typography variant="h5" className={classes.title}>
          {column.title}
        </Typography>

        <Droppable droppableId={column.id}>
          {(provided) => (
            <Column1 provided={provided} innerRef={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {(provided) => (
                    <Task1
                      provided={provided}
                      innerRef={provided.innerRef}
                      task={task}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Column1>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default Column;
