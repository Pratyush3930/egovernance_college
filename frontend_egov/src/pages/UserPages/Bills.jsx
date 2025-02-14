import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi/axiosInstance.js";

const Bills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axiosApi.get(
          "http://localhost:5288/api/customers/bills"
        ); // Adjust the API endpoint
        setBills(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching bills data", error);
      }
    };

    fetchBills();
  }, []);

  const handlePayNow = async (billId) => {
    try {
      const response = await axiosApi.post('http://localhost:5288/api/customers/bills/payment', { BillId: billId });
      console.log(response.data);
      if (response.data.payment_url) {
        // Redirect the user to the Khalti payment page
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="max-w-full min-h-96 w-full mx-12 p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Bills List
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Customer ID</th>
              <th className="p-3 text-left">Issue Date</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Units Consumed</th>
              <th className="p-3 text-left">Fine</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr
                key={bill.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } border-b`}
              >
                <td className="p-3">{bill.id}</td>
                <td className="p-3">{bill.customerId}</td>
                <td className="p-3">{bill.issueDate}</td>
                <td className="p-3">{bill.dueDate}</td>
                <td className="p-3">{bill.unitsConsumed}</td>
                <td className="p-3">Rs.{bill.fine}</td>
                <td className="p-3">Rs.{bill.discount}</td>
                <td className="p-3">Rs.{bill.totalAmount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bill.status === "Pending"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>
                <td className="p-3">
                  {bill.status === "Pending" ? (
                    <button
                      onClick={() => handlePayNow(bill.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-gray-500">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bills;
