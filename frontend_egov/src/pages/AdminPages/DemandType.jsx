import axiosApi from "../../axiosApi/axiosInstance.js";
import { useState } from "react";


const DemandType = () => {
  const [newDemandType, setNewDemandType] = useState("");

  
const handleSubmit = async (e, demandType) => {
  e.preventDefault();
  const demandObject = { type: demandType };
  try {
    const response = await axiosApi.post(
      "http://localhost:5288/api/admin/demand-type",
      demandObject
    );
    console.log("DemandType added Successfully:", response.data);
    alert("DemandType added Successfully!");
  } catch (error) {
    console.error(
      "Error adding demand type:",
      error.response?.data || error.message
    );
    alert("Failed to add demand type. Please try again.");
  }
};

  return (
    <div className="w-[80%] m-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <div className="max-w-lg m-auto">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add Demand Type
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Demand Type
            </label>
            <input
              type="text"
              name="demandType"
              value={newDemandType}
              onChange={(e) => setNewDemandType(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
              placeholder="Demand type name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            onClick={(e) => handleSubmit(e, newDemandType)}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemandType;
