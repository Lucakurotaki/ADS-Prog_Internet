import  { createContext, useContext } from "react";
import {   ActionType, TasksState, useTaskReducer } from "../reducers/tasks_reducer";

const defaultTasksContext: TasksState = {nextId: 4, tasks: [{id: 0, text: 'Default', done: true}]}

const TasksContext = createContext<TasksState>(defaultTasksContext);
const TasksDipatchContext = createContext<any>(()=>{});

interface TasksProviderParams{
    children: JSX.Element[];
}

export function TasksProvider({children}: TasksProviderParams){
    const [state, dispatch] = useTaskReducer();

    return(
        <TasksContext.Provider value={state}>
            <TasksDipatchContext.Provider value={dispatch}>
                {children}
            </TasksDipatchContext.Provider>
        </TasksContext.Provider>
    )
}

export function useTasks() {
    return useContext(TasksContext);
}

export function useTasksDispatch(){
    return useContext(TasksDipatchContext);
}