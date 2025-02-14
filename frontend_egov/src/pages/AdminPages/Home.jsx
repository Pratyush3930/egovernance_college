import { useAppContext } from "../../context/AppContext";

const Home = () => {
  const { authenticatedUser } = useAppContext();
  return (
    <div className="w-[60%] flex flex-col items-center text-gray-500 gap-4 m-auto">
      <h2 className="text-2xl font-medium">Welcome to NEA Admin Dashboard</h2>
      {authenticatedUser.role === "admin" ? (
        <p className="text-xl font-medium">
          From this page you can generate customer bills and view them
        </p>
      ) : (
        <p className="text-xl font-medium">
          From this page you can view your payments
        </p>
      )}
    </div>
  );
};

export default Home;
