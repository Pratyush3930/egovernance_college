import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi/axiosInstance";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axiosApi.get("http://localhost:5288/api/customers/payments", {
        withCredentials: true, // Make sure credentials are sent with the request
      });
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="max-w-full min-h-96 w-full mx-12 p-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300 text-left">Bill ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Payment Date</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Amount Paid</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Issue Date</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Due Date</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Units Consumed</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Total Amount</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-4 py-2 border border-gray-300">{payment.billId}</td>
                <td className="px-4 py-2 border border-gray-300">{payment.paymentDate}</td>
                <td className="px-4 py-2 border border-gray-300">${payment.amountPaid}</td>
                <td className="px-4 py-2 border border-gray-300">{payment.billDetails.issueDate}</td>
                <td className="px-4 py-2 border border-gray-300">{payment.billDetails.dueDate}</td>
                <td className="px-4 py-2 border border-gray-300">{payment.billDetails.unitsConsumed}</td>
                <td className="px-4 py-2 border border-gray-300">${payment.billDetails.totalAmount}</td>
                <td className="px-4 py-2 border border-gray-300">{payment.billDetails.status === "Pending" ? "Paid" : "Paid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
