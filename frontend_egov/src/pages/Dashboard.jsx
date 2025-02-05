import MainMenu from "../components/Menu/MainMenu";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full box-border p-4">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center gap-4">
          <img src="./logo.png" alt="" />
          <h2 className="text-xl font-medium">Consumer Dashboard</h2>
        </div>
      </div>
      <div className="flex flex-row items-center">  
        <div className="border border-black w-fit p-4 rounded-md h-full flex items-center my-8">
          <MainMenu />
        </div>
        <div className="w-[75%] flex flex-col items-center text-gray-500 gap-4">
          <h2 className="text-2xl font-medium">Welcome to NEA Bill Payment Portal</h2>
          <p className="text-xl font-medium">From this page you can view the your payment details</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
