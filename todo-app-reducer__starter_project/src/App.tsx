import './App.css';
import { AddTask } from './components/add_task';
import { TaskList } from './components/list_task';
import { useReducer } from 'react';
import styled from 'styled-components';


export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: Task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  //styled-components
  const StyledH1 = styled.h1`
  font-size: 2em;
  text-align: center;
  color: green;
  `

  const StyledH3 = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: red;
  `

  return (
    <div className="App">
      <StyledH1>React + Reducer</StyledH1>
      <StyledH3>Tasks</StyledH3>

      <AddTask onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />

    </div>
  )
}

export interface Task {
  id: number
  text: string
  done: boolean
}

let nextId = 3;

const initialTasks: Task[] = [
  { id: 0, text: 'Elaborar Aulas', done: true },
  { id: 1, text: 'Estudar Flutter - Estados', done: false },
  { id: 2, text: 'Correr avenida Raul Lopres', done: false },
];

function tasksReducer(tasks: Task[], action: any) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}