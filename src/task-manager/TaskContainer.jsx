import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import useUpdateTask from "../hooks/useUpdateTask";
import useTasksByUserID from "../hooks/useTasksByUserID";
import useUser from "../hooks/useUser";

const TaskContainer = () => {
  const [userData] = useUser();
  const userID = userData?.userID;
  const [tasks, taskLoading, taskRefetch] = useTasksByUserID(userID);
  const { mutateAsync: updateTask, isLoading: isUpdating } = useUpdateTask();

  if (taskLoading) return <div>Loading tasks...</div>;

  const moveTask = async (taskId, newState) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, state: newState } : task
    );

    taskRefetch(updatedTasks);

    try {
      await updateTask({ taskId, newState });
      taskRefetch();
    } catch (error) {
      console.error("Error updating task state:", error);
      taskRefetch(tasks);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid md:grid-cols-3 gap-4 p-4 lg:w-9/12 mx-auto">
        {["to-do", "in-progress", "done"].map((state) => (
          <Column
            key={state}
            state={state}
            tasks={tasks.filter((task) => task.state === state)}
            moveTask={moveTask}
            taskRefetch={taskRefetch}
          />
        ))}
      </div>
    </DndProvider>
  );
};
export default TaskContainer;
