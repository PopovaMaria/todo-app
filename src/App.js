import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

const itemsFromBackend = [
  {id: uuid(), content: 'First task', description: 'HEllO'},
  {id: uuid(), content: 'Second task', description: 'HEllO'},
    { id: uuid(), content: "Third task", description: 'HEllO'},
    { id: uuid(), content: "Fourth task", description: 'HEllO' },
    { id: uuid(), content: "Fifth task", description: 'HEllO' }
];

const columnsFromBackend =
    {
      [uuid()]: {
          name: 'Requested',
          items: [],
      },
    [uuid()]: {
      name: 'Todo',
      items: itemsFromBackend,
    },
    [uuid()]: {
      name: 'In progress',
      items: [],
    },
      [uuid()]: {
          name: 'Done',
          items: [],
      }
  };

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const { source, destination } = result;
  if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
        ...columns,
      [source.droppableId]: {
            ...sourceColumn,
          items: sourceItems
      },
      [destination.droppableId]: {
            ...destColumn,
          items: destItems
      }
    });
  } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
          ...columns,
          [source.droppableId]: {
              ...column,
              items: copiedItems
          }
      });
  }
};


function App() {
  const[columns, setColumns] = useState(columnsFromBackend);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => { setExpanded(!expanded);};
  return (
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h2>{column.name}</h2>
                  <div style={{margin: 8}}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? 'lightblue': 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 500
                      }}
                    >
                      {column.items.map((item, index) => {
                        return(
                          <Draggable key={item.id} draggableId={item.id} index={index} onClick={handleExpandClick}>
                            {(provided, snapshot) => {
                              return (


                                      <Card  onClick={handleExpandClick} ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             style={{
                                                 userSelect: 'none',
                                                 padding: 16,
                                                 margin: '0 0 8px 0',
                                                 minHeight: '50px',
                                                 backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                 color: 'white',
                                                 ...provided.draggableProps.style
                                             }}>
                                          <CardContent>
                                              <Typography>
                                                  Task1
                                              </Typography>
                                          </CardContent>
                                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                                              <CardContent>
                                                  <Typography paragraph>
                                                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                                      minutes.
                                                  </Typography>
                                              </CardContent>
                                          </Collapse>
                                      </Card>

                              );
                            }}
                          </Draggable>
                      );
                    })}
                      {provided.placeholder}
                  </div>
              );
            }}
          </Droppable>
                </div>
              </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
