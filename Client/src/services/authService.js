// import axios from "axios";

// const API_URL = "http://localhost:5000/api"; // backend

// export const login = async (email, password) => {
//   const response = await axios.post(`${API_URL}/auth/login`, { email, password });
//   return response.data;
// };
export const login = async (email, password) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@test.com" && password === "1234") {
        resolve({ email, role: "Admin" });
      } else {
        reject("Erreur login");
      }
    }, 500);
  });
};
