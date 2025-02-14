import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi/axiosInstance.js";

const GenerateReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    try {
      const response = await axiosApi.get("http://localhost:5288/api/admin/generate-report");
      setReport(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch report data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-8 border">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        System Report
      </h2>

      {/* Customers by Demand Type */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Customers by Demand Type
        </h3>
        <ul className="mt-2">
          {report.customersByDemandType.map((item, index) => (
            <li key={index} className="py-1 text-gray-600">
              <strong>{item.demandType}:</strong> {item.customerCount} customers
            </li>
          ))}
        </ul>
      </div>

      {/* Customers by Branch */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Customers by Branch
        </h3>
        <ul className="mt-2">
          {report.customersByBranch.map((item, index) => (
            <li key={index} className="py-1 text-gray-600">
              <strong>{item.branch}:</strong> {item.customerCount} customers
            </li>
          ))}
        </ul>
      </div>

      {/* Bill Status Counts */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Bill Status
        </h3>
        <p className="mt-2 text-gray-600">
          <strong>Paid Bills:</strong> {report.billStatusCounts.paidBills}
        </p>
        <p className="text-gray-600">
          <strong>Pending Bills:</strong> {report.billStatusCounts.pendingBills}
        </p>
      </div>

      {/* Total Revenue */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
          Total Revenue
        </h3>
        <p className="mt-2 text-green-600 text-lg font-bold">
          ₹ {report.totalRevenue.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default GenerateReport;
