import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi/axiosInstance.js";


const Profile = () => {

    const [customer, setCustomer] = useState({});
    
  const fetchUserDetails = async () => {
      const userId = localStorage.getItem("authenticatedUserId");
            console.log('here i am');
      console.log(userId);
      try {
        const response = await axiosApi.get(
          `http://localhost:5288/api/customers/${userId}`
        );
        setCustomer(response.data);
            console.log('here i am');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchUserDetails();
    }, []);
  return (
    <div className="max-w-full min-h-96 w-full mx-12 p-6 bg-gray-50 shadow-md rounded-lg flex justify-start items-baseline">
      <div className="max-w-lg  ml-24">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Profile Information
        </h2>
        <div className="space-y-4">
        <div>
            <strong>SCNO:</strong> {customer.id}
          </div>
          <div>
            <strong>Name:</strong> {customer.name}
          </div>
          <div>
            <strong>Username:</strong> {customer.userName}
          </div>
          <div>
            <strong>Contact:</strong> {customer.contact}
          </div>
          <div>
            <strong>Address:</strong> {customer.address}
          </div>
          <div>
            <strong>Branch:</strong> {customer.branchName}
          </div>
          <div>
            <strong>Demand Type:</strong> {customer.demandTypeName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
