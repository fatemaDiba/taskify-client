import { useState } from "react";
import { useDrop } from "react-dnd";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Task from "./Task";
import useAxios from "../hooks/useAxios";
import useUser from "../hooks/useUser";

const Column = ({ state, tasks, moveTask, taskRefetch }) => {
  const axiosBase = useAxios();
  const [addTask, setAddTask] = useState(false);
  const [userData, userLoading] = useUser();
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => moveTask(item.id, state),
  }));

  const handleAddTask = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const task = Object.fromEntries(formData);
    const userID = userData?.userID;
    const taskInfo = { ...task, userID, state: "to-do" };

    const res = await axiosBase.post("/task", taskInfo);
    if (res?.data?.acknowledged) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
      setAddTask(false);
      taskRefetch();
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosBase.delete(`/task/${id}`);
        if (res.data?.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
          taskRefetch();
        }
      }
    });
  };

  return (
    <div
      ref={drop}
      className="flex flex-col min-h-[75vh] bg-white shadow-lg rounded-xl p-6 border"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 capitalize">
        {state.replace("-", " ")}
      </h2>

      <div className="flex-grow space-y-4">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            taskRefetch={taskRefetch}
          />
        ))}
      </div>

      {state === "to-do" && (
        <div className="mt-6">
          {addTask ? (
            <form
              onSubmit={handleAddTask}
              className="bg-gray-100 p-4 rounded-lg shadow-inner"
            >
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Task Name
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter task name"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter task description"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setAddTask(false)}
                  className="btn btn-sm bg-red-500 text-white px-4 rounded-lg hover:bg-red-600"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setAddTask(true)}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <FaPlus /> Add New Task
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Column;
