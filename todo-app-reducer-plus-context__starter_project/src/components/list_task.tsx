import { useTasks } from "../contexts/TasksContext"
import { Task } from "../models/models"
import { TaskItem } from "./item_task"

export function TaskList(){

    const state = useTasks();
    

    return (
        <>
            <ul>
                {state.tasks.map((task: Task) => (
                   <TaskItem key={task.id} 
                        task={task}/>
                ))}
            </ul>
        </>
    )
}

