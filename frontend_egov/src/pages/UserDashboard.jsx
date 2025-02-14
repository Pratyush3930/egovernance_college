import { Navigate, Route, Routes } from "react-router";
import MainMenu from "../components/Menu/MainMenu";
import Home from "./AdminPages/Home";
import AddRate from "./AdminPages/AddRate";
import Profile from "./UserPages/Profile";
import Bills from "./UserPages/Bills";
import Payments from "./UserPages/Payments";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full box-border p-4">
      <div className="flex flex-col w-full">
        <div className=" flex flex-col items-center gap-4 justify-center mb-12">
          <img src="/logo.png" alt="" />
        </div>
        <div className="flex flex-row items-center">
          <div className="border border-black w-fit p-4 rounded-md h-full flex items-center my-8">
            <MainMenu />
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bills" element={<Bills />} />
            <Route path="payments" element={<Payments />} />
            <Route path="addRate" element={<AddRate />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
