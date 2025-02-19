import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi/axiosInstance.js";

const AddRate = () => {
  const [formData, setFormData] = useState({
    demandType: "5AMP", // Default demand type
    ratePerUnit: "",
  });

  const [demandTypes, setDemandTypes] = useState([]);
  const FetchDemandType = async () => {
    try {
      const response = await axiosApi.get("http://localhost:5288/api/admin/demand-types");
      console.log("Fetched Successfully:", response.data);
      setDemandTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchDemandType();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rateData = {
        DemandTypeName: formData.demandType,
        RatePerUnit: formData.ratePerUnit,
      };
      await axiosApi.post("http://localhost:5288/api/admin/rate", rateData);
      alert("Rate Submitted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] m-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <div className="max-w-lg m-auto">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Set Rate per Unit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Demand Type</label>
            <select name="demandType" value={formData.demandType} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none">
              {demandTypes.map((demandType) => (
                <option value={demandType.type} key={demandType.type}>
                  {demandType.type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rate per Unit</label>
            <input type="number" name="ratePerUnit" value={formData.ratePerUnit} onChange={handleChange} required className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none" placeholder="Enter Rate per Unit" />
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300">
            Set Rate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRate;
