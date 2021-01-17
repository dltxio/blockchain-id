﻿import axios from "axios";

const register = async (vendor) => {
  const showAlert = () => {
    Alert.alert("You need to...");
  };

  const endpoint = vendor.registration;
  const data = JSON.stringify({
    firstName: "Test",
    secondName: "User",
    email: "lucas5@lucascullen.com",
    password: "Test1234!",
  });

  const config = {
    method: "post",
    url: vendor.registration,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(endpoint, data, config);
  if (response.data == null)
    throw new Error(`Could not post data to endpoint "${endpoint}"`);

  console.log(response.data);
  showAlert();

  return response.data;
};

export default register;
