import React from "react";

export const Profile = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  console.log(user);
  return <div></div>;
};
