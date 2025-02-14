import { Navigate, Route, Routes } from "react-router";
import MainMenu from "../components/Menu/MainMenu";
import Home from "./AdminPages/Home";
import GenerateBillForm from "./AdminPages/GenerateBills";
import DemandType from "./AdminPages/DemandType";
import AddRate from "./AdminPages/AddRate";
import GenerateReport from "./AdminPages/GenerateReport";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full box-border p-4">
      <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-4 justify-center mb-12">
          <img src="/logo.png" alt="" />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="border border-black w-fit p-4 rounded-md h-full flex items-center my-8">
          <MainMenu />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="generate-bill" element={<GenerateBillForm />} />
          <Route path="demandType" element={<DemandType />} />
          <Route path="addRate" element={<AddRate />} />
          <Route path="generate-report" element={<GenerateReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
