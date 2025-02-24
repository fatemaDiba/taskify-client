import Swal from "sweetalert2";

const UpdateModal = ({ formRef, modalRef, task, handleEditTask }) => {
  const closeModal = () => {
    modalRef.current.close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description = formData.get("description");

    if (!title || !description) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Title or Description Can't be empty",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
    }

    const updatedTask = {
      title,
      description,
    };
    handleEditTask(updatedTask, task._id);
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            defaultValue={task?.title}
            placeholder="Task Name"
            className="outline-none border-b w-full h-11 mb-6"
            required
          />
          <textarea
            name="description"
            defaultValue={task?.description}
            placeholder="Description"
            className="outline-none border-b w-full mb-6"
            required
          ></textarea>
          <div className="space-x-4 mt-3">
            <button type="submit" className="btn btn-primary btn-sm">
              Add
            </button>
            <button
              type="button"
              onClick={() => closeModal()}
              className="btn btn-neutral btn-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModal;
