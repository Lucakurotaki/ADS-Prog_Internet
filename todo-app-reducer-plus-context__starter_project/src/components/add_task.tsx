import { ChangeEvent, FormEvent, useState } from "react"
import { useTasksDispatch } from "../contexts/TasksContext";
import { ActionType } from "../reducers/tasks_reducer";

export function AddTask() {

    const [taskText, setTaskText] = useState('')
    const dispatch = useTasksDispatch();

    const handlerDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const handlerSubmit = (event: FormEvent) => {
        event.preventDefault()
        setTaskText('')
        dispatch({
            type: ActionType.Added,
            args: { text: taskText }
        })
    }

    return (
        <>
            <form onSubmit={handlerSubmit}>
                <input
                    type="text"
                    value={taskText}
                    onChange={handlerDescriptionChange}
                    placeholder="Descrição" />
                <input type="submit" value="Adicionar Tarefa" />
            </form>
        </>
    )
}