import { useDrag } from "react-dnd";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateModal from "./UpdateModal";
import { useRef } from "react";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const Task = ({ task, handleDeleteTask, taskRefetch }) => {
  const axiosBase = useAxios();
  const modalRef = useRef();
  const formRef = useRef();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleEditTask = async ({ title, description }, id) => {
    const res = await axiosBase.put(`/task/${id}`, {
      title,
      description,
    });
    if (res.data?.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      formRef.current.reset();
      modalRef.current.close();
      taskRefetch();
    }
  };

  return (
    <>
      <div
        ref={drag}
        className={`flex justify-between items-center ${
          isDragging ? "opacity-90 drop-shadow-md" : ""
        }`}
      >
        <div className="p-4 mb-2 rounded-md shadow-sm cursor-grab flex justify-between items-center w-full">
          <div className="">
            <h4 className="text-lg font-semibold w-8/12">{task.title}</h4>
            <p>{task.description}</p>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <FaTrash
              onClick={() => handleDeleteTask(task._id)}
              className={`cursor-pointer text-xl  text-red-700 transition-transform duration-300 hover:scale-150 ${
                isDragging ? "hidden" : ""
              }`}
            />
            <FaEdit
              onClick={() => modalRef.current.showModal()}
              className={`cursor-pointer text-xl text-green-700 transition-transform duration-300 hover:scale-150 ${
                isDragging ? "hidden" : ""
              }`}
            />
          </div>
        </div>
      </div>
      {task && (
        <UpdateModal
          modalRef={modalRef}
          formRef={formRef}
          task={task}
          handleEditTask={handleEditTask}
        />
      )}
    </>
  );
};

export default Task;
