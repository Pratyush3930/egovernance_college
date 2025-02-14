import { useState } from "react";
import axiosApi from "../../axiosApi/axiosInstance.js";

const GenerateBillForm = () => {
  const [formData, setFormData] = useState({
    customerId: 0,
    issueDate: new Date().toISOString().split("T")[0], // Default to today
    dueDate: "",
    unitsConsumed: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const billData = {
      customerId: formData.customerId,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      unitsConsumed: parseFloat(formData.unitsConsumed),
      fine: 0, // Default fine value (you can modify this)
      discount: 0, // Default discount value (you can modify this)
    };

    try {
      const response = await axiosApi.post(
        "http://localhost:5288/api/admin/bill",
        billData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Bill Generated Successfully:", response.data);
      alert("Bill Generated Successfully!");
    } catch (error) {
      console.error("Error generating bill:", error.response?.data || error.message);
      alert("Failed to generate bill. Please try again.");
    }
  };

  return (
    <div className="w-[80%] m-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <div className="max-w-lg m-auto">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Generate Bills
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* SC No (Customer ID) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              SC No (Customer ID)
            </label>
            <input
              type="number"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter SC No"
            />
          </div>

          {/* Issue Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue Date
            </label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Current Reading (Units Consumed) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Reading (Units Consumed)
            </label>
            <input
              type="number"
              name="unitsConsumed"
              value={formData.unitsConsumed}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter Units Consumed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Generate Bill
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateBillForm;
