import useAuth from "../hooks/useAuth";
import TaskContainer from "./TaskContainer";
const TaskManager = () => {
  const { user, logOutUser } = useAuth();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log("user logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
      <div className="flex justify-end items-center gap-6 md:container">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src={user?.photoURL || "/avatar.png"} />
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-sm btn-primary">
          Logout
        </button>
      </div>
      <TaskContainer />
    </section>
  );
};
export default TaskManager;
