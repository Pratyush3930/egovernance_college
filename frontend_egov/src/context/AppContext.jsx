import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

// Create the context
const AppContext = createContext();

// Create a custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

// Create a provider component
export const AppProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    username: "",
    name: "",
    id: 0,
    role: "",
  });

  const [userDetails, setUserDetails] = useState({});

  const adminDetails = { Name: "admin", Password: "adminadmin" };

  

  return (
    <AppContext.Provider
      value={{
        userDetails,
        setUserDetails,
        setAuthenticatedUser,
        authenticatedUser,
        adminDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
