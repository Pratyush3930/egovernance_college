import { useNavigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import axiosApi from "../../axiosApi/axiosInstance.js";
const MainMenu = () => {
  const { setAuthenticatedUser } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (localStorage.getItem("authenticatedUser") === "admin") {
      setAuthenticatedUser({ username: "", name: "", id: 0, role: "" });
      const response = await axiosApi.post("http://localhost:5288/api/admin/logout");
      alert(response.data);
    } else {
      setAuthenticatedUser({ username: "", name: "", id: 0, role: "" });
      const response = await axiosApi.post("http://localhost:5288/api/customers/logout");
      alert(response.data);
    }
    localStorage.removeItem("authenticatedUser");
    localStorage.removeItem("username");
    localStorage.removeItem("authenticatedUserId");
    navigate("/login");
  };
  return (
    <>
      {localStorage.getItem("authenticatedUser") !== "admin" ? (
        <div className="flex flex-col h-full gap-4 my-8 mx-4">
          <h3 className="cursor-pointer" onClick={() => navigate("/user-dashboard/profile")}>
            My Profile
          </h3>
          <h3 className="cursor-pointer" onClick={() => navigate("/user-dashboard/bills")}>
            My Bills
          </h3>
          <h3 className="cursor-pointer" onClick={() => navigate("/user-dashboard/payments")}>
            My Payments
          </h3>
          <h3 className="cursor-pointer">Support Center</h3>
          <h3 className="cursor-pointer">No light Contact</h3>
          <h3 onClick={() => handleLogout()} className="cursor-pointer">
            Logout
          </h3>
        </div>
      ) : (
        <div className="flex flex-col h-full gap-4 my-8 mx-4">
          <h3 onClick={() => navigate("/admin-dashboard/generate-report")} className="cursor-pointer">
            Generate Report
          </h3>
          <h3 onClick={() => navigate("/admin-dashboard/generate-bill")} className="cursor-pointer">
            Create Bill
          </h3>
          <h3 onClick={() => navigate("/admin-dashboard/demandType")} className="cursor-pointer">
            Add Demand Type
          </h3>
          <h3 onClick={() => navigate("/admin-dashboard/addRate")} className="cursor-pointer">
            Add Rate
          </h3>
          <h3 onClick={() => handleLogout()} className="cursor-pointer">
            Logout
          </h3>
        </div>
      )}
    </>
  );
};

export default MainMenu;
