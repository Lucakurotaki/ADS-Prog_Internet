import { AddTask } from "../../components/add_task"
import { TaskList } from "../../components/list_task"

export default function Tasks() {

  return (
    <div className="App">
      <h1>React + Reducer + Contexts</h1>
      <h3>Tarefas</h3>

      <AddTask />

      <TaskList />

    </div>
  )
}