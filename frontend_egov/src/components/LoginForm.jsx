import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import axiosApi from "../axiosApi/axiosInstance.js";

const LoginForm = () => {
  const [formData, setFormData] = useState({ UserName: "", Password: "" });

  const { setAuthenticatedUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.UserName === "admin") {
      try {
        const res = await axiosApi.post("http://localhost:5288/api/admin/login", formData);
        console.log("admin details", res.data.username);
        localStorage.setItem("authenticatedUser", res.data.userName);
        localStorage.setItem("username", res.data.userName);
        setAuthenticatedUser({
          name: res.data.userName,
          username: res.data.userName,
          id: res.data.Id,
          role: res.data.userName,
        });
        navigate("/admin-dashboard/");
        console.log("admin login");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axiosApi.post("http://localhost:5288/api/customers/login", formData);
        localStorage.setItem("authenticatedUser", "customer");
        localStorage.setItem("authenticatedUserId", response.data.customerId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("username", response.data.userName);
        console.log(response.data);
        setAuthenticatedUser({
          name: response.data.name,
          username: response.data.userName,
          id: response.data.customerId,
          role: "customer",
        });

        navigate("/user-dashboard/");
        console.log("Login successful!");
      } catch (error) {
        console.error("Login failed:", error);
        alert(error.response?.data || "Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-white shadow-lg border rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input id="Name" name="UserName" value={formData.Name} onChange={handleChange} placeholder="Enter your username" className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black w-full outline-none" required />
          </div>
          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="Password" name="Password" type="password" value={formData.Password} onChange={handleChange} placeholder="Enter your password" className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black w-full outline-none" required />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300">
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              Don&rsquo;t have an account?{" "}
              <button type="button" onClick={() => navigate("/register")} className="text-black font-semibold hover:underline">
                Register as a Customer
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
