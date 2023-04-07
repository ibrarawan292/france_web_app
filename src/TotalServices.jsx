import http from "./axios";


const login = (data) => {
  console.log(data)
  return http.post("/Login", data);
};

const logout = (data) => {
  console.log(data)
  return http.post("/Logout", data);
};
const getZipCode = (limit, offset, data) => {
  return http.post("/ListZipcodes/" + limit + "/" + offset, data)
}
const createZipCode = ( data) => {
  console.log(data)
  return http.post("/CreateZipcode", data)
}





const TotalServices = {
  login,
  logout,
  getZipCode,
  createZipCode
};

export default TotalServices;
