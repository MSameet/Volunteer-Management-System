import React from "react";

const useGetUserRole = () => {
  const [userRole, setUserRole] = React.useState("admin");

  const user = JSON.parse(window.localStorage.getItem("user"));
  console.log(user);
  React.useEffect(() => {
    const fetchUserRole = () => {
      setUserRole(user.role);
    };

    fetchUserRole();
  }, []);

  return userRole;
};

export default useGetUserRole;
