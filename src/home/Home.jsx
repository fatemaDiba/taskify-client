import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <header className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Taskify
      </header>
      <p className="text-lg text-gray-600 text-center max-w-md mb-6">
        Organize your tasks effortlessly with drag and drop functionality. Stay
        productive and manage your workflow efficiently.
      </p>
      <Link
        to="/task-manager"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-600 transition"
      >
        Start Now
      </Link>
    </div>
  );
};

export default Home;
