import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosApi from "../axiosApi/axiosInstance.js";

const Register = () => {
  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Password: "",
    Contact: "",
    Address: "",
    BranchName: "",
    DemandTypeName: "",
  });

  const [branches, setBranches] = useState([]);
  const [demandTypes, setDemandTypes] = useState([]);
  const navigate = useNavigate();

  // Fetch branches and demand types on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchRes = await axiosApi.get(
          "http://localhost:5288/api/customers/branches"
        );
        const demandRes = await axiosApi.get(
          "http://localhost:5288/api/customers/demandTypes"
        );
        console.log(branchRes.data, demandRes.data);
        setBranches(branchRes.data);
        setDemandTypes(demandRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new formObject and map formData values into it
    const formObject = {
      Name: formData.Name,
      UserName: formData.UserName,
      Password: formData.Password,
      Contact: formData.Contact,
      Address: formData.Address,
      BranchName: formData.BranchName,
      DemandTypeName: formData.DemandTypeName,
    };
    try {
      const response = await axiosApi.post(
        "http://localhost:5288/api/customers",
        formObject
      );
      console.log(response.data)
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.response?.data || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-white shadow-lg border rounded-xl py-4 px-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Register as a Customer
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              placeholder="Enter a username"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter a password"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              name="Contact"
              value={formData.Contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            />
          </div>

          {/* Branch Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <select
              name="BranchName"
              value={formData.BranchName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Demand Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Demand Type
            </label>
            <select
              name="DemandTypeName"
              value={formData.DemandTypeName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              required
            >
              <option value="">Select Demand Type</option>
              {demandTypes.map((type) => (
                <option key={type.id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Register
          </button>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-black font-semibold hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
